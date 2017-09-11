//获取格式化后时间字符串
//time: 毫秒数,如果没传获取当前时间
function getNowFormatDate(time) {
	var date;
	if(undefined == time){
		date = new Date();
	}else{
		date = new Date(parseFloat(time));
	}
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

//获取剩余时间
//time: 毫秒数
function getRemainDate(time){
	if(time <= 0){
		return "0天0时0分0秒 000";
	}
	var showMillisecond = time%1000;
	
	var second = time / 1000;
	var showSecond = second % 60;

	var minute = second / 60;
	var showMinute = minute % 60;
	
	var hour = minute / 60;
	var showHour = hour % 24;

	var day = hour / 24;
	return parseInt(day) + "天" + parseInt(showHour) + "时" + parseInt(showMinute) + "分" + parseInt(showSecond) + "秒 " + parseInt(showMillisecond);
}














//URL

//API地址
//var openId = "123";
var API = "http://127.0.0.1:8088/WxAPI/api/";
var WS = "ws://127.0.0.1:8088/WxAPI/";
var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4181f4cfbcd339f6&redirect_uri=URL&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
var UI="http://127.0.0.1:8080/WxUI/";
var isClick = true;


//var API = "http://hdkjhlyzx.cn/WxAPI/api/";
//var WS = "ws://hdkjhlyzx.cn/WxAPI/";


//从url中获取参数
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);

    if(r!=null)return  unescape(r[2]); return null;
}

//根据返回的code获取openId
function getOpenIdByCode(authCode){
	$.ajax({
			type: "GET",
			url: API+"weiXinController/getOpenIdByCode/"+authCode,
			success: function(res) {
				if(res && res.length>0){
					openId = res; 
					console.log(openId);
//					checkUserStatus(openId);//检查当前微信用户是否已绑定
				}
			},
			error: function(err) {
				console.log(err);
			}
		});
}

function nofind(){
	var img=event.srcElement;
	img.src="img/garden_detailed.jpg";
	img.onerror=null;   //控制不要一直跳动
}
function nofindHead(){
	var img=event.srcElement;
	img.src="img/newsDetailed_header.jpg";
	img.onerror=null;   //控制不要一直跳动
}

// 点赞
function heart(id,meetingId,type,th){
	//console.log(p_status,id,meetingId);
/*	if(isClick == true){
		isClick = false;*/
		var best_img = $(th).children('img');
		var best_num = $(th).children('.best_num');
		var num = parseInt(best_num.text());
		if (best_img.attr("src") == "img/newsDetailed_02.png") {
			best_img.attr('src', 'img/newsDetailed_03.png');
			num += 1;
			best_num.text(num);
			status = '0';
			//$(this).children("img").attr("src","img/newsDetailed_03.png");
			praise(id,meetingId,type,status);
		}else {
			best_img.attr('src', 'img/newsDetailed_02.png');
			num -= 1;
			best_num.text(num);
			status = '1';
			//$(this).children("img").attr("src","img/newsDetailed_02.png");
			cancelPraise(id,meetingId,type,status);
		}
}
//取消点赞
function cancelPraise(id,meetingId,type,status){
	//alert(type);
		
		$.ajax({
			type:"get",
			url:API+"meeting/cancelPraise/"+id+"/"+meetingId+"/"+openId+"/"+type+"/"+status,
			error:function(){
				isClick = true;
			},
			success: function(data){

				
			}	
		}); 
}	
//点赞
function praise(id,meetingId,type,status){
		
		$.ajax({
			type:"get",
			url:API+"meeting/praise/"+id+"/"+meetingId+"/"+openId+"/"+type+"/"+status,
			error:function(){
				isClick = true;
			},
			success: function(){
			
			}

			
		}); 
}	
//收藏
function collection(id,collectType){
	var collectImg = $("#shouchang").attr("src");
	var collectionStatus = "";
	if(collectImg == "img/newsDetailed_01.png"){
		$("#shouchang").attr("src","img/newsDetailed_06.png");
		collectionStatus = "0";
	}else if(collectImg == "img/newsDetailed_06.png"){
		$("#shouchang").attr("src","img/newsDetailed_01.png");
		collectionStatus = "1";
	}
		$.ajax({
			type:"get",
			url:API+"meeting/collect/"+openId+"/"+id+"/"+collectionStatus+"/"+collectType,
			success: function(data){
				console.log(data);
				//meetingPraise();
			}
		})
}





