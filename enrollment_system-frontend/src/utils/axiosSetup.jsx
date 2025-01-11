import axios from "axios";

const setupAxiosInterceptors = (navigate) => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      // Handle request errors globally
      console.error("Request error:", error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => response, // Forward successful responses
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          // Remove token and redirect on unauthorized access
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/", {
            state: { message: "Session expired. Please log in again." },
            replace: true,
          });
        }
      } else {
        // Handle network errors or unexpected issues
        console.error("Network error:", error);
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
