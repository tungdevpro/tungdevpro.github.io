import cn from "classnames";
import styles from "./hero.module.css";
import Breadcrumb from "../../../components/Breadcrumb";
import { motion } from "framer-motion";
import { variants, item } from "../../../variants/animation";
import Card from "../../../components/Card";
import ScrollAnimation from "../../../components/ScrollAnimation";
import Project from "../../Home/Projects/Project";

const services = [
  {
    icon: "diamond",
    title: "App Development",
    subtitle:
      "Technology Stack: Flutter, Dart, Bloc(Provider, GetX), Firebase &  Android Jetpack Compose",
  },
  {
    icon: "globe",
    title: "Web Development",
    subtitle: "Technology Stack: JavaScript, VueJs, Webpack, Vites, Boostrap 5, Golang & Gin",
  }
];

const projects = [
  {
    embed: "WVWxPIzEM3A",
    image: "/images/projects/proj_yh_shop.png",
    title: "YH Shop",
  },
  {
    embed: "WVWxPIzEM3A",
    image: "/images/projects/proj_coffee_house.png",
    title: "Coffee house",
  },
  {
    embed: "WVWxPIzEM3A",
    image: "/images/projects/proj_bookz.png",
    title: "Bookz",
  },
];

const Hero = () => {
  return (
    <motion.div
      id="hero"
      initial="hidden"
      animate="show"
      variants={variants}
      className={cn("section section-pt", styles.section)}
    >
      <div className={cn("container", styles.container)}>
        <div className={styles.content}>
          <Breadcrumb name="SERVICES" />
          <motion.h1 variants={item} className={cn("hero", styles.title)}>
            Services
          </motion.h1>
   
        </div>

        <div className={`${styles.wrapper} ${styles.mb}`}>
          {projects.map((item, index) => (
            <ScrollAnimation>
              <Project key={index} {...item} />
            </ScrollAnimation>
          ))}
        </div>
        
{/* 
        <div className={styles.wrapper}>
          {services.map((item, index) => (
            <ScrollAnimation>
              <Card key={index} {...item} />
            </ScrollAnimation>
          ))}
        </div> */}
      </div>
    </motion.div>
  );
};

export default Hero;
