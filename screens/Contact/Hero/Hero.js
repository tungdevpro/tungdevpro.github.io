import cn from "classnames";
import Breadcrumb from "../../../components/Breadcrumb";
import styles from "./hero.module.css";
import { motion } from "framer-motion";
import { item, variants } from "../../../variants/animation";
import ScrollAnimation from "../../../components/ScrollAnimation";
import Card from "../../../components/Card";

const items = [
  {
    icon: "navigation",
    title: "Address",
    subtitle: "20 Ho Tung Mau, Cau Giay, Ha Noi",
    text: "",
    boolean: "true",
  },
  {
    icon: "mail-right",
    title: "Email Address",
    subtitle: "tung210899@gmail.com",
    text: "",
    boolean: "true",
  },
  {
    icon: "call",
    title: "Phone Numbers",
    subtitle: "+84 383564187",
    text: "",
    boolean: "true",
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
          <Breadcrumb name="CONTACT" />
          <motion.h1 variants={item} className={cn("hero", styles.title)}>
            Contact
          </motion.h1>
        </div>

        <div className={styles.wrapper}>
          {items.map((item, index) => (
            <ScrollAnimation key={index}>
              <Card position="center" align="center" {...item} />
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
