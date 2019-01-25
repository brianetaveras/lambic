var WIDTH = 768;
var HEIGHT = 768;
var world = [];
var tileSize = 0;
var mapSize = 0;

var socket = io();

//SIGN IN
var signDiv = document.getElementById('signDiv');
var signDivUsername = document.getElementById('signDiv-username');
var signDivPassword = document.getElementById('signDiv-password');
var signDivSignIn = document.getElementById('signDiv-signIn');
var signDivSignUp = document.getElementById('signDiv-signUp');

signDivSignIn.onclick = function(){
  socket.emit('signIn',{username:signDivUsername.value,password:signDivPassword.value});
}

signDivSignUp.onclick = function(){
  socket.emit('signUp',{username:signDivUsername.value,password:signDivPassword.value});
}

socket.on('signInResponse',function(data){
  if(data.success){
    world = data.world;
    tileSize = data.tileSize;
    mapSize = data.mapSize;
    tempus = data.tempus;
    signDiv.style.display = 'none';
    gameDiv.style.display = 'inline-block';
    UI.style.display = 'inline-block';
  } else
    alert('Sign-in failed.')
});

socket.on('signUpResponse',function(data){
  if(data.success){
    alert('Sign-up successful.')
  } else
    alert('Sign-up failed.')
});

// CHAT & COMMANDS
var chatText = document.getElementById('chat-text');
var chatInput = document.getElementById('chat-input');
var chatForm = document.getElementById('chat-form');

socket.on('addToChat',function(data){
  chatText.innerHTML += '<div>' + data + '</div>';
});

socket.on('evalAnswer',function(data){
  chatText.innerHTML += '<div>' + data + '</div>';
  console.log(data);
});

chatForm.onsubmit = function(e){
  e.preventDefault();
  if(chatInput.value[0] === '/')
    socket.emit('evalServer',chatInput.value.slice(1));
  else
    socket.emit('sendMsgToServer',chatInput.value);
  chatInput.value = '';
}

// GAME

// IMAGES
var Img = {};

// tiles
Img.grassland = new Image();
Img.grassland.src = '/client/img/tiles/grassland.png';
Img.water1 = new Image();
Img.water1.src = '/client/img/tiles/water1.png';
Img.water2 = new Image();
Img.water2.src = '/client/img/tiles/water2.png';
Img.water3 = new Image();
Img.water3.src = '/client/img/tiles/water3.png';
Img.hforest = new Image();
Img.hforest.src = '/client/img/tiles/hforest.png';
Img.forest = new Image();
Img.forest.src = '/client/img/tiles/forest.png';
Img.brush = new Image();
Img.brush.src = '/client/img/tiles/brush.png';
Img.rocks = new Image();
Img.rocks.src = '/client/img/tiles/rocks.png';
Img.mountain = new Image();
Img.mountain.src = '/client/img/tiles/mountain.png';
Img.clouds1 = new Image();
Img.clouds1.src = '/client/img/tiles/clouds1.png';
Img.clouds2 = new Image();
Img.clouds2.src = '/client/img/tiles/clouds2.png';
Img.clouds3 = new Image();
Img.clouds3.src = '/client/img/tiles/clouds3.png';
Img.cavein = new Image();
Img.cavein.src = '/client/img/tiles/cavein.png';
Img.caveout = new Image();
Img.caveout.src = '/client/img/tiles/caveout.png';
Img.cavewall = new Image();
Img.cavewall.src = '/client/img/tiles/cavewall.png';
Img.cavefloor = new Image();
Img.cavefloor.src = '/client/img/tiles/cavefloor.png';


// characters

// items
Img.torch1 = new Image();
Img.torch1.src = '/client/img/items/torch1.png';
Img.torch2 = new Image();
Img.torch2.src = '/client/img/items/torch2.png';
Img.torch3 = new Image();
Img.torch3.src = '/client/img/items/torch3.png';

