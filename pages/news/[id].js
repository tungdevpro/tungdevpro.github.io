import Layout from "../../components/Layout";
import { getAllNewsIds, getNewData, getSortedNewsData } from "../../lib/news";
import cn from "classnames";
import Head from "next/head";
import Date from "../../components/Date";
import styles from "./id.module.css";
import Breadcrumb from "../../components/Breadcrumb";
import Link from "next/link";
import Icon from "../../components/Icon";
import ScrollAnimation from "../../components/ScrollAnimation";

const projects = [
  {
    link: "/",
    image: "/images/09.jpg",
  },
  {
    link: "/",
    image: "/images/08.jpg",
  },
  {
    link: "/",
    image: "/images/07.jpg",
  },
  {
    link: "/",
    image: "/images/06.jpg",
  },
];

export async function getStaticPaths() {
  const paths = getAllNewsIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const newData = await getNewData(params.id);
  const allNewsData = getSortedNewsData();

  return {
    props: {
      newData,
      allNewsData,
    },
  };
}

const New = ({ newData, allNewsData }) => {
  return (
    <Layout>
      <Head>
        <title>{newData.title}</title>
      </Head>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.content}>
            <div className={styles.breadcrumb}>
              <Link href="/">
                <a className={cn("hairline-small", styles.breadcrumb_text)}>
                  HOME
                </a>
              </Link>
              <Icon name="arrow-right" />
              <p className={cn("hairline-small", styles.breadcrumb_tag)}>
                {newData.tag}
              </p>
              <Icon name="arrow-right" />
              <p className={cn("hairline-small", styles.breadcrumb_title)}>
                {newData.intro}
              </p>
            </div>
            <ScrollAnimation>
              <h1 className={cn("h2", styles.title)}>{newData.title}</h1>
            </ScrollAnimation>
            <div className={styles.breadcrumb}>
              <Date dateString={newData.date} />/
              <p className={cn("hairline-small", styles.author)}>
                {newData.tag}
              </p>
            </div>
            <div className={styles.image_container}>
              <img className={styles.image} src={newData.image} />
            </div>

            <div
              className={cn("caption", styles.contentHtml)}
              dangerouslySetInnerHTML={{ __html: newData.contentHtml }}
            />
          </div>

          <div className={styles.side_content}>
            <h1 className={cn("body-bold")}>Recent News</h1>
            <div className={styles.news_grid}>
              {allNewsData.map(({ id, image, tag, title }) => (
                <ScrollAnimation key={id}>
                  <Link href={`/news/${id}`}>
                    <a>
                      <div className={styles.news_item}>
                        <div className={styles.news_image_container}>
                          <img src={image} />
                        </div>
                        <div className={styles.news_content}>
                          <h4 className={cn("body-2-bold", styles.news_title)}>
                            {title}
                          </h4>
                          <p className={cn("caption")}>{tag}</p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default New;
