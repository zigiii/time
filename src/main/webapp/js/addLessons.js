var treeData=new Array();//选中的对象
var currPid='0';//当前对象的上级组织id
var $ActionJoin = $('#ActionJoin');
var openId=''; //用户的openId
var userId = '';  //用户名
var realname = '';//真实姓名
var orgId = '';   //组织id
var orgName = ''; //组织名称
var userNum='';
init();

//初始化获取openId
function init(){
    var openId_trans = GetQueryString("openId");
    var authCode = GetQueryString("code");
    if(openId_trans && openId_trans.length>0){
        openId = openId_trans;
    }else{//URL中都不存在openId,判断当前是否有code传入，通过授权获取openId
        if(authCode !=null && authCode.toString().length>1){
            getOpenIdByCode(authCode);
        }
    }
  //先查出发布者
   queryPublisher();
}

/**
 * 查询当前人员组织信息
 */
function queryPublisher(){
	 $.ajax({
       type: "get",
       dataType: "json",
       url: API+'ORG/chooseUserOrOrg/'+openId,
       success: function (data) {
           userId = data.user.username;   //个人Id
           realname = data.user.realname;   //个人名字
           orgId = data.org.orgId;   //组织Id
           orgName = data.org.orgName;   //组织名字
       }
   });
}

// 添加图片
$(".addImg").on("change", "input", function(e){
    var tmpCover = '<div class="headlineRelease_cover_img" style="background-image:url(#url#)"></div>',
    $uploaderCover = $(this).prev();

    // 添加图片
    getCoverImg($uploaderCover , tmpCover , e);

    // 如果添加的不是封面图，则允许添加多张图片
    var inputName = $(this).attr('name');
    var parentBox = $(this).parent();
    if (inputName != "cover") {
        var tmpInput = '<div class="weui-uploader__input-box headlineRelease_img"><div class="weui-uploader__files preview_img"></div><input class="weui-uploader__input uploaderInput" type="file" accept="image/*" multiple name="'+ inputName +'" /><div><img src="img/headline_img.png" alt=""><p>添加图片</p></div></div>';
        parentBox.after(tmpInput);
    }

    // 点击图片显示、删除预览图
    var $gallery = $("#gallery"), 
    $galleryImg = $("#galleryImg"), 
    $galleryDel = $("#galleryDel");

    $uploaderCover.on("click", ".headlineRelease_cover_img", function(){
        $galleryImg.attr("style", this.getAttribute("style"));
        $gallery.fadeIn(100);
        var index1 = $(this);
        $galleryDel.off('click');
        $galleryDel.click(function() {
            index1.remove();
            $uploaderCover.css({
                width: '0',
                height: '0'
            });
            if (inputName != "cover") {
                parentBox.remove();
            }
        });
    });

    // 关闭预览图
    closeDalleryImg($gallery);
});

// 添加图片
function getCoverImg(box , content , e){
    var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
    for (var i = 0, len = files.length; i < len; ++i) {
        var file = files[i];

        if (url) {
            src = url.createObjectURL(file);
        } else {
            src = e.target.result;
        }

        box.append($(content.replace('#url#', src)));
        box.css({
            width: '100%',
            height: '100%'
        });
    }
}

// 点击关闭预览图
function closeDalleryImg(event){
    event.on("click", function(){
        event.fadeOut(100);
    });
}

   


// 选择发布者
$("#publish").on("click", function(){
    var $Actionsheet = $('#Actionsheet');
    showAction($Actionsheet);
    // 点击 列表项 就返回编辑页
    $(".end_menu").on('click', function() {
        var publishUser = $("input[name=publishUser]");
        var publishType = $("input[name=publishType]");

        var content = $(this).find('.black').text();
        if (content == "个人发布") {
            publishUser.prev().text(realname);
            publishUser.val(userId);
            publishType.val(0);
        }else if(content == "我的组织发布"){
            publishUser.prev().text(orgName);
            publishUser.val(orgId);
            publishType.val(1);
        }

        hideAction($Actionsheet);
    });
        
});


//选择参与人
$("#join").on("click", function(){
    var orgId = "0";
    participant(orgId);
});


