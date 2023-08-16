"use client";

import Layout from "@/components/Layout";
import Services from "@/components/Services";
import Join from "@/components/Join";
import Hero from "./Hero";
import Benefits from "./Benefits";
import Features from "./Features";
import Community from "./Community";

const FeaturesPage = () => {
    return (
        <Layout>
            <Hero />
            <Benefits />
            <Features />
            <Community />
            <Services containerClassName="md:pb-10" />
            <Join />
        </Layout>
    );
};

export default FeaturesPage;
