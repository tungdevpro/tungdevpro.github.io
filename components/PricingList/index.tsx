import { useRef, useState } from "react";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import Button from "@/components/Button";
import Image from "@/components/Image";

import { pricing } from "@/mocks/pricing";

type PricingListProps = {
    monthly?: boolean;
};

const PricingList = ({ monthly = true }: PricingListProps) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const ref = useRef<any>(null);

    const handleClick = (index: number) => {
        setActiveIndex(index);
        ref.current?.go(index);
    };

    return (
        <Splide
            className="splide-pricing splide-visible"
            options={{
                mediaQuery: "min",
                autoWidth: true,
                pagination: false,
                arrows: false,
                gap: "1rem",
                breakpoints: {
                    1024: {
                        destroy: true,
                    },
                },
            }}
            onMoved={(e, newIndex) => setActiveIndex(newIndex)}
            hasTrack={false}
            ref={ref}
        >
            <SplideTrack>
                {pricing.map((item, index) => (
                    <SplideSlide
                        className={`${index === 1 ? "" : "py-3"}`}
                        key={item.id}
                    >
                        <div
                            className={`w-[19rem] h-full px-6 ${
                                index === 1 ? "py-12" : "py-8"
                            } bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto`}
                            key={item.id}
                        >
                            <h4
                                className={`h4 mb-4 ${
                                    index === 0 ? "text-color-2" : ""
                                } ${index === 1 ? "text-color-1" : ""} ${
                                    index === 2 ? "text-color-3" : ""
                                }`}
                            >
                                {item.title}
                            </h4>
                            <p className="body-2 min-h-[4rem] mb-3 text-n-1/50">
                                {item.description}
                            </p>
                            <div className="flex items-center h-[5.5rem] mb-6">
                                {item.price && (
                                    <>
                                        <div className="h3">$</div>
                                        <div className="text-[5.5rem] leading-none font-bold">
                                            {monthly
                                                ? item.price
                                                : item.price !== "0"
                                                ? (
                                                      +item.price *
                                                      12 *
                                                      0.9
                                                  ).toFixed(1)
                                                : item.price}
                                        </div>
                                    </>
                                )}
                            </div>
                            <Button
                                className="w-full mb-6"
                                href={
                                    item.price
                                        ? "/pricing"
                                        : "mailto:info@ui8.net"
                                }
                                white={!!item.price}
                            >
                                {item.price ? "Get started" : "Contact us"}
                            </Button>
                            <ul>
                                {item.features.map((feature, index) => (
                                    <li
                                        className="flex items-start py-5 border-t border-n-6"
                                        key={index}
                                    >
                                        <Image
                                            src="/images/check.svg"
                                            width={24}
                                            height={24}
                                            alt="Check"
                                        />
                                        <p className="body-2 ml-4">{feature}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </SplideSlide>
                ))}
            </SplideTrack>
            <div className="flex justify-center mt-8 -mx-2 md:mt-15 lg:hidden">
                {pricing.map((item, index) => (
                    <button
                        className="relative w-6 h-6 mx-2"
                        onClick={() => handleClick(index)}
                        key={item.id}
                    >
                        <span
                            className={`absolute inset-0 bg-conic-gradient rounded-full transition-opacity ${
                                index === activeIndex
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                        ></span>
                        <span className="absolute inset-0.25 bg-n-8 rounded-full">
                            <span className="absolute inset-2 bg-n-1 rounded-full"></span>
                        </span>
                    </button>
                ))}
            </div>
        </Splide>
    );
};

export default PricingList;
