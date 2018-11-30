// 진입 모바일
if(navigator.userAgent.match(/Mobile|iP(hone|od)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
	$("body").addClass("mobile");
	if(navigator.userAgent.match(/iP(hone|od)|iPad/)) {$("body").addClass("ios");}
}else{$("body").addClass("pc"); }


var elearning = {};

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

		 // console.log(maxNum);
	// DEFAULT
	pager.find('.current').text(current+1);
	pager.find('.max').text(maxNum-1);
	$(".contLst .cont").each(function(i){
		$(this).attr("data-cont", i);
		if(i==0){
			$(this).clone().appendTo("#container");
		}
	})
	// $.ajax({
	// 	type: "get",
	// 	url: '../data.json',
	// 	dataType: 'JSON',
	// 	success: function(data){
	// 		// DEFAULT
	// 		$.each(data, function(idx, val) {
	// 			if(this.part != partNum) return;
	// 			for(var i = 0 ; i < this.listName.length ; i++){
	// 				// partLst.append('<li><a href="#none" data-idx="'+ i +'">'+ this.listName[i] +'</a></li>');
	// 			}
	// 			pager.find('.max').text(this.total);
	// 			$("#container").load("/elearning-publishing/html/"+ partName + "/" + this.fileName[0]);
	// 			maxNum = this.total;
	// 			jsonAry = this;
	// 		});
	// 	}
	// });

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

		if(current != maxNum-1) $(".current", pager).text(current+1);
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
		$(pop).show();
		optLstBtn.removeClass("open");
		$(".optionlist").hide();
		return false;
	})
	$(".popup .closebtn").on("click", function(){
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
	});

})();

/* -----------------------------------------------------------------
DOCUMENT READY
----------------------------------------------------------------- */
$(document).ready(function(){
})
