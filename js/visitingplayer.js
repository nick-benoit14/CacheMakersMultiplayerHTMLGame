function VisitingPlayer(id, home_world, current_world, db_ref, callback, bindings, poll){

  if(!bindings)bindings = [];
  
  bindings.push(function(player){
    player.Db.child(player.Worlds).child(player.currentWorld).child('active_players').child(player.Id).child('position').on('value', function(snapshot){
      if(snapshot.exists()){
        var top = snapshot.val().top, left = snapshot.val().left;
        player.playerRef.css('top', top);
        player.playerRef.css('left', left);
      }
    }); //Listen for Position Change
  });  //Add event listener

  var poll = function(player){ /*Send Position to DB, Detect Edges, Other Cool things*/}


  Player.call(this, id, home_world, current_world, db_ref, callback,  bindings, poll); // Add actions to bind to Player
}

VisitingPlayer.prototype = Object.create(Player.prototype);
VisitingPlayer.prototype.constructor = VisitingPlayer;
