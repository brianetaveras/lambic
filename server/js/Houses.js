House = function(param){
  var self = Entity(param);
  self.type = param.type;
  self.name = param.name;
  self.flag = param.flag;
  self.hq = param.hq;
  self.origin = param.origin;
  self.leader = param.leader;
  self.kingdom = param.kingdom;
  self.hostile = param.hostile; // true = attacks neutral players/units
  self.campaign = 0;
  self.underAttack = false;
  self.population = 1;
  self.allies = [];
  self.enemies = [];

  self.stores = {
    grain:0,
    wood:0,
    stone:0,
    iron:0,
    silver:0,
    gold:0
  }
  House.list[self.id] = self;

  io.emit('newFaction',{
    houseList:House.list,
    kingdomList:Kingdom.list
  })
  return self;
}

Brotherhood = function(param){
  var self = House(param);
  self.scene = {
    // objects
    fire:null,

    // characters
    brothersmax:0,
    brothers:0,
    oathkeepersmax:0,
    oathkeepers:0,
    apollyon:0
  }

  self.update = function(){
    if(self.campaign === 0){
      if(!self.scene.fire){
        var fireId = Math.random();
        var coords = getCoords(self.hq[0],self.hq[1]);
        InfiniteFire({
          id:fireId,
          parent:self.id,
          x:coords[0],
          y:coords[1],
          z:-1,
          qty:1
        });
        self.scene.fire = fireId;
      }
    }
  }
}

Goths = function(param){
  var self = House(param);
  self.scene = {
    // objects
    fire:null

    // characters
  }

  self.update = function(){

  }
}

Norsemen = function(param){
  var self = House(param);
  self.scene = {
    // objects
    runestone:null,
    fire:null

    // characters
  }

  self.update = function(){

  }
}

Franks = function(param){
  var self = House(param);
  self.scene = {
    // objects
    fire:null

    // characters
  }

  self.update = function(){

  }
}

Celts = function(param){
  var self = House(param);
  self.scene = {
    // objects
    fire:null

    // characters
  }

  self.update = function(){

  }
}

Teutons = function(param){
  var self = House(param);
  self.scene = {
    // objects
    fire:null

    // characters
  }

  self.update = function(){

  }
}

Outlaws = function(param){
  var self = House(param);
  self.scene = {
    // objects
    fire:null

    // characters
  }

  self.update = function(){

  }
}

Mercenaries = function(param){
  var self = House(param);
  self.scene = {
    // objects
    fire:null,
    barrel1:null,
    chest:null,
    crates:null,
    swordrack1:null,
    swordrack2:null

    // characters
  }

  self.update = function(){

  }
}

Kingdom = function(param){
  var self = Entity(param);
  self.name = param.name;
  self.flag = param.flag;
  self.hq = param.hq;
  self.king = param.king;
  self.houses = param.houses;
  self.mode = 'peaceful'; // 'hostile' = attacks neutral players/units
  self.allies = [];
  self.enemies = [];

  self.stores = {
    grain:0,
    wood:0,
    stone:0,
    iron:0,
    silver:0,
    gold:0
  }
  Kingdom.list[self.id] = self;

  io.emit('newFaction',{
    houseList:House.list,
    kingdomList:Kingdom.list
  })

  return self;
}

House.list = {};
Kingdom.list = {};

House.update = function(){
  var pack = null;
  for(var i in House.list){
    var house = House.list[i];
    if(house.update){
      house.update();
    }
  }
  return pack;
}

flags = [
  ['🇦🇽',0], // 0
  ['🇦🇱',0], // 1
  ['🇦🇲',0], // 2
  ['🇦🇼',0], // 3
  ['🇦🇹',0], // 4
  ['🇧🇧',0], // 5
  ['🇧🇹',0], // 6
  ['🇧🇦',0], // 7
  ['🇧🇼',0], // 8
  ['🇧🇳',0], // 9
  ['🇧🇮',0], // 10
  ['🇰🇭',0], // 11
  ['🇨🇻',0], // 12
  ['🇧🇶',0], // 13
  ['🇨🇫',0], // 14
  ['🇨🇴',0], // 15
  ['🇨🇷',0], // 16
  ['🇭🇷',0], // 17
  ['🇩🇰',0], // 18
  ['🇩🇴',0], // 19
  ['🇪🇨',0], // 20
  ['🇪🇪',0], // 21
  ['🇫🇴',0], // 22
  ['🇫🇮',0], // 23
  ['🇵🇫',0], // 24
  ['🇬🇦',0], // 25
  ['🇬🇲',0], // 26
  ['🇬🇪',0], // 27
  ['🇩🇪',0], // 28
  ['🇬🇮',0], // 29
  ['🇬🇱',0], // 30
  ['🇬🇬',0], // 31
  ['🇭🇹',0], // 32
  ['🇭🇳',0], // 33
  ['🇮🇸',0], // 34
  ['🇮🇲',0], // 35
  ['🇯🇪',0], // 36
  ['🇰🇮',0], // 37
  ['🇱🇦',0], // 38
  ['🇱🇻',0], // 39
  ['🇱🇮',0], // 40
  ['🇲🇹',0], // 41
  ['🇲🇭',0], // 42
  ['🇲🇶',0], // 43
  ['🇲🇪',0], // 44
  ['🇴🇲',0], // 45
  ['🇵🇼',0], // 46
  ['🇵🇦',0], // 47
  ['🇵🇬',0], // 48
  ['🇵🇹',0], // 49
  ['🇶🇦',0], // 50
  ['🇷🇼',0], // 51
  ['🇸🇲',0], // 52
  ['🇷🇸',0], // 53
  ['🇸🇱',0], // 54
  ['🇸🇬',0], // 55
  ['🇸🇰',0], // 56
  ['🇪🇸',0], // 57
  ['🇱🇰',0], // 58
  ['🇧🇱',0], // 59
  ['🇵🇲',0], // 60
  ['🇻🇨',0], // 61
  ['🇸🇪',0], // 62
  ['🇨🇭',0], // 63
  ['🇹🇴',0], // 64
  ['🇹🇹',0], // 65
  ['🇻🇮',0], // 66
  ['🇺🇦',0], // 67
  ['🇳🇴',0], // 68
  ['🇼🇫',0], // 69
];
