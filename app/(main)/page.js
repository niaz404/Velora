import HomeBanner from "./_components/homePage/HomeBanner";
import CraftsmanshipStrip from "./_components/homePage/CraftsmanshipStrip";
import CategoryShowcase from "./_components/homePage/CategoryShowcase";
import Products from "./_components/homePage/Products";
import Testimonials from "./_components/homePage/Testimonials";
import Newsletter from "./_components/homePage/Newsletter";

export const metadata = {
  title: "Velora | Boutique Handcrafted Crochet Bags, Plushies & Accessories",
  description:
    "Discover luxurious handcrafted crochet bags, keychains, plushies, and custom bespoke orders made with premium milk cotton yarn in Bangladesh.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-0">
      <HomeBanner />
      <CraftsmanshipStrip />
      <CategoryShowcase />
      <Products />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
