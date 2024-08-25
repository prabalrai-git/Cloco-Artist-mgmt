import axiosInstance from "../utils/axiosInstance";

export const addMusic = async (data) => {
  try {
    const response = await axiosInstance.post("music/", data);
    // Check for an error status in the response and throw an error if necessary
    if (response.data.errors) {
      throw new Error(response.data.message || "Song creation failed.");
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

export const getMusicListByArtistId = async (id) => {
  try {
    const response = await axiosInstance.get(`music/artist/${id}`);
    // Check for an error status in the response and throw an error if necessary
    if (response.data.errors) {
      throw new Error(response.data.message || "Failed to fetch songs.");
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

export const deleteMusic = async (id) => {
  try {
    const response = await axiosInstance.delete(`music/${id}`);
    console.log("API Response:", response.data);

    // Check for an error status in the response and throw an error if necessary
    if (response.data.errors) {
      console.error("Song deletion failed with errors:", response.data.errors);
      throw new Error(response.data.message || "Music deletion failed.");
    }

    return response.data;
  } catch (error) {
    console.error("Error in deleteMusic function:", error);

    if (error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
      console.error("Error response from API:", error.response.data);
      throw new Error(errorMessage); // This will trigger onError
    } else {
      throw error; // Rethrow if it's another kind of error
    }
  }
};
