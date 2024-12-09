require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
  });
  
  module.exports = {
    dbUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
  };
  