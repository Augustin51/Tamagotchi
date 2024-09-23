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
let intervalIdSleep;
let intervalIdLigth;

let roomArr = ['living-room', 'kitchen', 'pee', 'bedroom'];

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
					document.querySelector('.logo-smiley').src = './images/living-room-bad.svg';
				} else {
					document.querySelector('.logo-smiley').src = './images/living-room-neutral.svg';
				}
			} else {
				document.querySelector('.logo-smiley').src = './images/living-room.svg';
			}
		}

		this.goEat = () => {
			this.hunger += 50;
			this.verification();
			this.display();
		}
		this.goToSleep = () => {
			this.sleep += 10;
			this.verification();
			this.display();
		}
		this.goPee = () => {
			this.pee += 10;
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
	currentRoom = room;
	for (let i = 0; i < roomArr.length; i++) {
		main.classList.remove(roomArr[i]);
		catTomWrappeur.classList.remove(roomArr[i]);
	}
	main.classList.add(room);
	catTom.src = `images/tom-${room}.png`;
	console.log(catTom.src)
	catTomWrappeur.classList.add(room);
	room == 'kitchen' ? burger.classList.remove('hidden') : burger.classList.add('hidden');
	room == 'bedroom' ? ligth.classList.remove('hidden') : ligth.classList.add('hidden');
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
})
document.addEventListener('mouseup', () => {
	burger.removeAttribute('style');
	isBurgerClicked = false;
})

ligth.addEventListener('click', () => {
	isLigthActive ? isLigthActive = false : isLigthActive = true;
	if(isLigthActive) {
		clearInterval(intervalIdSleep)
		intervalIdLigth = setInterval((() => myTamagochi.goToSleep()), 500);
		ligth.classList.add('active');
	} else {
		clearInterval(intervalIdLigth)
		intervalIdSleep = setInterval(() => myTamagochi.lossSleep(), 1000);
		ligth.classList.remove('active');
	}
})


intervalIdEat = setInterval(() => myTamagochi.lossEat(), 1000);
intervalIdSleep = setInterval(() => myTamagochi.lossSleep(), 1000);
intervalIdPlay = setInterval(() => myTamagochi.lossPlay(), 1000);