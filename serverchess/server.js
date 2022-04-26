const express = require('express');
const cors = require('cors');
const mongo = require('./Mongo.js');
const router = require('./Router');


const app = express();
app.use(cors());
const port = 5000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);

mongo.getIdTournamentCurrent();

app.listen(port,()=>{
    console.log(`Server is runing port${port}`);
})