// arrows
Img.arrow1 = new Image();
Img.arrow1.src = '/client/img/bullets/arrow1.png';
Img.arrow2 = new Image();
Img.arrow2.src = '/client/img/bullets/arrow2.png';
Img.arrow3 = new Image();
Img.arrow3.src = '/client/img/bullets/arrow3.png';
Img.arrow4 = new Image();
Img.arrow4.src = '/client/img/bullets/arrow4.png';
Img.arrow5 = new Image();
Img.arrow5.src = '/client/img/bullets/arrow5.png';
Img.arrow6 = new Image();
Img.arrow6.src = '/client/img/bullets/arrow6.png';
Img.arrow7 = new Image();
Img.arrow7.src = '/client/img/bullets/arrow7.png';
Img.arrow8 = new Image();
Img.arrow8.src = '/client/img/bullets/arrow8.png';

var ctx = document.getElementById('ctx').getContext('2d');
var lighting = document.getElementById('lighting').getContext('2d');
ctx.font = '30px Arial';

// PLAYER
var Player = function(initPack){
  var self = {};
  self.id = initPack.id;
  self.number = initPack.number;
  self.x = initPack.x;
  self.y = initPack.y;
  self.z = initPack.z;
  self.facing = 'down';
  self.hp = initPack.hp;
  self.hpMax = initPack.hpMax;
  self.mana = initPack.mana;
  self.manaMax = initPack.manaMax;

  self.draw = function(){
    var x = self.x - Player.list[selfId].x + WIDTH/2;
    var y = self.y - Player.list[selfId].y + HEIGHT/2;

    // hp and mana bars
    var hpWidth = 60 * self.hp / self.hpMax;
    var manaWidth = 60 * self.mana / self.manaMax;

    ctx.fillStyle = 'red';
    ctx.fillRect(x - 30,y - 50,60,8);
    ctx.fillStyle = 'green';
    ctx.fillRect(x - hpWidth/2,y - 50,hpWidth,8);
    ctx.fillStyle = 'red';
    ctx.fillRect(x - 30,y - 40,60,5);
    ctx.fillStyle = 'blue';
    ctx.fillRect(x - manaWidth/2,y - 40,manaWidth,5);
    ctx.fillStyle = 'black';

    // character sprite
    ctx.fillText(self.number, x, y);
  }

  Player.list[self.id] = self;
  return self;
}
Player.list = {};

// ARROWS
var Arrow = function(initPack){
  var self = {};
  self.id = initPack.id;
  self.angle = initPack.angle;
  self.number = initPack.number;
  self.x = initPack.x;
  self.y = initPack.y;
  self.z = initPack.z;

  self.draw = function(){
    function drawArrow(angle){
      var x = self.x - Player.list[selfId].x + WIDTH/2;
      var y = self.y - Player.list[selfId].y + HEIGHT/2;

      if(angle >= -120 && angle < -60){
        ctx.drawImage(Img.arrow1, x, y, tileSize, tileSize);
      } else if(angle >= -60 && angle < -30){
        ctx.drawImage(Img.arrow2, x, y, tileSize, tileSize);
      } else if(angle >= -30 && angle < 30){
        ctx.drawImage(Img.arrow3, x, y, tileSize, tileSize);
      } else if(angle >= 30 && angle < 60){
        ctx.drawImage(Img.arrow4, x, y, tileSize, tileSize);
      } else if(angle >= 60 && angle < 120){
        ctx.drawImage(Img.arrow5, x, y, tileSize, tileSize);
      } else if(angle >= 120 && angle < 150){
        ctx.drawImage(Img.arrow6, x, y, tileSize, tileSize);
      } else if(angle >= 150 && angle > -150){
        ctx.drawImage(Img.arrow7, x, y, tileSize, tileSize);
      } else {
        ctx.drawImage(Img.arrow8, x, y, tileSize, tileSize);
      }
    }
    drawArrow(self.angle);
  }

  Arrow.list[self.id] = self;
  return self;
}
Arrow.list = {};

// ITEMS

