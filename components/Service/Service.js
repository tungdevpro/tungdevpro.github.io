import cn from "classnames";
import styles from "./service.module.css";
import Icon from "../Icon";

const Service = (props) => {
  return (
    <div className={styles.container}>
      <Icon name={props.icon} className={styles.icon} />
      <h4 className={cn("body-bold", styles.title)}>{props.title}</h4>
      <p className={cn("caption", styles.subtitle)}>{props.subtitle}</p>
    </div>
  );
};

export default Service;
