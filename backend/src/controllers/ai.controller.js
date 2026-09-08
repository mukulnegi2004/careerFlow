const aiService = require("../services/ai.service");

const profileSummary = async (req, res) => {
    const summary = await aiService.generateProfileSummary(req.user.userId);

    res.status(200).json({
        success: true,
        message: "profile summary genrated successfully",
        summary
    })
}

const improvePost = async (req, res) => {
    const improvedPost = await aiService.improvePost(req.body.content);

    res.status(200).json({
        success: true,
        message: "Post improved successfully",
        content: improvedPost
    })
}

const jobSuggestions = async(req, res) => {
    const suggestions = await aiService.generateJobSuggestions(req.user.userId);

    res.status(200).json({
        success: true,
        message: "Job suggestions generated successfully",
        ...suggestions
    })
}

const replySuggestion = async(req, res) => {
    const suggestions = await aiService.replySuggestion(req.user.userId, req.params.chatId);

    return res.status(200).json({
        success: true,
        suggestions
    })
}

const careerChat = async (req, res) => {
    const { message } = req.body;

    const reply = await aiService.careerChat( req.user.userId, message);

    return res.status(200).json({
        success: true,
        reply
    });
};

module.exports = {profileSummary, improvePost, jobSuggestions, replySuggestion, careerChat};


