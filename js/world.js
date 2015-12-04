//import "urlmanager.js";

function World(adjacent_worlds, home_player, active_player){
  this.adjacentWorlds = {};
  this.homePlayer = "";
  this.activePlayer = "";
  this.Db = new Firebase("https://shining-torch-8736.firebaseio.com/");

  if(typeof adjacent_worlds != undefined) this.adjacentWorlds = adjacent_worlds;
  if(typeof homePlayer != undefined) this.homePlayer = home_player;
  if(typeof activePlayer != undefined) this.activePlayer = active_player;
}

World.prototype.ProcessUrl = function(){
  var params = UrlManager.getUrlParam();
  if(params.id) this.activePlayer = params.id;
}

World.prototype.AddLocalPlayer = function(){
  var player = new LocalPlayer('jack', 'jack', 'jack', this.Db);
}



World.prototype.SyncActivePlayers = function(){console.log("sync active players");}
World.prototype.RemoveLocalPlayer = function(){console.log("remove local player");}
