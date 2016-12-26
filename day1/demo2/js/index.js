;(function($){

	var total = 17;
	//图片的总个数
	var margin = 2;
	//margin外边距
	var piclist = $("#piclist");

	var cid = 0;


	box = function(){

		var scale = $(window).width();//浏览器宽度
		var cols = Math.floor( (scale-3*margin)/4 );

		//把图片放入ulpiclist里面
		var html = "";
		for(var i=1;i<=total;i++){
			var m = margin;
			if(i%4==1){
				m=0;
			}
			html+="<li data-id='"+i+"' style='width:"+cols+"px;height:"+cols+"px;margin-top:"+margin+"px;margin-left:"+m+"px'>";
			html+="<canvas id='cvs"+i+"'>您的浏览器不支持</canvas></li>";

			var img = new Image();
			img.id = i;
			img.onload = function(){

				var myCanvas = document.getElementById("cvs"+this.id);
			 	var cvs = myCanvas.getContext("2d");
			 	cvs.drawImage(this,0,0,cols,cols);

			}

			img.src = "img/"+i+".jpg";

		}

		piclist.html(html);

	}

	$(window).resize(box);
	
	box();

	$("#piclist").on("tap","li[data-id]",function(){

		var id = $(this).data("id");

		cid = id;

 		$("#large").show();

 		loadImage(id);

 		//1、先把图片插入进去
 		//2、插入的图片宽度、高度
 		//3、图片位置(居中)
	})

	$("#large").on("tap",function(){

		$(this).hide();

	}).on("swipeLeft",function(){

		cid++;
		if(cid>total){
			cid=total;
		}

		loadImage(cid);

	}).on("swipeRight",function(){
		cid--;
		if(cid<1){
			cid=1;
		}

		loadImage(cid);

	})


	function loadImage(id){
		//插入图片

		var largeImg = "img/"+id+".large.jpg";

		var large = new Image();
		large.onload = function(){

			var winw = $(window).width();
			var winh = $(window).height();
			var imgw= this.width;
			var imgh = this.height;
			var endW =  parseInt(winh*(imgw/imgh) );
			var endH =  parseInt(winw*(imgh/imgw) ); //横图设置高


			//1、如果是宽图,  图片的宽度=浏览器的宽度
							  //高度   320*(图片高度/图片宽度)			  
			if(imgw>imgh){
				//横图
				$("#largeImg").css({
					"width":winw,
					"height":endH,
					"marginTop":(winh-endH)/2
				})
				
			}else{
				$("#largeImg").css({
					"width":endW,
					"height":winh,
					"marginLeft":(winw-endW)/2
				})
			}


			$("#largeImg").attr("src",this.src);


		}
		large.src = largeImg;

	}

})(Zepto);


//cancvs 宽高  ===>li宽高(cols)