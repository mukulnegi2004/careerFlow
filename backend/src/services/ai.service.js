const groq = require("../config/groq");
const User = require('../models/user.model');
const Chat = require("../models/chat.model");
const Message = require("../models/message.model");
const ExpressError = require("../utils/apiError");

const generateProfileSummary = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new ExpressError("user not found", 404)
    }

    const educationText = user.education?.map((edu) => {         //map() returns a new array, and join() converts that array into a single string, but inside that string there are newline characters.
        return `${edu.degree} in ${edu.fieldOfStudy} from ${edu.institute} (${edu.startYear}-${edu.endYear})`
    }).join("\n") || "None";                               //"None" will be used if user.education is empty or undefined so left becomes false

    const experienceText = user.experience?.map((exp) => {
        return `${exp.role} at ${exp.company} (${exp.employmentType}) 
        ${exp.currentlyWorking ? `from ${exp.startDate?.getFullYear()} - Present` : `from ${exp.startDate?.getFullYear()} - ${exp.endDate?.getFullYear()}`}.
        Skills: ${exp.skillsUsed.join(", ") || "None"}. ${exp.description}`
    }).join("\n") || "None";

    console.log(
        process.env.GROQ_API_KEY ? "GROQ API KEY LOADED" : "GROQ API KEY MISSING"
    );

    const prompt = `You are an expert LinkedIn profile writer.
        Your task is to write a compelling LinkedIn "About" section for the user.

        User Details:
        Name: ${user.name}
        Headline: ${user.headline || "Not provided"}
        Bio: ${user.bio || "Not provided"}

        Skills:
        ${user.skills.length ? user.skills.join(", ") : "None"}

        Education:
        ${educationText}

        Experience:
        ${experienceText}
        
        Instructions:
        - Write between 70 and 100 words.
        - Write in the first person ("I am...", "I have...", etc.).
        - Maintain a professional and confident tone.
        - Highlight my technical skills, education, and work experience.
        - Mention my strengths naturally instead of listing them.
        - Do not invent any information that is not provided.
        - Do not use bullet points or markdown.
        - Return only the final profile summary.
        `;

    const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        reasoning_effort: "low",
        max_completion_tokens: 500,
    });

    const content = response.choices?.[0]?.message?.content?.trim();

    if (!content) {
        throw new ExpressError("AI failed to generate response", 500);
    }

    return content;
};


const improvePost = async (content) => {

    const prompt = `You are a professional LinkedIn content writer.

        Rewrite the following LinkedIn post professionally.

        Instructions:
        - Improve grammar and readability.
        - Make it engaging and professional.
        - Keep the original meaning.
        - Add suitable emojis only if they fit naturally.
        - Add 5 to 8 relevant hashtags at the end.
        - Return ONLY the improved post.
        - Do NOT include explanations or quotation marks.

        Post: ${content}`;

    const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        reasoning_effort: "low",
        max_completion_tokens: 500,
    });

    const improvedPost = response.choices?.[0]?.message?.content?.trim();

    if (!improvedPost) {
        throw new ExpressError("AI failed to improve post", 500);
    }

    return improvedPost;
}


