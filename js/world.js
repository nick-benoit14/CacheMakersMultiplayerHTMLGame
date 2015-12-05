
function World(adjacent_worlds, home_player){
  this.WORLDS = "worlds4", this.PLAYERS = "players";

  this.adjacentWorlds = {};
  this.homePlayer = "";
  this.activePlayer = "";
  this.Db = new Firebase("https://shining-torch-8736.firebaseio.com/");
  this.Players = [];
  this.pollRef, this.pollInt = 200;

  if(typeof adjacent_worlds != undefined) this.adjacentWorlds = adjacent_worlds;
  if(typeof homePlayer != undefined) this.homePlayer = home_player;
}

World.prototype.ChangeWorld = function(direction){
  if(direction == 'top'){window.location.assign(this.adjacentWorlds.top);}
  else if(direction == 'bottom'){window.location.assign(this.adjacentWorlds.bottom);}
  else if(direction == 'right'){window.location.assign(this.adjacentWorlds.right);}
  else if(direction == 'left'){window.location.assign(this.adjacentWorlds.left);}
  else console.log("Not Valid Direction");
}


World.prototype.AddLocalPlayer = function(id, home_url, current_world, db_ref, world_ref, callback, bindings, poll){
  var player = new LocalPlayer(id, home_url, current_world, db_ref, world_ref, callback, bindings, poll);
  this.Players.push(player);
}

World.prototype.AddVisitingPlayer = function(id, home_url, current_world, db_ref, world_ref, callback, bindings, poll){
  var player = new VisitingPlayer(id, home_url, current_world, db_ref, world_ref, callback, bindings, poll);
  this.Players.push(player);
}

World.prototype.Init = function(bindings){ //set active player, Add Local Player
  var params = UrlManager.getUrlParam();
  if(params.id){this.activePlayer = params.id;}
  else{this.activePlayer = $('.cacheMakersPlayer').attr('id');}
  $('.cacheMakersPlayer').each(function(){$(this).remove();});
  this.AddLocalPlayer(this.activePlayer, undefined, this.homePlayer, this.Db,this, undefined, bindings);

  UrlManager.addUrlParams(this.adjacentWorlds, {id:this.activePlayer});
  this.SyncActivePlayers();
}


World.prototype.SyncActivePlayers = function(){
  var worldRef = this;

  this.Db.child(this.WORLDS).child(this.homePlayer).child('active_players').on('child_added', function(snapshot){AddPlayer(snapshot, worldRef);}); //Listen for Data Change
  this.Db.child(this.WORLDS).child(this.homePlayer).child('active_players').on('child_removed', function(snapshot){RemovePlayer(snapshot, worldRef);}); //Listen for Data Change

  var RemovePlayer = function(snapshot, world){    
    for(i = 0; i < world.Players.length; i++){
      if(world.Players[i].Id == snapshot.val().name){
        world.Players[i].RemoveSelf(world.Players[i]);
        world.Players.splice(i,1);
      }}}

  var AddPlayer = function(snapshot, world){
    if(snapshot.exists()){
      var data = snapshot.val();
      for(i = 0; i < world.Players.length; i++){ //Check to see if player already exists
        if(world.Players[i].Id == data.name){
           return; //Player already exists
        }}

      var id = snapshot.val().name, home_url = undefined, current_world = world.homePlayer;
      world.AddVisitingPlayer(id, home_url, current_world, world.Db, world);
    }else console.log("Not Connecting to Database");}
}
