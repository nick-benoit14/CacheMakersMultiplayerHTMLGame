
function World(adjacent_worlds, home_player, active_player){
  this.WORLDS = "worlds4", this.PLAYERS = "players";

  this.adjacentWorlds = {};
  this.homePlayer = "";
  this.activePlayer = "";
  this.Db = new Firebase("https://shining-torch-8736.firebaseio.com/");
  this.Players = [];
  this.pollRef, this.pollInt = 200;

  if(typeof adjacent_worlds != undefined) this.adjacentWorlds = adjacent_worlds;
  if(typeof homePlayer != undefined) this.homePlayer = home_player;
  if(typeof activePlayer != undefined) this.activePlayer = active_player;
}

World.prototype.ProcessUrl = function(){
  var params = UrlManager.getUrlParam();
  if(params.id) this.activePlayer = params.id;
}

World.prototype.GetPlayerInfo = function(){console.log("get player info");} //Find Active Player, create new Local Player
World.prototype.AddLocalPlayer = function(){
  var player = new LocalPlayer('jack', 'jack', 'jack', this.Db);
  this.Players.push(player);
}

World.prototype.AddVisitingPlayer = function(){
  var player = new VisitingPlayer('sonic', 'sonic', 'jack', this.Db, function(player){}); //id, home_url, current_world, db_ref, bindings, poll
  this.Players.push(player);
}


World.prototype.SyncActivePlayers = function(){
  console.log("sync active players");
  var worldRef = this;

  this.Db.child(this.WORLDS).child(this.homePlayer).on('value', function(snapshot){Route(snapshot, worldRef);}); //Listen for Data Change


  var Route = function(snapshot, world){
    /*
    var newLength = 0;
    if(typeof snapshot !== 'undefined') newLength = Object.keys(snapshot.val().active_players).length;
    var Length = world.Players.length;

    if(newLength < Length){
      console.log("new length: " + newLength)
      console.log("Remove Player");
    }
    else if(newLength > Length){
      console.log("new length: " + newLength)
      console.log("Add Player");
    }
    else console.log("Data has been return unchanged");
    */
  }

  var removePlayer = function(){}
  var addPlayer = function(){}


  //setInterval(dataChanged(this), this.pollInt)
}

//GetPlayerInfo - get playerID if on home world, Process Url
//SyncActivePlayer - Add players that have been added, remove players that have gone,

//Added player.RemoveSelf(player)
