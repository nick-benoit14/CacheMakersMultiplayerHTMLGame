function Player(id, home_url, current_world, db_ref, bindings, poll){
  var WORLDS = "worlds4", PLAYERS = "players";

  this.Id = "";
  this.homeUrl = "";
  this.currentWorld = "";
  this.Bindings = [];
  this.Poll = function(){}
  this.pollRef, this.pollInt = 200;
  this.playerRef;
  this.Db = db_ref;
  this.Players = PLAYERS;
  this.Worlds = WORLDS;

  this.mandatoryPoll = function(){} //All Players do this
  this.mandatoryBind = []; //All Players do this

  if(typeof id != undefined) this.Id = id;
  if(typeof home_url != undefined) this.homeUrl = home_url;
  if(typeof current_world != undefined) this.currentWorld = current_world;
  if(typeof bindings != undefined) this.Bindings = bindings;
  if(typeof poll != undefined) this.Poll = poll;

  var removeSelf = function(player){
    $(window).on('beforeunload', function(){
      if(player){
        clearInterval(player.pollRef);
        player.Db.child(player.Worlds).child(player.currentWorld).child('active_players').child(player.Id).set(null);}
      else console.log("Not Valid Player");
    });}
    this.mandatoryBind.push(removeSelf); //Add remove self from script

 var updateDb = function(player){
   var playerstring = '{"' + player.Id + '": {"position": {"top":"'+ player.playerRef.css('top') + '", "left":"'+ player.playerRef.css('left') + '"}, "name":"' + player.Id + '"}}';
   var obj = JSON.parse(playerstring);
   player.Db.child(player.Worlds).child(player.currentWorld).child("active_players").update(obj);}
 this.mandatoryPoll = updateDb; //add UpdateDb to all Players


 this.AddSelf(this); // Create Self
}

Player.prototype.AddSelf = function(player){  //Append Sprite, Bind Bindings

  var Bind = function(player){ //Bind eventListeners and SetPlayer Interval
    for(i = 0; i < player.Bindings.length; i++){if(typeof player.mandatoryBind[i] == "function")player.mandatoryBind[i](player);}
    for(i = 0; i < player.Bindings.length; i++){player.Bindings[i](player);}

    player.pollRef = setInterval(function(){
      player.mandatoryPoll(player);
      player.Poll();
    }, player.pollInt);
  }


  var AppendSprite = function(sprite_url, player, location){ //Add sprite to page and bind methods
    var Location = {left:"0", top:"0"};
    if(location) Location = location; //Optional Location
    if(sprite_url && player){
      var imgString = '<img src = "' + sprite_url + '" id="' + player.Id + '"  class="cacheMakersPlayer"  style="left:' + Location.left + 'px; top:' + Location.top +'px; position:absolute;">'
      $('body').append(imgString);
      player.playerRef = $('#'+player.Id);
      Bind(player);
    } else console.log("Invalid Sprite Data");
  }


  if(player){
    if(player.currentWorld == player.homeUrl){ //If on home world then send data to DB
      var playerstring = '{"' + player.Id + '": { "name":"' + player.Id + '", "sprite_url":"' + $('#'+player.Id).attr('src') + '"}}';
      var obj = JSON.parse(playerstring);
      player.Db.child(player.Players).update(obj);
      player.playerRef = $('#'+player.Id);
      Bind(player);
    }
    else{ //If visiting world then fetch data
      player.Db.child(player.Players).child(player.Id).once('value', function(snapshot){
        if(snapshot.exists()){
          var sprite_url = snapshot.val().sprite_url;
          if(sprite_url) AppendSprite(sprite_url, player);
          else console.log("Sprite Not Found In Database");
        }
        else console.log("Player Not Found In Database");
      });
    }
  }
}
