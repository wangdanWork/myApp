;(function($){
	var len=$("#list").children("li").length;
	var w=$("#list li").eq(0).width();
	var index=0;
	//$("#list").width(w*len);

	$("#list").swipeLeft(function(){
		index++;
		//console.log(index);
		if(index>=len){
			index=len-1;
		}
		$("#list>li").eq(index).css({transform:"translate(-"+w*index+"px,0)"});
	})

	$("#list").swipeRight(function(){
		index--;
		if(index<=0){
			index=0;			
		}
		$("#list>li").eq(index+1).css({transform:"translate(-"+w*index+"px,0)"});
		console.log(index);
	})


})(Zepto)