import cn from "classnames";
import Icon from "../Icon";
import styles from "./author.module.css";

const Author = () => {
  return (
    <a href="https://ui8.net" target="_blank" rel="noreferrer">
      <div className={styles.container}>
        <Icon
          className={styles.icon}
          name="tag"
          fillRule="evenodd"
          clipRule="evenodd"
        />
        <p className={cn("caption-2-bold", styles.title)}>Purchase $30</p>
      </div>
    </a>
  );
};

export default Author;
