(function(win){
	
	win.transformCss = function (node,name,value){
			//保存 名值对  --- 对象
//			var obj = {};			
			if(!node.abc){
				node.abc = {};
//				console.log(node.abc)
			};
			
			//写入
			if(arguments.length > 2){
				//把 属性名 ，属性值 放在 对象中
				node.abc[name] = value;	 //{translateX: 200, scale: 0.5}			
//				console.log(node.abc)
				
				//保存最终的结果
				var result = '';
				//枚举对象上的属性
				for (var i in node.abc) {
					switch (i){
						case 'translateX':
						case 'translateY':
						case 'translateZ':
						case 'translate':
							result += i +'('+ node.abc[i] +'px) ';
								//translateX(200px)
							break;
						case 'scaleX':
						case 'scaleY':
						case 'scaleZ':
						case 'scale':
							result += i +'('+ node.abc[i] +') ';
								//scale(0.5)
							break;	
						case 'rotate':
						case 'rotateX':
						case 'rotateY':
						case 'rotateZ':
						case 'skew':
						case 'skewX':
						case 'skewY':
							result += i +'('+ node.abc[i] +'deg) ';
								//rotate(90deg)
							break;
					}
				}
				
				node.style.transform = result;
				
			}else{
				//读取
				if(node.abc[name] == undefined){
					//不正常 ： 直接读取
					if(name == 'scale' || name=='scaleX'|| name=='scaleY'|| name=='scaleZ'){
						value = 1
					}else{
						//rotate,translate,skew
						value = 0
					};
					
				}else{
					//正常   ：  写 -- 读
					value = node.abc[name];
				}
				
				return value;
			}
			
			
			
			
		};	

	
})(window);

		