"use client";
// React is used implicitly with JSX
import { ContainerScroll } from './container-scroll-animation';

export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Turn Your Car Builds Into <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-primary-500">
                Digital Portfolios
              </span>
            </h1>
          </>
        }
      >
        <img
          src={`/car-showcase.webp`}
          alt="Car showcase"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-center"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
