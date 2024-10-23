import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import style from "./ProductForm.module.css";
import { deleteData, patchData, postData, getProductById } from "../../api/api";
import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";
import ModalK from "./Modal/Modal";

ProductForm.propTypes = {
  isCreate: PropTypes.bool,
};

function ProductForm(props) {
  const onSubmit = () => {
    props.isCreate ? patchPostData(postData) : patchPostData(patchData, prodId);
  };
  const  [bool, setBool]  = useState(false);

  const params = useParams();
  const prodId = params.id;

  const navigate = useNavigate();

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: async () => {
      const res = props.isCreate ? {} : await getProductById(prodId);

      return {
        packCount: res.packsNumber,
        typePack: res.packageType,
        isArchived: res.isArchived,
        description: res.description,
      };
    },
    mode: "onBlur",
  });

  function patchPostData(method, id) {
    let data = {
      packsNumber: Number(getValues().packCount),
      packageType: getValues().typePack,
      isArchived: Boolean(getValues().isArchived),
      description: getValues().description,
    };
    id
      ? method(id, data).then((res) => {
          res ? navigate("/") : null;
        })
      : method(data).then((res) => {
          res ? navigate("/") : null;
        });
  }

  function clickDelete() {
    deleteData(prodId).then((res) => {
      res ? navigate("/") : null;
    });
  }

  const toggleModal = () => {
    setBool((prevState => !prevState))  
  };

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
              Кол-во пачек<span>*</span>
            </label>
            <input
              {...register("packCount", {
                required: "Введите число",
              })}
              type="number"
            />
            {errors?.packCount && (
              <div className={style.error}>
                {errors?.packCount?.message || "fff"}
              </div>
            )}
            <label className={style.mar} htmlFor="type-choice">
              Тип упаковки<span>*</span>
            </label>
            <select {...register("typePack")}>
              <option value="компрессия">компрессия</option>
              <option value="некомпрессия">некомпрессия </option>
            </select>
            <label className={style.mar} htmlFor="chek">
              Архивировано
            </label>
            <input
              className={style.check}
              {...register("isArchived")}
              id="chek"
              type="checkbox"
            />
            <label className={style.mar} htmlFor="description">
              Описание
            </label>
            <input className={style.description} {...register("description")} />
          </form>
        </div>


        <ModalK active={bool} prodId={prodId}/>

        <div className={style.buttonWrapper}>
          <NavLink to="/Head">
            <button className={style.cancel}>Отмена</button>
          </NavLink>
          {!props.isCreate && <button className={style.delete} onClick={toggleModal} >Удалить</button>}
          <button onClick={handleSubmit(onSubmit)} className={style.save}>
            {props.isCreate ? "Создать" : "Сохранить"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductForm;
