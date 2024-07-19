import { renderAddBtn } from "./presentation/render-add-btn/render-add-btn";
import { renderBtns } from "./presentation/render-btns/render-btns";
import { renderModal } from "./presentation/render-modal/render-modal";
import { renderTable } from "./presentation/render-table/render-table";
import usersStore from "./store/users-store";
import { saveUser } from "./use-cases/save-user";

export const usersApp = async (element) => {
  element.innerHTML = "Loading...";
  await usersStore.loadNextPage();
  element.innerHTML = "";
  renderTable(element);
  renderBtns(element);
  renderAddBtn(element);
  renderModal(element, async(userLike)=>{
    const user = await saveUser(userLike);
    usersStore.onUserChanged(user)
    renderTable();
  })
};
