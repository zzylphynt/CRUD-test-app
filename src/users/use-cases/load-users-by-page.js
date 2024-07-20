import { localhostUserToModel } from "../mappers/localhost-user.mapper";

/**
 * Fetches data from a given URL and checks for HTTP errors.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Object>} - A promise that resolves to the fetched data in JSON format.
 * @throws {Error} - Throws an error if the HTTP response is not OK.
 */
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/**
 * Loads a page of users from the API and converts them to User model instances.
 *
 * @param {number} [page=1] - The page number to load. Defaults to 1 if not provided.
 * @returns {Promise<User[]>} - A promise that resolves to an array of User model instances.
 * @throws {Error} - Throws an error if the data structure is invalid or if there's a problem with the fetch operation.
 */
export const loadUsersByPage = async (page = 1) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;
    const response = await fetchData(url);

    if (!Array.isArray(response.data))
      throw new Error("invalid data structure");

    return {
      users: response.data.map(localhostUserToModel),
      totalPages: response.pages
    };
  } catch (error) {
    console.error("Error loading users by page:", error);
    throw error;
  }
};