var Item = function(initPack){
  var self = {};
  self.id = initPack.id;
  self.itemId = initPack.itemId;
  self.x = initPack.x;
  self.y = initPack.y;
  self.z = initPack.z;
  self.canPickup = initPack.canPickup;

  self.draw = function(){
    if(self.itemId === 0){
      var x = self.x - Player.list[selfId].x + WIDTH/2;
      var y = self.y - Player.list[selfId].y + HEIGHT/2;
      ctx.drawImage(
      torchFlame[trc],
      x,
      y,
      tileSize,
      tileSize
      );
    } // add more items here...
  }

  Item.list[self.id] = self;
  return self;
}
Item.list = {};

// LIGHTS
var Light = function(initPack){
  var self = {};
  self.id = initPack.id;
  self.x = initPack.x;
  self.y = initPack.y;
  self.z = initPack.z;
  self.radius = initPack.radius;

  Light.list[self.id] = self;
  return self;
}
Light.list = {};

// player's id
var selfId = null;

// init
socket.on('init',function(data){
  if(data.selfId)
    selfId = data.selfId;
  // { player : [{id:123,number:'1',x:0,y:0},{id:1,x:0,y:0}] arrow : []}
  for(var i = 0 ; i < data.player.length; i++){
    new Player(data.player[i]);
  }
  for(var i = 0 ; i < data.arrow.length; i++){
    new Arrow(data.arrow[i]);
  }
  for(var i = 0 ; i < data.item.length; i++){
    new Item(data.item[i]);
  }
  for(var i = 0 ; i < data.light.length; i++){
    new Light(data.light[i]);
  }
});

// update
socket.on('update',function(data){
  // { player : [{id:123,number:'1',x:0,y:0},{id:1,x:0,y:0}] arrow : []}
  for(var i = 0 ; i < data.player.length; i++){
    var pack = data.player[i];
    var p = Player.list[pack.id];
    if(p){
      if(pack.x !== undefined)
        p.x = pack.x;
      if(pack.y !== undefined)
        p.y = pack.y;
      if(pack.z !== undefined)
        p.z = pack.z;
      if(pack.facing !== undefined)
        p.facing = pack.facing;
      if(pack.hp !== undefined)
        p.hp = pack.hp;
      if(pack.hpMax !== undefined)
        p.hpMax = pack.hpMax;
      if(pack.mana !== undefined)
        p.mana = pack.mana;
      if(pack.manaMax !== undefined)
        p.manaMax = pack.manaMax;
    }
  }
  for(var i = 0 ; i < data.arrow.length; i++){
    var pack = data.arrow[i];
    var b = Arrow.list[data.arrow[i].id];
    if(b){
      if(pack.x !== undefined)
        b.x = pack.x;
      if(pack.y !== undefined)
        b.y = pack.y;
      if(pack.z !== undefined)
        b.z = pack.z;
    }
  }
  for(var i = 0 ; i < data.item.length; i++){
    var pack = data.item[i];
    var itm = Item.list[data.item[i].id];
    if(itm){
      if(pack.x !== undefined)
        itm.x = pack.x;
      if(pack.y !== undefined)
        itm.y = pack.y;
      if(pack.z !== undefined)
        itm.z = pack.z;
    }
  }
  for(var i = 0 ; i < data.light.length; i++){
    var pack = data.light[i];
    var l = Light.list[data.light[i].id];
    if(l){
      if(pack.x !== undefined)
        l.x = pack.x;
      if(pack.y !== undefined)
        l.y = pack.y;
      if(pack.z !== undefined)
        l.z = pack.z;
    }
  }
});

// remove
socket.on('remove',function(data){
  // {player:[12323],arrow:[12323,123123]}
  for(var i = 0 ; i < data.player.length; i++){
    delete Player.list[data.player[i]];
  }
  for(var i = 0 ; i < data.arrow.length; i++){
    delete Arrow.list[data.arrow[i]];
  }
  for(var i = 0 ; i < data.item.length; i++){
    delete Item.list[data.item[i]];
  }
  for(var i = 0 ; i < data.light.length; i++){
    delete Light.list[data.light[i]];
  }
});

// DRAW TO SCREEN

