const AboutSection = ({ bio }) => {

    return (

        <section className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">About</h2>

            {bio ? (
                <p className="text-gray-700 leading-7 whitespace-pre-line">{bio}</p>
            ) : (
                <p className="text-gray-500 italic">No bio added yet.</p>
            )}

        </section>

    );

};

export default AboutSection;