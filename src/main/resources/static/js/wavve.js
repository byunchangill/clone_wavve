// 메뉴
$(".menu>li").eq(1).stop().mouseover(function(){
    $(".submenu").stop().css("display","block")
});

$(".menu>li").eq(1).stop().mouseleave(function(){
    $(".submenu").stop().css("display","none")
});

// 포로필
$(".nav > li").eq(0).stop().mouseover(function(){
    $(".header-over-1depth").stop().css("display","block")
});

$(".nav > li").eq(0).stop().mouseleave(function(){
    $(".header-over-1depth").stop().css("display","none")
});

//이미지슬라이
var startp=screen.width/2+380;
var now=0;
var img=7;
var play;
var mode=true;
start();

function start(){
    $(".imgs>.imgbox").eq(0).css("left",-2340+startp)
    $(".imgs>.imgbox").eq(1).css("left",-1560+startp)
    $(".imgs>.imgbox").eq(2).css("left",-780+startp)
    $(".imgs>.imgbox").eq(3).css("left",0+startp)
    $(".imgs>.imgbox").eq(4).css("left",780+startp)
    $(".imgs>.imgbox").eq(5).css("left",1560+startp)
    $(".imgs>.imgbox").eq(6).css("left",2340+startp)
    $(".imgs>.imgbox").eq(7).css("left",3120+startp)
    $(".dot").eq(0).css("background-color","#fff")
    play=setInterval(function(){slide()},3000);
}

function slide(){
    if(now==img){
        now=0;
    }
    else{
        now++
    }
    dot_slide();
}

$(".prev_bt").click(function(){
    if(now==0){
        now=7;
    }else{
        now--
    }dot_slide();
    clearInterval(play);
    if(mode==true){
        play=setInterval(function(){slide()},3000);
    }
})

$(".next_bt").click(function(){
    if(now==img){
        now=0;
    }else{
        now++
    }dot_slide();
    clearInterval(play);
    if(mode==true){
        play=setInterval(function(){slide()},3000);
    }
})

$(".stop_bt").click(function(){
    clearInterval(play);
    $(this).css("display","none");
    $(".play_bt").css("display","block");
    mode=false;
})

$(".play_bt").click(function(){
    play=setInterval(function(){slide()},3000);
    $(this).css("display","none");
    $(".stop_bt").css("display","block");
    mode=false;
})

$(".dot").click(function(){
    now=$(this).index();
    clearInterval(play);
    dot_slide(now);
    if(mode==true){
        play=setInterval(function(){slide()},3000);
    }
})

