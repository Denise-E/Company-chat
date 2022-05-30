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
    }
    
    }
    
     const config = {
         timestamps: true,
    
     }
    
     
    const Complaint = Sequelize.define(alias,cols,config)

  
  
    return Complaint
}