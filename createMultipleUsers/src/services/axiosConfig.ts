import axios from "axios";

let setNetworkErrorExternal: ((msg: string | null) => void) | null = null;

export function setNetworkErrorSetter(setter: (msg: string | null) => void) {
  setNetworkErrorExternal = setter;
}

axios.interceptors.response.use(
  (response) => {
    setNetworkErrorExternal?.(null); // clear lỗi
    return response;
  },
  (error) => {
    const msg = !error.response
      ? "No internet connection. Please check your network."
      : error.response?.data?.message || error.message || "API error";
    setNetworkErrorExternal?.(msg);
    return Promise.reject(error);
  }
);
