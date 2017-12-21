$(function(){
  /*打字效果*/
  var pageA = $("#pageA");
  var dis = pageA.css("display");
  var word = 'WELCOME TO MY HOME';
  var $welcome = $('#welcome');
  var num = 0;
  var length = word.length;
  var timer = null;
  function start(){
    $welcome.text('');
    timer=setInterval(function(){
      $welcome.append(word.charAt(num));
      if(num++ === length){
        clearInterval(timer);
        num = 0;
        start();
      }
    },180);
  }
  start();
  /*定义函数确保翻页后停止打字*/
  function checkIsPageA(){
    if(dis=="none"){
      clearInterval(timer);
      num=0
    }else{
      start();
    }
  }


  /*翻页效果*/
  var index=0;
  function indexPages(){
    var pages = $("#pages"); 
    var moveLi = $("#pages .page-container");
    function moveLiIndex(){
      var LiIndex=null;
      moveLi.each(function(index,item){
        if(item.style.display=="block"){
          // console.log("当前元素下标："+$(this).index())
           LiIndex = $(this).index();
           return;
        }
      })
      return LiIndex;
    }

    //触屏开始
    var startPageX;
    var movePageX;
    var startPageY;
    var movePageY;
    var blockLi;
    var isXy;

    pages.on("touchstart",function(event){
        var touch=event.targetTouches;//获取触摸信息
        if(touch.length==1){//一个手指触摸
            startPageX=touch[0].pageX;
            startPageY=touch[0].pageY;
            movePageX=0;
            movePageY=0;
        }
        // console.log("start"+startPageX)
    })

    //触屏移动
    .on("touchmove",function(event){
        var touch=event.targetTouches;
        if(touch.length==1){
            movePageX=touch[0].pageX;
            movePageY=touch[0].pageY;
        }
        // event.preventDefault();
        isXy = Math.abs(movePageX-startPageX)<Math.abs(movePageY-startPageY)+50 ? true : false;
    })

    //触屏结束      
    .on("touchend",function(){            
        
        if(movePageX==0){
          return;
        }
        if(isXy){
          return;
        }
        if(movePageX<startPageX){
            // console.log("左移");
            if(index==moveLi.length-1){
                index=0;
                blockLi=$(moveLi[index])
              }else{
                index = moveLiIndex();
                // console.log(index)
                blockLi=$(moveLi[index]).next()
              }

            blockLi.css({'display' : 'block'});
            blockLi.addClass('animatestart sliderightin');            

            setTimeout(function(){ //动画结束时重置class
              blockLi.siblings().css({'display' : 'none'});  
              blockLi.removeClass('animatestart sliderightin');
              index = moveLiIndex()
              /*翻页后不打字*/
              dis = pageA.css("display");
              checkIsPageA();
              
              console.log("當前下標:"+index);
            }, 360);
            

        }else{
            // console.log("右移");
            if(index==0){
                index=moveLi.length-1;
                blockLi=$(moveLi[index])
                console.log(index);
            }else{
                index = moveLiIndex();
                // console.log(index)
                blockLi=$(moveLi[index]).prev()
                console.log(blockLi);
            }

            blockLi.css({'display' : 'block'});
            blockLi.addClass('animatestart slideleftin');

            setTimeout(function(){ //动画结束时重置class
              blockLi.siblings().css({'display' : 'none'}); 
              blockLi.removeClass('animatestart slideleftin');
              index = moveLiIndex();
              /*翻页后不打字*/
              dis = pageA.css("display");
              checkIsPageA();
              
              console.log("當前下標:"+index);
            }, 360); 
        }
    })
  }
  indexPages();

  /*点击弹窗*/
    var imgDiv = $("#pageD .imgDiv");
    var showDiv = $("#showDiv");
    var showDivInfo = $("#showDiv .showDivInfo");
    var sWidth = $("body").outerWidth();
    var sHeight = $("body").outerHeight();
    function defaultP(e){
        e.preventDefault();
      }
    imgDiv.click(function(){
      // console.log(index);
      var src = $(this).find("img").attr("src");
      showDiv.find("img").attr("src",src);
      // console.log(src);
      showDiv.addClass("showIn");
      showDiv.css({
        width : sWidth,
        height : sHeight,
        display : "block"
      });
      var workInfo = $(this).find(".workInfo").html();
      var $p = $("#showDiv .showDivInfo p");
      if($p.length==0){
        showDivInfo.append(workInfo);
      }

      $("body").css("overflow","hidden");
      $("#pages").off("touchmove")
      $("#pages").on("touchmove",defaultP)
    })
    showDiv.click(function(){
      $(this).find(".showDivInfo").html("");

      $("body").css("overflowY","auto");
      $("#pages").off("touchmove",defaultP);
      indexPages();
      
      showDiv.removeClass("showIn");
      showDiv.css({
        display : "none"
      });
    })




})