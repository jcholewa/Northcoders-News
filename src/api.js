import axios from 'axios';
const BASE_URL = "https://jc-northcoders-news.herokuapp.com/api";

export const getArticles = async (topic) => {
  const url = topic ? `topics/${topic}/articles` : 'articles'
  const { data } = await axios.get(`${BASE_URL}/${url}`);
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
  const { data } = await axios.get(`${BASE_URL}/articles/${id}/comments`);
  return data.comments;
}

export const postComment = async (comment, id, userID) => {
  const { data } = await axios.post(`${BASE_URL}/articles/${id}/comments`, { body: comment, belongs_to: id, created_by: userID });
  return data.comment;
}

export const alterVotes = async (id, direction, work) => {
  const { data } = await axios.patch(`${BASE_URL}/${work}s/${id}?${direction}`)
  return data[work];
}

export const postArticle = async (title, article, slug, userID) => {
  const { data } = await axios.post(`${BASE_URL}/topics/${slug}/articles`, { title: title, body: article, belongs_to: slug.toLowerCase(), created_by: userID });
  return data.article;
}

export const login = async (username) => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data.user
}