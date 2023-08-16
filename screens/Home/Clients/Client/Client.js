import cn from "classnames";
import styles from "./client.module.css";

const Client = (props) => {
  return (
    <div className={styles.container}>
      <svg
        width="81"
        height="80"
        viewBox="0 0 81 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_131_474)">
          <path d={props.name} />
        </g>
        <defs>
          <clipPath id="clip0_131_474">
            <rect
              width="80"
              height="80"
              fill="white"
              transform="translate(0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Client;
