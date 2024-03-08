/**
 * API module for making requests to the backend API.
 *
 * @module api
 * @author Kaan Özsan
 */

import axios from "axios";
import {
  getUserByUsernameMock,
  getByApplicationIdMock,
  getAllApplicationsMock,
  getExperienceByUsernameMock,
  getAvailabilityByUsernameMock,
  getAuthByUsername,
} from "./mockapi";

const API_URL = "http://localhost:8765/api/v1"; // Your API endpoint

/**
 * Function to create an Axios instance with authorization headers.
 *
 * @param {object} currentUser - The current user state containing the token.
 * @returns {AxiosInstance} An Axios instance with the authorization header set.
 */
const axiosWithAuth = (currentUser) => {
  const token = currentUser?.token;
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return instance;
};

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
//TODO DONE
async function registerUserInfo(token, userInfo) {
  try {
    const response = await axios.post(`${API_URL}/persons/create`, userInfo, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
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
//TODO DEBUGG
async function getPositionList(token) {
  try {
    const response = await axios.get(`${API_URL}/competence/list`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
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
async function getAllApplications(token) {
  try {
    const response = await getAllApplicationsMock(token);
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching applications:", error);
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
  try {
    const response = await axiosWithAuth(token).put(
      `${API_URL}/user/experience/update`,
      experience
    );
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
  try {
    const response = await axiosWithAuth(token).put(
      `${API_URL}/user/availability/update`,
      availability
    );
  } catch (error) {
    console.error("An error occurred while fetching user availability:", error);
    throw error;
  }
}
/**
 * Makes a request to the backend API to fetch the user's experience.
 *
 * This function sends a GET request to the '/user/experience' endpoint
 * with the user's authentication token and username.
 *
 * If an error occurs during the request, it throws an error.
 *
 * @param {string} token - The user's authentication token.
 * @param {string} username - The username of the user whose experience is to be fetched.
 * @returns {Promise<any>} A promise that resolves to the response data containing the user's experience.
 * @throws {Error} If an error occurs during the request process.
 *
 * @example
 * // Usage of getUserExperience function:
 * import apiModule from "../../integration/funtownApi";
 *
 * async function fetchUserExperience(token, username) {
 *   try {
 *     const experienceData = await getUserExperience(token, username);
 *     console.log('User experience fetched successfully:', experienceData);
 *     // Process experience data...
 *   } catch (error) {
 *     console.error('Failed to fetch user experience:', error.message);
 *     // Handle error...
 *   }
 * }
 */
//TODO not working
async function getUserExperience(token, username) {
  try {
    const response = await getExperienceByUsernameMock(token, username);
    return response;
  } catch (error) {
    console.error("An error occurred while fetching user experience:", error);
    throw error;
  }
}
//TODO not working
async function removeUserExperience(token, id) {
  try {
    const response = await getExperienceByUsernameMock(token, id);
    return response;
  } catch (error) {
    console.error("An error occurred while fetching user experience:", error);
    throw error;
  }
}

//TODO this ep works
async function addUserAvailability(token, availability) {
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
  try {
    const response = await getByApplicationIdMock(token, applicationId);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function getAuth(username) {
  try {
    const response = await getAuthByUsername(username);
    return response;
  } catch (error) {
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
  try {
    const response = await getUserByUsernameMock(token, username);
    return response;
  } catch (error) {
    throw error;
  }
}
const apiModule = {
  authenticate,
  registration,
  registerUserInfo,
  getAllApplications,
  getUserExperience,
  getUserAvailability,
  addUserAvailability,
  getByApplicationId,
  getUserByUsername,
  getAuth,
  updateUserExperience,
  updateUserAvailability,
  getPositionList,
};
export default apiModule;
