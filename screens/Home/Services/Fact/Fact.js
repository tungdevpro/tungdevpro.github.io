import cn from "classnames";
import Icon from "../../../../components/Icon";
import styles from "./fact.module.css";

const Fact = (props) => {
  return (
    <div className={styles.container}>
      <Icon name={props.icon} className={styles.icon} />
      <h4 className={cn("h2", styles.title)}>{props.number}</h4>
      <p className={cn("caption")}>{props.title}</p>
    </div>
  );
};

export default Fact;
