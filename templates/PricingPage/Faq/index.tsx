import { useState } from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";

import { faq } from "@/mocks/faq";

type FaqProps = {};

const Faq = ({}: FaqProps) => {
    const [activeId, setActiveId] = useState<string | null>(faq[0].id);

    return (
        <Section>
            <div className="container lg:flex">
                <Heading
                    className="lg:min-w-[22.75rem] lg:mr-12 lg:pt-8 xl:min-w-[32.75rem]"
                    textAlignClassName="md:text-center lg:text-left"
                    title="Frequently asked questions"
                    text={
                        <>
                            Haven’t found what you’re looking for?{" "}
                            <a
                                className="text-n-1 hover:text-color-2"
                                href="mailto:info@ui8.net"
                            >
                                Contact us
                            </a>
                        </>
                    }
                />
                <div className="-mt-8 lg:mt-0">
                    {faq.map((item) => (
                        <div
                            className="py-8 border-b border-n-1/5"
                            key={item.id}
                        >
                            <div
                                className="flex items-start justify-between cursor-pointer"
                                onClick={() =>
                                    setActiveId(
                                        activeId === item.id ? null : item.id
                                    )
                                }
                            >
                                <div className="text-[1.25rem] leading-8">
                                    {item.title}
                                </div>
                                <div className="relative w-6 h-6 mt-1 ml-10">
                                    <div className="absolute top-[0.6875rem] left-1 w-4 h-0.5 bg-n-1 rounded-sm"></div>
                                    <div
                                        className={`absolute top-[0.6875rem] left-1 w-4 h-0.5 bg-n-1 rounded-sm transition-transform ${
                                            item.id === activeId
                                                ? ""
                                                : "rotate-90"
                                        }`}
                                    ></div>
                                </div>
                            </div>
                            <div
                                className={`grid grid-rows-[0fr] transition-all ${
                                    item.id === activeId
                                        ? "grid-rows-[1fr]"
                                        : ""
                                }`}
                            >
                                <div className="body-2 text-n-3 overflow-hidden">
                                    <div className="pt-6">{item.text}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Faq;
