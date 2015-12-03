function LocalPlayer(id, home_url, db_ref){



  var bindings = [];
  bindings.push(function(){
    $('body').click(function(){console.log("bound");});
  })

  var poll = function(){ //Update Position in DB
    console.log("Poll");
  }

  Player.call(this, id, home_url, db_ref, bindings, poll); // Add actions to bind to Player
}


LocalPlayer.prototype = Object.create(Player.prototype);
LocalPlayer.prototype.constructor = LocalPlayer;
