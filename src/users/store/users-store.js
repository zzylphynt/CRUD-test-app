import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state = {
  currentPage: 0,
  users: [],
};

const loadNextPage = async () => {
  // TODO find out why the fucking button keeps changing pages when the limit is reached  
  const users = await loadUsersByPage(state.currentPage + 1);
  if (users.length === 0 || users.length === state.currentPage) return;
  state.currentPage += 1;
  state.users = users;
};

const loadPreviousPage = async () => {
  if (state.currentPage === 1) return;
  const users = await loadUsersByPage(state.currentPage - 1);
  state.currentPage = state.currentPage -= 1;
  state.users = users;
};

//TODO implement
const onUserChanged = () => {
  throw new Error("No implementado");
};

const reloadPage = async () => {
  throw new Error("No implementado");
};

export default {
  loadNextPage,
  loadPreviousPage,
  onUserChanged,
  reloadPage,

  getUsers: () => [...state.users],
  getCurrentPage: () => state.currentPage,
};
