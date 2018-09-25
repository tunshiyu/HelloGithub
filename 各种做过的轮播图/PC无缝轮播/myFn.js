/*
 1.通过id名称获取元素对象       $eleByID(id)
 2兼容性封装设置元素内容         setTextContent(obj, txt)
 3兼容性封装读取元素内容     getTextContent(obj)
 4兼容读取样式方法      getStyle(obj, styleName)  
 5封装动画函数         animate(obj, target)
 6 class操作函数     addClass(menuBtn, 'active') ;
 7. 读取或写入translate rotate scale属性    transformCss(navList, 'translateX');
 8.拖拽函数       $.drag(smallWhite[1], callback2);              第一个为拖拽对象，第二个拖拽时触发的函数
 9.时间格式           changeTime(time)                         将秒形式的时间转化为   12:05：00 的形式
 10.全屏  onclickFull(full);                                full为全屏按钮，并且需要给full设置一个active类，点击之后设置再点击清除
 11 canvas 圆角矩形   drawRoundedRect(context, strokeStyle,fillStyle,cornerX,cornerY,width,height,cornerRadius)
 12随机返回16进制颜色 getRandomColor()
 13.移动端准备工作 Phoneprepare()
 */

/**
 * 1通过id名称获取元素对象
 * @param {id名称} id
 */
function $eleByID(id) {
	return document.getElementById(id);
}

/**
 * 2兼容性封装设置元素内容
 * @param {元素对象} obj
 * @param {文本内容} txt
 */
function setTextContent(obj, txt) {
	if(obj.textContent) {
		obj.textContent = txt;
	} else {
		obj.innerText = txt;
	}

}
//setTextContent(box2,'下午不困');

/**
 * 3兼容性封装读取元素内容
 * @param {标签对象} obj
 */
function getTextContent(obj) {
	if(obj.textContent) {
		return obj.textContent;
	} else {
		return obj.innerText;
	}
}
/**
 * 4兼容读取样式方法
 * @param {标签对象} obj
 * @param {属性名} styleName
 */
function getStyle(obj, styleName) {
	//由于getComputedStyle全局的函数,这个函数其实是window下的属性
	if(window.getComputedStyle) {
		//			 	alert('高级');
		return getComputedStyle(obj)[styleName];
	} else {
		//			 	alert('低级');
		return obj.currentStyle[styleName];
	}
}

/**
 * 5封装动画函数
 * @param {元素对象} obj
 * @param {目标值} target
 */
function animate(obj, target) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var step = 30;

		var current = obj.offsetLeft;
		step = current < target ? step : -step;
		current += step;
		if(Math.abs(target - current) > Math.abs(step)) {
			obj.style.left = current + 'px';
		} else {
			obj.style.left = target + 'px';
			clearInterval(obj.timer);
		}

	}, 10);
}

/*
 * 6 class操作函数 addClass(menuBtn, 'active') ;
 * 
 */
(function(w) {
	w.addClass = function(node, className) {
		var reg = new RegExp("\\b" + className + "\\b");
		if(!reg.test(node.className)) {
			node.className += (" " + className);
		}
	};
	w.removeClass = function(node, className) {
		if(node.className) {
			var reg = new RegExp("\\b" + className + "\\b");
			var classes = node.className;
			node.className = classes.replace(reg, "");
			if(/^\s*$/g.test(node.className)) {
				node.removeAttribute("class");
			}
		} else {
			node.removeAttribute("class");
		}
	};

})(window);

/*
 * 7. 读取或写入translate rotate scale属性 
 * 读取：transformCss(navList, 'translateX');
 * 写入：transformCss(navList, 'translateX', translateX); 第三个为value
 */
(function(win) {

	win.transformCss = function(node, name, value) {
		//保存 名值对  --- 对象			
		if(!node.abc) {
			node.abc = {};
		};
		//写入
		if(arguments.length > 2) {
			//把 属性名 ，属性值 放在 对象中
			node.abc[name] = value; //{translateX: 200, scale: 0.5}							
			//保存最终的结果
			var result = '';
			//枚举对象上的属性
			for(var i in node.abc) {
				switch(i) {
					case 'translateX':
					case 'translateY':
					case 'translateZ':
					case 'translate':
						result += i + '(' + node.abc[i] + 'px) ';
						//translateX(200px)
						break;
					case 'scaleX':
					case 'scaleY':
					case 'scaleZ':
					case 'scale':
						result += i + '(' + node.abc[i] + ') ';
						//scale(0.5)
						break;
					case 'rotate':
					case 'rotateX':
					case 'rotateY':
					case 'rotateZ':
					case 'skew':
					case 'skewX':
					case 'skewY':
						result += i + '(' + node.abc[i] + 'deg) ';
						//rotate(90deg)
						break;
				}
			}
			node.style.transform = result;
		} else {
			//读取
			if(node.abc[name] == undefined) {
				//不正常 ： 直接读取
				if(name == 'scale' || name == 'scaleX' || name == 'scaleY' || name == 'scaleZ') {
					value = 1
				} else {
					//rotate,translate,skew
					value = 0
				};
			} else {
				//正常   ：  写 -- 读
				value = node.abc[name];
			}
			return value;
		}
	};
})(window);

