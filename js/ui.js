     
function initialize() {  
	var Y_point			= 37.56368;		// Y 좌표
	var X_point			= 126.9630497;		// X 좌표 
	var zoomLevel		= 18;					// 지도의 확대 레벨 : 숫자가 클수록 확대정도가 큼

	var markerTitle		= "미래기후";				// 현재 위치 마커에 마우스를 오버을때 나타나는 정보
	var markerMaxWidth	= 300;						// 마커를 클릭했을때 나타나는 말풍선의 최대 크기

	// 말풍선 내용
	var contentString	= '<div>' + 
	'<p><img src="http://dev1.4dsolution.co.kr/eng/images/mark_2.png" style="width:100%"></p>' +
	//'<a href="http://www.daegu.go.kr" target="_blank">http://www.daegu.go.kr</a>'+ //링크도 넣을 수 있음
	'</div>';
	var image ="http://dev1.4dsolution.co.kr/eng/images/mark_2.png";
	var myLatlng = new google.maps.LatLng(Y_point, X_point);
	var mapOptions = {
						zoom: zoomLevel,
						center: myLatlng,
						mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById('googel-map'), mapOptions);

	var marker = new google.maps.Marker({
			position: map.getCenter(),
			map: map,
			title: markerTitle,
			icon : image 
	});

	var infowindow = new google.maps.InfoWindow(
		{
//			content: contentString,
			maxWidth: markerMaxWidth
		}
	);

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map, marker);
	});
}//function-end
 
var go=['#technology','#business','#company','#history','#location','#data']; // 각 세션 아이디
var windowTop=0; // 이동할 위치

$(window).on('load scroll',function(){
	windowTop=$(window).scrollTop()+$('header').height(); 
	if($('.news-board').length>0 || $('#tech-page').length>0){
		$('header').addClass('black'); 
		$('header .gnb li a:last').addClass('current')
		return false;
	}

	$('header .gnb li a').removeClass('current');	 
	if(windowTop >= 0  && windowTop < $(go[1]).offset().top){ 	 
		$('header').removeClass('black'); 		
		$('header .gnb li a').eq(0).addClass('current'); 
	}else if(windowTop >= $(go[1]).offset().top && windowTop < $(go[2]).offset().top){  
		$('header .gnb li a').eq(1).addClass('current'); 
		$('header').addClass('black');
	}else if(windowTop >= $(go[2]).offset().top && windowTop < $(go[3]).offset().top){ 	
		$('header .gnb li a').eq(2).addClass('current');
		$('header').removeClass('black'); 
	}else if(windowTop >= $(go[3]).offset().top && windowTop < $(go[4]).offset().top){ 	
		$('header .gnb li a').eq(3).addClass('current');
		$('header').addClass('black');
	}else if(windowTop >= $(go[4]).offset().top && windowTop < $(go[5]).offset().top){ 	
		$('header .gnb li a').eq(4).addClass('current');
		$('header').removeClass('black');
	}else{
		$('header .gnb li a').eq(5).addClass('current');
		$('header').addClass('black');
	}
 
});
 
function pageMove(a){
	$('html, body').stop(true).animate({
				scrollTop: $($(a).attr('href')).offset().top 
	}, 500,function(){
		//$('#header .gnb li a').removeClass('current');
		//a.addClass('current');
	});
}
$('#menu-open').click(function(){	 
		$('header .box').slideDown(600); 
		 
		return false;
});
$('#menu-close').click(function(){	
		$('header .box').slideUp(600);
		 
		return false;
});
 
 

var current_a; //  
 
$('header .gnb li a:not(.other)').click(function(e){
	if($('body').hasClass('main')){
		e.preventDefault();
		current_a = $(this);	
		if($(window).width()<768){
			$('header .box').slideUp(600,function(){
				pageMove(current_a); 
			}); 
		}else{
			pageMove(current_a);
		}

		$('header .gnb li a').removeClass('current'); 
		$(this).addClass('current');
	}else{
		location.href='/kor/index.html'+$(this).attr('href');
	}

});
	$('#btn-map').click(function(e){
		e.preventDefault(); 	 
		$('#location').append('<div class="bg"></div>');
		$('#googel-map-box').append('<span class="close"></span>')
		$('html, body').animate({ scrollTop: $('#location').offset().top});
		$('#googel-map-box').show();
		initialize();
	});
	$(document).on('click','#googel-map-box .close',function(){
		$('#location .bg, #googel-map-box .close').remove();
		$('#googel-map-box').hide();
	});


	$('#news ul').bxSlider({  
		auto: true,
		autoControls: true,
		mode: 'vertical',
		pause:5000,
		nextSelector: '#news-next',
		prevSelector: '#news-prev',
		nextText: '',
		prevText: ''
	});
  
 	historySlider = $('#history .box .year').bxSlider({
		adaptiveHeight: true,	 
	});
 

	$('#history .tab li a').click(function(e){
		e.preventDefault(); 	 
		historySlider.goToSlide($(this).index('#history .tab li a'));
		$('#history .tab li a').removeClass('current');
		$(this).addClass('current');
		$('html, body').animate({ scrollTop: $('#history').offset().top});
		
	});

	//ex/http://isotope.metafizzy.co/v1/docs/adding-items.html
 
	$('#business-more').click(function(){ 
		var $itemsB =$('<li class="grid-item"><a href=""><img alt="" src="images/b_temp_7.gif"><span class="t"><strong class="title">test</strong><span class="text">test 그래프로 표출</span></span></a></li>');  
		$('.business-list').append($itemsB).isotope( 'appended', $itemsB );
		return false;
	}); 

	$('#data .tab a').click(function(e){
		e.preventDefault(); 	  
		$('#data .tab li a').removeClass('current');
		$(this).addClass('current');
		$('html, body').animate({ scrollTop: $('#data').offset().top});
		var $selector = $(this).attr('data-filter'); 
	  	 $('.data-list').isotope({ filter: $selector }); 
	
	});
	//자료실 더보기 클릭시 ex/http://isotope.metafizzy.co/v1/docs/adding-items.html
	$('#data-more').click(function(){
		var $newItems = $('<li class="grid-item sort-data"><div class="item"><img src="images/data_6.gif" alt=""><span class="title">test</span><a href="" class="download">DOWNLOAD</a></div></li> ');
		$('.data-list').append($newItems).isotope( 'appended', $newItems );
		return false;
	});

 function topIs(){
	if($(window).scrollTop() >0){
		$('.top-move').show();
	}else{
		$('.top-move').hide();
	}
}


$(window).on('scroll',function(){
	topIs()
});



$(window).on('load resize',function(){ 
	if($(window).width()<768){
		$('img.m').each(function(){
			if(!$(this).hasClass('s-768')){
				$(this).attr('src',
					$(this).attr('src').replace('images/','images/m/')
				);
				$(this).addClass('s-768');
			}		
		}); 
		initialize(); 
	}else{
		$('header  .box').show(); 
		$('img.m').each(function(){
			$(this).removeClass('s-768');
			$(this).attr('src',
				$(this).attr('src').replace('images/m/','images/')
			);
		});

	}
	 
});


$('.top-move').click(function(e){	
	e.preventDefault(); 	  
	$('html, body').animate({ scrollTop: 0}, 900); 
});