const { default: mongoose } = require('mongoose');
const mongosee = require('mongoose');
const Schema = mongosee.Schema;



const adminSchema = new Schema ({
    adminId:{
        type:String,
        required: true
    },
    adminName:{
        type: String,
        required:true
    },
    adminAge:{
        type: Number,
        required: true
    },

    adminGender:{
        type: String,
        required: true
    },

    adminPassword:{
        type: String,
        required: true
    }

    

});

const Admin = mongoose.model("Admin",adminSchema);

module.exports = {
    Admin
}