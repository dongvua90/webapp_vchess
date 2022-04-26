const express = require('express');
const router = express.Router();
const mongo = require('./Mongo');


router.get('/',(req,res)=>{
    res.send('server is up running');
});

// tạo 1 giải đấu mới 
router.post('/maketour',(req,res)=>{
    if(req.body.name){  // chỉ chấp nhận tạo giải đấu mới khi dữ liệu có trường 'name'
         mongo.makeTournament(req.body).then(function(resuft){
            res.end(resuft);    // trả về id của giải đấu. app-client sẽ gửi các nước đi đến id này
         });
    }
});

// trả lại object là tournament tương ứng với ID tournament

router.get('/tournament',(req,res)=>{
    let id = parseInt(req.query.id);
    // mongo.getTournament(id).then(function(resuft){
    //     res.end(resuft);
    // });
    mongo.getTournament(id).then(function(resuft){
        res.send(resuft);
        // res.end('ok');
    });
});

router.post('/makemove',(req,res)=>{
    mongo.makeMove(req.body).then(function(resuft){
        res.end(resuft);
    });
    res.send("0k");
});

module.exports = router;
// module.exports = initMongodb;