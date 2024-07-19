/**
 * Represents a user with various attributes.
 */
export class User {
  /**
   * Creates an instance of the User class.
   * 
   * @param {Object} params - The parameters for creating a User instance.
   * @param {number} params.id - The unique identifier for the user.
   * @param {boolean} params.isActive - Indicates whether the user is active.
   * @param {number} params.balance - The user's balance.
   * @param {string} params.avatar - The URL or path to the user's avatar.
   * @param {string} params.firstName - The user's first name.
   * @param {string} params.lastName - The user's last name.
   * @param {string} params.gender - The user's gender.
   */
  constructor({ id, isActive, balance, avatar, firstName, lastName, gender }) {
    this.id = id;
    this.isActive = isActive;
    this.balance = balance;
    this.avatar = avatar;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
  }
}
