(function(w){
	
	w.gesture = function (node,callback){
			// gesturestart 是否执行
			var flag = false;
			//角度1
			var startD = 0;
			//线段1
			var startC = 0
			
			//gesturestart  手指触碰当前元素，屏幕上有两个或者两个以上的手指
			node.addEventListener('touchstart',function(event){
				var touch = event.touches;								
				if(touch.length >= 2){					
					//真正 gesturestart
					
					//角度1
					startD = getD(touch[0],touch[1]);
					//线段1
					startC = getC(touch[0],touch[1]);
										
					flag = true;
					
					if(callback && typeof callback['start'] === 'function'){
						callback['start']();
					};
				};
			});
			
			//gesturechange  手指触碰当前元素，屏幕上有两个或者两个以上的手指位置在发生移动
			node.addEventListener('touchmove',function(event){
				var touch = event.touches;
				if(touch.length >= 2){
					//真正 gesturechange
					
					//角度2
					var nowD = getD(touch[0],touch[1]);					
					//旋转角度
					event.rotation = nowD - startD;
					//线段2
					var nowC = getC(touch[0],touch[1]);					
					//比例
					event.scale = nowC/startC;
					
					
					if(callback && typeof callback['change'] === 'function'){
						callback['change'](event);
					};
				};
			});
			
			//gestureend  在gesturestart后, 屏幕上只剩下两根以下（不包括两根）的手指
			node.addEventListener('touchend',function(event){
				var touch = event.touches;
				
				if(flag){
					if(touch.length < 2){
						//真正 gestureend						
						if(callback && typeof callback['end'] === 'function'){
							callback['end']();
						};
					};
				};
				
				//重置
				flag = false;
			});
			
			
		};
		
		//求角度
	w.getD = function (p1,p2){
			var x = p1.clientX - p2.clientX;
			var y = p1.clientY - p2.clientY;
			
			var deg = Math.atan2(y,x); //弧度
			//角度
			deg = deg*180/Math.PI;
			
			return deg;
		};
		
		//求线段的长度
	w.getC = function (p1,p2){
			var a = p1.clientX - p2.clientX;
			var b = p1.clientY - p2.clientY;
			
			//Math.sqrt() 开根号
			var c = Math.sqrt(a*a + b*b);
			
			return c;
		};
		
	
})(window);
