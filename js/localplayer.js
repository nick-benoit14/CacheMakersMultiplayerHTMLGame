function LocalPlayer(id, home_world, current_world, db_ref, callback, bindings, poll){

  if(!bindings) bindings = [];

/*
  var movePlayer = function(player, key){
    var left = player.css('left');
    var top = player.css('top');
    if(key == 37)player.css('left', parseInt(left) - 10);
    if(key == 39)player.css('left', parseInt(left) + 10);
    if(key == 38)player.css('top', parseInt(top) - 10);
    if(key == 40)player.css('top', parseInt(top) + 10);}
*/

  var updateDb = function(player){
    var playerstring = '{"' + player.Id + '": {"position": {"top":"'+ player.playerRef.css('top') + '", "left":"'+ player.playerRef.css('left') + '"}, "name":"' + player.Id + '"}}';
    var obj = JSON.parse(playerstring);
    player.Db.child(player.Worlds).child(player.currentWorld).child("active_players").update(obj);}
  //bindings.push(function(player){$('body').keydown(function(e){ movePlayer(player.playerRef, e.which); });}); //Bind Move function - Let kids implement
  bindings.push(function(){$('body').click(function(){ console.log("I'm a method bound to the local player");});});  //We are both methods bound to local player!


  var poll = function(player){
    updateDb(player);
  }

  Player.call(this, id, home_world, current_world, db_ref, callback,  bindings, poll); // Add actions to bind to Player
}

LocalPlayer.prototype = Object.create(Player.prototype);
LocalPlayer.prototype.constructor = LocalPlayer;
