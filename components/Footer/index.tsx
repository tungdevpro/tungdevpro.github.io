import Link from "next/link";
import Section from "../Section";
import Logo from "../Logo";
import Image from "../Image";

import { navigation } from "@/constants/navigation";
import { socials } from "@/constants/socials";

type FooterProps = {};

const Footer = ({}: FooterProps) => (
    <Section
        className="pt-11 pb-6 px-5 lg:pt-[6.5rem] lg:px-7.5 lg:pb-12 xl:px-10"
        crosses
        customPaddings
    >
        <div className="flex items-center justify-center h-[6.5rem] mb-6 border-b border-n-6 lg:justify-start">
            <Logo />
            <nav className="hidden lg:flex items-center justify-center ml-auto">
                {navigation.slice(0, -1).map((item) => (
                    <Link
                        className={`px-12 py-8 font-code text-xs font-semibold leading-5 uppercase text-n-1/50 transition-colors hover:text-n-1`}
                        href={item.url}
                        key={item.id}
                    >
                        {item.title}
                    </Link>
                ))}
            </nav>
        </div>
        <div className="lg:flex lg:items-center lg:justify-between">
            <div className="hidden caption text-n-4 lg:block">
                © {new Date().getFullYear()} UI8
            </div>
            <div className="flex justify-center -mx-4">
                {socials.map((item) => (
                    <a
                        className="flex items-center justify-center w-10 h-10 mx-4 bg-n-7 rounded-full transition-colors hover:bg-n-6"
                        href={item.url}
                        target="_blank"
                        key={item.id}
                    >
                        <Image
                            src={item.iconUrl}
                            width={16}
                            height={16}
                            alt={item.title}
                        />
                    </a>
                ))}
            </div>
        </div>
    </Section>
);

export default Footer;
