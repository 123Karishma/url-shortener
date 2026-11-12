const express = require("express")
const { dbConneting } = require("./connetion")
const URL = require("./models/url")
const { rateLimit } = require('express-rate-limit');

const path = require("path")
const cookieparser = require("cookie-parser")
const { restrictuserlogin, checkAuth } = require("./middleware/auth")
const app = express()
const PORT = 8000
const useUrlRoutes = require("./routes/url")
const useRoutes = require("./routes/users")
const staticRoute = require("./routes/staticRouter")
// const { timeStamp } = require("console")

//mongodb cnection
dbConneting("mongodb://localhost:27017/shorturl").then(() => { console.log("mongodb connected ") })

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieparser())


// app.get("/test",(req,res)=>{
//     return res.end("<h1>hey from the server </h1>")
// })


// let apiHits = 0
// const Time_limit = 30 * 1000;
// const Max_Limit = 6;
//  const currentTime = Date.now();

// setInterval(() => {
//     apiHits = 0;
// }, Time_limit);


// app.use((req, res, next) => {

//     const ipadddress =
//         req.ip ||
//         req.headers['x-forwarded-for']

//     if (apiHits < Max_Limit && currentTime < Time_limit ) {

//         apiHits++;
//         console.log("ipadddress ",ipadddress )
//         console.log("apiHits",apiHits)

//         next();

//     } else {

//         return res.status(429).json({
//             error: "Too Many Requests",
//             message: "Limit time exceeded. Please try again later.",
//         });
//     }
// });


// let apiHits = 0
// const Time_limit = 30 * 1000;
// const Max_Limit = 6;

// let startTime = Date.now();

// setInterval(() => {
//     apiHits = 0;
//     startTime = Date.now();

//     // console.log("30 seconds completed");
//     // console.log("Request count reset");
// }, Time_limit);

// app.use((req, res, next) => {

//     const ipadddress =
//         req.ip ||
//         req.headers['x-forwarded-for']

//     const currentTime = Date.now();

//     if (
//         apiHits < Max_Limit &&
//         (currentTime - startTime) < Time_limit
//     ) {

//         apiHits++;

//         console.log("ipadddress ", ipadddress)
//         console.log("apiHits", apiHits)
//         console.log(`Only ${Max_Limit - apiHits} requests left in 30 sec`);

//         next();

//     } else {

//         console.log("30 sec limit exceeded");
//         console.log("Only 6 requests allowed in 30 seconds");

//         return res.status(429).json({
//             error: "Too Many Requests",
//             message: "Limit time exceeded. Please try again later.",
//         });
//     }
// });

// Define rate-limiting rules
const limiter = rateLimit({
  windowMs: 30 * 1000, // 30 sec  minutes window
  limit: 6,                // Max 6 requests per IP per window
  message: 'Too many requests from this IP, please try again later.',
  statusCode: 429,          // Standard HTTP status code
  standardHeaders: 'draft-8', // Returns rate limit info in 'RateLimit' headers
  legacyHeaders: false,     // Disables older 'X-RateLimit-*' headers
});

// Apply the limiter globally to all incoming routes
app.use(limiter);

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls
    })
})


// app.use("/something"  ,restrictuserlogin,staticRoute) use restictuserlogin to  in thi url if want anything to acess u need to 1stt login then only can acess
app.use("/url", restrictuserlogin, useUrlRoutes)
app.use("/user", useRoutes)
app.use("/", checkAuth, staticRoute)

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push: {
                totalClicks: {
                    timeStamp: Date.now(),
                }
            },

        }

    );
    res.redirect(entry.redirectURL)
})



app.listen(PORT, () => console.log(`server is runing on ${PORT}`))