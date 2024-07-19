import { User } from '../models/user';

/**
 * Converts a User model object to a format suitable for local storage.
 * 
 * @param {User} user - The User model object.
 * @returns {Object} The user object formatted for local storage.
 */
export const userModelToLocalhost = (user) => {

    const {
        avatar,
        balance,
        firstName,
        gender,
        id,
        isActive,
        lastName,
    } = user;

    return {
        avatar,
        balance,
        first_name: firstName,
        gender,
        id,
        isActive,
        last_name: lastName,
    };
}
