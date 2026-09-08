import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
    FaMagic,
    FaSave,
    FaArrowLeft,
    FaPlus,
    FaTrash,
    FaUser,
    FaGraduationCap,
    FaBriefcase,
    FaLightbulb,
    FaCheck,
} from "react-icons/fa";

import Loader from "../components/common/Loader";

import { editUserProfile } from "../features/user/userAPI";
import { fetchCurrentUser } from "../features/auth/authAPI";
import { fetchProfileSummary } from "../features/ai/aiAPI";

import {
    selectUser,
    selectLoading as selectAuthLoading,
} from "../features/auth/authSelectors";

import {
    selectUserLoading,
    selectUserError,
} from "../features/user/userSelectors";

import {
    selectProfileSummary,
    selectAILoading,
    selectAIError,
} from "../features/ai/aiSelectors";

import { clearProfileSummary } from "../features/ai/aiSlice";


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

    const [profileImage, setProfileImage] = useState(null);

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
        setValue("headline", profile.headline || "");
        setValue("bio", profile.bio || "");

        setValue("skills", profile.skills?.join(", ") || "");

        setValue(
            "education",
            profile.education?.length
                ? profile.education.map((education) => ({
                    institute: education.institute || "",
                    degree: education.degree || "",
                    fieldOfStudy: education.fieldOfStudy || "",
                    startYear: education.startYear || "",
                    endYear: education.endYear || "",
                    grade: education.grade || "",
                    description: education.description || "",
                }))
                : []
        );

        setValue(
            "experience",
            profile.experience?.length
                ? profile.experience.map((experience) => ({
                    company: experience.company || "",
                    role: experience.role || "",
                    employmentType: experience.employmentType || "",
                    location: experience.location || "",
                    startDate: experience.startDate
                        ? experience.startDate.substring(0, 10)
                        : "",
                    endDate: experience.endDate
                        ? experience.endDate.substring(0, 10)
                        : "",
                    currentlyWorking: experience.currentlyWorking || false,
                    description: experience.description || "",
                    skillsUsed: experience.skillsUsed?.join(", ") || "",
                }))
                : []
        );
    }, [profile, setValue]);


    useEffect(() => {
        dispatch(clearProfileSummary());
    }, [dispatch]);


    const handleGenerateSummary = () => {
        dispatch(fetchProfileSummary());
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
    };


    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("headline", data.headline);
            formData.append("bio", data.bio);

            const skills = data.skills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean);

            formData.append("skills", JSON.stringify(skills));


            const education = data.education.map(
                (item) => ({
                    institute: item.institute,
                    degree: item.degree,
                    fieldOfStudy: item.fieldOfStudy,
                    startYear: Number(item.startYear),
                    endYear: Number(item.endYear),
                    grade: item.grade,
                    description: item.description,
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


    if (authLoading && !profile) {
        return <Loader />;
    }


    if (!profile) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center px-4">
                <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                        <FaUser />
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        Profile not found
                    </h2>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        We couldn't load your profile information.
                    </p>

                    <button
                        onClick={() => navigate("/profile")}
                        className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        Back to Profile
                    </button>
                </div>
            </div>
        );
    }


    const inputClass =
        "w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:bg-slate-800";

    const labelClass =
        "mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200";


    return (
        <div className="min-h-screen bg-slate-50 px-4 py-6 transition-colors duration-300 dark:bg-slate-950 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-4xl">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between gap-4">

                    <div className="flex min-w-0 items-center gap-4">

                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:-translate-x-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
                            aria-label="Back to profile"
                        >
                            <FaArrowLeft />
                        </button>

                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="hidden rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 sm:inline-block">
                                    Profile
                                </span>
                            </div>

                            <h1 className="mt-1 truncate text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                                Edit Profile
                            </h1>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Keep your professional profile up to date
                            </p>
                        </div>
                    </div>

                    <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 sm:flex">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Profile editing
                    </div>

                </div>


                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >

                    {/* Basic Information */}
                    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-200/60 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/10">

                        <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50/80 to-indigo-50/50 px-5 py-5 dark:border-slate-800 dark:from-blue-950/30 dark:to-indigo-950/20 sm:px-7">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                                    <FaUser />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                        Basic Information
                                    </h2>

                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Tell people who you are
                                    </p>
                                </div>

                            </div>

                        </div>


                        <div className="space-y-5 p-5 sm:p-7">

                            {/* Name */}
                            <div>
                                <label className={labelClass}>
                                    Name
                                </label>

                                <input
                                    {...register(
                                        "name",
                                        {
                                            required: "Name is required",
                                        }
                                    )}
                                    placeholder="Enter your name"
                                    className={`${inputClass} ${
                                        errors.name
                                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                                            : "border-slate-200"
                                    }`}
                                />

                                {errors.name && (
                                    <p className="mt-1.5 text-xs font-medium text-red-500">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>


                            {/* Headline */}
                            <div>
                                <label className={labelClass}>
                                    Professional Headline
                                </label>

                                <input
                                    {...register("headline")}
                                    placeholder="e.g. MERN Developer | Software Engineer"
                                    className={`${inputClass} border-slate-200`}
                                />

                                <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                                    A short description that appears below your name.
                                </p>
                            </div>


                            {/* Bio */}
                            <div>
                                <label className={labelClass}>
                                    About
                                </label>

                                <textarea
                                    {...register("bio")}
                                    rows={6}
                                    placeholder="Tell people about yourself, your experience, interests and career goals..."
                                    className={`${inputClass} resize-none border-slate-200 leading-relaxed`}
                                />
                            </div>


                            {/* Profile Image */}
                            <div>

                                <label className={labelClass}>
                                    Profile Image
                                </label>

                                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">

                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                                        {profileImage ? (
                                            <img
                                                src={URL.createObjectURL(profileImage)}
                                                alt="Preview"
                                                className="h-20 w-20 rounded-2xl border-2 border-white object-cover shadow-md dark:border-slate-700"
                                            />
                                        ) : profile.profileImage ? (
                                            <img
                                                src={profile.profileImage}
                                                alt={profile.name}
                                                className="h-20 w-20 rounded-2xl border-2 border-white object-cover shadow-md dark:border-slate-700"
                                            />
                                        ) : (
                                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                                                <FaUser />
                                            </div>
                                        )}

                                        <div className="flex-1">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="block w-full cursor-pointer rounded-xl border border-slate-200 bg-white text-sm text-slate-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-blue-600 file:px-4 file:py-2.5 file:font-semibold file:text-white hover:file:bg-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                            />

                                            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                                                Choose a clear professional image.
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>


                    {/* AI Summary */}
                    <section className="relative overflow-hidden rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-blue-50 shadow-sm dark:border-violet-900/50 dark:from-violet-950/30 dark:via-slate-900 dark:to-blue-950/30">

                        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-400/10 blur-3xl" />
                        <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-blue-400/10 blur-3xl" />

                        <div className="relative p-5 sm:p-7">

                            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                                <div className="flex items-start gap-3">

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-500/20">
                                        <FaMagic />
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                                AI Profile Summary
                                            </h2>

                                            <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:bg-violet-950/60 dark:text-violet-400">
                                                AI
                                            </span>
                                        </div>

                                        <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                            Generate a professional summary from your profile.
                                        </p>
                                    </div>

                                </div>


                                <button
                                    type="button"
                                    onClick={handleGenerateSummary}
                                    disabled={aiLoading}
                                    className="flex items-center cursor-pointer justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-violet-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <FaMagic />

                                    {aiLoading
                                        ? "Generating..."
                                        : "Generate Summary"
                                    }
                                </button>

                            </div>


                            {aiError && (
                                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                                    <span className="mt-0.5 font-bold">!</span>
                                    <span>{aiError}</span>
                                </div>
                            )}


                            {profileSummary && (
                                <div className="mt-5 rounded-2xl border border-violet-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-violet-900/40 dark:bg-slate-900/70">

                                    <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                                        <FaLightbulb />
                                        Generated Summary
                                    </div>

                                    <p className="whitespace-pre-line text-sm leading-7 text-slate-700 dark:text-slate-300">
                                        {profileSummary}
                                    </p>

                                    <div className="mt-5 flex justify-end">

                                        <button
                                            type="button"
                                            onClick={handleUseSummary}
                                            className="flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                        >
                                            <FaCheck />
                                            Use as Bio
                                        </button>

                                    </div>

                                </div>
                            )}

                        </div>

                    </section>


                    {/* Skills */}
                    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/10 sm:p-7">

                        <div className="mb-5">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                Skills
                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Highlight the technologies and skills you work with.
                            </p>
                        </div>

                        <label className={labelClass}>
                            Your Skills
                        </label>

                        <input
                            {...register("skills")}
                            placeholder="Node.js, React, MongoDB, Express"
                            className={`${inputClass} border-slate-200`}
                        />

                        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                            Separate each skill using commas.
                        </p>

                    </section>


                    {/* Education */}
                    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/10">

                        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:p-7">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                                    <FaGraduationCap />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                        Education
                                    </h2>

                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Add your academic background
                                    </p>
                                </div>

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    appendEducation({
                                        institute: "",
                                        degree: "",
                                        fieldOfStudy: "",
                                        startYear: "",
                                        endYear: "",
                                        grade: "",
                                        description: "",
                                    })
                                }
                                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/10 transition hover:bg-blue-700"
                            >
                                <FaPlus />
                                Add Education
                            </button>

                        </div>


                        <div className="space-y-5 p-5 sm:p-7">

                            {educationFields.length === 0 && (
                                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center dark:border-slate-700 dark:bg-slate-800/40">
                                    <FaGraduationCap className="mx-auto text-2xl text-slate-300 dark:text-slate-600" />

                                    <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                                        No education added yet.
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Add your academic qualifications above.
                                    </p>
                                </div>
                            )}


                            {educationFields.map((field, index) => (

                                <div
                                    key={field.id}
                                    className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-700 dark:bg-slate-800/40 sm:p-6"
                                >

                                    <div className="mb-5 flex items-center justify-between gap-3">

                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                                Education
                                            </span>

                                            <h3 className="mt-0.5 text-base font-bold text-slate-900 dark:text-white">
                                                Education #{index + 1}
                                            </h3>
                                        </div>


                                        <button
                                            type="button"
                                            onClick={() => removeEducation(index)}
                                            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                                        >
                                            <FaTrash />
                                            <span className="hidden sm:inline">
                                                Remove
                                            </span>
                                        </button>

                                    </div>


                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                        <div className="md:col-span-2">
                                            <label className={labelClass}>
                                                Institute
                                            </label>

                                            <input
                                                {...register(`education.${index}.institute`)}
                                                placeholder="e.g. GGSIPU"
                                                className={`${inputClass} border-slate-200`}
                                            />
                                        </div>


                                        <div>
                                            <label className={labelClass}>
                                                Degree
                                            </label>

                                            <input
                                                {...register(`education.${index}.degree`)}
                                                placeholder="e.g. B.Tech"
                                                className={`${inputClass} border-slate-200`}
                                            />
                                        </div>


                                        <div>
                                            <label className={labelClass}>
                                                Field of Study
                                            </label>

                                            <input
                                                {...register(`education.${index}.fieldOfStudy`)}
                                                placeholder="e.g. Information Technology"
                                                className={`${inputClass} border-slate-200`}
                                            />
                                        </div>


                                        <div>
                                            <label className={labelClass}>
                                                Start Year
                                            </label>

                                            <input
                                                type="number"
                                                {...register(
                                                    `education.${index}.startYear`,
                                                    {
                                                        valueAsNumber: true,
                                                    }
                                                )}
                                                placeholder="2022"
                                                className={`${inputClass} border-slate-200`}
                                            />
                                        </div>


                                        <div>
                                            <label className={labelClass}>
                                                End Year
                                            </label>

                                            <input
                                                type="number"
                                                {...register(
                                                    `education.${index}.endYear`,
                                                    {
                                                        valueAsNumber: true,
                                                    }
                                                )}
                                                placeholder="2026"
                                                className={`${inputClass} border-slate-200`}
                                            />
                                        </div>


                                        <div className="md:col-span-2">
                                            <label className={labelClass}>
                                                Grade
                                            </label>

                                            <input
                                                {...register(`education.${index}.grade`)}
                                                placeholder="e.g. A+ / 8.5 CGPA"
                                                className={`${inputClass} border-slate-200`}
                                            />
                                        </div>


                                        <div className="md:col-span-2">
                                            <label className={labelClass}>
                                                Description
                                            </label>

                                            <textarea
                                                {...register(`education.${index}.description`)}
                                                rows={4}
                                                placeholder="Describe your education, achievements, coursework..."
                                                className={`${inputClass} resize-none border-slate-200`}
                                            />
                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </section>


                    {/* Experience */}
                    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/10">

                        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:p-7">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                                    <FaBriefcase />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                        Experience
                                    </h2>

                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Showcase your professional journey
                                    </p>
                                </div>

                            </div>


                            <button
                                type="button"
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
                                className="flex items-center cursor-pointer justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/10 transition hover:bg-blue-700"
                            >
                                <FaPlus />
                                Add Experience
                            </button>

                        </div>


                        <div className="space-y-5 p-5 sm:p-7">

                            {experienceFields.length === 0 && (
                                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center dark:border-slate-700 dark:bg-slate-800/40">
                                    <FaBriefcase className="mx-auto text-2xl text-slate-300 dark:text-slate-600" />

                                    <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                                        No experience added yet.
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Add your professional experience above.
                                    </p>
                                </div>
                            )}


                            {experienceFields.map(
                                (field, index) => (

                                    <div
                                        key={field.id}
                                        className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-700 dark:bg-slate-800/40 sm:p-6"
                                    >

                                        <div className="mb-5 flex items-center justify-between gap-3">

                                            <div>
                                                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                                    Experience
                                                </span>

                                                <h3 className="mt-0.5 text-base font-bold text-slate-900 dark:text-white">
                                                    Experience #{index + 1}
                                                </h3>
                                            </div>


                                            <button
                                                type="button"
                                                onClick={() => removeExperience(index)}
                                                className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                                            >
                                                <FaTrash />

                                                <span className="hidden sm:inline">
                                                    Remove
                                                </span>
                                            </button>

                                        </div>


                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                            {/* Company */}
                                            <div>
                                                <label className={labelClass}>
                                                    Company
                                                </label>

                                                <input
                                                    {...register(
                                                        `experience.${index}.company`
                                                    )}
                                                    placeholder="e.g. Google"
                                                    className={`${inputClass} border-slate-200`}
                                                />
                                            </div>


                                            {/* Role */}
                                            <div>
                                                <label className={labelClass}>
                                                    Role
                                                </label>

                                                <input
                                                    {...register(
                                                        `experience.${index}.role`
                                                    )}
                                                    placeholder="e.g. SDE Intern"
                                                    className={`${inputClass} border-slate-200`}
                                                />
                                            </div>


                                            {/* Employment */}
                                            <div>
                                                <label className={labelClass}>
                                                    Employment Type
                                                </label>

                                                <select
                                                    {...register(
                                                        `experience.${index}.employmentType`
                                                    )}
                                                    className={`${inputClass} border-slate-200`}
                                                >
                                                    <option value="">
                                                        Select employment type
                                                    </option>

                                                    <option value="Full-time">
                                                        Full-time
                                                    </option>

                                                    <option value="Part-time">
                                                        Part-time
                                                    </option>

                                                    <option value="Internship">
                                                        Internship
                                                    </option>

                                                    <option value="Contract">
                                                        Contract
                                                    </option>

                                                    <option value="Freelance">
                                                        Freelance
                                                    </option>
                                                </select>
                                            </div>


                                            {/* Location */}
                                            <div>
                                                <label className={labelClass}>
                                                    Location
                                                </label>

                                                <input
                                                    {...register(
                                                        `experience.${index}.location`
                                                    )}
                                                    placeholder="e.g. India / Remote"
                                                    className={`${inputClass} border-slate-200`}
                                                />
                                            </div>


                                            {/* Start Date */}
                                            <div>
                                                <label className={labelClass}>
                                                    Start Date
                                                </label>

                                                <input
                                                    type="date"
                                                    {...register(
                                                        `experience.${index}.startDate`
                                                    )}
                                                    className={`${inputClass} border-slate-200`}
                                                />
                                            </div>


                                            {/* End Date */}
                                            <div>
                                                <label className={labelClass}>
                                                    End Date
                                                </label>

                                                <input
                                                    type="date"
                                                    disabled={watch(
                                                        `experience.${index}.currentlyWorking`
                                                    )}
                                                    {...register(
                                                        `experience.${index}.endDate`
                                                    )}
                                                    className={`${inputClass} border-slate-200 disabled:cursor-not-allowed disabled:opacity-50`}
                                                />
                                            </div>


                                            {/* Currently Working */}
                                            <div className="md:col-span-2">

                                                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 transition hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-700">

                                                    <input
                                                        type="checkbox"
                                                        {...register(
                                                            `experience.${index}.currentlyWorking`,
                                                            {
                                                                onChange: (e) => {
                                                                    if (e.target.checked) {
                                                                        setValue(
                                                                            `experience.${index}.endDate`,
                                                                            ""
                                                                        );
                                                                    }
                                                                },
                                                            }
                                                        )}
                                                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600"
                                                    />

                                                    <div>
                                                        <span className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                                            I currently work here
                                                        </span>

                                                        <span className="block text-xs text-slate-400 dark:text-slate-500">
                                                            End date will be disabled
                                                        </span>
                                                    </div>

                                                </label>

                                            </div>


                                            {/* Description */}
                                            <div className="md:col-span-2">

                                                <label className={labelClass}>
                                                    Description
                                                </label>

                                                <textarea
                                                    {...register(
                                                        `experience.${index}.description`
                                                    )}
                                                    rows={5}
                                                    placeholder="Describe your responsibilities, achievements and impact..."
                                                    className={`${inputClass} resize-none border-slate-200`}
                                                />

                                            </div>


                                            {/* Skills */}
                                            <div className="md:col-span-2">

                                                <label className={labelClass}>
                                                    Skills Used
                                                </label>

                                                <input
                                                    {...register(
                                                        `experience.${index}.skillsUsed`
                                                    )}
                                                    placeholder="Node.js, React, MongoDB"
                                                    className={`${inputClass} border-slate-200`}
                                                />

                                                <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                                                    Separate skills using commas.
                                                </p>

                                            </div>

                                        </div>

                                    </div>
                                )
                            )}

                        </div>

                    </section>


                    {/* Error */}
                    {userError && (
                        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                            <span className="font-bold">!</span>
                            <span>{userError}</span>
                        </div>
                    )}


                    {/* Bottom Actions */}
                    <div className="flex flex-col-reverse gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-xl shadow-slate-300/20 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/30 sm:flex-row sm:justify-end">

                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            className="rounded-xl cursor-pointer border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            disabled={userLoading}
                            className="flex items-center cursor-pointer justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <FaSave />

                            {userLoading
                                ? "Saving..."
                                : "Save Profile"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};


export default EditProfile;