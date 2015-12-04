function VisitingPlayer(id, home_url, current_world, db_ref, callback){



  var bindings = [];
  //bindings.push(function(player){});  //Add event listener

  var poll = function(){ //Send Position to DB, Detect Edges, Other Cool things
    //console.log("Poll");
  }



  Player.call(this, id, home_url, current_world, db_ref, callback,  bindings, poll); // Add actions to bind to Player
}

VisitingPlayer.prototype = Object.create(Player.prototype);
VisitingPlayer.prototype.constructor = VisitingPlayer;
