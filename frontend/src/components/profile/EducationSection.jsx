const EducationSection = ({ education = [] }) => {
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
                    Education
                </h2>

                <p
                    className="
                        mt-1 text-sm
                        text-slate-500
                        dark:text-slate-400
                    "
                >
                    Your academic background
                </p>
            </div>

            {education.length > 0 ? (
                <div className="space-y-7">
                    {education.map((edu) => (
                        <div
                            key={edu._id}
                            className="
                                relative border-l-2
                                border-blue-500
                                pl-5
                                sm:pl-6
                            "
                        >
                            <div
                                className="
                                    absolute -left-[7px] top-1
                                    h-3 w-3 rounded-full
                                    border-2 border-white
                                    bg-blue-500
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
                                {edu.institute}
                            </h3>

                            <p
                                className="
                                    mt-1 text-sm font-medium
                                    text-slate-700
                                    dark:text-slate-300
                                "
                            >
                                {edu.degree}

                                {edu.fieldOfStudy &&
                                    ` • ${edu.fieldOfStudy}`}
                            </p>

                            <p
                                className="
                                    mt-2 text-xs font-medium
                                    text-slate-400
                                    dark:text-slate-500
                                "
                            >
                                {edu.startYear || "----"} -{" "}
                                {edu.endYear || "Present"}
                            </p>

                            {edu.grade && (
                                <p
                                    className="
                                        mt-3 text-sm
                                        text-slate-600
                                        dark:text-slate-400
                                    "
                                >
                                    <span
                                        className="
                                            font-semibold
                                            text-slate-700
                                            dark:text-slate-300
                                        "
                                    >
                                        Grade:
                                    </span>{" "}
                                    {edu.grade}
                                </p>
                            )}

                            {edu.description && (
                                <p
                                    className="
                                        mt-3 text-sm leading-7
                                        text-slate-600
                                        dark:text-slate-400
                                    "
                                >
                                    {edu.description}
                                </p>
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
                    No education details added yet.
                </p>
            )}
        </section>
    );
};

export default EducationSection;