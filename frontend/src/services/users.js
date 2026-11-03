import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const post = async (credentials) => {
  const { data } = await axios.post(baseUrl, credentials);
  return data;
};

export default { getAll, post };
