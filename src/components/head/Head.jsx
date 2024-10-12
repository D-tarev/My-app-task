import { useNavigate } from "react-router-dom";
import Table from "../table/Table";

function Head() {
  const navigate = useNavigate();
  const handleCreateProduct = () => navigate("/productForm");

  return (
    <div className="wrapper">
      <h1>Список выпускаемой продукции</h1>

      <button className="buttonCreate" onClick={handleCreateProduct}>
        Создать тип продукции
      </button>

      <Table></Table>
    </div>
  );
}

export default Head;
