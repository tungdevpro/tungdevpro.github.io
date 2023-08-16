import cn from "classnames";
import Link from "next/link";
import ScrollAnimation from "../../../components/ScrollAnimation";
import TextOverlap from "../../../components/TextOverlap";
import Project from "./Project";
import styles from "./projects.module.css";

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

const Projects = () => {
  return (
    <div id="projects" className={cn("section section-pb")}>
      <div className={cn("container", styles.container)}>
        <div className={styles.upper_content}>
          <div className={styles.content}>
            <TextOverlap title="Projects" text="Projects" />
          </div>
          <Link href="/services">
            <a className={cn("button-small", styles.button)}>View Project</a>
          </Link>
        </div>

        <div className={styles.wrapper}>
          {projects.map((item, index) => (
            <ScrollAnimation>
              <Project key={index} {...item} />
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
