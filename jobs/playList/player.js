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
	playList[0] = {src:'/audio/1.mp3', name: 'Uptown funk', artist: 'Mark Ronson Ft. Bruno Mars' };
	playList[1] = {src:'/audio/2.mp3', name: 'Kids', artist: 'MG MT' };
	playList[2] = {src:'/audio/3.mp3', name: 'Party rock anthem', artist: 'LMFAO, Lauren Bennett and GoonRock' };
	playList[3] = {src:'/audio/4.mp3', name: 'I feel the earth move', artist: 'Martika.' };
	playList[4] = {src:'/audio/5.mp3', name: 'Love my way', artist: 'Psychedelic Furs.' };
	playList[5] = {src:'/audio/6.mp3', name: 'Night fever', artist: 'Bee Gees' };
	playList[6] = {src:'/audio/7.mp3', name: 'One more time', artist: 'Daft Punk' };

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

	/* function button play pause */
	function playAndPause(){
		var buttonPlay = document.getElementById("playPause");
		if(audio.paused){
		    	audio.play();
		    	rotateAnimation();
					buttonPlay.classList.remove('fa-play');
					buttonPlay.classList.add('fa-pause');
	    }else{
					audio.pause();
					stopAnimation();
					buttonPlay.classList.remove('fa-pause');
					buttonPlay.classList.add('fa-play');
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
			playAndPause: playAndPause,
			mute: mute,
			autoNext: autoNext
		};
	}

})(window, undefined);