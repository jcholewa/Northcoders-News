import axios from 'axios';
const BASE_URL = "https://jc-northcoders-news.herokuapp.com/api";

export const getData = async (id, topic) => {
  const url =
    id !== '' ? `articles/${id}` :
      topic ? topic !== 'all' ? `topics/${topic}/articles` : `topics` : 'articles'
  const { data } = await axios.get(`${BASE_URL}/${url}`);
  return id !== '' ? data.article : topic === 'all' ? data.topics : data.articles;
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
  const { data } = await axios.patch(`${BASE_URL}/${work}/${id}?vote=${direction}`)
  return data[work];
}

export const postArticle = async (title, article, slug, userID) => {
  const { data } = await axios.post(`${BASE_URL}/topics/${slug}/articles`, { title: title, body: article, belongs_to: slug.toLowerCase(), created_by: userID });
  return data.article;
}

export const login = async (username) => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data.user;
}

export const deleteItem = async (id) => {
  const { data } = await axios.delete(`${BASE_URL}/comments/${id}`);
  return data.message;
}