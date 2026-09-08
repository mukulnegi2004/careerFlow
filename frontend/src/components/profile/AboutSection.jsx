const AboutSection = ({ bio }) => {
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
                    About
                </h2>

                <p
                    className="
                        mt-1 text-sm
                        text-slate-500
                        dark:text-slate-400
                    "
                >
                    A little about you
                </p>
            </div>

            {bio ? (
                <p
                    className="
                        whitespace-pre-line
                        text-sm leading-7
                        text-slate-600
                        dark:text-slate-400
                    "
                >
                    {bio}
                </p>
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
                    No bio added yet.
                </p>
            )}
        </section>
    );
};

export default AboutSection;