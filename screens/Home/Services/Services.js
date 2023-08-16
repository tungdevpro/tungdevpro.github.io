import styles from "./services.module.css";
import cn from "classnames";
import TextOverlap from "../../../components/TextOverlap";
import Fact from "./Fact";
import ScrollAnimation from "../../../components/ScrollAnimation";
import Card from "../../../components/Card";
import Link from "next/link";
import CardTechStack from "../../../components/Card/CardTechStack";

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

const facts = [
  {
    icon: "star",
    number: "6+",
    title: "Projects",
  },
  {
    icon: "speed-test",
    number: "4",
    title: "Apps",
  },
  {
    icon: "heart",
    number: "2",
    title: "Websites",
  },
];

const Services = () => {
  return (
    <div className={cn("section")}>
      <div className={cn("container", styles.container)}>
        <div className={styles.upper_content}>
          <div className={styles.content}>
            {/* <Tag number="01" background="#ffbc99" /> */}
            <TextOverlap title="Services" text="Services" />
          </div>
          <Link href="/services">
            <a className={cn("button-small", styles.button)}>View Services</a>
          </Link>
        </div>

        <div className={styles.wrapper}>
          {services.map((item, index) => (
            <div className={styles.item}>
              <ScrollAnimation>
              <CardTechStack  key={index} {...item} />
            </ScrollAnimation>
            </div>
          ))}
        </div>
        {/* <div className={styles.facts_wrapper}>
          {facts.map((item, index) => (
            <ScrollAnimation key={index}>
              <Fact {...item} />
            </ScrollAnimation>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Services;
