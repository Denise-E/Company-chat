module.exports= (Sequelize,Datatypes) => {
    const alias = "User" 
    const cols = {
    id:{
        primaryKey:true,
        autoIncrement:true, 
        type: Datatypes.INTEGER,
    },
    name:{
        notNull:true,
        type: Datatypes.STRING,
    },
    phone:{
        notNull:true,
        type: Datatypes.INTEGER,
    },
    email:{
        notNull:true,
        type: Datatypes.STRING,
        unique:true,
    },
    password:{
        notNull:true,
        type: Datatypes.STRING,
    },
    file :{
        notNull:false,
        type: Datatypes.STRING,
    }
    
    }
    
     const config = {
         timestamps: true,
     }
    
     
    const User = Sequelize.define(alias,cols,config)
  
    
    User.associate=function(models){
      User.belongsTo(models.UserFile, {
          as:"UserFile",
          foreignKey:"user_id"
      })
    }
  
  
    return User
    }