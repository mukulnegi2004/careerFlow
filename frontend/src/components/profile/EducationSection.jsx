const EducationSection = ({ education = [] }) => {

    return (
        <section className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-5"> Education</h2>

            {education.length > 0 ? (
                <div className="space-y-6">
                    {education.map((edu) => (
                        <div key={edu._id} className="border-l-4 border-blue-600 pl-5">
                            <h3 className="text-lg font-semibold">{edu.institute}</h3>

                            <p className="text-gray-700 mt-1">{edu.degree}{edu.fieldOfStudy &&` • ${edu.fieldOfStudy}`}</p>

                            <p className="text-sm text-gray-500 mt-1">{edu.startYear || "----"} -{" "}{edu.endYear || "Present"}</p>

                            {edu.grade && (
                                <p className="mt-2 text-gray-700">
                                    <span className="font-medium">
                                        Grade:
                                    </span>{" "}
                                    {edu.grade}
                                </p>
                            )}

                            {edu.description && (
                                <p className="mt-3 text-gray-600 leading-7">{edu.description}</p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 italic">No education details added yet.</p>
            )}

        </section>

    );

};

export default EducationSection;