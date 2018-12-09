import axios from "axios";
const BASE_URL = "https://jc-northcoders-news.herokuapp.com/api";

export const getData = async (id, topic) => {
  let url = "";

  if (id !== "") url = `articles/${id}`;
  else if (topic === "all") url = "topics";
  else if (topic !== "all" && topic !== undefined)
    url = `topics/${topic}/articles`;
  else url = "articles";

  const { data } = await axios.get(`${BASE_URL}/${url}`);
  if (id !== "") return data.article;
  else if (topic === "all") return data.topics;
  else return data.articles;
};

export const getUser = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data.user;
};

export const getArticlesForUser = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}/articles`);
  return data.articles;
};

export const getComments = async id => {
  const { data } = await axios.get(`${BASE_URL}/articles/${id}/comments`);
  return data.comments;
};

export const postComment = async (comment, id, userID) => {
  const { data } = await axios.post(`${BASE_URL}/articles/${id}/comments`, {
    body: comment,
    belongs_to: id,
    created_by: userID
  });
  return data.comment;
};

export const alterVotes = async (id, direction, work) => {
  const { data } = await axios.patch(
    `${BASE_URL}/${work}/${id}?vote=${direction}`
  );
  return data[work];
};

export const postArticle = async (title, article, slug, userID) => {
  const { data } = await axios.post(`${BASE_URL}/topics/${slug}/articles`, {
    title: title,
    body: article,
    belongs_to: slug.toLowerCase(),
    created_by: userID
  });
  return data.article;
};

export const login = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data.user;
};

export const deleteItem = async (id, prop) => {
  const { data } = await axios.delete(`${BASE_URL}/${prop}/${id}`);
  return data.message;
};
