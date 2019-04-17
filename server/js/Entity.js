// ENTITY
Entity = function(param){
  var self = {
    x:0,
    y:0,
    z:0,
    spdX:0,
    spdY:0,
    id:Math.random()
  }

  if(param){
    if(param.x)
      self.x = param.x;
    if(param.y)
      self.y = param.y;
    if(param.z)
      self.z = param.z;
    if(param.id)
      self.id = param.id;
  }

  self.update = function(){
    self.updatePosition();
  }

  self.updatePosition = function(){
    self.x += self.spdX;
    self.y += self.spdY;
  }

  self.getDistance = function(pt){
    return Math.sqrt(Math.pow(self.x-pt.x,2) + Math.pow(self.y-pt.y,2));
  }
  return self;
};

// BUILDING
Building = function(param){
  var self = Entity(param);
  self.owner = param.owner;
  self.house = param.house;
  self.kingdom = param.kingdom;
  self.type = param.type;
  self.plot = param.plot;
  self.walls = param.walls;
  self.topPlot = param.topPlot;
  self.mats = param.mats;
  self.req = param.req;
  self.hp = param.hp;

  Building.list[self.id] = self;
  buildingCount++;
  buildingId.push(self.id);

  io.emit('newBuilding',{
    bCount:buildingCount,
    bId:buildingId,
    bList:Building.list
  });

  return self;
}

buildingCount = 0;
buildingId = [];
Building.list = {}

// CHARACTER
Character = function(param){
  var self = Entity(param);
  self.name = null;
  self.home = null; // [z,x,y] (must own building if player)
  self.class = null;
  self.rank = null;
  self.inventory = {
    keys:[],
    wood:0,
    stone:0,
    grain:0,
    flour:0,
    dough:0,
    ironore:0,
    ironbar:0,
    steelbar:0,
    boarhide:0,
    leather:0,
    silverore:0,
    silver:0,
    goldore:0,
    gold:0,
    diamond:0,
    ironsword:0,
    steelsword:0,
    morallta:0,
    tyrfing:0,
    bow:0,
    longbow:0,
    mercenarybow:0,
    ironlance:0,
    steellance:0,
    rusticlance:0,
    grandmasterlance:0,
    tunic:0,
    brigandine:0,
    lamellar:0,
    ironmail:0,
    steelmail:0,
    brynja:0,
    cuirass:0,
    steelplate:0,
    greenwichplate:0,
    gothicplate:0,
    clericrobe:0,
    druidrobe:0,
    monkrobe:0,
    warlockrobe:0,
    tome:0,
    runicscroll:0,
    sacredtext:0,
    stoneaxe:0,
    ironaxe:0,
    steelaxe:0,
    stonepickaxe:0,
    ironpickaxe:0,
    steelpickaxe:0,
    torch:10,
    bread:0,
    fish:0,
    lamb:0,
    boar:0,
    venison:0,
    poachedfish:0,
    lambchop:0,
    boarshank:0,
    venisonloin:0,
    saison:0,
    gose:0,
    lambic:0
  }
  self.facing = 'down';
  self.inTrees = false;
  self.onMtn = false;
  self.hasTorch = false;
  self.working = false;
  self.baseSpd = 4;
  self.maxSpd = 4;
  self.actionCooldown = 0;
  self.attackCooldown = 0;
  self.hp = 100;
  self.hpMax = 100;

  return self;
}

// FAUNA

Sheep = function(param){
  var self = Character(param);
  self.name = 'Sheep';
  self.class = 'sheep';
}

Deer = function(param){
  var self = Character(param);
  self.class = 'Deer';
  self.class = 'deer';
}

WildBoar = function(param){
  var self = Character(param);
  self.class = 'Wild Boar';
  self.class = 'wild boar';
}

Wolf = function(param){
  var self = Character(param);
  self.class = 'Wolf';
  self.class = 'wolf';
}

CaveWolf = function(param){
  var self = Character(param);
  self.name = 'Cave Wolf';
  self.class = 'cave wolf';
}

// UNITS

Serf = function(param){
  var self = Character(param);
  self.class = 'serf';
  self.name = param.name;
  self.house = param.house;
  self.kingdom = param.kingdom;
}

Villager = function(param){
  var self = Character(param);
  self.class = 'villager';
  self.name = param.name;
  self.house = param.house;
  self.kingdom = param.kingdom;
}

Brewmaster = function(param){
  var self = Character(param);
  self.class = 'brewmaster';
  self.name = param.name;
  self.house = param.house;
  self.kingdom = param.kingdom;
}

Monk = function(param){
  var self = Character(param);
  self.class = 'monk';
  self.name = param.name;
  self.house = param.house;
  self.kingdom = param.kingdom;
}

Bishop = function(param){
  var self = Character(param);
  self.class = 'bishop';
  self.rank = '♝';
  self.name = param.name;
  self.house = param.house;
  self.kingdom = param.kingdom;
}

Friar = function(param){
  var self = Character(param);
  self.class = 'friar';
  self.name = param.name;
  self.house = param.house;
  self.kingdom = param.kingdom;
}

Conscript = function(param){
  var self = Character(param);
  self.name = 'Conscript';
  self.class = 'conscript';
  self.house = param.house;
  self.kingdom = param.kingdom;
}

Skirmisher = function(param){
  var self = Character(param);
  self.name = 'Skirmisher';
  self.class = 'skirmisher';
  self.house = param.house;
  self.kingdom = param.kingdom;
}

Chevalier = function(param){
  var self = Character(param);
  self.name = 'Chevalier';
  self.class = 'chevalier';
  self.rank = '♞';
  self.house = param.house;
  self.kingdom = param.kingdom;
}

General = function(param){
  var self = Character(param);
  self.class = 'general';
  self.rank = '♜';
  self.name = param.name;
  self.house = param.house;
  self.kingdom = param.kingdom;
}

Trebuchet = function(param){
  var self = Character(param);
  self.name = 'Trebuchet';
  self.class = 'trebuchet';
  self.house = param.house;
  self.kingdom = param.kingdom;
}

TradeCart = function(param){
  var self = Character(param);
  self.name = 'Trade Cart';
  self.class = 'trade cart';
  self.house = param.house;
  self.kingdom = param.kingdom;
}

Merchant = function(param){
  var self = Character(param);
  self.class = 'merchant';
  self.name = param.name;
  self.house = param.house;
  self.kingdom = param.kingdom;
}

FishingBoat = function(param){
  var self = Character(param);
  self.class = 'fishing boat';
  self.house = param.house;
  self.kingdom = param.kingdom;
}

CargoShip = function(param){
  var self = Character(param);
  self.name = 'Cargo Ship';
  self.class = 'cargo ship';
  self.house = param.house;
  self.kingdom = param.kingdom;
}

Longship = function(param){
  var self = Character(param);
  self.name = 'Longship';
  self.class = 'longship';
  self.house = param.house;
  self.kingdom = param.kingdom;
}

// ENEMIES

Brother = function(param){
  var self = Character(param);
  self.name = 'Brother';
  self.class = 'brother';
  self.house = 'brotherhood';
}

Oathkeeper = function(param){
  var self = Character(param);
  self.name = 'Oathkeeper';
  self.class = 'oathkeeper';
  self.rank = '♝';
  self.house = 'brotherhood';
}

Infected = function(param){
  var self = Character(param);
  self.name = 'Infected';
  self.class = 'infected';
  self.house = 'brotherhood';
}

DarkEntity = function(param){
  var self = Character(param);
  self.name = 'Dark Entity';
  self.class = 'dark entity';
  self.house = 'brotherhood';
}

AcolyteM = function(param){
  var self = Character(param);
  self.name = 'Acolyte';
  self.class = 'acolyte m';
  self.house = 'sun cult';
}

AcolyteF = function(param){
  var self = Character(param);
  self.name = 'Acolyte';
  self.class = 'acolyte f';
  self.house = 'sun cult';
}

Magus = function(param){
  var self = Character(param);
  self.name = 'Magus';
  self.class = 'magus';
  self.rank = '♝';
  self.house = 'sun cult';
}

Magister = function(param){
  var self = Character(param);
  self.name = 'Magister';
  self.class = 'magister';
  self.rank = '♜';
  self.house = 'sun cult';
}

Mastema = function(param){
  var self = Character(param);
  self.name = 'MASTEMA';
  self.class = 'mastema';
  self.rank = '♚';
  self.house = 'sun cult';
}

Norseman = function(param){
  var self = Character(param);
  self.name = 'Norseman';
  self.class = 'norseman';
  self.house = 'norsemen';
}

Huskarl = function(param){
  var self = Character(param);
  self.name = 'Huskarl';
  self.class = 'huskarl';
  self.rank = '♞';
  self.house = 'norsemen';
}

Jarl = function(param){
  var self = Character(param);
  self.name = 'Jarl';
  self.class = 'jarl';
  self.rank = '♜';
  self.house = 'norsemen';
}

PaganAxe = function(param){
  var self = Character(param);
  self.name = 'Pagan';
  self.class = 'pagan axe';
  self.house = 'pagans';
}

PaganSpear = function(param){
  var self = Character(param);
  self.name = 'Pagan';
  self.class = 'pagan spear';
  self.house = 'pagans';
}

PaganSword = function(param){
  var self = Character(param);
  self.name = 'Pagan';
  self.class = 'pagan sword';
  self.house = 'pagans';
}

Cataphract = function(param){
  var self = Character(param);
  self.name = 'Cataphract';
  self.class = 'cataphract';
  self.rank = '♞';
  self.house = 'pagans';
}

Champion = function(param){
  var self = Character(param);
  self.name = 'Champion';
  self.class = 'champion';
  self.rank = '♜';
  self.house = 'pagans';
}

CeltAxe = function(param){
  var self = Character(param);
  self.name = 'Celt';
  self.class = 'celt axe';
  self.house = 'celts';
}

CeltSpear = function(param){
  var self = Character(param);
  self.name = 'Celt';
  self.class = 'celt spear';
  self.house = 'celts';
}

Headhunter = function(param){
  var self = Character(param);
  self.name = 'Headhunter';
  self.class = 'headhunter';
  self.rank = '♞';
  self.house = 'celts';
}

Druid = function(param){
  var self = Character(param);
  self.name = 'Druid';
  self.class = 'druid';
  self.rank = '♝';
  self.house = 'celts';
}

