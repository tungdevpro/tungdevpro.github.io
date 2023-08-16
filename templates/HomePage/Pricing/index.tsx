import Link from "next/link";
import Section from "@/components/Section";
import Image from "@/components/Image";
import Heading from "@/components/Heading";
import PricingList from "@/components/PricingList";

type PricingProps = {};

const Pricing = ({}: PricingProps) => {
    return (
        <Section className="overflow-hidden">
            <div className="container relative z-2">
                <div className="hidden relative justify-center mb-[6.5rem] lg:flex">
                    <Image
                        className="relative z-1"
                        src="/images/figures/4-small.png"
                        width={255}
                        height={255}
                        alt="Sphere"
                    />
                    <div className="absolute top-1/2 left-1/2 w-[59.5rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <Image
                            className="w-full"
                            src="/images/pricing/stars.svg"
                            width={952}
                            height={396}
                            alt="Stars"
                        />
                    </div>
                </div>
                <Heading
                    tag="Get started with Brainwave"
                    title="Pay once, use forever"
                />
                <div className="relative">
                    <PricingList />
                    <div className="hidden lg:block absolute top-1/2 right-full w-[92.5rem] h-[11.0625rem] -translate-y-1/2 pointer-events-none">
                        <Image
                            className="w-full"
                            src="/images/pricing/lines.svg"
                            width={1480}
                            height={177}
                            alt="Lines"
                        />
                    </div>
                    <div className="hidden lg:block absolute top-1/2 left-full w-[92.5rem] h-[11.0625rem] -translate-y-1/2 -scale-x-100 pointer-events-none">
                        <Image
                            className="w-full"
                            src="/images/pricing/lines.svg"
                            width={1480}
                            height={177}
                            alt="Lines"
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-8 md:mt-15 xl:mt-20">
                    <Link
                        className="text-xs font-code font-bold tracking-wider uppercase border-b border-n-1 transition-colors hover:border-n-1/0"
                        href="/pricing"
                    >
                        See the full details
                    </Link>
                </div>
            </div>
        </Section>
    );
};

export default Pricing;
