import { publicAxios } from "../config";
import { ApiKey } from "../endpoint";

// ✅ Get all scholarships
export const fetchScholarshipListReq = async (userId, role) => {
  try {
    // 🔹 Fallback: get from localStorage if not passed in
    const id = userId || localStorage.getItem("userId");
    let userRole = role || localStorage.getItem("role");

    // 🔹 If not found, default to "student"
    if (!userRole) {
      userRole = "student";
    }

    // 🔹 Convert numeric roles to proper string for backend
    if (!isNaN(userRole)) {
      switch (Number(userRole)) {
        case 1:
          userRole = "student";
          break;
        case 2:
          userRole = "sponsor";
          break;
        default:
          userRole = "student"; // fallback
      }
    }

    if (!id) {
      throw new Error("Missing userId. Cannot fetch scholarships.");
    }

    // ✅ Log for debugging (optional)
    console.log(
      `📤 Fetching scholarships for id=${id}, role=${userRole}`
    );

    const response = await publicAxios.get(
      `${ApiKey.Scholarship}?id=${id}&role=${userRole}`
    );

    return response;
  } catch (error) {
    console.error("❌ Error fetching scholarship list:", error);
    throw error.response?.data || new Error("Failed to fetch scholarships");
  }
};