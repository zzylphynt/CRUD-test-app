import { showModal } from "../render-modal/render-modal";
import "./render-add-btn.css";

export const renderAddBtn = (element) => {
  const fabBtn = document.createElement("button");
  fabBtn.innerText = "+";
  fabBtn.classList.add("fab-btn");

  element.append(fabBtn);

  fabBtn.addEventListener("click", () => {
    showModal();
  });
};
