function LocalPlayer(id, home_url, current_world, db_ref){

  var movePlayer = function(player, key){
    var left = player.css('left');
    var top = player.css('top');
    if(key == 37)player.css('left', parseInt(left) - 10);
    if(key == 39)player.css('left', parseInt(left) + 10);
    if(key == 38)player.css('top', parseInt(top) - 10);
    if(key == 40)player.css('top', parseInt(top) + 10);}


  var bindings = [];
  bindings.push(function(player){$('body').keydown(function(e){ movePlayer(player.playerRef, e.which); });}); //We are both methods bound to local player!
  bindings.push(function(){console.log("I'm a method bound to the local player");});

  var poll = function(){ //Send Position to DB, Detect Edges, Other Cool things
    console.log("Poll");
  }



  Player.call(this, id, home_url, current_world, db_ref, bindings, poll); // Add actions to bind to Player
}

LocalPlayer.prototype = Object.create(Player.prototype);
LocalPlayer.prototype.constructor = LocalPlayer;
