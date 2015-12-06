# CacheMakersMultiplayerHTMLGame
Simple HTML MMO Client Example

Static HTML distributed MMO Game. Design your page/world and include mini games and other cool thigns, and hopefully learn a 
thing or two about programming in the process. 

Usage: 

*include all scripts in index.html 
*instantiate World object 
*include links to the 4 worlds you want adjacent to yours (for now.. this will be changing in the future) 
*write some code to move your player around, and maybe to change to a different world when
  they reach the end of the map! 


Note: the id of your sprite png, must match the string you pass to World

      var neighborWorlds = {     //Worlds I want to be my neighbors
        'top':'http://google.com',
        'bottom':'http://google.com',
        'left':'http://google.com',
        'right':'http://google.com'};
      
          var myName = 'nick';
          var world = new World(neighborWorlds, myName);
      
          world.Init(playerFunctions);
          


Checkout index.html for a more full example 

For a semi-working example checkout: 
  First Open: 
  http://receptionist-badger-43141.bitballoon.com/
  
  Then Open: 
  http://superintendant-wines-78334.bitballoon.com/
  
  If you travel to the edge of the page then you will travel to the neighboring page. 
  Check it out. 
  
  
  Developed for Cache Makers in Logan, Utah, USA 
  http://cachemakers.com/
  
  Happy Coding, 
  Nick Benoit, nick.benoit14@gmail.com
  11/19/15


