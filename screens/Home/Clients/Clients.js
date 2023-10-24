import cn from "classnames";
import styles from "./clients.module.css";
import TextOverlap from "../../../components/TextOverlap";
import YouClient from "./Client/YouClient";
import ScrollAnimation from "../../../components/ScrollAnimation";

const logos = [
  {
    link: "https://play.google.com/store/apps/developer?id=CMTeam",
    name: "CMTeam",
  },
  {
    link: "https://play.google.com/store/apps/details?id=com.global.ultratik",
    name: "HXCTeam",
  },
];

const Clients = () => {
  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.content}>
          <TextOverlap title="Our Clients" text="Our Clients" />
        </div>

        <div className={styles.wrapper}>
          {logos.map((item, index) => (
            <ScrollAnimation key={index}>
              <YouClient {...item} />
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;
