window.onload = function() {
	let cnv = document.getElementById('cnv');
	let ctx = cnv.getContext('2d');

	let w = window.innerWidth;
	let h = window.innerHeight;
	cnv.height = h;
	cnv.width = w;
	let character = document.getElementById('player');
	let lose = document.getElementById('lose');
	let point = document.getElementById('point');
	let dead = false;
	let points = 0;
	let interval;
	let isRun = true;
	let record = 0;

	let platforms = document.getElementsByClassName('platform');
	let container = document.getElementById('platforms');
	let xg = 200;	

	class Player {
		constructor () {
			this.img = document.getElementById('player');
		}

		jump() {
			this.plr = document.getElementById('player');
			this.plr.style.top = '200px';
			isRun = false;

			setTimeout(down, 400);
			function down () {
				character.style.top = '500px';
				setTimeout(function() {
					isRun = true;
				}, 800);
			}
		}

		death() {
			this.plr.style.top = '600px';
			dead = true;
			lose.style.display = 'block';
			lose.innerHTML += '<br> Ваш счёт: ' + points;
		}
	}
	let player = new Player();

	class Ground {
		constructor (x = 500, y = 100, posX = 0) {

		}

		groundMove() {
			interval = setInterval(Move, 0.1);
			function Move() {
				points += 0.01;
				point.innerHTML = 'Счёт: ' + Math.round(points);

				let y1 = xg;
				platforms[0].style.left = y1 + 'px';
				let y2 = xg + 525;
				platforms[1].style.left = y2 + 'px';
				let y3 = xg + 1050;
				platforms[2].style.left = y3 + 'px';
				let y4 = xg + 1575;
				platforms[3].style.left = y4 + 'px';
				xg--;
				if (xg == -400) {
					xg = 125;
				}

				let char = document.getElementById('player');
				if (y2 + 400 < 625 && 625 < y3 && char.style.top == '500px' && isRun == true) {
					player.death();
					clearInterval(interval);
					if (points > record) {
						record = points;
						lose.innerHTML += '<br> Новый рекорд: ' + record;
					}
				}
			}
		}

		addGround() {
			container.innerHTML += '<img src="https://art.pixilart.com/41eb5ee2202b908.png" class="platform">';
		}
	}
	let ground = new Ground();
	for (let i = 0; i < 4; i++) {
		ground.addGround();
	}

	if (platforms.length == 4) {
		ground.groundMove();
	}
	player.jump();

	document.onkeydown = function handle(e) {
		if (e.code == 'Space') {
			player.jump();
		}
	}
}