require("dotenv").config();
module.exports={
    MONGO_URI:process.env.DB_PRODUCTION,
    swtSecret:process.env.JWT_SECRET
}
