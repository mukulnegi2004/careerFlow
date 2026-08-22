const SkillsSection = ({ skills = [] }) => {

    return (

        <section className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
                Skills
            </h2>

            {skills.length === 0 ? (
                <p className="text-gray-500">
                    No skills added yet.
                </p>
            ) : (
                <div className="flex flex-wrap gap-3">
                    {skills.map((skill, index) => (
                        <span key={index} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {skill}
                        </span>
                    ))}
                </div>
            )}

        </section>

    );

};

export default SkillsSection;