import { publicAxios } from "../config";
import { ApiKey } from "../endpoint";

//
// ✅ 1️⃣ Fetch scholarships by user ID + role
//
export const fetchScholarshipListReq = async (UserId, role) => {
  try {
    if (!UserId || !role) {
      return {
        error: true,
        data: [],
        message: "",
        errorMsg: "Invalid UserId or role",
      };
    }

    const url = `${ApiKey.Scholarship}?id=${UserId}&role=${role}`;
    const res = await publicAxios.get(url);

    const _data = Array.isArray(res.data)
      ? res.data
      : res.data?.data || [];

    return { error: false, data: _data, message: "", errorMsg: "" };
  } catch (err) {
    let errorMsg;
    if (err.response)
      errorMsg =
        err.response.data.detail ||
        err.response.data.message ||
        "Response error";
    else if (err.request) errorMsg = "Request error";
    else
      errorMsg =
        err.errorMsg || "Something went wrong, please try again later";

    return { error: true, data: [], message: "", errorMsg };
  }
};

//
// ✅ 2️⃣ Fetch scholarships by status ("live" / "upcoming")
//
export const fetchScholarshipByStatusReq = async (statusType) => {
  try {
    if (!statusType) {
      return {
        error: true,
        data: [],
        message: "",
        errorMsg: "Invalid statusType",
      };
    }

    const url = `${ApiKey.Scholarship}/status?statusType=${statusType}`;
    const res = await publicAxios.get(url);

    const _data = Array.isArray(res.data)
      ? res.data
      : res.data?.data || [];

    return { error: false, data: _data, message: "", errorMsg: "" };
  } catch (err) {
    let errorMsg;
    if (err.response)
      errorMsg =
        err.response.data.detail ||
        err.response.data.message ||
        "Response error";
    else if (err.request) errorMsg = "Request error";
    else
      errorMsg =
        err.errorMsg || "Something went wrong, please try again later";

    return { error: true, data: [], message: "", errorMsg };
  }
};

//
// ✅ 3️⃣ Fetch single scholarship by ID
//
export const fetchScholarshipByIdReq = async (id) => {
  try {
    if (!id) {
      return {
        error: true,
        data: [],
        message: "",
        errorMsg: "Invalid Scholarship ID",
      };
    }

    const url = `${ApiKey.Scholarship}/${id}`;
    const res = await publicAxios.get(url);

    const _data = res.data?.data || res.data || {};

    return { error: false, data: _data, message: "", errorMsg: "" };
  } catch (err) {
    let errorMsg;
    if (err.response)
      errorMsg =
        err.response.data.detail ||
        err.response.data.message ||
        "Response error";
    else if (err.request) errorMsg = "Request error";
    else
      errorMsg =
        err.errorMsg || "Something went wrong, please try again later";

    return { error: true, data: [], message: "", errorMsg };
  }
};

//
// ✅ 4️⃣ Fetch featured scholarships
//
export const fetchFeaturedScholarshipsReq = async () => {
  try {
    const url = `${ApiKey.Scholarship}/featured`;
    const res = await publicAxios.get(url);

    // ✅ Always ensure an array response
    const _data = Array.isArray(res.data)
      ? res.data
      : res.data?.data || [];

    return { error: false, data: _data, message: "", errorMsg: "" };
  } catch (err) {
    let errorMsg;
    if (err.response)
      errorMsg =
        err.response.data.detail ||
        err.response.data.message ||
        "Response error";
    else if (err.request) errorMsg = "Request error";
    else
      errorMsg =
        err.errorMsg || "Something went wrong, please try again later";

    return { error: true, data: [], message: "", errorMsg };
  }
};
