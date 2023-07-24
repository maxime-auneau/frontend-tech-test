import React from 'react';

function Footer({ footerData }: { footerData: any }): JSX.Element {
  console.log(footerData);
  return (
    <>
      <div className="bg-gray-800">
        <div className="max-w-2xl mx-auto text-white py-10">
          <div className="text-center flex-col justify-center items-center flex">
            <h3 className="text-3xl mb-3"> Retrouvez nous sur nos réseaux sociaux </h3>
            <div className="flex justify-center my-10">
              <div className="text-center flex flex-col">
                {footerData.socialItems.map((data: any, index: number) => {
                  return (
                    <a
                      key={index}
                      href={data.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-lg hover:text-blue-500 transition-all duration-300 mb-3"
                    >
                      {data.socialName.toUpperCase()}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
            <img
              src={footerData.logo.url}
              width="200px"
              height="200px"
              className="mb-10"
              alt={footerData.name}
            />
            <div className="order-2 md:order-1 flex items-center justify-center flex-row">
              <p
                dangerouslySetInnerHTML={{
                  __html: `${footerData.copyright}`,
                }}
                className=""
              />
            </div>
            <div className="order-1 md:order-2">
              {footerData.menuItems.map((data: any, index: number) => {
                return (
                  <span key={index} className="px-2 last-of-type:border-l-2 cursor-pointer">
                    {data.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
