import Section from "@/components/Section";
import Generating from "@/components/Generating";
import Image from "@/components/Image";
import Heading from "@/components/Heading";

type ServicesProps = {
    containerClassName?: string;
};

const Services = ({ containerClassName }: ServicesProps) => (
    <Section>
        <div className={`container ${containerClassName || ""}`}>
            <Heading
                title="Generative AI made for creators."
                text="Brainwave unlocks the potential of AI-powered applications"
            />
            <div className="relative">
                <div className="relative z-1 flex items-center h-[38.75rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:h-[38.75rem] lg:p-20 xl:h-[45.75rem]">
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none md:w-3/5 xl:w-auto">
                        <Image
                            className="w-full h-full object-cover md:object-right"
                            src="/images/services/service-1.png"
                            width={797}
                            height={733}
                            alt="Smartest AI"
                        />
                    </div>
                    <div className="relative z-1 max-w-[17rem] ml-auto">
                        <h4 className="h4 mb-4">Smartest AI</h4>
                        <p className="bpdy-2 mb-[3.125rem] text-n-3">
                            Brainwave unlocks the potential of AI-powered
                            applications
                        </p>
                        <ul className="body-2">
                            {[
                                "Photo generating",
                                "Photo enhance",
                                "Seamless Integration",
                            ].map((item, index) => (
                                <li
                                    className="flex items-start py-4 border-t border-n-6"
                                    key={index}
                                >
                                    <Image
                                        src="/images/check.svg"
                                        width={24}
                                        height={24}
                                        alt="Check"
                                    />
                                    <p className="ml-4">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Generating className="absolute left-4 right-4 bottom-4 border border-n-1/10 lg:left-1/2 lg-right-auto lg:bottom-8 lg:-translate-x-1/2" />
                </div>
                <div className="relative z-1 grid gap-5 lg:grid-cols-2">
                    <div className="relative min-h-[38.75rem] border border-n-1/10 rounded-3xl overflow-hidden">
                        <div className="absolute inset-0">
                            <Image
                                className="w-full h-full object-cover"
                                src="/images/services/service-2.png"
                                width={630}
                                height={748}
                                alt="Smartest AI"
                            />
                        </div>
                        <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-n-8/0 to-n-8/90 lg:p-15">
                            <h4 className="h4 mb-4">Photo editing</h4>
                            <p className="body-2 text-n-3">
                                {`Automatically enhance your photos using our AI app's
                            photo editing feature. Try it now!`}
                            </p>
                        </div>
                        <div className="absolute top-8 right-8 max-w-[17.5rem] py-6 px-8 bg-black rounded-t-xl rounded-bl-xl font-code text-base lg:top-16 lg:right-[8.75rem] lg:max-w-[17.5rem]">
                            Hey Brainwave, enhance this photo
                            <svg
                                className="absolute left-full bottom-0"
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="37"
                            >
                                <path d="M21.843 37.001c3.564 0 5.348-4.309 2.829-6.828L3.515 9.015A12 12 0 0 1 0 .53v36.471h21.843z" />
                            </svg>
                        </div>
                    </div>
                    <div className="p-4 bg-n-7 rounded-3xl overflow-hidden lg:min-h-[45.75rem]">
                        <div className="py-12 px-4 xl:px-8">
                            <h4 className="h4 mb-4">Video generation</h4>
                            <p className="body-2 mb-[2.25rem] text-n-3">
                                The world’s most powerful AI photo and video art
                                generation engine.What will you create?
                            </p>
                            <ul className="flex items-center justify-between">
                                {[
                                    "/images/icons/recording-03.svg",
                                    "/images/icons/recording-01.svg",
                                    "/images/icons/disc-02.svg",
                                    "/images/icons/chrome-cast.svg",
                                    "/images/icons/sliders-04.svg",
                                ].map((item, index) => (
                                    <li
                                        className={`flex items-center justify-center ${
                                            index === 2
                                                ? "w-[3rem] h-[3rem] p-0.25 bg-conic-gradient rounded-2xl md:w-[4.5rem] md:h-[4.5rem]"
                                                : "flex w-10 h-10 bg-n-6 rounded-2xl md:w-15 md:h-15"
                                        }`}
                                        key={index}
                                    >
                                        <div
                                            className={
                                                index === 2
                                                    ? "flex items-center justify-center w-full h-full bg-n-7 rounded-[0.9375rem]"
                                                    : ""
                                            }
                                        >
                                            <Image
                                                src={item}
                                                width={24}
                                                height={24}
                                                alt={item}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative h-[20.5rem] bg-n-8 rounded-xl overflow-hidden md:h-[25rem]">
                            <Image
                                className="w-full h-full object-cover"
                                src="/images/services/service-3.png"
                                width={517}
                                height={400}
                                alt="Smartest AI"
                            />
                            <div className="absolute top-8 left-[3.125rem] w-full max-w-[14rem] pt-2.5 pr-2.5 pb-7 pl-5 bg-n-6 rounded-t-xl rounded-br-xl font-code text-base md:max-w-[17.5rem]">
                                Video generated!
                                <div className="absolute left-5 -bottom-[1.125rem] flex items-center justify-center w-[2.25rem] h-[2.25rem] bg-color-1 rounded-[0.75rem]">
                                    <Image
                                        src="/images/brainwave-symbol-white.svg"
                                        width={26}
                                        height={26}
                                        alt="Brainwave"
                                    />
                                </div>
                                <div className="tagline absolute right-2.5 bottom-1 text-[0.625rem] text-n-3 uppercase">
                                    just now
                                </div>
                                <svg
                                    className="absolute right-full bottom-0 -scale-x-100"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="26"
                                    height="37"
                                >
                                    <path
                                        className="fill-n-6"
                                        d="M21.843 37.001c3.564 0 5.348-4.309 2.829-6.828L3.515 9.015A12 12 0 0 1 0 .53v36.471h21.843z"
                                    />
                                </svg>
                            </div>
                            <div className="absolute left-0 bottom-0 w-full flex items-center p-6">
                                <svg
                                    className="mr-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                >
                                    <path
                                        d="M8.006 2.802l.036.024 10.549 7.032.805.567c.227.183.494.437.648.808a2 2 0 0 1 0 1.532c-.154.371-.421.625-.648.808-.217.175-.5.364-.805.567L8.006 21.198l-.993.627c-.285.154-.676.331-1.132.303a2 2 0 0 1-1.476-.79c-.276-.365-.346-.788-.375-1.111S4 19.502 4 19.054V4.99v-.043l.029-1.174c.03-.323.1-.746.375-1.11a2 2 0 0 1 1.476-.79c.456-.027.847.149 1.132.304s.62.378.993.627z"
                                        fill="#fff"
                                    />
                                </svg>
                                <div className="flex-1 bg-[#D9D9D9]">
                                    <div className="w-1/2 h-0.5 bg-color-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 -left-[10rem] w-[56.625rem] h-[56.625rem] opacity-50 mix-blend-color-dodge pointer-events-none">
                    <Image
                        className="absolute top-1/2 left-1/2 w-[79.5625rem] max-w-[79.5625rem] h-[88.5625rem] -translate-x-1/2 -translate-y-1/2"
                        src="/images/gradient.png"
                        width={1417}
                        height={1417}
                        alt="Gradient"
                    />
                </div>
            </div>
        </div>
    </Section>
);

export default Services;
