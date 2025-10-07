import { publicAxios } from "../config";
import { ApiKey } from "../endpoint";

export const getStudentProfile = async (id) => {
  try {
    const response = await publicAxios.get(`${ApiKey.userDto}/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching student profile:", error);
    throw error.response?.data || "Failed to fetch student profile";
  }
};

/**
 * ✅ Update Student Profile
 */
export const updateStudentProfile = async (data) => {
  try {
    const response = await publicAxios.put(ApiKey.userDto, data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating student profile:", error);
    throw error.response?.data || "Failed to update student profile";
  }
};