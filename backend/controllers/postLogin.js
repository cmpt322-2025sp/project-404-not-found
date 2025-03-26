const UserFunctions = require("../core/UserFunctions")
const { UpdateDocument } = require("../core/DatabaseFunctions")

const postLogin = async (req, res) => {
    if(req.headers['sec-fetch-site'] === 'same-site'){
        if(req.session.csrf === req.headers.csrf && req.session.csrf === req.body.csrf && req.headers.csrf === req.body.csrf){
            const login = await UserFunctions.loginUser(req.body.email, req.body.h_password);
            if(login.authenticated){
                req.session.isLoggedIn = true;
                req.session.isAdmin = login.admin;
                // UpdateDocument('users',{ email: req.body.email }, { last_login: new Date() });
                res.json({ loggedIn: true, adminLoggedIn: login.admin });
            }else{
                res.json({ loggedIn: false, error: login.error });
            }
        }else{
            res.status(403).json({ error: 'Invaid Entry' });
        }
    }else{
        res.status(403).json({ error: 'Invaid Entry' });
    }
};

module.exports = postLogin;