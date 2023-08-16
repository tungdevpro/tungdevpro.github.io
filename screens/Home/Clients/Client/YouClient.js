import cn from "classnames";
import styles from "./client.module.css";

const YouClient = (props) => {
  return (
    <a href="javascript:void(0)" className={styles.container}>
      <h3>{ props.name }</h3>
    </a>
  );
};

export default YouClient;