function participant(orgId){ 
    var $ActionJoin = $('#ActionJoin');
    showAction($ActionJoin);
    $.ajax({
        url:API+'ORG/queryORG/'+orgId,
        type:'GET',
        dataType:'json',
        success:function(data){
            //console.log(data.org[0].parentId);
             $(".Pback").empty();
            currPid=orgId;
            if(orgId != "0"){
                $(".Pback").append('<div class="return pl-15" onclick = "participant(\''+data.grandpaId+'\')" ><div class=""  id="back">上一级</div></div>');
            }
                 $(".menu_leader").empty();
            $(data.leader).each(function(index,l){
                  $(".menu_leader").append('<label class="weui-cell weui-check__label" for="x11" id="shi"><div class="checkbox"><input type="checkbox" name="checkbox" id="x11" value="'
                         +l.username+'"></div><div class="weui-cell__hd"><img src="/image/avatarFiles/'
         				 +l.avatar+'" alt="" onerror="nofindHead();"></div> <div class="weui-cell__bd"><p class="black">'
                         +l.realname+'</p></div><div class="weui-cell__ft role">'
                         +l.roleList[0].roleName+'</div></label>');  
                  var status=checkStatus(l.username);//获取当前节点的选中状态
                  var pStatus=getPStatus(l.username);//获取上级节点的选中状态
                  var node={};
	           	  node.id=l.username;	
	           	  node.pid=currPid;
	           	  node.type=1;
                  if(pStatus==1){
            		  $(".menu_leader>label").eq(index).children().eq(0).toggleClass('all');
            		  node.status=1;
                  }else{
	            	  if(status==1){
	            		  $(".menu_leader>label").eq(index).children().eq(0).toggleClass('all');
	            	  }
  		           	  node.status=0;
            	  };
            	  addNode(node);
            });
             $(".menu_leader").append('<div style="width :100%;height: 10px;background-color: #efeff4;"></div>');
                 $(".menu_org").empty();
            $(data.org).each(function(index,o){
                    $(".menu_org").append('<label class="weui-cell weui-cell_access weui-check__label"  ><div class="checkbox"><input type="checkbox"  name="checkbox" class = "qs"  id="x21" value="'
                            +o.orgId+'"></div><div class="weui-cell__hd"><img src="img/join_02.png" alt=""></div><div class="weui-cell__bd" onclick = " participant(\''+o.orgId+'\',this)" ><p class="black">'
                            +o.orgName+'  (共'+o.userNum+'人)</p></div><div class="weui-cell__ft"></div></label>');
                    var status=checkStatus(o.orgId);//获取当前节点的选中状态
                    var pStatus=getPStatus(o.orgId);//获取上级节点的选中状态
                    var node={};
            		node.id=o.orgId;	
            		node.pid=currPid;
            		node.type=2;
            		node.userNum=o.userNum;
                    if(pStatus==1){
              		  $(".menu_org>label").eq(index).children().eq(0).toggleClass('all');
              		  	node.status=1;
	              	}else{
	              		if(status==1){
	                 		  $(".menu_org>label").eq(index).children().eq(0).toggleClass('all');
	                 	}else if(status==2){
	                 		  $(".menu_org>label").eq(index).children().eq(0).toggleClass('part');
	                 	}else{
	                 		node.status=0;
	   	            	};
	              	};
	            	addNode(node);
            }); 
             $(".menu_org").append('<div style="width :100%;height: 10px;background-color: #efeff4;"></div>');
                 $(".menu_employee").empty();
            $(data.employeeList).each(function(index,e){
                     $(".menu_employee").append('<label class="weui-cell weui-check__label" for="x31"><div class="checkbox"><input type="checkbox" name="checkbox" id="x31" value="'
                            +e.username+'"></div><div class="weui-cell__hd"><img src="/image/avatarFiles/'
            				+e.avatar+'" alt="" onerror="nofindHead();"></div><div class="weui-cell__bd"><p class="black">'
                            +e.realname+'</p></div><div class="weui-cell__ft role">'
                            +e.roleList[0].roleName+'</div></label>');
                   var status=checkStatus(e.username);//获取当前节点的选中状态
                   var pStatus=getPStatus(e.username);//获取上级节点的选中状态
                   var node={};
	           	   node.id=e.username;	
	           	   node.pid=currPid;
	           	   node.type=1;
                   if(pStatus==1){
           		      $(".menu_employee>label").eq(index).children().eq(0).toggleClass('all');
		           	  node.status=1;
                   }else{
   	            	  if(status==1){
   	            		  $(".menu_employee>label").eq(index).children().eq(0).toggleClass('all');
   	            	  }
	  		          node.status=0;
               	   };
               	 addNode(node);
            });
            console.log('treeData.length:'+treeData.length);
        	console.log('currPid:'+currPid);
        }
    }); 
}
   /**
     * 根据当前对象id与缓存中选中的对象比对
     */
    function checkStatus(currId){
    	for (var i = 0; i < treeData.length; i++) {
    		var node=treeData[i];
    		if(node.id==currId){
    			return node.status;  //如果缓存对象中以选中，则返回缓存的状态（1：全选；2部分选中）
    		}
    	}
    	return 0;  //如过没有缓存结果则返回0，表示未选中
    }
    
   /**
     * 获取上级组织的选中状态
     */
    function getPStatus(currId){
    	var pnode=getPnode(currId);
    	if(pnode){
	    	for (var i = 0; i < treeData.length; i++) {
	    		var node=treeData[i];
	    		if(node.id==pnode.id){
	    			return node.status;  //如果缓存对象中已选中，则返回缓存的状态（1：全选；2部分选中）
	    		}
	    	}
    	}
    	return pnode;  //如过没有缓存结果则返回0，表示未选中
    }
    
    /**
     * 勾选对象的操作
     * 勾选对象时根据当前orgId来循环更改所有上级组织的勾选状态
     */
    function checkPnode(orgId,num){
    	//首先勾选当前对象
    	for (var i = 0; i < treeData.length; i++) {
    		var node=treeData[i];
    		if(node.id==orgId){
    			if(num==0){
    				node.status=1;
    			}
    		}
    	}
    	var pnode=getPnode(orgId);//获取上级对象
    	if(pnode){
	    	//根据pid获取所有同级对象
	    	var currArray=new Array();
	    	for (var i = 0; i < treeData.length; i++) {
	    		var node=treeData[i];
	    		if(node.pid==pnode.id){
	    			currArray.push(node);  //如果是同级对象，则添加到同级对象集合
	    		}
	    	}
	    	//根据同级对象的勾选状态来更新上级对象的状态
	    	var checkStatus=1;
	    	for (var i = 0; i < currArray.length; i++) {
	    		var node=currArray[i];
	    		var status=node.status;
	    		if(status==0||status==2){
	    			checkStatus=2;
	    		}
	    	}
	    	pnode.status=checkStatus;//将修改后的对象更新到缓存集合里面
	    	num++;
	    	//如果不是根组织，则继续更新上一级组织选中状态
	    	if(pnode.pid!=0){
	    		checkPnode(pnode.id,num);
	    	}
    	}
    }
    
    /**
     * 将node添加到缓存集合中
     */
    function addNode(newNode){
    	var flag=0;
    	for (var i = 0; i < treeData.length; i++) {
    		var node=treeData[i];
    		if(node.id==newNode.id){
    			flag=1;
    		}
    	}
    	if(flag==0){
    		treeData.push(newNode);
    	}
    }
    
   /**
     * 根据当前对象id将对应node从treeData中移除
     */
    function delNode(currId){
    	for (var i = 0; i < treeData.length; i++) {
    		var node=treeData[i];
    		if(node.id==currId){
    			treeData.splice(i, 1);//移除node
    		}
    	}
    }
    
    /**
     * 取消勾选对象的操作
     * 取消勾选对象时根据当前orgId来循环更改所有上级组织的勾选状态
     */
    function cancelPnode(orgId,num){
    	//首先取消勾选当前对象
    	for (var i = 0; i < treeData.length; i++) {
    		var node=treeData[i];
    		if(node.id==orgId){
    			if(num==0){
    				node.status=0;
    			}
    		}
    	}
    	var pnode=getPnode(orgId);//获取上级对象
    	if(pnode){
	    	//根据pid获取所有同级对象
	    	var currArray=new Array();
	    	for (var i = 0; i < treeData.length; i++) {
	    		var node=treeData[i];
	    		if(node.pid==pnode.id){
	    			currArray.push(node);  //如果是同级对象，则添加到同级对象集合
	    		}
	    	}
	    	//根据同级对象的勾选状态来更新上级对象的状态
	    	var checkStatus=2;
	    	var num0=0; //同级对象状态为0的数量
	    	var num1=0; //同级对象状态为1的数量
	    	for (var i = 0; i < currArray.length; i++) {
	    		var node=currArray[i];
	    		var status=node.status;
	    		if(status==0){
	    			num0++;
	    		}else if(status==1){
	    			num1++;
	    		}
	    	}
	    	if(num0==currArray.length){
	    		checkStatus=0;
	    	}else if(num1==currArray.length){
	    		checkStatus=1;
	    	}else{
	    		checkStatus=2;
	    	}
	    	pnode.status=checkStatus;//将修改后的对象更新到缓存集合里面
	    	//如果不是根组织，则继续更新上一级组织选中状态
	    	num++;
	    	if(pnode.pid!=0){
	    		cancelPnode(pnode.id,num);
	    	}
    	}
    }
    
    //修改缓存中下级对象的状态
    function updateCnode(orgId,status){
    	for (var i = 0; i < treeData.length; i++) {
    		var node=treeData[i];
    		if(node.pid==orgId){
    			node.status=status;
    		}
    	}
    }
    
    //从缓存的treeData中根据id获取pnode
    function getPnode(currId){
    	for (var i = 0; i < treeData.length; i++) {
    		var node=treeData[i];
    		if(node.id==currId){
    			var pid=node.pid;
    			if(pid==0){
    				return null;
    			}
    			for (var i = 0; i < treeData.length; i++) {
    				var pnode=treeData[i];
    				if(pnode.id==pid){
    					return pnode;
    				}
    			}
    		}
    	}
    	for (var i = 0; i < treeData.length; i++) {
			var pnode=treeData[i];
			if(pnode.id==currPid){
				return pnode;
			}
		}
    }
   

 
    // 点击 取消 返回编辑页面
    $("#cancel").on('click',function() {
        hideAction($ActionJoin);
    });

    // 点击 确定 返回编辑页面 并传参
    $("#sure").on('click',function() {
        hideAction($ActionJoin);
        userNum=0;
        for (var i = 0; i < treeData.length; i++) {
        	var node=treeData[i];
        	var pnode=getPnode(node.id);
        	if(pnode){//如果存在上级组织
	        	var pStatus=pnode.status;
	        	if(pStatus!=1){//上级组织未选中时将人数累加
		        	if(node.status==1){
		        		if(node.type==1){
		        			userNum++;	
		        		}else if(node.type==2){
		        			userNum+=node.userNum;
		        		}
		        	}
	        	}
        	}else{//如果是根组织则累加人数
        		if(node.status==1){//上级组织未选中时将人数累加
        			userNum+=node.userNum;
        		}
        	}
        }
       $('#userNum').html(userNum+'人');
    });