/*
 * 8.拖拽函数
 * 
 *  //拖动逻辑    此处我们对音量小白块进行拖动，并通过callback2对象内的move函数完成对当前时间的更新
				var callback2 = {
					move: function() {
						smallPink[1].style.width = smallWhite[1].offsetLeft + 'px';
						myVideo.volume = smallWhite[1].offsetLeft / (smallGrey[1].offsetWidth - smallWhite[1].offsetWidth);
						//存储声音变量到全局环境
						volume = myVideo.volume;
						//当音量=0时触发静音事件
						if(myVideo.volume == 0) {
							myVideo.muted = true;
							addClass(isSound, 'active');
						} else {
							myVideo.muted = false;
							removeClass(isSound, 'active');
						}
					}
				}							
				$.drag(smallWhite[1], callback2);
 */
(function(w) {
	w.$ = {};
	//	callBack将内部组件的move状态暴露了外部的业务逻辑
	w.$.drag = function(testNode, callBack) {
		//1.确定元素一开始的位置
		var elementPoint = {
			x: 0,
			y: 0
		};
		//鼠标一开始的位置
		var startPoint = {
			x: 0,
			y: 0
		};
		testNode.onmousedown = function(ev) {
			ev = ev || event;
			//  参照于offsetParent
			elementPoint.x = this.offsetLeft;
			elementPoint.y = this.offsetTop;

			//	参照于视口
			startPoint.x = ev.clientX;
			startPoint.y = ev.clientY;

			if(testNode.setCapture) {
				testNode.setCapture();
			}

			document.onmousemove = function(ev) {
				ev = ev || event;

				//  参照于视口
				var nowPoint = {
					x: 0,
					y: 0
				};
				nowPoint.x = ev.clientX;
				nowPoint.y = ev.clientY;

				var L = elementPoint.x + nowPoint.x - startPoint.x;
				var T = elementPoint.y + nowPoint.y - startPoint.y;

				if(L < 0) {
					L = 0;
				} else if(L > testNode.offsetParent.offsetWidth - testNode.clientWidth) {
					L = testNode.offsetParent.offsetWidth - testNode.clientWidth;
				}

				// 参照于offsetParent
				testNode.style.left = L + "px";

				if(callBack && typeof callBack["move"] === "function") {
					callBack["move"]();
				}
			}

			document.onmouseup = function() {
				document.onmousemove = document.onmouseup = null;
				if(document.releaseCapture) {
					document.releaseCapture();
				}
			}

			return false;
		}
	}
})(window);

//9.时间格式
function changeTime(time) {
	time = parseInt(time);

	var h = toZero(Math.floor(time / 3600));
	var m = toZero(Math.floor(time % 3600 / 60));
	var s = toZero(Math.floor(time % 60));;

	return h + ":" + m + ":" + s;
}

function toZero(mun) {
	if(mun < 10) {
		mun = "0" + mun;
	} else {
		mun = "" + mun;
	}
	return mun;
}

/*
 * 10.全屏  onclickFull(full);
 */

function onclickFull(full) {
	full.onclick = function() {
		if(isFullScreen) {
			removeClass(full, 'active')
			isFullScreen = false
			if(document.exitFullscreen) {
				document.exitFullscreen();
			} else if(document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if(document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			} else if(document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		} else {
			addClass(full, 'active')
			isFullScreen = true
			var docElm = document.documentElement;
			//W3C  
			if(docElm.requestFullscreen) {
				docElm.requestFullscreen();
			}
			//FireFox  
			else if(docElm.mozRequestFullScreen) {
				docElm.mozRequestFullScreen();
			}
			//Chrome等  
			else if(docElm.webkitRequestFullScreen) {
				docElm.webkitRequestFullScreen();
			}
			//IE11
			else if(docElm.msRequestFullscreen) {
				docElm.msRequestFullscreen();
			}
		}
	}
}

/**
 * 11圆角矩形
 * @param strokeStyle 边框颜色
 * @param fillStyle 填充颜色
 * @param cornerX  左上角X轴坐标
 * @param cornerY  左上角Y轴坐标
 * @param width  矩形宽度
 * @param height  矩形高度
 * @param cornerRadius  四个角的半径
 */
function drawRoundedRect(context, strokeStyle, fillStyle, cornerX, cornerY, width, height, cornerRadius) {
	context.beginPath();
	_roundedRect(context, cornerX, cornerY, width, height, cornerRadius);
	context.strokeStyle = strokeStyle;
	context.fillStyle = fillStyle;
	context.stroke();
	context.fill();
	console.log("绘制圆角");
}

/**
 * 12随机返回16进制颜色
 * @returns {string}
 */
function getRandomColor() {
	return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
}

/*
 * 13.移动端准备工作prepare()
 */
function Phoneprepare() {
	//清除默认行为
	document.addEventListener('touchstart', function(e) {
		e.preventDefault();
	})

	//点透处理  对所有a进行 监听重新设置默认行为
	var aNodes = document.querySelectorAll('a');
	for(var i = 0; i < aNodes.length; i++) {

		aNodes[i].addEventListener('touchstart', function(e) {
			e.preventDefault();
			window.location.href = this.href;
		})
	}

	//rem适配  对html font-size进行设置
	var width = document.documentElement.clientWidth;
	var styleNode = document.createElement('style');
	styleNode.innerHTML = 'html{font-size: ' + width / 16 + 'px;}';
	document.head.appendChild(styleNode);
}