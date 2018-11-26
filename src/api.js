import axios from 'axios';
const BASE_URL = "https://jc-northcoders-news.herokuapp.com/api";

export const getArticles = async () => {
  const {data} = await axios.get(`${BASE_URL}/articles`);
  return data.articles;
}