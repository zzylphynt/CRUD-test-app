import { localhostUserToModel } from "../mappers/localhost-user.mapper";

export const loadUsersByPage = async (page = 1) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const { data } = await res.json();
    const users = data.map(localhostUserToModel);
    console.log("Mapped users:", users);

    return users;
  } catch (error) {
    console.error("Error loading users by page:", error);
    throw error;
  }
};
