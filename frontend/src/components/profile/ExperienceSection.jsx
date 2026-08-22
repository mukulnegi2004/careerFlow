const ExperienceSection = ({ experience = [] }) => {

    return (

        <section className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-5">
                Experience
            </h2>

            {experience.length > 0 ? (
                <div className="space-y-8">
                    {experience.map((exp) => (
                        <div key={exp._id} className="border-l-4 border-green-600 pl-5">

                            <h3 className="text-xl font-semibold">{exp.company}</h3>

                            <p className="text-gray-700 mt-1">{exp.role}
                                {exp.employmentType && (<span className="text-gray-500">{" "}• {exp.employmentType}</span>
                            )}
                            </p>

                            {exp.location && (
                                <p className="text-sm text-gray-500 mt-1">📍 {exp.location}</p>
                            )}


                            <p className="text-sm text-gray-500 mt-2">
                                {exp.startDate ? 
                                    new Date(exp.startDate).toLocaleDateString(
                                          "en-US",
                                          {
                                              month: "short",
                                              year: "numeric",
                                          }
                                      )
                                    : "----"}
                                {" - "}

                                {exp.currentlyWorking ? "Present"
                                    : exp.endDate
                                    ? new Date(exp.endDate).toLocaleDateString(
                                          "en-US",
                                          {
                                              month: "short",
                                              year: "numeric",
                                          }
                                      )
                                    : "----"}
                            </p>

                            {exp.description && (
                                <p className="mt-4 text-gray-700 leading-7">{exp.description}</p>
                            )}

                            {exp.skillsUsed?.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-5">
                                    {exp.skillsUsed.map((skill, index) => (
                                        <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            )}

                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 italic">No experience added yet.</p>
            )}

        </section>

    );

};

export default ExperienceSection;