//cyclical animation timers
var wtr = 0; // water
var waterTiles = [Img.water1,Img.water2,Img.water3];
setInterval(function(){
  if(wtr === 2){
    wtr = 0;
  } else {
    wtr++;
  }
},1200);

var trc = 0; // torch
var torchFlame = [Img.torch1,Img.torch2,Img.torch3];
setInterval(function(){
  if(trc === 2){
    trc = 0;
  } else {
    trc++;
  }
},300);

var cld = 0; // clouds
var clouds = [Img.clouds1,Img.clouds2,Img.clouds3];
setInterval(function(){
  if(cld === 2){
    cld = 0;
  } else {
    cld++;
  }
},4000);

var inView = function(z,x,y){
  var top = (viewport.startTile[1] - 1) * tileSize;
  var left = (viewport.startTile[0] - 1) * tileSize;
  var right = (viewport.endTile[0] + 2) * tileSize;
  var bottom = (viewport.endTile[1] + 2) * tileSize;

  if(z === Player.list[selfId].z && x > left && x < right && y > top && y < bottom){
    return true;
  } else {
    return false;
  }
}

setInterval(function(){
  if(!selfId) // check that player is signed in
    return;
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  renderMap();
  renderLighting();
  for(var i in Player.list){
    if(inView(Player.list[i].z,Player.list[i].x,Player.list[i].y)){
      Player.list[i].draw();
    } else {
      continue;
    }
  }
  for(var i in Arrow.list){
    if(inView(Arrow.list[i].z,Arrow.list[i].x,Arrow.list[i].y)){
      Arrow.list[i].draw();
    } else {
      continue;
    }
  }
  for(var i in Item.list){
    if(inView(Item.list[i].z,Item.list[i].x,Item.list[i].y)){
      Item.list[i].draw();
    } else {
      continue;
    }
  }
  if(Player.list[selfId].z === 0){
    if(tempus === 'IX.p' || tempus === 'X.p' || tempus === 'XI.p' || tempus === 'XII.a' || tempus === 'I.a' || tempus === 'II.a' || tempus === 'III.a'){
      renderLightSources(1);
    } else if(tempus === 'VIII.p' || tempus === 'IV.a'){
      renderLightSources(0.8);
    } else if(tempus === 'VII.p' || tempus === 'V.a'){
      renderLightSources(0.55);
    } else {
      renderLightSources(0.3);
    }
  } else if(Player.list[selfId].z === -1){
    renderLightSources(1.5);
  }
  viewport.update(Player.list[selfId].x,Player.list[selfId].y);
  console.log(getLoc(Player.list[selfId].x,Player.list[selfId].y));
},40);

// RENDER MAP

// MAP TOOLS
var getTile = function(l,c,r){
  return world[l][r][c];
};

// get loc from (x,y)
var getLoc = function(x,y){
  var loc = [Math.floor(x/tileSize),Math.floor(y/tileSize)];
  return loc;
}

// get (x,y) coords of tile from loc
var getCoords = function(c,r){
  var coords = [c * tileSize, r * tileSize];
  return coords;
};

// update environment
tempus = null;

socket.on('tempus',function(data){
  tempus = data.tempus;
});

// viewport
var viewport = {
  screen: [WIDTH,HEIGHT],
  startTile: [0,0],
  endTile: [0,0],
  offset: [0,0],
  // takes player's loc as argument
  update: function(c,r){
    this.offset[0] = Math.floor((this.screen[0]/2) - c);
    this.offset[1] = Math.floor((this.screen[1]/2) - r);

    var tile = [Math.floor(c/tileSize),Math.floor(r/tileSize)];

    this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0]/2) / tileSize);
    this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1]/2) / tileSize);

    if(this.startTile[0] < 0){this.startTile[0] = 0;}
    if(this.startTile[1] < 0){this.startTile[1] = 0;}

    this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0]/2) / tileSize);
    this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[1]/2) / tileSize);

    if(this.endTile[0] >= mapSize){this.endTile[0] = mapSize - 1;}
    if(this.endTile[1] >= mapSize){this.endTile[1] = mapSize - 1;}
  }
};