function dot_slide(){
    if(now==1){
        $(".imgs>.imgbox").eq(1).css("left",-2340+startp)
        $(".imgs>.imgbox").eq(2).css("left",-1560+startp)
        $(".imgs>.imgbox").eq(3).css("left",-780+startp)
        $(".imgs>.imgbox").eq(4).css("left",0+startp)
        $(".imgs>.imgbox").eq(5).css("left",780+startp)
        $(".imgs>.imgbox").eq(6).css("left",1560+startp)
        $(".imgs>.imgbox").eq(7).css("left",2340+startp)
        $(".imgs>.imgbox").eq(0).css("left",3120+startp)
        $(".dot").eq(1).css("background-color","#fff")
        $(".dot").eq(1).siblings().css("background-color","gray")
    }
    if(now==2){
        $(".imgs>.imgbox").eq(2).css("left",-2340+startp)
        $(".imgs>.imgbox").eq(3).css("left",-1560+startp)
        $(".imgs>.imgbox").eq(4).css("left",-780+startp)
        $(".imgs>.imgbox").eq(5).css("left",0+startp)
        $(".imgs>.imgbox").eq(6).css("left",780+startp)
        $(".imgs>.imgbox").eq(7).css("left",1560+startp)
        $(".imgs>.imgbox").eq(0).css("left",2340+startp)
        $(".imgs>.imgbox").eq(1).css("left",3120+startp)
        $(".dot").eq(2).css("background-color","#fff")
        $(".dot").eq(2).siblings().css("background-color","gray")
    }
    if(now==3){
        $(".imgs>.imgbox").eq(3).css("left",-2340+startp)
        $(".imgs>.imgbox").eq(4).css("left",-1560+startp)
        $(".imgs>.imgbox").eq(5).css("left",-780+startp)
        $(".imgs>.imgbox").eq(6).css("left",0+startp)
        $(".imgs>.imgbox").eq(7).css("left",780+startp)
        $(".imgs>.imgbox").eq(0).css("left",1560+startp)
        $(".imgs>.imgbox").eq(1).css("left",2340+startp)
        $(".imgs>.imgbox").eq(2).css("left",3120+startp)
        $(".dot").eq(3).css("background-color","#fff")
        $(".dot").eq(3).siblings().css("background-color","gray")
    }
    if(now==4){
        $(".imgs>.imgbox").eq(4).css("left",-2340+startp)
        $(".imgs>.imgbox").eq(5).css("left",-1560+startp)
        $(".imgs>.imgbox").eq(6).css("left",-780+startp)
        $(".imgs>.imgbox").eq(7).css("left",0+startp)
        $(".imgs>.imgbox").eq(0).css("left",780+startp)
        $(".imgs>.imgbox").eq(1).css("left",1560+startp)
        $(".imgs>.imgbox").eq(2).css("left",2340+startp)
        $(".imgs>.imgbox").eq(3).css("left",3120+startp)
        $(".dot").eq(4).css("background-color","#fff")
        $(".dot").eq(4).siblings().css("background-color","gray")
    }
    if(now==5){
        $(".imgs>.imgbox").eq(5).css("left",-2340+startp)
        $(".imgs>.imgbox").eq(6).css("left",-1560+startp)
        $(".imgs>.imgbox").eq(7).css("left",-780+startp)
        $(".imgs>.imgbox").eq(0).css("left",0+startp)
        $(".imgs>.imgbox").eq(1).css("left",780+startp)
        $(".imgs>.imgbox").eq(2).css("left",1560+startp)
        $(".imgs>.imgbox").eq(3).css("left",2340+startp)
        $(".imgs>.imgbox").eq(4).css("left",3120+startp)
        $(".dot").eq(5).css("background-color","#fff")
        $(".dot").eq(5).siblings().css("background-color","gray")
    }
    if(now==6){
        $(".imgs>.imgbox").eq(6).css("left",-2340+startp)
        $(".imgs>.imgbox").eq(7).css("left",-1560+startp)
        $(".imgs>.imgbox").eq(0).css("left",-780+startp)
        $(".imgs>.imgbox").eq(1).css("left",0+startp)
        $(".imgs>.imgbox").eq(2).css("left",780+startp)
        $(".imgs>.imgbox").eq(3).css("left",1560+startp)
        $(".imgs>.imgbox").eq(4).css("left",2340+startp)
        $(".imgs>.imgbox").eq(5).css("left",3120+startp)
        $(".dot").eq(6).css("background-color","#fff")
        $(".dot").eq(6).siblings().css("background-color","gray")
    }
    if(now==7){
        $(".imgs>.imgbox").eq(7).css("left",-2340+startp)
        $(".imgs>.imgbox").eq(0).css("left",-1560+startp)
        $(".imgs>.imgbox").eq(1).css("left",-780+startp)
        $(".imgs>.imgbox").eq(2).css("left",0+startp)
        $(".imgs>.imgbox").eq(3).css("left",780+startp)
        $(".imgs>.imgbox").eq(4).css("left",1560+startp)
        $(".imgs>.imgbox").eq(5).css("left",2340+startp)
        $(".imgs>.imgbox").eq(6).css("left",3120+startp)
        $(".dot").eq(7).css("background-color","#fff")
        $(".dot").eq(7).siblings().css("background-color","gray")
    }
    if(now==0){
        $(".imgs>.imgbox").eq(0).css("left",-2340+startp)
        $(".imgs>.imgbox").eq(1).css("left",-1560+startp)
        $(".imgs>.imgbox").eq(2).css("left",-780+startp)
        $(".imgs>.imgbox").eq(3).css("left",0+startp)
        $(".imgs>.imgbox").eq(4).css("left",780+startp)
        $(".imgs>.imgbox").eq(5).css("left",1560+startp)
        $(".imgs>.imgbox").eq(6).css("left",2340+startp)
        $(".imgs>.imgbox").eq(7).css("left",3120+startp)
        $(".dot").eq(0).css("background-color","#fff")
        $(".dot").eq(0).siblings().css("background-color","gray")
    }
}

//모달
$("#search").click(function(){
    $("#modal").fadeIn();
    $(".modal_out").click(function(){
        $("#modal").fadeOut();
    })
});

$(".list_menu>li").click(function(){
    var idx=$(".list_menu>li").index(this);
    $(".list_menu>li").eq(idx).css({"color":"white","font-weight":"bold"})
    $(".list_menu>li").eq(idx).siblings().css({"color":"#a0a0a0","font-weight":"normal"})
    $(".list>li").eq(idx).css("display","block")
    $(".list>li").eq(idx).siblings().css("display","none")
})

$(".tag>li").eq(0).click(function(){
    $(".tag>li").eq(0).css("display","none")
    $(".tag>li").eq(1).css("display","block")
    $(".modal_box").css("display","none")
    $(".modal_box2").css("display","block")
})

$(".tag>li").eq(1).click(function(){
    $(".tag>li").eq(1).css("display","none")
    $(".tag>li").eq(0).css("display","block")
    $(".modal_box2").css("display","none")
    $(".modal_box").css("display","block")
})

$(".content_day>li").click(function(){
    var blue=$(this).css("background-color","#3535ff");
    if($(".content_day>li")==blue){
        $(this).css("background-color","#333");
    }else{$(this).css("background-color","#3535ff") }
})

