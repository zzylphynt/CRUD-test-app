import usersStore from '../../store/users-store';
import { showModal } from '../render-modal/render-modal';
import { deleteUserById } from '../../use-cases/delete-user-by-id';
import './render-table.css';
import { updateBtnState } from '../render-btns/render-btns';

let table;

/**
 * Creates and returns a new HTML table element with headers and an empty body.
 * 
 * @returns {HTMLTableElement} The created table element.
 */
const createTable = () => {
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML = `
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;

    const tableBody = document.createElement('tbody');
    table.append(tableHeaders, tableBody);
    return table;
}

/**
 * Handles click events for selecting a user from the table.
 * 
 * @param {MouseEvent} event - The click event.
 */
const tableSelectListener = (event) => {
    const element = event.target.closest('.select-user');
    if (!element) return;

    const id = element.getAttribute('data-id');
    showModal(id);
}

/**
 * Handles click events for deleting a user from the table.
 * 
 * @param {MouseEvent} event - The click event.
 */
const tableDeleteListener = async (event) => {
    const element = event.target.closest('.delete-user');
    if (!element) return;

    const id = element.getAttribute('data-id');
    try {
        await deleteUserById(id);
        await usersStore.removeUserAndAdjustPage(id)
        document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
        updateBtnState()
        renderTable(document.querySelector('#table-container')); // Assuming the table is within #table-container
    } catch (error) {
        console.log(error);
        alert('Failed to delete the user');
    }
}

/**
 * Renders the table with user data into the specified container element.
 * 
 * @param {HTMLDivElement} element - The container element to append the table to.
 */
export const renderTable = (element) => {
    
    const users = usersStore.getUsers();

    if (!table) {
        table = createTable();
        element.append(table);

        table.addEventListener('click', tableSelectListener);
        table.addEventListener('click', tableDeleteListener);
    }
    
    let tableHTML = '';
    users.forEach(user => {
        tableHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.balance}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.isActive}</td>
                <td>
                    <a href="#/" class="select-user" data-id="${user.id}">Select</a>
                    |
                    <a href="#/" class="delete-user" data-id="${user.id}">Delete</a>
                </td>
            </tr>
        `;
    });
    
    table.querySelector('tbody').innerHTML = tableHTML;
}