// renderer
var renderMap = function(){
  var z = Player.list[selfId].z;
  var x = 0;
  var y = 0;

  // overworld
  if(z === 0){
    var cloudscape = ctx.createPattern(clouds[cld], "repeat");
    ctx.rect(0,0,WIDTH,HEIGHT);
    ctx.fillStyle = cloudscape;
    ctx.fill();

    for (var c = viewport.startTile[0]; c < viewport.endTile[0]; c++) {
      for (var r = viewport.startTile[1]; r < viewport.endTile[1]; r++) {
        var xOffset = viewport.offset[0] + (c * tileSize);
        var yOffset = viewport.offset[1] + (r * tileSize);
        var tile = getTile(0, c, r);
        if(tile === 0){
          ctx.drawImage(
          waterTiles[wtr], // image
          xOffset, // target x
          yOffset, // target y
          tileSize, // target width
          tileSize // target height
          );
          y++;
        } else if(tile === 1){
          ctx.drawImage(
          Img.grassland, // image
          xOffset, // target x
          yOffset, // target y
          tileSize, // target width
          tileSize // target height
          );
          ctx.drawImage(
          Img.hforest, // image
          xOffset, // target x
          yOffset, // target y
          tileSize, // target width
          tileSize // target height
          );
          y++;
        } else if(tile === 2){
          ctx.drawImage(
          Img.grassland, // image
          xOffset, // target x
          yOffset, // target y
          tileSize, // target width
          tileSize // target height
          );
          ctx.drawImage(
          Img.forest, // image
          xOffset, // target x
          yOffset, // target y
          tileSize, // target width
          tileSize // target height
          );
          y++;
        } else if(tile === 3){
          ctx.drawImage(
          Img.grassland, // image
          xOffset, // target x
          yOffset, // target y
          tileSize, // target width
          tileSize // target height
          );
          ctx.drawImage(
          Img.brush, // image
          xOffset, // target x
          yOffset, // target y
          tileSize, // target width
          tileSize // target height
          );
          y++;
        } else if(tile === 4){
          ctx.drawImage(
          Img.grassland, // image
          xOffset, // target x
          yOffset, // target y
          tileSize, // target width
          tileSize // target height
          );
          ctx.drawImage(
          Img.rocks, // image
          xOffset, // target x
          yOffset, // target y
          tileSize, // target width
          tileSize // target height
          );
          y++;
        } else if(tile === 5){
          ctx.drawImage(
          Img.grassland, // image
          xOffset, // target x
          yOffset, // target y
          tileSize, // target width
          tileSize // target height
          );
          ctx.drawImage(
          Img.mountain, // image
          xOffset, // target x
          yOffset, // target y
          tileSize, // target width
          tileSize // target height
          );;
          y++;
        } else if(tile === 6){
          ctx.drawImage(
          Img.grassland, // image
          xOffset, // target x
          yOffset, // target y
          tileSize, // target width
          tileSize // target height
          );
          ctx.drawImage(
          Img.cavein, // image
          xOffset, // target x
          yOffset, // target y
          tileSize, // target width
          tileSize // target height
          );
          y++;
        }
      }
    }
    x++;
  } else if(z === -1){
    var morecave = ctx.createPattern(Img.cavefloor, "repeat");
    ctx.rect(0,0,WIDTH,HEIGHT);
    ctx.fillStyle = morecave;
    ctx.fill();
    var evenmorecave = ctx.createPattern(Img.cavewall, "repeat");
    ctx.rect(0,0,WIDTH,HEIGHT);
    ctx.fillStyle = evenmorecave;
    ctx.fill();
    for (var c = viewport.startTile[0]; c < viewport.endTile[0]; c++) {
      for (var r = viewport.startTile[1]; r < viewport.endTile[1]; r++) {
        var tile = getTile(1, c, r);
        var xOffset = viewport.offset[0] + (c * tileSize);
        var yOffset = viewport.offset[1] + (r * tileSize);
        if(tile === 0){
          ctx.drawImage(
          Img.cavefloor, // image
          xOffset, // target x
          yOffset, // target y
          tileSize, // target width
          tileSize // target height
          );
          y++;
        } else if(tile === 1){
          ctx.drawImage(
          Img.cavefloor, // image
          xOffset, // target x
          yOffset, // target y
          tileSize, // target width
          tileSize // target height
          );
          ctx.drawImage(
          Img.cavewall, // image
          xOffset, // target x
          yOffset, // target y
          tileSize, // target width
          tileSize // target height
          );
          y++;
        } else if(tile === 2){
          ctx.drawImage(
          Img.cavefloor, // image
          xOffset, // target x
          yOffset, // target y
          tileSize, // target width
          tileSize // target height
          );
          ctx.drawImage(
          Img.caveout, // image
          xOffset, // target x
          yOffset, // target y
          tileSize, // target width
          tileSize // target height
          );
          y++;
        }
      }
    }
    x++;
  }
};

