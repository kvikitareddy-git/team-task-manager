import axios from "axios";

const api = axios.create({
  baseURL: "https://team-task-manager-amhb.onrender.com/api"
});

export default api;