//新增评论
function comment(id,type,option){
	if ($("video").length == 1) {
		var videoImg = $("video").attr('poster');
		var videoSrc = $("video").attr('src');
		$("#videoPlayer").remove();
		$("#video").append('<video poster="'+videoImg+'" controls="controls" preload="auto" x-webkit-airplay="true" webkit-playsinline="true" width="100%" height="" src="'
                    +videoSrc+'" x5-playsinline playsinline webkit-playsinline id="videoPlayer" name="media"></video>');
	}
	$(".weui-tab__panel").append('\
		<div class="js_dialog" id="Dialog">\
			<div class="weui-mask"></div>\
			<form action="" method="post" id="commentForm" enctype="multipart/form-data">\
				<div class="weui-dialog weui-skin_android">\
					<div class="weui-dialog__bd">\
						<textarea onchange="check(this,140);" onkeydown="check(this,140);" onkeyup="check(this,140);" class="weui-textarea" rows="4" id="comText" name="commentContent" placeholder="请输入评论"></textarea>\
						<p><span>140字</span>/140字</p>\
						<input type="hidden" id="pd" name="parentId">\
						<input type="hidden" id="od" name="openId">\
						<input type="hidden" id="type" name="type">\
					</div>\
					<div class="weui-dialog__ft">\
						<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" onClick = "cancel()" >取消</a>\
						<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" id="qued" >确定</a>\
					</div>\
				</div>\
			</form>\
		</div>');
	$("#qued").bind("click", function(){
		var $this = $(this).parent().siblings().find('textarea');
		addComment(option,$this);
	  	
	});
	document.getElementById("od").value = openId;
	document.getElementById("pd").value = id;
	document.getElementById("type").value = type;

// 加载评论框
	Dialog = $('#Dialog');
	Dialog.find('textarea').val("");
	
}

// 保存评论
function addComment(option , th){
	//$("#commentForm").attr({"action":API+"/comment/addComment"});
    //document.getElementById("md").value = d;

	var options = {  
            url:API+"comment/addComment", //上传文件的路径  
            type:'get',
            success:function(data){  
				//console.log(data); 
            },
            complete:function(){
            	$("#Dialog").remove();
            	if(option == "hotComment"){
					getHot();
            	}else if(option == "nomalComment"){
					getNomal();
					//getMore()
            	}else if(option == "detailed"){
            		getPHot();
            		getPNomal();
            	}else if(option == "meetingComment"){
            		getHot();
            		getNomal();
            		//getMore()
            	}
			
            }
       }; 
    var oLen = th.val().length;
    if (oLen > 10) {
    	$("#Dialog").hide();
		$("#commentForm").ajaxSubmit(options); 
    	$("#qued").unbind( "click" );
    	return false; 
    }else{
    	getDialog("评论内容必须多于10个字！");
    }
}


//取消评论
function cancel(){
	 Dialog = $('#Dialog');
	 $("#Dialog").remove();
}

// 限定评论框字数
function check(th,num) { 
	var str = $(th).val(); 

	var reg = str.length;

	$span = $(th).next('p').find('span');
		if (reg > num) {
			$span.css('color', 'red');
			$span.text("已超出"+(reg-num)+"字");
			str = str.substr(0,140);
			$(th).val(str);
		} else if(reg <= num){
			$span.css('color', '#7f7f7f');
			$span.text((num-reg)+"字");
		}
} 


// 无标题，点击确定即可关闭的弹框
function getDialog(msg){
	var dialog1 = '\
	<div class="js_dialog" id="dialog1" style="display: none;">\
        <div class="weui-mask"></div>\
        <div class="weui-dialog">\
            <div class="weui-dialog__bd">'+msg+'</div>\
            <div class="weui-dialog__ft">\
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary primary">确定</a>\
            </div>\
        </div>\
    </div>';

	$(".weui-tab__panel").append(dialog1);
	$("#dialog1").fadeIn('fast');
	$(".primary").on('click', function(event) {
		$(this).parents('#dialog1').fadeOut(); 
        $(this).parents('#dialog1').remove();  
	});

}

