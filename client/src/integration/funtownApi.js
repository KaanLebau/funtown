/**
 * API module for making requests to the backend API.
 *
 * @module api
 * @author Kaan Özsan
 */

import axios from "axios";

const API_URL = "http://localhost:8765/api/v1"; // Your API endpoint

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
  //DONE doc
  try {
    const response = await axios.post(`${API_URL}/auth/authenticate`, {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred during login:", error.response || error);
    throw error;
  }
}

/**
 * Makes a request to the backend API to register a new user.
 *
 * This function sends a POST request to the '/register' endpoint
 * with the provided username and password for registration.
 *
 * If the registration is successful, it returns the response data containing user details.
 * If an error occurs during the request, it throws an error.
 *
 * @param {string} username - The username for the new user.
 * @param {string} password - The password for the new user.
 * @returns {Promise<any>} A promise that resolves to the response data containing user details upon successful registration.
 * @throws {Error} If an error occurs during the registration process.
 *
 * @example
 * // Usage of registration function:
 * const { registration } = require('./api');
 *
 * async function registerNewUser(username, password) {
 *   try {
 *     const userData = await registration(username, password);
 *     console.log('User registered successfully:', userData);
 *     // Process user data...
 *   } catch (error) {
 *     console.error('Failed to register user:', error.message);
 *     // Handle registration error...
 *   }
 * }
 */
async function registration(username, password) {
  //DONE doc
  try {
    const response = await axios.post(`${API_URL}/auth/registration`, {
      username: username,
      password: password,
      role: "APPLICANT",
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
 * Makes a request to the backend API to register user information.
 *
 * This function sends a POST request to the '/persons/create' endpoint
 * with the provided user information and the user's authentication token.
 *
 * If the registration is successful, it returns the response data containing user details.
 * If an error occurs during the request, it logs the error and throws an exception.
 *
 * @param {string} token - The user's authentication token.
 * @param {object} userInfo - The user information to be registered.
 * @returns {Promise<any>} A promise that resolves to the response data containing user details upon successful registration.
 * @throws {Error} If an error occurs during the registration process.
 *
 * @example
 * // Usage of registerUserInfo function:
 * import apiModule from "../../integration/funtownApi";
 *
 * async function registerUser(token, userInfo) {
 *   try {
 *     const userData = await registerUserInfo(token, userInfo);
 *     console.log('User registered successfully:', userData);
 *     // Process user data...
 *   } catch (error) {
 *     console.error('Failed to register user:', error.message);
 *     // Handle registration error...
 *   }
 * }
 */
async function registerUserInfo(token, userInfo) {
  //DONE doc
  try {
    const response = await axios.post(`${API_URL}/persons/create`, userInfo, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    console.log("funtown api failed");
    console.error(
      "An error occurred during registration:",
      error.response || error
    );
    throw error;
  }
}

/**
 * Makes a request to the backend API to fetch the list of positions.
 *
 * This function sends a GET request to the '/competence/list' endpoint
 * with the user's authentication token.
 *
 * If the request is successful, it returns the response data containing the list of positions.
 * If an error occurs during the request, it logs the error and throws an exception.
 *
 * @param {string} token - The user's authentication token.
 * @returns {Promise<any>} A promise that resolves to the response data containing the list of positions.
 * @throws {Error} If an error occurs during the request process.
 *
 * @example
 * // Usage of getPositionList function:
 * import apiModule from "../../integration/funtownApi";
 *
 * async function getPositionList(token) {
 *   try {
 *     const positions = await getPositionList(token);
 *     console.log('Positions fetched successfully:', positions);
 *     // Handle fetched positions data...
 *   } catch (error) {
 *     console.error('Failed to fetch positions:', error.message);
 *     // Handle fetch error...
 *   }
 * }
 */
async function getPositionList(token) {
  //DONE doc
  console.log("get position list");
  try {
    const response = await axios.get(`${API_URL}/competence/list`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
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

/**
 * Makes a request to the backend API to fetch all applications.
 *
 * This function sends a GET request to the '/availability/allapplications' endpoint
 * with the user's authentication token.
 *
 * If the request is successful, it returns the response data containing all applications.
 * If an error occurs during the request, it logs the error and throws an exception.
 *
 * @param {string} token - The user's authentication token.
 * @returns {Promise<any>} A promise that resolves to the response data containing all applications.
 * @throws {Error} If an error occurs during the request process.
 *
 * @example
 * // Usage of getAllApplications function:
 * import apiModule from "../../integration/funtownApi";
 *
 * async function getAllApplications(token) {
 *   try {
 *     const applicationsData = await getAllApplications(token);
 *     console.log('All applications fetched successfully:', applicationsData);
 *     // Handle fetched applications data...
 *   } catch (error) {
 *     console.error('Failed to fetch all applications:', error.message);
 *     // Handle fetch error...
 *   }
 * }
 */
async function getAllApplications(token) {
  //DONE doc
  try {
    const response = await axios.get(
      `${API_URL}/availability/allapplications`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during user inf fetching from user service:",
      error.response || error
    );
    throw error;
  }
}
/**
 * Makes a request to the backend API to update the user's experience.
 *
 * This function sends a PUT request to the '/user/experience/update' endpoint
 * with the provided experience data and the user's authentication token.
 *
 * If an error occurs during the request, it logs the error.
 *
 * @param {string} token - The user's authentication token.
 * @param {Array<Object>} experience - The experience data to be updated.
 * @throws {Error} If an error occurs during the request process.
 *
 * @example
 * // Usage of updateUserExperience function:
 * import apiModule from "../../integration/funtownApi";
 *
 * async function updateExperience(token, experienceData) {
 *   try {
 *     await updateUserExperience(token, experienceData);
 *     console.log('User experience updated successfully');
 *   } catch (error) {
 *     console.error('Failed to update user experience:', error.message);
 *     // Handle error...
 *   }
 * }
 */
async function updateUserExperience(token, experience) {
  //DONE doc
  try {
    const response = await axios.put(
      `${API_URL}/competenceprofiles/` + experience.competence_id,
      experience,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching user experience:", error);
    throw error;
  }
}

/**
 * Makes a request to the backend API to update the user's availability.
 *
 * This function sends a PUT request to the '/user/availability/update' endpoint
 * with the provided availability data and the user's authentication token.
 *
 * If an error occurs during the request, it logs the error.
 *
 * @param {string} token - The user's authentication token.
 * @param {Array<Object>} availability - The availability data to be updated.
 * @throws {Error} If an error occurs during the request process.
 *
 * @example
 * // Usage of updateUserAvailability function:
 * import apiModule from "../../integration/funtownApi";
 *
 * async function updateAvailability(token, availabilityData) {
 *   try {
 *     await updateUserAvailability(token, availabilityData);
 *     console.log('User availability updated successfully');
 *   } catch (error) {
 *     console.error('Failed to update user availability:', error.message);
 *     // Handle error...
 *   }
 * }
 */
async function updateUserAvailability(token, availability) {
  //DONE doc
  try {
    const response = await axios.put(
      `${API_URL}/user/availability/update`,
      availability
    );
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching user availability:", error);
    throw error;
  }
}

/**
 * Makes a request to the backend API to remove user experience by ID.
 *
 * This function sends a DELETE request to the '/competenceprofiles/:id' endpoint
 * with the user's authentication token and the ID of the user experience to remove.
 *
 * If the removal is successful, it returns the response data.
 * If an error occurs during the request, it logs the error and throws an exception.
 *
 * @param {string} token - The user's authentication token.
 * @param {string} id - The ID of the user experience to remove.
 * @returns {Promise<any>} A promise that resolves to the response data upon successful removal.
 * @throws {Error} If an error occurs during the removal process.
 *
 * @example
 * // Usage of removeUserExperience function:
 * import apiModule from "../../integration/funtownApi";
 *
 * async function deleteUserExperience(token, id) {
 *   try {
 *     const removedData = await removeUserExperience(token, id);
 *     console.log('User experience removed successfully:', removedData);
 *     // Handle successful removal...
 *   } catch (error) {
 *     console.error('Failed to remove user experience:', error.message);
 *     // Handle removal error...
 *   }
 * }
 */
async function removeUserExperience(token, id) {
  //DONE doc
  try {
    const response = await axios.delete(`${API_URL}/competenceprofiles/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during user inf fetching from user service:",
      error.response || error
    );
    throw error;
  }
}

/**
 * Makes a request to the backend API to add user availability.
 *
 * This function sends a POST request to the '/availability/create' endpoint
 * with the user's authentication token and availability data to add.
 *
 * If the addition is successful, it returns the response data containing the added availability.
 * If an error occurs during the request, it logs the error and throws an exception.
 *
 * @param {string} token - The user's authentication token.
 * @param {Object} availability - The availability data to add.
 * @returns {Promise<any>} A promise that resolves to the response data upon successful addition.
 * @throws {Error} If an error occurs during the addition process.
 *
 * @example
 * // Usage of addUserAvailability function:
 * import apiModule from "../../integration/funtownApi";
 *
 * async function addUserAvailability(token, availability) {
 *   try {
 *     const addedAvailability = await addUserAvailability(token, availability);
 *     console.log('User availability added successfully:', addedAvailability);
 *     // Handle successful addition...
 *   } catch (error) {
 *     console.error('Failed to add user availability:', error.message);
 *     // Handle addition error...
 *   }
 * }
 */
async function addUserAvailability(token, availability) {
  //DONE doc
  try {
    const response = await axios.post(
      `${API_URL}/availability/create`,
      availability,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
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
 * Makes a request to the backend API to fetch the user's availability.
 *
 * This function sends a GET request to the '/user/availability' endpoint
 * with the user's authentication token and username.
 *
 * If an error occurs during the request, it throws an error.
 *
 * @param {string} token - The user's authentication token.
 * @param {string} username - The username of the user whose availability is to be fetched.
 * @returns {Promise<any>} A promise that resolves to the response data containing the user's availability.
 * @throws {Error} If an error occurs during the request process.
 *
 * @example
 * // Usage of getUserAvailability function:
 * import apiModule from "../../integration/funtownApi";
 *
 * async function fetchUserAvailability(token, username) {
 *   try {
 *     const availabilityData = await getUserAvailability(token, username);
 *     console.log('User availability fetched successfully:', availabilityData);
 *     // Process availability data...
 *   } catch (error) {
 *     console.error('Failed to fetch user availability:', error.message);
 *     // Handle error...
 *   }
 * }
 */
async function getUserAvailability(token, username) {
  //DONE doc
  try {
    const response = await axios.get(
      `${API_URL}/availability/username/` + username,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
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
 * Makes a request to the backend API to fetch application details by application ID.
 *
 * This function sends a GET request to the '/applications/:applicationId' endpoint
 * with the user's authentication token and the ID of the application to fetch.
 *
 * If an error occurs during the request, it throws an error.
 *
 * @param {string} token - The user's authentication token.
 * @param {string} applicationId - The ID of the application to fetch details for.
 * @returns {Promise<any>} A promise that resolves to the response data containing the details of the application.
 * @throws {Error} If an error occurs during the request process.
 *
 * @example
 * // Usage of getByApplicationId function:
 * import apiModule from "../../integration/funtownApi";
 *
 * async function fetchApplicationDetails(token, applicationId) {
 *   try {
 *     const applicationData = await getByApplicationId(token, applicationId);
 *     console.log('Application details fetched successfully:', applicationData);
 *     // Process application data...
 *   } catch (error) {
 *     console.error('Failed to fetch application details:', error.message);
 *     // Handle error...
 *   }
 * }
 */
async function getByApplicationId(token, applicationId) {
  //DONE doc
  try {
    const response = await axios.get(
      `${API_URL}/availability/id/${applicationId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during user inf fetching from user service:",
      error.response || error
    );
    throw error;
  }
}

/**
 * Makes a request to the backend API to fetch user details by username.
 *
 * This function sends a GET request to the '/users/:username' endpoint
 * with the user's authentication token and the username of the user to fetch details for.
 *
 * If an error occurs during the request, it throws an error.
 *
 * @param {string} token - The user's authentication token.
 * @param {string} username - The username of the user to fetch details for.
 * @returns {Promise<any>} A promise that resolves to the response data containing the details of the user.
 * @throws {Error} If an error occurs during the request process.
 *
 * @example
 * // Usage of getUserByUsername function:
 * import apiModule from "../../integration/funtownApi";
 *
 * async function fetchUserDetails(token, username) {
 *   try {
 *     const userData = await getUserByUsername(token, username);
 *     console.log('User details fetched successfully:', userData);
 *     // Process user data...
 *   } catch (error) {
 *     console.error('Failed to fetch user details:', error.message);
 *     // Handle error...
 *   }
 * }
 */
async function getUserByUsername(token, username) {
  //DONE doc
  try {
    const response = await axios.get(
      `${API_URL}/persons/username/${username}`,
      username,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during user inf fetching from user service:",
      error.response || error
    );
    throw error;
  }
}
const apiModule = {
  authenticate,
  registration,
  registerUserInfo,
  getAllApplications,
  getUserAvailability,
  getByApplicationId,
  getUserByUsername,
  getPositionList,
  addUserAvailability,
  updateUserExperience,
  updateUserAvailability,
  removeUserExperience,
};
export default apiModule;
