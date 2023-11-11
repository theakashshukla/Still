"use client";
import { useState, ChangeEvent } from "react";
import { PDFDocument } from "pdf-lib";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const PdfEditor: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [creater, setCreater] = useState("");
  const [keywords, setKeywords] = useState("");
  const [producer, setProducer] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [modificationDate, setModificationDate] = useState("");
  const [arrayBuffer, setArrayBuffer] = useState<ArrayBuffer | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const result = reader.result as ArrayBuffer;
        setArrayBuffer(result);
        const pdfDoc = await PDFDocument.load(result, {
          updateMetadata: false,
        });

        setTitle(pdfDoc.getTitle() || "");
        setAuthor(pdfDoc.getAuthor() || "");
        setSubject(pdfDoc.getSubject() || "");
        setCreater(pdfDoc.getCreator() || "");
        setKeywords(pdfDoc.getKeywords()?.replace(/;/g, ", ") || "");
        setProducer(pdfDoc.getProducer() || "");
        setCreationDate(pdfDoc.getCreationDate()?.toISOString() || "");
        setModificationDate(pdfDoc.getModificationDate()?.toISOString() || "");
        console.log("Title:", pdfDoc.getTitle());
        console.log("Author:", pdfDoc.getAuthor());
        console.log("Subject:", pdfDoc.getSubject());
        console.log("Creator:", pdfDoc.getCreator());
        console.log("Keywords:", pdfDoc.getKeywords());
        console.log("Producer:", pdfDoc.getProducer());
        console.log("Creation Date:", pdfDoc.getCreationDate());
        console.log("Modification Date:", pdfDoc.getModificationDate());
      };
      reader.readAsArrayBuffer(file);
    }
  };

  //   const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setTitle(event.target.value);
  //     setModifyDate(new Date());
  //   };

  //   const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setAuthor(event.target.value);
  //     setModifyDate(new Date());
  //   };

  //   const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setSubject(event.target.value);
  //     setModifyDate(new Date());
  //   };

  //   const handleKeywordsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setKeywords([event.target.value]);
  //     setModifyDate(new Date());
  //   };

  //   const setCustomDates = () => {
  //     // Set specific custom dates
  //     setCreationDate(new Date("2022-01-01T00:00:00Z"));
  //     setModifyDate(new Date("2022-02-01T12:30:00Z"));
  //   };

  async function updateMetadata(
    arrayBuffer: ArrayBuffer,
    title: string,
    author: string,
    subject: string,
    creator: string,
    keywords: string,
    producer: string,
    creationDate: string,
    modificationDate: string
  ) {
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    pdfDoc.setTitle(title);
    pdfDoc.setAuthor(author);
    pdfDoc.setSubject(subject);
    pdfDoc.setCreator(creator);
    pdfDoc.setKeywords(keywords.split(", "));
    pdfDoc.setProducer(producer);
    pdfDoc.setCreationDate(new Date(creationDate));
    pdfDoc.setModificationDate(new Date(modificationDate));

    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
  }

  // Inside your component
  const handleSave = async () => {
    if (arrayBuffer) {
      const pdfBytes = await updateMetadata(
        arrayBuffer,
        title,
        author,
        subject,
        creater,
        keywords,
        producer,
        creationDate,
        modificationDate
      );

      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const fileName = prompt("Enter a name for the PDF file", "updated.pdf");
      if (fileName !== null) {
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <div className="grid w-[700px] justify-items-center m-5">
      <div className="grid w-full max-w-md items-center gap-1.5 my-2">
        <Label htmlFor="file">Select PDF</Label>
        <Input type="file" accept=".pdf" onChange={handleFileChange} />
      </div>
      <div className="grid w-full justify-items-center">
        <div className="grid w-full justify-items-center grid-flow-row md:grid-flow-col sm:grid-flow-col mt-4 mb-2 gap-2">
          <div className="grid w-full max-w-md items-center gap-1.5 my-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid w-full max-w-md items-center gap-1.5 my-2">
            <Label htmlFor="author">Author</Label>
            <Input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-flow-row w-full justify-items-center md:grid-flow-col sm:grid-flow-col my-2 gap-2">
          <div className="grid w-full max-w-md items-center gap-1.5 my-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-md items-center gap-1.5 my-2">
            <Label htmlFor="creator">Creator</Label>
            <Input
              type="text"
              value={creater}
              onChange={(e) => setCreater(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-flow-row w-full justify-items-center md:grid-flow-col sm:grid-flow-col my-2 gap-2">
          <div className="grid w-full max-w-md items-center gap-1.5 my-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-md items-center gap-1.5 my-2">
            <Label htmlFor="producer">Producer</Label>
            <Input
              type="text"
              value={producer}
              onChange={(e) => setProducer(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-flow-row w-full justify-items-center md:grid-flow-col sm:grid-flow-col my-2 gap-2">
          <div className="grid w-full max-w-md items-center gap-1.5 my-2">
            <Label htmlFor="creation">Creation Time</Label>
            <Input
              type="text"
              value={creationDate}
              onChange={(e) => setCreationDate(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-md items-center gap-1.5 my-2">
            <Label htmlFor="modify">Update Time</Label>
            <Input
              type="text"
              value={modificationDate}
              onChange={(e) => setModificationDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="grid max-w-md gap-1.5 my-4">
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>

    // <div>
    //   <h1>PDF Metadata Editor</h1>
    //   <Input type="file" accept=".pdf" onChange={handleFileChange} />
    //   {metadata && (
    //     <div>
    //       <label htmlFor="title">Title:</label>
    //       <Input
    //         type="text"
    //         id="title"
    //         value={title}
    //         onChange={handleTitleChange}
    //       />

    //       <label htmlFor="author">Author:</label>
    //       <Input
    //         type="text"
    //         id="author"
    //         value={author}
    //         onChange={handleAuthorChange}
    //       />

    //       <label htmlFor="subject">Subject:</label>
    //       <Input
    //         type="text"
    //         id="subject"
    //         value={subject}
    //         onChange={handleSubjectChange}
    //       />

    //       {/* Adjusted keywords input */}
    //       <label htmlFor="keywords">Keywords:</label>
    //       <Input
    //         type="text"
    //         id="keywords"
    //         value={keywords[0] || ""}
    //         onChange={handleKeywordsChange}
    //       />

    //       {/* Button to set custom dates */}
    //       <Button onClick={setCustomDates}>Set Custom Dates</Button>

    //       <Button onClick={saveChanges}>Save Changes</Button>
    //     </div>
    //   )}
    // </div>
  );
};

export default PdfEditor;
