import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Generating from "@/components/Generating";
import Image from "@/components/Image";

type HeroProps = {};

const Hero = ({}: HeroProps) => (
    <Section>
        <div className="container md:pt-10 lg:pt-16 xl:pt-20">
            <Heading
                className="md:mb-15"
                textAlignClassName="text-center"
                titleLarge="Roadmap"
                textLarge="This document provides a comprehensive guide to developing a chat AI app, including its key features and development steps."
            >
                <Button
                    className="mt-8 md:mt-12"
                    href="mailto:info@ui8.net"
                    white
                >
                    Suggest features
                </Button>
            </Heading>
            <div className="relative max-w-5xl mx-auto">
                <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
                    <div className="relative bg-n-8 rounded-[0.875rem]">
                        <div className="h-[1.375rem] bg-[#43435C] rounded-t-[0.875rem]"></div>
                        <div className="relative h-[30.625rem] rounded-b-[0.875rem] overflow-hidden">
                            <Image
                                className="absolute top-1/2 left-1/2 max-w-none -translate-x-[51%] -translate-y-[58%]"
                                src="/images/roadmap/hero.png"
                                width={654}
                                height={932}
                                alt="Hero"
                            />
                        </div>
                        <div className="hidden absolute -top-20 left-[14%] md:block pointer-events-none">
                            <Image
                                className="w-full"
                                src="/images/roadmap/coins.png"
                                width={76}
                                height={190}
                                alt="Coins"
                            />
                        </div>
                        <Generating className="absolute left-4 right-4 bottom-5 border border-n-1/10 md:left-1/2 md:right-auto md:bottom-8 md:w-[30.5rem] md:-translate-x-1/2" />
                    </div>
                </div>
                <div className="relative z-1 h-6 mx-2.5 bg-[#1B1B2E] shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-8"></div>
                <div className="relative z-1 h-6 mx-6 bg-[#1B1B2E]/70 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-20"></div>
            </div>
        </div>
    </Section>
);

export default Hero;
