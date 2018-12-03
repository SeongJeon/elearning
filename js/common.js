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
		 cont = $(".contLst"), container = $("#container");
	var current = 0, spd =300,
		 maxNum =  $(".cont", cont).length, html;

	// DEFAULT
	pager.find('.current').text(current+1);
	pager.find('.max').text(maxNum);
	$(".contLst > .cont").each(function(i){
		$(this).attr("data-cont", i);
		if(i==0){
			$(this).clone().appendTo("#container");
		}
	})

	/*
	$.ajax({
		type: "get",
		url: '../data.json',
		dataType: 'JSON',
		success: function(data){
			// DEFAULT
			$.each(data, function(idx, val) {
				if(this.part != partNum) return;
				for(var i = 0 ; i < this.listName.length ; i++){
					// partLst.append('<li><a href="#none" data-idx="'+ i +'">'+ this.listName[i] +'</a></li>');
				}
				pager.find('.max').text(this.total);
				$("#container").load("/elearning-publishing/html/"+ partName + "/" + this.fileName[0]);
				maxNum = this.total;
				jsonAry = this;
			});
		}
	});
	*/

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

		var poster = $("#container .cont").data("poster"), 
			 movie= $("#container .cont").data("movie");
			jplayer(poster, movie);
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
		}
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
		}
	})
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
	// GNB - INDEX MENU CLICK
	$(document).on("click","#gnb a", function(e){
		current = parseInt($(this).attr("data-idx"));
		html = $('.cont', cont).filter("[data-cont="+current+"]").clone();
		container.html(html);
		$(".current", pager).text(current+1);
		gnbBtn.removeClass("open");
		$("#gnb").hide();

		var poster = $("#container .cont").data("poster"), 
			 movie= $("#container .cont").data("movie");
			jplayer(poster, movie);
	});


	jplayer(null,null);

})();

/* -----------------------------------------------------------------
PLAYER
----------------------------------------------------------------- */
// function jplayer(pasterUrl, moiveUrl) {
// 	// 동영상 플레이어 
// 	$("#jquery_jplayer_1").jPlayer({
// 		ready: function () {
// 			$(this).jPlayer("setMedia", {
// 				title: "test",
// 				// m4v: "http://www.jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v",
// 				m4v: moiveUrl,
// 				// ogv: "http://www.jplayer.org/video/ogv/Big_Buck_Bunny_Trailer.ogv",
// 				// webmv: "http://www.jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm",
// 				// poster: "http://www.jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png"
// 				poster : pasterUrl
// 			});
// 		},
// 		swfPath: "../dist/jplayer",
// 		supplied: "webmv, ogv, m4v",
// 		size: {
// 			width: "100%",
// 			height: "610",
// 			cssClass: "jp-video-360p"
// 		},
// 		useStateClassSkin: true,
// 		autoBlur: false,
// 		smoothPlayBar: true,
// 		keyEnabled: true,
// 		toggleDuration: true,
// 		verticalVolume: true,
// 		preload: "auto",
// 		ended: function() { 
// 	   	$(".jp-play").removeClass("pause");
// 		}
// 	});
// 	$(".jp-mute").on("click", function(){
// 		$(this).toggleClass("on");
// 	})		
// 	$(".jp-play").on("click", function(){
// 		$(this).toggleClass("pause");
// 	})		
// 	$(".jp-stop").on("click", function(){
// 		$(".jp-play").removeClass("pause");
// 	})	
// 	$(".jp-repeat").on("click", function(){
// 		$(this).toggleClass("on");
// 	})
// 	$(".btn-volumbar").on("click", function(){
// 		if($(this).hasClass("open")) $(".volume-bar-zone").hide();
// 		else $(".volume-bar-zone").show();

// 		$(this).toggleClass("open");
// 	})
// 	$(".jp-full-screen").on("click", function(){
// 		$(this).toggleClass("notfull");
// 	})
// 	$(".jp-video-play").on("click", function(){
// 		$(".jp-play").addClass("pause");
// 	})
// }
function jplayer(pasterUrl, moiveUrl){
	var myPlayer = $("#jquery_jplayer_1"),
		myPlayerData,
		fixFlash_mp4, // Flag: The m4a and m4v Flash player gives some old currentTime values when changed.
		fixFlash_mp4_id, // Timeout ID used with fixFlash_mp4
		ignore_timeupdate, // Flag used with fixFlash_mp4
		options = {
			ready: function (event) {
				// Hide the volume slider on mobile browsers. ie., They have no effect.
				if(event.jPlayer.status.noVolume) {
					// Add a class and then CSS rules deal with it.
					$(".jp-gui").addClass("jp-no-volume");
				}
				// Determine if Flash is being used and the mp4 media type is supplied. BTW, Supplying both mp3 and mp4 is pointless.
				fixFlash_mp4 = event.jPlayer.flash.used && /m4a|m4v/.test(event.jPlayer.options.supplied);
				// Setup the player with media.
				$(this).jPlayer("setMedia", {
					title: "Big Buck Bunny",
					m4v: moiveUrl,
					// ogv: "http://www.jplayer.org/video/ogv/Big_Buck_Bunny_Trailer.ogv",
					// webmv: "http://www.jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm",
					poster: pasterUrl
				});
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
			cssSelectorAncestor: "#jp_container_1",
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
		value : $.jPlayer.prototype.options.volume,
		slide: function(event, ui) {
			myPlayer.jPlayer("option", "muted", false);
			myPlayer.jPlayer("option", "volume", ui.value);
		}
	});

	if($("#container .cont.video").length < 1){
		$("div.jp-video-play").hide();
	}

}