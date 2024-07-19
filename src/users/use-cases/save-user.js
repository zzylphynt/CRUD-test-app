import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { userModelToLocalhost } from "../mappers/user-to-localhost.mapper";
import { User } from "../models/user";

/**
 * Saves a user to the database, either creating a new user or updating an existing one.
 * 
 * @param {Object} userLike - An object containing user data, which may or may not include an ID.
 * @returns {Promise<User>} - A promise that resolves to a User model instance representing the saved user.
 * @throws {Error} - Throws an error if the first name or last name is missing.
 */
export const saveUser = async (userLike) => {
  const user = new User(userLike);
  if (!user.firstName || !user.lastName) throw new Error("First & last name are required");

  const userToSave = userModelToLocalhost(user);
  let userUpdated;
  if (user.id) {
    userUpdated = await updateUser(userToSave);
  } else {
    userUpdated = await createUser(userToSave);
  }

  return localhostUserToModel(userUpdated);
};

/**
 * Creates a new user in the database.
 * 
 * @param {Object} user - The user data to be created.
 * @returns {Promise<Object>} - A promise that resolves to the newly created user data.
 */
const createUser = async (user) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const newUser = await res.json();
  return newUser;
};

/**
 * Updates an existing user in the database.
 * 
 * @param {Object} user - The user data to be updated, including the user ID.
 * @returns {Promise<Object>} - A promise that resolves to the updated user data.
 */
const updateUser = async (user) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
  const res = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const updatedUser = await res.json();
  return updatedUser;
};
