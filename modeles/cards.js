const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({

          title:{
            type: String,
            require:true,
          },
          textBody:{

            type:String,
            require:true,
          },
          userId:{
            type : String,
            require:true,
          },
          username:{
            type:String,
            require:true,
          },
         isCompleted:{
            type:Boolean,
            require:false,
          },
          creationTime:{
                 type:Date,
                 require:true,
          } 
        

});
  
module.exports = mongoose.model("cards",cardSchema);