const generateJobSuggestions = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new ExpressError("user not found", 404)
    }

    const educationText = user.education?.map((edu) => {         //map() returns a new array, and join() converts that array into a single string.
        return `${edu.degree} in ${edu.fieldOfStudy} from ${edu.institute} (${edu.startYear}-${edu.endYear})`
    }).join("\n") || "None";                               //"None" will be used if user.education is empty or undefined so left becomes false

    const experienceText = user.experience?.map((exp) => {
        return `${exp.role} at ${exp.company} (${exp.employmentType}) 
        ${exp.currentlyWorking ? `from ${exp.startDate?.getFullYear()} - Present` : `from ${exp.startDate?.getFullYear()} - ${exp.endDate?.getFullYear()}`}.
        Skills: ${exp.skillsUsed.join(", ")}. ${exp.description}`
    }).join("\n") || "None";

    const prompt = `You are an experienced career counselor.
        Your task is to recommend suitable career opportunities for the following user.

        User Details:
        Name: ${user.name}
        Headline: ${user.headline || "Not provided"}
        Bio: ${user.bio || "Not provided"}

        Skills: ${user.skills.length ? user.skills.join(", ") : "None"}
 
        Education: ${educationText}

        Experience: ${experienceText}

        Instructions:
        - Recommend exactly 5 career opportunities that best match the user's profile.
        - Recommendations can include full-time jobs, internships, freelance roles, remote opportunities, or career paths.
        - Base your recommendations ONLY on the information provided.
        - Do not invent any skills, education, or experience.
        - Prioritize recommendations according to the user's strongest skills and experience.
        - Return ONLY valid JSON in the following format.
        - Do not include markdown, explanations, or code fences.

        {
          "suggestions": [
            {
              "jobTitle": "",
              "matchPercentage": "",
              "reason": "",
              "skillsToImprove": []
            }
          ]
        }`;

    const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        reasoning_effort: "low",
        max_completion_tokens: 1000,
    });

    const content = response.choices?.[0]?.message?.content?.trim();

    if (!content) {
        throw new ExpressError("AI failed to generate job suggestions", 500);
    }

    try {
        return JSON.parse(content);
    } catch (err) {
        throw new ExpressError("AI returned invalid JSON", 500);
    }

}
const replySuggestion = async (userId, chatId) => {
    // =========================================================
    // FIND CHAT
    // =========================================================

    const chat = await Chat.findById(chatId);

    if (!chat) {
        throw new ExpressError("chat not found", 404);
    }

    // =========================================================
    // CHECK PARTICIPANT
    // =========================================================

    const isParticipant = chat.participants.some(
        (id) => id.toString() === userId.toString()
    );

    if (!isParticipant) {
        throw new ExpressError("unauthorized", 403);
    }

    // =========================================================
    // GET CURRENT USER
    // =========================================================

    const currentUser = await User.findById(userId).select("name");

    if (!currentUser) {
        throw new ExpressError("user not found", 404);
    }

    // =========================================================
    // GET OTHER USER
    // =========================================================

    const otherUserId = chat.participants.find(
        (id) => id.toString() !== userId.toString()
    );

    if (!otherUserId) {
        throw new ExpressError("other user not found", 404);
    }

    const otherUser = await User.findById(otherUserId).select("name");

    if (!otherUser) {
        throw new ExpressError("other user not found", 404);
    }

    // =========================================================
    // GET RECENT MESSAGES
    // =========================================================

    const messages = await Message.find({
        chat: chatId
    })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean();

    if (messages.length === 0) {
        throw new ExpressError("messages not found", 400);
    }

    // Oldest -> newest
    messages.reverse();

    // =========================================================
    // LATEST MESSAGE
    // =========================================================

    const latestMessage = messages[messages.length - 1];

    const isLatestMessageFromCurrentUser =
        latestMessage.sender.toString() === userId.toString();

    const latestMessageSender = isLatestMessageFromCurrentUser
        ? currentUser.name
        : otherUser.name;

    // =========================================================
    // CREATE CONVERSATION
    // =========================================================

    const conversation = messages
        .map((msg) => {
            const sender =
                msg.sender.toString() === userId.toString()
                    ? currentUser.name
                    : otherUser.name;

            return `${sender}: ${msg.text}`;
        })
        .join("\n");

    // =========================================================
    // DETERMINE AI TASK
    // =========================================================

    let task;

    if (isLatestMessageFromCurrentUser) {
        task = `
The latest message was sent BY the CURRENT USER.

CURRENT USER:
${currentUser.name}

Therefore, DO NOT treat the latest message as an incoming message.

The current user has already sent the latest message.

Generate natural FOLLOW-UP messages that the current user could send next.

The suggestions should continue the conversation naturally.

DO NOT generate a reply such as:
"I'm doing well, thank you. How are you?"

unless the other person actually asked that question.

DO NOT pretend that the other person sent the latest message.
`;
    } else {
        task = `
The latest message was sent BY the OTHER PERSON.

OTHER PERSON:
${otherUser.name}

Therefore, the current user needs to REPLY to the latest incoming message.

Generate natural responses that the CURRENT USER could send to the other person.

The suggestions must directly respond to the latest incoming message.
`;
    }

    // =========================================================
    // PROMPT
    // =========================================================

    const prompt = `
You are an AI reply suggestion assistant for a chat application.

=========================================================
USERS
=========================================================

CURRENT USER:
${currentUser.name}

OTHER PERSON:
${otherUser.name}

The generated suggestions MUST ALWAYS be written from the
perspective of the CURRENT USER: "${currentUser.name}".

=========================================================
CONVERSATION
=========================================================

${conversation}

=========================================================
LATEST MESSAGE
=========================================================

Sender: ${latestMessageSender}

Message:
"${latestMessage.text}"

=========================================================
TASK
=========================================================

${task}

=========================================================
STRICT RULES
=========================================================

1. Every suggestion MUST be something that "${currentUser.name}"
   could actually send.

2. Never write from "${otherUser.name}"'s perspective.

3. Never change who sent the latest message.

4. The sender information above is authoritative.

5. Understand the literal meaning of the latest message.

6. If the latest message was sent by the OTHER PERSON:
   generate direct replies to that message.

7. If the latest message was sent by the CURRENT USER:
   generate natural follow-up messages that the CURRENT USER
   could send next.

8. Do not invent facts.

9. Do not invent events.

10. Do not invent questions.

11. Do not invent requests.

12. Do not invent a relationship or situation that is not present
    in the conversation.

13. Use previous messages only when they are relevant.

14. If the conversation is casual, keep the suggestions casual.

15. If the latest message is a greeting, respond naturally.

16. If the latest message is very short or unclear, keep the
    suggestions simple.

17. Do not repeat the latest message word-for-word.

18. Do not ask for clarification unless it is genuinely needed.

19. Each suggestion must contain fewer than 20 words.

20. Generate exactly 3 suggestions.

21. The three tones MUST be exactly:
    Professional
    Friendly
    Short

22. Each suggestion must be meaningfully different.

23. Do not mention that you are an AI.

24. Return ONLY valid JSON.

25. Do NOT return markdown.

26. Do NOT return code fences.

27. Do NOT return explanations.

=========================================================
OUTPUT FORMAT
=========================================================

{
    "replies": [
        {
            "tone": "Professional",
            "text": "..."
        },
        {
            "tone": "Friendly",
            "text": "..."
        },
        {
            "tone": "Short",
            "text": "..."
        }
    ]
}
`;

    // =========================================================
    // CALL GROQ
    // =========================================================

    const completion = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",

        messages: [
            {
                role: "user",
                content: prompt
            }
        ],

        reasoning_effort: "low",

        max_completion_tokens: 500,

        temperature: 0.7,

        response_format: {
            type: "json_object"
        }
    });

    // =========================================================
    // GET AI RESPONSE
    // =========================================================

    const content =
        completion?.choices?.[0]?.message?.content?.trim();

    if (!content) {
        throw new ExpressError(
            "AI failed to generate reply suggestions",
            500
        );
    }

    // =========================================================
    // PARSE JSON
    // =========================================================

    let parsed;

    try {
        parsed = JSON.parse(content);
    } catch (err) {
        console.log("Invalid AI response:", content);

        throw new ExpressError(
            "AI returned invalid JSON",
            500
        );
    }

    // =========================================================
    // VALIDATE RESPONSE
    // =========================================================

    if (
        !parsed ||
        !Array.isArray(parsed.replies) ||
        parsed.replies.length !== 3
    ) {
        throw new ExpressError(
            "AI returned invalid reply format",
            500
        );
    }

    // =========================================================
    // VALIDATE TONES + TEXT
    // =========================================================

    const expectedTones = [
        "Professional",
        "Friendly",
        "Short"
    ];

    for (let i = 0; i < 3; i++) {
        const reply = parsed.replies[i];

        if (
            !reply ||
            typeof reply.text !== "string" ||
            reply.text.trim().length === 0 ||
            reply.tone !== expectedTones[i]
        ) {
            throw new ExpressError(
                "AI returned invalid reply structure",
                500
            );
        }

        const wordCount =
            reply.text.trim().split(/\s+/).length;

        if (wordCount >= 20) {
            throw new ExpressError(
                "AI returned a reply exceeding the word limit",
                500
            );
        }
    }

    // =========================================================
    // RETURN
    // =========================================================

    return parsed;
};


