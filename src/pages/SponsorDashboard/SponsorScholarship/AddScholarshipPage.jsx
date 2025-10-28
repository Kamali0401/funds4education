import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import "../../../pages/styles.css";
import {
    addNewScholarship,
    updateScholarship,
    fetchScholarshipList,
} from "../../../app/redux/slices/sponsorscholarshipSlice";
import { uploadFormFilesReq } from "../../../api/scholarshipapplication/scholarshipapplication"
import { publicAxios } from "../../../api/config";
import { ApiKey } from "../../../api/endpoint";
// Regex validations
const text150 = /^[A-Za-z0-9\s.,'-]{0,150}$/;
const text250 = /^[A-Za-z0-9\s.,'-]{0,250}$/;
const text500 = /^[A-Za-z0-9\s.,'-]{0,500}$/;
const decimalRegex = /^\d{0,3}(\.\d{1,2})?$/;
const amountRegex = /^\d{0,10}(\.\d{1,2})?$/;

const AddScholarshipModal = ({ show, handleClose, scholarship }) => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const today = new Date().toISOString().split("T")[0];
    const role = localStorage.getItem("roleName");
    const UserId = localStorage.getItem("userId");
    const initialData = {
        scholarshipCode: "",
        scholarshipName: "",
        scholarshipType: "",
        description: "",
        eligibility: "",
        eligibilityCriteria: "",
        applicableCourses: "",
        applicableDepartments: "",
        minPercentageOrCGPA: "",
        maxFamilyIncome: "",
        scholarshipAmount: "",
        isRenewable: false,
        renewalCriteria: "",
        startDate: "",
        endDate: "",
        status: "Active",
        sponsorId: 0,
        createdBy: "",
        scholarshipLimit: 0,
        modifiedBy: "",
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [selectedFiles, setSelectedFiles] = useState([]);
    //const [filesList, setFilesList] = useState([]);
    // --- State ---
    const [filesList, setFilesList] = useState(formData?.files || []);
    const [fileSelected, setFileSelected] = useState(false);
    const [newFileSelected, setNewFileSelected] = useState(false);
    // ✅ Regex rules
    const text50 = /^[A-Za-z0-9\s]{0,50}$/; // letters, numbers, spaces only, max 50
    const text150 = /^[A-Za-z0-9\s]{0,150}$/;
    const text250 = /^[A-Za-z0-9\s]{0,250}$/;
    const text300 = /^[A-Za-z0-9\s]{0,300}$/;
    const text500 = /^[A-Za-z0-9\s.,-]{0,500}$/; // allows . , - only
    //const decimalRegex = /^\d{0,2}(\.\d{0,2})?$/; // CGPA/Percentage with decimals
    const number5Regex = /^\d{0,5}$/;
    //const amountRegex = /^\d{0,6}$/; // up to 6 digits (no decimals, only numbers)
    // ✅ Allow up to 10 digits total, optional 2 decimals, and optional % sign
    //const decimalRegex = /^(?:\d{1,8}(?:\.\d{1,2})?|\d{1,2}(?:\.\d{1,2})?%)$/;
    const decimalRegex = /^\d{0,6}(\.\d{0,2})?%?$/;
    // ✅ Allow up to 10 digits with optional decimal up to 2 places (e.g., 25000.70)
    const amountRegex = /^\d{0,10}(\.\d{0,2})?$/;

    useEffect(() => {
        if (scholarship) {
            setFormData({
                ...initialData,
                ...scholarship,
                startDate: scholarship.startDate ? scholarship.startDate.split("T")[0] : "",
                endDate: scholarship.endDate ? scholarship.endDate.split("T")[0] : "",
                modifiedBy: localStorage.getItem("name"),
            });
        } else {
            setFormData({
                ...initialData,
                sponsorId: localStorage.getItem("userId"),
                createdBy: localStorage.getItem("name"),
            });
        }
    }, [scholarship, show]);
    // --- Clear function ---
    const handleClear = () => {
        // Clear newly selected files
        setSelectedFiles([]);
        setFilesList([]);
        setFileSelected(false);
        setNewFileSelected(false);

        // Clear the file input element
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }

        // Reset documents field in formData
        setFormData({ ...formData, documents: null });
    };

    // --- File change handler ---
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (!files || files.length === 0) return;

        // No file type restriction
        setSelectedFiles(files);
        setFilesList(files.map(f => f.name));
        setFileSelected(true);
        setNewFileSelected(true);
        setFormData({ ...formData, documents: files });
    };
    // Upload files function returns uploaded file names
    const uploadFiles = async (applicationId) => {
        if (selectedFiles.length < 1) return [];

        const formDataPayload = new FormData();
        selectedFiles.forEach((file) => formDataPayload.append("FormFiles", file));
        formDataPayload.append("TypeofUser", "Scholarship");
        formDataPayload.append("id", applicationId);

        try {
            await uploadFormFilesReq(formDataPayload);

            // Return names of uploaded files for merging
            return selectedFiles.map(f => f.name);
        } catch (ex) {
            console.error("File upload failed:", ex);
            return [];
        }
    };
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let regex = null;

        switch (name) {
            case "scholarshipCode":
                regex = text50; // max 50, no special chars
                break;
            case "scholarshipName":
            case "scholarshipType":
                regex = text50; // letters/numbers/spaces only, max 50
                break;
            case "description":
            case "eligibilityCriteria":
                regex = text500; // allows ., - , and space
                break;
            case "applicableCourses":
            case "applicableDepartments":
                regex = text250;
                break;
            case "renewalCriteria":
                regex = text300; // max length 300, no special chars
                break;
            case "minPercentageOrCGPA":
                regex = decimalRegex; // decimals allowed
                break;
            case "maxFamilyIncome":
            case "scholarshipAmount":
                regex = amountRegex; // numeric only, max length 6
                break;
            case "scholarshipLimit":
                regex = number5Regex;
                break;
            default:
                regex = null;
        }

        if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else if (!regex || regex.test(value)) {
            setFormData({ ...formData, [name]: value });
        }

        setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.scholarshipCode) newErrors.scholarshipCode = "Scholarship Code is required.";
        if (!formData.scholarshipName) newErrors.scholarshipName = "Scholarship Name is required.";
        if (!formData.scholarshipType) newErrors.scholarshipType = "Scholarship Type is required.";
        if (!formData.startDate) newErrors.startDate = "Start Date is required.";
        if (!formData.endDate) newErrors.endDate = "End Date is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        debugger;
        e.preventDefault();
        if (!validateForm()) return;

        const payload = {
            ...formData,
            minPercentageOrCGPA: formData.minPercentageOrCGPA
                ? parseFloat(formData.minPercentageOrCGPA)
                : null,
            maxFamilyIncome: formData.maxFamilyIncome ? parseFloat(formData.maxFamilyIncome) : null,
            scholarshipAmount: formData.scholarshipAmount ? parseFloat(formData.scholarshipAmount) : null,
            documents: null,
        };

        let scholarshipId = null;

        try {
            // --- Create or Update Scholarship ---
            if (scholarship) {
                debugger;
                scholarshipId = scholarship.id;
                await updateScholarship(payload, dispatch);
            } else {
                const res = await addNewScholarship(payload, dispatch);
                scholarshipId = res?.id;
            }

            /*  await dispatch(fetchScholarshipList(UserId,role));
              handleCloseAndReset();
            } catch (err) {
              console.error("Error saving scholarship:", err);
              Swal.fire({ text: "Error saving scholarship!", icon: "error" });
            }
          };*/
            // --- Upload Files if Any ---
            if (scholarshipId && selectedFiles?.length > 0) {
                await uploadFiles(scholarshipId); // <-- implement uploadFiles() similar to your first example
            }

            // --- Fetch Updated Scholarship Details ---
            /*if (scholarshipId) {
              const updatedScholarship = await fetchScholarshipByIdReq(scholarshipId);
              setFormData((prev) => ({
                ...prev,
                ...updatedScholarship.data,
                startDate: updatedScholarship.data.startDate
                  ? updatedScholarship.data.startDate.split("T")[0]
                  : "",
                endDate: updatedScholarship.data.endDate
                  ? updatedScholarship.data.endDate.split("T")[0]
                  : "",
              }));
            }*/

            // --- Reset Files & Refresh List ---
            setSelectedFiles([]);
            await dispatch(fetchScholarshipList(UserId, role));

            // --- Success Message ---
            const result = await Swal.fire({
                text: scholarship ? "Scholarship updated successfully!" : "Scholarship added successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });

            if (result.isConfirmed) handleCloseAndReset();
        } catch (err) {
            console.error("Error saving scholarship:", err);
            Swal.fire({ text: "Error saving scholarship!", icon: "error" });
        }
    };

    const handleCloseAndReset = () => {
        setFormData(initialData);
        setErrors({});
        handleClose();
    };
    const downloadFileFun = async (id) => {
        try {
            //const res = await AsyncGetFiles(API.downloadScholarshipFiles + "?id=" + id);
            //const res= await 
            const res = await publicAxios.get(
                `${ApiKey.downloadsponsorscholarshipFiles}/${id}`,
                { responseType: "blob" }   // <-- important for file download
            );


            const url = window.URL.createObjectURL(
                new Blob([res.data], { type: "application/zip" })
            );

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "documents.zip"); // you can rename as needed
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (err) {
            console.error("File download failed:", err);
        }
    };

    if (!show) return null;

    const Required = () => <span style={{ color: "red" }}> *</span>;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>{scholarship ? "Edit Scholarship" : "Add Scholarship"}</h3>
                    <button className="close-btn" onClick={handleCloseAndReset}>×</button>
                </div>

                <div className="modal-body">
                    <form>
                        <div className="row">
                            <div className="form-group col-6">
                                <label>Scholarship Code<Required /></label>
                                <input
                                    type="text"
                                    name="scholarshipCode"
                                    value={formData.scholarshipCode}
                                    onChange={handleChange}
                                    placeholder="SCH-001"
                                    className={errors.scholarshipCode ? "input-error" : ""}
                                />
                                {errors.scholarshipCode && <p className="error-text">{errors.scholarshipCode}</p>}
                            </div>

                            <div className="form-group col-6">
                                <label>Scholarship Name<Required /></label>
                                <input
                                    type="text"
                                    name="scholarshipName"
                                    value={formData.scholarshipName}
                                    onChange={handleChange}
                                    placeholder="Merit Scholarship"
                                    className={errors.scholarshipName ? "input-error" : ""}
                                />
                                {errors.scholarshipName && <p className="error-text">{errors.scholarshipName}</p>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-6">
                                <label>Scholarship Type<Required /></label>
                                <select
                                    name="scholarshipType"
                                    value={formData.scholarshipType || ""}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Type</option>
                                    <option value="Merit Based">Merit-Based</option>
                                    <option value="Need Based">Need-Based</option>
                                    <option value="Research Grant">Research Grant</option>
                                    <option value="Government">Government</option>
                                </select>
                                {errors.scholarshipType && <p className="error-text">{errors.scholarshipType}</p>}
                            </div>

                            <div className="form-group col-6">
                                <label>Benefits</label>
                                <input
                                    type="text"
                                    name="scholarshipAmount"
                                    value={formData.scholarshipAmount}
                                    onChange={handleChange}
                                    placeholder="10000"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-6">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Scholarship details..."
                                />
                            </div>
                            <div className="form-group col-6">
                                <label>Eligibility</label>
                                <input
                                    type="text"
                                    name="eligibility"
                                    value={formData.eligibility || ""}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="form-group col-6">
                                <label>Eligibility Criteria</label>
                                <textarea
                                    name="eligibilityCriteria"
                                    value={formData.eligibilityCriteria}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-6">
                                <label>Applicable Courses</label>
                                {/* <input
                  type="text"
                  name="applicableCourses"
                  value={formData.applicableCourses}
                  onChange={handleChange}
                />
                */}
                                <select
                                    name="applicableCourses"
                                    value={formData.applicableCourses}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Course</option>
                                    <option value="BE">B.E</option>
                                    <option value="BTech">B.Tech</option>
                                    <option value="BSc">B.Sc</option>
                                    <option value="MSc">M.Sc</option>
                                    <option value="BCom">B.Com</option>
                                    <option value="MCom">M.Com</option>
                                    <option value="BBA">BBA</option>
                                    <option value="MBA">MBA</option>
                                    <option value="BA">B.A</option>
                                    <option value="MA">M.A</option>
                                    <option value="BCA">BCA</option>
                                    <option value="MCA">MCA</option>
                                    <option value="BEd">B.Ed</option>
                                    <option value="MEd">M.Ed</option>
                                    <option value="BArch">B.Arch</option>
                                    <option value="BDes">B.Des</option>
                                    <option value="MDes">M.Des</option>
                                    <option value="LLB">LLB</option>
                                    <option value="LLM">LLM</option>
                                    <option value="MBBS">MBBS</option>
                                    <option value="BDS">BDS</option>
                                    <option value="BPT">BPT</option>
                                    <option value="BPharm">B.Pharm</option>
                                    <option value="MPharm">M.Pharm</option>
                                    <option value="BScNursing">B.Sc Nursing</option>
                                    <option value="MScNursing">M.Sc Nursing</option>
                                    <option value="BScAgriculture">B.Sc Agriculture</option>
                                    <option value="MScAgriculture">M.Sc Agriculture</option>
                                </select>


                            </div>
                            <div className="form-group col-6">
                                <label>Applicable Departments</label>
                                {/*<input
                  type="text"
                  name="applicableDepartments"
                  value={formData.applicableDepartments}
                  onChange={handleChange}
                />*/}
                                <select
                                    name="applicableDepartments"
                                    value={formData.applicableDepartments}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Department</option>

                                    {/* Engineering Departments */}
                                    <option value="CSE">CSE - Computer Science & Engineering</option>
                                    <option value="IT">IT - Information Technology</option>
                                    <option value="ECE">ECE - Electronics & Communication Engineering</option>
                                    <option value="EEE">EEE - Electrical & Electronics Engineering</option>
                                    <option value="Mechanical">Mechanical Engineering</option>
                                    <option value="Civil">Civil Engineering</option>
                                    <option value="AI & ML">AI & ML - Artificial Intelligence & Machine Learning</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="Biotechnology">Biotechnology</option>
                                    <option value="Chemical">Chemical Engineering</option>

                                    {/* Science Departments */}
                                    <option value="Physics">Physics</option>
                                    <option value="Chemistry">Chemistry</option>
                                    <option value="Mathematics">Mathematics</option>
                                    <option value="Zoology">Zoology</option>
                                    <option value="Botany">Botany</option>
                                    <option value="Environmental Science">Environmental Science</option>
                                    <option value="Computer Science">Computer Science</option>

                                    {/* Commerce & Management */}
                                    <option value="Commerce">Commerce</option>
                                    <option value="Management">Management</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Human Resource">Human Resource</option>

                                    {/* Arts & Humanities */}
                                    <option value="English">English</option>
                                    <option value="Economics">Economics</option>
                                    <option value="History">History</option>
                                    <option value="Sociology">Sociology</option>
                                    <option value="Political Science">Political Science</option>
                                    <option value="Psychology">Psychology</option>
                                    <option value="Fine Arts">Fine Arts</option>
                                    <option value="Journalism">Journalism</option>

                                    {/* Design & Architecture */}
                                    <option value="Fashion Design">Fashion Design</option>
                                    <option value="Graphic Design">Graphic Design</option>
                                    <option value="Interior Design">Interior Design</option>
                                    <option value="Industrial Design">Industrial Design</option>
                                    <option value="UX/UI Design">UX/UI Design</option>

                                    {/* Agriculture & Allied */}
                                    <option value="Agriculture">Agriculture</option>
                                    <option value="Forestry">Forestry</option>
                                    <option value="Horticulture">Horticulture</option>
                                    <option value="Dairy Science">Dairy Science</option>
                                    <option value="Fisheries">Fisheries</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-4">
                                <label>Min % / CGPA</label>
                                <input
                                    type="text"
                                    name="minPercentageOrCGPA"
                                    value={formData.minPercentageOrCGPA}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group col-4">
                                <label>Max Family Income</label>
                                <input
                                    type="text"
                                    name="maxFamilyIncome"
                                    value={formData.maxFamilyIncome}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className=" col-4 renewable-field">
                                <label>Renewable</label>
                                <input
                                    type="checkbox"
                                    name="isRenewable"
                                    checked={formData.isRenewable}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {formData.isRenewable && (
                            <div className="row">
                                <div className="form-group">
                                    <label>Renewal Criteria</label>
                                    <input
                                        type="text"
                                        name="renewalCriteria"
                                        value={formData.renewalCriteria}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="row">
                            <div className="form-group col-6">
                                <label>Start Date<Required /></label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                />
                                {errors.startDate && <p className="error-text">{errors.startDate}</p>}
                            </div>

                            <div className="form-group col-6">
                                <label>End Date<Required /></label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    min={formData.startDate || ""}
                                    onChange={handleChange}
                                />
                                {errors.endDate && <p className="error-text">{errors.endDate}</p>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group">
                                <label>Status</label>
                                <select name="status" value={formData.status} onChange={handleChange}>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Scholarship Limit</label>
                                <input
                                    type="text"
                                    name="scholarshipLimit"
                                    value={formData.scholarshipLimit}
                                    onChange={handleChange}
                                    placeholder="e.g. 10000"
                                    maxLength={5} // Prevent more than 5 characters
                                    inputMode="numeric" // Brings up numeric keypad on mobile
                                />

                            </div>
                            <div className="row">
                                <div className="form-group col-6">
                                    <label>Eligibility</label>
                                    <input
                                        type="text"
                                        name="eligibility"
                                        value={formData.eligibility || ""}
                                        onChange={handleChange}
                                        placeholder="Enter eligibility details"
                                    />
                                </div>

                                <div className="form-group col-6">
                                    <label>Web Portal to Apply</label>
                                    <input
                                        type="text"
                                        name="webportaltoApply"
                                        value={formData.webportaltoApply || ""}
                                        onChange={handleChange}
                                        placeholder="Enter application website link"
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-6">
                                    <label>Can Apply</label>
                                    <textarea
                                        name="canApply"
                                        value={formData.canApply || ""}
                                        onChange={handleChange}
                                        placeholder="Who can apply for this scholarship?"
                                    />
                                </div>

                                <div className="form-group col-6">
                                    <label>Contact Details</label>
                                    <textarea
                                        name="contactDetails"
                                        value={formData.contactDetails || ""}
                                        onChange={handleChange}
                                        placeholder="Email / Phone / Address"
                                    />
                                </div>
                            </div>

                            <div className="form-group col-4">
                                <label>Upload Documents</label>
                                <input
                                    type="file"
                                    name="documents"
                                    onChange={handleFileChange}
                                    multiple
                                    ref={fileInputRef}
                                />

                                {fileSelected && filesList.length > 0 && (
                                    <button
                                        type="button"
                                        className="btn-danger mt-2"
                                        onClick={handleClear}
                                        style={{ marginTop: "5px" }}
                                    >
                                        Clear
                                    </button>
                                )}

                                {/* Display all files: backend + newly selected */}
                                {(formData?.files?.length > 0 || filesList.length > 0) && (
                                    <div className="d-flex flex-column mt-4 rounded" style={{ marginTop: "5px" }}>
                                        {/* Existing backend files */}
                                        {formData?.files?.map((fileName, index) => (
                                            <div
                                                key={`backend-${index}`}
                                                className="d-flex align-items-center justify-content-between border rounded p-2 mb-1"
                                            >
                                                <span style={{ marginBottom: "5px", padding: "5px" }}>{fileName || "No File Name"}</span>
                                            </div>
                                        ))}



                                        {/* Download button for backend files */}
                                        {formData?.files?.length > 0 && (
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-primary mt-2"
                                                onClick={() => downloadFileFun(formData.id)}
                                                style={{ marginTop: "5px" }}
                                            >
                                                Download
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                <div className="modal-actions">
                    <button className="sign-action-btn1 danger" onClick={handleCloseAndReset}>Cancel</button>
                    <button className="sign-action-btn1" onClick={handleSubmit}>
                        {scholarship ? "Update" : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddScholarshipModal;
