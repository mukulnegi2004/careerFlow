// src/components/chat/OnlineBadge.jsx

const OnlineBadge = () => {
    return (
        <span
            className="
                absolute
                bottom-0
                right-0
                w-3.5
                h-3.5
                bg-green-500
                border-2
                border-white
                rounded-full
                shadow-sm
            "
            aria-label="Online"
        />
    );
};

export default OnlineBadge;