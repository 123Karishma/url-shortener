// const User=require("../models/user")

// async function handleCreateUser(req,res){
//     const {name ,email ,password }=req.body
//     await User.create({
//         name,
//         email,
//         password
//     })
//     return res.render("home")
// }

// module.exports={
//  handleCreateUser
// }


const User = require("../models/user")
const { v4: uuidv4 } = require("uuid")
const { setUser } = require("../service/auth")

async function handleCreateUser(req, res) {
    console.log("BODY:", req.body)
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" })
    }

    await User.create({
        name,
        email,
        password
    })

    return res.render("home")
}




async function handleLoginUser(req, res) {
    console.log("BODY:", req.body)
    const { email, password } = req.body
    const user = await User.findOne({ email, password })
    console.log("User", user)
    if (!user) {
        return res.render("login", { error: "invalid email and password " })
    }


    // const sessionId = uuidv4()
    // setUser(sessionId, user)

    const token = setUser(user)
    // res.cookie("uid", token )

    // return res.redirect("/")
     return res.json({token})
}

module.exports = {
    handleCreateUser,
    handleLoginUser,
}
