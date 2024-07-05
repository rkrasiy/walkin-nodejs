import { Request, Response, NextFunction } from "express"; 

export const switchDatabase = (connection: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const dbName = req.header('x-db-name') || 'default';
    if (connection) {
      req.db = connection.useDb(dbName, { useCache: true });
      console.log(`Switched to database: ${dbName}`);
    }
    next();
  };
};