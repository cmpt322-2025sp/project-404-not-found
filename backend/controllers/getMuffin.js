const MuffinFunctions = require("../core/MuffinFunctions");

const getMuffin = (req, res) => {
    if(req.headers.origin === process.env.FRONTEND_URL){
        res.json({value: MuffinFunctions.accessMuffin(req.session, req.params.crumble)});
    }else{
        res.status(403).json({ error: 'Invaid Entry: Origin' });
    }
}

module.exports = getMuffin;