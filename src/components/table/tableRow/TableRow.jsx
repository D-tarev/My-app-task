import style from "./TableRow.module.css";
import Tooltip from "./Tooltip/Tooltip";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";

function TableRow(props) {


  // Удаление продукта
  const deleteData = async (url = "") => {
    const response = await fetch(url, {
      method: "DELETE",
    });
    return response.json();
  };

  function click() {
    deleteData(`http://localhost:8081/productTypes/${props.id}`, {});
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
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const modalContent = (
    <div>
      <h2 className="modalHead">Хотите удалить выбранный продукт ?</h2>
      <NavLink to="/">
        <button
          className={style.buttonDel}
          onClick={() => {
            closeModal();
            click();
          }}
        >
          Удалить
        </button>
      </NavLink>

      <button className={style.buttonCan} onClick={closeModal}>
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
        <NavLink onClick={openModal}>
          <img src="\img\iconTra.svg" width={74} height={23} />
        </NavLink>
        <Modal
          appElement={document.getElementById("root")}
          style={customStyles}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        >
          {modalContent}
        </Modal>
      </td>
    </tr>
  );
}
export default TableRow;
