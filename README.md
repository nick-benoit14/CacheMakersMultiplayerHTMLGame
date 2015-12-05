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
  http://human-resource-manager-harry-70771.bitballoon.com/
  
  Then Open: 
  http://burser-chimpanzee-85128.bitballoon.com/
  
  Then on the second page click any of the arrows. This will take you to another players world. 
  Take a good look around and enjoy the worksmanship of your fellow MMO-ers. 
  
  As of 11/29/15 - If you go back to the first page, you will notice both players, but on the page where link is the
  character you can only see yourself. So go back to: 
  
  http://human-resource-manager-harry-70771.bitballoon.com/
  
  and enjoy both players being there while I work out the kinks. 
  
  Developed for Cache Makers in Logan, Utah, USA 
  http://cachemakers.com/
  
  Happy Coding, 
  Nick Benoit, nick.benoit14@gmail.com
  11/19/15


