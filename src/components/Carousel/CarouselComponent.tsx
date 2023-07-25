import React, { useEffect, useRef, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

export function CarouselComponent({ carouselData }: { carouselData: any }) {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef<HTMLElement | null>(null); // Added type here

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current;
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <>
      <div className="carousel w-[100%] flex justify-center flex-col items-center mb-10">
        <h2 className="text-4xl leading-8 font-semibold mb-2 text-slate-700 w-[95%] text-left">
          Tendances
        </h2>
        <div className="relative overflow-hidden w-[95%] flex justify-center">
          <div className="flex justify-between absolute top left w-full h-full">
            <button
              onClick={movePrev}
              className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
              disabled={isDisabled('prev')}
            >
              <BsChevronCompactLeft size={20} />
            </button>
            <button
              onClick={moveNext}
              className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
              disabled={isDisabled('next')}
            >
              <BsChevronCompactRight size={20} />
            </button>
          </div>
          <div
            ref={carousel}
            className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0 transition-all duration-500"
          >
            {carouselData.items.map((data: any, index) => {
              return (
                <div
                  key={index}
                  className="carousel-item text-center relative w-64 md:w-full h-80 snap-start group sm:max-md:width-[95%]"
                >
                  <div
                    className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
                    style={{ backgroundImage: `url(${data.thumbnail || data.poster})` }}
                  >
                    <img
                      src={data.thumbnail || data.poster}
                      alt={data.title}
                      className="w-full aspect-square hidden"
                    />
                  </div>
                  <div className="text-xlg h-[100px] w-full aspect-square absolute block bottom-0 left-0 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:bg-blue-900/75">
                    <h3 className="absolute text-white py-3 px-3 mx-auto text-lg bottom-0 transition-all duration-300 group-hover:-translate-y-10 w-full text-left">
                      {data.name}
                    </h3>
                    <p className="w-[70%] text-white text-s absolute text-white py-0 px-3 mx-auto text-light bottom-0 text-ellipsis overflow-hidden whitespace-nowrap block transition-all duration-300 group-hover:-translate-y-full">
                      {data.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
