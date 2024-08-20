import axiosInstance from "../utils/axiosInstance";

export const loginUser = async (data) => {
  try {
    const response = await axiosInstance.post("auth/login", data);
    // Check for an error status in the response and throw an error if necessary
    if (response.data.errors) {
      throw new Error(response.data.message || "Login failed");
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      throw new Error(errorMessage); // This will trigger onError
    } else {
      throw error; // Rethrow if it's another kind of error
    }
  }
};

export const RegisterUser = async (data) => {
  try {
    const response = await axiosInstance.post("auth/register", data);
    if (response.data.errors) {
      throw new Error(response.data.message || "Registration failed");
    }
    return response;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
};
