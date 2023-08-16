import cn from "classnames";
import styles from "./member.module.css";
import Icon from "../../../../components/Icon";

const Member = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img src={props.image} className={styles.image} />
      </div>

      <div className={styles.content}>
        <h4 className={cn("body-2-bold", styles.title)}>{props.name}</h4>
        <span className={cn("hairline-small", styles.position)}>
          {props.position}
        </span>
        {/* <div className={styles.socials}>
          <Icon name="twitter" />
          <Icon name="twitter" />
          <Icon name="twitter" />
          <Icon name="twitter" />
        </div> */}
      </div>
    </div>
  );
};

export default Member;
