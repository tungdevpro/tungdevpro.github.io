import styles from "./stats.module.css";
import cn from "classnames";
import { motion } from "framer-motion";

const Stats = (props, item) => {
  return (
    <motion.div variants={item} className={styles.container}>
      <h4 className={cn("h4", styles.title)}>{props.title}</h4>
      <p className={styles.label__text}>{props.text}</p>
    </motion.div>
  );
};

export default Stats;
