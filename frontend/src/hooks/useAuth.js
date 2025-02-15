import { useEffect, useState } from "react";
import { checkAuth } from "../api/api.js"; // ✅ Ensure `api.js` exists in `frontend/src/api/`

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => { // ✅ Changed function name to avoid conflict
      try {
        const response = await checkAuth(); // ✅ Call imported `checkAuth()`
        setAuthenticated(response.authenticated);
      } catch (err) {
        console.log("Not authenticated", err);
        setAuthenticated(false);
      }
    };
    verifyAuth(); // ✅ Call the function
  }, []);

  return authenticated;
};

export default useAuth;
