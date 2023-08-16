import cn from "classnames";
import styles from "./hero.module.css";
import Breadcrumb from "../../../components/Breadcrumb";
import { motion } from "framer-motion";
import { variants, item } from "../../../variants/animation";
import Service from "../../../components/Service";
import ScrollAnimation from "../../../components/ScrollAnimation";
import Item from "./Item";
import { Link as AnchorLink } from "react-scroll";

const items = [
  {
    color: "#ffbc99",
    number: "#1",
    title: "Goals",
    subtitle:
      "A hard-working individual, I always want to contribute to the company's development and create valuable products for society.",
  },
  {
    color: "#b1e5fc",
    number: "#2",
    title: "Education",
    subtitle:
      "I used to go to university (VNU University of Engineering and Technology), majoring in Engineering Physics. ",
  },
];

const Hero = () => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={variants}
      className={cn("section", styles.section)}
    >
      <div className={cn("container", styles.container)}>
        <div className={styles.content}>
          <Breadcrumb name="ABOUT" />
          <motion.h1 variants={item} className={cn("hero", styles.title)}>
            About me
          </motion.h1>
          <motion.p variants={item} className={cn("body", styles.subtitle)}>
            I'm Tung Do Minh - nickname is Tungdm. Is a web and mobile application developer
          </motion.p>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.image_container}>
            <img className={styles.image} src="/images/avatar_2.jpg" />
          </div>
          <div className={styles.bottom_content}>
            <span className={cn("hairline-small", styles.text)}>QUOTE</span>
            <h1 className={cn("h2", styles.bottom_content_title)}>
            Success comes from relentless effort and the determination to overcome every challenge
            </h1>
            <div className={styles.items_wrapper}>
              {items.map((item, index) => (
                <ScrollAnimation>
                  <Item key={index} {...item} />
                </ScrollAnimation>
              ))}
            </div>
            <ScrollAnimation>
              <AnchorLink to="learnmore" smooth={true}>
                <button className={cn("button", styles.button)}>
                  Learn More
                </button>
              </AnchorLink>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
