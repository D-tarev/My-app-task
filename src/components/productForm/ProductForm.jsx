import { useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./ProductForm.module.css";
import Modal from "react-modal";

const patchData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });
  return response.json();
};
const deleteData = async (url = "") => {
  const response = await fetch(url, {
    method: "DELETE",
  });
  return response.json();
};
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });
  return response.json();
};

function ProductForm(props) {
  const params = useParams();
  const prodId = params.id;

  const getProductById = async () => {
    const response = await fetch(
      `http://localhost:8081/productTypes/${prodId}`
    ).then((response) => response.json());
    return response;
  };

  const [packCount, setPackCount] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [typePack, setTypePack] = useState("компрессия");
  const [isArchived, setIsArchived] = useState(false);

  if (!props.isCreate) {
    useEffect(() => {
      getProductById().then((res) => setPackCount(res.packsNumber));
      getProductById().then((res) => setTypePack(res.packageType));
      getProductById().then((res) => setIsArchived(res.isArchived));
      getProductById().then((res) => setInputTwo(res.description));
    }, []);
  }

  // useEffect(() => {

  // }, []);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  function clickPostData(event) {
    if (packCount == "") {
      setIsFormSubmitted(true);
      event.preventDefault();
    } else {
      postData("http://localhost:8081/productTypes", {
        packsNumber: Number(packCount),
        packageType: typePack,
        isArchived: Boolean(isArchived),
        description: inputTwo,
      });
    }
  }

  function clickDelete() {
    deleteData(`http://localhost:8081/productTypes/${prodId}`, {});
  }
  const onChangeCheck = ({ target: { checked } }) => {
    setIsArchived(checked);
  };

  function onChange1(event) {
    setPackCount(event.target.value);
  }
  function onChange2(event) {
    setTypePack(event.target.value);
  }
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //Стили для модалки
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
      <NavLink to="/Head">
        <button
          className={style.buttonDel}
          onClick={() => {
            closeModal();
            clickDelete();
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

  /////////////////////////////////////////////////////////////

  function click(event) {
    if (packCount == "") {
      setIsFormSubmitted(true);
      event.preventDefault();
    } else {
      patchData(`http://localhost:8081/productTypes/${prodId}`, {
        packsNumber: Number(packCount),
        packageType: typePack,
        isArchived: Boolean(isArchived),
        description: inputTwo,
      });
    }
  }

  return (
    <>
      <div className={style.outWrapper}>
        <h1>Создание типа продукции</h1>
        <div className={style.inputWrapper}>
          <form>
            <label className={style.mar} htmlFor="quantity">
              Кол-во пачек<span> *</span>
            </label>

            <input
              id="packCountId"
              value={packCount}
              onChange={onChange1}
              type="number"
            />
          </form>
          {isFormSubmitted && packCount == "" && (
            <span className={style.error}>Введите число!</span>
          )}
          <form>
            <label className={style.mar} htmlFor="type-choice">
              Тип упаковки<span> *</span>
              <select id="typePackId" value={typePack} onChange={onChange2}>
                <option value="компрессия">компрессия</option>
                <option value="некомпрессия">некомпрессия </option>
              </select>
            </label>
          </form>

          <form>
            <label className={style.mar} htmlFor="chek">
              Архивировано
            </label>
            <input
              checked={isArchived}
              value={isArchived}
              onChange={onChangeCheck}
              className={style.check}
              id="chek"
              type="checkbox"
            />
          </form>
          <form>
            <label className={style.mar} htmlFor="description">
              Описание
            </label>
            <input
              className={style.description}
              value={inputTwo}
              onChange={(event) => setInputTwo(event.target.value)}
            />
          </form>
        </div>
        <Modal
          appElement={document.getElementById("root")}
          style={customStyles}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        >
          {modalContent}
        </Modal>
        <div className={style.buttonWrapper}>
          <NavLink to="/Head">
            <button className={style.cancel}>Отмена</button>
          </NavLink>
          {!props.isCreate && (
            <button onClick={openModal} className={style.delete}>
              Удалить
            </button>
          )}
          {!props.isCreate && (
            <NavLink to="/Head">
              <button onClick={click} className={style.save}>
                Сохранить
              </button>
            </NavLink>
          )}
          {props.isCreate && (
            <NavLink to="/Head">
              <button className={style.save} onClick={clickPostData}>
                Создать
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductForm;
