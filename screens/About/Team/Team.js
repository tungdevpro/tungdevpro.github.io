import cn from "classnames";
import styles from "./team.module.css";
import TextOverlap from "../../../components/TextOverlap";
import ScrollAnimation from "../../../components/ScrollAnimation";
import Member from "./Member";

const memmbers = [
  {
    position: "CEO/FOUNDER",
    image: "/images/cesar.jpg",
    name: "Angel Uriostegui",
  },
  {
    position: "DESIGNER",
    image: "/images/pablo.jpg",
    name: "Cesar Uriostegui",
  },
  {
    position: "DEVELOPER",
    image: "/images/angel.jpg",
    name: "Pablo Alboran",
  },
];

const Team = () => {
  return (
    <div className={cn("section")}>
      <div className={cn("container")}>
        <div className={styles.content}>
          <span className={cn("hairline-small", styles.hairline)}>TEAM</span>
          <TextOverlap title="Our team" text="Our team" />
        </div>

        <div className={styles.wrapper}>
          {memmbers.map((item, index) => (
            <ScrollAnimation>
              <Member key={index} {...item} />
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
