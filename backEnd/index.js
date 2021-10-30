const express = require("express");
const app = express();

const dotenv = require("dotenv");
const morgen = require("morgan");
const cors = require("cors");
const path = require("path");

//routers requiring
const authRouter=require('./routes/auth');
const picRouter=require('./routes/pics');
const categoryRouter=require('./routes/categories');
const permissionRouter=require('./routes/premission');
const passwordRouter=require('./routes/password');

//configs
dotenv.config();

//middleware
app.use(express.json());
app.use(morgen("common"));
app.use(cors());

// middleware routers
app.use("/api/images/imagesSrc", express.static(path.join(__dirname, "public/images/imageSrc/")));  //for getting pics
app.use("/api/secretMode", express.static(path.join(__dirname, "public/user/secretMode.json"))); //for getting secretMode stat

app.use('/api/auth',authRouter)
app.use('/api/pic',picRouter)
app.use('/api/category',categoryRouter)
app.use('/api/premissionsModes',permissionRouter)
app.use('/api/password',passwordRouter)

const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`Backend server is running on ${port}!`);
});