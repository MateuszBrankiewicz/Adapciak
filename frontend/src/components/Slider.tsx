import { useEffect, useState, useCallback } from "react";


interface SliderProps {
  data: string[];
}

export const Slider = ({ data }: SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % data.length);
  }, [data.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);
  };

  useEffect(() => {
    const timer = setTimeout(nextSlide, 4000);
    return () => clearTimeout(timer);
  }, [currentSlide, nextSlide]);

  return (
    <div className="mt-2 relative w-[600px] h-[400px] overflow-hidden rounded-lg shadow-lg">
      <div
         className="flex transition-transform duration-500 ease-in-out w-full h-full"

        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {data.map((item, idx) => (
          <img
            key={idx}
            src={item}
            alt={`Slide ${idx + 1}`}
            className="flex-shrink-0  w-full h-full object-contain"
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="material-icons absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black transition"
      >
        arrow_back
      </button>
      <button
        onClick={nextSlide}
        className="material-icons absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black transition"
      >
        arrow_forward
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {data.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 w-2 rounded-full transition-all ${
              currentSlide === idx ? "bg-white scale-125" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
