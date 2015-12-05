function Player(id, home_world, current_world, db_ref, world_ref, callback,  bindings, poll){
  var WORLDS = "worlds4", PLAYERS = "players";
  this.Id = "";
  this.homeWorld = "";
  this.currentWorld = "";
  this.Bindings = [];
  this.Poll = function(){}
  this.pollRef, this.pollInt = 200;
  this.playerRef;
  this.Db = db_ref;
  this.worldRef;
  this.Callback = callback;
  this.Players = PLAYERS;
  this.Worlds = WORLDS;

  this.mandatoryPoll = function(){} //All Players do this
  this.mandatoryBind = []; //All Players do this

  if(typeof id != undefined) this.Id = id;
  if(typeof home_url != undefined) this.homeWorld = home_world;
  if(typeof current_world != undefined) this.currentWorld = current_world;
  if(typeof bindings != undefined) this.Bindings = bindings;
  if(typeof poll != undefined) this.Poll = poll;
  if(typeof world_ref != undefined) this.worldRef = world_ref;

  var removeSelf = function(player){
    $(window).on('beforeunload', function(){
      if(player){
        clearInterval(player.pollRef);
        player.Db.child(player.Worlds).child(player.currentWorld).child('active_players').child(player.Id).set(null);}
      else console.log("Not Valid Player");
    });
  }
    this.mandatoryBind.push(removeSelf); //Add remove self from script

 /*
 this.mandatoryPoll = function(){}; //add Polling Method
*/

 this.AddSelf(this, this.worldRef); // Create Self
}
Player.prototype.RemoveSelf = function(player){
  clearInterval(player.pollRef);
  player.playerRef.remove();
}
Player.prototype.AddSelf = function(player, world){  //Append Sprite, Bind Bindings

  var Bind = function(player){ //Bind eventListeners and SetPlayer Interval
    for(i = 0; i < player.mandatoryBind.length; i++){if(typeof player.mandatoryBind[i] == "function") player.mandatoryBind[i](player, world);}
    for(i = 0; i < player.Bindings.length; i++){player.Bindings[i](player, world);}

    player.pollRef = setInterval(function(){
      player.mandatoryPoll(player);
      player.Poll(player);
    }, player.pollInt);

    if(typeof player.Callback == "function") player.Callback(player);
  }


  var AppendSprite = function(sprite_url, player, world, location){ //Add sprite to page and bind methods
    var Location = {left:"0", top:"0"};
    if(location) Location = location; //Optional Location
    if(sprite_url && player){
      var imgString = '<img src = "' + sprite_url + '" id="' + player.Id + '"  class="cacheMakersPlayer"  style="left:' + Location.left + 'px; top:' + Location.top +'px; position:absolute;">'
      $('body').append(imgString);
      player.playerRef = $('#'+player.Id);
      Bind(player, world);
    } else console.log("Invalid Sprite Data");
  }


  if(player){
    if(player.currentWorld === player.homeWorld){ //If on home world then send data to DB
      var playerstring = '{"' + player.Id + '": { "name":"' + player.Id + '", "sprite_url":"' + $('#'+player.Id).attr('src') + '"}}';
      var obj = JSON.parse(playerstring);
      player.Db.child(player.Players).update(obj);
      player.playerRef = $('#'+player.Id);
      Bind(player, world);
    }
    else{ //If visiting world then fetch data
      player.Db.child(player.Players).child(player.Id).once('value', function(snapshot){
        if(snapshot.exists()){
          var sprite_url = snapshot.val().sprite_url;
          if(sprite_url) AppendSprite(sprite_url, player, world);
          else console.log("Sprite Not Found In Database");
        }
        else console.log("Player Not Found In Database");
      });
    }
  }
}
