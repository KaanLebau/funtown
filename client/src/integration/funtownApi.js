/**
 * API module for making requests to the backend API.
 *
 * @module api
 * @author Kaan Özsan
 */

import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/auth"; // Your API endpoint
const API_PERSON_URL = "http://localhost:5050/api/persons"; // Your API person-related endpoint

/**
 * Makes a request to the backend API to authenticate a user.
 *
 * This function sends a POST request to the '/login' endpoint with the provided username and password,
 * and returns the response data upon successful authentication.
 *
 * If an error occurs during the request, it logs the error and throws an exception.
 *
 * @param {string} username - The username of the user to authenticate.
 * @param {string} password - The password of the user to authenticate.
 * @returns {Promise<any>} A promise that resolves to the response data upon successful authentication.
 * @throws {Error} If an error occurs during the authentication process.
 *
 * @example
 * // Usage of the login function:
 * const { login } = require('./api');
 *
 * async function authenticateUser(username, password) {
 *   try {
 *     const userData = await login(username, password);
 *     console.log('User authenticated successfully:', userData);
 *     // Perform actions with the user data...
 *   } catch (error) {
 *     console.error('Failed to authenticate user:', error.message);
 *     // Handle authentication error...
 *   }
 * }
 */
async function authenticate(username, password) {
  try {
    const response = await axios.post(`${API_URL}/authenticate`, {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred during login:", error.response || error);
    throw error;
  }
}

async function registration(username, password) {
  try {
    const response = await axios.post(`${API_URL}/registration`, {
      username: username,
      password: password,
      role : "APPLICANT"
    });

    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during registration:",
      error.response || error
    );
    throw error;
  }
}
/**
 * Makes a request to the backend API to fetch all applications.
 *
 * This function sends a GET request to the '/applications' endpoint
 * and returns the response data containing all applications.
 *
 * If an error occurs during the request, it logs the error and throws an exception.
 *
 * @returns {Promise<any>} A promise that resolves to the response data containing all applications.
 * @throws {Error} If an error occurs during the request process.
 */
async function getAllApplications() {
  try {
    const response = await axios.get(`${API_URL}/applications`);
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching applications:", error);
    throw error;
  }
}
/**
 * Asynchronously retrieves a list of all persons from the backend API.
 *
 * This method utilizes the `axios` library to make an HTTP GET request to the specified endpoint (`http://localhost:5050/api/persons`).
 * Upon a successful response, it parses the response data and returns it as a JavaScript object.
 *
 * In case of an error during the request or response processing, the error is logged using `console.error` and then re-thrown.
 * This allows the caller to handle the error appropriately.
 *
 * @returns {Promise<Object[]>} A Promise that resolves to an array of objects representing the fetched persons.
 *                                On error, the Promise is rejected with the caught error.
 * @throws {Error} Re-throws any error encountered during the API call or data processing.
 *
 * @example
 * ```javascript
 * async function fetchPersons() {
 *   try {
 *     const persons = await getAllPersons();
 *     console.log(persons); // Array of person objects
 *   } catch (error) {
 *     console.error("Error fetching persons:", error);
 *   }
 * }
 * ```
 */

async function getAllPersons() {
  try {
    const response = await axios.get(API_PERSON_URL);
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching persons:", error);
    throw error;
  }
}


/**
 * Makes a request to the backend API to create a new person.
 *
 * This function sends a POST request directly to the '/persons' endpoint (without '/create'),
 * with the provided person data in the request body.
 *
 * If an error occurs during the request, it logs the error and throws an exception.
 *
 * @param {Object} personData - The data of the person to create.
 * @returns {Promise<any>} A promise that resolves to the response data upon successful creation.
 * @throws {Error} If an error occurs during the creation process.
 */
async function createPerson(personData) {
  try {
    const response = await axios.post(API_PERSON_URL, personData); 
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("An error occurred during person creation:", error.response || error);
    throw error;
  }
}


/**
 * Makes a request to the backend API to update an existing person.
 *
 * This function sends a PUT request to the '/persons/{id}' endpoint
 * with the ID of the person to update in the URL path and the updated person data in the request body.
 *
 * If an error occurs during the request, it logs the error and throws an exception.
 *
 * @param {number} id - The ID of the person to update.
 * @param {Object} updatedPersonData - The updated data of the person.
 * @returns {Promise<any>} A promise that resolves to the response data upon successful update.
 * @throws {Error} If an error occurs during the update process.
 */
async function updatePerson(id, updatedPersonData) {
  try {
    const response = await axios.put(`${API_PERSON_URL}/${id}`, updatedPersonData);
    return response.data;
  } catch (error) {
    console.error("An error occurred during person update:", error.response || error);
    throw error;
  }
}

/**
 * Makes a request to the backend API to delete an existing person.
 *
 * This function sends a DELETE request to the '/persons/{id}' endpoint
 * with the ID of the person to delete in the URL path.
 *
 * If an error occurs during the request, it logs the error and throws an exception.
 *
 * @param {number} id - The ID of the person to delete.
 * @returns {Promise<any>} A promise that resolves to the response data upon successful deletion.
 * @throws {Error} If an error occurs during the deletion process.
 */
async function deletePerson(id) {
  try {
    const response = await axios.delete(`${API_PERSON_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("An error occurred during person deletion:", error.response || error);
    throw error;
  }
}
const apiModule = { 
  authenticate, 
  registration, 
  getAllApplications, 
  getAllPersons,
  createPerson,
  updatePerson,
  deletePerson
};



export default apiModule;
