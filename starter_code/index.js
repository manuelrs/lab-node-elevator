const Elevator = require("./elevator.js");
const Person = require("./person.js");

var elevator = new Elevator();
var person1 = new Person("Person1", 2, 3);
var person2 = new Person("Person2", 1, 7);
var person3 = new Person("Person3", 6, 2);

elevator.call(person1);
elevator.call(person2);
elevator.call(person3);
elevator.start();
setTimeout(() => {
  elevator.stop();
}, 1000);
