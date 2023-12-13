export function SiteFooter() {
  return (
    <footer className="p-4  md:p-8 lg:p-10">
      <div className="mx-auto max-w-screen-xl text-center">
        <a
          href="#"
          className="flex justify-center items-center text-2xl font-semibold "
        >
          Still Tools
        </a>
        <p className="my-6 text-gray-500 dark:text-gray-400">
          Open-source library of free tools for developers and designers.
        </p>
        <ul className="flex flex-wrap justify-center items-center mb-6 ">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              FAQs
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Contact
            </a>
          </li>
        </ul>
        <span className="text-sm ">
          © 2024{" "}
          <a href="#" className="hover:underline">
            Still
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