// 点击 领导和员工 选中复选框
    $(".menu_leader , .menu_employee").on('click', 'label', function() {
    	var status= $(this).children().eq(0);
    	var userId=$(this).children().children('input').attr('value');
    	if(status.hasClass('all')){
    		 $(this).children().eq(0).removeClass('all');
    		 cancelPnode(userId,0);  // 更新上级组织状态
    	}else{
    		$(this).children().eq(0).toggleClass('all');
    		checkPnode(userId,0);     // 更新上级组织状态
    	}
        return false;
    });
 // 点击 组织复选框 选中
    $(".menu_org").on('click', 'label', function(event) {
        var orgDiv = $(this).parent().parent();
        var divWidth = orgDiv.width();
        var checkboxMaxWidth = parseInt(divWidth * 0.1);
        if(event.clientX <= checkboxMaxWidth){
            //alert('点击checkbox');
//            $(this).removeClass('part');
//            $(this).toggleClass('all');
            var status = $(this).children().eq(0);
            var orgId=$(this).children().children('input').attr('value');
            if(status.hasClass('all')){
	       		 $(this).children().eq(0).removeClass('all');
	       		 cancelPnode(orgId,0);  // 更新上级组织状态
	       		 updateCnode(orgId,0);  // 将缓存中的下级组织状态置为0
	       	}else{
	       		 $(this).children().eq(0).removeClass('part');
	       		 $(this).children().eq(0).toggleClass('all');
	       		 checkPnode(orgId,0);     // 更新上级组织状态
	       		 updateCnode(orgId,1);     // 将缓存中的下级组织状态置为1
	       	}
        }else{
            //alert('点偏了');
        }
        return false;
    });

