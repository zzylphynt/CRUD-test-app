import usersStore from "./store/users-store"

export const usersApp = async(element) =>{

    element.innerHTML = "Loading..."
    await usersStore.loadNextPage();
    
}