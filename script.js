class Car {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        this.updateUI();
    }

    brake() {
        this.speed -= 5;
        this.updateUI();
    }

    updateUI() {
        document.getElementById(`car-speed-${this.make}`).textContent = `${this.speed} km/h`;
    }
}

class EV extends Car {
    constructor(make, speed, charge) {
        super(make, speed);
        this.charge = charge;
    }

    chargeBattery(chargeTo) {
        this.charge = chargeTo;
        this.updateUI();
    }

    accelerate() {
        this.speed += 20;
        this.charge--;
        this.updateUI();
    }

    updateUI() {
        super.updateUI();
        document.getElementById(`car-charge-${this.make}`).textContent = `${this.charge}%`;
    }
}

let cars = [];

function createCar() {
    const make = document.getElementById('car-make').value;
    const speed = parseInt(document.getElementById('car-speed').value);
    const charge = parseInt(document.getElementById('car-charge').value);

    if (!make || isNaN(speed)) {
        alert('Please enter valid make and speed.');
        return;
    }

    let car;
    if (isNaN(charge)) {
        car = new Car(make, speed);
    } else {
        car = new EV(make, speed, charge);
    }

    cars.push(car);
    addCarToUI(car);
}

function addCarToUI(car) {
    const carList = document.getElementById('car-list');
    const carDiv = document.createElement('div');
    carDiv.innerHTML = `
        <h3>${car.make}</h3>
        <p id="car-speed-${car.make}">${car.speed} km/h</p>
        ${car instanceof EV ? `<p id="car-charge-${car.make}">${car.charge}%</p>` : ''}
        <button onclick="findCar('${car.make}').accelerate()">Accelerate</button>
        <button onclick="findCar('${car.make}').brake()">Brake</button>
        ${car instanceof EV ? `<button onclick="findCar('${car.make}').chargeBattery(90)">Charge to 90%</button>` : ''}
    `;
    carList.appendChild(carDiv);
}

function findCar(make) {
    return cars.find(car => car.make === make);
}