// 弹出弹窗
function showAction(menu) {
    menu.addClass('weui-actionsheet_toggle');
}
// 关闭弹窗返回编辑页面
function hideAction(menu) {
    menu.removeClass('weui-actionsheet_toggle');
}


// 选择上传类型
uploadType();

function uploadType() {
    var $ActionType = $('#ActionType');
    var $MaskType = $('#MaskType');
    // 弹出选框
    $("#upload_type").on("click", function () {
        $ActionType.addClass('weui-actionsheet_toggle');
        $MaskType.fadeIn(200);
    });

    // 选中上传类型
    $(".type_menu").on('click', 'p', function () {
        hideActionSheet();
        var lessonsType = $("input[name=lessonsType]");
        var value = $(this).text();
        lessonsType.prev().text(value);
        var $arrow = $("#upload_type").children('.weui-cell__ft');
        if (value == "图片") {
            lessonsType.val("1");
            $next = $("#chooseImg");
            menu($arrow,$next);
        }else if(value == "视频"){
            lessonsType.val("0");
            $next = $("#chooseVideo");
            menu($arrow,$next);
        }
    });

    // 点击遮罩层或取消按钮关闭弹窗
    $MaskType.on('click', hideActionSheet);
    $('#ActionTypeCancel').on('click', function(){
        hideActionSheet();
    });

    // 关闭遮罩层
    function hideActionSheet() {
        $ActionType.removeClass('weui-actionsheet_toggle');
        $MaskType.fadeOut(200);
    }

}

