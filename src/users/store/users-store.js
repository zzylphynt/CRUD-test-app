import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state = {
    currentPage: 0,
    users: [],
}

/**
 * Loads the next page of users and updates the current page state.
 * 
 * @returns {Promise<void>}
 */
const loadNextPage = async () => {
    const users = await loadUsersByPage(state.currentPage + 1);
    if (users.length === 0) return;

    state.currentPage += 1;
    state.users = users;
}

/**
 * Loads the previous page of users and updates the current page state.
 * 
 * @returns {Promise<void>}
 */
const loadPreviousPage = async () => {
    if (state.currentPage === 1) return;
    const users = await loadUsersByPage(state.currentPage - 1);
    
    state.users = users;
    state.currentPage -= 1;
}

/**
 * Updates the state with an updated user. Adds the user if not found and less than 10 users are in the state.
 * 
 * @param {User} updatedUser - The user object with updated data.
 */
const onUserChanged = (updatedUser) => {
    let wasFound = false;

    state.users = state.users.map(user => {
        if (user.id === updatedUser.id) {
            wasFound = true;
            return updatedUser;
        }
        return user;
    });

    if (state.users.length < 10 && !wasFound) {
        state.users.push(updatedUser);
    }
}

/**
 * Reloads the current page of users. If no users are found, it loads the previous page.
 * 
 * @returns {Promise<void>}
 */
const reloadPage = async () => {
    const users = await loadUsersByPage(state.currentPage);
    if (users.length === 0) {
        await loadPreviousPage();
        return;
    } 
    
    state.users = users;
}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    /**
     * Returns a copy of the users array from the state.
     * 
     * @returns {User[]}
     */
    getUsers: () => [...state.users],

    /**
     * Returns the current page number from the state.
     * 
     * @returns {number}
     */
    getCurrentPage: () => state.currentPage,
}
