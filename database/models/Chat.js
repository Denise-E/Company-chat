module.exports= (Sequelize,Datatypes) => {
    const alias = "Chat"
    const cols = {
    id:{
        primaryKey:true,
        autoIncrement:true, 
        type: Datatypes.INTEGER,
    }
    }
    
     const config = {
         timestamps: true,
    
     }
    
     
    const Chat = Sequelize.define(alias,cols,config)
  
    
    Chat.associate=function(models){
        Chat.hasMany(models.Message, {
            as:"Message",
            foreignKey:"chat_id"
        })
      }
  
  
    return Chat
    }