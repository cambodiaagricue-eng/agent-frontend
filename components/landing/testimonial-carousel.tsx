"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Left side — avatars stack */}
        <div className="flex md:flex-col items-center gap-3 md:w-48 flex-shrink-0">
          {testimonials.map((item, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative rounded-full overflow-hidden transition-all duration-300 cursor-pointer ${
                i === current
                  ? "h-20 w-20 ring-3 ring-[#2F7D32] ring-offset-2"
                  : "h-14 w-14 opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                src={item.avatar}
                alt={item.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>

        {/* Right side — quote */}
        <div className="flex-1">
          <Quote className="h-10 w-10 text-[#2F7D32]/20 mb-4" />
          <blockquote
            className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-6 transition-opacity duration-300"
            key={current}
          >
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#2F7D32] hover:text-white hover:border-[#2F7D32] transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#2F7D32] hover:text-white hover:border-[#2F7D32] transition-colors cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
