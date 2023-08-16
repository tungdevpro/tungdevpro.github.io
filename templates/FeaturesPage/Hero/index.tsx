import Heading from "@/components/Heading";
import Image from "@/components/Image";
import Section from "@/components/Section";

type HeroProps = {};

const Hero = ({}: HeroProps) => (
    <Section className="overflow-hidden md:-mb-10 xl:-mb-20">
        <div className="container relative z-2 md:grid md:grid-cols-2 md:items-center md:gap-10 lg:gap-48">
            <Heading
                className="md:mt-12 lg:max-w-[30rem] lg:mt-20"
                textAlignClassName="md:text-left"
                titleLarge="Main features of Brainwave"
                textLarge="Here are some of the core features of Brainwavethat make it stand out from other chat applications"
            />
            <div className="relative">
                <Image
                    className="w-full md:min-w-[125%] xl:min-w-full"
                    src="/images/features/features.png"
                    width={547}
                    height={588}
                    alt="Features"
                />
                <div className="absolute top-0 left-1/2 w-full">
                    <Image
                        className="w-full"
                        src="/images/grid.png"
                        width={550}
                        height={550}
                        alt="Grid"
                    />
                </div>
            </div>
        </div>
    </Section>
);

export default Hero;