const careerChat = async (userId, message) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new ExpressError("User not found", 404);
    }

    const prompt = `
You are the AI career assistant for an application called CareerFlow.

CareerFlow is a professional networking and career platform.

Your job is ONLY to help with topics related to:

- Career development
- Job searching
- Resume and CV improvement
- LinkedIn/profile improvement
- Professional networking
- Interview preparation
- Technical interview preparation
- DSA preparation
- Software engineering careers
- Skills to learn
- Career paths
- Job roles
- Professional communication
- Workplace communication
- Career planning
- Learning roadmaps
- Projects and portfolios
- Professional posts
- Professional profiles

User information:

Name: ${user.name}
Headline: ${user.headline || "Not provided"}
Bio: ${user.bio || "Not provided"}
Skills: ${user.skills?.length ? user.skills.join(", ") : "None"}

STRICT SCOPE RULE:

If the user's question is NOT related to CareerFlow or career/professional topics,
return exactly:

OUT_OF_SCOPE

If the question IS related to CareerFlow:

- Give a concise and practical answer.
- Maximum 180 words.
- Use short paragraphs.
- Use numbered lists when explaining multiple steps.
- Use bullet points when useful.
- Use **bold** around important words, skills, technologies, or actions.
- Do NOT use Markdown headings.
- Do NOT use #, ##, or ### anywhere.
- Do NOT use Markdown tables.
- Do NOT use HTML.
- Do NOT use code blocks.
- Do NOT repeat the user's question.
- Do not invent information about the user.
- If user-specific information is missing, clearly say so.
- Focus only on the most important actionable advice.
- Keep each point short and easy to scan.

IMPORTANT FORMATTING:

Instead of:

### High-Impact Projects

write:

High-Impact Projects

Instead of:

### Why These Stand Out

write:

Why These Stand Out

Do NOT put # before any heading.

Use this structure when appropriate:

Title

1. **Important point**
Short explanation.

2. **Important point**
Short explanation.

Key Takeaways

- **Important skill** – short explanation.
- **Important action** – short explanation.
- **Important improvement** – short explanation.

User question:

${message}
`;

    const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        reasoning_effort: "low",
        max_completion_tokens: 700,
    });

    const content = response.choices?.[0]?.message?.content?.trim();

    if (!content) {
        throw new ExpressError(
            "AI failed to generate response",
            500
        );
    }

    if (content === "OUT_OF_SCOPE") {
        return {
            type: "out_of_scope",
            message: "This question is outside the scope of CareerFlow.",
        };
    }

    return {
        type: "answer",
        message: content,
    };
};

module.exports = { generateProfileSummary, improvePost, generateJobSuggestions, replySuggestion, careerChat };