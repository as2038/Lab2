function Bear () {
	this.dBear = 100;
	this.htmlElement = document.getElementById("bear");
	this.id = this.htmlElement.id;
	this.x = this.htmlElement.offsetLeft;
	this.y = this.htmlElement.offsetTop;
	
	this.move = function (xDir, yDir) {
		this.fitBounds();
		this.x += this.dBear * xDir;
		this.y += this.dBear * yDir;
		this.display();
	};
	
	this.display = function () {
		this.htmlElement.style.left = this.x + "px";
		this.htmlElement.style.top = this.y + "px";
		this.htmlElement.style.display = "absolute";
	};

	this.fitBounds = function () {
		let parent = this.htmlElement.parentElement;
		let iw = this.htmlElement.offsetWidth;
		let ih = this.htmlElement.offsetHeight;
		let l = parent.offsetLeft;
		let t = parent.offsetTop;
		let w = parent.offsetWidth;
		let h = parent.offsetHeight;

		if (this.x < 0) this.x = 0;		
		if (this.x > w - iw) this.x = w - iw;	
		if (this.y < 0) this.y = 0;
		if (this.y > h - ih) this.y = h - ih;	
	};

	this.setSpeed = function (e) {
		this.dBear = e;
		if (isNaN(e)) {
			window.alert("Invalid bear speed")
			this.dBear = 100; 
		}
	};
}

function start() {
	bear = new Bear();
	document.addEventListener("keydown", moveBear, false);
	bees = new Array();
	makeBees();
	updateBees()
}

function moveBear(e) {
	const KEYUP = 38;
	const KEYDOWN = 40;
	const KEYLEFT = 37;
	const KEYRIGHT = 39;

	if (e.keyCode == KEYRIGHT) {
		bear.move(1, 0)
	}

	if (e.keyCode == KEYLEFT) {
		bear.move(-1, 0)
	}

	if (e.keyCode == KEYUP) {
		bear.move(0, -1)
	}

	if (e.keyCode == KEYDOWN) {
		bear.move(0, 1)
	}
}

class Bee {

	constructor(beeNumber) {

		this.htmlElement = createBeeImg(beeNumber);
		this.id = this.htmlElement.id;
		this.x = this.htmlElement.offsetLeft;
		this.y = this.htmlElement.offsetTop;

		this.move = function(dx, dy) {
			this.x += dx;
			this.y += dy;
			this.display();
		};

		this.display = function() {
			this.fitBounds();
			this.htmlElement.style.left = this.x + "px";
			this.htmlElement.style.top = this.y + "px";
			this.htmlElement.style.display = "block";
		};

		this.fitBounds = function() {
			let parent = this.htmlElement.parentElement;
			let iw = this.htmlElement.offsetWidth;
			let ih = this.htmlElement.offsetHeight;
			let l = parent.offsetLeft;
			let t = parent.offsetTop;
			let w = parent.offsetWidth;
			let h = parent.offsetHeight;

			if (this.x < 0) this.x = 0;
			if (this.x > w - iw) this.x = w - iw;
			if (this.y < 0) this.y = 0;
			if (this.y > h - ih) this.y = h - ih;
		};
	}
}

function getRandomInt(max) {
	return Math.floor((Math.random() * (max+1)));
}

function createBeeImg(wNum) {
	let boardDiv = document.getElementById("board");
	let boardDivW = boardDiv.offsetWidth;
	let boardDivH = boardDiv.offsetHeight;
	let boardDivX = boardDiv.offsetLeft;
	let boardDivY = boardDiv.offsetTop;

	let img = document.createElement("img");
	img.setAttribute("src", "images/bee.gif");
	img.setAttribute("width", "100");
	img.setAttribute("alt", "A bee!");
	img.setAttribute("id", "bee" + wNum);
	img.setAttribute("class", "bee");

	img.style.position = "absolute";

	boardDiv.appendChild(img);

	let x = getRandomInt(boardDivW);
	let y = getRandomInt(boardDivH);
	img.style.left = (boardDivX + x) + "px";
	img.style.top = (y) + "px"; 

	return img;
}

function makeBees() {
	let nbBees = document.getElementById("nbBees").value;
	nbBees = Number(nbBees);

	if (isNaN(nbBees)) { 
		window.alert("Invalid number of bees");
		return;
	} 

	let i = 1;
	while (i <= nbBees) {
		var num = i;
		var bee = new Bee(num);
		bee.display();
		bees.push(bee);
		i++;
	}
}


function moveBees() {
	let speed = document.getElementById("speedBees").value;

	for (let i = 0; i < bees.length; i++) {
		let dx = getRandomInt(2 * speed) - speed;
		let dy = getRandomInt(2 * speed) - speed;
		bees[i].move(dx, dy);
	}
}

function updateBees() {
	moveBees();
	let period = 10;
	updateTimer = setTimeout('updateBees()', period);
}
