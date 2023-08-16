import cn from "classnames";
import styles from "./testimonial.module.css";

const Testimonial = () => {
  return (
    <div className={styles.container}>
      <h1 className={cn("h4", styles.title)}>Amazing Experience</h1>
      <p className={cn("caption", styles.subtitle)}>
        Fusce at nisi eget dolor rhoncus facilisis. Mauris ante nisl,
        consectetur et luctus et, porta ut dolor. Curabitur ultricies ultrices
        nulla. Morbi blandit nec est vitae dictum. Etiam vel consectetur diam.
      </p>

      <div className={styles.author_container}>
        <img src="/images/amir.jpg" className={styles.image} />
        <div className={styles.content}>
          <p className={cn("body-2-bold", styles.author)}>Angel Uriostegui</p>
          <p className={cn("caption", styles.position)}>Founder, iFrame</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
