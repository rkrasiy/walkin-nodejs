import mongoose from "mongoose";

const dbConnection = async()=>{
  try{
    await mongoose.connect(`mongodb://${process.env.DB_ADMIN_USERNAME}:${process.env.DB_ADMIN_USERPASS}@schd-database/`,
      { 
        dbName: 'schedule-track'
      }
    );

    console.log('Has been connected to DataBase');
  }catch(err){
    console.log(err)
    throw new Error('Error a la hora de iniciar la base de datos');
  }
}

export default dbConnection;