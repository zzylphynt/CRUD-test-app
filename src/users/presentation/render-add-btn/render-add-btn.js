import { showModal } from "../render-modal/render-modal";
import "./render-add-btn.css";

/**
 * Renders a floating action button (FAB) that opens a modal when clicked.
 * 
 * @param {HTMLElement} element - The DOM element to which the FAB will be appended.
 */
export const renderAddBtn = (element) => {
  // Create the floating action button
  const fabBtn = document.createElement("button");
  fabBtn.innerText = "+";
  fabBtn.classList.add("fab-btn");

  // Append the FAB to the provided element
  element.append(fabBtn);

  // Add an event listener to open the modal when the FAB is clicked
  fabBtn.addEventListener("click", () => {
    showModal();
  });
};
