import { useState } from "react";
import style from "./Tooltip.module.css";
import { PropTypes } from "prop-types";

Tooltip.propTypes = {
  description: PropTypes.string,
};

function Tooltip(props) {
  const [show, setShow] = useState(false);

  const onMouseEnter = () => {
    setShow(true);
  };

  const onMouseLeave = () => {
    setShow(false);
  };

  return (
    <div
      className={style.wrapper}
      onClick={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {<img src="\img\iconWh.svg" width={74} height={23} />}
      {show && (
        <div className={style.tooltip}>
          <p>{props.description}</p>
        </div>
      )}
    </div>
  );
}

export default Tooltip;
