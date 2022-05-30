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
      Chat.belongsTo(models.UserFile, {
          as:"UserFile",
          foreignKey:"chat_id"
      })
    }
  
  
    return Chat
    }