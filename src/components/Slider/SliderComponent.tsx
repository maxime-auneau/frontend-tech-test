import React, {useEffect, useState} from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { BsFillPlayFill } from 'react-icons/bs';
import { RxDot, RxDotFilled } from 'react-icons/rx';
export function SliderComponent({ sliderData }: { sliderData: any }): JSX.Element | null {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? sliderData.items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === sliderData.items.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="max-w-[1400px] h-[780px] w-full py-16 relative group">
      <div
        style={{
          backgroundImage: `url(${
            sliderData.items[currentIndex].thumbnail || sliderData.items[currentIndex].poster
          })`,
        }}
        className="w-full h-full bg-center bg-cover duration-500 relative"
      >
        <div className="absolute -translate-x-0 top-[70%] w-[45%] left-20">
          <div className="text-white font-light mb-2 text-sm">
            <p className="text-ellipsis overflow-hidden whitespace-nowrap">
              {sliderData.items[currentIndex].description}
            </p>
          </div>
          <div className="text-white font-bold mb-5 text-4xl">
            <p>{sliderData.items[currentIndex].name.toUpperCase()}</p>
          </div>
          <div className="bg-blue-500 hover:bg-blue-700 text-white font-light py-2 px-4 w-[120px] rounded-[10px] cursor-pointer">
            <div className="flex items-center justify-around">
              <p>{sliderData.items[currentIndex].itemType.toUpperCase()}</p>{' '}
              <div>
                <BsFillPlayFill />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-2 absolute bottom-0 w-full">
          {sliderData.items.map((slide: any, slideIndex: number) => (
            <div
              key={slideIndex}
              onClick={() => {
                setCurrentIndex(slideIndex);
                goToSlide(slideIndex);
              }}
              className="text-2xl cursor-pointer"
            >
              {slideIndex === currentIndex ? (
                <RxDotFilled className="text-blue-500 pb-2" size={50} />
              ) : (
                <RxDot className="text-white" size={40} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={20} />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={20} />
      </div>
    </div>
  );
}
