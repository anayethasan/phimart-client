import axios from "axios";

export default axios.create({
  baseURL: "https://phimart-lilac.vercel.app/api/v1",
});