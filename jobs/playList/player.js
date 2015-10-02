(function(window, undefined){
	/* variables */
	var audio = undefined;
	var loop = false;
	var durationElement = undefined;
	var currentTimeElement = undefined;
	var chart = document.getElementById('chart');
	var song = 0;
	var timeLine = document.getElementById('time');
	var volLine = document.getElementById('volumen');
	var volumeValue = undefined;
	var playing = false;
	var muteVolume = false;

	/* array songs */
	var playList = new Array();
	playList[0] = {src:'http://live3.goear.com/listen/200d41eca88ffc58b8ea92ca7b633b4b/560d6c9d/sst/mp3files/20082006/6d25b5f859b8d6a9c294095dac547c13.mp3', name: 'Just cant get enough', artist: 'Depeche Mode' };
	playList[1] = {src:'http://live3.goear.com/listen/a3b700b9ac74a11bcdf9667aa1491c4c/560eb51d/sst2/mp3files/17102006/3af97bcc5b5e205b778d594d8fc2b862.mp3', name: 'Love my way', artist: 'The Psychedelic Furs' };
	playList[2] = {src:'http://live6.goear.com/listen/460cd6ea15535324b9025232c1ace0af/560eb66f/sst3/mp3files/01052007/c8a921252d7b57686b6c565083ad175d.mp3', name: 'Pale Shelter', artist: 'Tears for Fears'};
	playList[3] = {src:'http://live3.goear.com/listen/a7792c5e0de568bfab84d04cba2cb04f/560eb72c/sst3/mp3files/07022007/eadb0986aadeb079b0bdc361e4ea5adf.mp3', name: 'You make me feel', artist: 'Sylvester'};
	playList[4] = {src:'http://live6.goear.com/listen/86e55acbb636e42f398b6b617916749a/560eb7b5/sst5/mp3files/12052010/8759853bbfdb08127087b0dd4d7391ac.mp3', name: 'Born slippy nuxx', artist: 'Underworld'};
	playList[5] = {src:'http://live3.goear.com/listen/3f17a51f083ce3c7e64dff4aec1fff83/560eb842/sst/mp3files/22082006/26416bc7102c727344336e99c4017152.mp3', name: 'What is love?', artist: 'Haddaway'};
	playList[6] = {src:'http://live6.goear.com/listen/3648480d8c9ad6bb232400e5631fcb82/560eb88b/sst2/mp3files/27112006/9331e412f3e66e045862127f9b6bde23.mp3', name: 'Dont you want me baby', artist: 'Human League'};
	playList[7] = {src:'http://live8.goear.com/listen/985272dab4986b86470cae63e83ba73c/560eb94f/sst11/mp3files/28062013/7249a38f0f285f36fcf8cd4939a757e7.mp3', name: 'No more words', artist: 'Berlin'};



	/* draw playlist */
	function drawPlayList(){
		ulList = '<ul class="ulListSongs">';
		for(var i = 0; i < playList.length; i++){
			ulList += '<li id="'+i+'" class="list-song" onclick="player.selectSong('+i+')">' +
								'<div class="song-info">' +
									'<h2 class="title-song">' + playList[i].name + '</h2>' +
									'<h3>' + playList[i].artist + '</h3>' +
								'</div>' 
		}
		ulList += '<ul>';
		chart.innerHTML += ulList;
	}

	/* set audio playlist */
	function init(){
		audio = document.createElement('audio');
		audio.setAttribute('src', playList[0].src);

		durationElement = document.getElementById('duration');
		currentTimeElement= document.getElementById('currentSong');
		timeLine.addEventListener("change", slideSong, false);

		audio.addEventListener('durationchange', setTimeSlide);
		audio.addEventListener('timeupdate', setTimeSlide);
		volLine.addEventListener("change", slideVolume, false);

		var showNameSong = "";
		showNameSong += '<h2 class="currentSong">' + playList[0].name + '</h2>' +
		'<h3>' + playList[0].artist + '</h3>';
		nameSong.innerHTML = showNameSong;

		setTimeSlide();
	}


	/* select song from playlist */
	function selectSong(id){
		var nameSong = document.getElementById('nameSong');
		audio.setAttribute('src', playList[id].src);
		song = id;
		audio.play();
		rotateAnimation();
		var showNameSong = "";
		showNameSong += '<h2 class="currentSong">' + playList[id].name + '</h2>' +
		'<h3>' + playList[id].artist + '</h3>';
		nameSong.innerHTML = showNameSong;
	}

	/* backward song */
	function prevSong(){
		song--;
		selectSong(song);
	}

	/* forward song */
	function nextSong(){
		song++;
		selectSong(song);
	}

	/* repeat song */
	function repeat(button){
		loop = !loop;
		if(loop){
			audio.setAttribute('loop', '');
			button.classList.add('active');
		}else{
			audio.removeAttribute('loop');
			button.classList.remove('active');
		}
	};

	function play(){
		audio.play();
		rotateAnimation();
		toggleSound();
	};

	/* pause music */
	function pause(){
		audio.pause();
		stopAnimation();
	};
	/* silder volume control */
	function slideVolume(){
		volumeValue = volLine.value / 100;
		audio.volume = volumeValue;
		console.log("Vol: ", audio.volume);
	};

	/* set time slider */
	function setTimeSlide(){
		var sencondFormat = "";
		var secondsDurationFormat = "";
		var fullTime = Math.floor(audio.currentTime);
		var fullDuration = Math.floor(audio.duration);
		var minutes;
		var seconds;
		var minutesDuration;
		var secondsDuration;

		timeLine.setAttribute('max', Math.floor(audio.duration));

		if (isNaN(fullDuration)){
			minutesDuration = 0;
			secondsDuration = 0;
		}else{
			minutesDuration =  Math.floor(audio.duration / 60);
			secondsDuration = fullDuration - minutesDuration * 60;
		}

		secondsDurationFormat = convertFormat(secondsDuration);

		minutes = Math.floor(audio.currentTime / 60);
		seconds = fullTime - minutes * 60;
		
		timeLine.value = Math.floor(audio.currentTime);
		secondFormat = convertFormat(seconds);
		autoNext(fullTime, fullDuration);

		currentTimeElement.innerHTML = minutes + ":" + secondFormat + " / " + minutesDuration + ":" + secondsDurationFormat;

	};

	/* set time song */
	function slideSong(){
		timeValue = timeLine.value
		audio.currentTime = timeValue;
		console.log("Vol: ", audio.volume);
	}

	/* conver to seconds and minutes */
	function convertFormat(seconds){
		var secondsb = "";
		seconds = seconds.toString();

		if(seconds.length < 2){
			secondsb = "0";
			secondsb += seconds;
		}else{
			secondsb = seconds;
		}
		return secondsb;
	};

	/* rotate disc */
	function rotateAnimation(){
		var elem = document.getElementById("img");
		if(navigator.userAgent.match("Chrome")){
			elem.style.WebkitAnimation = "animationRotate 1.2s linear infinite";
		}else if(navigator.userAgent.match("Firefox")){
			elem.style.MozTransform = "animationRotate 1.2s linear infinite";
		}else if(navigator.userAgent.match("Opera")){
			elem.style.OTransform = "animationRotate 1.2s linear infinite";
		} else {
			elem.style.transform = "animationRotate 1.2s linear infinite";
		}
	//console.log("debugger rotateAnimation");
	};

	/* stop animation */
	function stopAnimation(){
		var elem = document.getElementById("img");
		elem.style.webkitAnimationPlayState="paused";
		//console.log("debugger stopAnimation");
	}

	function toggleSound(){
		playing = !playing;
		var buttonPlay = document.getElementById("playPause");
		if(playing){
			audio.pause();
			stopAnimation();
			buttonPlay.classList.remove('fa-pause');
			buttonPlay.classList.add('fa-play');
			console.log("debugger pause");
		}else{
			buttonPlay.classList.remove('fa-play');
			buttonPlay.classList.add('fa-pause');
			audio.play();
			rotateAnimation();
			console.log("debugger play");
		}
	}

	/* function mute */
	function mute(button){
		muteVolume = !muteVolume;
		var mute = document.getElementById("mute");
		if(muteVolume){
		    audio.muted = false;
		    mute.classList.remove('fa-volume-off');
				mute.classList.add('fa-volume-up');
	    } else {
		    audio.muted = true;
				mute.classList.remove('fa-volume-up');
				mute.classList.add('fa-volume-off');
	    }
	}

	/* function mute */
	function autoNext(time, duration){
			if(time == duration){
				selectSong(++song);
			}		
	}

	/* Javascript Class using Revealing Module Pattern */
	window.Player = function(){
		
		drawPlayList();
		init();

		/* Revealing Module Pattern */
		return {
			play: 	play,
			pause: 	pause,
			repeat: repeat,
			slideVolume: slideVolume,
			slideSong: slideSong,
			drawPlayList: drawPlayList,
			selectSong: selectSong,
			nextSong: nextSong,
			prevSong: prevSong,
			convertFormat : convertFormat,
			rotateAnimation: rotateAnimation,
			stopAnimation: stopAnimation,
			toggleSound: toggleSound,
			mute: mute,
			autoNext: autoNext
		};
	}

})(window, undefined);