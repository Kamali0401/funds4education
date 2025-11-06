import { publicAxios } from "../config";
import { ApiKey } from "../endpoint";

//
// ✅ 1️⃣ Fetch scholarships by sponsor userId + role
//
export const fetchScholarshipBySponsorReq = async (userId, role) => {
  try {
    if (!userId || !role) {
      return {
        error: true,
        data: [],
        message: "",
        errorMsg: "Invalid userId or role",
      };
    }

    const url = `${ApiKey.SponsorScholarship}?id=${userId}&role=${role}`;
    const res = await publicAxios.get(url);

    const _data = Array.isArray(res.data)
      ? res.data
      : res.data?.data || [];

    return { error: false, data: _data, message: "", errorMsg: "" };
  } catch (err) {
    const errorMsg = err.response
      ? err.response.data.detail ||
        err.response.data.message ||
        "Response error"
      : err.request
      ? "Request error"
      : "Something went wrong, please try again later";

    return { error: true, data: [], message: "", errorMsg };
  }
};

//
// ✅ 2️⃣ Add new scholarship
//
export const addScholarshipReq = async (data) => {
  try {
    debugger;
    const res = await publicAxios.post(ApiKey.SponsorScholarship, data);
    return { error: false, data: res.data, message: "Added successfully" };
  } catch (err) {
    const errorMsg = err.response
      ? err.response.data.detail ||
        err.response.data.message ||
        "Response error"
      : err.request
      ? "Request error"
      : "Something went wrong, please try again later";

    return { error: true, data: [], message: "", errorMsg };
  }
};

//
// ✅ 3️⃣ Update scholarship
//
export const updateScholarshipReq = async (data) => {
  try {
    const res = await publicAxios.put(ApiKey.SponsorScholarship, data);
    return { error: false, data: res.data, message: "Updated successfully" };
  } catch (err) {
    const errorMsg = err.response
      ? err.response.data.detail ||
        err.response.data.message ||
        "Response error"
      : err.request
      ? "Request error"
      : "Something went wrong, please try again later";

    return { error: true, data: [], message: "", errorMsg };
  }
};

//
// ✅ 4️⃣ Delete scholarship
//
export const deleteScholarshipReq = async (id, modifiedBy) => {
  try {
    const url = `${ApiKey.SponsorScholarship}/${id}?modifiedBy=${modifiedBy}`;
    const res = await publicAxios.delete(url);
    return { error: false, data: res.data, message: "Deleted successfully" };
  } catch (err) {
    const errorMsg = err.response
      ? err.response.data.detail ||
        err.response.data.message ||
        "Response error"
      : err.request
      ? "Request error"
      : "Something went wrong, please try again later";

    return { error: true, data: [], message: "", errorMsg };
  }
};
export const fetchReligionsReq = async () => {
  try {
    const res = await publicAxios.get(ApiKey.FilterReligions);
    return { error: false, data: Array.isArray(res.data) ? res.data : [] };
  } catch (err) {
    return { error: true, data: [], errorMsg: err.response?.data?.message || "Error fetching religions" };
  }
};
export const fetchCountriesReq = async () => {
  try {
    const res = await publicAxios.get(ApiKey.FilterCountries);
    return { error: false, data: Array.isArray(res.data) ? res.data : [] };
  } catch (err) {
    return { error: true, data: [], errorMsg: err.response?.data?.message || "Error fetching countries" };
  }
};

//
// ✅ State
//
export const fetchStatesReq = async () => {
  try {
    const res = await publicAxios.get(ApiKey.FilterStates);
    return { error: false, data: Array.isArray(res.data) ? res.data : [] };
  } catch (err) {
    return { error: true, data: [], errorMsg: err.response?.data?.message || "Error fetching states" };
  }
};

//
// ✅ Gender
//
export const fetchGendersReq = async () => {
  try {
    const res = await publicAxios.get(ApiKey.FilterGenders);
    return { error: false, data: Array.isArray(res.data) ? res.data : [] };
  } catch (err) {
    return { error: true, data: [], errorMsg: err.response?.data?.message || "Error fetching genders" };
  }
};

//
// ✅ Class
//
export const fetchClassesReq = async () => {
  try {
    const res = await publicAxios.get(ApiKey.Class);
    return { error: false, data: Array.isArray(res.data) ? res.data : [] };
  } catch (err) {
    return { error: true, data: [], errorMsg: err.response?.data?.message || "Error fetching classes" };
  }
};

//
// ✅ Course by class
//
export const fetchCoursesByClassReq = async (className) => {
  try {
    const res = await publicAxios.get(`${ApiKey.CourseByClass}?classname=${className}`);
    return { error: false, data: Array.isArray(res.data) ? res.data : [] };
  } catch (err) {
    return { error: true, data: [], errorMsg: err.response?.data?.message || "Error fetching courses" };
  }
};