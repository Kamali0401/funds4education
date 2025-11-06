import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "../../../pages/styles.css";
import {

    fetchScholarshipBySponsor, addNewScholarship,
    updateScholarship,
    fetchReligions,
    fetchCountries,
    fetchStates,
    fetchGenders,
    fetchClasses,
    fetchCoursesByClass,

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
        className: "",
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
    const {
        religions,
        countries,
        states,
        genders,
        classes,
        courses,
    } = useSelector((state) => state.sponsorScholarship);
    const [filters, setFilters] = useState({
        religion: "",
        country: "",
        state: "",
        gender: "",
        className: "",
        course: "",
    });
    useEffect(() => {
        if (show) {
            if (scholarship) {
                setFormData({
                    ...initialData,
                    ...scholarship,
                    startDate: scholarship.startDate ? scholarship.startDate.split("T")[0] : "",
                    endDate: scholarship.endDate ? scholarship.endDate.split("T")[0] : "",
                    modifiedBy: localStorage.getItem("name"),
                    eligibility: scholarship.eligibility ?? "",
                    eligibilityCriteria: scholarship.eligibilityCriteria ?? "",
                    webportaltoApply: scholarship.webportaltoApply ?? "",
                    canApply: scholarship.canApply ?? "",
                    contactDetails: scholarship.contactDetails ?? "",
                });
            } else {
                setFormData({
                    ...initialData,
                    sponsorId: localStorage.getItem("userId"),
                    createdBy: localStorage.getItem("name"),
                });
                setErrors({});
                setSelectedFiles([]);
                setFilesList([]);
                setFileSelected(false);
                setNewFileSelected(false);
                if (fileInputRef.current) fileInputRef.current.value = null;
            }
        }
        dispatch(fetchReligions());
        dispatch(fetchCountries());
        dispatch(fetchStates());
        dispatch(fetchGenders());
        dispatch(fetchClasses());

    }, [scholarship, show, dispatch]);


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
    const handleFilterChange = (e) => {
        debugger;
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });

        if (name === "className") {
            dispatch(fetchCoursesByClass(value));
            setFilters((prev) => ({ ...prev, course: "" }));
        }
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

    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w- ./?%&=]*)?$/i;

    const validateForm = () => {
        const newErrors = {};

        // Required fields
        if (!formData.scholarshipCode?.trim())
            newErrors.scholarshipCode = "Scholarship Code is required.";
        if (!formData.scholarshipName?.trim())
            newErrors.scholarshipName = "Scholarship Name is required.";
        if (!formData.scholarshipType?.trim())
            newErrors.scholarshipType = "Scholarship Type is required.";
        if (!formData.startDate)
            newErrors.startDate = "Start Date is required.";
        if (!formData.endDate)
            newErrors.endDate = "End Date is required.";
        else if (formData.startDate && formData.endDate < formData.startDate)
            newErrors.endDate = "End Date must be after Start Date.";

        // Scholarship amount validation
        if (formData.benefits && !amountRegex.test(formData.benefits))
            newErrors.benefits = "Enter a valid amount (numbers only, up to 2 decimals).";

        // Percentage / CGPA validation
        if (formData.minPercentageOrCGPA && !decimalRegex.test(formData.minPercentageOrCGPA))
            newErrors.minPercentageOrCGPA = "Enter valid percentage or CGPA (e.g. 85 or 8.5).";

        // Family income validation
        if (formData.maxFamilyIncome && !amountRegex.test(formData.maxFamilyIncome))
            newErrors.maxFamilyIncome = "Enter valid family income.";

        // Scholarship limit
        if (formData.scholarshipLimit && isNaN(formData.scholarshipLimit))
            newErrors.scholarshipLimit = "Scholarship limit must be a number.";

        // Web Portal validation — must be a proper link
        if (!formData.webportaltoApply) {
            newErrors.webportaltoApply = "Web Portal to Apply is required.";
        } else {
            const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-]*)*\/?$/;
            if (!urlPattern.test(formData.webportaltoApply)) {
                newErrors.webportaltoApply = "Please enter a valid URL (e.g., https://example.com)";
            }
        }

        if (!formData.eligibility?.trim()) {
            newErrors.eligibility = "Eligibility is required.";
        }

        if (!formData.eligibilityCriteria?.trim()) {
            newErrors.eligibilityCriteria = "Eligibility Criteria is required.";
        }

        if (!formData.webportaltoApply?.trim()) {
            newErrors.webportaltoApply = "Web Portal link is required.";
        } else if (!urlRegex.test(formData.webportaltoApply.trim())) {
            newErrors.webportaltoApply = "Please enter a valid URL (e.g. https://example.com).";
        }


        // Optional text length validations
        if (formData.description && formData.description.length > 500)
            newErrors.description = "Description cannot exceed 500 characters.";
        if (formData.eligibility && formData.eligibility.length > 250)
            newErrors.eligibility = "Eligibility cannot exceed 250 characters.";
        if (formData.eligibilityCriteria && formData.eligibilityCriteria.length > 500)
            newErrors.eligibilityCriteria = "Eligibility Criteria cannot exceed 500 characters.";
        if (formData.renewalCriteria && formData.renewalCriteria.length > 300)
            newErrors.renewalCriteria = "Renewal Criteria cannot exceed 300 characters.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const payload = {
            ...formData,
            minPercentageOrCGPA: formData.minPercentageOrCGPA
                ? parseFloat(formData.minPercentageOrCGPA)
                : null,
            maxFamilyIncome: formData.maxFamilyIncome
                ? parseFloat(formData.maxFamilyIncome)
                : null,
            benefits: formData.benefits || null,
            documents: null,
            id: scholarship ? scholarship.id : 0,
        };

        try {
            let res;
            let scholarshipId;

            if (scholarship) {
                // ✅ Update existing scholarship
                await updateScholarship(payload, dispatch);
                scholarshipId = scholarship.id;
            } else {
                // ✅ Add new scholarship
                res = await addNewScholarship(payload, dispatch);
                scholarshipId = res?.id;
            }

            // ✅ Upload files if any
            if (scholarshipId && selectedFiles.length > 0) {
                await uploadFiles(scholarshipId);
            }

            // ✅ Refresh list
            const UserId = localStorage.getItem("userId");
            const role = localStorage.getItem("roleName");
            if (UserId && role) {
                dispatch(fetchScholarshipBySponsor(UserId, role));
            }

            // ✅ Success message
            await Swal.fire({
                text: scholarship
                    ? "Scholarship updated successfully!"
                    : "Scholarship added successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });

            handleCloseAndReset();
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
                                    <option value="Need Based">Neet-Based</option>
                                    <option value="Research Grant">Research Grant</option>
                                    <option value="Government">Government</option>
                                </select>

                                {errors.scholarshipType && <p className="error-text">{errors.scholarshipType}</p>}
                            </div>

                            <div className="form-group col-6">
                                <label>Scholarship Amount</label>
                                <input
                                    type="text"
                                    name="benefits"
                                    value={formData.benefits}
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
                                    className={errors.eligibility ? "input-error" : ""}

                                />
                                {errors.eligibility && <p className="error-text">{errors.eligibility}</p>}

                            </div>
                            <div className="form-group col-6">
                                <label>Eligibility Criteria</label>
                                <textarea
                                    name="eligibilityCriteria"
                                    value={formData.eligibilityCriteria}
                                    onChange={handleChange}
                                    className={errors.eligibilityCriteria ? "input-error" : ""}
                                />
                                {errors.eligibilityCriteria && (
                                    <p className="error-text">{errors.eligibilityCriteria}</p>
                                )}
                            </div>
                        </div>

                        {/* --- Filters Section --- */}
                        <div className="filters-section mb-4">
                            <div className="row">
                                <div className="form-group col-4">
                                    <label>Religion</label>
                                    <select name="religion" value={filters.religion} onChange={handleFilterChange}>
                                        <option value="">Select Religion</option>
                                        {religions.map((r) => <option key={r.id} value={r.religion_Name}>{r.religion_Name}</option>)}
                                    </select>
                                </div>
                                <div className="form-group col-4">
                                    <label>Country</label>
                                    <select name="country" value={filters.country} onChange={handleFilterChange}>
                                        <option value="">Select Country</option>
                                        {countries.map((c) => <option key={c.id} value={c.country_Name}>{c.country_Name}</option>)}
                                    </select>
                                </div>
                                <div className="form-group col-4">
                                    <label>State</label>
                                    <select name="state" value={filters.state} onChange={handleFilterChange}>
                                        <option value="">Select State</option>
                                        {states.map((s) => <option key={s.id} value={s.state_Name}>{s.state_Name}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="form-group col-4">
                                    <label>Gender</label>
                                    <select name="gender" value={filters.gender} onChange={handleFilterChange}>
                                        <option value="">Select Gender</option>
                                        {genders.map((g) => <option key={g.id} value={g.gender_Name}>{g.gender_Name}</option>)}
                                    </select>
                                </div>
                                <div className="form-group col-4">
                                    <label>Class</label>
                                    <select name="className" value={filters.className} onChange={handleFilterChange}>
                                        <option value="">Select Class</option>
                                        {classes.map((cls) => (
                                            <option key={cls.classId} value={cls.classId}>
                                                {cls.className}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group col-4">
                                    <label>Course</label>
                                    <select name="course" value={filters.course} onChange={handleFilterChange} disabled={!filters.className}>
                                        <option value="">Select Course</option>
                                        {courses.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                                    </select>
                                </div>
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
                                    <label>Can Apply</label>
                                    <textarea
                                        name="canApply"
                                        value={formData.canApply || ""}
                                        onChange={handleChange}
                                        placeholder="Who can apply for this scholarship?"
                                    />
                                </div>
                                <div className="form-group col-6">
                                    <label>Web Portal to Apply</label>
                                    <input
                                        type="text"
                                        name="webportaltoApply"
                                        value={formData.webportaltoApply}
                                        onChange={handleChange}
                                        placeholder="https://example.com"
                                    />
                                    {errors.webportaltoApply && <p className="error-text">{errors.webportaltoApply}</p>}
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
