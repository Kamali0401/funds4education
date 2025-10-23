import { publicAxios } from "../config";
import { ApiKey } from "../endpoint";

export const fetchScholarshipListReq = async (UserId, role) => {
  try {
    if (!UserId || !role) {
      throw { error: true, data: [], message: "", errorMsg: "Invalid UserId or role" };
    }

    const url = `${ApiKey.Scholarship}?id=${UserId}&role=${role}`;
    const res = await publicAxios.get(url);

    const _data = Array.isArray(res.data) ? res.data : res.data?.data || [];

    return { error: false, data: _data, message: "", errorMsg: "" };
  } catch (err) {
    let errorMsg;
    if (err.response)
      errorMsg = err.response.data.detail || err.response.data.message || "Response error";
    else if (err.request) errorMsg = "Request error";
    else errorMsg = err.errorMsg || "Something went wrong, please try again later";

    throw { error: true, data: [], message: "", errorMsg };
  }
};