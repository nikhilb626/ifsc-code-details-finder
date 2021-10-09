const express=require("express");
const path=require("path");
const bodyParser=require("body-parser");
const ifsc=require("ifsc");

const PORT=4000;

const app=express();

const templatePath=path.join(__dirname,"../templates/views");

app.set("view engine","hbs");
app.set("views",templatePath);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render( "index",{title:"iFsC code info finder"});
});

app.post("/ifsc",(req,res)=>{
    var code=req.body.ifsc;
    if(ifsc.validate(code)){
        ifsc.fetchDetails(code).then(function(response)
        {
            res.render("index",{heading:"The information is below",response:response});
        })
    }else{
        res.send("ifsc is wrong...");
    }
})



app.listen(PORT,()=>{
    console.log("connected successfully...");
});