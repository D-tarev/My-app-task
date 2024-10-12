import style from "./TableRow.module.css";
import Tooltip from "./Tooltip/Tooltip";
import { useNavigate, NavLink } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";
import { deleteData } from "../../../api/api";
import { PropTypes } from "prop-types";

TableRow.propTypes = {
  id: PropTypes.number,
  packsNumber: PropTypes.number,
  createdAt: PropTypes.string,
  description: PropTypes.string,
  packageType: PropTypes.string,
  isArchived: PropTypes.bool,
};

function TableRow(props) {
  const navigate = useNavigate();

  function clickDelete() {
    deleteData(props.id).then((res) => {
      res ? navigate("/") : null;
    });
  }
  //////////////////////////////////////////////////////////////////

  //  Модальное окно
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: "35%",
      left: "36.5%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "700px",
      height: "200px",
    },
  };
  // const openModal = () => {
  //   setModalIsOpen(true);
  // };

  // const closeModal = () => {
  //   setModalIsOpen(false);
  // };
  const modalContent = (
    <div>
      <h2 className="modalHead">Хотите удалить выбранный продукт ?</h2>
      <button
        className={style.buttonDel}
        onClick={() => {
          () => setModalIsOpen(false), clickDelete();
        }}
      >
        Удалить
      </button>
      <button className={style.buttonCan} onClick={() => setModalIsOpen(false)}>
        Отмена
      </button>
    </div>
  );
  //////////////////////////////////////////////////////////////////
  function isArchived(props) {
    return props.isArchived === true ? "Архив" : "Активно";
  }

  // Конвертация времени создания
  const dateTime = props.createdAt.split("T")[0];
  //////////////////////////////////////////////////////////////////

  return (
    <tr>
      <td className={style.id}>{props.id}</td>
      <td className={style.packsNumber}>{props.packsNumber}</td>
      <td className={style.packageType}>{props.packageType}</td>
      <td className={style.createdAt}>{dateTime}</td>
      <td className={style.isArchived}>{isArchived(props)}</td>
      <td className={style.iconWh}>
        <Tooltip description={props.description}></Tooltip>
      </td>
      <td className={style.iconTr}>
        <NavLink to={`/productForm/${props.id}`}>
          <img src="\img\iconPen.svg" width={74} height={23} />
        </NavLink>
        <NavLink onClick={() => setModalIsOpen(true)}>
          <img src="\img\iconTra.svg" width={74} height={23} />
        </NavLink>
        <Modal
          appElement={document.getElementById("root")}
          style={customStyles}
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          {modalContent}
        </Modal>
      </td>
    </tr>
  );
}
export default TableRow;
