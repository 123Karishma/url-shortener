// const sessionIdUserMap = new Map() befor we managing state but know we dont have to 

const jwt = require("jsonwebtoken")
const secrte = "karishma@234"

// function setUser(id, user) {
//     sessionIdUserMap.set(id, user)
// }


// function setUser(id, user) {
//     const payload={
//         id ,
//         ...user

//     }
//     return jwt.sign(payload ,secrte)
// }

function setUser(user) {

    return jwt.sign({
        id: user._id,
        email: user.email
    }, secrte)
}
// function getUser(id, user) {
//     return sessionIdUserMap.get(id, user)
// }

function getUser(token) {
    if (!token) return null
    return jwt.verify(token, secrte)
}

module.exports = {
    setUser,
    getUser

}