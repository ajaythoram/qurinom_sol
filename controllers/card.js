const Joi = require('joi');
const Card = require("../modeles/cards");


// creating card

 const creatCard = async(req,res) =>{
     
    const isValid = Joi.object({
        title:Joi.string().required(),
        textBody:Joi.string().required(),
    }).validate(req.body);

    if(isValid.error){

        return res.status(400).send({
            status:400,
            message:"Invalid Input",
            data:isValid.error,
        });
    }

     const {title,textBody} = req.body;
     const cardObj = new Card({
        title,
        textBody,
        username:req.locals.username,
        userId:req.locals.userId,
        creationTime:new Date(),
      isCompleted:false,
     });

      try{
        await cardObj.save();
        res.status(200).send({
            status :200,
            message :"Sussefully created",
        })

      }
      catch(err){
        return res.status(400).send({
            status:400,
            message:"failed to create card",
            data : err
        })
      }

 }

 // getting card for user


 

 const getUsercard  = async(req,res) =>{
          const userId = req.locals.userId;
          const page = Number(req.query.page)||1;
          const LIMIT = 10;
          let cardData;
          try{
           cardData = await Card.find({userId})
           .sort({creationTime: -1})
           .skip((page-1)*LIMIT)
           .limit(LIMIT);
          }
          catch(err){

            return res.status(400).send({
                status:400,
                message:"Failed to get data from db",
                data : err,
            })
          }
          res.status(200).send({
            status:200,
            message:"Fetched data successfully",
            data:cardData
          })
 };  

 // deletCard


 const deletCard = async (req,res) =>{
      
    const userId = req.locals.userId;
    const cardId = req.params.cardId;
    let CardData;
     
    try{
             CardData = await Card.findById(cardId);

             if(!CardData){
                return res.status(400).send({
                    status:400,
                    message:"Card does not exist",
                })
             }
             if(CardData.userId != userId){
                return res.status(400).send({
                    status:400,
                    message:"Unauthorizd to delet card"
                })
             }
    }
    catch(err){
        return res.status(400).send({
            status:400,
            message:"Error in deleting blog",
            data : err,
        })
    }

    try{
    
              await Card.findByIdAndDelete(cardId);
              return res.status(200).send({
                status:200,
                message:"Card deleted successfully"
              })
    }
    catch(err){
        return res.status(400).send({
            status: 400,
            message: "Failed to delete Card",
            data: err,
          });
    }

 }

 // editCard

  const editCard = async(req,res) =>{
    const isValid = Joi.object({
        cardId:Joi.string().required(),
        title:Joi.string().required(),
        textBody:Joi.string().required(),
    }).validate(req.body);

    if(isValid.error){
        return res.status(400).send({
            status:400,
            message:"Inavlid input",
            data : isValid.error,
        });
    }
     const {cardId,title,textBody} = req.body;
     const userId = req.locals.userId;
     let cardData;

     try{
               cardData = await Card.findById(cardId);
               if(!cardData){
                return res.status(404).send({
                    status: 404,
                    message: "Card dosen't exist!",
                  });
               }
               if(cardData.userId != userId){
                return res.status(404).send({
                    status: 404,
                    message: "Unauthorized to access",
                  });
               }
     }
     catch(err){
        return res.status(404).send({
            status: 404,
            message: "Failed to update the blog",
            data : err,
          });
     }
     
     const cardObj = {
        title,
        textBody,
     };
     try{
            await Card.findByIdAndUpdate(cardId,cardObj)
            return res.status(200).send({
                status: 200,
                message: "Blog updated successfully",
              });
     }
     catch(err){
        return res.status(400).send({
            status: 400,
            message: "Failed to update card",
            data: err,
          });
     }


  }

 module.exports = {
    creatCard,
    getUsercard,
    deletCard,
};
