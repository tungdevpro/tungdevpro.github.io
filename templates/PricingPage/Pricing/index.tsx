import Section from "@/components/Section";
import Heading from "@/components/Heading";
import PricingList from "@/components/PricingList";
import { useState } from "react";
import Logos from "@/components/Logos";

type PricingProps = {};

const Pricing = ({}: PricingProps) => {
    const [monthly, setMonthly] = useState<boolean>(false);

    return (
        <Section className="overflow-hidden">
            <div className="container relative z-2 md:pt-10 lg:pt-16 xl:pt-20">
                <Heading
                    textAlignClassName="text-center"
                    titleLarge="Pay once, use forever"
                    textLarge="Get started with Brainwave - AI chat app today and experience the power of AI in your conversations!"
                />
                <div className="w-[19rem] mx-auto mb-10 p-0.25 bg-gradient-to-b from-[#D77DEE]/90 to-n-1/15 rounded-xl">
                    <div className="flex p-[0.1875rem] bg-n-8 rounded-[0.6875rem]">
                        <button
                            className={`button flex-1 h-10 rounded-lg transition-colors ${
                                monthly ? "bg-n-6" : ""
                            }`}
                            onClick={() => setMonthly(true)}
                        >
                            monthly
                        </button>
                        <button
                            className={`button flex-1 h-10 rounded-lg transition-colors ${
                                monthly ? "" : "bg-n-6"
                            }`}
                            onClick={() => setMonthly(false)}
                        >
                            annually
                            <span className="ml-2.5 p-1 bg-color-1 rounded">
                                -10%
                            </span>
                        </button>
                    </div>
                </div>
                <PricingList monthly={monthly} />
                <Logos className="hidden mt-20 lg:block" />
            </div>
        </Section>
    );
};

export default Pricing;
