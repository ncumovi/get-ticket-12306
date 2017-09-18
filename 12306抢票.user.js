// ==UserScript==
// @name        12306抢票
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       movi
// @match        https://kyfw.12306.cn/otn/leftTicket/init
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    // Your code here...
    //清空控制台
    console.clear();

    console.log('you have come in -- 来自movi脚本 ');

    //检查是否是12306预定页面
    if((/confirmPassenger/).test(location.href)){
       if(sessionStorage.getItem("add_music")){
           //提醒用户抢到票了
             $('body').append('<video src="http://sc1.111ttt.com/2016/1/12/10/205101828272.mp3"  autoplay>您的浏览器不支持 video 标签。</video>');
       }
    }else{
       //添加执行movi脚本的入口按钮
    var button = document.createElement("button");
    //设置按钮的样式
    button.style.color='#fff';
    button.style.position = 'fixed';
    button.style.top='70px';
    button.style.left='50px';
    button.style.background='#00c8af';
    button.style.height='35px';
    button.style.width='90px';
    button.style.lineHeight='35px';
    button.style.borderRadius='7px';

    button.innerHTML = 'movi脚本';
    document.getElementsByTagName('body')[0].appendChild(button);

    //输入车次
    var input = $('<input class="movi-input" placeholder="请输入想要抢票的车次" />');

    $('body').append(input);

    $(".movi-input").css({
        position : 'fixed',
        top:'40px',
        left:'50px',
        zIndex:9999,
        borderRadius:'7px'
    });


    //点击执行movi脚本
    button.onclick = function () {

        //如果我爱你
        console.log('if i love you');

        //检查12306的查询列表结果是否有我所设置的车次
        var value_train = $('.movi-input').val() ? $('.movi-input').val() : '';

        if($('.movi-input').val()){

            var timer = setInterval(function(){

                //12306开始查询
                document.getElementById("query_ticket").click();

               clearTimeout(timer_delay);

                var timer_delay = setTimeout(function(){

                    for(var i=0;i<$('#queryLeftTable').children('tr').length;i++){

                        if($($('#queryLeftTable').children('tr')[i]).find('.number').text() == value_train){

                            if( $($('#queryLeftTable').children('tr')[i]).find('.btn72').text()){

                                sessionStorage.setItem("add_music", "true");


                                //进入预定页面

                                $($('#queryLeftTable').children('tr')[i]).find('.btn72').click();

                                console.log('抢到票呢');

                                clearInterval(timer);

                                break;

                            }else{
                                console.log('该车次该日期木有票了');
                            }


                        }else{
                            console.log('很遗憾这次没抢到票，将继续为您刷新！！');


                        }

                    }

                },500);

            },2000);

        }else{
            alert('请输入车次');
        }

    };
 }

})();