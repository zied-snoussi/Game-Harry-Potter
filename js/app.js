var harry = document.getElementById("harry");
var board = document.getElementById("board");

window.addEventListener("keydown",(e) => {
  var left = parseInt(window.getComputedStyle(harry).getPropertyValue("left"));
  
  if( e.keyCode == 37 && left > 0){
    harry.style.left = left - 10 + "px";
  }else if(e.key == "ArrowRight" && left<= 440){
    harry.style.left = left + 10 + "px";
  }

  if(e.keyCode == 38 || e.keyCode == 32){
   var fire = document.createElement("div");
   fire.classList.add("fires");
   board.appendChild(fire);

   var movefire = setInterval(() =>{
     var monsters = document.getElementsByClassName("monsters");

     for(var i=0;i<monsters.length;i++){
       var monster = monsters[i];
       if(monster != undefined){
         var monsterbound  = monster.getBoundingClientRect();
         var firebound = fire.getBoundingClientRect();
         if(firebound.left >= monsterbound.left &&
           firebound.right <= monsterbound.right &&
           firebound.top <= monsterbound.top &&
           firebound.bottom <= monsterbound.bottom){
             monster.parentElement.removeChild(monster);
             fire.parentElement.removeChild(fire);
             document.getElementById("points").innerHTML = 
                parseInt(document.getElementById("points").innerHTML)+ 1;
           }
       }
     }
     var firebottom = parseInt(
      window.getComputedStyle(fire).getPropertyValue("bottom"));
    
    if(firebottom >= 670){
      clearInterval(movefire);
    }
  
    fire.style.left = left + "px";
    fire.style.bottom = firebottom + 3 + "px";
   });
  }
});


var generatemonsters = setInterval(() =>{
  var monster = document.createElement("div");
  monster.classList.add("monsters");
  var monsterleft = parseInt(
    window.getComputedStyle(monster).getPropertyValue("left")
  );
  monster.style.left = Math.floor(Math.random() * 430) + "px";

  board.appendChild(monster);
},3000);


var movemonsters = setInterval(() =>{
  var monsters = document.getElementsByClassName("monsters");

  if(monsters != undefined){
    for(var i = 0 ; i<monsters.length;i++){
      var monster = monsters[i];
      var monstertop = parseInt(
        window.getComputedStyle(monster).getPropertyValue("top")
      );
      if(monstertop >= 600){
        alert("Game Over");
        clearInterval(movemonsters);
        window.location.reload();
      }
      monster.style.top = monstertop + 25 + "px";
    }
  }
},600);
