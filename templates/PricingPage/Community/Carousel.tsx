import { useRef, useState } from "react";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import Comment from "./Comment";

type CarouselProps = {
    items: any;
};

const Carousel = ({ items }: CarouselProps) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const ref = useRef<any>(null);

    const handleClick = (index: number) => {
        setActiveIndex(index);
        ref.current?.go(index);
    };

    return (
        <Splide
            className="splide-visible relative z-2"
            options={{
                pagination: false,
                arrows: false,
                gap: "1.5rem",
            }}
            onMoved={(e, newIndex) => setActiveIndex(newIndex)}
            hasTrack={false}
            ref={ref}
        >
            <SplideTrack>
                {items.map((item: any) => (
                    <SplideSlide key={item.id}>
                        <div className="flex h-full">
                            <Comment comment={item} />
                        </div>
                    </SplideSlide>
                ))}
            </SplideTrack>
            <div className="flex justify-center mt-8 -mx-2 md:mt-15 lg:hidden">
                {items.map((item: any, index: number) => (
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

export default Carousel;
