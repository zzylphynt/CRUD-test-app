import { localhostUserToModel } from '../mappers/localhost-user.mapper';
import { User } from '../models/user';

/**
 * Retrieves a user by their ID and converts the data to a User model.
 * 
 * @param {String|Number} id - The ID of the user to retrieve.
 * @returns {Promise<User>} - A promise that resolves to a User model instance.
 */
export const getUserById = async (id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    const user = localhostUserToModel(data);
    return user;
}
