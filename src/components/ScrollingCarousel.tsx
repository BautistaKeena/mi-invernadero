"use client";
import { motion } from "framer-motion";

interface ScrollingCarouselProps {
  images: string[];
  duration?: number;
  className?: string;
}

export default function ScrollingCarousel({ images, duration = 20, className }: ScrollingCarouselProps) {
  const duplicated = [...images, ...images];
  return (
    <div className={`overflow-hidden ${className || ""}`}> 
      <motion.div
        className="flex w-max gap-2"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {duplicated.map((img, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-20 h-16 md:w-24 md:h-20 border border-green-natural/40 rounded-lg overflow-hidden"
          >
            <img src={img} alt={`imagen ${idx + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
