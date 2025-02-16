import { useEffect, useState } from "react";
import { checkAuth } from "../api/api.js"; // ✅ Ensure `api.js` exists in `frontend/src/api/`

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => { // ✅ Changed function name to avoid conflict
      try {
        const response = await checkAuth(); // ✅ Call imported `checkAuth()`
        setAuthenticated(response.authenticated);
        console.log("🔍 Auth check response:", response); // ✅ Debug log
      } catch (err) {
        console.log("Not authenticated", err);
        setAuthenticated(false);
      }
    };
    verifyAuth(); // ✅ Call the function


    const interval = setInterval(verifyAuth, 5000); // Re-check every 5 sec
    return () => clearInterval(interval); // Cleanup
  }, []);

  return authenticated;
};

export default useAuth;
