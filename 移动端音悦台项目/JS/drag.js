(function(win){
	
	win.DragContent = function(navWrap,callback){
			
		//基本拖动 ， 橡皮筋拖 ， 加速（快速滑屏），橡皮筋回弹，即点即停，防抖动

		var navList = navWrap.children[0];
		//children : 剔除文本节点之外的子元素
		
		transformCss(navList,'translateZ',0.01)
		
		//元素初始位置 + 手指距离差 = 元素最终位置
		//定义元素初始位置
		var eleY = 0;
		//定义手指初始位置
		var startY = 0;
		
		//加速
		var s1 = 0;
		var t1 = 0;
		var s2 = 0;
		var t2 = 0;
		var disValue = 0;
		var disTime = 1; //非0数字
		
		//tween算法
		var Tween = {
			//中间过程 ： 匀速
			Linear: function(t,b,c,d){ return c*t/d + b; },
			//两边过程 ： 回弹
			easeOut: function(t,b,c,d,s){
	            if (s == undefined) s = 1.70158;
	            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	        }
		};
		
		var timer = null;
		
		//防抖动
		var startX = 0;
		var isFirst = true;
		var isY = true;
		
		navWrap.addEventListener('touchstart',function(event){
			var touch = event.changedTouches[0];
			
			//即点即停
			clearInterval(timer);
			
			//清除过渡
			navList.style.transition = 'none';
			
			//元素初始位置
			eleY = transformCss(navList,'translateY');
			//手指初始位置
			startY = touch.clientY;
			startX = touch.clientX;
			
			//加速元素初始位置 与 初始时间
			s1 = eleY;
			t1 = new Date().getTime(); // 毫秒
			
			//清除上一次 disValue 
			disValue = 0;
			
			if(callback && typeof callback['start'] === 'function'){
				callback['start']();
			};
			
			//重置：防抖动
			isFirst = true;
			isY = true;
		});
		navWrap.addEventListener('touchmove',function(event){
			var touch = event.changedTouches[0];
			
			//非第一次
			if(!isY){
				return;
			};
			
			//手指结束位置
			var endY = touch.clientY;
			var endX = touch.clientX;
			//手指距离差
			var disY = endY - startY;
			var disX = endX - startX;
			
			//限定范围（橡皮筋拖 --- 越来越难拉）
			var translateY = disY+eleY;
			
			if(translateY > 0){
				//比例 = 1 - 左边区域的留白/屏幕宽度 
				var scale = 0.6 - translateY/(document.documentElement.clientHeight*3);
				//新的 translateY = 临界值 + 新的左边区域的留白
				translateY = 0 + translateY * scale;
				
			}else if(translateY < document.documentElement.clientHeight-navList.offsetHeight){
				//比例 = 1 - 右边区域的留白/屏幕宽度 
				//右边区域的留白  = translateY - 临界值      （正值）
				var over = Math.abs(translateY)-Math.abs(document.documentElement.clientHeight-navList.offsetHeight)
				var scale = 0.6 - over/(document.documentElement.clientHeight*3);
				//新的 translateY = 临界值 + 新的over			
				translateY = document.documentElement.clientHeight-navList.offsetHeight - over * scale;
			};
			
			//防抖动
			if(isFirst){
				isFirst = false;
				if(Math.abs(disX) > Math.abs(disY)){
					//禁止垂直 y 方向的逻辑
					isY = false;
					return;
				};
			}
			
			
			//确定元素最终位置
			transformCss(navList,'translateY',translateY);
			
			
			//加速 元素结束位置 与 结束时间
			s2 = translateY;
			t2 = new Date().getTime();
			//距离差
			disValue = s2 - s1;
			//时间差
			disTime = t2 - t1;
			
			if(callback && typeof callback['move'] === 'function'){
				callback['move']();
			};
			
		});
		navWrap.addEventListener('touchend',function(){
			// 速度 = 距离差 / 时间差
			var speed = disValue/disTime;
						
//			console.log('speed = '+ speed)	
//			console.log('translateY = '+ transformCss(navList,'translateY'))
			//元素最终位置 （加速） = touchmove 产生是位移值 + speed 产生的距离
			var target = transformCss(navList,'translateY') + speed*100;
//			console.log('target = '+ target)
			
			
			//回弹
			var type = 'Linear';
			if(target > 0){
				target = 0
				type = 'easeOut';
			}else if(target < document.documentElement.clientHeight - navList.offsetHeight){
				target = document.documentElement.clientHeight - navList.offsetHeight;
				type = 'easeOut';
			};
			
			//加速的时间(总时间)
			var time = 1;
			//模拟过渡中的匀速（加速） ，回弹 
			move(target,time,type);
			
		
		
		});
		function move(target,time,type){
			//t : 当前次数(从1开始)
			var t = 0;
			//b : 元素起始位置
			var b = transformCss(navList,'translateY');
//			console.log('b = '+ b)
			//c : 结束位置与起始位置距离差
			var c = target - b;
//			console.log('c = '+ c)
			//d : 总次数 = 总时间/每一步的时间
			var d = time/0.02;
			
			//清除定时器 (防止重复开启定时器)
			clearInterval(timer);
			timer = setInterval(function(){
				t++;
				
				if(t > d){
					//元素停下来 ，清除定时器
					clearInterval(timer);
					
					if(callback && typeof callback['end'] === 'function'){
						callback['end']();
					};
					
				}else{
					//加速移动
					var point = Tween[type](t,b,c,d);
//					console.log(point)
					//元素移动
					transformCss(navList,'translateY',point)
					
					if(callback && typeof callback['move'] === 'function'){
						callback['move']();
					};
				};
				
			},20);
			
			
		};
		
	};
		
	
})(window);
