const OnlineBadge = () => {
    return (
        <span
            className="
                absolute
                -bottom-0.5
                -right-0.5
                h-4
                w-4
                rounded-full
                border-[3px]
                border-white
                bg-emerald-500
                shadow-sm
                dark:border-slate-900
            "
            aria-label="Online"
        />
    );
};

export default OnlineBadge;