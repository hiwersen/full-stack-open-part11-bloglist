import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (t) => {
  token = t ? `Bearer ${t}` : null;
};

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const create = async (blog) => {
  const config = { headers: { Authorization: token } };
  const { data } = await axios.post(baseUrl, blog, config);
  return data;
};

const like = async ({ id }) => {
  const config = { headers: { Authorization: token } };
  const { data } = await axios.post(`${baseUrl}/${id}/like`, null, config);
  return data;
};

const comment = async ({ comment, id }) => {
  const { data } = await axios.post(`${baseUrl}/${id}/comments`, { comment });
  return data;
};

const update = async (blog) => {
  const config = { headers: { Authorization: token } };
  const { data } = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return data;
};

const remove = async (blog) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return response;
};

export default { setToken, getAll, create, like, comment, update, delete: remove };