//lighting and light sources
// [z,x,y,radius]
var flickerRange = [0.4,0.65,0.7,0.75,0.75,0.8,0.8,0.85,0.9,0.95,1,1.5];
var flicker = 0;
setInterval(function(){
  flicker = flickerRange[Math.floor(Math.random() * flickerRange.length)];
}, 50);

var illuminate = function(x, y, radius){
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  var rnd = (0.05 * Math.sin(1.1 * Date.now() / 200) * flicker);
  radius = (radius * (1 + rnd));
  var radialGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  radialGradient.addColorStop(0.0, '#BB9');
  radialGradient.addColorStop(0.2 + rnd, '#AA8');
  radialGradient.addColorStop(0.7 + rnd, '#330');
  radialGradient.addColorStop(0.90, '#110');
  radialGradient.addColorStop(1, '#000');
  ctx.fillStyle = radialGradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
  //remove darkness layer
  lighting.save();
  lighting.globalCompositeOperation = 'destination-out';
  lighting.beginPath();
  lighting.arc(x, y, radius * 0.9, 0, 2 * Math.PI, false);
  lighting.fill();
  lighting.restore();
}

var renderLightSources = function(env){
  for(i in Light.list){
    var light = Light.list[i];
    var x = light.x - Player.list[selfId].x + WIDTH/2;
    var y = light.y - Player.list[selfId].y + HEIGHT/2;
    if(light.z === Player.list[selfId].z){
      illuminate(x,y,light.radius * env);
      illuminate(x,y,(light.radius/4) * env);
    }
  }
}

