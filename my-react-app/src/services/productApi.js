const API_BASE = import.meta.env.DEV
  ? "/api"
  : "https://dummyjson.com";

export async function getProducts(limit = 100) {
  const response = await fetch(`${API_BASE}/products?limit=${limit}`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data.products || [];
}

export async function getProductById(id) {
  const response = await fetch(`${API_BASE}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return await response.json();
}