import "./Table.module.css";
import TableRow from "./tableRow/TableRow";
import { useState } from "react";
import { useEffect } from "react";




function Table() {

  const [products, setProducts] = useState([]);
  //Получение данных

  const getData = async () => {
    const response = await fetch("http://localhost:8081/productTypes").then(
      (response) => response.json()
    );
    setProducts(response)
  };
  useEffect(() => {
    getData() 
  }, []);
 
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Кол-во пачек</th>
            <th>Тип упаковки</th>
            <th>Дата создания</th>
            <th>Статус </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((data) => (
            <TableRow
              id={data.id}
              packsNumber={data.packsNumber}
              packageType={data.packageType}
              isArchived={data.isArchived}
              description={data.description}
              createdAt={data.createdAt}
            ></TableRow>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
