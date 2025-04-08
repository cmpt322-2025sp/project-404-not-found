const CoreFunctions = require("../core/CoreFunctions");

const getCSRF = (req, res) => {
    if(req.headers['sec-fetch-site'] === 'same-site'){
        const csrf = CoreFunctions.generateToken(56);
        req.session.csrf = csrf;
        res.json({ csrf: csrf });
    }else{
        res.status(403).json({ error: 'Invaid Entry' });
    }
};

module.exports = getCSRF;