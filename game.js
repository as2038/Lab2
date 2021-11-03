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

