const jwt = require('jsonwebtoken');
const UserFunctions = require("../core/UserFunctions");
const { UpdateDocument } = require("../core/DatabaseFunctions");

const postLogin = async (req, res) => {
    if (req.headers.origin === process.env.FRONTEND_URL) {
        try {
            const login = await UserFunctions.loginUser(req.body.email, req.body.h_password);

            if (login.authenticated) {
                const payload = {
                    userId: login.user_id,
                    userFirstName: login.first_name,
                    isAdmin: login.admin
                };

                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

                if (login.user_id > 0) {
                    await UpdateDocument('users', { email: req.body.email }, { last_login: new Date() });
                }

                res.json({ loggedIn: true, adminLoggedIn: login.admin, userId: login.user_id, userFirstName: login.first_name, token: token });
            } else {
                res.json({ loggedIn: false, error: login.error });
            }
        } catch (error) {
            res.status(500).json({ error: 'Server error during login.' });
        }
    } else {
        res.status(403).json({ error: 'Invalid Entry: Origin' });
    }
};

module.exports = postLogin;