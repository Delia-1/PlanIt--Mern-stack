import { logoutUser } from "../api/api"; // ✅ Correct Import

const Logout = () => {
  const handleLogout = async () => {
    try {
      await logoutUser(); // ✅ Calls the correct function
      window.location.reload(); // ✅ Reload to remove authentication state
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