$(".modal2_bt>li").eq(0).click(function(){
    $(".content_day>li").css("background-color","#333")
})

//팝업쿠키
$(document).ready(function(){
    if($.cookie("nopop")=="Y"){
        $("#popup").css("display","none")
    }else{
        $("#popup").show();
    }
})

$(".popclose").click(function(){
    if(document.frmPopup.popcheck.checked){
        $.cookie("nopop","Y",{expires:7});
    }
    $("#popup").hide();
})

//위로 올라가기
$(window).scroll(function(){
    if($(this).scrollTop()>0){
        $(".up").show()
    }else{
        $(".up").hide()
    }
})

$(".up").click(function(){
    $("body,html").animate({scrollTop:0},100)
})

//공지사항 슬라이드
notice();
var noticest=0;
var noticeend=3;

$(".left").click(function(){
    if(noticest==0){
        noticest=3;

    }else{
        noticest--
    }nslide();
})

$(".right").click(function(){
    if(noticest==noticeend){
        noticest=0;
    }else{
        noticest++
    }nslide();
})

function notice(){
    $(".notice>li").eq(3).css("top","-60px")
    $(".notice>li").eq(0).css("top","0px")
    $(".notice>li").eq(1).css("top","60px")
    $(".notice>li").eq(2).css("top","120px")
    setInterval(function(){noticeslide()},3000);
}

function noticeslide(){
    if(noticest==noticeend){
        noticest=0;
    }else{noticest++};
    nslide();
}

function nslide(){
    if(noticest==1){
        $(".notice>li").eq(0).css("top","-60px")
        $(".notice>li").eq(1).css("top","0px")
        $(".notice>li").eq(2).css("top","60px")
        $(".notice>li").eq(3).css("top","120px")
    }
    if(noticest==2){
        $(".notice>li").eq(1).css("top","-60px")
        $(".notice>li").eq(2).css("top","0px")
        $(".notice>li").eq(3).css("top","60px")
        $(".notice>li").eq(0).css("top","120px")
    }
    if(noticest==3){
        $(".notice>li").eq(2).css("top","-60px")
        $(".notice>li").eq(3).css("top","0px")
        $(".notice>li").eq(0).css("top","60px")
        $(".notice>li").eq(2).css("top","120px")
    }
    if(noticest==0){
        $(".notice>li").eq(3).css("top","-60px")
        $(".notice>li").eq(0).css("top","0px")
        $(".notice>li").eq(1).css("top","60px")
        $(".notice>li").eq(2).css("top","120px")
    }}

//컨텐츠 슬라이드
$(".prev").addClass("off");

$(".contentslide").eq(0).siblings().css("display","none");

$(".prev").click(function(){
    if(!$(".contentslide").first().is(":visible")){
        $(".contentslide:visible").hide().prev(".contentslide").fadeIn("slow");
        $(".next").removeClass("off")
    }
    if($(".contentslide").first().is(":visible")){
        $(".prev").addClass("off");
    }
});

$(".next").click(function(){
    if(!$(".contentslide").last().is(":visible")){
        $(".contentslide:visible").hide().next(".contentslide").fadeIn("slow");
        $(".prev").removeClass("off")
    }
    if($(".contentslide").last().is(":visible")){
        $(".next").addClass("off");
    }
});

$(".prev2").addClass("off");

$(".contentslide2").eq(0).siblings().css("display","none");

$(".prev2").click(function(){
    if(!$(".contentslide2").first().is(":visible")){
        $(".contentslide2:visible").hide().prev(".contentslide2").fadeIn("slow");
        $(".next2").removeClass("off")
    }
    if($(".contentslide2").first().is(":visible")){
        $(".prev2").addClass("off");
    }
});

$(".next2").click(function(){
    if(!$(".contentslide2").last().is(":visible")){
        $(".contentslide2:visible").hide().next(".contentslide2").fadeIn("slow");
        $(".prev2").removeClass("off")
    }
    if($(".contentslide2").last().is(":visible")){
        $(".next2").addClass("off");
    }
});

$(".prev3").addClass("off");

$(".contentslide3").eq(0).siblings().css("display","none");

$(".prev3").click(function(){
    if(!$(".contentslide3").first().is(":visible")){
        $(".contentslide3:visible").hide().prev(".contentslide3").fadeIn("slow");
        $(".next3").removeClass("off")
    }
    if($(".contentslide3").first().is(":visible")){
        $(".prev3").addClass("off");
    }
});

$(".next3").click(function(){
    if(!$(".contentslide3").last().is(":visible")){
        $(".contentslide3:visible").hide().next(".contentslide3").fadeIn("slow");
        $(".prev3").removeClass("off")
    }
    if($(".contentslide3").last().is(":visible")){
        $(".next3").addClass("off");
    }
});