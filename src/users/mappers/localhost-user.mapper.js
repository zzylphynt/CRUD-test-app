import { User } from "../models/user"

/**
 * Converts a user object from the local storage format to the User model format.
 * 
 * @param {Like<User>} localhostUser - The user object from local storage.
 * @returns {User} The converted User object.
 */
export const localhostUserToModel = (localhostUser) => {

    const {
        avatar,
        balance,
        first_name,
        gender,
        id,
        isActive,
        last_name,
    } = localhostUser;

    return new User({
        avatar,
        balance,
        firstName: first_name,
        gender,
        id,
        isActive,
        lastName: last_name,
    });
}
