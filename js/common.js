// 진입 모바일
if(navigator.userAgent.match(/Mobile|iP(hone|od)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
	$("body").addClass("mobile");
	if(navigator.userAgent.match(/iP(hone|od)|iPad/)) {$("body").addClass("ios");}
}else{$("body").addClass("pc"); }


/* -----------------------------------------------------------------
CONTROLS COMPONENT JAVASCRIPT
----------------------------------------------------------------- */
var fncControlsComponent = (function(){
	var pager = $("#controlsPage .number"),
		 gnbBtn = $(".navZone .btn"),
		 optLstBtn = $(".optionZone .btn"),
		 cont = $(".contLst"), container = $("#content");
	var current = 0, spd =300,
		 maxNum =  $(".cont", cont).length, html, 
		 btnbgm = "../audio/sound/Switch.mp3";

	// DEFAULT
	pager.find('.current').text(current+1);
	pager.find('.max').text(maxNum);
	$(".contLst > .cont").each(function(i){
		$(this).attr("data-cont", i);
		if(i==0){
			$(this).clone().appendTo("#content");
			var bgm = container.find(".cont").data("bgm");
			bgmPlayer(bgm);
			btnPlayer(btnbgm);
		}
	})
	moviePlayer(null,null);


	// PAGER CONTROLS
	$("#controlsPage button").on("click", function(){
		if($(this).hasClass("next")){
			if(current == maxNum-1){
				alert("학습이 완료되었습니다. 수고하셨습니다.");
				window.close();
				return false;
			} else{current++; }
		}else{
			if(current == 0) return false;
			current--;
		}
		html = $('.cont', cont).filter("[data-cont="+current+"]").clone();
		container.html(html);
		$(".current", pager).text(current+1);
		gnbBtn.removeClass("open");
		$("#gnb").hide();
		$(".jp-toggles .btn-volum").removeClass("open");
		$(".jp-toggles .volume-bar-zone").hide();

		var poster = $("#container .cont").data("poster"), 
			 movie= $("#container .cont").data("movie");
		var bgm = $("#container .cont").data("bgm");
		moviePlayer(poster, movie);
		bgmPlayer(bgm);
		btnPlayer(btnbgm);
	})

	// navZone CONTROLS
	$("#gnb").hide();
	gnbBtn.on("click", function(){
		if(gnbBtn.hasClass("open")){
			gnbBtn.removeClass("open");
			$("#gnb").hide();
		}else {
			gnbBtn.addClass("open");
			$("#gnb").show();
			if(optLstBtn.hasClass("open")){
				optLstBtn.removeClass("open");
				$(".optionlist").hide();
			}
			$(".jp-toggles .btn-volum").removeClass("open");
			$(".jp-toggles .volume-bar-zone").hide();
		}
		btnPlayer(btnbgm);
	})

	// partListZone CONTROLS
	$(".optionlist").hide();
	optLstBtn.on("click", function(){
		if(optLstBtn.hasClass("open")){
			optLstBtn.removeClass("open");
			$(".optionlist").hide();
		}else {
			optLstBtn.addClass("open");
			$(".optionlist").show();

			if(gnbBtn.hasClass("open")){
				gnbBtn.removeClass("open");
				$("#gnb").hide();
			}
			$(".jp-toggles .btn-volum").removeClass("open");
			$(".jp-toggles .volume-bar-zone").hide();
		}
		btnPlayer(btnbgm);
	})
	// GNB - INDEX MENU CLICK
	$(document).on("click","#gnb a", function(e){
		current = parseInt($(this).attr("data-idx"));
		html = $('.cont', cont).filter("[data-cont="+current+"]").clone();
		container.html(html);
		$(".current", pager).text(current+1);
		gnbBtn.removeClass("open");
		$("#gnb").hide();
		$(".jp-toggles .btn-volum").removeClass("open");
		$(".jp-toggles .volume-bar-zone").hide();

		var poster = $("#container .cont").data("poster"), 
			 movie= $("#container .cont").data("movie");
		moviePlayer(poster, movie);
		var bgm = $("#container .cont").data("bgm");
		bgmPlayer(bgm);			
	});
	// OPTION MENU CLICK
	$(".optionlist a").on("click", function(){
		var pop = $(this).attr("href");
		$("#wrap").append("<span class='dim'></span>");
		$(pop).show();
		optLstBtn.removeClass("open");
		$(".optionlist").hide();
		return false;
	})
	$(".popup .closebtn").on("click", function(){
		$("#wrap .dim").remove();
		$(this).closest(".popup").hide();
	})
	
	// main - start btn
	$(document).on("click", ".btn-start", function(){
		current = 1;
		html = $('.cont', cont).filter("[data-cont="+current+"]").clone();
		container.html(html);
		$(".current", pager).text(current+1);
		gnbBtn.removeClass("open");
		$("#gnb").hide();

		//hoho 추가
		var bgm = $("#container .cont").data("bgm");
		bgmPlayer(bgm);
		btnPlayer('../audio/sound/beeps5.mp3');
	})




	// 볼륨 바
	$(".jp-toggles .btn-volum").on("click", function(){
		if($("#container .cont").hasClass("video")==false) return; 

		if($(this).hasClass("open"))$(".volume-bar-zone").hide();
		else $(".volume-bar-zone").show();

		$(this).toggleClass("open");
	})
	// click
	$(".playerui a").on("click", function(){
		if($(".btn-volum").hasClass("open")){
			$(".btn-volum").removeClass("open");
			$(".volume-bar-zone").hide();
		} 
		btnPlayer(btnbgm);
	})
})();


/* -----------------------------------------------------------------
MOVIE PLAYER
----------------------------------------------------------------- */
function moviePlayer(pasterUrl, moiveUrl){
	var myPlayer = $("#jquery_jplayer_1"),
		myPlayerData,
		fixFlash_mp4, 
		fixFlash_mp4_id, 
		ignore_timeupdate, 
		options = {
			ready: function (event) {
				if(event.jPlayer.status.noVolume) {
					$(".jp-gui").addClass("jp-no-volume");
				}
				fixFlash_mp4 = event.jPlayer.flash.used && /m4a|m4v/.test(event.jPlayer.options.supplied);
				// Setup the player with media.
				$(this).jPlayer("setMedia", {
					title: "Big Buck Bunny",
					m4v: moiveUrl,
					// ogv: "http://www.jplayer.org/video/ogv/Big_Buck_Bunny_Trailer.ogv",
					// webmv: "http://www.jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm",
					poster: pasterUrl
				}).jPlayer("play");
			},
			size: {
				width: "100%",
				height: "610px",
				cssClass: "jp-video-360p"
			},
			timeupdate: function(event) {
				if(!ignore_timeupdate) {
					myControl.progress.slider("value", event.jPlayer.status.currentPercentAbsolute);
				}
			},
			volumechange: function(event) {
				if(event.jPlayer.options.muted) {
					myControl.volume.slider("value", 0);
				} else {
					myControl.volume.slider("value", event.jPlayer.options.volume);
				}
			},
			swfPath: "../dist/jplayer",
			supplied: "webmv, ogv, m4v",
			cssSelectorAncestor: "#jp-movie-zone",
			wmode: "window",
			smoothPlayBar: true,
			keyEnabled: true
		},
		myControl = {
			progress: $(options.cssSelectorAncestor + " .jp-progress-slider"),
			volume: $(options.cssSelectorAncestor + " .jp-volume-slider")
		};

	// Instance jPlayer
	myPlayer.jPlayer(options);

	// A pointer to the jPlayer data object
	myPlayerData = myPlayer.data("jPlayer");

	// Define hover states of the buttons
	$('.jp-gui ul li').hover(function() { $(this).addClass('ui-state-hover'); }, function() { $(this).removeClass('ui-state-hover'); } );

	// Create the progress slider control
	myControl.progress.slider({
		animate: "fast",
		max: 100,
		range: "min",
		step: 0.1,
		value : 0,
		slide: function(event, ui) {
			var sp = myPlayerData.status.seekPercent;
			if(sp > 0) {
				// Apply a fix to mp4 formats when the Flash is used.
				if(fixFlash_mp4) {
					ignore_timeupdate = true;
					clearTimeout(fixFlash_mp4_id);
					fixFlash_mp4_id = setTimeout(function() {
						ignore_timeupdate = false;
					},1000);
				}
				// Move the play-head to the value and factor in the seek percent.
				myPlayer.jPlayer("playHead", ui.value * (100 / sp));
			} else {
				// Create a timeout to reset this slider to zero.
				setTimeout(function() {
					myControl.progress.slider("value", 0);
				}, 0);
			}
		}
	});

	// Create the volume slider control
	myControl.volume.slider({
		animate: "fast",
		max: 1,
		range: "min",
		step: 0.01,
		orientation: "vertical",
		value : $.jPlayer.prototype.options.volume,
		slide: function(event, ui) {
			myPlayer.jPlayer("option", "muted", false);
			myPlayer.jPlayer("option", "volume", ui.value);
		}
	});

	// if($("#container .cont.video").length < 1){
	// 	$("div.jp-video-play").hide();
	// }
}

// 리프래쉬 
$(document).on("click", ".playerui .jp-stop", function(){
	$("#jquery_jplayer_1").jPlayer("play");
})


/* -----------------------------------------------------------------
AUDIO PLAYER
----------------------------------------------------------------- */
function bgmPlayer(bgmUrl){
	if(bgmUrl == undefined){
		$("#jquery_jplayer_2").jPlayer("stop");
	}else{
		$("#jquery_jplayer_2").jPlayer("setMedia", {
			title: "bgm auido",
			mp3: bgmUrl
		}).jPlayer("play");
	}

	$("#jquery_jplayer_2").jPlayer({
		ready: function (event) {
			$(this).jPlayer("setMedia", {
				title: "bgm auido",
				mp3: bgmUrl
			}).jPlayer("play");
		},
		swfPath: "../dist/jplayer",
		supplied: "mp3",
		wmode: "window",
		useStateClassSkin: true,
		autoBlur: false,
		cssSelectorAncestor: "#jp_container_2",
		smoothPlayBar: true,
		keyEnabled: true,
		remainingDuration: true,
		toggleDuration: true
	});
}


/* -----------------------------------------------------------------
BTN PLAYER
----------------------------------------------------------------- */
function btnPlayer(bgmUrl){
	if(bgmUrl == undefined){
		$("#jquery_jplayer_3").jPlayer("stop");
	}else{
		$("#jquery_jplayer_3").jPlayer("setMedia", {
			title: "bgm auido",
			mp3: bgmUrl
		}).jPlayer("play");
	}

	$("#jquery_jplayer_3").jPlayer({
		ready: function (event) {
			$(this).jPlayer("setMedia", {
				title: "bgm auido",
				mp3: bgmUrl,
				wav: bgmUrl
			});
		},
		swfPath: "../dist/jplayer",
		supplied: "mp3, wav",
		wmode: "window",
		useStateClassSkin: true,
		autoBlur: false,
		cssSelectorAncestor: "#jp_container_3",
		smoothPlayBar: true,
		keyEnabled: true,
		remainingDuration: true,
		toggleDuration: true
	});
}