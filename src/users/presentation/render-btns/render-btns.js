import usersStore from "../../store/users-store";
import { renderTable } from "../render-table/render-table";
import "./render-btns.css";

export const renderBtns = (element) => {
  const nextBtn = document.createElement("button");
  nextBtn.innerText = " Next >";

  const prevBtn = document.createElement("button");
  prevBtn.innerText = "< Previous ";

  const curretnPageLabel = document.createElement("span");
  curretnPageLabel.id = "current-page";
  curretnPageLabel.innerText = usersStore.getCurrentPage();

  element.append(prevBtn, curretnPageLabel, nextBtn);

  nextBtn.addEventListener("click", async () => {
    await usersStore.loadNextPage();
    curretnPageLabel.innerText = usersStore.getCurrentPage();
    renderTable(element);
  });

  prevBtn.addEventListener("click", async () => {
    await usersStore.loadPreviousPage();
    curretnPageLabel.innerText = usersStore.getCurrentPage();
    renderTable(element);
  });
};
