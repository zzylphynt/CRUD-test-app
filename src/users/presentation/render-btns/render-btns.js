import usersStore from "../../store/users-store";
import { renderTable } from "../render-table/render-table";
import "./render-btns.css";

/**
 * Renders pagination buttons and updates the table based on the current page.
 *
 * @param {HTMLElement} element - The DOM element to which the pagination buttons will be appended.
 */
export const renderBtns = (element) => {
  // Create the "Next" button
  const nextBtn = document.createElement("button");
  nextBtn.innerText = " Next >";

  // Create the "Previous" button
  const prevBtn = document.createElement("button");
  prevBtn.innerText = "< Previous ";

  // Create and display the current page label
  const currentPageLabel = document.createElement("span");
  currentPageLabel.id = "current-page";
  currentPageLabel.innerText = usersStore.getCurrentPage();

  // Append buttons and label to the provided element
  element.append(prevBtn, currentPageLabel, nextBtn);
  const updateBtnState = () => {
    nextBtn.disabled = usersStore.isLastPage();
    prevBtn.disabled = usersStore.isFirstPage();
    currentPageLabel.innerText = usersStore.getCurrentPage();
  };

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
