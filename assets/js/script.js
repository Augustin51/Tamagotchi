const body = document.querySelector('body');
const main = document.querySelector('main');
const catTomWrappeur = document.querySelector('.wrappeur-tom');
const catTom = document.querySelector('.cat-tom');
const mouthTom = document.querySelector('.tom-mouth');
const burger = document.querySelector('.burger');
const changeRoomBtn = document.querySelectorAll('.change-room-btn');
const ligth = document.querySelector('.ligth');

let currentRoom = 'living-room';
let isCatClicked = false;
let isBurgerClicked = false;
let isLigthActive = false;
let intervalIdPlay;
let intervalIdEat;
let intervalIdGoPee;
let intervalIdLossPee;
let intervalIdGoSleep;
let intervalIdLossSleep;

let roomArr = ['living-room', 'kitchen', 'toilet', 'bedroom'];

class Tamagochis {
	constructor() {
		this.mood = 50;
		this.hunger = 50;
		this.pee = 50;
		this.sleep = 50;

		const properties = ['mood', 'hunger', 'pee', 'sleep'];

		this.verification = () => {
			properties.forEach(property => {
				this[property] = this[property] > 100 ? 100 : this[property];
				this[property] = this[property] < 0 ? 0 : this[property];
			});
		}

		this.display = () => {
			const stats = document.querySelectorAll('.stat');
			document.querySelectorAll('.percentage').forEach((percentage, index) => {
				percentage.style.height = this[properties[index]] + "px";
				if (this[properties[index]] < 20) {
					stats[index].classList.add('red');
				} else {
					stats[index].classList.remove('red');
				}
			})
			if (this.mood < 50) {
				if (this.mood < 20) {
					document.querySelector('.logo-smiley').src = 'assets/images/living-room-bad.svg';
				} else {
					document.querySelector('.logo-smiley').src = 'assets/images/living-room-neutral.svg';
				}
			} else {
				document.querySelector('.logo-smiley').src = 'assets/images/living-room.svg';
			}
		}

		this.goEat = () => {
			this.hunger += 50;
			this.verification();
			this.display();
		}
		this.goToSleep = () => {
			this.sleep += 1;
			this.verification();
			this.display();
		}
		this.goPee = () => {
			this.pee += 1;
			this.verification();
			this.display();
		}
		this.goPlay = () => {
			this.mood += 0.3;
			this.verification();
			this.display();
		}
		this.lossEat = () => {
			this.hunger -= 1;
			this.verification();
			this.display();
		}
		this.lossPee = () => {
			this.pee -= 1;
			this.verification();
			this.display();
		}
		this.lossSleep = () => {
			this.sleep -= 1;
			this.verification();
			this.display();
		}
		this.lossPlay = () => {
			this.mood -= 1;
			this.verification();
			this.display();
		}
	}
}
let myTamagochi = new Tamagochis();

function changeRoom(room) {
	if(isLigthActive) return
	
	currentRoom = room;
	for (let i = 0; i < roomArr.length; i++) {
		main.classList.remove(roomArr[i]);
		catTomWrappeur.classList.remove(roomArr[i]);
	}
	main.classList.add(room);
	catTom.src = `assets/images/tom-${room}.png`;
	catTomWrappeur.classList.add(room);
	room == 'kitchen' ? burger.classList.remove('hidden') : burger.classList.add('hidden');
	room == 'bedroom' ? ligth.classList.remove('hidden') : ligth.classList.add('hidden');
	if(room == 'toilet') {
		clearInterval(intervalIdGoPee);
		clearInterval(intervalIdLossPee);
		intervalIdGoPee = setInterval(() => myTamagochi.goPee(), 100);
	} else {
		clearInterval(intervalIdGoPee);
		clearInterval(intervalIdLossPee);
		intervalIdLossPee = setInterval(() => myTamagochi.lossPee(), 1000);
	}
}

catTomWrappeur.addEventListener('mousedown', () => isCatClicked = true);
document.addEventListener('mouseup', () => {
	clearInterval(intervalIdPlay);
	isCatClicked = false;
	intervalIdPlay = setInterval(() => myTamagochi.lossPlay(), 1000);
});
catTomWrappeur.addEventListener('mousemove', () => {
	if (isCatClicked && currentRoom == 'living-room') {
		clearInterval(intervalIdPlay);
		myTamagochi.goPlay();
	}
});

changeRoomBtn.forEach((room) => room.addEventListener('click', () => changeRoom(room.id)));

burger.addEventListener('mousedown', () => isBurgerClicked = true);
document.addEventListener('mousemove', (e) => {
	if (isBurgerClicked) {
		burger.style.left = e.clientX + 'px';
		burger.style.top = e.clientY + 'px';
	}
});
mouthTom.addEventListener('mouseup', () => {
	if (isBurgerClicked) {
		myTamagochi.goEat();
		burger.removeAttribute('style');
		isBurgerClicked = false;
	}
});
document.addEventListener('mouseup', () => {
	burger.removeAttribute('style');
	isBurgerClicked = false;
});
ligth.addEventListener('click', () => {
	isLigthActive ? isLigthActive = false : isLigthActive = true;
	if(isLigthActive) {
		clearInterval(intervalIdGoSleep);
		clearInterval(intervalIdLossSleep);
		intervalIdGoSleep = setInterval(() => myTamagochi.goToSleep(), 100);
		body.classList.add('nigth');
	} else {
		clearInterval(intervalIdGoSleep);
		clearInterval(intervalIdLossSleep);
		intervalIdLossSleep = setInterval(() => myTamagochi.lossSleep(), 1000);
		body.classList.remove('nigth');
	}
})


intervalIdPlay = setInterval(() => myTamagochi.lossPlay(), 1000);
intervalIdEat = setInterval(() => myTamagochi.lossEat(), 1000);
intervalIdLossPee = setInterval(() => myTamagochi.lossPee(), 1000);
intervalIdLossSleep = setInterval(() => myTamagochi.lossSleep(), 1000);