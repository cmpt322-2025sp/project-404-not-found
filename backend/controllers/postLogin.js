const UserFunctions = require("../core/UserFunctions")
const { UpdateDocument } = require("../core/DatabaseFunctions")

const postLogin = async (req, res) => {
    if(req.headers.origin === process.env.FRONTEND_URL){
        if(req.session.csrf === req.headers.csrf && req.session.csrf === req.body.csrf && req.headers.csrf === req.body.csrf){
            const login = await UserFunctions.loginUser(req.body.email, req.body.h_password);
            if(login.authenticated){
                req.session.isLoggedIn = true;
                req.session.isAdmin = login.admin;
                req.session.userId = login.user_id;
                req.session.userFirstName = login.first_name;
                if (login.user_id > 0){
                    UpdateDocument('users',{ email: req.body.email }, { last_login: new Date() });
                }
                res.json({ loggedIn: true, adminLoggedIn: login.admin, userId: login.user_id, userFirstName: login.first_name });
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