var renderLighting = function(){
  var z = Player.list[selfId].z;
  if(z === 0){
    if(tempus === 'IX.p' || tempus === 'X.p' || tempus === 'XI.p' || tempus === 'XII.a' || tempus === 'I.a' || tempus === 'II.a' || tempus === 'III.a'){
      lighting.clearRect(0,0,WIDTH,HEIGHT);
      lighting.fillStyle = "rgba(5, 5, 30, 0.85)"; // night
      lighting.fillRect(0,0,WIDTH,HEIGHT);
    } else if(tempus === 'IV.a'){
      lighting.clearRect(0,0,WIDTH,HEIGHT);
      lighting.fillStyle = "rgba(5, 5, 30, 0.8)"; // early hours
      lighting.fillRect(0,0,WIDTH,HEIGHT);
    } else if(tempus === 'V.a'){
      lighting.clearRect(0,0,WIDTH,HEIGHT);
      lighting.fillStyle = "rgba(5, 5, 30, 0.6)"; // early morning
      lighting.fillRect(0,0,WIDTH,HEIGHT);
    } else if(tempus === 'VI.a'){
      lighting.clearRect(0,0,WIDTH,HEIGHT);
      lighting.fillStyle = "rgba(244, 214, 65, 0.1)"; // sunrise
      lighting.fillRect(0,0,WIDTH,HEIGHT);
    } else if(tempus === 'VII.a' || tempus === 'VIII.a' || tempus === 'IX.a'|| tempus === 'X.a' || tempus === 'XI.a' || tempus === 'XII.p' || tempus === 'I.p' || tempus === 'II.p' || tempus === 'III.p'){
      lighting.clearRect(0,0,WIDTH,HEIGHT); // morning + daytime
    } else if(tempus === 'IV.p'){
      lighting.clearRect(0,0,WIDTH,HEIGHT);
      lighting.fillStyle = "rgba(255, 204, 22, 0.07)"; // afternoon
      lighting.fillRect(0,0,WIDTH,HEIGHT);
    } else if(tempus === 'V.p'){
      lighting.clearRect(0,0,WIDTH,HEIGHT);
      lighting.fillStyle = "rgba(255, 204, 22, 0.1)"; // late afternoon
      lighting.fillRect(0,0,WIDTH,HEIGHT);
    } else if(tempus === 'VI.p'){
      lighting.clearRect(0,0,WIDTH,HEIGHT);
      lighting.fillStyle = "rgba(232, 112, 0, 0.25)"; // sunset
      lighting.fillRect(0,0,WIDTH,HEIGHT);
    } else if(tempus === 'VII.p'){
      lighting.clearRect(0,0,WIDTH,HEIGHT);
      lighting.fillStyle = "rgba(5, 5, 30, 0.4)"; // twilight
      lighting.fillRect(0,0,WIDTH,HEIGHT);
    } else if(tempus === 'VIII.p'){
      lighting.clearRect(0,0,WIDTH,HEIGHT);
      lighting.fillStyle = "rgba(5, 5, 30, 0.7)"; // evening
      lighting.fillRect(0,0,WIDTH,HEIGHT);
    }
  } else if(z === -1){
    lighting.clearRect(0,0,WIDTH,HEIGHT);
    lighting.fillStyle = "rgba(0, 0, 0, 0.9)"; // cave darkness
    lighting.fillRect(0,0,WIDTH,HEIGHT);
  }
}

// CONTROLS
document.onkeydown = function(event){
  if(event.keyCode === 68) // d
    socket.emit('keyPress',{inputId:'right',state:true});
  else if(event.keyCode === 83) // s
    socket.emit('keyPress',{inputId:'down',state:true});
  else if(event.keyCode === 65) // a
    socket.emit('keyPress',{inputId:'left',state:true});
  else if(event.keyCode === 87) // w
    socket.emit('keyPress',{inputId:'up',state:true});
  else if(event.keyCode === 32) // space
    socket.emit('keyPress',{inputId:'attack',state:true});
  else if(event.keyCode === 49) // 1
    socket.emit('keyPress',{inputId:'1',state:true});
  else if(event.keyCode === 50) // 2
    socket.emit('keyPress',{inputId:'2',state:true});
  else if(event.keyCode === 51) // 3
    socket.emit('keyPress',{inputId:'3',state:true});
}

document.onkeyup = function(event){
  if(event.keyCode === 68) // d
    socket.emit('keyPress',{inputId:'right',state:false});
  else if(event.keyCode === 83) // s
    socket.emit('keyPress',{inputId:'down',state:false});
  else if(event.keyCode === 65) // a
    socket.emit('keyPress',{inputId:'left',state:false});
  else if(event.keyCode === 87) // w
    socket.emit('keyPress',{inputId:'up',state:false});
  else if(event.keyCode === 32) // space
    socket.emit('keyPress',{inputId:'attack',state:false});
  else if(event.keyCode === 49) // 1
    socket.emit('keyPress',{inputId:'1',state:false});
  else if(event.keyCode === 50) // 2
    socket.emit('keyPress',{inputId:'2',state:false});
  else if(event.keyCode === 51) // 3
    socket.emit('keyPress',{inputId:'3',state:false});
}

document.onmousemove = function(event){
  var x = -250 + event.clientX - 8;
  var y = -250 + event.clientY - 8;
  var angle = Math.atan2(y,x) / Math.PI * 180;
  socket.emit('keyPress',{inputId:'mouseAngle',state:angle});
}

document.oncontextmenu = function(event){
  //event.preventDefault();
}
