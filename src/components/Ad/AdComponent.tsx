import { useEffect, useState } from 'react';

export function AdComponent({ adData }: { adData: any }) {
  const [isDesktop, setDesktop] = useState(false);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 768);
  };

  useEffect(() => {
    setDesktop(window.innerWidth > 768);

    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);
  return (
    <>
      <div className="flex justify-center w-full">
        <a href={adData?.redirectionTarget} target="_blank" rel="noreferrer">
          <img src={isDesktop ? adData?.image[0]?.image.url : adData?.image[0]?.mobileImage.url} />
        </a>
      </div>
    </>
  );
}
