import jwt from 'jsonwebtoken';
import 'dotenv/config';

const generateJWT = async ( uid = '') => {

  return new Promise( (resolve, reject) => {
    const payload = { uid };

    jwt.sign( payload, process.env.SECRETORPRIVATEKEY!, {
      expiresIn: '4h'
    }, (err, token) => {
      if(err){
        console.log(err)
        reject( 'Cant generate JWT' );
      }else{
        resolve( token );
      }
    });

  });

};

export default generateJWT;