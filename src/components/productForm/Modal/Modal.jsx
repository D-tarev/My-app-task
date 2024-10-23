import { useEffect, useState } from "react";
import Modal from "react-modal";
import style from "./Modal.module.css";
import { deleteData } from "../../../api/api";
import { useNavigate } from "react-router-dom";

function ModalK(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    props.active == true ? setModalIsOpen(true) : setModalIsOpen(false);
  }, [props]);

  function clickDelete() {
    deleteData(props.prodId).then((res) => {
      res ? navigate("/") : null;
    });
  }

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

  const modalContent = (
    <div>
      <h2 className="modalHead">Хотите удалить выбранный продукт ?</h2>
      <button
        className={style.buttonDel}
        onClick={() => {
          setModalIsOpen(false), clickDelete();
        }}
      >
        Удалить
      </button>
      <button className={style.buttonCan} onClick={() => setModalIsOpen(false)}>
        Отмена
      </button>
    </div>
  );

  return (
    <>
      <Modal
        appElement={document.getElementById("root")}
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        {modalContent}
      </Modal>
    </>
  );
}
export default ModalK;
