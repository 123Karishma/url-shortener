const mongoose =require("mongoose")

async function dbConneting (url){
    return mongoose .connect(url)
}

module.exports ={
    dbConneting
}