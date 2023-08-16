import cn from "classnames";
import styles from "./hero.module.css";
import Breadcrumb from "../../../components/Breadcrumb";
import { motion } from "framer-motion";
import { variants, item } from "../../../variants/animation";
import Card from "../../../components/Card";
import ScrollAnimation from "../../../components/ScrollAnimation";

const services = [
  {
    icon: "paint-bucket",
    title: "UI-X Design",
    subtitle:
      "Aenean non accumsan ante. Duis et risus accumsan sem tempus porta nec sit amet estsed ut euismod.",
  },
  {
    icon: "plugin",
    title: "App Development",
    subtitle:
      "Aenean non accumsan ante. Duis et risus accumsan sem tempus porta nec sit amet estsed ut euismod.",
  },
  {
    icon: "globe",
    title: "Web Development",
    subtitle:
      "Aenean non accumsan ante. Duis et risus accumsan sem tempus porta nec sit amet estsed ut euismod.",
  },
  {
    icon: "zoom-check",
    title: "Research",
    subtitle:
      "Aenean non accumsan ante. Duis et risus accumsan sem tempus porta nec sit amet estsed ut euismod.",
  },
  {
    icon: "shield-check",
    title: "Hosting",
    subtitle:
      "Aenean non accumsan ante. Duis et risus accumsan sem tempus porta nec sit amet estsed ut euismod.",
  },
  {
    icon: "speed-test",
    title: "Deployment",
    subtitle:
      "Aenean non accumsan ante. Duis et risus accumsan sem tempus porta nec sit amet estsed ut euismod.",
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
          <motion.p variants={item} className={cn("body", styles.subtitle)}>
            Pellentesque tincidunt tristique neque, eget venenatis enim gravida
            quis. Fusce at egestas libero. Cras convallis egestas ullamcorper
            suspens.
          </motion.p>
        </div>

        <div className={styles.wrapper}>
          {services.map((item, index) => (
            <ScrollAnimation>
              <Card key={index} {...item} />
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
