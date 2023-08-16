import Layout from "../components/Layout";
import { Hero } from "../screens/Blog";

import { getSortedNewsData } from "../lib/news";

export async function getStaticProps() {
  const allNewsData = getSortedNewsData();

  return {
    props: {
      allNewsData,
    },
  };
}

const Blog = ({ allNewsData }) => {
  return (
    <Layout>
      <Hero allNewsData={allNewsData} />
    </Layout>
  );
};

export default Blog;
