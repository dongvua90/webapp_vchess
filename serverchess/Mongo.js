const {MongoClient,ObjectId} = require('mongodb');
var uri ="mongodb+srv://dongvua90:19101990@mern-leaning.srf3v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var client = new MongoClient(uri);
var tourCollection = new MongoClient(uri).db("chess").collection("tournament");

var currentTournament=-1;

// lấy ID tournament cuối cùng đã phát hành. mỗi ID tournament phải là duy nhất
exports.getIdTournamentCurrent = async function(){
    await client.connect();
    const resuft = await client.db("chess").collection("tournament").findOne({_id:999999});
    if(resuft){
        currentTournament = resuft.currentTournament;
        console.log("ID tournament current:"+currentTournament);
    }else{
        console.log(`Error! Cannot get ID Tournament current`);      
    }
}

function game(whitename,blackname){
    this.playwhite=whitename;
    this.playblack=blackname;
    this.fens=[];
  }
  function round(){
    this.games=[];
  }
  function tournament(name,descript){
    this.name=name;
    this.descript=descript;
    this.rounds =[];
  }

  // tạo 1 giải đấu mới
exports.makeTournament = async function(tour){
    tour._id = currentTournament;  // gán id tournament  
    currentTournament++;            // tăng id lần sau
    await client.connect();
    const resuft = await  client.db("chess").collection("tournament").insertOne(tour);
    // lưu lại id tournament curent vào database
    await client.db("chess").collection("tournament").updateOne({_id:999999},{$set:{currentTournament:currentTournament}});
    let ret = "id:"+tour._id;
    return ret;  // trả lại id giải đấu.
}

// ghi 1 nước đi vào database.biến phải bao gồm id của tournament->games->fens=fen
exports.makeMove = async function(move){
    let addr="rounds."+move.idRound+".games."+move.idGame+".fens."+move.idFen;
    await client.connect();
    const resuft = await  client.db("chess").collection("tournament")
    .updateOne({_id:move.idTournament},{$set:{[addr]:move.fen}});
    if(resuft){
        return "ok";
    }else{
        return "error";     
    }
}

exports.getTournament = async function(idtour){
    console.log("id="+idtour);
    await client.connect();
    const resuft = await client.db("chess").collection("tournament")
    .findOne({_id:1});
    if(resuft){
        console.log("resuft="+resuft.name);
        return resuft;
    }else{
        console.log("error get tournament");
        return "error";    
    }
}

//  async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

// exports.createListing = async function createListing(newListing){
//     console.log("start creating listing");
//     await client.connect();
    
//     const resuft = await  client.db("chess").collection("tournament").insertOne(newListing);
//     console.log(`New listing creating whith the following id:${resuft.insertedId}`);
//  }


//  exports.main =async function main(){
//     try {
//         await client.connect();
//         await  listDatabases(client);
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

