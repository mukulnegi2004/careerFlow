const SkillsSection = ({ skills = [] }) => {
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
            <div className="mb-5">
                <h2
                    className="
                        text-xl font-bold
                        text-slate-900
                        dark:text-white
                    "
                >
                    Skills
                </h2>

                <p
                    className="
                        mt-1 text-sm
                        text-slate-500
                        dark:text-slate-400
                    "
                >
                    Technologies and strengths
                </p>
            </div>

            {skills.length === 0 ? (
                <p
                    className="
                        rounded-xl
                        bg-slate-50 p-4
                        text-sm
                        text-slate-500
                        dark:bg-slate-800/60
                        dark:text-slate-400
                    "
                >
                    No skills added yet.
                </p>
            ) : (
                <div className="flex flex-wrap gap-2.5">
                    {skills.map((skill, index) => (
                        <span
                            key={index}
                            className="
                                rounded-full
                                border border-blue-100
                                bg-blue-50
                                px-4 py-2
                                text-sm font-medium
                                text-blue-700
                                transition-all duration-200
                                hover:-translate-y-0.5
                                hover:border-blue-200
                                hover:shadow-sm
                                dark:border-blue-900/50
                                dark:bg-blue-950/40
                                dark:text-blue-300
                            "
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            )}
        </section>
    );
};

export default SkillsSection;