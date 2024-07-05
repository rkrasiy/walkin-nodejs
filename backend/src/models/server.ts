import cors from 'cors';
import dbConnection from '../database/config';
import express,{ Application } from 'express';
import cron from 'node-cron';
import authRoutes from '../routes/auth.routes';
import userRoutes from '../routes/user.routes';
import managerRoutes from '../routes/manager.routes';
import serviceRoutes from '../routes/service.routes';
import quotesRoutes from '../routes/quote.routes';
import appointmentsRoutes from '../routes/appointments.routes';
import quotesModel from './quotes.model';

class Server {
  app: Application;
  port: string;
  usersPath: string;
  authPath: string;
  managerPath: string;
  servicePath: string;
  quotesPath: string;
  appointmentsPath: string;

  constructor() {
    this.app = express();
    this.port = '9080';
    this.usersPath = '/api/users';
    this.authPath = '/api/auth';
    this.managerPath = '/api/managers';
    this.servicePath = '/api/services';
    this.quotesPath = '/api/quotes';
    this.appointmentsPath = '/api/appointments';

    //DataBase connection
    this.connectionDB();

    //Middlewears
    this.middlewears();

    //App router
    this.routes();

    // Run unconfirmed quotes
    this.scheduleCronJob();
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
    this.app.use(this.quotesPath, quotesRoutes);
    this.app.use(this.appointmentsPath, appointmentsRoutes);
  }

  scheduleCronJob() {
    cron.schedule('*/1 * * * *', async () => {
      const expirationTime = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago

      try {
        //Delete expired unconfirmed appointments.
        await quotesModel.deleteMany({ confirmed: false, created_on: { $lt: expirationTime } });
        
      } catch (error) {
        console.error('Error deleting expired unconfirmed appointments:', error);
      }
    });
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log(`App is running on port: ${this.port}`)
    })
  }
}

export default Server;