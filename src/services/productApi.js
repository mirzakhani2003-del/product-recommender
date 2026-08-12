import axios from "axios";

const API_URL = "https://fakestoreapi.com/products";

export async function getProducts() {
  const response = await axios.get(API_URL);
  return response.data;
}
