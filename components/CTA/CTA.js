import cn from "classnames";
import Link from "next/link";
import ScrollAnimation from "../ScrollAnimation";
import Tag from "../Tag";
import styles from "./cta.module.css";

const CTA = (props) => {
  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.box}>
          <div className={styles.content}>
            <Tag number={props.number} background={props.background} />
            <h4 className={cn("h2", styles.title)}>{props.title}</h4>
            <p className={cn("caption", styles.subtitle)}>
              Donec et enim vitae tellus auctor menean leo diamfeugiat nulla
              sed. consequat venenatis est. Praesent commodo consequat pharetra.
            </p>
            <Link href="/contact">
              <a className={cn("button", styles.button)}>{props.button}</a>
            </Link>
          </div>

          <ScrollAnimation>
            <div className={styles.image_container}>
              <img className={styles.image} src="/images/hamid.png" />
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};

export default CTA;
