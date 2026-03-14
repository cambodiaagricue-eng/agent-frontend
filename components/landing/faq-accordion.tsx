"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between py-5 px-1 text-left group cursor-pointer"
          >
            <span className="text-base font-medium text-gray-800 group-hover:text-[#2F7D32] transition-colors pr-8">
              {item.question}
            </span>
            <span className="flex-shrink-0 h-8 w-8 rounded-full bg-[#E8F5E9] flex items-center justify-center group-hover:bg-[#2F7D32] group-hover:text-white transition-colors">
              {openIndex === i ? (
                <Minus className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === i ? "max-h-60 opacity-100 pb-5" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-sm text-gray-600 leading-relaxed px-1 pr-12">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
