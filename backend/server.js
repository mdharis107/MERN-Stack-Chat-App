const express = require("express");

const app = express();

app.get("/",(req,res)=>{
    res.send("this is the Home page")
})

app.listen(8080,console.log("here"))