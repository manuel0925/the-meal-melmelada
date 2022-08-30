
const express = require('express');
const morgan = require('morgan')
const cors = require('cors');

const RootRouter = require('./routes');


class App {
  app = express();
  PORT = process.env.PORT || 3004
  allowedOrigins = [
    'http://localhost:5173',
    'http://yourapp.com'
  ];
  
  constructor (){ }

  middleware(){
    
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(morgan('dev'));
    this.app.use(cors({
      origin: this.allowedOrigins
    }))

  }

  async initRoutes (){
    this.app.use(`/api`,RootRouter)

    // * 404 error
    this.app.use(function(req,res){
      res.status(404).json({error:'nop baby'});
    });

    // * 500 error
    this.app.use(function(error, req, res, next) {
      console.log(`error`, error)
      res.status(500).send('500: Internal Server Error');
    });
  }

  async init(){
    this.initRoutes();
    this.middleware();
    
    try {
      this.app.listen(this.PORT)
      console.log(`Server running on port ${this.PORT}`)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new App()