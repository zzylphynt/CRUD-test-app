import modalHtml from "./render-modal.html?raw";
import { User } from "../../models/user";
import "./render-modal.css";
import { getUserById } from "../../use-cases/get-user-by-id";

let modal, form;
let loadedUser = {};

/**
 * Displays the modal and populates it with user data if an ID is provided.
 * 
 * @param {number} id - The ID of the user to be displayed in the modal.
 */
export const showModal = async (id) => {
  modal?.classList.remove("hide-modal");
  loadedUser = {};
  
  if (!id) return;
  const user = await getUserById(id);
  setFormValues(user);
};

/**
 * Hides the modal and resets the form.
 */
export const hideModal = () => {
  modal?.classList.add("hide-modal");
  form?.reset();
};

/**
 * Sets the form values based on the user data.
 * 
 * @param {User} user - The user data to populate the form with.
 */
const setFormValues = (user) => {
  form.querySelector("[name='firstName']").value = user.firstName;
  form.querySelector("[name='lastName']").value = user.lastName;
  form.querySelector("[name='balance']").value = user.balance;
  form.querySelector("[name='isActive']").checked = user.isActive;
  loadedUser = user;
};

/**
 * Renders the modal and sets up event listeners for form submission and modal click events.
 * 
 * @param {HTMLElement} element - The DOM element to append the modal to.
 * @param {Function} callback - The function to call with the form data when the form is submitted.
 */
export const renderModal = (element, callback) => {
  if (modal) return;
  modal = document.createElement("div");
  modal.innerHTML = modalHtml;
  modal.className = "modal-container hide-modal";
  form = modal.querySelector("form");

  // Close the modal when clicking outside the form
  modal.addEventListener("click", (event) => {
    if (event.target.className === "modal-container") {
      hideModal();
    }
  });

  // Handle form submission
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const userLike = { ...loadedUser };

    // Initialize isActive as false
    userLike.isActive = false;

    for (const [key, value] of formData.entries()) {
      if (key === "balance") {
        userLike[key] = +value; // Convert balance to a number
        continue;
      }

      if (key === "isActive") {
        userLike[key] = (value === "on") ? true : false; // Convert checkbox value to boolean
        continue;
      }

      userLike[key] = value;
    }

    await callback(userLike); // Call the provided callback with the form data
    hideModal(); // Hide the modal after submission
  });

  element.append(modal); // Append the modal to the provided element
};
