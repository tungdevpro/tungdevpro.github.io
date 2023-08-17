import styles from "./hero.module.css";
import cn from "classnames";
import Stats from "./Stats";
import { motion } from "framer-motion";
import { variants, item } from "../../../variants/animation";
import Image from "next/image";
import Link from "next/link";
import { Link as AnchorLink } from "react-scroll";

const stats = [
  {
    title: "+2",
    text: "Clients",
  },
  {
    title: "6",
    text: "Projects done",
  },
];

const Hero = () => {
  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <motion.div
          initial="hidden"
          animate="show"
          variants={variants}
          className={styles.content}
        >
          <motion.span variants={item} className={cn("hairline", styles.span)}>
            Mobile App Development
          </motion.span>
          <motion.h1 variants={item} className={cn("hero", styles.title)}>
            {"I’m Tungdm"}
          </motion.h1>
          <motion.p variants={item} className={cn("body", styles.subtitle)}>
          Mobile app interface design for over{" "}
            <span className={cn("body-bold", styles.text)}>3 years</span> and  <span className={cn("body-bold", styles.text)}>1 year</span> developing website
          </motion.p>
          <div className={styles.wrapper}>
            <Link href="/contact">
              <a>
                <motion.button
                  variants={item}
                  className={cn("button", styles.button)}
                >
                  Hire Me
                </motion.button>
              </a>
            </Link>
            <AnchorLink to="projects" offset={-128} smooth={true}>
              <motion.button
                variants={item}
                className={cn("button button-stroke", styles.button)}
              >
                Projects
              </motion.button>
            </AnchorLink>
          </div>

          <div className={styles.stats_wrapper}>
            {stats.map((item, index) => (
              <motion.div variants={item}>
                <Stats variants={item} key={index} {...item} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className={styles.image_container}>
          <Image
            className={styles.image_avatar}
            src="/images/avatar_3.jpg"
            layout="fill"
            placeholder="blur"
            blurDataURL="/images/avatar.jpg"
          />

          {/* <div className={styles.author}>
            <p className={cn("caption", styles.name)}>Tung Do Minh</p>
          </div> */}
          <div className={styles.overlay} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
