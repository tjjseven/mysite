// $(function(){
	// 1、首先在sublime安装Package Control
	// 2、安装完Package Control以后，重启sublime；
	// 3、step1：Preferences -> Package Control；快捷键ctrl+shift+P
	//       step2：框内输入命令Install Package回车；
	//       step3：继续在框内输入DocBlockr，选中需要的后安装即可。
	//    	  只需要在函数上面输入/** ,然后按tab 就会自动生成注释。

	/*瀑布流函数*/
	/**
	 * @parent  {[父元素]}
	 * @children  {[子元素]}
	 * @pLPadding  {[子元素padding]}
	 * @return {[type]}
	 */
	function waterfall(parent,children,pLPadding){
		children.css({
			'float' : 'left',
			'position': 'relative',/*static*/
            'top': "",
            'left': ""
		})
	    var iPinW = children.eq( 0 ).innerWidth();// 一个块框pin的宽
	    // console.log(iPinW+"-");
	    var num = Math.floor( $( window ).width() / iPinW );
	    console.log(num);
	    //每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
	    //oParent.style.cssText='width:'+iPinW*num+'px;ma rgin:0 auto;';
	    //设置父级居中样式：定宽+自动水平外边距
	    parent.css({
	        'width' : iPinW * num,
	        'margin': '0 auto',
	        'position' : 'relative'
	    });
	    var pinHArr=[];//用于存储 每列中的所有块框相加的高度。

	    children.each( function( index, value ){
	        var pinH = children.eq( index ).height();
	        if( index < num ){
	            pinHArr[ index ] = pinH; //第一行中的num个块框pin 先添加进数组pinHArr
	            // console.log(index);
	        }else{
	            var minH = Math.min.apply( null, pinHArr );//数组pinHArr中的最小值minH
	            var minHIndex = $.inArray( minH, pinHArr );
	            // console.log(pinH);
	            $( value ).css({
	                'position': 'absolute',
	                'top': minH + pLPadding,
	                'left': children.eq( minHIndex ).position().left
	            });
	            //数组 最小高元素的高 + 添加上的aPin[i]块框高
	            pinHArr[ minHIndex ] += children.eq( index ).height() + pLPadding;//更新添加了块框后的列高
	        }
            var maxH = Math.max.apply( null, pinHArr );//数组pinHArr中的最大值maxH
            // parent.height(maxH);
	    });
	}


// })

	(function(jQuery){ 

	jQuery.fn.zoomImgRollover = function(options) {

		var defaults = {
			percent:30,
			duration:600
		}; 

		var opts = jQuery.extend(defaults, options);
		
		// static zoom function
		function imageZoomStep(jZoomImage, x, origWidth, origHeight)
		{
			var width = Math.round(origWidth * (.5 + ((x * opts.percent) / 200))) * 2;
			var height = Math.round(origHeight * (.5 + ((x * opts.percent) / 200))) * 2;
				
			var left = (width - origWidth) / 2;
			var top = (height - origHeight) / 2;
		
			jZoomImage.css({width:width, height:height, top:-top, left:-left});
		}

		return this.each(function()
		{
			var jZoomImage = jQuery(this);
			var origWidth = jZoomImage.width();
			var origHeight = jZoomImage.height();
			
			// add css ness. to allow zoom
			jZoomImage.css({position: "relative"});
			jZoomImage.parent().css({overflow: "hidden", display:"block", position: "relative", width: origWidth, height: origHeight});
			
			jZoomImage.mouseover(function()
			{
				jZoomImage.stop().animate({dummy:1},{duration:opts.duration, step:function(x)
				{
					imageZoomStep(jZoomImage, x, origWidth, origHeight)
				}});
			});

			jZoomImage.mouseout(function()
			{
				jZoomImage.stop().animate({dummy:0},{duration:opts.duration, step:function(x)
				{
					imageZoomStep(jZoomImage, x, origWidth, origHeight)
				}});
			});
		});
	};

})(jQuery);