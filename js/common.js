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
		 partName = $("#container").attr("data-name"),
		 partLst = $(".partListZone .partlist ol"),
		 pager = $("#controlsPage .number"), 
		 gnbBtn = $(".navZone .btn"),
		 partLstBtn = $(".partListZone .btn"),
		 current = 0, maxNum,  jsonAry=[], spd =300;

	// DEFAULT
	pager.find('.current').text(current+1);
	$.ajax({
		type: "get",
		url: '../data.json',
		dataType: 'JSON',
		success: function(data){
			// DEFAULT
			$.each(data, function(idx, val) {
				if(this.part != partNum) return;
				for(var i = 0 ; i < this.listName.length ; i++){
					partLst.append('<li><a href="#none" data-idx="'+ i +'">'+ this.listName[i] +'</a></li>');
				}
				pager.find('.max').text(this.total);
				$("#container").load("/elearning-publishing/html/"+ partName + "/" + this.fileName[0]);
				maxNum = this.total;
				jsonAry = this;
			});
		}
	});

	// PAGER CONTROLS
	$("#controlsPage button").on("click", function(){
		if($(this).hasClass("next")){
			if(current == maxNum-1){
				alert("학습이 완료되었습니다. 수고하셨습니다.");
				window.close();
			} else{
				// 내용
				current++;
				$("#container").load("/elearning-publishing/html/" + partName + "/" + jsonAry.fileName[current], function(){
					$(".current", pager).text(current+1);
				});
			}

		}else{
			if(current == 0) return false;
			// 내용
			current--;
			$("#container").load("/elearning-publishing/html/" + partName + "/" + jsonAry.fileName[current], function(){
				$(".current", pager).text(current+1);
			});
		}
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
		}
	})
	// partListZone CONTROLS
	$(".partlist").hide();
	partLstBtn.on("click", function(){
		if(partLstBtn.hasClass("open")){
			partLstBtn.removeClass("open");
			$(".partlist").hide();
		}else {
			partLstBtn.addClass("open");
			$(".partlist").show();
		}
	})
	// $(document).on("click",".partlist .lst a", function(){
	// 	var _idx = $(this).attr("data-idx");
	// 	current = jsonAry.listPage[_idx];
	// 	$("#container").load("/elearning-publishing/html/" + partName + "/" + jsonAry.fileName[current], function(){
	// 			$(".current", pager).text(current+1);
	// 			partLstBtn.removeClass("open");
	// 			$(".partlist").hide();
	// 	});
	// });
	$(document).on("click","#gnb a", function(e){
		// e.preventdefault();
		current = parseInt($(this).attr("data-idx"));
		
		$("#container").load("/elearning-publishing/html/" + partName + "/" + jsonAry.fileName[current], function(){
				$(".current", pager).text(current+1);
				gnbBtn.removeClass("open");
				$("#gnb").hide();
		});
	});
})();

/* -----------------------------------------------------------------
DOCUMENT READY
----------------------------------------------------------------- */
$(document).ready(function(){
})
