module.exports= (Sequelize,Datatypes) => {
    const alias = "UserChat"
    const cols = {
    id:{
        primaryKey:true,
        autoIncrement:true, 
        type: Datatypes.INTEGER,
    },
    user_id:{ 
        type: Datatypes.INTEGER,
    },
    chat_id:{ 
        type: Datatypes.INTEGER,
    }

    }
    
     const config = {
         timestamps: true,
    
     }
    
     
    const UserChat = Sequelize.define(alias,cols,config)

  
    return UserChat
    }