let cnv = document.getElementById('cnv');
let ctx = cnv.getContext("2d");

let w = window.innerWidth;
let h = window.innerHeight;
cnv.width = w;
cnv.height = h;

let s = 50;
let sw = ~~(w / s) - 1;
let sh = ~~(h / s) - 1;
let border = 3;
let score = 0;

let dirChanged = false;
let dir = 1;
let snake = [];
for (let i = 0; i < 3; i++) {
	snake.push({x: ~~(sw / 2) - i, y: ~~(sh / 2)})
}

let foodX = 0;
let foodY = 0;
newFood();

function newFood() {
	let valid = true;
	do {
		foodX = ~~(Math.random() * sw);
		foodY = ~~(Math.random() * sh);
		for (let i = 0; i < snake.length; i++) {
			if (snake[i].x != foodX && snake[i].y != foodY) {
				valid = false;
			}
		}
	} while(valid);
}

function newSnake() {
	dir = 1;
	snake = [];
	for (let i = 0; i < 3; i++) {
		snake.push({x: ~~(sw / 2) - i, y: ~~(sh / 2)})
	}	
}

let interval = setInterval(update, 100);

function update() {
	ctx.clearRect(0, 0, w, h);
	for (let i = 0; i <= sw; i++) {
		ctx.fillStyle = "gray";
		ctx.fillRect(i * s, 0, border, sh * s + border);
	}

	for (let i = 0; i <= sh; i++) {
		ctx.fillStyle = "gray";
		ctx.fillRect(0, i * s, sw * s + border, border);
	}

	ctx.fillStyle = "green";

	for ( let i = 0; i < snake.length; i++) {
		let x = snake[i].x;
		let y = snake[i].y;
		ctx.fillRect(x * s + border, y * s + border, s - border, s - border);
	}

	ctx.fillStyle = "red";
	ctx.fillRect(foodX * s + border, foodY * s + border, s - border, s - border);

	for (let i = snake.length - 1; i > 0; i--) {
		snake[i].x = snake[i - 1].x;
		snake[i].y = snake[i - 1].y;
	}

	let dx = snake[0].x;
	let dy = snake[0].y;
	if (dir == 0) {
		dy--;
	} else if (dir == 1) {
		dx++;
	} else if (dir == 2) {
		dy++;
	} else {
		dx--;
	}
	snake[0].x = (dx % sw + sw) % sw;
	snake[0].y = (dy % sh + sh) % sh;

	if (foodX == dx && foodY == dy) {
		newFood();
		snake.push({x: snake[snake.length - 1].x, y: snake[snake.length - 1].y});
		score +=1;
	}

	for (let i = 1; i < snake.length; i++) {
		if (dx == snake[i].x && dy == snake[i].y) {
			newSnake();
			newFood();
			alert(score);
			score = 0;
		}
	}
	dirChanged = false;

	document.onkeydown = function (e) {
		if (dirChanged) return;
		let newDir = 0;
		if (e.keyCode == 37) {
			newDir = 3;
		} else if (e.keyCode == 38) {
			newDir = 0;
		} else if (e.keyCode == 39) {
			newDir = 1;
		} else if (e.keyCode == 40) {
			newDir = 2;
		}

		if (((dir + 2) % 4) != newDir) {
			dir = newDir;
		}

		dirChanged = true;
	}
}
