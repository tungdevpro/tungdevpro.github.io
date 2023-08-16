import cn from "classnames";
import Form from "../../../components/Form";
import styles from "./getintouch.module.css";
import ScrollAnimation from "../../../components/ScrollAnimation";

const GetInTouch = () => {
  return (
    <div className={cn("section")}>
      <div className={cn("container", styles.container)}>
        <ScrollAnimation>
          <div className={styles.image_container}>
            <img className={styles.image} src="/images/avatar.jpg" />
          </div>
        </ScrollAnimation>
        <div className={styles.content}>
          <span className={cn("hairline-small", styles.hairline)}>
            GET IN TOUCH
          </span>
          <span className={cn("h2", styles.title)}>
            Let’s talk about your project
          </span>
          <p className={cn("body", styles.subtitle)}>
            Donec et enim vitae tellus auctor menean leo diamfeugiat nulla sed.
            consequat venenatis est. Praesent commodo consequat pharetra.
          </p>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
