import { Icons } from "@/components/icons";
interface HeroProps {
  searchQuery: string; // Explicitly set the type to string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>; // Use the type from React.useState
  handleSearchSubmit: (e: React.FormEvent) => void;
}
export function Hero({
  searchQuery,
  setSearchQuery,
  handleSearchSubmit,
}: HeroProps) {
  return (
    <header>
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            <span className="block">Best Useful Tools free for</span>
            <span className="block text-blue-600">Everyone</span>
          </h1>

          <ul className="mx-auto mb-8 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8 md:gap-10 lg:mb-12">
            <li className="flex items-center">
              <Icons.check className="mr-2 h-6 w-6" />
              <p className="text-sm sm:text-base">No sign up required</p>
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-6 w-6" />
              <p className="text-sm sm:text-base">Work on any device</p>
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-6 w-6" />
              <p className="text-sm sm:text-base">100% free</p>
            </li>
          </ul>
          <div className="mx-auto mb-4 flex max-w-xl justify-center">
            <form
              onSubmit={handleSearchSubmit}
              name="search-form"
              method="get"
              className="relative w-full max-w-[80%]"
            >
              <input
                type="text"
                className="h-9 w-full border border-solid  bg-gray-100 px-3 py-6 text-sm text-black font-semibold"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
              <input
                type="submit"
                value="Search"
                className="relative right-0 top-[5px] w-full cursor-pointer bg-slate-900 px-6 py-2 text-center font-semibold text-white sm:absolute sm:right-[5px] sm:w-auto"
              />
            </form>
          </div>
          <p className="text-sm sm:text-base">No credit card required.</p>
        </div>
      </div>
    </header>
  );
}
