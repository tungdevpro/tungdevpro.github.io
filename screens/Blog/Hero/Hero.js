import cn from "classnames";
import Breadcrumb from "../../../components/Breadcrumb";
import styles from "./hero.module.css";
import { motion } from "framer-motion";
import { item, variants } from "../../../variants/animation";
import ScrollAnimation from "../../../components/ScrollAnimation";
import Item from "../../../components/News/Item";
import Link from "next/link";

const Hero = ({ allNewsData }) => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={variants}
      className={cn("section", styles.section)}
    >
      <div className={cn("container", styles.container)}>
        <div className={styles.content}>
          <Breadcrumb name="BLOG" />
          <motion.h1 variants={item} className={cn("hero", styles.title)}>
            Blog
          </motion.h1>
        </div>

        <div className={styles.wrapper}>
          {allNewsData.map(({ id, image, tag, title }) => (
            <ScrollAnimation key={id}>
              <Link href={`/news/${id}`}>
                <a>
                  <Item image={image} tag={tag} title={title} />
                </a>
              </Link>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
