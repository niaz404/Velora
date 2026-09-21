import Footer from "@/components/Footer";
import MobileNavigation from "./_components/navbar/MobileNavigation";
import Navbar from "./_components/navbar/Navbar";
import AnnouncementBar from "./_components/navbar/AnnouncementBar";

export default function RootLayout({ children }) {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-[#FAF7F2]">
      <div>
        <AnnouncementBar />
        <Navbar />
        <main>{children}</main>
        <MobileNavigation />
      </div>
      <Footer />
    </div>
  );
}
