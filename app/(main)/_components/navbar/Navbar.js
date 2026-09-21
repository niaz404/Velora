import Icons from "./Icons";
import Logo from "./Logo";
import MobileResponsive from "./MobileResponsive";
import Navigation from "./Navigation";
import SearchBox from "./SearchBox";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#EFE7DA] backdrop-blur-md overflow-hidden py-2.5 md:py-3.5 bg-[#fcf7ee]/95">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          <Logo />
          <Navigation />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:block">
            <SearchBox />
          </div>
          <Icons />
          <MobileResponsive />
        </div>
      </div>
    </header>
  );
}
