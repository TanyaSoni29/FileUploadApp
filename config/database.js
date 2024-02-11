const mongoose = require("mongoose");


require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then( () => console.log("Db connected Successfully"))
    .catch( (err) => {
        console.log("Db connectin faces issues")
        console.log(err); // console.error(err.message) thi8s line can also be used.
        process.exit(1);
    })

}