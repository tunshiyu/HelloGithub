(function(w){
	w.$={};
//	callBack将内部组件的move状态暴露了外部的业务逻辑
	w.$.drag=function(testNode,callBack){
		//1.确定元素一开始的位置
		var elementPoint ={x:0,y:0};
		//鼠标一开始的位置
		var startPoint={x:0,y:0};
		testNode.onmousedown=function(ev){
			ev = ev||event;
			//  参照于offsetParent
			elementPoint.x=this.offsetLeft;
			elementPoint.y=this.offsetTop;
			
			//	参照于视口
			startPoint.x=ev.clientX;
			startPoint.y=ev.clientY;
			
			if(testNode.setCapture){
				testNode.setCapture();
			}
			
			document.onmousemove=function(ev){
				ev = ev||event;
				
				//  参照于视口
				var nowPoint = {x:0,y:0};
				nowPoint.x=ev.clientX;
				nowPoint.y=ev.clientY; 
				
				var L =elementPoint.x + nowPoint.x - startPoint.x;
				var T =elementPoint.y + nowPoint.y - startPoint.y;
				
				if(L<0){
					L=0;
				}else if(L > testNode.offsetParent.offsetWidth -testNode.clientWidth ){
					L =  testNode.offsetParent.offsetWidth -testNode.clientWidth;
				}
				
				// 参照于offsetParent
				testNode.style.left = L+"px";
				
				
				if(callBack&&typeof callBack["move"] ==="function"){
					callBack["move"]();
				}
			}
			
			document.onmouseup=function(){
				document.onmousemove = document.onmouseup =null;
				if(document.releaseCapture){
					document.releaseCapture();
				}
			}
			
			return false;
		}
	}
})(window);




