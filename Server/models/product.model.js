const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    }
},{
    versionKey:false
});



const MenModel = mongoose.model("men", productSchema);
const LadiesModel = mongoose.model("ladies", productSchema);
const KidsModel = mongoose.model("kids", productSchema);
const DividendModel = mongoose.model("dividend", productSchema);
const HomeModel = mongoose.model("home", productSchema);
const SaleModel = mongoose.model("sale", productSchema);
const SportModel = mongoose.model("sport", productSchema);

module.exports = {
    MenModel,
    LadiesModel,
    KidsModel,
    DividendModel,
    HomeModel,
    SaleModel,
    SportModel,
}
