import axios from 'axios';
const BASE_URL = "https://jc-northcoders-news.herokuapp.com/api";

export const getArticles = async () => {
  const { data } = await axios.get(`${BASE_URL}/articles`);
  return data.articles;
}

export const getArticle = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/articles/${id}`);
  return data.article;
}

export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);
  return data.topics;
}

export const getUser = async (username) => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data.user;
}

export const getComments = async (id) => {
  const {data} = await axios.get(`${BASE_URL}/articles/${id}/comments`);
  return data.comments;
}

export const postComment = async (comment, id) => {
  const {data} = await axios.post(`${BASE_URL}/articles/${id}/comments`, comment);
  return data.comment;
}