/**
 * API module for making requests to the backend API.
 *
 * @module api
 * @author Kaan Özsan
 */

//TODO eneble this import axios from "axios";

//TODO eneble this const API_URL = "http://localhost:5000/api/v1"; // Your API endpoint

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

//TODO eneble this async function login(username, password) {
//TODO eneble this   try {
//TODO eneble this     const response = await axios.post(`${API_URL}/login`, {
//TODO eneble this       username: username,
//TODO eneble this       password: password,
//TODO eneble this     });
//TODO eneble this     return response.data;
//TODO eneble this   } catch (error) {
//TODO eneble this     console.error("An error occurred during login:", error.response || error);
//TODO eneble this     throw error;
//TODO eneble this   }
//TODO eneble this }

//TODO eneble this module.exports = { login };
