module.exports= (Sequelize,Datatypes) => {
    const alias = "Message"
    const cols = {
    id:{
        primaryKey:true,
        autoIncrement:true, 
        type: Datatypes.INTEGER,
    },
    message:{
        notNull:true,
        type: Datatypes.STRING,
    },
    read :{
        notNull:true,
        type: Datatypes.BOOLEAN,
    },
    read_by :{
        notNull:true,
        type: Datatypes.INTEGER,
    },
    user_id :{
        notNull:true,
        type: Datatypes.INTEGER,
    },
    chat_id :{
        notNull:true,
        type: Datatypes.INTEGER,
    }
    
    }
    
     const config = {
         timestamps: true,
     }
    
     
    const Message = Sequelize.define(alias,cols,config)

    Message.associate=function(models){
        Message.belongsTo(models.Chat, {
            as:"Chat",
            foreignKey:"chat_id"
        }),
        Message.belongsTo(models.User, {
            as:"User",
            foreignKey:"user_id"
        })
      }
  
    return Message
}