const MuffinFunctions = require("../core/MuffinFunctions");

const getMuffin = (req, res) => {
    if(req.headers['sec-fetch-site'] === 'same-site'){
        res.json({value: MuffinFunctions.accessMuffin(req.session, req.params.crumble)});
    }else{
        res.status(403).json({ error: 'Invaid Entry' });
    }
}

module.exports = getMuffin;