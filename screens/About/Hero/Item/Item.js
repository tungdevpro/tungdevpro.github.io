import cn from "classnames";
import styles from "./item.module.css";

const Item = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <span className={cn("body-bold")} style={{ color: props.color }}>
          {props.number}
        </span>
        <h4 className={cn("body-2-bold")}>{props.title}</h4>
      </div>
      <p className={cn("caption")}>{props.subtitle}</p>
    </div>
  );
};

export default Item;
