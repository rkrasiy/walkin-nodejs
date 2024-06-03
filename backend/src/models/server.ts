import cors from 'cors';
import dbConnection from '../database/config';
import express,{Application} from 'express';
import authRoutes from '../routes/auth.route';
import userRoutes from '../routes/user.route';
import managerRoutes from '../routes/manager.route';
import serviceRoutes from '../routes/service.route';


class Server {
  app: Application;
  port: string;
  usersPath: string;
  authPath: string;
  managerPath: string;
  servicePath: string;

  constructor() {
    this.app = express();
    this.port = '6500';
    this.usersPath = '/api/users';
    this.authPath = '/api/auth';
    this.managerPath = '/api/managers';
    this.servicePath = '/api/services';

    //DataBase connection
    this.connectionDB();

    //Middlewears
    this.middlewears();

    //App router
    this.routes();
  }

  async connectionDB(){
    await dbConnection();
  }

  middlewears(){

    //CORS
    this.app.use( cors() );

    //Read & Parse body request
    this.app.use( express.json() );

    //Public directory
    this.app.use( express.static('public') );
  }

  routes(){
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.usersPath, userRoutes);
    this.app.use(this.managerPath, managerRoutes);
    this.app.use(this.servicePath, serviceRoutes);
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log(`App is running on port: ${this.port}`)
    })
  }
}

export default Server;