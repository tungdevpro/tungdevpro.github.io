import cn from "classnames";

const Tag = (props) => {
  return (
    <div className="number" style={{ background: props.background }}>
      <p className={cn("caption")} style={{ color: "white" }}>
        {props.number}
      </p>
    </div>
  );
};

export default Tag;
