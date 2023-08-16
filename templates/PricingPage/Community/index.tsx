import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Image from "@/components/Image";
const Grid = dynamic(() => import("./Grid"), { ssr: false });
const Carousel = dynamic(() => import("./Carousel"), { ssr: false });

import { community } from "@/mocks/community";

type CommunityProps = {};

const Community = ({}: CommunityProps) => {
    const isTablet = useMediaQuery({
        query: "(min-width: 768px)",
    });

    return (
        <Section>
            <div className="container">
                <Heading
                    className="md:text-center"
                    tagClassName="md:justify-center"
                    tag="ready to get started"
                    title="What the community is saying"
                />
                <div className="relative">
                    {isTablet ? (
                        <Grid items={community} />
                    ) : (
                        <Carousel items={community} />
                    )}
                    <div className="absolute top-[18.25rem] -left-[30.375rem] w-[56.625rem] opacity-60 mix-blend-color-dodge pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 w-[58.85rem] h-[58.85rem] -translate-x-3/4 -translate-y-1/2">
                            <Image
                                className="w-full"
                                src="/images/gradient.png"
                                width={942}
                                height={942}
                                alt="Gradient"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Community;