//上传类型 二级菜单 点击展开
function menu(arrow,next){
	$("#chooseVideo , #chooseImg").hide();
	arrow.addClass('downArrow');
	next.slideToggle();
}

            
// 提交表单数据
submitForm();

var lessonsId="";

function submitForm(){
    $('button[type=submit]').click(function() { 
        var button = $(this).text();

        if (button == "保存") {
            var lessonsTitle = $("input[name=lessonsTitle]").val();
            var publishUser = $("input[name=publishUser]").val();
            var users = $("#userNum").text();
            var lessonsType = $("input[name=lessonsType]").val();
            var Actionsheet= $("input[name=users]").val();
            var lessonsVideolink=$("textarea[name=lessonsVideolink]").val();
            var flag = isChinese(lessonsVideolink);

            // 先验证非空，通过即提交上传
            if (lessonsTitle == "") {
                getDialog("请输入团课标题！");
                return false; 
            }else if (publishUser == "") {
                getDialog("请选择团课发布者！");
                return false; 
            }else if (users == "" || users == "0人") {
                getDialog("请选择团课参与人！");
                return false; 
            }else if (lessonsType == "") {
                getDialog("请选择上传类型！");
                return false; 
            }else if(lessonsType == 0 && flag){
                getDialog("视频地址格式错误");
                return false; 
            }else if(lessonsType == 0 && lessonsVideolink == ""){
                getDialog("视频地址不能为空");
                return false; 
            }else {
            	loading('保存中');
                 var options = {  
                    url:API+'lessoninfo/insertLesson/'+openId, //上传文件的路径  
                    type:'post',
                    data:{'treeData':JSON.stringify(treeData)},
                    //clearForm:true, //提交成功后是否清空表单中的字段值
                    //restForm:true, //提交成功后是否重置表单中的字段值，即恢复到页面加载时的状态
                    success:function(data){ 
                    loaded();
                    console.log(data); 
                        //异步上传成功之后的操作
                    $('button[type=submit]').text("确认发布");
					$('button[type=submit]').attr('type','button');
					if(data!=null){
			            lessonsId=data.lessonsId;
                    }
				   }
                }; 
                $('#uploadForm').ajaxSubmit(options); 
                return false; 
            }  


        } else if (button == "确认发布") {
        	    loading('发布中');
				publish();
             }

    });
    
}

function publish(){
	     $.ajax({
        type: "GET",
         url:API+"lessoninfo/changeLessonStatus/"+lessonsId+"/"+openId,
        success: function(res) {
           if(res.code==1){
        	   loaded();
			   getDialog('发布成功');
        	   document.location.href = "myMeeting.html?id=3&openId="+openId; 
			}			   
        },
        error: function(err) {
           getDialog('网络异常，请稍后重试！');
            console.log(err);
        }
    });

	   
		  /*$.ajax({  
			  url:API+"lessoninfo/changeLessonStatus/"+lessonsId,
		      type:'GET',				  
			  success:function () {	  
				alert("发布成功")
                document.location.href = "myMeeting.html?id=3";				
			 },
				error:function(data){	
                	console.log(data); 			
				alert("网络异常，请稍后重试！");
				 document.location.href = "myMeeting.html?id=3";	
			 }
		});*/
         
}

