"use client";

import Layout from "@/components/Layout";
import Hero from "./Hero";
import Benefits from "./Benefits";
import Features from "./Features";
import Collaboration from "./Collaboration";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";
import Roadmap from "./Roadmap";
import Services from "@/components/Services";
import Join from "@/components/Join";

const HomePage = () => {
    return (
        <Layout>
            <Hero />
            <Benefits />
            <Features />
            <Collaboration />
            <HowItWorks />
            <Services />
            <Pricing />
            <Testimonials />
            <Roadmap />
            <Join />
        </Layout>
    );
};

export default HomePage;
