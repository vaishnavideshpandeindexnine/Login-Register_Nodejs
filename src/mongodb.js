const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/LoginSignup", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 
})
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((error) => {
    console.error("Failed to connect:", error);
  });



const LogInSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const collection=new mongoose.model("collection1",LogInSchema)

module.exports=collection