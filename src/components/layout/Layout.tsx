import { useQuery } from 'react-query';
import clsx from 'clsx';

import Cms from '../../services/Cms';
import { getComponentData, getWebConfigData } from '../../services/GetData';
import Footer from './Footer';
import Header from './Header';

import { CarouselComponent } from '$components/Carousel/CarouselComponent';
import { SliderComponent } from '$components/Slider/SliderComponent';
import { DEFAULT_LANGUAGE, KENTICO_HARDCODED_PAGES } from '$utils/constants';
import React from "react";

function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  const { data: pageData } = useQuery(
    'page',
    () => Cms.getPageContent(KENTICO_HARDCODED_PAGES.HOME, { params: DEFAULT_LANGUAGE }),
    {
      initialData: children?.props?.page.components,
    },
  );

  const { data: webConfig } = useQuery('webConfig', () => Cms.getConfig(), {
    initialData: children?.props?.webConfig,
  });
  const headerData: any = getWebConfigData(webConfig, 'header');
  const footerData: any = getWebConfigData(webConfig, 'footer');
  const sliderData: any = getComponentData(pageData, 'section_static_slider');
  const carouselData: any = getComponentData(pageData, 'section_static_carousel');
  return (
    <>
      <div className="flex min-h-screen w-full flex-col gap-10 overflow-hidden">
        <Header header={headerData} />
        <main
          className={clsx('mx-auto flex w-full flex-grow flex-col content-spacer overflow-hidden')}
        >
          <SliderComponent sliderData={sliderData} />
          <CarouselComponent carouselData={carouselData} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
