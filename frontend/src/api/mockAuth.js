export const mockAuth = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ isAuthenticated: false });
    }, 1000); // Simulate an API call delay
  });
};
