const { UpdateDocument } = require("../core/DatabaseFunctions")

const postAutoSaveProgress = async (req, res) => {
    if(req.headers.origin === process.env.FRONTEND_URL){
        if(req.session.csrf === req.headers.csrf && req.session.csrf === req.body.csrf && req.headers.csrf === req.body.csrf){
            try {
                await UpdateDocument('completions', {user_id: req.body.user_id, assignment_id: req.body.assignment_id}, {game_string: req.body.game_string, eggs_collected: req.body.eggs_collected})
                res.json({ status: true })
                return null
            } catch {
                res.status(500).json({ status: false, error: 'An error occurred while saving progress.' })
            }
        }
    }
}

module.exports = postAutoSaveProgress