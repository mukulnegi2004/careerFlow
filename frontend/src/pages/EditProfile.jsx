import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate,} from "react-router-dom";
import { FaMagic, FaSave, FaArrowLeft, FaPlus, FaTrash,} from "react-icons/fa";

import Loader from "../components/common/Loader";

import {editUserProfile} from "../features/user/userAPI";
import {fetchCurrentUser} from "../features/auth/authAPI";
import { fetchProfileSummary } from "../features/ai/aiAPI";

import {selectUser, selectLoading as selectAuthLoading} from "../features/auth/authSelectors";
import { selectUserLoading, selectUserError } from "../features/user/userSelectors";
import { selectProfileSummary, selectAILoading, selectAIError } from "../features/ai/aiSelectors";

import {clearProfileSummary} from "../features/ai/aiSlice";


const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const profile = useSelector(selectUser);
    const authLoading = useSelector(selectAuthLoading);

    const userLoading = useSelector(selectUserLoading);
    const userError = useSelector(selectUserError);

    const profileSummary = useSelector(selectProfileSummary);
    const aiLoading = useSelector(selectAILoading);
    const aiError = useSelector(selectAIError);

    const [ profileImage, setProfileImage] = useState(null);

    const {
        register,
        control,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
    } = useForm({
        defaultValues: {
            name: "",
            headline: "",
            bio: "",
            skills: "",
            education: [],
            experience: [],
        },

    });

    const {
        fields: educationFields,
        append: appendEducation,
        remove: removeEducation,
    } = useFieldArray({
        control,
        name: "education",
    });

    const {
        fields: experienceFields,
        append: appendExperience,
        remove: removeExperience,
    } = useFieldArray({
        control,
        name: "experience",
    });

    useEffect(() => {
        if (!profile) return;

        setValue("name", profile.name || "");
        setValue( "headline", profile.headline || "" );
        setValue( "bio", profile.bio || "");

        setValue("skills", profile.skills?.join(", ") || "");

        setValue("education",
            profile.education?.length
                ? profile.education.map((education) => ({
                        institute: education.institute || "",
                        degree: education.degree || "",
                        fieldOfStudy: education.fieldOfStudy || "",
                        startYear: education.startYear || "",
                        endYear: education.endYear || "",
                        grade: education.grade || "",
                        description: education.description || "",
                    })
                )
                : []
        );

        setValue("experience",
            profile.experience?.length ? profile.experience.map(
                    (experience) => ({
                        company: experience.company || "",
                        role: experience.role || "",
                        employmentType: experience.employmentType || "",
                        location: experience.location || "",
                        startDate: experience.startDate ? experience.startDate.substring(0, 10) : "",
                        endDate: experience.endDate ? experience.endDate.substring(0, 10) : "",
                        currentlyWorking: experience.currentlyWorking || false,
                        description: experience.description || "",
                        skillsUsed: experience.skillsUsed?.join(", ") || "",
                    })
                )
                : []
        );
    }, [ profile, setValue ]);

    useEffect(() => {
        dispatch(
            clearProfileSummary()
        );
    }, [dispatch]);

    const handleGenerateSummary = () => {
        dispatch(
            fetchProfileSummary()
        );
    };

    const handleUseSummary = () => {
        if (!profileSummary) return;
        setValue(
            "bio",
            profileSummary,
            {
                shouldDirty: true,
                shouldValidate: true,
            }
        );
    };

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setProfileImage(file);
    }

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            formData.append( "name", data.name );
            formData.append( "headline", data.headline );
            formData.append( "bio", data.bio );

            const skills = data.skills.split(",").map((skill) => skill.trim()).filter(Boolean);

            formData.append( "skills", JSON.stringify(skills));

            const education = data.education.map(
                    (item) => ({
                        institute:
                            item.institute,
                        degree:
                            item.degree,
                        fieldOfStudy:
                            item.fieldOfStudy,
                        startYear:
                            Number(item.startYear),
                        endYear:
                            Number(item.endYear),
                        grade:
                            item.grade,
                        description:
                            item.description,
                    })
                );
            formData.append(
                "education",
                JSON.stringify(education)
            );

            const experience = data.experience.map((item) => {

                const experienceData = {
                    company: item.company,
                    role: item.role,
                    employmentType: item.employmentType,
                    location: item.location,
                    startDate: item.startDate || null,
                    currentlyWorking: item.currentlyWorking,
                    description: item.description,
                    skillsUsed: item.skillsUsed
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter(Boolean),
                };
            
                if (!item.currentlyWorking && item.endDate) {
                    experienceData.endDate = item.endDate;
                }
            
                return experienceData;
            });

            formData.append(
                "experience",
                JSON.stringify(experience)
            );

            if (profileImage) {
                formData.append(
                    "profileImage",
                    profileImage
                );
            }

            await dispatch(editUserProfile(formData)).unwrap();

            await dispatch(fetchCurrentUser()).unwrap();

            navigate("/profile");
        } catch (error) {

            console.error(
                "Profile update failed:",
                error
            );

        }

    };

    if( authLoading && !profile) {
        return <Loader />;
    }

    if (!profile) {
        return (
            <div className="max-w-4xl mx-auto py-20 text-center">
                <h2 className="text-xl font-semibold">
                    Profile not found
                </h2>
            </div>
        );
    }


    return (

        <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4 mb-6">
                <button type="button" onClick={() => navigate("/profile")} className="p-2 rounded-lg hover:bg-gray-200 transition">
                    <FaArrowLeft />
                </button>


                <div>
                    <h1 className="text-3xl font-bold">
                        Edit Profile
                    </h1>
                    <p className="text-gray-500">
                        Update your professional information
                    </p>
                </div>
            </div>


            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <section className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-xl font-semibold mb-5">
                        Basic Information
                    </h2>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>

                        <input {...register(
                                "name",
                                { required: "Name is required",}
                            )} placeholder="Enter your name"
                            className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.name ? "border-red-500" : "border-gray-300"
                            }`}
                        />

                        {errors.name && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Headline
                        </label>
                        <input {...register(
                                "headline"
                            )}
                            placeholder="e.g. MERN Developer"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Bio</label>

                        <textarea {...register("bio")}
                            rows={6}
                            placeholder="Tell people about yourself..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Profile Image
                        </label>

                        <input type="file" accept="image/*" onChange={ handleImageChange } 
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />

                        {profile.profileImage && !profileImage && (
                                <img src={ profile.profileImage }
                                    alt={ profile.name } className="mt-4 w-24 h-24 rounded-full object-cover border" />
                        )}


                        {profileImage && (
                            <img src={URL.createObjectURL(profileImage)}alt="Preview"
                                className="mt-4 w-24 h-24 rounded-full object-cover border"
                            />
                        )}
                    </div>
                </section>

                <section className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow p-6 border border-purple-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2">

                                <FaMagic className="text-purple-600" />

                                <h2 className="text-xl font-semibold">AI Profile Summary</h2>

                            </div>


                            <p className="text-sm text-gray-600 mt-1">Generate a professional summary from your profile.</p>
                        </div>

                        <button type="button" onClick={ handleGenerateSummary } disabled={aiLoading}
                            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white px-5 py-3 rounded-lg transition">

                            <FaMagic />

                            {aiLoading ? "Generating..." : "Generate New Summary" }
                        </button>
                    </div>

                    {aiError && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                            {aiError}
                        </div>
                    )}

                    {profileSummary && (
                        <div className="mt-5 bg-white rounded-lg border p-5">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {profileSummary}
                            </p>

                            <div className="flex justify-end mt-4">
                                <button type="button" onClick={ handleUseSummary }
                                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition">
                                        Use This as Bio
                                </button>
                            </div>
                        </div>
                    )}
                </section>

                <section className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-xl font-semibold mb-5"> Skills</h2>

                    <label className="block mb-2 text-sm font-medium text-gray-700"> Skills</label>

                    <input {...register("skills")}
                        placeholder="Node.js, React, MongoDB"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"/>

                    <p className="text-sm text-gray-500 mt-2">Separate skills using commas.</p>
                </section>

                <section className="bg-white rounded-xl shadow p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-xl font-semibold">
                            Education
                        </h2>


                        <button
                            type="button"
                            onClick={() => appendEducation({
                                    institute: "",
                                    degree: "",
                                    fieldOfStudy: "",
                                    startYear: "",
                                    endYear: "",
                                    grade: "",
                                    description: "",
                                })
                            }
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">

                            <FaPlus />

                            Add Education
                        </button>
                    </div>

                    <div className="space-y-6">
                        {educationFields.map((field, index) => (
                                <div key={field.id} className="border border-gray-200 rounded-xl p-5">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-lg"> Education #{index + 1}
                                        </h3>


                                        <button type="button" onClick={() => removeEducation(index )}
                                            className="flex items-center gap-2 text-red-600 hover:text-red-700"
                                        >

                                            <FaTrash />

                                            Remove
                                        </button>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Institute
                                        </label>

                                        <input {...register(`education.${index}.institute` )} placeholder="e.g. GGSIPU"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-700">Degree</label>

                                        <input {...register(`education.${index}.degree`)} placeholder="e.g. B.Tech"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-700">Field of Study</label>

                                        <input {...register(`education.${index}.fieldOfStudy`)} placeholder="e.g. Information Technology"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-700">Start Year</label>

                                            <input type="number" {...register(
                                                    `education.${index}.startYear`,
                                                    {
                                                        valueAsNumber:
                                                            true,
                                                    }
                                                )}
                                                placeholder="2022"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-700">End Year</label>

                                            <input type="number" {...register(
                                                    `education.${index}.endYear`,
                                                    {
                                                        valueAsNumber:
                                                            true,
                                                    }
                                                )}
                                                placeholder="2026"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-700"> Grade</label>

                                        <input {...register(
                                                `education.${index}.grade`
                                            )}
                                            placeholder="e.g. A+ / 8.5 CGPA"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700"> Description
                                        </label>

                                        <textarea {...register(`education.${index}.description`)} rows={4}
                                            placeholder="Describe your education..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        />
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </section>

                <section className="bg-white rounded-xl shadow p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-xl font-semibold"> Experience</h2>

                        <button type="button"
                            onClick={() =>
                                appendExperience({
                                    company: "",
                                    role: "",
                                    employmentType: "",
                                    location: "",
                                    startDate: "",
                                    endDate: "",
                                    currentlyWorking: false,
                                    description: "",
                                    skillsUsed: "",
                                })
                            }
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                        >
                            <FaPlus />

                            Add Experience
                        </button>
                    </div>

                    <div className="space-y-6">
                        {experienceFields.map(
                            (field, index) => (
                                <div key={field.id} className="border border-gray-200 rounded-xl p-5">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-lg">Experience #{index + 1}</h3>

                                        <button type="button" onClick={() => removeExperience(index)}
                                            className="flex items-center gap-2 text-red-600 hover:text-red-700"
                                        >

                                            <FaTrash />

                                            Remove
                                        </button>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-700">Company</label>

                                        <input {...register(
                                                `experience.${index}.company`
                                            )}
                                            placeholder="e.g. Google"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-700">Role</label>

                                        <input {...register(
                                                `experience.${index}.role`
                                            )}
                                            placeholder="e.g. SDE Intern"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Employment Type
                                        </label>

                                        <select {...register(
                                                `experience.${index}.employmentType`
                                            )}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select employment type </option>
                                            <option value="Full-time">Full-time </option>
                                            <option value="Part-time">Part-time  </option>
                                            <option value="Internship">Internship </option>
                                            <option value="Contract">Contract </option>
                                            <option value="Freelance">Freelance </option>
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-700"> Location</label>

                                        <input {...register(
                                                `experience.${index}.location`
                                            )}
                                            placeholder="e.g. India"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-700">Start Date</label>

                                            <input type="date"
                                                {...register(
                                                    `experience.${index}.startDate`
                                                )}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>


                                        <div className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-700">End Date</label>

                                            <input type="date"
                                                disabled={watch(
                                                    `experience.${index}.currentlyWorking`
                                                )}
                                                {...register(
                                                    `experience.${index}.endDate`
                                                )}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox"
                                                {...register(`experience.${index}.currentlyWorking`, {
                                                    onChange: (e) => {
                                                        if (e.target.checked) {
                                                            setValue(`experience.${index}.endDate`, "");
                                                        }
                                                    },
                                                })}
                                                className="w-4 h-4"
                                            />

                                            <span className="text-sm font-medium text-gray-700">
                                                I currently work here
                                            </span>
                                        </label>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>

                                        <textarea {...register(
                                                `experience.${index}.description`
                                            )}
                                            rows={5}
                                            placeholder="Describe your responsibilities and achievements..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700"> Skills Used </label>

                                        <input {...register(
                                                `experience.${index}.skillsUsed`
                                            )}
                                            placeholder="Node.js, React"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                        <p className="text-sm text-gray-500 mt-2">Separate skills using commas.</p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </section>

                {userError && ( <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg"> {userError} </div>)}

                <div className="flex justify-end gap-3 pb-10">
                    <button type="button"
                        onClick={() =>
                            navigate("/profile")
                        }
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>

                    <button type="submit"
                        disabled={userLoading}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg transition"
                    >

                        <FaSave />

                        {userLoading ? "Saving..." : "Save Profile"}
                    </button>
                </div>
            </form>
        </div>
    );
};


export default EditProfile;