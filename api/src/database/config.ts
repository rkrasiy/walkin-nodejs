import mongoose, { Connection, Schema } from "mongoose";

const tenantIdToConnection:Record<string, Connection> = {};

const dbConnection = async(databaseName: string, modelName: string, schema: Schema)=>{
  try{

    if(!tenantIdToConnection[databaseName]){
      tenantIdToConnection[databaseName] = await mongoose.createConnection(process.env.MONGODB_URL!, {
        dbName: databaseName
      }).asPromise();
    }
    
    return tenantIdToConnection[databaseName].model(modelName, schema);

  }catch(err){
    throw new Error('Database doesn\'t exist');
  }
}

export default dbConnection;
