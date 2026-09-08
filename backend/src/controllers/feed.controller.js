const feedService = require("../services/feed.service");


const getFeed = async (req, res) => {
    const {page, limit} = req.query;

    const feed = await feedService.getFeedService(req.user.userId, page, limit);

    res.status(200).json({
        success: true,
        feed
    });
}



module.exports = {getFeed};









































