const ExperienceSection = ({ experience = [] }) => {
    return (
        <section
            className="
                rounded-2xl
                border border-slate-200
                bg-white
                p-5 shadow-sm
                transition-colors duration-300
                dark:border-slate-800
                dark:bg-slate-900
                sm:p-6
            "
        >
            <div className="mb-6">
                <h2
                    className="
                        text-xl font-bold
                        text-slate-900
                        dark:text-white
                    "
                >
                    Experience
                </h2>

                <p
                    className="
                        mt-1 text-sm
                        text-slate-500
                        dark:text-slate-400
                    "
                >
                    Your professional journey
                </p>
            </div>

            {experience.length > 0 ? (
                <div className="space-y-8">
                    {experience.map((exp) => (
                        <div
                            key={exp._id}
                            className="
                                relative border-l-2
                                border-emerald-500
                                pl-5
                                sm:pl-6
                            "
                        >
                            <div
                                className="
                                    absolute -left-[7px] top-1
                                    h-3 w-3 rounded-full
                                    border-2 border-white
                                    bg-emerald-500
                                    dark:border-slate-900
                                "
                            />

                            <h3
                                className="
                                    text-lg font-bold
                                    text-slate-900
                                    dark:text-slate-100
                                "
                            >
                                {exp.company}
                            </h3>

                            <p
                                className="
                                    mt-1 text-sm font-medium
                                    text-slate-700
                                    dark:text-slate-300
                                "
                            >
                                {exp.role}

                                {exp.employmentType && (
                                    <span
                                        className="
                                            text-slate-500
                                            dark:text-slate-400
                                        "
                                    >
                                        {" "}• {exp.employmentType}
                                    </span>
                                )}
                            </p>

                            {exp.location && (
                                <p
                                    className="
                                        mt-2 text-sm
                                        text-slate-500
                                        dark:text-slate-400
                                    "
                                >
                                    📍 {exp.location}
                                </p>
                            )}

                            <p
                                className="
                                    mt-2 text-xs font-medium
                                    text-slate-400
                                    dark:text-slate-500
                                "
                            >
                                {exp.startDate
                                    ? new Date(
                                          exp.startDate
                                      ).toLocaleDateString(
                                          "en-US",
                                          {
                                              month: "short",
                                              year: "numeric",
                                          }
                                      )
                                    : "----"}

                                {" - "}

                                {exp.currentlyWorking
                                    ? "Present"
                                    : exp.endDate
                                    ? new Date(
                                          exp.endDate
                                      ).toLocaleDateString(
                                          "en-US",
                                          {
                                              month: "short",
                                              year: "numeric",
                                          }
                                      )
                                    : "----"}
                            </p>

                            {exp.description && (
                                <p
                                    className="
                                        mt-4 text-sm leading-7
                                        text-slate-600
                                        dark:text-slate-400
                                    "
                                >
                                    {exp.description}
                                </p>
                            )}

                            {exp.skillsUsed?.length > 0 && (
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {exp.skillsUsed.map(
                                        (skill, index) => (
                                            <span
                                                key={index}
                                                className="
                                                    rounded-full
                                                    border
                                                    border-emerald-100
                                                    bg-emerald-50
                                                    px-3 py-1
                                                    text-xs font-medium
                                                    text-emerald-700
                                                    dark:border-emerald-900/50
                                                    dark:bg-emerald-950/40
                                                    dark:text-emerald-300
                                                "
                                            >
                                                {skill}
                                            </span>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p
                    className="
                        rounded-xl
                        bg-slate-50 p-4
                        text-sm italic
                        text-slate-500
                        dark:bg-slate-800/60
                        dark:text-slate-400
                    "
                >
                    No experience added yet.
                </p>
            )}
        </section>
    );
};

export default ExperienceSection;