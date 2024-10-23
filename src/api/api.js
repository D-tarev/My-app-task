const getData = async () => {
  const response = await fetch("http://localhost:8081/productTypes").then(
    (response) => response.json()
  );
  return response;
};

const deleteData = async (prodId) => {
  const response = await fetch(`http://localhost:8081/productTypes/${prodId}`, {
    method: "DELETE",
  });
  return response;
};

const patchData = async (prodId, data = {}) => {
  const response = await fetch(`http://localhost:8081/productTypes/${prodId}`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  return response.json();
};

const postData = async (data = {}) => {
  const response = await fetch("http://localhost:8081/productTypes", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });
  
  return response.json();
};
const getProductById = async (prodId = {}) => {
  const response = await fetch(
    `http://localhost:8081/productTypes/${prodId}`
  ).then((response) => response.json());
  return response;
};
export { deleteData, patchData, postData, getProductById, getData };
