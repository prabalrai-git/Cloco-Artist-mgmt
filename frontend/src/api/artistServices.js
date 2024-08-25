import axiosInstance from "../utils/axiosInstance";

export const addArtist = async (data) => {
  try {
    const response = await axiosInstance.post("artist/", data);
    // Check for an error status in the response and throw an error if necessary
    if (response.data.errors) {
      throw new Error(response.data.message || "Artist creation failed.");
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

export const getArtistList = async () => {
  try {
    const response = await axiosInstance.get("artist/");
    // Check for an error status in the response and throw an error if necessary
    if (response.data.errors) {
      throw new Error(response.data.message || "Failed to fetch artists.");
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

export const deleteArtist = async (id) => {
  try {
    const response = await axiosInstance.delete(`artist/${id}`);
    console.log("API Response:", response.data);

    // Check for an error status in the response and throw an error if necessary
    if (response.data.errors) {
      console.error("User deletion failed with errors:", response.data.errors);
      throw new Error(response.data.message || "Artist deletion failed.");
    }

    return response.data;
  } catch (error) {
    console.error("Error in deleteArtist function:", error);

    if (error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
      console.error("Error response from API:", error.response.data);
      throw new Error(errorMessage); // This will trigger onError
    } else {
      throw error; // Rethrow if it's another kind of error
    }
  }
};
