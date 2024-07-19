/**
 * Deletes a user by their ID.
 * 
 * @param {String|Number} id - The ID of the user to be deleted.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the deletion was successful.
 */
export const deleteUserById = async (id) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    const res = await fetch(url, {
        method: 'DELETE',
    });

    await res.json(); // Optional: Handle the response data if needed
    return true;
}
