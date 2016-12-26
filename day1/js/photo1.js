;(function($){
	init();
	//初始化函数
	function init(){
		render();
		addEvent();
	}
	//渲染图片
	function render(){
		var total=17,//图片的数量
		imgHTML="",//拼接字符串
		winW=$(window).width(),
		mRight=5,
		imgW=Math.floor((winW-3*mRight)/4);//计算图片的宽度=（窗口宽-3*间距）/4
	
		//根据图片的数量来渲染小图
		for(var i=1;i<=total;i++){
			var m=mRight;//m=5最后一列图片没有间距
			if(i%4==0) m=0;
			imgHTML+='<li class="animated zoomIn" style="background:red;width:'+imgW+'px;height:'+imgW+'px;margin-right:'+m+'px;margin-bottom:'+mRight+'px;"><canvas width="'+imgW+'" heigth="'+imgW+'" id="cvs'+i+'">can not canvas</canvas></li>';
			//往页面中渲染图片
			var imgObject=new Image();
			imgObject.index=i;//自定义属性1--15
			imgObject.onload=function(){//图片加载成功执行
				//console.log(this.width)
				//将图片绘制到canvas中
				var cvs=$("#cvs"+this.index),//得到所有的cvs
					cxt=cvs[0].getContext("2d");//getContext基于原生的对象，转成原生
					//cxt.drawImage(this,0,0,imgW,imgW);
					cxt.drawImage(this,0,0,this.width,this.height);
			}
			imgObject.src="img/"+i+".jpg";//设置图片对象的路径
		}
		$("#small").html(imgHTML);
	}
	
	//绑定事件
	function addEvent(){
		var curImgIndex=0;//当前图片的索引
		var len=$("#small>li").size();
		$("#small").on("tap","li",function(){
			curImgIndex=$(this).index();
			loadLargeImg($(this).index());//载入大图
		})
		//给大盒子绑定事件
		$("#large").on("tap",function(){
			$(this).hide();
		}).on("swipeLeft",function(){//下一张
			curImgIndex++;
			if(curImgIndex>=len) curImgIndex=len-1;
			loadLargeImg(curImgIndex,function(){
				$("#largeImg")
						.addClass("animated bounceInRight")
						.on("webkitAnimationEnd",function(){
							$(this).removeClass().off("webkitAnimationEnd");
						})
			});
		}).on("swipeRight",function(){//前一张
			curImgIndex--;
			if(curImgIndex<0) curImgIndex=0;
			loadLargeImg(curImgIndex,function(){
				$("#largeImg")
					.addClass("animated bounceInRight")
					.on("webkitAnimationEnd",function(){
						$(this).removeClass().off("webkitAnimationEnd");
					})
			});
		})
	}
	//载入大图
	function loadLargeImg(i,callback){
		var imgNum=i+1;
		$("#large").show();//显示大图
		//设置大图的路径src
		$("#largeImg").attr("src","img/"+imgNum+".large.jpg");
		//根据纵向和横向图片来设置不同的尺寸及位置
		var bigImg=new Image();
		bigImg.onload=function(){
			var scaleH=$(window).width()/this.width,
				h=this.height*scaleH;
				//console.log(h)
			if(this.width>this.height){//横图
				$("#largeImg").css({
					"width":"100%",
					"height":"auto",
					"margin-top":($(window).height()-h)/2+"px",
					"margin-left":0
				})
			}else{//竖图
				var scaleW=$(window).height()/this.height,
					w=this.width*scaleW;
				$("#largeImg").css({
					"height":"100%",
					"width":"auto",
					"margin-left":($(window).width()-w)/2+"px",
					"margin-top":0
				})
			}
		}
		bigImg.src="img/"+imgNum+".large.jpg";
		//大图先显示出来再加效果，否则没加完动效就完事了
		callback && callback();

	}
})(Zepto)