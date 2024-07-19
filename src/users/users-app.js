import { renderAddBtn } from "./presentation/render-add-btn/render-add-btn";
import { renderBtns } from "./presentation/render-btns/render-btns";
import { renderModal } from "./presentation/render-modal/render-modal";
import { renderTable } from "./presentation/render-table/render-table";
import usersStore from "./store/users-store";
import { saveUser } from "./use-cases/save-user";

/**
 * Initializes and renders the users application.
 * 
 * @param {HTMLDivElement} element - The DOM element where the application will be rendered.
 * @returns {Promise<void>}
 */
export const usersApp = async (element) => {
  element.innerHTML = "Loading...";
  await usersStore.loadNextPage();
  element.innerHTML = "";
  
  renderTable(element); // Render the table with user data
  renderBtns(element);  // Render pagination buttons
  renderAddBtn(element); // Render the "Add" button
  renderModal(element, async (userLike) => {
    const user = await saveUser(userLike); // Save the user data
    usersStore.onUserChanged(user); // Update the users store with the new user data
    renderTable(element); // Re-render the table to reflect the changes
  });
};
