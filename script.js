const smileyLogo = document.querySelector('.logo-smiley');
const cutleryLogo = document.querySelector('.logo-cutlery');
const moonLogo = document.querySelector('.logo-moon');
const catTomWrappeur = document.querySelector('.wrappeur-tom');
const catTom = document.querySelector('.cat-tom');
const burger = document.querySelector('.burger');

let isCatClicked = false;
let isBurgerClicked = false;
let currentRoom = "LivingRoom";

class Tamagochis {
	constructor() {
		this.mood = 50;
		this.hunger = 50;
		this.sleep = 50;

		const properties = ['mood', 'hunger', 'sleep'];

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
					smileyLogo.src = './images/smiley-bad.svg';
				} else {
					smileyLogo.src = './images/smiley-neutral.svg';
				}
			} else {
				smileyLogo.src = './images/smiley.svg';
			}
		}

		this.goEat = () => {
			this.hunger += 50;
			this.verification();
			this.display();
		}
		this.goToSleep = () => {
			this.sleep += 50;
			this.verification();
			this.display();
		}
		this.goPlay = () => {
			this.mood += 0.1;
			this.verification();
			this.display();
		}
		this.loss = () => {
			this.hunger -= 1;
			this.sleep -= 1;
			this.mood -= 1;
			this.verification();
			this.display();
		}
	}
}
let myTamagochi = new Tamagochis();

function goKitchen() {
	currentRoom = "Kitchen";
	document.querySelector('main').classList.add('kitchen');
	catTomWrappeur.classList.add('kitchen');
	catTom.src = "./images/tom-sat.png";
	burger.classList.remove('hidden');
}

function goLivingRoom() {
	currentRoom = "LivingRoom";
	document.querySelector('main').classList.remove('kitchen');
	catTomWrappeur.classList.remove('kitchen');
	catTom.src = "./images/tom1.png";
	burger.classList.add('hidden');
}


catTomWrappeur.addEventListener('mousedown', () => isCatClicked = true);
document.addEventListener('mouseup', () => isCatClicked = false);
catTomWrappeur.addEventListener('mousemove', () => {
	if (isCatClicked && currentRoom === "LivingRoom") {
		myTamagochi.goPlay();
	}
});

smileyLogo.addEventListener('click', goLivingRoom);
cutleryLogo.addEventListener('click', goKitchen);

document.addEventListener('mousemove', (e) => {
	if(isBurgerClicked) {
		burger.style.left = e.clientX + 'px';
		burger.style.top = e.clientY + 'px';
	}
});

burger.addEventListener('click', () => isBurgerClicked = true);
catTomWrappeur.addEventListener('click', () => {
	if(isBurgerClicked) {
		myTamagochi.goEat();
	}
})



setInterval(() => myTamagochi.loss(), 1000);