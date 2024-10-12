import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./ProductForm.module.css";
import Modal from "react-modal";
import { deleteData, patchData, postData, getProductById } from "../../api/api";
import { PropTypes } from "prop-types";

ProductForm.propTypes = {
  isCreate: PropTypes.bool,
};

function ProductForm(props) {
  const params = useParams();
  const prodId = params.id;

  const navigate = useNavigate();

  const [packCount, setPackCount] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [typePack, setTypePack] = useState("компрессия");
  const [isArchived, setIsArchived] = useState(false);

  useEffect(() => {
    if (!props.isCreate) {
      getProductById(prodId).then(
        (res) => (
          setPackCount(res.packsNumber),
          setTypePack(res.packageType),
          setIsArchived(res.isArchived),
          setInputTwo(res.description)
        )
      );
    }
  }, []);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  function clickPostData(event) {
    if (packCount == "") {
      setIsFormSubmitted(true);
      event.preventDefault();
    } else {
      postData({
        packsNumber: Number(packCount),
        packageType: typePack,
        isArchived: Boolean(isArchived),
        description: inputTwo,
      }).then((res) => {
        res ? navigate("/") : null;
      });
    }
  }

  function clickDelete() {
    deleteData(prodId).then((res) => {
      res ? navigate("/") : null;
    });
  }
  // const onChangeCheck = ({ target: { checked } }) => {
  //   setIsArchived(checked);
  // };

  // function onChange1(event) {
  //   setPackCount(event.target.value);
  // }
  // function onChange2(event) {
  //   setTypePack(event.target.value);
  // }
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

  /////////////////////////////////////////////////////////////

  function clickSave(event) {
    if (packCount == "") {
      setIsFormSubmitted(true);
      event.preventDefault();
    } else {
      patchData(prodId, {
        packsNumber: Number(packCount),
        packageType: typePack,
        isArchived: Boolean(isArchived),
        description: inputTwo,
      }).then((res) => {
        res ? navigate("/") : null;
      });
    }
  }

  return (
    <>
      <div className={style.outWrapper}>
        {props.isCreate ? (
          <h1>Создание типа продукции</h1>
        ) : (
          <h1>Редактирование типа продукции</h1>
        )}
        <div className={style.inputWrapper}>
          <form>
            <label className={style.mar} htmlFor="quantity">
              Кол-во пачек<span> *</span>
            </label>

            <input
              id="packCountId"
              value={packCount}
              onChange={() => setPackCount(event.target.value)}
              type="number"
            />
          </form>
          {isFormSubmitted && packCount == "" && (
            <span className={style.error}>Введите число!</span>
          )}
          <form>
            <label className={style.mar} htmlFor="type-choice">
              Тип упаковки<span> *</span>
              <select
                id="typePackId"
                value={typePack}
                onChange={() => setTypePack(event.target.value)}
              >
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
              onChange={({ target: { checked } }) => {
                setIsArchived(checked);
              }}
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
          onRequestClose={() => setModalIsOpen(false)}
        >
          {modalContent}
        </Modal>
        <div className={style.buttonWrapper}>
          <NavLink to="/Head">
            <button className={style.cancel}>Отмена</button>
          </NavLink>
          {!props.isCreate && (
            <button
              onClick={() => setModalIsOpen(true)}
              className={style.delete}
            >
              Удалить
            </button>
          )}
          {!props.isCreate && (
            <button onClick={clickSave} className={style.save}>
              Сохранить
            </button>
          )}
          {props.isCreate && (
            <button className={style.save} onClick={clickPostData}>
              Создать
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductForm;
