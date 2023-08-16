import cn from "classnames";
import styles from "./textoverlap.module.css";

const TextOverlap = (props) => {
  return (
    <div className={styles.container}>
      <h2 className={cn("h2", styles.title)}>{props.title}</h2>
      <h1 className={cn("hero", styles.text)}>{props.text}</h1>
    </div>
  );
};

export default TextOverlap;
