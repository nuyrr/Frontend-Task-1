export async function getProducts() {
  const response = await fetch(
    "https://dummyjson.com/products"
  );

  const data = await response.json();

  return data.products;
}
export async function getProductById(id) {
  const response = await fetch(
    `https://dummyjson.com/products/${id}`
  );

  const data = await response.json();

  return data;
}