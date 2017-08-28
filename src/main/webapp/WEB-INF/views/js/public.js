/**
 * Created by Administrator on 2017/8/28.
 */


$(".nav1>li>a").on("click",function(){
    console.log("1");
    $(this).parent().addClass("active");
    $(this).parent().siblings().removeClass("active");
    if($(this).find($(".nav2"))){
        $(this).find(".nav2").slideDown(500);
        $(this).find(".nav2 li:first-child").addClass("active");
    };
});