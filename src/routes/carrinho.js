const router = require("express").Router();

function isAuthorized(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect("/google");
    }
}

router.get("/", isAuthorized, (req, res) => {
    res.render("carrinho", {
        user: req.user,
    });
});

module.exports = router;
