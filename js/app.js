var harry = document.getElementById("harry");
var board = document.getElementById("board");

window.addEventListener("keydown",(e) => {// e c'est l'evenement qui appelet apres le clique au botton de clavier
  var left = parseInt(window.getComputedStyle(harry).getPropertyValue("left"));
  
  if( (e.key == "ArrowLeft" || e.keyCode == 81) && left > 0){
    harry.style.left = left - 5 + "px";
  }else if((e.key == "ArrowRight" || e.keyCode == 68) && left<= 440){
    harry.style.left = left + 5 + "px";
  }
  
  if(e.key == "ArrowUp" || e.keyCode == 90){
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
    
    if(firebottom >= 670){//max intervalle de fire
      clearInterval(movefire);
    }
  
    fire.style.left = left + "px";
    fire.style.bottom = firebottom + 3 + "px";//vitesse de fire
   });
  }
});



var generatemonsters = setInterval(() =>{
  var monster = document.createElement("div");
  monster.classList.add("monsters");
  var monsterleft = parseInt(
    window.getComputedStyle(monster).getPropertyValue("left")
  );
  monster.style.left = Math.floor(Math.random() * 431) + "px";//intervalle de l'ajoutation de monster dans un canvas

  board.appendChild(monster);
},3000);//capacite de monster par seconde


var movemonsters = setInterval(() =>{
  var monsters = document.getElementsByClassName("monsters");

  if(monsters != undefined){
    for(var i = 0 ; i<monsters.length;i++){
      var monster = monsters[i];
      var monstertop = parseInt(
        window.getComputedStyle(monster).getPropertyValue("top")
      );
      if(monstertop >= 600){//max intervalle de monster
        alert("Game Over");
        clearInterval(movemonsters);//remove tous les moster
        window.location.reload();//actualiser de fenetre
      }
      monster.style.top = monstertop + 25 + "px";//vitesse de monster par px
    }
  }
},600);//vitesse de monster
