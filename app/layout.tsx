import "@splidejs/react-splide/css";
import "tippy.js/animations/shift-toward.css";
import "./globals.css";
import { Sora, Source_Code_Pro, Space_Grotesk } from "next/font/google";

const sora = Sora({
    weight: ["300", "400", "600"],
    subsets: ["latin"],
    display: "block",
    variable: "--font-sora",
});

const code = Source_Code_Pro({
    weight: ["400", "600", "700"],
    subsets: ["latin"],
    display: "block",
    variable: "--font-code",
});

const grotesk = Space_Grotesk({
    weight: ["300"],
    subsets: ["latin"],
    display: "block",
    variable: "--font-grotesk",
});

export const metadata = {
    title: "Brainwave - AI Landing Page Kit",
    description:
        "Beautiful AI Landing Page UI Kit for your next website projects",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta
                    content="Beautiful AI Landing Page UI Kit for your next website projects"
                    name="Brainwave - AI Landing Page Kit"
                />
                <meta
                    content="Brainwave - AI Landing Page Kit"
                    property="og:title"
                />
                <meta
                    content="Beautiful AI Landing Page UI Kit for your next website projects"
                    property="og:description"
                />
                <meta
                    content="%PUBLIC_URL%/fb-og-image.png"
                    property="og:image"
                />
                <meta
                    property="og:url"
                    content="https://ui8.net/ui8/products/brainwave-ai-landing-page-kit"
                />
                <meta
                    property="og:site_name"
                    content="Brainwave - AI Landing Page Kit"
                />
                <meta
                    content="Brainwave - AI Landing Page Kit"
                    property="twitter:title"
                />
                <meta
                    content="Beautiful AI Landing Page UI Kit for your next website projects"
                    property="twitter:description"
                />
                <meta
                    content="%PUBLIC_URL%/twitter-card.png"
                    property="twitter:image"
                />
                <meta property="og:type" content="Article" />
                <meta content="summary" name="twitter:card" />
                <meta name="twitter:site" content="@ui8" />
                <meta name="twitter:creator" content="@ui8" />
                <meta property="fb:admins" content="132951670226590" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1"
                />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </head>
            <body
                className={`${sora.variable} ${code.variable} ${grotesk.variable} font-sans bg-n-8 text-n-1 text-base`}
            >
                {children}
                <svg className="block" width={0} height={0}>
                    <defs>
                        <linearGradient
                            id="btn-left"
                            x1="50%"
                            x2="50%"
                            y1="0%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="#89F9E8" />
                            <stop offset="100%" stopColor="#FACB7B" />
                        </linearGradient>
                        <linearGradient
                            id="btn-top"
                            x1="100%"
                            x2="0%"
                            y1="50%"
                            y2="50%"
                        >
                            <stop offset="0%" stopColor="#D87CEE" />
                            <stop offset="100%" stopColor="#FACB7B" />
                        </linearGradient>
                        <linearGradient
                            id="btn-bottom"
                            x1="100%"
                            x2="0%"
                            y1="50%"
                            y2="50%"
                        >
                            <stop offset="0%" stopColor="#9099FC" />
                            <stop offset="100%" stopColor="#89F9E8" />
                        </linearGradient>
                        <linearGradient
                            id="btn-right"
                            x1="14.635%"
                            x2="14.635%"
                            y1="0%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="#9099FC" />
                            <stop offset="100%" stopColor="#D87CEE" />
                        </linearGradient>
                    </defs>
                </svg>
            </body>
        </html>
    );
}
