import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addNewScholarshipApplication,
  updateScholarshipApplication,
} from "../../../app/redux/slices/scholarshipApplicationSlice";
import "../../../pages/styles.css";
import {uploadFormFilesReq} from "../../../api/scholarshipapplication/scholarshipapplication"
// --- Regex validations ---
const nameRegex = /^[A-Za-z\s]{0,150}$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.(com|com\.au|edu)$/;
const phoneRegex = /^[0-9]{0,10}$/;
const courseRegex = /^[A-Za-z\s]{0,150}$/;
const collegeRegex = /^[A-Za-z\s]{0,250}$/;
const yearRegex = /^[0-9\-]{0,10}$/;
const gpaRegex = /^\d{0,3}(\.\d{1,2})?$/;
const scholarshipRegex = /^[A-Za-z0-9\s]{0,250}$/;
const text250Regex = /^[A-Za-z\s]{0,250}$/;

const scholarshipOptions = [
  { id: 1, name: "National Merit Scholarship" },
  { id: 2, name: "Need-Based Education Grant" },
  { id: 3, name: "STEM Excellence Fellowship" },
  { id: 4, name: "Research Innovation Award" },
];

const AddApplicationModal = ({ show, handleClose, application }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
const [filesList, setFilesList] = useState([]);
  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0];
  const minDOB = new Date(new Date().setFullYear(new Date().getFullYear() - 79))
    .toISOString()
    .split("T")[0];

  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    studyLevel: "",
    schoolName: "",
    courseOrMajor: "",
    yearOfStudy: "",
    gpaOrMarks: "",
    scholarshipId: "",
    category: "",
    applicationDate: today,
    documents: null,
    extraCurricularActivities: "",
    awardsAchievements: "",
    notesComments: "",
    status: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  // Populate form if editing
  useEffect(() => {
    if (application) {
      setFormData({
        ...initialFormData,
        ...application,
        dateOfBirth: application.dateOfBirth ? application.dateOfBirth.split("T")[0] : "",
        applicationDate: application.applicationDate ? application.applicationDate.split("T")[0] : today,
        scholarshipId: application.scholarshipId ? parseInt(application.scholarshipId) : "",
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [application, show]);

 /* const handleChange = (e) => {
    const { name, value, files } = e.target;
    let regex = null;

    switch (name) {
      case "firstName":
      case "lastName":
        regex = nameRegex;
        break;
      case "phoneNumber":
        regex = phoneRegex;
        break;
      case "courseOrMajor":
        regex = courseRegex;
        break;
      case "schoolName":
        regex = collegeRegex;
        break;
      case "yearOfStudy":
        regex = yearRegex;
        break;
      case "gpaOrMarks":
        regex = gpaRegex;
        break;
      case "scholarshipId":
        regex = scholarshipRegex;
        break;
      case "extraCurricularActivities":
      case "awardsAchievements":
      case "notesComments":
        regex = text250Regex;
        break;
      default:
        regex = null;
    }

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      if (!regex || regex.test(value)) {
        setFormData({ ...formData, [name]: name === "scholarshipId" ? parseInt(value) : value });
      }
    }
    setErrors({ ...errors, [name]: "" });
  };*/
  const handleChange = (e) => {
  const { name, value, files } = e.target;
  let regex = null;

  switch (name) {
    case "firstName":
    case "lastName":
      regex = nameRegex;
      break;
    case "phoneNumber":
      regex = phoneRegex;
      break;
    case "courseOrMajor":
      regex = courseRegex;
      break;
    case "schoolName":
      regex = collegeRegex;
      break;
    case "yearOfStudy":
      regex = yearRegex;
      break;
    case "gpaOrMarks":
      regex = gpaRegex;
      break;
    case "scholarshipId":
      regex = scholarshipRegex;
      break;
    case "extraCurricularActivities":
    case "awardsAchievements":
    case "notesComments":
      regex = text250Regex;
      break;
    default:
      regex = null;
  }

  if (files) {
    const fileArray = Array.from(files);
    setSelectedFiles(fileArray);
    setFilesList(fileArray.map((f) => f.name));
  } else {
    if (!regex || regex.test(value)) {
      setFormData({
        ...formData,
        [name]: name === "scholarshipId" ? parseInt(value) : value,
      });
    }
  }
  setErrors({ ...errors, [name]: "" });
};
const uploadFiles = async (applicationId) => {
  if (selectedFiles.length < 1) return;

  const formData = new FormData();
  selectedFiles.forEach((file) => {
    formData.append("FormFiles", file);
  });
  formData.append("TypeofUser", "SchAppForm");
  formData.append("id", applicationId);

  try {
   // await AsyncPost(API.uploadScholarshipFiles, formData); // replace with your API
     const res = await uploadFormFilesReq(formData);
  } catch (ex) {
    console.error("File upload failed:", ex);
  }
};

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName || !nameRegex.test(formData.firstName))
      newErrors.firstName = "First Name is required (letters only, max 150).";
    if (formData.lastName && !nameRegex.test(formData.lastName))
      newErrors.lastName = "Last Name must be letters only (max 150).";
    if (!formData.email || !emailRegex.test(formData.email))
      newErrors.email = "Valid email required (abc@xyz.com).";
    if (formData.phoneNumber && !/^[0-9]{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Phone must be exactly 10 digits.";
    if (formData.dateOfBirth && !(new Date(formData.dateOfBirth) <= new Date()))
      newErrors.dateOfBirth = `DOB must be valid and in the past.`;
    if (!formData.studyLevel) newErrors.studyLevel = "Study Level is required.";
    if (!formData.scholarshipId) newErrors.scholarshipId = "Scholarship Name required.";
    if (!formData.category) newErrors.category = "Category required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /*const handleSubmit = (e, statusType) => {
    e.preventDefault();
    if (!validateForm()) return;

    const finalData = { ...formData, status: statusType };

    if (application) {
      updateScholarshipApplication(finalData, dispatch);
    } else {
      addNewScholarshipApplication(finalData, dispatch);
    }

    handleCloseAndReset();
  };*/
  const handleSubmit = async (e, statusType) => {
  e.preventDefault();
  if (!validateForm()) return;

  const finalData = { ...formData, status: statusType };

  let applicationId = null;

  if (application) {
    applicationId = application.id;
    await updateScholarshipApplication(finalData, dispatch);
  } else {
    const res = await addNewScholarshipApplication(finalData, dispatch);
    applicationId = res?.id; // assuming API returns new application id
  }

  // Upload files
  if (applicationId) await uploadFiles(applicationId);

  handleCloseAndReset();
};

  const handleCloseAndReset = () => {
    setFormData(initialFormData);
    setErrors({});
    handleClose();
  };

  if (!show) return null; // Do not render if modal hidden

  const Required = () => <span style={{ color: "red" }}> *</span>;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <h3>{application ? "Edit Application" : "New Application"}</h3>
          <button className="close-btn" onClick={handleCloseAndReset}>×</button>
        </div>

        {/* Body */}
       <div className="modal-body">
  <form>
    <h4>Personal Information</h4>

    <div className="row">
      <div className="form-group col-6">
        <label>First Name <Required /></label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={errors.firstName ? "input-error" : ""}
          placeholder="First Name"
        />
        {errors.firstName && <p className="error-text">{errors.firstName}</p>}
      </div>

      <div className="form-group col-6">
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={errors.lastName ? "input-error" : ""}
          placeholder="Last Name"
        />
        {errors.lastName && <p className="error-text">{errors.lastName}</p>}
      </div>
    </div>

    <div className="row">
      <div className="form-group col-6">
        <label>Email <Required /></label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "input-error" : ""}
          placeholder="Email"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      <div className="form-group col-6">
        <label>Phone</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className={errors.phoneNumber ? "input-error" : ""}
          placeholder="Phone"
        />
        {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}
      </div>
    </div>

    <div className="row">
      <div className="form-group col-6">
        <label>Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          min={minDOB}
          max={today}
          onChange={handleChange}
        />
      </div>

      <div className="form-group col-6">
        <label>Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>

    <h4 className="mt-3">Academic Information</h4>

    <div className="row">
      <div className="form-group col-6">
        <label>Study Level <Required /></label>
        <select
          name="studyLevel"
          value={formData.studyLevel}
          onChange={handleChange}
        >
          <option value="">Select Study Level</option>
          <option value="UG">Undergraduate</option>
          <option value="PG">Postgraduate</option>
          <option value="PhD">Ph.D.</option>
        </select>
        {errors.studyLevel && <p className="error-text">{errors.studyLevel}</p>}
      </div>

      <div className="form-group col-6">
        <label>College</label>
        <input
          type="text"
          name="schoolName"
          value={formData.schoolName}
          onChange={handleChange}
        />
      </div>
    </div>

    <div className="row">
      <div className="form-group col-6">
        <label>Course / Major</label>
        <input
          type="text"
          name="courseOrMajor"
          value={formData.courseOrMajor}
          onChange={handleChange}
        />
      </div>

      <div className="form-group col-6">
        <label>Year of Study</label>
        <input
          type="text"
          name="yearOfStudy"
          value={formData.yearOfStudy}
          onChange={handleChange}
        />
      </div>
    </div>

    <div className="row">
      <div className="form-group col-6">
        <label>Marks / GPA</label>
        <input
          type="text"
          name="gpaOrMarks"
          value={formData.gpaOrMarks}
          onChange={handleChange}
        />
      </div>

      <div className="form-group col-6">
        <label>Scholarship Name <Required /></label>
        <select
          name="scholarshipId"
          value={formData.scholarshipId}
          onChange={handleChange}
        >
          <option value="">Select Scholarship</option>
          {scholarshipOptions.map((sch) => (
            <option key={sch.id} value={sch.id}>{sch.name}</option>
          ))}
        </select>
      </div>
    </div>

    <div className="row">
      <div className="form-group col-6">
        <label>Category <Required /></label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="Merit-Based">Merit-Based</option>
          <option value="Need-Based">Need-Based</option>
          <option value="Research Grant">Research Grant</option>
          <option value="Tech Fellowship">Tech Fellowship</option>
        </select>
      </div>

      <div className="form-group col-6">
        <label>Application Date <Required /></label>
        <input
          type="date"
          name="applicationDate"
          value={formData.applicationDate}
          min={today}
          max={today}
          onChange={handleChange}
        />
      </div>
    </div>

   <div className="row">
  <div className="form-group col-12">
    <label>Upload Documents</label>
    <input
      type="file"
      name="documents"
      onChange={handleChange}
      multiple
    />

    {filesList && filesList.length > 0 && (
      <div className="mt-2">
        {filesList.map((fileName, index) => (
          <div
            key={index}
            className="d-flex align-items-center mt-1 border rounded p-2"
          >
            <div className="flex-grow-1">
              <h6 className="mb-0">{fileName}</h6>
            
            <button
              type="button"
              className="btn btn-sm btn-primary ms-2"
             // onClick={() => downloadFileFun(fileName)}
            >
              Download
            </button>
          </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>


    <h4 className="mt-3">Additional Information</h4>
    <div className="row">
      <div className="form-group col-12">
        <label>Extra-Curricular</label>
        <textarea name="extraCurricularActivities" value={formData.extraCurricularActivities} onChange={handleChange}></textarea>
      </div>
      <div className="form-group col-12">
        <label>Awards / Achievements</label>
        <textarea name="awardsAchievements" value={formData.awardsAchievements} onChange={handleChange}></textarea>
      </div>
      <div className="form-group col-12">
        <label>Notes / Comments</label>
        <textarea name="notesComments" value={formData.notesComments} onChange={handleChange}></textarea>
      </div>
    </div>
  </form>
</div>


        {/* Footer Actions */}
        <div className="modal-actions">
          <button className="sign-action-btn1 danger" onClick={handleCloseAndReset} >Cancel</button>
          <button className="sign-action-btn1" onClick={(e) => handleSubmit(e, "Draft")}>Save Draft</button>
          <button className="sign-action-btn1" onClick={(e) => handleSubmit(e, "Submitted")}>
            {application ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddApplicationModal;
