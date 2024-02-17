/**
 * API module for making requests to the backend API.
 *
 * @module api
 * @author Kaan Özsan
 */

import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/auth"; // Your API endpoint

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
    const response = await axios.post(`${API_URL}/register`, {
      username: username,
      password: password,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during registration:",
      error.response || error
    );
    throw error;
  }
}

const apiModule = { authenticate, registration };

export default apiModule;
