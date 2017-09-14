//var remainCountDownTime;
var intervalTime = 27;
var bottomIntervalTime = 60000;
var stopInterval;
var stopIntervalArray = new Array();

initTime();

function initTime(){
	$.ajax({
		//url: '/time/time/queryMostImportantTime',
		url: '/time/time/queryPagingTime/0',
		type: 'get',
//		beforeSend: function(){
//			loading("加载中");
//		},
		success: function(result){
//			var mostTime = data.data;
//			console.log(mostTime);
//			$('#mostTimeName').text(mostTime.timeName);
//			$('#mostTimeSlogan').text(mostTime.timeSlogan);
//			stopInterval = setInterval(showRemainDate,intervalTime,mostTime);
			$('#bottomDiv').html("");
			console.log(result.data);
			var timeList = result.data.dataList;
			for(index in timeList){
				if(0 == index){
					$('#mostTimeName').text(timeList[0].timeName);
					$('#mostTimeSlogan').text(timeList[0].timeSlogan);
					stopInterval = setInterval(showRemainDate,intervalTime,timeList[0]);
				}else{
					addBottomTime(timeList[index]);
				}
			}
			
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
	//动态的，颜色要变，结束时的停止，停止后的处理（进度条停止，是否重新开始计时，改变数据（是否结束状态，有周期则延长结束时间）
	//刷新周期后要以时间重新排序
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
		}else{
			changeStatus(mostTime);
		}
	}else{
		progress = 100 - parseInt((remainCountDownTime/totalCountDownTime)*100);
		if(100 == progress){
			progress = 99;
		}
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

//添加底部计时
function addBottomTime(time){
	//名称h2
	var nameH2 = $("<h2></h2>").text(time.timeName);
	//计时p
	var dateP = $("<p></p>").addClass("bottom-date-style");
	//口号p
	var sloganP = $("<p></p>").addClass("bottom-slogan-style").text(time.timeSlogan);
	//进度条内层div
//	var progressInDiv = $("<div></div>").attr("role","progressbar").attr("aria-valuenow","0")
//	.attr("aria-valuemin","0").attr("aria-valuemax","100")
//	.addClass("progress-bar progress-bar-success progress-bar-striped active most-remain-progress");
//	//进度条外层div
//	var progressOutDiv = $("<div></div>").addClass("progress");
//	progressOutDiv.append(progressInDiv);
	//列div
	var colDiv = $("<div></div>").addClass("col-xs-12");
	colDiv.append(nameH2,dateP,sloganP);
	//行div
	var rowDiv = $("<div></div>").addClass("row");
	rowDiv.append(colDiv);
	//添加一行计时
	$('#bottomDiv').append(rowDiv);
	showBottomRemainDate(time,dateP);
	stopIntervalArray[time.timeId + time.timeMode] = setInterval(showBottomRemainDate,bottomIntervalTime,time,dateP);
}

//低于三小时内的循环周期，不发短信提示，原则：省钱
function showBottomRemainDate(mostTime,dateP){
	var remainCountDownTime = mostTime.remainCountDownTime;
	var showRemainDate = getRemainDate(remainCountDownTime,3);
	dateP.text(showRemainDate);
	mostTime.remainCountDownTime = remainCountDownTime - bottomIntervalTime;
	if(remainCountDownTime <= 0){
		stopIntervalArray(mostTime.timeId + mostTime.timeMode);
	}
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
			initTime();
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

function changeStatus(mostTime){
	$.ajax({
		url: '/time/time/changeOverStatus',
		data:JSON.stringify(mostTime),
		type: 'post',
		dataType:'json',
		contentType:'application/json',
		success: function(data){
			initTime();
		},
		error: function(){
			alert("网络异常，请稍后重试！");
		}
	});
}