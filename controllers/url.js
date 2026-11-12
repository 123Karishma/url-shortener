const URL=require('../models/url')
const shortid=require('shortid')



async function handlegeneratedNewUrl(req,res){
const body=req.body
if(!body.url)return res.status(400).json({error:'url is required'})
    const shortID=shortid()
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        totalClicks:[],
        createdBy:req.user._id
    })
    // return res.json({id:shortID})
    return res.render("home",{
        id:shortID
    })
}

module.exports={
    handlegeneratedNewUrl
}