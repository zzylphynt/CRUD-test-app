import usersStore from "../../store/users-store";
import { renderTable } from "../render-table/render-table";
import "./render-btns.css";

export const updateBtnState = () => {
  const nextBtn = document.querySelector("#next-btn");
  const prevBtn = document.querySelector("#prev-btn");
  const currentPageLabel = document.querySelector("#current-page");
  const isUsersEmpty = usersStore.getUsers().length === 0;

  nextBtn.disabled = usersStore.isLastPage() || isUsersEmpty;
  prevBtn.disabled = usersStore.isFirstPage() || isUsersEmpty;
  currentPageLabel.innerText = usersStore.getCurrentPage();
};
/**
 * Renders pagination buttons and updates the table based on the current page.
 *
 * @param {HTMLElement} element - The DOM element to which the pagination buttons will be appended.
 */
export const renderBtns = (element) => {
  // Create the "Next" button
  const nextBtn = document.createElement("button");
  nextBtn.id = "next-btn"
  nextBtn.innerText = " Next >";

  // Create the "Previous" button
  const prevBtn = document.createElement("button");
  prevBtn.id = "prev-btn"
  prevBtn.innerText = "< Previous ";

  // Create and display the current page label
  const currentPageLabel = document.createElement("span");
  currentPageLabel.id = "current-page";
  currentPageLabel.innerText = usersStore.getCurrentPage();

  // Append buttons and label to the provided element
  element.append(prevBtn, currentPageLabel, nextBtn);

  //init update state
  updateBtnState();

  // Add event listener to the "Next" button to load and display the next page
  nextBtn.addEventListener("click", async () => {
    await usersStore.loadNextPage();
    updateBtnState();
    renderTable(element);
  });

  // Add event listener to the "Previous" button to load and display the previous page
  prevBtn.addEventListener("click", async () => {
    await usersStore.loadPreviousPage();
    updateBtnState();
    renderTable(element);
  });
};
