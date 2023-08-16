import cn from "classnames";
import styles from "./item.module.css";

const Item = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img className={styles.image} src={props.image} />
      </div>
      <div className={styles.content}>
        <p className={cn("hairline-2", styles.text)}>{props.tag}</p>
        <h4 className={cn("body-2-bold", styles.title)}>{props.title}</h4>
      </div>
    </div>
  );
};

export default Item;
