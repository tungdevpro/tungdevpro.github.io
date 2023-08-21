import React from "react";
import Layout from "../components/Layout";
import { Hero } from "../screens/Services";

import { getSortedNewsData } from "../lib/news";

export async function getStaticProps() {
  const allNewsData = getSortedNewsData();

  return {
    props: {
      allNewsData,
    },
  };
}

export default function Services({ allNewsData }) {
  return (
    <Layout>
      <Hero />
      {/* <Pricing /> */}
      {/* <CTA
        number="02"
        background="#92A5EF"
        title="30% Discount"
        button="Learn More"
      /> */}
      {/* <News allNewsData={allNewsData} number="03" /> */}
    </Layout>
  );
}
