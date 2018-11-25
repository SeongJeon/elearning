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
	var partNum = $("#container").attr("data-part"),
		 partLst = $(".partListZone .partlist ol"),
		 pager = $("#controlsPage .number"), 
		 gnbBtn = $(".navZone .btn"),
		 current = 0, maxNum,  jsonAry=[], spd =300;
		 // console.log(partNum);

	// DEFAULT
	pager.find('.current').text(current+1);
	$.ajax({
		type: "get",
		url: './data.json',
		dataType: 'JSON',
		success: function(data){
			// DEFAULT
			$.each(data, function(idx, val) {
				if(this.part != partNum) return;
				for(var i = 0 ; i < this.listName.length ; i++){
					partLst.append('<li><a href="#">'+ this.listName[i] +'</a></li>');
				}
				pager.find('.max').text(this.total);
				$("#container").load("/elearning-publishing/html/" + this.fileName[0]);
				maxNum = this.total;
				jsonAry = this;
			});
		}
	});

	// PAGER CONTROLS
	$("#controlsPage button").on("click", function(){
		if($(this).hasClass("next")){
			if(current == maxNum-1) return false;
			// 내용
			current++;
			$("#container").load("/elearning-publishing/html/" + jsonAry.fileName[current], function(){
				$(".current", pager).text(current+1);
			});

		}else{
			if(current == 0) return false;
			// 내용
			current--;
			$("#container").load("/elearning-publishing/html/" + jsonAry.fileName[current], function(){
				$(".current", pager).text(current+1);
			});
		}
	})

	// navZone CONTROLS
	$("#gnb").hide();
	gnbBtn.on("click", function(){
		if(gnbBtn.hasClass("open")){
			gnbBtn.removeClass("open");
			$("#gnb").stop().slideUp(spd);
		}else {
			gnbBtn.addClass("open");
			$("#gnb").stop().slideDown(spd);
		}
	})
})();

/* -----------------------------------------------------------------
DOCUMENT READY
----------------------------------------------------------------- */
$(document).ready(function(){
})
