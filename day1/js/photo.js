;(function($){
	var total=17,//图片的数量
		imgHTML="",//拼接字符串
		winW=$(window).width(),
		mRight=5,
		imgW=Math.floor((winW-3*mRight)/4);//计算图片的宽度=（窗口宽-3*间距）/4
	
	//根据图片的数量来渲染小图
	for(var i=1;i<=total;i++){
		var m=mRight;//m=5最后一列图片没有间距
		if(i%4==0) m=0;
		imgHTML+='<li style="background:red;width:'+imgW+'px;height:'+imgW+'px;margin-right:'+m+'px;margin-bottom:'+mRight+'px;"><canvas width="'+imgW+'" heigth="'+imgW+'" id="cvs'+i+'">can not canvas</canvas></li>';
		//往页面中渲染图片
		var imgObject=new Image();
		imgObject.index=i;//自定义属性1--15
		imgObject.onload=function(){//图片加载成功执行
			console.log(this.width)
			//将图片绘制到canvas中
			var cvs=$("#cvs"+this.index),//得到所有的cvs
				cxt=cvs[0].getContext("2d");//getContext基于原生的对象，转成原生
				cxt.drawImage(this,0,0,this.width,this.height);
		}
		imgObject.src="img/"+i+".jpg";//设置图片对象的路径
	}
	$("#small").html(imgHTML);
	//点击小图显示大图
	$("#small").on("tap","li",function(){
		var imgInd=$(this).index()+1;
		$("#large").show();//显示大图
		//设置大图的路径src
		$("#largeImg").attr("src","img/"+imgInd+".large.jpg");
	})
})(Zepto)