IronMaiden = function(param){
  var self = Character(param);
  self.name = 'Iron Maiden';
  self.class = 'iron maiden';
  self.rank = '♜';
  self.house = 'celts';
}

Gwenllian = function(param){
  var self = Character(param);
  self.name = 'Gwenllian';
  self.class = 'gwenllian';
  self.rank = '♛';
  self.house = 'celts';
}

Teuton = function(param){
  var self = Character(param);
  self.name = 'Teuton';
  self.class = 'teuton';
  self.house = 'teutons';
}

TeutonicKnight = function(param){
  var self = Character(param);
  self.name = 'Teutonic Knight';
  self.class = 'teutonic knight';
  self.rank = '♞';
  self.house = 'teutons';
}

Orderly = function(param){
  var self = Character(param);
  self.name = 'Orderly';
  self.class = 'orderly';
  self.rank = '♝';
  self.house = 'teutons';
}

Hochmeister = function(param){
  var self = Character(param);
  self.name = 'Hochmeister';
  self.class = 'hochmeister';
  self.rank = '♜';
  self.house = 'teutons';
}

Lothair = function(param){
  var self = Character(param);
  self.name = 'Lothair II';
  self.class = 'lothair';
  self.rank = '♚';
  self.house = 'teutons';
}

Brigand = function(param){
  var self = Character(param);
  self.name = 'Brigand';
  self.class = 'brigand';
  self.house = 'bandits';
}

Strongman = function(param){
  var self = Character(param);
  self.name = 'Strongman';
  self.class = 'strongman';
  self.house = 'bandits';
}

Chieftain = function(param){
  var self = Character(param);
  self.name = 'Chieftain';
  self.class = 'chieftain';
  self.rank = '♞';
  self.house = 'bandits';
}

