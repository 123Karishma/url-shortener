const { getUser } = require("../service/auth")
async function restrictuserlogin(req, res, next) {
    // const userUid = req.cookies.uid //now we dont need cookies
    const userUid = req.headers["Authorization"]

    if (!userUid) return res.redirect("/login")

    // const token = userUid.split("Bearer")[1];
    const token = userUid && userUid.split("Bearer")[1];

    // const user = getUser(userUid)
    const user = getUser(token)
    if (!userUid) return res.redirect("/login")
    req.user = user
    next()
}

async function checkAuth(req, res, next) {
    // const userUid = req.cookies.uid
    const userUid = req.headers["Authorizaton"]


    const token = userUid && userUid.split("Bearer")[1];

    const user = getUser(token)
    //  const user = getUser(userUid)
    req.user = user
    next()
}


async function handleChecklimit(req, res, next) {
  // app.use((req, res, next) => {
//     const ipadddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
//     console.log("ipadddress", ipadddress)
//     console.log(`Total Hits:  ${apiHits}`);
//     if (ipadddress === ipadddress && apiHits === MAX_LIMIT && TIME_WINDOW_MS) {
//          apiHits++;
//         next();
//     }
//     else {
//         return res.status(429).json({
//             error: "Too Many Requests",
//             message: "Limit exceeded. Please try again later.",
//         })
//     }

// })

}

module.exports = {
    restrictuserlogin,
    checkAuth
}