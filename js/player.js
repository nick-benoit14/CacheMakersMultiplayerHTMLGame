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
















/*
Player = function(playerId, dbRef, currentworld, callback){ //Non local players
  if(typeof callback === undefined)callback = function(){}

  var worlds = "worlds4", players = "players";
  var pollInt = 250;
  var iD = playerId;
  var dB = dbRef;
  var CurrentWorld = currentworld
  var pollRef; //set in Bind

  var createSelf = function(iD, dBRef){ //if all goes well calls createSprite
    if(dBRef){
      dBRef.once("value", function(snapshot){
        if(snapshot.exists()){
          var data = snapshot.child(players).child(iD).val();
          if(data)createSprite(data, iD);
          else console.log("Could Not Retrieve Player Data");}
        else console.log("Not Connecting to DB");//snapshot doesnt exist
  });} else console.log("Not Connecting to DB");}


  var createSprite = function(data, iD){
    var spriteUrl = data.sprite_url;
    if(spriteUrl){
      var imgString = '<img src = "' + spriteUrl + '" id="' + iD + '"  class="cacheMakersPlayer"  style="left:0px; top:0px; position:absolute;">'
      $('body').append(imgString);
    }
    else console.log("Could not find sprite in DB");
    bind($('#' + iD));
  }



  var bind = function(ref){ //TODO bind unload methods
    var pollInt = 250;
    updateDb(ref); //register as active player, start at top:0, left:0

    pollRef = setInterval(function(){
      poll(pollRef, ref);
    }, pollInt);

    $(window).on('beforeunload', function(){ //remove sprite from active players on page unload
      killSelf(ref);
    });
  }

  var killSelf = function(ref){ //remove from DB & remove sprite
    clearInterval(pollRef);
    dB.child(worlds).child(CurrentWorld).child("active_players").child(iD).set(null);
    ref.remove();
  }

  var poll = function(pollRef, ref){ //set on interval by bind
    updateSelf(ref);}

  var updateDb = function(ref){ // add self as active player in world
    var playerstring = '{"' + playerId + '": {"position": {"top":"'+ ref.css('top') + '", "left":"'+ ref.css('left') + '"}, "name":"' + playerId + '"}}';
    var obj = JSON.parse(playerstring);
    dB.child(worlds).child(CurrentWorld).child("active_players").update(obj);}

  var updateSelf = function(ref){//if not active remove self, detect edges, move self if NPC
    dB.once('value', function(snapshot){
      if(snapshot.exists()){
        var position = snapshot.child(worlds).child(CurrentWorld).child("active_players").child(iD).child("position").val();
        if(position){
          ref.css('top', parseInt(position.top));
          ref.css('left', parseInt(position.left));}
        else console.log("Could not get position from DB");}
        else console.log("Can't Connect To Database");});}

  createSelf(iD, dB); //Construct Self
}

*/