// PLAYER
Player = function(param){
  var self = Character(param);
  self.name = param.name;
  self.house = null;
  self.kingdom = null;
  self.gear = {
    armor:null,
    weapon:null,
    accessory:null
  }
  self.title = '';
  self.pressingRight = false;
  self.pressingLeft = false;
  self.pressingUp = false;
  self.pressingDown = false;
  self.pressingAttack = false;
  self.pressingT = false;
  self.pressingE = false;
  self.pressing1 = false;
  self.pressing2 = false;
  self.pressing3 = false;
  self.mouseAngle = 0;
  self.hpNat = 100;
  self.manaNat = 100;
  self.mana = 100;
  self.manaMax = 100;
  self.strength = 10;
  self.dexterity = 1;

  var super_update = self.update;
  self.update = function(){
    self.updateSpd();
    super_update();

    if(self.actionCooldown > 0){
      self.actionCooldown--;
    }

    if(self.attackCooldown > 0){
      self.attackCooldown--;
    }

    if(self.pressingAttack && self.attackCooldown === 0 && self.z !== -3){ // EDIT to use attack of weapon type
      self.shootArrow(self.mouseAngle);
      self.attackCooldown = 50/self.dexterity;
    }

    if(self.pressingT && self.actionCooldown === 0){
      self.lightTorch(Math.random());
      self.actionCooldown = 10;
    }

    // ACTIONS
    if(self.pressingE && self.actionCooldown === 0 && !self.working){
      var loc = getLoc(self.x,self.y);
      // clear brush
      if(self.z === 0 && getTile(0,loc[0],loc[1]) === 3){
        self.working = true;
        setTimeout(function(){
          if(self.working){
            world[0][loc[1]][loc[0]] = 7;
            io.emit('mapEdit',world);
            self.working = false;
          } else {
            return;
          }
        },3000/self.strength);
      }
      // gather wood
      if(self.z === 0 && (getTile(0,loc[0],loc[1]) === 1 || getTile(0,loc[0],loc[1]) === 2)){
        self.working = true;
        self.actionCooldown = 10;
        setTimeout(function(){
          if(self.working){
            world[6][loc[1]][loc[0]] -= 50; // ALPHA
            self.inventory.wood += 50; // ALPHA
            self.working = false;
            if(getTile(0,loc[0],loc[1]) === 1 && getTile(6,loc[0],loc[1]) < 101){
              world[0][loc[1]][loc[0]] = 2;
            } else if(getTile(0,loc[0],loc[1]) === 2 && getTile(6,loc[0],loc[1]) <= 0){
              world[0][loc[1]][loc[0]] = 7;
            }
            io.emit('mapEdit',world);
          } else {
            return;
          }
        },6000/self.strength);
        // gather stone
      } else if(self.z === 0 && (getTile(0,loc[0],loc[1]) === 4 || getTile(0,loc[0],loc[1]) === 5)){
        self.working = true;
        self.actionCooldown = 10;
        setTimeout(function(){
          if(self.working){
            world[6][loc[1]][loc[0]] -= 50; // ALPHA
            self.inventory.stone += 50; // ALPHA
            self.working = false;
            if(getTile(0,loc[0],loc[1]) === 4 && getTile(6,loc[0],loc[1]) <= 0){
              world[0][loc[1]][loc[0]] = 7;
            }
            io.emit('mapEdit',world);
          } else {
            return;
          }
        },10000/self.strength);
      } else if(self.z === -1 && getTile(0,loc[0],loc[1]) === 3){
        self.working = true;
        self.actionCooldown = 10;
        setTimeout(function(){
          if(self.working){
            world[7][loc[1]][loc[0]] -= 1;
            self.inventory.stone += 1;
            self.working = false;
          } else {
            return;
          }
        },10000/self.strength);
          // farm
      } else if(self.z === 0 && getTile(0,loc[0],loc[1]) === 8){
        var f = getBuilding(self.x,self.y);
        self.working = true;
        self.actionCooldown = 10;
        setTimeout(function(){
          if(self.working && world[6][loc[1]][loc[0]] < 25){
            world[6][loc[1]][loc[0]] += 1;
            io.emit('mapEdit',world);
            self.working = false;
            var count = 0;
            var plot = Building.list[f].plot;
            for(i in plot){
              var n = plot[i];
              console.log(world[6][n[1]][n[0]]);
              if(world[6][n[1]][n[0]] === 25){
                count++;
              } else {
                continue;
              }
            }
            console.log(count);
            if(count === 9){
              for(i in plot){
                var n = plot[i];
                world[0][n[1]][n[0]] = 9;
              }
              io.emit('mapEdit',world);
            }
          } else {
            return;
          }
        },10000);
      } else if(self.z === 0 && getTile(0,loc[0],loc[1]) === 9){
        var f = Building.list[getBuilding(self.x,self.y)];
        self.working = true;
        self.actionCooldown = 10;
        setTimeout(function(){
          if(self.working && world[6][loc[1]][loc[0]] < 50){
            world[6][loc[1]][loc[0]] += 5;
            io.emit('mapEdit',world);
            self.working = false;
            var count = 0;
            var plot = f.plot;
            for(i in plot){
              if(world[6][plot[i][1]][plot[i][0]] === 50){
                count++;
              } else {
                continue;
              }
            }
            if(count === 9){
              for(i in plot){
                world[0][plot[i][1]][plot[i][0]] = 10;
              }
              io.emit('mapEdit',world);
            }
          } else {
            return;
          }
        },10000);
      } else if(self.z === 0 && getTile(0,loc[0],loc[1]) === 10){
        var f = getBuilding(self.x,self.y);
        self.working = true;
        self.actionCooldown = 10;
        setTimeout(function(){
          if(self.working){
            world[6][loc[1]][loc[0]] -= 1;
            self.inventory.grain += 1;
            self.working = false;
            if(world[6][loc[1]][loc[0]] === 0){
              world[0][loc[1]][loc[0]] = 8;
              io.emit('mapEdit', world);
            }
          } else {
            return;
          }
        },10000);
        // build
      } else if(self.z === 0 && (getTile(0,loc[0],loc[1]) === 11 || getTile(0,loc[0],loc[1]) === 11.5)){
        self.working = true;
        self.actionCooldown = 10;
        var b = Building.list[getBuilding(self.x,self.y)];
        setTimeout(function(){
          if(self.working){
            world[6][loc[1]][loc[0]] += 10;
            self.working = false;
            var count = 0;
            var plot = b.plot;
            var walls = b.walls;
            var top = b.topPlot;
            if(world[6][loc[1]][loc[0]] >= b.req){
              if(world[0][loc[1]][loc[0]] === 11){
                world[0][loc[1]][loc[0]] = 12;
              } else if(world[0][loc[1]][loc[0]] === 11.5){
                world[0][loc[1]][loc[0]] = 12.5;
              }
              io.emit('mapEdit',world);
            }
            for(i in plot){
              if(world[6][plot[i][1]][plot[i][0]] >= b.req){
                count++;
              } else {
                continue;
              }
            }
            if(count === plot.length){
              if(b.type === 'hut'){
                for(i in plot){
                  world[0][plot[i][1]][plot[i][0]] = 13;
                  world[3][plot[i][1]][plot[i][0]] = String('hut' + i);
                  if(world[3][plot[i][1]][plot[i][0]] === 'hut1'){
                    world[0][plot[i][1]][plot[i][0]] = 14;
                  }
                }
                for(i in walls){
                  var n = walls[i];
                  world[4][n[1]][n[0]] = 1;
                }
                var fp = getCoords(walls[1][0],walls[1][1]);
                Fireplace({
                  x:fp[0],
                  y:fp[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
              } else if(b.type === 'mill'){
                for(i in plot){
                  world[0][plot[i][1]][plot[i][0]] = 13;
                  world[3][plot[i][1]][plot[i][0]] = String('mill' + i);
                }
                world[5][top[0][1]][top[0][0]] = 'mill4';
                world[5][top[1][1]][top[1][0]] = 'mill5';
              } else if(b.type === 'house'){
                for(i in plot){
                  world[0][plot[i][1]][plot[i][0]] = 15;
                  world[3][plot[i][1]][plot[i][0]] = String('house' + i);
                  if(world[3][plot[i][1]][plot[i][0]] === 'house1'){
                    world[0][plot[i][1]][plot[i][0]] = 19;
                  } else if(world[3][plot[i][1]][plot[i][0]] === 'house4'){
                    world[0][plot[i][1]][plot[i][0]] = 17;
                  }
                }
                for(i in walls){
                  var n = walls[i];
                  world[4][n[1]][n[0]] = 2;
                }
                var fp = getCoords(walls[1][0],walls[1][1]);
                Fireplace({
                  x:fp[0],
                  y:fp[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Player.list[b.owner].inventory.keys.push(b.id);
              } else if(b.type === 'fort'){
                world[0][plot[0][1]][plot[0][0]] = 13;
                world[3][plot[0][1]][plot[0][0]] = 'fort';
              } else if(b.type === 'wall'){
                world[0][plot[0][1]][plot[0][0]] = 15;
                world[3][plot[0][1]][plot[0][0]] = 'wall';
              } else if(b.type === 'outpost'){
                world[0][plot[0][1]][plot[0][0]] = 13;
                world[3][plot[0][1]][plot[0][0]] = 'outpost0';
                world[5][top[0][1]][top[0][0]] = 'outpost1';
              } else if(b.type === 'gtower'){
                for(i in plot){
                  world[0][plot[i][1]][plot[i][0]] = 15;
                  world[3][plot[i][1]][plot[i][0]] = String('gtower' + i);
                }
                world[5][top[0][1]][top[0][0]] = 'gtower4';
                world[5][top[1][1]][top[1][0]] = 'gtower5';
              } else if(b.type === 'tower'){
                for(i in plot){
                  world[3][plot[i][1]][plot[i][0]] = String('tower' + i);
                  if(world[3][plot[i][1]][plot[i][0]] === 'tower0'){
                    world[0][plot[i][1]][plot[i][0]] = 19;
                    world[5][plot[i][1]][plot[i][0]] = 15;
                  } else if(world[3][plot[i][1]][plot[i][0]] === 'tower1' || world[3][plot[i][1]][plot[i][0]] === 'tower3' || world[3][plot[i][1]][plot[i][0]] === 'tower4'){
                    world[0][plot[i][1]][plot[i][0]] = 17;
                    world[5][plot[i][1]][plot[i][0]] = 15;
                  } else {
                    world[0][plot[i][1]][plot[i][0]] = 15;
                    world[5][plot[i][1]][plot[i][0]] = 15;
                  }
                }
                var ii = 9;
                for(i in top){
                  var n = top[i];
                  world[5][n[1]][n[0]] = String('tower' + ii);
                  world[4][n[1]][n[0]] = 2;
                  if(world[5][n[1]][n[0]] === 'tower10'){
                    world[4][n[1]][n[0]] = 4;
                  } else if(world[5][n[1]][n[0]] === 'tower12' || world[5][n[1]][n[0]] === 'tower13' || world[5][n[1]][n[0]] === 'tower14'){
                    world[4][n[1]][n[0]] = 0;
                  }
                  ii++;
                }
                var fp = getCoords(walls[2][0],walls[2][1]);
                Fireplace({
                  x:fp[0],
                  y:fp[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Player.list[b.owner].inventory.keys.push(b.id);
              } else if(b.type === 'tavern'){
                for(i in plot){
                  world[3][plot[i][1]][plot[i][0]] = String('tavern' + i);
                  if(world[3][plot[i][1]][plot[i][0]] === 'tavern1'){
                    world[0][plot[i][1]][plot[i][0]] = 14;
                  } else if(world[3][plot[i][1]][plot[i][0]] === 'tavern0' || world[3][plot[i][1]][plot[i][0]] === 'tavern2'){
                    world[0][plot[i][1]][plot[i][0]] = 13;
                  } else {
                    world[0][plot[i][1]][plot[i][0]] = 13;
                    world[5][plot[i][1]][plot[i][0]] = 13;
                    world[8][plot[i][1]][plot[i][0]] = 1;
                  }
                }
                var ii = 17;
                for(i in top){
                  var n = top[i];
                  world[5][n[1]][n[0]] = String('tavern' + ii);
                  ii++;
                }
                for(i in walls){
                  var n = walls[i];
                  world[4][n[1]][n[0]] = 1;
                }
                world[4][walls[0][1]][walls[0][0]] = 5;
                world[8][walls[0][1]][walls[0][0]] = 5;
                world[4][walls[4][1]][walls[4][0]] = 3;
                var fp = getCoords(walls[2][0],walls[2][1]);
                var sh = getCoords(walls[3][0],walls[3][1]);
                var b1 = getCoords(plot[0][0],plot[0][1]);
                var b2 = getCoords(plot[2][0],plot[2][1]);
                var b3 = getCoords(plot[3][0],plot[3][1]);
                var b4 = getCoords(plot[7][0],plot[7][1]);
                var b5 = getCoords(plot[8][0],plot[8][1]);
                var bd = getCoords(walls[0][0],walls[0][1]);
                var ch = getCoords(plot[16][0],plot[16][1]);
                var wt = getCoords(walls[1][0],walls[1][1])
                var b6 = getCoords(plot[4][0],plot[4][1]);
                var cr = getCoords(plot[5][0],plot[5][1]);
                var b7 = getCoords(plot[6][0],plot[6][1]);
                var b8 = getCoords(plot[12][0],plot[12][1]);
                Fireplace({
                  x:fp[0],
                  y:fp[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                StagHead({
                  x:sh[0],
                  y:sh[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Barrel({
                  x:b1[0],
                  y:b1[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Barrel({
                  x:b2[0],
                  y:b2[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Barrel({
                  x:b3[0],
                  y:b3[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Barrel({
                  x:b4[0],
                  y:b4[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Barrel({
                  x:b5[0],
                  y:b5[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Bed({
                  x:bd[0],
                  y:bd[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
                Fireplace({
                  x:fp[0],
                  y:fp[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
                Barrel({
                  x:b3[0],
                  y:b3[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
                Barrel({
                  x:b4[0],
                  y:b4[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
                Chest({
                  x:ch[0],
                  y:ch[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
                Wtorch({
                  x:wt[0],
                  y:wt[1],
                  z:-2,
                  qty:1,
                  parent:b.id
                });
                Barrel({
                  x:b3[0],
                  y:b3[1],
                  z:-2,
                  qty:1,
                  parent:b.id
                });
                Barrel({
                  x:b6[0],
                  y:b6[1],
                  z:-2,
                  qty:1,
                  parent:b.id
                });
                Crates({
                  x:cr[0],
                  y:cr[1],
                  z:-2,
                  qty:1,
                  parent:b.id
                });
                Barrel({
                  x:b7[0],
                  y:b7[1],
                  z:-2,
                  qty:1,
                  parent:b.id
                });
                Barrel({
                  x:b4[0],
                  y:b4[1],
                  z:-2,
                  qty:1,
                  parent:b.id
                });
                Barrel({
                  x:b5[0],
                  y:b5[1],
                  z:-2,
                  qty:1,
                  parent:b.id
                });
                Barrel({
                  x:b8[0],
                  y:b8[1],
                  z:-2,
                  qty:1,
                  parent:b.id
                });
              } else if(b.type === 'monastery'){
                for(i in plot){
                  world[3][plot[i][1]][plot[i][0]] = String('monastery' + i);
                  if(world[3][plot[i][1]][plot[i][0]] === 'monastery0'){
                    world[0][plot[i][1]][plot[i][0]] = 16;
                  } else if(world[3][plot[i][1]][plot[i][0]] === 'monastery1' || world[3][plot[i][1]][plot[i][0]] === 'monastery2' || world[3][plot[i][1]][plot[i][0]] === 'monastery4' || world[3][plot[i][1]][plot[i][0]] === 'monastery5' || world[3][plot[i][1]][plot[i][0]] === 'monastery6'){
                    world[0][plot[i][1]][plot[i][0]] = 17;
                  } else if(world[3][plot[i][1]][plot[i][0]] === 'monastery3' || world[3][plot[i][1]][plot[i][0]] === 'monastery7'){
                    world[0][plot[i][1]][plot[i][0]] = 15;
                  } else if(world[3][plot[i][1]][plot[i][0]] === 'monastery12' || world[3][plot[i][1]][plot[i][0]] === 'monastery13'){
                    world[0][plot[i][1]][plot[i][0]] = 15;
                    world[5][plot[i][1]][plot[i][0]] = 17;
                  } else {
                    world[0][plot[i][1]][plot[i][0]] = 15;
                    world[5][plot[i][1]][plot[i][0]] = 15;
                  }
                }
                var ii = 14;
                for(i in top){
                  var n = top[i];
                  world[5][n[1]][n[0]] = String('monastery' + ii);
                  ii++;
                }
                for(i in walls){
                  var n = walls[i];
                  world[4][n[1]][n[0]] = 2;
                }
                world[4][walls[1][1]][walls[1][0]] = 4;
                var wt = getCoords(walls[0][0],walls[0][1]);
                var cr = getCoords(walls[2][0],walls[2][1]);
                var bs = getCoords(walls[3][0],walls[3][1]);
                Wtorch({
                  x:wt[0],
                  y:wt[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Cross({
                  x:cr[0],
                  y:cr[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Bookshelf({
                  x:cr[0],
                  y:cr[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
                Bookshelf({
                  x:bs[0],
                  y:bs[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
              } else if(b.type === 'market'){
                for(i in plot){
                  world[3][plot[i][1]][plot[i][0]] = String('market' + i);
                  if(world[3][plot[i][1]][plot[i][0]] === 'market0' || world[3][plot[i][1]][plot[i][0]] === 'market1' || world[3][plot[i][1]][plot[i][0]] === 'market2'){
                    world[0][plot[i][1]][plot[i][0]] = 14;
                  } else {
                    world[0][plot[i][1]][plot[i][0]] = 13;
                    world[5][plot[i][1]][plot[i][0]] = 13;
                  }
                }
                var ii = 12;
                for(i in top){
                  var n = top[i];
                  world[5][n[1]][n[0]] = String('market' + ii);
                  ii++;
                }
                for(i in walls){
                  var n = walls[i];
                  if(world[5][n[1]][n[0]] === 'market12'){
                    world[4][n[1]][n[0]] = 3;
                  } else {
                    world[4][n[1]][n[0]] = 1;
                  }
                }
                var g1 = getCoords(walls[1][0],walls[1][1]);
                var g2 = getCoords(walls[2][0],walls[2][1]);
                var g3 = getCoords(walls[3][0],walls[3][1]);
                var g4 = getCoords(walls[4][0],walls[4][1]);
                var fp = getCoords(plot[3][0],plot[3][1]);
                var cr1 = getCoords(plot[8][0],plot[8][1]);
                var d1 = getCoords(plot[9][0],plot[9][1]);
                var d2 = getCoords(plot[10][0],plot[10][1]);
                var cr2 = getCoords(plot[11][0],plot[11][1]);
                Goods1({
                  x:g1[0],
                  y:g1[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Goods2({
                  x:g2[0],
                  y:g2[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Goods3({
                  x:g3[0],
                  y:g3[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Goods4({
                  x:g4[0],
                  y:g4[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Firepit({
                  x:fp[0],
                  y:fp[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Wtorch({
                  x:g1[0],
                  y:g1[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
                Stash1({
                  x:g2[0],
                  y:g2[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
                Stash2({
                  x:g3[0],
                  y:g3[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
                Wtorch({
                  x:g4[0],
                  y:g4[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
                Crates({
                  x:cr1[0],
                  y:cr1[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
                Desk({
                  x:d1[0],
                  y:d1[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
                Desk({
                  x:d2[0],
                  y:d2[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
                Crates({
                  x:cr2[0],
                  y:cr2[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
              } else if(b.type === 'stable'){
                for(i in plot){
                  world[3][plot[i][1]][plot[i][0]] = String('stable' + i);
                  world[0][plot[i][1]][plot[i][0]] = 13;
                }
                var ii = 8;
                for(i in top){
                  var n = top[i];
                  world[5][n[1]][n[0]] = String('stable' + ii);
                  ii++;
                }
              } else if(b.type === 'dock'){
                for(i in plot){
                  world[3][plot[i][1]][plot[i][0]] = String('dock' + i);
                  if(world[3][plot[i][1]][plot[i][0]] === 'dock4'){
                    world[0][plot[i][1]][plot[i][0]] = 13;
                  } else {
                    world[0][plot[i][1]][plot[i][0]] = 20;
                  }
                }
                var ii = 6;
                for(i in top){
                  var n = top[i];
                  world[5][n[1]][n[0]] = String('dock' + ii);
                  ii++;
                }
              } else if(b.type === 'garrison'){
                for(i in plot){
                  world[3][plot[i][1]][plot[i][0]] = String('garrison' + i);
                  if(world[3][plot[i][1]][plot[i][0]] === 'garrison0'){
                    world[0][plot[i][1]][plot[i][0]] = 16;
                  } else if(world[3][plot[i][1]][plot[i][0]] === 'garrison1' || world[3][plot[i][1]][plot[i][0]] === 'garrison2' || world[3][plot[i][1]][plot[i][0]] === 'garrison3'){
                    world[0][plot[i][1]][plot[i][0]] = 15;
                  } else {
                    world[0][plot[i][1]][plot[i][0]] = 15;
                    world[5][plot[i][1]][plot[i][0]] = 15;
                  }
                }
                var ii = 12;
                for(i in top){
                  var n = top[i];
                  world[5][n[1]][n[0]] = String('garrison' + ii);
                  ii++;
                }
                for(i in walls){
                  var n = walls[i];
                  if(world[5][n[1]][n[0]] === 'garrison12'){
                    world[4][n[1]][n[0]] = 4;
                  } else {
                    world[4][n[1]][n[0]] = 2;
                  }
                }
                var sa = getCoords(walls[0][0],walls[0][1]);
                var sr1 = getCoords(walls[2][0],walls[2][1]);
                var sr2 = getCoords(walls[3][0],walls[3][1]);
                var fp = getCoords(plot[1][0],plot[1][1]);
                var d1 = getCoords(plot[2][0],plot[2][1]);
                var d2 = getCoords(plot[3][0],plot[3][1]);
                var d3 = getCoords(plot[6][0],plot[6][1]);
                var d4 = getCoords(plot[7][0],plot[7][1]);
                var dk = getCoords(plot[8][0],plot[8][1]);
                SuitArmor({
                  x:sa[0],
                  y:sa[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Swordrack({
                  x:sr1[0],
                  y:sr1[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Swordrack({
                  x:sr2[0],
                  y:sr2[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Firepit({
                  x:fp[0],
                  y:fp[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Dummy({
                  x:d1[0],
                  y:d1[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Dummy({
                  x:d2[0],
                  y:d2[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Wtorch({
                  x:sa[0],
                  y:sa[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
                Swordrack({
                  x:sr1[0],
                  y:sr1[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
                Swordrack({
                  x:sr2[0],
                  y:sr2[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
                Dummy({
                  x:d3[0],
                  y:d3[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
                Dummy({
                  x:d4[0],
                  y:d4[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
                Desk({
                  x:dk[0],
                  y:dk[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
              } else if(b.type === 'blacksmith'){
                for(i in plot){
                  world[3][plot[i][1]][plot[i][0]] = String('bsmith' + i);
                  if(world[3][plot[i][1]][plot[i][0]] === 'bsmith1'){
                    world[0][plot[i][1]][plot[i][0]] = 14;
                  } else {
                    world[0][plot[i][1]][plot[i][0]] = 13;
                  }
                }
                var ii = 5;
                for(i in walls){
                  var n = walls[i];
                  world[5][n[1]][n[0]] = String('bsmith' + ii);
                  if(world[5][n[1]][n[0]] === 'bsmith5'){
                    world[5][n[1]][n[0]] = 0;
                    world[4][n[1]][n[0]] = 1;
                  } else {
                    world[4][n[1]][n[0]] = 1;
                  }
                  ii++;
                }
                var fg = getCoords(walls[1][0],walls[1][1]);
                var br = getCoords(plot[3][0],plot[3][1]);
                var anv = getCoords(plot[5][0],plot[5][1]);
                Forge({
                  x:fg[0],
                  y:fg[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Barrel({
                  x:br[0],
                  y:br[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Anvil({
                  x:anv[0],
                  y:anv[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
              } else if(b.type === 'stronghold'){
                for(i in plot){
                  world[3][plot[i][1]][plot[i][0]] = String('stronghold' + i);
                  if(world[3][plot[i][1]][plot[i][0]] === 'stronghold1' || world[3][plot[i][1]][plot[i][0]] === 'stronghold2'){
                    world[0][plot[i][1]][plot[i][0]] = 16;
                  } else if(world[3][plot[i][1]][plot[i][0]] === 'stronghold0' || world[3][plot[i][1]][plot[i][0]] === 'stronghold3'){
                    world[0][plot[i][1]][plot[i][0]] = 15;
                  } else if(world[3][plot[i][1]][plot[i][0]] === 'stronghold7' ||
                  world[3][plot[i][1]][plot[i][0]] === 'stronghold8' ||
                  world[3][plot[i][1]][plot[i][0]] === 'stronghold15' ||
                  world[3][plot[i][1]][plot[i][0]] === 'stronghold16' ||
                  world[3][plot[i][1]][plot[i][0]] === 'stronghold23' ||
                  world[3][plot[i][1]][plot[i][0]] === 'stronghold24' ||
                  world[3][plot[i][1]][plot[i][0]] === 'stronghold31' ||
                  world[3][plot[i][1]][plot[i][0]] === 'stronghold32' ||
                  world[3][plot[i][1]][plot[i][0]] === 'stronghold39' ||
                  world[3][plot[i][1]][plot[i][0]] === 'stronghold40' ||
                  world[3][plot[i][1]][plot[i][0]] === 'stronghold46' ||
                  world[3][plot[i][1]][plot[i][0]] === 'stronghold47' ||
                  world[3][plot[i][1]][plot[i][0]] === 'stronghold53' ||
                  world[3][plot[i][1]][plot[i][0]] === 'stronghold54'){
                    world[0][plot[i][1]][plot[i][0]] = 17;
                    world[5][plot[i][1]][plot[i][0]] = 15;
                    world[8][plot[i][1]][plot[i][0]] = 1;
                  } else {
                    world[0][plot[i][1]][plot[i][0]] = 15;
                    world[5][plot[i][1]][plot[i][0]] = 15;
                    world[8][plot[i][1]][plot[i][0]] = 1;
                  }
                }
                var ii = 58;
                for(i in top){
                  var n = top[i];
                  world[5][n[1]][n[0]] = String('stronghold' + ii);
                  ii++;
                }
                for(i in walls){
                  var n = walls[i];
                  if(world[5][n[1]][n[0]] === 'stronghold58' || world[5][n[1]][n[0]] === 'stronghold62'){
                    world[4][n[1]][n[0]] = 4;
                  } else {
                    world[4][n[1]][n[0]] = 2;
                  }
                }
                world[4][walls[0][1]][walls[0][0]] = 6;
                world[8][walls[0][1]][walls[0][0]] = 5;
                var sa1 = getCoords(walls[2][0],walls[2][1]);
                var thr = getCoords(walls[3][0],walls[3][1]);
                var b2 = getCoords(walls[4][0],walls[4][1]);
                var sa2 = getCoords(walls[5][0],walls[5][1]);
                var sr = getCoords(walls[7][0],walls[7][1]);
                var fp1 = getCoords(plot[0][0],plot[0][1]);
                var fp2 = getCoords(plot[3][0],plot[3][1]);
                var fp3 = getCoords(plot[22][0],plot[22][1]);
                var fp4 = getCoords(plot[25][0],plot[25][1]);
                var fp5 = getCoords(plot[45][0],plot[45][1]);
                var fp6 = getCoords(plot[48][0],plot[48][1]);
                var ch2 = getCoords(walls[4][0],walls[4][1]);
                var ch3 = getCoords(walls[6][0],walls[6][1]);
                var fp7 = getCoords(plot[24][0],plot[24][1]);
                var j1 = getCoords(plot[44][0],plot[44][1]);
                var j3 = getCoords(plot[46][0],plot[46][1]);
                var j4 = getCoords(plot[47][0],plot[47][1]);
                var j6 = getCoords(plot[49][0],plot[49][1]);
                var j7 = getCoords(plot[50][0],plot[50][1]);
                SuitArmor({
                  x:sa1[0],
                  y:sa1[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Banner({
                  x:thr[0],
                  y:thr[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Banner({
                  x:b2[0],
                  y:b2[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Throne({
                  x:thr[0],
                  y:thr[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                SuitArmor({
                  x:sa2[0],
                  y:sa2[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Swordrack({
                  x:sr[0],
                  y:sr[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Firepit({
                  x:fp1[0],
                  y:fp1[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Firepit({
                  x:fp2[0],
                  y:fp2[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Firepit({
                  x:fp3[0],
                  y:fp3[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Firepit({
                  x:fp4[0],
                  y:fp4[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Firepit({
                  x:fp5[0],
                  y:fp5[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Firepit({
                  x:fp6[0],
                  y:fp6[1],
                  z:1,
                  qty:1,
                  parent:b.id
                });
                Wtorch({
                  x:sa1[0],
                  y:sa1[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
                Bed({
                  x:thr[0],
                  y:thr[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
                Wtorch({
                  x:sa2[0],
                  y:sa2[1],
                  z:2,
                  qty:1,
                  parent:b.id
                });
                Chains({
                  x:sa1[0],
                  y:sa1[1],
                  z:-2,
                  qty:1,
                  parent:b.id
                });
                Chains({
                  x:ch2[0],
                  y:ch2[1],
                  z:-2,
                  qty:1,
                  parent:b.id
                });
                Chains({
                  x:ch3[0],
                  y:ch3[1],
                  z:-2,
                  qty:1,
                  parent:b.id
                });
                Jail({
                  x:j1[0],
                  y:j1[1],
                  z:-2,
                  qty:1,
                  parent:b.id
                });
                Jail({
                  x:fp5[0],
                  y:fp5[1],
                  z:-2,
                  qty:1,
                  parent:b.id
                });
                Jail({
                  x:j3[0],
                  y:j3[1],
                  z:-2,
                  qty:1,
                  parent:b.id
                });
                Wtorch({
                  x:j3[0],
                  y:j3[1],
                  z:-2,
                  qty:1,
                  parent:b.id
                });
                JailDoor({
                  x:j4[0],
                  y:j4[1],
                  z:-2,
                  qty:1,
                  parent:b.id
                });
                Jail({
                  x:fp6[0],
                  y:fp6[1],
                  z:-2,
                  qty:1,
                  parent:b.id
                });
                Wtorch({
                  x:fp6[0],
                  y:fp6[1],
                  z:-2,
                  qty:1,
                  parent:b.id
                });
                Jail({
                  x:j6[0],
                  y:j6[1],
                  z:-2,
                  qty:1,
                  parent:b.id
                });
                Jail({
                  x:j7[0],
                  y:j7[1],
                  z:-2,
                  qty:1,
                  parent:b.id
                });
                Firepit({
                  x:fp7[0],
                  y:fp7[1],
                  z:-2,
                  qty:1,
                  parent:b.id
                });
              }
              io.emit('mapEdit',world);
            }
          }
        },10000/self.strength);
      } else {
        return;
      }
    }
  }

  self.shootArrow = function(angle){
    Arrow({
      parent:self.id,
      angle:angle,
      x:self.x,
      y:self.y,
      z:self.z
    });
  }

  self.lightTorch = function(torchId){
    if(self.hasTorch){
      Item.list[self.hasTorch].toRemove = true;
      self.hasTorch = false;
    } else if(self.inventory.torch > 0){
      if(self.z !== -3){
        LitTorch({
          id:torchId,
          parent:self.id,
          x:self.x,
          y:self.y,
          z:self.z,
          qty:1
        })
        self.inventory.torch--;
        self.hasTorch = torchId;
      } else {
        SOCKET_LIST[self.id].emit('addToChat','<b>DM:</b> You cannot do that here.');
      }
    } else {
      SOCKET_LIST[self.id].emit('addToChat','<b>DM:</b> You have no torches.');
    }
  }

  // x,y movement
  self.updateSpd = function(){
    var loc = getLoc(self.x, self.y);
    var rightBlocked = false;
    var leftBlocked = false;
    var upBlocked = false;
    var downBlocked = false;

    // outdoor collisions
    if(self.z === 0 && (getLocTile(0,self.x+(tileSize/6),self.y) === 13 ||
    getLocTile(0,self.x+(tileSize/6),self.y) === 15 ||
    getLocTile(0,self.x+(tileSize/6),self.y) === 17 ||
    (getLocTile(0,self.x+(tileSize/6),self.y) === 19 && !keyCheck(self.x+(tileSize/2),self.y,self.id)) ||
    getLocItem(0,self.x+(tileSize/6),self.y) !== 0 ||
    (self.x + 10) > (mapPx - tileSize)) && (getLocTile(0,self.x,self.y) !== 13 && getLocTile(0,self.x,self.y) !== 15 && getLocTile(0,self.x,self.y) !== 17)){
      rightBlocked = true;
    }
    if(self.z === 0 && (getLocTile(0,self.x-(tileSize/6),self.y) === 13 ||
    getLocTile(0,self.x-(tileSize/6),self.y) === 15 ||
    getLocTile(0,self.x-(tileSize/6),self.y) === 17 ||
    getLocItem(0,self.x-(tileSize/6),self.y) !== 0 ||
    (self.x - 10) < 0) && (getLocTile(0,self.x,self.y) !== 13 && getLocTile(0,self.x,self.y) !== 15 && getLocTile(0,self.x,self.y) !== 17)){
      leftBlocked = true;
    }
    if(self.z === 0 && (getLocTile(0,self.x,self.y-(tileSize/2)) === 13 ||
    getLocTile(0,self.x,self.y-(tileSize/6)) === 15 ||
    getLocTile(0,self.x,self.y-(tileSize/6)) === 17 ||
    (getLocTile(0,self.x,self.y-(tileSize/6)) === 19 && !keyCheck(self.x,self.y-(tileSize/2),self.id)) ||
    getLocItem(0,self.x,self.y-(tileSize/6)) !== 0 ||
    (getLocTile(5,self.x,self.y-(tileSize/6)) === 'gatec' && !gateCheck(self.x,self.y-(tileSize/2),self.house,self.kingdom)) ||
    (self.y - 10) < 0) && (getLocTile(0,self.x,self.y) !== 13 && getLocTile(0,self.x,self.y) !== 15 && getLocTile(0,self.x,self.y) !== 17)){
      upBlocked = true;
    }
    if(self.z === 0 && (getLocTile(0,self.x,self.y+(tileSize*0.75)) === 13 ||
    getLocTile(0,self.x,self.y+(tileSize*0.75)) === 15 ||
    getLocTile(0,self.x,self.y+(tileSize*0.75)) === 17 ||
    getLocItem(0,self.x,self.y+(tileSize*0.75)) !== 0 ||
    (getLocTile(5,self.x,self.y+(tileSize*0.75)) === 'gatec' && !gateCheck(self.x,self.y+(tileSize*0.75),self.house,self.kingdom)) ||
    (self.y + 10) > (mapPx - tileSize)) && (getLocTile(0,self.x,self.y) !== 13 && getLocTile(0,self.x,self.y) !== 15 && getLocTile(0,self.x,self.y) !== 17)){
      downBlocked = true;
    }

    // collision in caves
    if(self.z === -1 && (getLocTile(1,self.x+(tileSize/6),self.y) === 1 || getLocItem(1,self.x+(tileSize/6),self.y) !== 0 || (self.x + 10) > (mapPx - tileSize))){
      rightBlocked = true;
    }
    if(self.z === -1 && (getLocTile(1,self.x-(tileSize/6),self.y) === 1 || getLocItem(1,self.x-(tileSize/6),self.y) !== 0 || (self.x - 10) < 0)){
      leftBlocked = true;
    }
    if(self.z === -1 && (getLocTile(1,self.x,self.y-(tileSize/6)) === 1 || getLocItem(1,self.x,self.y-(tileSize/6)) !== 0 || (self.y - 10) < 0)){
      upBlocked = true;
    }
    if(self.z === -1 && (getLocTile(1,self.x,self.y+(tileSize/4)) === 1 || getLocItem(1,self.x,self.y+(tileSize/4)) !== 0 || (self.y + 10) > (mapPx - tileSize))){
      downBlocked = true;
    }

    // indoor1 collisions
    if(self.z === 1){
      if(getLocTile(3,self.x+(tileSize/6),self.y) === 0 || getLocItem(0,self.x+(tileSize/6),self.y) !== 0){
        rightBlocked = true;
      }
      if(getLocTile(3,self.x-(tileSize/6),self.y) === 0 || getLocItem(0,self.x-(tileSize/6),self.y) !== 0){
        leftBlocked = true;
      }
      if(getLocTile(4,self.x,self.y-(tileSize/6)) === 1 || getLocTile(4,self.x,self.y-(tileSize/6)) === 2 || getLocItem(0,self.x,self.y-(tileSize/6)) !== 0){
        upBlocked = true;
      }
      if((getLocTile(0,self.x,self.y) !== 14 && getLocTile(0,self.x,self.y) !== 16 && getLocTile(0,self.x,self.y) !== 19 && getLocTile(3,self.x,self.y+(tileSize/4)) === 0) || getLocItem(0,self.x,self.y+(tileSize/4)) !== 0){
        downBlocked = true;
      }
    }

    // indoor2 collisions
    if(self.z === 2 && (getLocTile(3,self.x+(tileSize/2),self.y) === 0 || getLocTile(4,self.x+(tileSize/2),self.y) === 5 || getLocTile(4,self.x+(tileSize/2),self.y) === 6 || getLocItem(3,self.x+(tileSize/2),self.y) !== 0)){
      rightBlocked = true;
    }
    if(self.z === 2 && (getLocTile(3,self.x-(tileSize/2),self.y) === 0 || getLocTile(4,self.x-(tileSize/2),self.y) === 5 || getLocTile(4,self.x-(tileSize/2),self.y) === 6 || getLocItem(3,self.x-(tileSize/2),self.y) !== 0)){
      leftBlocked = true;
    }
    if(self.z === 2 && (getLocTile(4,self.x,self.y-(tileSize/6)) === 1 || getLocTile(4,self.x,self.y-(tileSize/6)) === 2 || getLocTile(4,self.x,self.y-(tileSize/6)) === 5 || getLocTile(4,self.x,self.y-(tileSize/6)) === 6 || getLocItem(3,self.x,self.y-(tileSize/6)) !== 0)){
      upBlocked = true;
    }
    if(self.z === 2 && (getLocTile(5,self.x,self.y+(tileSize/4)) === 0 || getLocItem(3,self.x,self.y+(tileSize/4)) !== 0)){
      downBlocked = true;
    }

    // cellar/dungeon collisions
    if(self.z === -2 && (getLocTile(8,self.x+(tileSize/2),self.y) === 0 || getLocItem(4,self.x+(tileSize/2),self.y) !== 0)){
      rightBlocked = true;
    }
    if(self.z === -2 && (getLocTile(8,self.x-(tileSize/2),self.y) === 0 || getLocItem(4,self.x-(tileSize/2),self.y) !== 0)){
      leftBlocked = true;
    }
    if(self.z === -2 && (getLocTile(8,self.x,self.y-(tileSize/6)) === 0 || getLocItem(4,self.x,self.y-(tileSize/6)) !== 0)){
      upBlocked = true;
    }
    if(self.z === -2 && (getLocTile(8,self.x,self.y+(tileSize/4)) === 0 || getLocItem(4,self.x,self.y+(tileSize/4)) !== 0)){
      downBlocked = true;
    }

    // underwater collisions
    if(self.z === -3 && getLocItem(2,self.x+(tileSize/2),self.y) !== 0){
      rightBlocked = true;
    }
    if(self.z === -3 && getLocItem(2,self.x-(tileSize/2),self.y) !== 0){
      leftBlocked = true;
    }
    if(self.z === -3 && getLocItem(2,self.x,self.y-(tileSize/6)) !== 0){
      upBlocked = true;
    }
    if(self.z === -3 && getLocItem(2,self.x,self.y+(tileSize/4)) !== 0){
      downBlocked = true;
    }

    if(self.pressingRight){
      self.facing = 'right';
      self.working = false;
      if(!rightBlocked){
        self.spdX = self.maxSpd;
      } else {
        self.spdX = 0;
      }
    } else if(self.pressingLeft){
      self.facing = 'left';
      self.working = false;
      if(!leftBlocked){
        self.spdX = -self.maxSpd;
      } else {
        self.spdX = 0;
      }
    } else {
      self.spdX = 0;
    }

    if(self.pressingUp){
      self.facing = 'up';
      self.working = false;
      if(!upBlocked){
        self.spdY = -self.maxSpd;
      } else {
        self.spdY = 0;
      }
    } else if(self.pressingDown){
      self.facing = 'down';
      self.working = false;
      if(!downBlocked){
        self.spdY = self.maxSpd;
      } else {
        self.spdY = 0;
      }
    } else {
      self.spdY = 0;
    }

    // terrain effects and z movement
    if(self.z === 0){
      if(getTile(0,loc[0],loc[1]) === 6){
        self.z = -1;
        self.inTrees = false;
        self.onMtn = false;
        self.maxSpd = self.baseSpd;
      } else if(getTile(0,loc[0],loc[1]) === 1){
        self.inTrees = true;
        self.onMtn = false;
        self.maxSpd = self.baseSpd * 0.3;
      } else if(getTile(0,loc[0],loc[1]) === 2 || getTile(0,loc[0],loc[1]) === 3){
        self.inTrees = false;
        self.onMtn = false;
        self.maxSpd = self.baseSpd * 0.5;
      } else if(getTile(0,loc[0],loc[1]) === 4){
        self.inTrees = false;
        self.onMtn = false;
        self.maxSpd = self.baseSpd * 0.75;
      } else if(getTile(0,loc[0],loc[1]) === 5 && !self.onMtn){
        self.inTrees = false;
        self.maxSpd = self.baseSpd * 0.2;
        setTimeout(function(){
          if(getTile(0,loc[0],loc[1]) === 5){
            self.onMtn = true;
          }
        },2000);
      } else if(getTile(0,loc[0],loc[1]) === 5 && self.onMtn){
        self.maxSpd = self.baseSpd * 0.5;
      } else if(getTile(0,loc[0],loc[1]) === 18){
        self.inTrees = false;
        self.onMtn = false;
        self.maxSpd = self.baseSpd * 1.1;
      } else if(getTile(0,loc[0],loc[1]) === 14 || getTile(0,loc[0],loc[1]) === 16 || getTile(0,loc[0],loc[1]) === 19){
        if(getTile(0,loc[0],loc[1]) === 19){
          self.z = 1;
          SOCKET_LIST[self.id].emit('addToChat','<i>You unlock the door.</i>');
        } else {
          self.z = 1;
        }
        self.inTrees = false;
        self.onMtn = false;
        self.maxSpd = self.baseSpd;
      } else if(getTile(0,loc[0],loc[1]) === 0){
        self.z = -3;
        self.inTrees = false;
        self.onMtn = false;
        self.maxSpd = self.baseSpd * 0.1;
      } else {
        self.inTrees = false;
        self.onMtn = false;
        self.maxSpd = self.baseSpd;
      }
    } else if(self.z === -1){
      if(getTile(1,loc[0],loc[1]) === 2){
        self.z = 0;
        self.inTrees = false;
        self.onMtn = false;
      }
    } else if(self.z === -2){
      if(getTile(8,loc[0],loc[1]) === 5){
        self.z = 1;
        self.y += (tileSize/2);
        self.facing = 'down';
      }
    } else if(self.z === -3){
      if(getTile(0,loc[0],loc[1]) !== 0){
        self.z = 0;
      }
    } else if(self.z === 1){
      if(getTile(0,loc[0],loc[1] - 1) === 14 || getTile(0,loc[0],loc[1] - 1) === 16  || getTile(0,loc[0],loc[1] - 1) === 19){
        self.z = 0;
      } else if(getTile(4,loc[0],loc[1]) === 3 || getTile(4,loc[0],loc[1]) === 4){
        self.z = 2;
        self.y += (tileSize/2);
        self.facing = 'down'
      } else if(getTile(4,loc[0],loc[1]) === 5 || getTile(4,loc[0],loc[1]) === 6){
        self.z = -2;
        self.y += (tileSize/2);
        self.facing = 'down';
      }
    } else if(self.z === 2){
      if(getTile(4,loc[0],loc[1]) === 3 || getTile(4,loc[0],loc[1]) === 4){
        self.z = 1;
        self.y += (tileSize/2);
        self.facing = 'down';
      }
    }
  }

  self.getInitPack = function(){
    return {
      name:self.name,
      id:self.id,
      x:self.x,
      y:self.y,
      z:self.z,
      gear:self.gear,
      inTrees:self.inTrees,
      facing:self.facing,
      hp:self.hp,
      hpMax:self.hpMax,
      mana:self.mana,
      manaMax:self.manaMax
    };
  }

  self.getUpdatePack = function(){
    return {
      id:self.id,
      x:self.x,
      y:self.y,
      z:self.z,
      gear:self.gear,
      inTrees:self.inTrees,
      facing:self.facing,
      pressingUp:self.pressingUp,
      pressingDown:self.pressingDown,
      pressingLeft:self.pressingLeft,
      pressingRight:self.pressingRight,
      pressingAttack:self.pressingAttack,
      angle:self.mouseAngle,
      working:self.working,
      hp:self.hp,
      hpMax:self.hpMax,
      mana:self.mana,
      manaMax:self.manaMax
    }
  }

  Player.list[self.id] = self;

  initPack.player.push(self.getInitPack());
  return self;
}

Player.list = {};

Player.onConnect = function(socket,name){
  var spawn = randomSpawnO();
  var player = Player({
    name:name,
    id:socket.id,
    z: 0,
    x: spawn[0],
    y: spawn[1]
  });
  console.log(player.id + ' spawned at : ' + spawn + ' z: 0')
  // player control inputs
  socket.on('keyPress',function(data){
    if(data.inputId === 'left'){
      player.pressingLeft = data.state;
    } else if(data.inputId === 'right'){
      player.pressingRight = data.state;
    } else if(data.inputId === 'up'){
      player.pressingUp = data.state;
    } else if(data.inputId === 'down'){
      player.pressingDown = data.state;
    } else if(data.inputId === 'attack'){
      player.pressingAttack = data.state;
    } else if(data.inputId === 't'){
      player.pressingT = data.state;
    } else if(data.inputId === 'e'){
      player.pressingE = data.state;
    } else if(data.inputId === '1'){
      player.pressing1 = data.state;
    } else if(data.inputId === '2'){
      player.pressing2 = data.state;
    } else if(data.inputId === '3'){
      player.pressing3 = data.state;
    } else if(data.inputId === 'mouseAngle'){
      player.mouseAngle = data.state;
    }
  });

  socket.on('sendMsgToServer',function(data){
    for(var i in SOCKET_LIST){
      SOCKET_LIST[i].emit('addToChat','<b>' + data.name + ':</b> ' + data.message);
    }
  });

  socket.on('sendPmToServer',function(data){
    var recipient = null;
    for(var i in Player.list){
      if(Player.list[i].name === data.recip){
        recipient = SOCKET_LIST[i];
      }
    }
    if(recipient === null){
      socket.emit('addToChat','DM: ' + data.recip + ' is not online.');
    } else {
      recipient.emit('addToChat','<b>@' + player.name + '</b> whispers: <i>' + data.message + '</i>');
      SOCKET_LIST[player.id].emit('addToChat','To ' + data.recip + ': <i>' + data.message + '</i>');
    }
  });

  socket.emit('init',{
    selfId:player.id,
    player:Player.getAllInitPack(),
    arrow:Arrow.getAllInitPack(),
    item:Item.getAllInitPack(),
    light:Light.getAllInitPack()
  })
  console.log('init player id: ' + player.id);
}

Player.getAllInitPack = function(){
  var players = [];
  for(var i in Player.list)
    players.push(Player.list[i].getInitPack());
  return players;
}

Player.onDisconnect = function(socket){
  delete Player.list[socket.id];
  removePack.player.push(socket.id);
}

Player.update = function(){
  var pack = [];
  for(var i in Player.list){
    var player = Player.list[i];
    player.update();
    pack.push(player.getUpdatePack());
  }
  return pack;
}

// ARROWS
Arrow = function(param){
  var self = Entity(param);
  self.angle = param.angle;
  self.spdX = Math.cos(param.angle/180*Math.PI) * 50;
  self.spdY = Math.sin(param.angle/180*Math.PI) * 50;
  self.parent = param.parent;

  self.timer = 0;
  self.toRemove = false;
  var super_update = self.update;
  self.update = function(){
    if(self.timer++ > 100){
      self.toRemove = true;
    }
    super_update();

    for(var i in Player.list){
      var p = Player.list[i];
      if(self.getDistance(p) < 32 && self.z === p.z && self.parent !== p.id){
        p.hp -= 5;
        // defines shooter
        var shooter = Player.list[self.parent];
        // player death & respawn
        if(p.hp <= 0){
          p.hp = p.hpMax;
          var spawn = randomSpawn;
          p.x = spawn[0]; // replace this
          p.y = spawm[1]; // replace this
        }
        self.toRemove = true;
      } else if(self.x === 0 || self.x === mapPx || self.y === 0 || self.y === mapPx){
        self.toRemove = true;
      } else if(self.z === 0 && getLocTile(0,self.x,self.y) === 5 && getLocTile(0,Player.list[self.parent].x,Player.list[self.parent].y) !== 5){
        self.toRemove = true;
      } else if(self.z === 0 && getLocTile(0,self.x,self.y) === 1 && getLocTile(0,Player.list[self.parent].x,Player.list[self.parent].y) !== 1){
        self.toRemove = true;
      } else if(self.z === 0 && (getLocTile(0,self.x,self.y) === 13 || getLocTile(0,self.x,self.y) === 14 || getLocTile(0,self.x,self.y) === 15 || getLocTile(0,self.x,self.y) === 16 || getLocTile(0,self.x,self.y) === 19)){
        self.toRemove = true;
      } else if(self.z === -1 && getLocTile(1,self.x,self.y) === 1){
        self.toRemove = true;
      } else if(self.z === -2 && getLocTile(8,self.x,self.y) === 0){
        self.toRemove = true;
      } else if(self.z === 1 && (getLocTile(3,self.x,self.y) === 0 || getLocTile(4,self.x,self.y) !== 0)){
        self.toRemove = true;
      } else if(self.z === 2 && (getLocTile(5,self.x,self.y) === 0 || getLocTile(4,self.x,self.y) !== 0)){
        self.toRemove = true;
      }
    }
  }

  self.getInitPack = function(){
    return {
      id:self.id,
      angle:self.angle,
      x:self.x,
      y:self.y,
      z:self.z
    };
  }

  self.getUpdatePack = function(){
    return {
      id:self.id,
      x:self.x,
      y:self.y,
      z:self.z
    }
  }

  Arrow.list[self.id] = self;
  initPack.arrow.push(self.getInitPack());
  return self;
}

Arrow.list = {};

Arrow.update = function(){
  var pack = [];
  for(var i in Arrow.list){
    var arrow = Arrow.list[i];
    arrow.update();
    if(arrow.toRemove){
      delete Arrow.list[i];
      removePack.arrow.push(arrow.id);
    } else
      pack.push(arrow.getUpdatePack());
  }
  return pack;
}

Arrow.getAllInitPack = function(){
  var arrows = [];
  for(var i in Arrow.list)
    arrows.push(Arrow.list[i].getInitPack());
  return arrows;
}

// ITEM
Item = function(param){
  var self = Entity(param);
  self.x = param.x;
  self.y = param.y;
  self.z = param.z;
  self.qty = param.qty;
  self.type = null;
  self.class = null;
  self.rank = null; // 0 = common, 1 = rare, 2 = lore, 3 = mythic, 4 = relic
  self.parent = param.parent;
  self.canPickup = true;
  self.toRemove = false;

  self.blocker = function(n){
    var loc = getLoc(self.x,self.y);
    if(self.z === 0 || self.z === 1){
      world[9][loc[1]][loc[0]][0] = n;
    } else if(self.z === 2){
      world[9][loc[1]][loc[0]][3] = n;
    } else if(self.z === -1){
      world[9][loc[1]][loc[0]][1] = n;
    } else if(self.z === -2){
      world[9][loc[1]][loc[0]][4] = n;
    } else if(self.z === -3){
      world[9][loc[1]][loc[0]][2] = n;
    }
  }

  self.getInitPack = function(){
    return {
      id:self.id,
      parent:self.parent,
      type:self.type,
      x:self.x,
      y:self.y,
      z:self.z,
      qty:self.qty
    };
  }

  self.getUpdatePack = function(){
    return{
      id:self.id,
      x:self.x,
      y:self.y,
      z:self.z
    }
  }
  return self;
}

Item.list = {};

Item.update = function(){
  var pack = [];
  for(var i in Item.list){
    var item = Item.list[i];
    item.update();
    if(item.toRemove){
      delete Item.list[i];
      removePack.item.push(item.id);
    } else
      pack.push(item.getUpdatePack());
  }
  return pack;
}

Item.getAllInitPack = function(){
  var items = [];
  for(var i in Item.list)
    items.push(Item.list[i].getInitPack());
  return items;
}

// WOOD
Wood = function(param){
  var self = Item(param);
  self.type = 'wood';
  self.class = 'resource';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// STONE
Stone = function(param){
  var self = Item(param);
  self.type = 'stone';
  self.class = 'resource';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// GRAIN
Grain = function(param){
  var self = Item(param);
  self.type = 'grain';
  self.class = 'resource';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// FLOUR
Flour = function(param){
  var self = Item(param);
  self.type = 'flour';
  self.class = 'resource';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// DOUGH
Dough = function(param){
  var self = Item(param);
  self.type = 'dough';
  self.class = 'resource';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// IRON ORE
IronOre = function(param){
  var self = Item(param);
  self.type = 'iron ore';
  self.class = 'resource';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// IRON BAR
IronBar = function(param){
  var self = Item(param);
  self.type = 'iron bar';
  self.class = 'resource';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// STEEL BAR
SteelBar = function(param){
  var self = Item(param);
  self.type = 'steel bar';
  self.class = 'resource';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// BOAR HIDE
BoarHide = function(param){
  var self = Item(param);
  self.type = 'boar hide';
  self.class = 'resource';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// LEATHER
Leather = function(param){
  var self = Item(param);
  self.type = 'leather';
  self.class = 'resource';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// SILVER ORE
SilverOre = function(param){
  var self = Item(param);
  self.type = 'silver ore';
  self.class = 'resource';
  self.rank = 1;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// SILVER
Silver = function(param){
  var self = Item(param);
  self.type = 'silver';
  self.class = 'resource';
  self.rank = 1;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// GOLD ORE
GoldOre = function(param){
  var self = Item(param);
  self.type = 'gold ore';
  self.class = 'resource';
  self.rank = 1;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// GOLD
Gold = function(param){
  var self = Item(param);
  self.type = 'gold';
  self.class = 'resource';
  self.rank = 1;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// DIAMOND
Diamond = function(param){
  var self = Item(param);
  self.type = 'diamond';
  self.class = 'resource';
  self.rank = 2;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// IRON SWORD
IronSword = function(param){
  var self = Item(param);
  self.type = 'iron sword';
  self.class = 'sword';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// STEEL SWORD
SteelSword = function(param){
  var self = Item(param);
  self.type = 'steel sword';
  self.class = 'sword';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// MORALLTA
Morallta = function(param){
  var self = Item(param);
  self.type = 'morallta';
  self.class = 'sword';
  self.rank = 3;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// TYRFING
Tyrfing = function(param){
  var self = Item(param);
  self.type = 'tyrfing';
  self.class = 'sword';
  self.rank = 3;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// BOW
Bow = function(param){
  var self = Item(param);
  self.type = 'bow';
  self.class = 'bow';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// LONGBOW
Longbow = function(param){
  var self = Item(param);
  self.type = 'longbow';
  self.class = 'bow';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// MERCENARY BOW
MercenaryBow = function(param){
  var self = Item(param);
  self.type = 'mercenary bow';
  self.class = 'bow';
  self.rank = 2;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// IRON LANCE
IronLance = function(param){
  var self = Item(param);
  self.type = 'iron lance';
  self.class = 'lance';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}
// STEEL LANCE
SteelLance = function(param){
  var self = Item(param);
  self.type = 'steel lance';
  self.class = 'lance';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// RUSTIC LANCE
RusticLance = function(param){
  var self = Item(param);
  self.type = 'rustic lance';
  self.class = 'lance';
  self.rank = 1;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// GRANDMASTER LANCE
TeutonicLance = function(param){
  var self = Item(param);
  self.type = 'teutonic lance';
  self.class = 'lance';
  self.rank = 2;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// TUNIC
Tunic = function(param){
  var self = Item(param);
  self.type = 'tunic';
  self.class = 'cloth';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// BRIGANDINE
Brigandine = function(param){
  var self = Item(param);
  self.type = 'brigandine';
  self.class = 'leather';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// LAMELLAR
Lamellar = function(param){
  var self = Item(param);
  self.type = 'lamellar';
  self.class = 'leather';
  self.rank = 1;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// IRON MAIL
IronMail = function(param){
  var self = Item(param);
  self.type = 'iron mail';
  self.class = 'chainmail';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// STEEL MAIL
SteelMail = function(param){
  var self = Item(param);
  self.type = 'steel mail';
  self.class = 'chainmail';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// BRYNJA
Brynja = function(param){
  var self = Item(param);
  self.type = 'brynja';
  self.class = 'chainmail';
  self.rank = 1;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// CUIRASS
Cuirass = function(param){
  var self = Item(param);
  self.type = 'cuirass';
  self.class = 'plate';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// STEEL PLATE
SteelPlate = function(param){
  var self = Item(param);
  self.type = 'steel plate';
  self.class = 'plate';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// GREENWICH PLATE
GreenwichPlate = function(param){
  var self = Item(param);
  self.type = 'greenwich plate';
  self.class = 'plate';
  self.rank = 2;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// GOTHIC PLATE
GothicPlate = function(param){
  var self = Item(param);
  self.type = 'gothic plate';
  self.class = 'plate';
  self.rank = 3;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// CLERIC ROBE
ClericRobe = function(param){
  var self = Item(param);
  self.type = 'cleric robe';
  self.class = 'robe';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// DRUID ROBE
DruidRobe = function(param){
  var self = Item(param);
  self.type = 'druid robe';
  self.class = 'robe';
  self.rank = 1;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// MONK ROBE
MonkRobe = function(param){
  var self = Item(param);
  self.type = 'monk robe';
  self.class = 'robe';
  self.rank = 1;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// WARLOCK ROBE
WarlockRobe = function(param){
  var self = Item(param);
  self.type = 'warlock robe';
  self.class = 'robe';
  self.rank = 1;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// TOME
Tome = function(param){
  var self = Item(param);
  self.type = 'tome';
  self.class = 'text';
  self.rank = 1;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// RUNIC SCROLL
RunicScroll = function(param){
  var self = Item(param);
  self.type = 'runic scroll';
  self.class = 'text';
  self.rank = 1;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// SACRED TEXT
SacredText = function(param){
  var self = Item(param);
  self.type = 'sacred text';
  self.class = 'text';
  self.rank = 1;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// STONE AXE
StoneAxe = function(param){
  var self = Item(param);
  self.type = 'stone axe';
  self.class = 'tool';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// IRON AXE
IronAxe = function(param){
  var self = Item(param);
  self.type = 'iron axe';
  self.class = 'tool';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// STEEL AXE
SteelAxe = function(param){
  var self = Item(param);
  self.type = 'steel axe';
  self.class = 'tool';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// STONE PICKAXE
StonePickaxe = function(param){
  var self = Item(param);
  self.type = 'stone pickaxe';
  self.class = 'tool';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// IRON PICKAXE
IronPickaxe = function(param){
  var self = Item(param);
  self.type = 'iron pickaxe';
  self.class = 'tool';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// STEEL PICKAXE
SteelPickaxe = function(param){
  var self = Item(param);
  self.type = 'steel pickaxe';
  self.class = 'tool';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// KEY
Key = function(param){
  var self = Item(param);
  self.type = 'key';
  self.class = 'tool';
  self.rank = 1;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// TORCH
Torch = function(param){
  var self = Item(param);
  self.type = 'torch';
  self.class = 'tool';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// LIT TORCH
LitTorch = function(param){
  var self = Item(param);
  self.type = 'lit torch';
  self.rank = 0;
  self.canPickup = false;
  self.timer = 0;
  var super_update = self.update;
  self.update = function(){
    if(Player.list[self.parent]){
      self.x = Player.list[self.parent].x - (tileSize * 0.75);
      self.y = Player.list[self.parent].y - (tileSize * 0.75);
      self.z = Player.list[self.parent].z;
    } else {
      self.toRemove = true;
      //Player.list[self.parent].hasTorch = false;
    }
    if(self.timer++ > 3000){
      self.toRemove = true;
      Player.list[self.parent].hasTorch = false;
    }
    if(self.z === -3){
      self.toRemove = true;
      Player.list[self.parent].hasTorch = false;
    }
    super_update();
  }
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  Light({
    parent:self.id,
    radius:1,
    x:self.x,
    y:self.y,
    z:self.z
  });
  return self;
}

// WALL TORCH
Wtorch = function(param){
  var self = Item(param);
  self.type = 'wtorch';
  self.class = 'tool';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  Light({
    parent:self.id,
    radius:1.01,
    x:self.x + (tileSize/2),
    y:self.y,
    z:self.z
  });
  return self;
}

// FIRE
Fire = function(param){
  var self = Item(param);
  self.type = 'fire';
  self.rank = 0;
  self.canPickup = false;
  self.timer = 0;
  var super_update = self.update;
  self.update = function(){
    if(self.timer++ > 8000){
      self.toRemove = true;
    }
    super_update();
  }
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  Light({
    parent:self.id,
    radius:1.2,
    x:self.x + (tileSize/2),
    y:self.y + (tileSize/2),
    z:self.z
  });
  return self;
}

// FIREPIT
Firepit = function(param){
  var self = Item(param);
  self.type = 'firepit';
  self.class = 'tool';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  Light({
    parent:self.id,
    radius:1.2,
    x:self.x + (tileSize/2),
    y:self.y + (tileSize/2),
    z:self.z
  });
  self.blocker(2);
  return self;
}

// FIREPLACE
Fireplace = function(param){
  var self = Item(param);
  self.type = 'fireplace';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  Light({
    parent:self.id,
    radius:1.01,
    x:self.x + (tileSize/2),
    y:self.y + (tileSize/1.5),
    z:self.z
  });
  return self;
}

// FORGE
Forge = function(param){
  var self = Item(param);
  self.type = 'forge';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  Light({
    parent:self.id,
    radius:1.01,
    x:self.x + (tileSize/2),
    y:self.y + (tileSize * 0.75),
    z:self.z
  });
  return self;
}

// BARREL
Barrel = function(param){
  var self = Item(param);
  self.type = 'barrel';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  self.blocker(2);
  return self;
}

// CRATES
Crates = function(param){
  var self = Item(param);
  self.type = 'crates';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  self.blocker(2);
  return self;
}

// BOOKSHELF
Bookshelf = function(param){
  var self = Item(param);
  self.type = 'bookshelf';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// SUIT OF ARMOR
SuitArmor = function(param){
  var self = Item(param);
  self.type = 'suit armor';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// ANVIL
Anvil = function(param){
  var self = Item(param);
  self.type = 'anvil';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  self.blocker(self.type);
  return self;
}

// RUNESTONE
Runestone = function(param){
  var self = Item(param);
  self.type = 'runestone';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  self.blocker(2);
  return self;
}

// DUMMY
Dummy = function(param){
  var self = Item(param);
  self.type = 'dummy';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  self.blocker(2);
  return self;
}

// CROSS
Cross = function(param){
  var self = Item(param);
  self.type = 'cross';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// TENT1
Tent1 = function(param){
  var self = Item(param);
  self.type = 'tent1';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  self.blocker(2);
  return self;
}

// TENT2
Tent2 = function(param){
  var self = Item(param);
  self.type = 'tent2';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  self.blocker(2);
  return self;
}

// TENT3
Tent3 = function(param){
  var self = Item(param);
  self.type = 'tent3';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  self.blocker(2);
  return self;
}

// SKELETON1
Skeleton1 = function(param){
  var self = Item(param);
  self.type = 'skeleton1';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// SKELETON2
Skeleton2 = function(param){
  var self = Item(param);
  self.type = 'skeleton2';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// SKELETON3
Skeleton3 = function(param){
  var self = Item(param);
  self.type = 'skeleton3';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// SKELETON4
Skeleton4 = function(param){
  var self = Item(param);
  self.type = 'skeleton4';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// GOODS1
Goods1 = function(param){
  var self = Item(param);
  self.type = 'goods1';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// GOODS2
Goods2 = function(param){
  var self = Item(param);
  self.type = 'goods2';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// GOODS3
Goods3 = function(param){
  var self = Item(param);
  self.type = 'goods3';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// GOODS4
Goods4 = function(param){
  var self = Item(param);
  self.type = 'goods4';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// STASH1
Stash1 = function(param){
  var self = Item(param);
  self.type = 'stash1';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// STASH2
Stash2 = function(param){
  var self = Item(param);
  self.type = 'stash2';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// DESK
Desk = function(param){
  var self = Item(param);
  self.type = 'desk';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  self.blocker(self.type);
  return self;
}

// SWORDRACK
Swordrack = function(param){
  var self = Item(param);
  self.type = 'swordrack';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// BED
Bed = function(param){
  var self = Item(param);
  self.type = 'bed';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// JAIL
Jail = function(param){
  var self = Item(param);
  self.type = 'jail';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  self.blocker(2);
  return self;
}

// JAIL
JailDoor = function(param){
  var self = Item(param);
  self.type = 'jaildoor';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  self.blocker(self.type);
  return self;
}

// CHAINS
Chains = function(param){
  var self = Item(param);
  self.type = 'chains';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// THRONE
Throne = function(param){
  var self = Item(param);
  self.type = 'throne';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// THRONE
Banner = function(param){
  var self = Item(param);
  self.type = 'banner';
  self.class = 'environment';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// STAG HEAD
StagHead = function(param){
  var self = Item(param);
  self.type = 'stag head';
  self.class = 'environment';
  self.rank = 1;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// CHEST
Chest = function(param){
  var self = Item(param);
  self.type = 'chest';
  self.class = 'tool';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  self.blocker(self.type);
  return self;
}

// LOCKED CHEST
LockedChest = function(param){
  var self = Item(param);
  self.type = 'locked chest';
  self.class = 'tool';
  self.rank = 0;
  self.canPickup = false;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  self.blocker(self.type);
  return self;
}

// BREAD
Bread = function(param){
  var self = Item(param);
  self.type = 'bread';
  self.class = 'consumable';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// FISH
Fish = function(param){
  var self = Item(param);
  self.type = 'fish';
  self.class = 'consumable';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// RAW LAMB
Lamb = function(param){
  var self = Item(param);
  self.type = 'lamb';
  self.class = 'resource';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// RAW BOAR
Boar = function(param){
  var self = Item(param);
  self.type = 'boar';
  self.class = 'resource';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// RAW VENISON
Venison = function(param){
  var self = Item(param);
  self.type = 'venison';
  self.class = 'resource';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// POACHED FISH
PoachedFish = function(param){
  var self = Item(param);
  self.type = 'poached fish';
  self.class = 'consumable';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// LAMB CHOP
LambChop = function(param){
  var self = Item(param);
  self.type = 'lamb chop';
  self.class = 'consumable';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// BOAR SHANK
BoarShank = function(param){
  var self = Item(param);
  self.type = 'boar shank';
  self.class = 'consumable';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// VENISON LOIN
VenisonLoin = function(param){
  var self = Item(param);
  self.type = 'venison loin';
  self.class = 'consumable';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// SAISON
Saison = function(param){
  var self = Item(param);
  self.type = 'saison';
  self.class = 'consumable';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// GOSE
Gose = function(param){
  var self = Item(param);
  self.type = 'gose';
  self.class = 'consumable';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// LAMBIC
Lambic = function(param){
  var self = Item(param);
  self.type = 'lambic';
  self.class = 'consumable';
  self.rank = 0;
  self.canPickup = true;
  Item.list[self.id] = self;
  initPack.item.push(self.getInitPack());
  return self;
}

// LIGHT SOURCE
Light = function(param){
  var self = Entity(param);
  self.parent = param.parent;
  self.radius = param.radius;
  self.toRemove = false;
  var super_update = self.update;
  if(Item.list[self.parent].type === 'lit torch'){
    self.update = function(){
      if(Item.list[self.parent]){
        self.x = Item.list[self.parent].x + (tileSize * 0.25);
        self.y = Item.list[self.parent].y;
        self.z = Item.list[self.parent].z;
      } else {
        self.toRemove = true;
      }
      super_update();
    }
  } else {
    self.update = function(){
      if(!Item.list[self.parent]){
        self.toRemove = true;
      }
      super_update();
    }
  }

  self.getInitPack = function(){
    return {
      id:self.id,
      x:self.x,
      y:self.y,
      z:self.z,
      radius:self.radius
    };
  }

  self.getUpdatePack = function(){
    return {
      id:self.id,
      x:self.x,
      y:self.y,
      z:self.z
    }
  }

  Light.list[self.id] = self;
  initPack.light.push(self.getInitPack());
  return self;
}

Light.list = {};

Light.update = function(){
  var pack = [];
  for(var i in Light.list){
    var light = Light.list[i];
    light.update();
    if(light.toRemove){
      delete Light.list[i];
      removePack.light.push(light.id);
    } else
      pack.push(light.getUpdatePack());
  }
  return pack;
}

Light.getAllInitPack = function(){
  var lights = [];
  for(var i in Light.list)
    lights.push(Light.list[i].getInitPack());
  return lights;
}
