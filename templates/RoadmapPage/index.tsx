"use client";

import Layout from "@/components/Layout";
import Join from "@/components/Join";
import Hero from "./Hero";
import Roadmap from "./Roadmap";

const RoadmapPage = () => {
    return (
        <Layout>
            <Hero />
            <Roadmap />
            <Join />
        </Layout>
    );
};

export default RoadmapPage;
