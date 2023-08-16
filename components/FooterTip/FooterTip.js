import cn from "classnames";
import styles from "./footertip.module.css";

const FooterTip = () => {
  return (
    <div className={cn("container", styles.container)}>
      <p className={cn("caption", styles.title)}>
        Copyright © 2022 - {" "}
        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          className={cn("caption-bold", styles.author)}
        >
          Tungdm
        </a>
      </p>
      <p className={cn("caption")}>Terms & Conditions | Privacy Policy </p>
    </div>
  );
};

export default FooterTip;
