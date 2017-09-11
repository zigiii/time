//var remainCountDownTime;
var intervalTime = 27;
var stopInterval;

initTime();

function initTime(){
	$.ajax({
		url: '/time/time/queryMostImportantTime',
		type: 'get',
//		beforeSend: function(){
//			loading("加载中");
//		},
		success: function(data){
			var mostTime = data.data;
			console.log(mostTime);
			$('#mostTimeName').text(mostTime.timeName);
			$('#mostTimeSlogan').text(mostTime.timeSlogan);
			//showRemainDate(mostTime);
			stopInterval = setInterval(showRemainDate,intervalTime,mostTime);
		},
		error: function(){
			alert("网络异常，请稍后重试！");
		}
//		,
//		complete: function(){
//			loaded();
//		}
	});
}

function showRemainDate(mostTime){
	var progressBar = $('#mostRemainProgress');
	var totalCountDownTime = mostTime.totalCountDownTime;
	var remainCountDownTime = mostTime.remainCountDownTime;
	var showRemainDate = getRemainDate(remainCountDownTime);
	$('#mostRemainDate').text(showRemainDate);
	mostTime.remainCountDownTime = remainCountDownTime - intervalTime;
	//console.log(remainCountDownTime);
	//动态的，颜色要变，结束时的停止，停止后的处理（进度条停止，是否重新开始计时，改变数据（是否结束状态，有周期则延长结束时间）
	var progress;
	if(remainCountDownTime <= 0){
		var progress = 100;
		clearInterval(stopInterval);
		if(progressBar.hasClass("progress-bar-danger")){
			progressBar.removeClass("progress-bar-danger");
		}
		progressBar.addClass("progress-bar-over");
		progressBar.removeClass("progress-bar-striped");
		progressBar.removeClass("active");
		if(mostTime.cycleDate){
			defer(mostTime);
		}
	}else{
		progress = 100 - parseInt((remainCountDownTime/totalCountDownTime)*1000);
		if(progress < 70){
			if(progressBar.hasClass("progress-bar-over")){
				progressBar.removeClass("progress-bar-over");
			}
			progressBar.addClass("progress-bar-success");
		}else if(progress < 90){
			if(progressBar.hasClass("progress-bar-success")){
				progressBar.removeClass("progress-bar-success");
			}
			progressBar.addClass("progress-bar-warning");
		}else if(progress >= 90){
			if(progressBar.hasClass("progress-bar-warning")){
				progressBar.removeClass("progress-bar-warning");
			}
			progressBar.addClass("progress-bar-danger");
		}
	}
	$('#mostRemainProgress').css("width",progress+"%");
	$('#mostRemainProgress').attr("aria-valuenow",progress);
	$('#mostRemainProgress').text(progress+"%");
}

function defer(mostTime){
	$.ajax({
		url: '/time/time/deferTime',
		data:JSON.stringify(mostTime),
		type: 'post',
		dataType:'json',
		contentType:'application/json',
//		beforeSend: function(){
//			loading("加载中");
//		},
		success: function(data){
			alert(data.code);
		},
		error: function(){
			alert("网络异常，请稍后重试！");
		}
//		,
//		complete: function(){
//			loaded();
//		}
	});
}
