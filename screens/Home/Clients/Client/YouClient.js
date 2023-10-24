import cn from "classnames";
import styles from "./client.module.css";

const YouClient = (props) => {
  return (
    <a href={props.link} target="_blank" className={styles.container}>
      <h3>{props.name}</h3>
    </a>
  );
};

export default YouClient;