// 无标题，有 确定 和取消 的弹框
function sureDialog(msg , callback){
	var dialog2 = '\
	<div class="js_dialog" id="dialog2" style="display: none;">\
        <div class="weui-mask"></div>\
         <div class="weui-dialog">\
            <div class="weui-dialog__bd">'+msg+'</div>\
            <div class="weui-dialog__ft">\
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default default">取消</a>\
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary primary">确定</a>\
            </div>\
        </div>\
    </div>';

    $(".weui-tab__panel").append(dialog2);
	$("#dialog2").fadeIn('fast');
	$("#dialog2").on('click', '.default', function(event) {
		$('#dialog2').fadeOut('fast',function(){  
            $('#dialog2').remove();  
        }); 
	});
	$("#dialog2").on('click', '.primary', function(event) {
		$('#dialog2').fadeOut('fast',function(){  
            $('#dialog2').remove();
            callback();
        }); 
	});
}


// 成功提示：已完成
function successfully(msg){
	var success = '\
	<div id="toast" style="display: none;">\
        <div class="weui-mask_transparent"></div>\
        <div class="weui-toast">\
            <i class="weui-icon-success-no-circle weui-icon_toast"></i>\
            <p class="weui-toast__content">'+msg+'</p>\
        </div>\
    </div>';

    $(".weui-tab__panel").append(success);
    var $toast = $('#toast');
    if ($toast.css('display') != 'none') return;
    $toast.fadeIn(100);
    setTimeout(function () {
        $toast.fadeOut(100);
        $toast.remove();
    }, 2000);
}

// 加载中提示：数据加载中
function loading(msg){
	if (!msg) {
		msg = "";
	}
	var loading = '\
	<div id="loadingToast" style="display:none;">\
        <div class="weui-mask_transparent"></div>\
        <div class="weui-toast">\
            <i class="weui-loading weui-icon_toast"></i>\
            <p class="weui-toast__content">'+msg+'</p>\
        </div>\
    </div>';
    $(".weui-tab__panel").append(loading);
    var $loadingToast = $('#loadingToast');
    if ($loadingToast.css('display') != 'none') return;
	$loadingToast.fadeIn(100);
}
function loaded(){
	var $loadingToast = $('#loadingToast');
    $loadingToast.fadeOut(100);
	$loadingToast.remove();
}

// 没有数据时提示：空白页
function empty(obj){
	var empty = '\
	<div class="empty_box">\
		<div class="empty_cont">\
			<img src="img/empty.png" alt="">\
			<span>哦噢！这里空空如也！</span>\
		</div>\
	</div>';
	obj.append(empty);
}
/*var obj = $(".second_level");
empty(obj);*/

// 左滑删除
function swipeDel(signal, del, callback){
	signal.on("swipeLeft",function(){//左滑显示删除按键
	    $(this).animate({
	        left:'-80px'
	    },300,'linear').siblings().animate({
	        right:'0'
	    },300,'linear');

	    // 其他列表项隐藏删除按键
	    var schItemList = $(this).parent().siblings();
	    schItemList.each(function(){
	    	$(this).children().eq(0).animate({
		        left:'0'
		    },300,'linear').siblings().animate({
		        right:'-80px'
		    },300,'linear')
	    });

	});
	signal.on("swipeRight",function(){//右滑恢复 
	    $(this).animate({
	    	left:'0'
	    },300).siblings().animate({
	    	right:'-80px'
	    },300);
	});

	del.on("tap",function(){ //删除
		if(undefined == callback){
			 $(this).parent().remove();
		}else{
			callback($(this));
		}
	});

}


//比较时间，返回1为开始时间晚于等于结束时间，返回0为开始时间早于结束时间
function compareDate(startDate, endDate){
	var startTime = new Date(startDate).getTime();
	var endTime = new Date(endDate).getTime();
	if(startTime >= endTime){
		return 1;
	}else if(startTime < endTime){
		return 0;
	}
}

//比较当前时间，返回1为开始时间晚于等于当前时间，返回0为开始时间早于当前时间
function compareNowDate(startDate){
	var startTime = new Date(startDate).getTime();
	var nowTime = new Date().getTime();
	if(startTime >= nowTime){
		return 1;
	}else if(startTime < nowTime){
		return 0;
	}
}

//判断是否包含中文,true包含,false不含
function isChinese(text){
	var re=/([\u4E00-\u9FA5])/;
	if (re.test(text)) {
		return true;
	}else{
		return false;
	}
}