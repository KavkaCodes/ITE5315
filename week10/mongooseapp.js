var mongoose = require("mongoose");

//connect to the MongoDB in my local or ATLAS
var url ="mongodb+srv://sumedhudar2000:POGB2dJRfK1DIskL@clustersumedh.ahbjuvz.mongodb.net/";
mongoose.connect(url);
var Schema = mongoose.Schema;
var companySchema = new Schema({"companyName": String,"address": String,"phone": String,"employeeCount": {"type": Number,"default": 0},"country": String});
var Company = mongoose.model("ite53415_companies", companySchema);

// create a new company
var kwikEMart = new Company({companyName: "The Kwik-E-Mart",address: "Springfield",phone: "212-842-4923",employeeCount: 3,country: "U.S.A"});
// save the company
kwikEMart.save()
    .then( function() {
            console.log("The Kwik-E-Mart company was saved to the ite5315_companies collection");
            Company.findOne({ companyName: "The Kwik-E-Mart" }).exec().then(
                (company) => {
                    if(!company) {
                        console.log("No company could be found");
                    } else {
                        console.log(company);
                    }// exit the program after saving and finding
                }).catch((err) => {
                    console.log(`There was an error: ${err}`);
                });
        }
    ).catch(
        err => console.log("There was an error saving the Kwik-E-Mart company")
        ).finally(
        ()=>{
            process.exit();
        }
    );