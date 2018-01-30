class Elevator {
  constructor() {
    this.floor = 0;
    this.MAXFLOOR = 10;
    this.waitingList = [];
    this.passengers = [];
    this.requests = [];
    this.direction = "";
  }

  start() {
    this.startInterval = setInterval(() => {
      this.update();
    }, 1000);
  }

  stop() {
    clearInterval(this.startInterval);
  }

  update() {
    for (let i = 0; i < this.MAXFLOOR; i++) {
      this.direction = "up";
      this.floorUp();
      this._passengersLeave();
      this._passengersEnter();
      this.log();
    }
    for (let i = this.MAXFLOOR; i > 0; i--) {
      this.direction = "down";
      this.floorDown();
      this._passengersLeave();
      this._passengersEnter();
      this.log();
    }

    this.log();
  }

  _passengersEnter(person) {
    //Filtered array with passengers entering
    let passengersEnter = this.waitingList.filter(
      person => this.floor === person.originFloor
    );

    //Print the person entering the elevator
    //Add person that was waiting as a passenger
    passengersEnter.forEach(person => {
      this.requests.push(person.destinationFloor);
      console.log(
        `${person.name} has entered the elevator at the ${this.floor}th floor`
      );
      this.passengers.push(person);
    });
    //Leave only persons waiting, but whose origin floor has not been serviced yet
    this.waitingList = this.waitingList.filter(
      person => this.floor !== person.originFloor
    );
  }

  _passengersLeave(person) {
    let passengersLeave = this.passengers.filter(
      person => this.floor === person.destinationFloor
    );
    this.passengers = this.passengers.filter(
      person => this.floor !== person.destinationFloor
    );
    passengersLeave.forEach(person => {
      console.log(
        `${person.name} has left the elevator at the ${this.floor}th floor`
      );
    });
  }

  floorUp() {
    if (this.floor < this.MAXFLOOR) {
      this.floor += 1;
      this.direction = "up";
    }
  }

  floorDown() {
    if (this.floor > 0) {
      this.floor -= 1;
      this.direction = "down";
    }
  }

  call(person) {
    this.requests.push(person.originFloor);
    this.waitingList.push(person);
  }

  log() {
    console.log(`Direction: ${this.direction} | Floor:   ${this.floor}`);
  }
}

module.exports = Elevator;
