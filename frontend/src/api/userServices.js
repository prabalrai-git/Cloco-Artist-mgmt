import axiosInstance from "../utils/axiosInstance";

export const addUser = async (data) => {
  try {
    const response = await axiosInstance.post("user/", data);
    // Check for an error status in the response and throw an error if necessary
    if (response.data.errors) {
      throw new Error(response.data.message || "User creation failed.");
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

export const getRolesList = async () => {
  try {
    const response = await axiosInstance.get("user/all/roles");
    // Check for an error status in the response and throw an error if necessary
    if (response.data.errors) {
      throw new Error(response.data.message || "Failed to fetch roles.");
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

export const getUsersList = async (page = 1, pageSize = 10) => {
  try {
    const response = await axiosInstance.get("user/", {
      params: {
        page,
        pageSize,
      },
    });
    if (response.data.errors) {
      throw new Error(response.data.message || "Failed to fetch users.");
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await axiosInstance.put(`user/${id}`, data);
    // Check for an error status in the response and throw an error if necessary
    if (response.data.errors) {
      throw new Error(response.data.message || "User update failed.");
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

export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`user/${id}`);
    console.log("API Response:", response.data);

    // Check for an error status in the response and throw an error if necessary
    if (response.data.errors) {
      console.error("User deletion failed with errors:", response.data.errors);
      throw new Error(response.data.message || "User deletion failed.");
    }

    return response.data;
  } catch (error) {
    console.error("Error in deleteUser function:", error);

    if (error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
      console.error("Error response from API:", error.response.data);
      throw new Error(errorMessage); // This will trigger onError
    } else {
      throw error; // Rethrow if it's another kind of error
    }
  }
};
