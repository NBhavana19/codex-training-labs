const API_URL = "http://localhost:5174/api/products";

export async function getProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to fetch products from the backend.");
  }

  return response.json();
}
