import { Heart, Sparkles, Truck, ShieldCheck } from "lucide-react";

export default function CraftsmanshipStrip() {
  const features = [
    {
      icon: Heart,
      title: "100% Handcrafted",
      description: "Every single piece is intricately made stitch-by-stitch with devotion.",
    },
    {
      icon: Sparkles,
      title: "Customizable Colors",
      description: "Pick your favorite shades or request personalized dimensions.",
    },
    {
      icon: Truck,
      title: "Nationwide Delivery",
      description: "Fast, tracked shipping across Bangladesh with careful packaging.",
    },
    {
      icon: ShieldCheck,
      title: "Quality Guaranteed",
      description: "Premium milk cotton yarn that maintains its soft texture and vibrancy.",
    },
  ];

  return (
    <section className="border-y border-[#E8DFD1] bg-white py-10 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-2 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#F5EFE4] text-[#7A6A53] shadow-xs">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#2B2B2B]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#6F6A63]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
