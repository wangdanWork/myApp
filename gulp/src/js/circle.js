function createCircle(options){
	var cvs=document.getElementById(options.canvas);
	var cxt=cvs.getContext("2d");
	var total=0,startAngle=0,endAngle=0;
	//数据的总和
	for(var i=0;i<options.data.length;i++){
		total+=options.data[i];
	}
	//绘制饼图
	for(var i=0;i<options.data.length;i++){
		endAngle=options.data[i]/total*2*Math.PI+startAngle;//度数
		//绘制扇形
		cxt.beginPath();
		cxt.fillStyle=options.col[i];
		cxt.moveTo(200,200);
		//弧线
		cxt.arc(200,200,150,startAngle,endAngle,false);
		cxt.closePath();
		cxt.fill();
		startAngle=endAngle;
		//画图例：矩形
		cxt.fillRect(400,150+i*30,30,15);
		cxt.fillText(options.txt[i],440,160+i*30);
	}
}