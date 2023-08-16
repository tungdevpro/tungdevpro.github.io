import Section from "@/components/Section";
import Image from "@/components/Image";
import Button from "@/components/Button";

type HelpProps = {};

const Help = ({}: HelpProps) => (
    <Section crosses>
        <div className="container pt-10 pb-10 lg:grid lg:grid-cols-2 lg:gap-20 lg:items-center lg:p-0">
            <div className="hidden lg:block">
                <div>
                    <Image
                        src="/images/help/help.png"
                        width={756}
                        height={756}
                        alt="Help"
                    />
                </div>
            </div>
            <div>
                <h2 className="h2 mb-4 md:mb-6">Need help?</h2>
                <p className="body-2 mb-5 text-n-3">
                    Can’t find your answer, contact us
                </p>
                <ul>
                    {[
                        {
                            id: "0",
                            title: "Join our community",
                            text: "Discuss anything with other users",
                        },
                        {
                            id: "1",
                            title: "Email us",
                            text: "hello@brainwave.com",
                        },
                    ].map((item) => (
                        <li
                            className="flex items-center py-10 border-b border-n-1/15"
                            key={item.id}
                        >
                            <div className="flex items-center justify-center w-15 h-15 mr-10 bg-n-7 border border-n-1/15 rounded-xl">
                                <Image
                                    src="/images/icons/building-01.svg"
                                    width={24}
                                    height={24}
                                    alt="Contact"
                                />
                            </div>
                            <div>
                                <h6 className="h6 text-n-3">{item.title}</h6>
                                <p className="body-2 text-n-2">{item.text}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </Section>
);

export default Help;
