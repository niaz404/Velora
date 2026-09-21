import { Star, CheckCircle2, Quote } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Tanzina Rahman",
      city: "Dhaka",
      product: "Crochet Lavender Daisy Bag",
      rating: 5,
      comment:
        "The stitching quality is out of this world! The milk cotton yarn feels so premium and sturdy. I get compliments every time I wear it out.",
    },
    {
      id: 2,
      name: "Ayesha Siddiqua",
      city: "Chittagong",
      product: "Handmade Bunny Plush",
      rating: 5,
      comment:
        "Ordered this as a gift for my sister and she absolutely fell in love. The packaging was beautiful and gift-ready. Highly recommend Velora!",
    },
    {
      id: 3,
      name: "Nusrat Jahan",
      city: "Sylhet",
      product: "Custom Floral Keychain Set",
      rating: 5,
      comment:
        "I requested a custom pastel color combination and they made it exactly how I imagined! Super fast response on WhatsApp too.",
    },
  ];

  return (
    <section className="border-t border-[#E8DFD1] bg-[#FFFDF8] py-18 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-[#F5EFE4] px-4 py-1.5 text-xs font-semibold text-[#7A6A53]">
            Verified Customer Stories
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-[#2B2B2B] sm:text-4xl">
            Loved by Crochet Enthusiasts
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[#6F6A63]">
            Discover why hundreds of customers trust Velora for their handmade gifts and everyday accessories.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="relative flex flex-col justify-between rounded-3xl border border-[#E8DFD1] bg-white p-8 shadow-xs transition duration-300 hover:shadow-md hover:border-[#7A6A53]"
            >
              <div className="space-y-4">
                {/* STARS & QUOTE ICON */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote size={24} className="text-[#E8DFD1]" />
                </div>

                <p className="text-sm leading-relaxed text-[#4A453E] italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="mt-8 border-t border-[#F5EFE4] pt-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#2B2B2B] flex items-center gap-1.5">
                      {rev.name}
                      <CheckCircle2 size={14} className="text-green-600" title="Verified Buyer" />
                    </h4>
                    <p className="text-xs text-[#6F6A63]">{rev.city}, Bangladesh</p>
                  </div>
                  <span className="text-[11px] font-medium text-[#7A6A53] bg-[#F5EFE4] px-2.5 py-1 rounded-full">
                    {rev.product}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
