import cn from "classnames";
import styles from "./breadcrumb.module.css";
import Icon from "../Icon";
import Link from "next/link";

const Breadcrumb = (props) => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={cn("hairline-small", styles.title)}>HOME</a>
      </Link>
      <Icon name="arrow-right" />
      <p className={cn("hairline-small")}>{props.name}</p>
    </div>
  );
};

export default Breadcrumb;
