
import { NavLink } from "react-router-dom";
import Table from "../table/Table";

function Head() {
  return (
    <div className="wrapper">
      <h1>Список выпускаемой продукции</h1>
      <NavLink to="/productForm">
        <button className="buttonCreate">
          Создать тип продукции
        </button>
      </NavLink>

      <Table></Table>
    </div>
  );
}

export default Head;
