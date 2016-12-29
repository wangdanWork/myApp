function drawChart(options){
	var cvs=document.getElementById(options.canvas);
	var cxt=cvs.getContext("2d");
	var pDing=50;
	//画布的宽高
	var cvsW=cvs.width,cvsH=cvs.height;
	//计算轴线的间距
	var stepY=(cvsW-2*pDing)/(options.x.length-1);
	var stepX=(cvsH-2*pDing)/(options.y.length-1);
	var scale=stepX/50;//比例
	var bot=cvsH-pDing;
	//数组倒序排列
	options.y=options.y.reverse();
	cxt.beginPath();
	cxt.fillText("万元/平方米",60,30);
	//画y轴线
	for(var i=0;i<options.x.length;i++){
		cxt.beginPath();
		cxt.moveTo(pDing+stepY*i,pDing);
		cxt.lineTo(pDing+stepY*i,cvsH-pDing);
		cxt.stroke();
		//写水平的文字
		cxt.fillText(options.x[i],pDing+stepY*i-10,cvsH-pDing+20);
	}
	
	//画x轴线
	for(var i=0;i<options.y.length;i++){
		cxt.beginPath();
		cxt.moveTo(pDing,pDing+stepX*i);
		cxt.lineTo(cvsW-pDing,pDing+stepX*i);
		cxt.stroke();
		//写水平的文字
		cxt.fillText(options.y[i],pDing-27,pDing+stepX*i+7);
	}

	//画折线
	for(var j=0;j<options.data.length;j++){
		for(var i=0;i<options.data[j].datas.length;i++){
			cxt.beginPath();
			cxt.strokeStyle=options.data[j].col;
			cxt.moveTo(pDing+i*stepY,bot-options.data[j].datas[i]*scale);
			cxt.lineTo(pDing+(i+1)*stepY,bot-options.data[j].datas[i+1]*scale);
			cxt.stroke();
			//画圈
			cxt.beginPath();
			cxt.arc(pDing+i*stepY,bot-options.data[j].datas[i]*scale,6,0,2*Math.PI,true);
			cxt.fillStyle="#fff";
			cxt.fill();
			cxt.stroke();
		}
	}
}