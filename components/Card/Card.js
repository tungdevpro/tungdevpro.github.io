import cn from "classnames";
import styles from "./card.module.css";
import Icon from "../Icon";

const Card = (props) => {
  const renderContent = () => {
    if (props.boolean === "true") {
      return (
        <p
          style={{ marginTop: props.boolean == "true" ? 8 : "" }}
          className={cn("caption", styles.subtitle)}
        >
          {props.text}
        </p>
      );
    }
  };

  return (
    <div
      className={styles.container}
      style={{ alignItems: props.position, textAlign: props.align }}
    >
      <Icon name={props.icon} className={styles.icon} />
      <h4 className={cn("body-bold", styles.title)}>{props.title}</h4>
      <p className={cn("caption", styles.subtitle)}>{props.subtitle}</p>

      {renderContent()}
    </div>
  );
};

export default Card;
