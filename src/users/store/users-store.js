import { loadUsersByPage } from "../use-cases/load-users-by-page";

class UsersStore {
  constructor() {
    this.state = {
      currentPage: 0,
      users: [],
      totalPages: -1,
    };
  }

  async loadPage(page = 1) {
    const { users, totalPages } = await loadUsersByPage(page);

    this.state.currentPage = page;
    this.state.users = users;
    this.state.totalPages = totalPages;
  }

  async loadNextPage() {
    if (this.isLastPage()) return;
    await this.loadPage(this.state.currentPage + 1);
  }

  async loadPreviousPage() {
    if (this.isFirstPage()) return;
    await this.loadPage(this.state.currentPage - 1);
  }

  async reloadPage() {
   await this.loadPage(this.state.currentPage);
  }

  async removeUserAndAdjustPage(userId) {
    this.state.users = this.state.users.filter((user) => user.id !== userId);

    if (this.state.users.length === 0 && this.state.currentPage > 1) {
      await this.loadPreviousPage();
    } else {
      await this.reloadPage();
    }
  }

  onUserChanged = (updatedUser) => {
    let wasFound = false;

    this.state.users = this.state.users.map((user) => {
      if (user.id === updatedUser.id) {
        wasFound = true;
        return updatedUser;
      }
      return user;
    });

    if (this.state.users.length < 10 && !wasFound) {
      this.state.users.push(updatedUser);
    }
  }

  getUsers() {
    return [...this.state.users];
  }

  getCurrentPage() {
    return this.state.currentPage;
  }

  isFirstPage() {
    return this.state.currentPage === 1;
  }

  isLastPage() {
    return this.state.currentPage === this.state.totalPages;
  }
}

export default new UsersStore();
