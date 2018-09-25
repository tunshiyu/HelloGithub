function droplist(id) {
    var otop_nav = document.getElementById(id);
    var ali = otop_nav.getElementsByTagName('li');
    for (var i = 0; i < ali.length; i++) {
        var adivofali = ali[i].getElementsByTagName('div')[0];
        if (adivofali) {
            var aulofali = adivofali.getElementsByTagName('ul')[0];
            if(aulofali){
                ali[i].index=i;
                ali[i].onmouseover=function () {
                    if(this.index){
                        var div=ali[this.index].getElementsByTagName('div')[0];
                        var a=ali[this.index].getElementsByTagName('a')[0];
                        console.log("over");
                        console.log(a);
                        div.style.display="block";
                        a.style.backgroundColor="#fff";
                        a.style.borderColor="#eee"
                    }
                }
                ali[i].onmouseout=function () {
                    if(this.index){
                        var div=ali[this.index].getElementsByTagName('div')[0];
                        var a=ali[this.index].getElementsByTagName('a')[0];
                        a.style.backgroundColor="transparent";
                        a.style.borderColor="transparent"
                        div.style.display="none";

                    }
                }

            }
        }

    }

/*    var a=document.getElementsByClassName('t_n_a_hover');
    var ot_n_hover_list=document.getElementsByClassName('t_n_hover_list');
    console.log(a);
    for(var i=0;i<otop_nav_hover.length;i++)
    {
        otop_nav_hover[i].index=i;
        ot_n_hover_list[i].index=i;
        otop_nav_hover[i].onmouseover=function () {
            ot_n_hover_list[this.index].style.display='block';
            a[this.index].style.backgroundColor='#fff';
            a[this.index].style.borderColor='#eee';
        }
        otop_nav_hover[i].onmouseout=function () {
            ot_n_hover_list[this.index].style.display='none';
            a[this.index].style.backgroundColor='transparent';
            a[this.index].style.borderColor='transparent';
        }
    }*/
}

function slides(id,toleft,maxpage) {
    var oId=document.getElementById(id);
    var aA=oId.getElementsByTagName("a");
    var arrow_l=aA[0];
    var arrow_r=aA[1];
    var aUl=oId.getElementsByTagName("ul");
    var contentUl=aUl[0];
    var contentLi=contentUl.getElementsByTagName("li");
    var left=0;
    var flag=0;
    if(aUl[1]){
        var points=aUl[1];
        var pointsLi=points.getElementsByTagName("li");
        point_arrow_l();
        point_arrow_r();
        pointhover();

;           for(var i=0;i<pointsLi.length;i++) {
            pointsLi[i].className="";
        }
        pointsLi[flag].className="active";
    }else{
        nonepoint_arrow_l();
        nonepoint_arrow_r();
    }
 //   console.log(contentLi[0].clientWidth) 获取实际宽度数字（不带有px）
    contentUl.style.width=contentLi[0].clientWidth*(contentLi.length)+50+"px";
    function pointhover() {
            for(var i=0;i<pointsLi.length;i++){
                pointsLi[i].index=i;
                pointsLi[i].onmouseover=function () {
                    flag=this.index;
                    switchto(flag);
                    point(flag);
                }
            }
        }
    function point(flag) {
        for(var i=0;i<pointsLi.length;i++) {
            pointsLi[i].className="";
        }
        pointsLi[flag].className="active";
        }
    function switchto(flag) {
            left=flag*toleft;
            contentUl.style.left=-left+"px";
        }
    function point_arrow_r() {
            arrow_r.onclick=function () {
                if(flag<maxpage-1){
                    flag++
                    switchto(flag);
                    point(flag)
                }
            }
        }
    function nonepoint_arrow_r() {
        arrow_r.onclick=function () {
            if(flag<maxpage-1){
                flag++
                switchto(flag);
            }
        }
    }
    function point_arrow_l() {
        arrow_l.onclick = function () {
            if (flag > 0 && flag < contentLi.length) {
                flag--
                switchto(flag);
                /*                left+=toleft;*/
                point(flag)
            }
        }
    }
    function nonepoint_arrow_l() {
        arrow_l.onclick = function () {
            if (flag > 0 && flag < contentLi.length) {
                flag--
                switchto(flag);
                /*                left+=toleft;*/
            }
        }
    }
    function slideBychangetag() {

    }
        //初始值
}

function  leftnav(id,id2) {
    var olnbox=document.getElementById(id);
/*    console.log(olnbox);*/
/*    var scrollt=document.documentElement.scrollTop;*/
    var scrollt;
    var oId=document.getElementById(id2);
    var oLi=oId.getElementsByTagName("li");
    var winh=document.documentElement.clientHeight;
    window.onscroll=function () {
        scrollt=document.documentElement.scrollTop;
/*        console.log(scrollt);*/
        if(scrollt>600){
            olnbox.style.display="block";
        }else{
            olnbox.style.display="none";
        }
        if(scrollt>winh){
            oId.style.transition="top .4s";
            oId.style.top="0";
        }
        else{
            oId.style.transition="";
            oId.style.top="-55px";
        }

        var a=["faxianhaohuo","lingquanzhongxin","aiguang","jiadianguan","diannaoshuma","wan3c","aichi","aibaobao","aiyuedu","aiyouxi","shenghuolvxing"]
        for(i=0;i<11;i++){
            var id=a[i];
            var oIds=document.getElementById(id);
            var topnav=document.getElementById("left_nav");
            var oa=topnav.getElementsByTagName("a");
            if(scrollt>(oIds.offsetTop-150)){
                for(var j=0;j<oa.length;j++){
                    oa[j].style.backgroundColor="#b1aaaa";
                }
                oa[i].style.backgroundColor="#f10204";
            }
        }
    }
}


function countdown(position) {


    var timer;
    var nowTime;
    //timer=setInterval(toTime,1000);
    function setcountdown() {
        nowTime=new Date();//毫秒
        var newTime=new Date(2018,1,10,2)//Date(yyyy,mth,dd,hh,mm,ss)/mth 0-11;
        var count=newTime-nowTime;//毫秒数字
        var oDiv=document.getElementById("countdown");
        var aImg=document.getElementsByTagName("img");
        var oDate=toZero(Math.floor(count/86400000));
        var oHour=toZero(Math.floor(count%86400000/3600000));
        var oMinu=toZero(Math.floor(count%86400000%3600000/60000));
        var oSeco=toZero(Math.floor(count%86400000%3600000%60000/1000));
        var times=oHour+""+oMinu+""+oSeco;
/*        console.log(typeof times)*/
        aImg[0].src="images/"+times.charAt(0)+".png";
        aImg[1].src="images/"+times.charAt(1)+".png";
        aImg[2].src="images/"+times.charAt(2)+".png";
        aImg[3].src="images/"+times.charAt(3)+".png";
        aImg[4].src="images/"+times.charAt(4)+".png";
        aImg[5].src="images/"+times.charAt(5)+".png";
    }
    timer=setInterval(setcountdown,1000);
    function toZero(n) {
        if(n<10){
            return "0"+n;
        }else {
            return n;
        }
    }
}
/*function  scrollandshow(id) {
    var oIds=document.getElementById(id);
    var ooffsettop=oIds.offsetTop;
    console.log(ooffsettop)
    if(scrollt>ooffsettop){

    }
}*/
