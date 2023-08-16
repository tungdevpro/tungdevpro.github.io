import cn from "classnames";
import Testimonial from "./Testimonial";
import styles from "./testimonials.module.css";
import ScrollAnimation from "../../../components/ScrollAnimation";

const Testimonials = () => {
  return (
    <div id="learnmore" className={cn("section", styles.section)}>
      <div className={styles.opacity} />
      <div className={cn("container", styles.container)}>
        <div className={styles.content}>
          <span className={cn("hairline-small", styles.hairline)}>
            TESTIMONIALS
          </span>
          <h1 className={cn("h2", styles.title)}>
            Let’s talk about your project
          </h1>
          <p className={cn("body", styles.subtitle)}>
            Donec et enim vitae tellus auctor menean leo diamfeugiat nulla sed.
            consequat venenatis est. Praesent commodo consequat pharetra.
          </p>
        </div>
        <ScrollAnimation>
          <Testimonial />
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default Testimonials;
