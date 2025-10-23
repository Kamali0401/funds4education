import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchScholarshipList } from "../../app/redux/slices/ScholarshipSlice.js";
import SectionCard from "../../app/components/SectionCard.jsx";

const ScholarshipViewPage = ({ id }) => {
    const dispatch = useDispatch();
    const { data: scholarship, loading } = useSelector((state) => state.scholarship);

    useEffect(() => {
        dispatch(fetchScholarshipList(id));
    }, [dispatch, id]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!scholarship) return <p className="text-center mt-10">No scholarship found.</p>;

    return (
        <div className="max-w-6xl mx-auto my-10 p-6 bg-[#f8fafc] rounded-lg shadow">
            {/* Title and Header */}
            <div className="border-b pb-4 mb-6">
                <h1 className="text-2xl font-bold text-[#004080]">
                    {scholarship.scholarshipName}
                </h1>
                <p className="text-gray-600 mt-1">
                    Deadline: <strong>{scholarship.endDate ? new Date(scholarship.endDate).toLocaleDateString() : "N/A"}</strong>
                </p>
            </div>

            {/* About Section */}
            <SectionCard title="About The Program">
                <p>{scholarship.description || "No description available."}</p>
            </SectionCard>

            {/* Eligibility */}
            <SectionCard title="Eligibility">
                <div dangerouslySetInnerHTML={{ __html: scholarship.eligibility || "No eligibility details." }} />
            </SectionCard>

            {/* Benefits */}
            <SectionCard title="Benefits">
                {scholarship.eligibilityCriteria ? (
                    <p>{scholarship.eligibilityCriteria}</p>
                ) : (
                    <p>No benefit details available.</p>
                )}
            </SectionCard>

            {/* Documents */}
            <SectionCard title="Documents">
                <div dangerouslySetInnerHTML={{ __html: scholarship.documents || "No document list available." }} />
            </SectionCard>

            {/* Application Link */}
            {scholarship.webportaltoApply && (
                <SectionCard title="How to Apply">
                    <a
                        href={scholarship.webportaltoApply}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        {scholarship.webportaltoApply}
                    </a>
                </SectionCard>
            )}

            {/* Contact Details */}
            {scholarship.contactDetails && (
                <SectionCard title="Contact Details">
                    <p>{scholarship.contactDetails}</p>
                </SectionCard>
            )}
        </div>
    );
};

export default ScholarshipViewPage;
