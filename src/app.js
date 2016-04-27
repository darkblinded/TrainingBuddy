/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

/* Init */
var UI = require('ui');
/*var Vector2 = require('vector2');*/


localStorage.setItem("test", "unset");

/* Definitions */

var inc_types = {
  add: function (workload, inc_size) {return workload += inc_size;},
  multiply: function (workload, inc_size) {return workload *= inc_size;},
};

var workload_units = {
  kg: "kg",
  sec: "sec",
};

function Exercise(name, sets, repetitions, workload, unit, inc_size, inc_type) {
  this.name = name;
  this.sets = sets;
  this.repetitions = repetitions;
  this.workload = workload;
  this.unit = unit;
  this.inc_size = inc_size;
  this.inc_type = inc_type;
  
  this.title = this.name;
  //this.subtitle = "bla";
  this.__defineGetter__("subtitle", function () {
    return (this.sets>1 ? this.sets.toString() + "x" : "") + 
      (this.repetitions>1 ? (this.repetitions.toString() + " @ ") : (this.sets==1 ? "1" : " ")) + 
       this.workload.toString() + this.unit;
  });
  
  this.increase = function () {this.workload = inc_type(this.workload, this.inc_size);};
  
}


/* TODO load from persistent storage */
var exercises = [
  new Exercise("Incline Press", 3, 10, 20, workload_units.kg, 1.1, inc_types.multiply),
  new Exercise("Row", 3, 10, 40, workload_units.kg, 1.1, inc_types.multiply),
  new Exercise("Shoulder Press", 3, 10, 15, workload_units.kg, 1.1, inc_types.multiply),
  new Exercise("Leg Press", 3, 10, 100, workload_units.kg, 1.1, inc_types.multiply),
  new Exercise("Plank", 3, 1, 40, workload_units.sec, 3, inc_types.add),
];

var training = new UI.Menu({
  sections: [{
    items: exercises
  }]
});
training.on('select', function(e) {
  if (e.item.hasOwnProperty("action")) {
    e.item.action();
  } else {
    console.log("There is no action for the menu item " + e.item.title);
  }
});

var tools = new UI.Menu({
  sections: [{
    items: [{
      title: 'Retrieve',
      icon: 'images/menu_icon.png',
      subtitle: 'unset',
      test: 'X'
    }, {
      title: 'Store A',
      subtitle: '',
      test: 'A'
    }, {
      title: 'Store B',
      subtitle: '',
      test: 'B'
    }, {
      title: 'Store C',
      subtitle: '',
      test: 'C'
    }]
  }]
});
tools.on('select', function(e) {
  if (e.itemIndex === 0) {
    tools.item(0, 0, {title: 'Retrieve', subtitle: localStorage.getItem("test")});
    console.log("Loaded " + e.item.subtitle + " from local storage");
  } else {
    localStorage.setItem("test", e.item.test);
    console.log("Stored " + e.item.test + " to local storage");
  }
});

var main = new UI.Menu({
  sections: [{
    title: 'TrainingBuddy',
    items: [{
      title: 'Training',
      action: training.show.bind(training),
    }, {
      title: 'Tools',
      action: tools.show.bind(tools),
    }]
  }]
});

main.on('select', function (e) {
  if (e.item.hasOwnProperty("action")) {
    e.item.action();
  } else {
    console.log("There is no action for the menu item " + e.item.title);
  }
});


/* Executions */

main.show();

/*var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World!',
  body: 'Press any button.',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});

main.on('click', 'up', function(e) {
  
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    console.log('The item\'s teststring is "' + e.item.test + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Retrieve',
        icon: 'images/menu_icon.png',
        subtitle: 'unset',
        test: 'X'
      }, {
        title: 'Store A',
        subtitle: '',
        test: 'A'
      }, {
        title: 'Store B',
        subtitle: '',
        test: 'B'
      }, {
        title: 'Store C',
        subtitle: '',
        test: 'C'
      }]
    }]
  });
  menu.on('select', function(e) {
    if (e.itemIndex === 0) {
      menu.item(0, 0, {title: 'Retrieve', subtitle: localStorage.getItem("test")});
      console.log("Loaded " + e.item.subtitle + " from local storage");
    } else {
      localStorage.setItem("test", e.item.test);
      console.log("Stored " + e.item.test + " to local storage");
    }
  });
  menu.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});*/