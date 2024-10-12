import "./Table.module.css";
import TableRow from "./tableRow/TableRow";
import { useState } from "react";
import { useEffect } from "react";
import { getData } from "../../api/api";

function Table() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData().then((res) => {
      setProducts(res);
    });
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
              key={data.id}
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
