const getLogout = (req, res) => {
    req.session.destroy();
    res.json({loggedOut: true});
}

module.exports = getLogout;