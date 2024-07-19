import { localhostUserToModel } from "../mappers/localhost-user.mapper";

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const loadUsersByPage = async (page = 1) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;

    const { data } = await fetchData(url);
    if (!Array.isArray(data)) throw new Error("invalid data structure");
    
    return data.map(localhostUserToModel);
  } catch (error) {
    console.error("Error loading users by page:", error);
    throw error;
  }
};
