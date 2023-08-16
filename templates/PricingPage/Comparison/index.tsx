import Tippy from "@tippyjs/react";
import Heading from "@/components/Heading";
import Image from "@/components/Image";
import Section from "@/components/Section";

import { comparison } from "@/mocks/comparison";

type ComparisonProps = {};

const Comparison = ({}: ComparisonProps) => {
    const check = (value: any, enterprise?: boolean) =>
        typeof value === "boolean" ? (
            value === true ? (
                <Image
                    src={
                        enterprise
                            ? "/images/check-yellow.svg"
                            : "/images/check.svg"
                    }
                    width={24}
                    height={24}
                    alt="Check"
                />
            ) : null
        ) : (
            value
        );

    return (
        <Section>
            <div className="container">
                <Heading
                    className="md:text-center"
                    title="Compare plans & features"
                />
                <div className="-mx-5 px-5 overflow-auto">
                    <table className="table-fixed w-full min-w-[32rem]">
                        <tbody>
                            <tr className="h6">
                                <td className="w-[35%] py-4 pr-10">Features</td>
                                <td className="p-4 text-center text-color-2">
                                    Basic
                                </td>
                                <td className="p-4 text-center text-color-1">
                                    Premium
                                </td>
                                <td className="p-4 text-center text-color-3">
                                    Enterprise
                                </td>
                            </tr>
                            {comparison.map((item) => (
                                <tr className="body-2" key={item.id}>
                                    <td className="w-[35%] h-[4.75rem] py-2.5 pr-2.5 border-t border-n-1/5">
                                        <div className="flex items-center">
                                            {item.title}
                                            <Tippy
                                                className="p-2.5 bg-n-1 text-n-8 rounded-xl"
                                                content="Provide dedicated servers for enterprises to ensure maximum security, performance, and uptime."
                                                placement="right"
                                                animation="shift-toward"
                                            >
                                                <div className="flex-shrink-0 ml-3 opacity-30 transition-opacity hover:opacity-100">
                                                    <Image
                                                        src="/images/icons/help-circle.svg"
                                                        width={24}
                                                        height={24}
                                                        alt="Help"
                                                    />
                                                </div>
                                            </Tippy>
                                        </div>
                                    </td>
                                    <td className="h-[4.75rem] p-2.5 border-t border-n-1/5 text-center">
                                        {check(
                                            item.pricing[0],
                                            item.enterprise
                                        )}
                                    </td>
                                    <td className="h-[4.75rem] p-2.5 border-t border-n-1/5 text-center">
                                        {check(
                                            item.pricing[1],
                                            item.enterprise
                                        )}
                                    </td>
                                    <td className="h-[4.75rem] p-2.5 border-t border-n-1/5 text-center">
                                        {check(
                                            item.pricing[2],
                                            item.enterprise
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Section>
    );
};

export default Comparison;
