import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});
export default httpClient;
