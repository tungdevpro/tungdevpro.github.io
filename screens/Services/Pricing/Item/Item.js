import cn from "classnames";
import styles from "./item.module.css";
import Icon from "../../../../components/Icon";

const features = [
  {
    icon: "tick",
    title: "Lorem ipsum dolor",
    color: "blue",
  },
  {
    icon: "tick",
    title: "Lorem ipsum dolor",
    color: "blue",
  },
  {
    icon: "close",
    title: "Lorem ipsum dolor",
    color: "gray",
  },
  {
    icon: "close",
    title: "Lorem ipsum dolor",
    color: "gray",
  },
  {
    icon: "close",
    title: "Lorem ipsum dolor",
    color: "gray",
  },
];

const Item = ({ plan, price, data }) => {
  return (
    <div className={styles.container}>
      <p className={cn("hairline-small")}>{plan}</p>
      <h2 className={cn("h1", styles.price)}>{price}</h2>
      <div className={styles.features}>
        {data.options.map((item, index) => (
          <div className={styles.feature} key={index}>
            <Icon color={item.color} name={item.icon} />
            <p className={cn("caption-bold")} style={{ color: item.color }}>
              {item.title}
            </p>
          </div>
        ))}
      </div>
      <button className={cn("button")}>Buy Now</button>
    </div>
  );
};

export default Item;
