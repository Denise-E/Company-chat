module.exports= (Sequelize,Datatypes) => {
    const alias = "Complaint"
    const cols = {
    id:{
        primaryKey:true,
        autoIncrement:true, 
        type: Datatypes.INTEGER,
    },
    description:{
        notNull:true,
        type: Datatypes.STRING,
    },
    file :{
        notNull:true,
        type: Datatypes.STRING,
    },
    user_id :{
        notNull:true,
        type: Datatypes.INTEGER,
    }
    
    }
    
     const config = {
         timestamps: true,
    
     }
    
     
    const Complaint = Sequelize.define(alias,cols,config)

    Complaint.associate=function(models){
        Complaint.belongsTo(models.User, {
            as:"User",
            foreignKey:"user_id"
        })
      }
  
    return Complaint
}