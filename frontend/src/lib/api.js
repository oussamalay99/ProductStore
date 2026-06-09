import api from "./axios";

// USERS API
export const syncUser = async (userData) => {
  const { data } = await api.post("/users/sync", userData);
  return data;
};

// PRODUCTS API
export const getAllProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

export const getProductById = async (productId) => {
  const { data } = await api.get(`/products/${productId}`);
  return data;
};

export const getMyProducts = async () => {
  const { data } = await api.get("/products/my");
  return data;
};

export const createProduct = async (productData) => {
  const { data } = await api.post("/products", productData);
  return data;
};

export const updateProduct = async ({ productId, ...productData }) => {
  const { data } = await api.put(`/products/${productId}`, productData);
  return data;
};

export const deleteProduct = async (productId) => {
  const { data } = await api.delete(`/products/${productId}`);
  return data;
};

// COMMENTS API
export const createComment = async ({ productId, commentData }) => {
  const { data } = await api.post(`/comments/${productId}`, commentData);
  return data;
};

export const deleteComment = async ({commentId}) => {
  const { data } = await api.delete(`/comments/${commentId}`);
  return data;
};
