var combinationLock = {
	combination: 692,
	locked: true,
	wheels: [1, 1, 1],
	increment: function(wheel) {
		if (this.wheels[wheel] === 9) {
			this.wheels[wheel] = 1;
		}
		else {
			this.wheels[wheel]++;
		}
	},
	decrement: function(wheel) {
		if (this.wheels[wheel] === 1) {
			this.wheels[wheel] = 9;
		}
		else {
			this.wheels[wheel]--;
		}
	},
	check: function() {
		if (this.combination === parseInt(this.wheels.join(''))) {
			this.locked = false;
			setTimeout(redirectIfUnlocked, 3000);
		}
		else {
			this.locked = true;
		}
	}
}

var increments = document.getElementsByClassName('increment');

for (var i = 0; i < increments.length; i++) {
	increments[i].addEventListener('click', function() {
		let wheelIndex = parseInt(this.getAttribute('index'));
		combinationLock.increment(wheelIndex);
		document.querySelectorAll('.digit')[wheelIndex].value = combinationLock.wheels[wheelIndex];
		checkLock();
	});
};

var decrements = document.getElementsByClassName('decrement');

for (var i = 0; i < decrements.length; i++) {
	decrements[i].addEventListener('click', function() {
		let wheelIndex = parseInt(this.getAttribute('index'));
		combinationLock.decrement(wheelIndex);
		document.querySelectorAll('.digit')[wheelIndex].value = combinationLock.wheels[wheelIndex];
		checkLock();
	});
};

var wheels = document.getElementsByClassName('digit');

for (var i = 0; i < wheels.length; i++) {
	wheels[i].addEventListener('keyup', function(e) {
		if(e.which === 38){
			let wheelIndex = parseInt(this.getAttribute('index'));
			combinationLock.increment(wheelIndex);
			document.querySelectorAll('.digit')[wheelIndex].value = combinationLock.wheels[wheelIndex];
			checkLock();
		}
		
		if(e.which === 40){
			let wheelIndex = parseInt(this.getAttribute('index'));
			combinationLock.decrement(wheelIndex);
			document.querySelectorAll('.digit')[wheelIndex].value = combinationLock.wheels[wheelIndex];
			checkLock();
		}
		
		if(e.which > 47 && e.which < 58){
			let wheelIndex = parseInt(this.getAttribute('index'));
			combinationLock.wheels[wheelIndex] = parseInt(document.querySelectorAll('.digit')[wheelIndex].value);
			checkLock();
		}
		
		if (this.value.length >1 ) {
			this.value = 0;
		}
		
		if (this.value.length < 1 ) {
			this.value = 0;
		}
	});
};

function checkLock() {
	combinationLock.check();
	if(combinationLock.locked === false) {
		document.querySelector('#indicator').classList.remove('locked');
		document.querySelector('#indicator').classList.add('unlocked');
	}
	else {
		document.querySelector('#indicator').classList.add('locked');
		document.querySelector('#indicator').classList.remove('unlocked');
	}
}

function redirectIfUnlocked() {
	if(combinationLock.locked === false) {
		window.location.href = "https://sdocy503.github.io/jPlace";
	}
}