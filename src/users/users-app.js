import {renderTable  } from "./presentation/render-table/render-table";
import usersStore from "./store/users-store";

export const usersApp = async (element) => {
  element.innerHTML = "Loading...";
  await usersStore.loadNextPage();
  element.innerHTML = "";
  renderTable(element);
};
