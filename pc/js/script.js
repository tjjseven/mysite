$(function(){
console.log();
	/*滚动监听*/
	// $('body').scrollspy({ target: '.navbar' });
	/*滚动css3动画*/
	$("#home h1").addClass("swing animated infinite");
	$('body').on('activate.bs.scrollspy', function (index) {
        var currentItem = $("header .nav li.active > a").text();
        console.log(currentItem);
        if(currentItem!=="HOME"){
        	$("#home h1").css("visibility","hidden");
        }
        if(currentItem!=="ABOUT ME"){
        	$("#about #aboutDiv").css("visibility","hidden");
        	$("#about .aboutInfo").css("visibility","hidden");
        }
        if(currentItem!=="SKILLS"){
        	$("#skills .media").css("visibility","hidden").removeClass("rotateInDownLeft animated infinite");
        }
        if(currentItem!=="WORKED"){
        	$(".work_list").css("visibility","hidden").removeClass("fadeInDown fadeInUp animated infinite");
        }

        switch(currentItem){
        	case "HOME":
        		$("#home h1").css("visibility","visible").addClass("swing animated infinite");
        		setTimeout(function(){
        			$("#home h1").removeClass("swing animated infinite");
        		},1000)
        	break;
        	case "ABOUT ME":
        		$("#about #aboutDiv").css("visibility","visible").addClass("bounceInLeft animated infinite");
        		$("#about .aboutInfo").css("visibility","visible").addClass("bounceInRight animated infinite");
        		setTimeout(function(){
        			$("#about #aboutDiv").removeClass("bounceInLeft animated infinite");
        			$("#about .aboutInfo").removeClass("bounceInRight animated infinite");
        		},1000)
        	break;
        	case "SKILLS":
        		$("#skills .skillsInfo1").css("visibility","visible").addClass("rotateInDownLeft animated infinite");
        		$("#skills .skillsInfo1").on("transitionend webkitAnimationEnd",function(){
        			$("#skills .skillsInfo2").css("visibility","visible").addClass("rotateInDownLeft animated infinite");
        		})
        		$("#skills .skillsInfo2").on("transitionend webkitAnimationEnd",function(){
        			$("#skills .skillsInfo3").css("visibility","visible").addClass("rotateInDownLeft animated infinite");
        		})
        		$("#skills .skillsInfo3").on("transitionend webkitAnimationEnd",function(){
        			$("#skills .skillsInfo4").css("visibility","visible").addClass("rotateInDownLeft animated infinite");
        		})
        		$("#skills .skillsInfo4").on("transitionend webkitAnimationEnd",function(){
        			$("#skills .skillsInfo5").css("visibility","visible").addClass("rotateInDownLeft animated infinite");
        		})
        		$("#skills .skillsInfo5").on("transitionend webkitAnimationEnd",function(){
        			$("#skills .skillsInfo6").css("visibility","visible").addClass("rotateInDownLeft animated infinite");
        		})
        	break;
        	case "WORKED":
        		$("[data-id='ov-topleft']").css("visibility","visible").addClass("fadeInUp animated infinite");
    			$("[data-id='ov-topright']").css("visibility","visible").addClass("fadeInDown animated infinite");
    			$("[data-id='ov-btmleft']").css("visibility","visible").addClass("fadeInUp animated infinite");
    			$("[data-id='ov-btmright']").css("visibility","visible").addClass("fadeInDown animated infinite");
        	break;

            }
    })


	/*header动画*/
	var initTop = 0;
	var $navbar = $(".navbar-default");
	$(window).scroll(function(){

		var scrollTop = $(window).scrollTop();
	 	if(scrollTop > initTop){
	  		$navbar.css({
				backgroundColor : "#f8f8f8",
				height : 60,
				transition : "200ms linear"
			});
			console.log("下")
			$scrollToTop.css("display","block");
	 	} else {
	 		if(scrollTop===0){
	 			$navbar.css({
					background : "none",
					height : 50,
					transition : "200ms linear"
				});
	 			console.log("上") 
	 			$scrollToTop.css("display","none");
	 		}
	 	}
	 	setTimeout(function(){
	 		initTop = scrollTop;
	 	},0)
	});


	/*点击添加滑动效果*/
	var $rightBarLi = $("#rightBar>li");
	$rightBarLi.on("click touchstart",function(){
		var thisIndex = $(this).index();
		/*设置滚动条的新坐标*/
		$("html,body").animate({
			scrollTop : $($(this).children('a').attr("href")).offset().top
		},350)
		return false;
	}) 

	/*点击回到顶部*/
	var $scrollToTop = $("#scroll_to_top");
	$scrollToTop.click(function(){
		$('html,body').stop().animate({
			scrollTop:'0px'
		},350)
	})


	/*home*/
	function setHomeSize(){
		var $bodyWidth = $(window).width();
		var $bodyHeight = $(window).height();
		$("#home").css({
			width : $bodyWidth,
			height : $bodyHeight
		});
		// console.log($bodyHeight)
	}
	setHomeSize();
	$(window).resize(function(){
		setHomeSize();
	})


	/*about*/
	/*鼠标移入效果*/
	$(".aboutPhoto").zoomImgRollover();
	// console.log($("#about").offset().top)


	/*worked*/
	var $caption = $("#work-experience .caption");
	var $captionH = $caption.innerHeight();
	var captionHC = $captionH*2;
	var $workList = $('.work_list');
	function bindEvent(){
		$workList.on("mouseenter",function(){
			$(this).find(".caption").stop().animate({
				height : captionHC
			},200)
		}).on("mouseleave",function(){
			$(this).find(".caption").stop().animate({
				height : $captionH
			},200)
		})
	}
	bindEvent();
	/*点击解除pc端hover事件*/
	$workList.on("touchstart",function(event){
		$workList.off("mouseenter mouseleave")
	});
	$workList.on("click",function(event){
		$('.overlay').removeClass('active active_reverse');
		    var o_target = $(this).data('id');
		    $('#'+o_target).addClass('active');
		    $("body").addClass('noscroll');
		})
	$(".close-btn").click(function(){
	    $(this).parent().addClass('active_reverse');
        $('body').removeClass('noscroll');
		/*关闭时重新绑定PC端hover事件*/
        bindEvent();
	});



	/*progect*/
	$("#progect .tab-content").on("mouseover touchstart",function(){
		$(this).css("overflow-y","auto");
	}).on("mouseout touchend",function(){
		$(this).css("overflow-y","hidden");
	})
	/*设置ul居中*/
	var $proNav = $("#proNav");
	var $proNavLi = $("#proNav>li");
	var lisWidth=0;
	// console.log($proNavLi.outerWidth())
	$proNavLi.each(function(index,ele){
		lisWidth += ele.getBoundingClientRect().width;
	})
	// console.log(lisWidth)
	var paddingLeft = $proNav.width()/2-lisWidth/2;
	$proNav.css("paddingLeft",paddingLeft)
	// console.log(($proNavLi.length*$proNavLi.outerWidth(true)))
	
	/*瀑布流*/
	$div = $("#all");
	var $photoList = $("#all .photoList");
	console.log($photoList.innerWidth()); 
	// var s = document.querySelectorAll("#all>a")[0];
	// console.log(s.clientHeight)


	var pLPadding = parseInt($photoList.css("paddingTop"));
	// console.log(pLPadding);
	// console.log(getComputedStyle(s,null)["width"]);
	waterfall($div,$photoList,pLPadding);

	/*分类*/
	$("#proNav>li>a").on("click",function(){
		var divAttr = $(this).attr("aria-controls");
		var $aClass = $("#all ."+divAttr);
		var $aLength = $("#"+divAttr+">."+divAttr).length;
		if(!$aLength && divAttr!= "all"){
			$("#"+divAttr).append($aClass.clone());
			var $childrenDiv = $("#"+divAttr+" .photoList");
				console.log($childrenDiv);
				// $childrenDiv.load(function(){

				// })
				console.log($childrenDiv.innerWidth()+"yi");//延时后获取的元素宽度不对
			/*等待添加完相同的分类后进行瀑布流布局*/
			setTimeout(function(){
				console.log($childrenDiv.innerWidth()+"er");
				console.log($childrenDiv.innerHeight()+"er");
				/*瀑布流*/
				var $parentDiv = $("#"+divAttr);
				
				var childrenPadding = parseInt($childrenDiv.css("paddingTop"));
				waterfall($parentDiv,$childrenDiv,childrenPadding);		
			},0)
		}
		setTimeout(function(){
			$(".tab-content a").each(function(index,value){
				$(this).addClass("zoomIn animated infinite");
			})
			$(".tab-content a").on("transitionend webkitAnimationEnd",function(){
				$(".tab-content a").removeClass("zoomIn animated infinite");
			})
		},0)
				
	})

	/*鼠标经过*/
	$(".tab-content").on("mouseover","a",function(){
		// alert(1);
		$(this).children(".divInfo").css({
			transition : "300ms linear",
			backgroundColor : "rgba(0,0,0,.8)",
		});
		$(this).find("p").css({
			transition : "300ms linear",
			opacity:1,
			filter: "alpha(opacity=100)"
		})
	}).on("mouseleave","a",function(){
		$(this).children(".divInfo").css({
			backgroundColor : "rgba(0,0,0,0)",
		});
		$(this).find("p").css({
			opacity : 0,
			filter : "alpha(opacity=0)"
		})
	})


	/*blogs*/
	var $blogsImg = $("#blogs .thumbnail img");
	var imgWidth = $blogsImg.width()+10;
	$("#blogs .thumbnail").css("height",imgWidth);
	var imgHeight = $blogsImg.height();
	// console.log(imgHeight)
	var flag = 1.2;
	var bigImgWidth = imgWidth*flag;
	var bigImgHeight = imgHeight*flag;
	/*鼠标移入事件*/
	function bindEventBlogs(){
		$("#blogs .thumbnail").on("mouseenter",function(){
			$(this).children("img").stop().animate({
				width: bigImgWidth,
				height: bigImgHeight,
				marginTop : -bigImgWidth/2,
				marginLeft : -bigImgHeight/2,
			},300);
			$(this).children(".divInfo").css({
				transition : "300ms linear",
				backgroundColor : "rgba(0,0,0,.5)"
			});
			$(this).find("h4").stop().animate({
				marginTop : "50%",
			},300);
		}).on("mouseleave",function(){
			$(this).children("img").stop().animate({
				width: imgWidth,
				height: imgWidth,
				marginTop : -imgWidth/2,
				marginLeft : -imgWidth/2,
			},300);
			$(this).children(".divInfo").css({
				transition : "300ms linear",
				backgroundColor : "rgba(0,0,0,0)"
			});
			$(this).find("h4").stop().animate({
				marginTop : "-50%",
			},300);
		})
	}
	bindEventBlogs();
	/*点击解除pc端hover事件*/
	$("#blogs .thumbnail").on("touchstart",function(){
		$("#blogs .thumbnail").off("mouseenter mouseleave");
	})
	if($(window).width()>768){
		bindEventBlogs();
	}

	/*bgm*/
	var firstTouch = true;
    $('body').bind("touchstart",function(e){
        if ( firstTouch ) {
            firstTouch = false;
            document.getElementById('bgm').play();
        }else{
            return;
        }
    });
    $(".bgm-btn").bind("click touchstart",function(e){  
        //e.preventDefault();
        //e.stopPropagation();
        var dom = document.getElementById('bgm');
        if( dom.paused ){
            dom.play();
            $(".bgm-btn").removeClass("mut");
        }else{
            dom.pause();
            $(".bgm-btn").addClass("mut");
        }
    });


})

	

