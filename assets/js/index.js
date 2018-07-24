$(function () {
    var mySwiper = new Swiper('.swiper-container');

    // ==================== 第一滑块 ===================
    function creatLunBo(obj) {
        new Swiper('.lunbo', {
            autoplay: true,
            pagination: {
                el: '.lunbo-pagination',
            },
            on: {
                slideChange: function () {
                    var index = this.activeIndex;
                    $('.tool .title').html(obj[index]['title']);
                },
            },
        });
    }


    // 获取轮播图的数据并显示在页面上
    $.get({
        url: "http://czdm.ittun.com/api/getlunbo",
        dataType: 'json',
        success: function (obj) {
            var html = template('tplLunBo', { list: obj });
            $('.lunbo .swiper-wrapper').html(html);
            creatLunBo(obj);
        }
    })


    // 加载动漫的数据
    function loadData(type) {
        $.get({
            url: "http://czdm.ittun.com/api/gethometab/" + type,
            dataType: 'json',
            success: function (obj) {
                console.log(obj);

                var html = template('tplContent1', { list: obj });
                $('.slide1 .content').html(html);
            }
        })
    }

    loadData(1)

    //点击不同子菜单时,重新发送请求并加载数据
    $('.fenlei li').not('.line').each(function (index, ele) {
        $(ele).click(function () {
            $('.slide1 .fenlei a').removeClass('animation').eq(index).addClass('animation');
            loadData(index + 1)
        })
    })

    // 点击顶部图标,显示选项模块
    $('.fa-align-justify').click(function () {
        $('.slide1 .bigFenlei').toggle();
    })


    // 点击选项,跳转到对应的模块
    $('.bigFenlei li').each(function (index, ele) {
        $(ele).click(function () {
            mySwiper.slideTo(index + 1, 800, false);
            $('.slide1 .bigFenlei').hide();
        })
    })

    // ==================== 第二滑块 ===================

    function initialization(indexObj, url, $ele, tplId, height) {
        var dataArr = [];
        $.get({
            url: url,
            dataType: 'json',
            success: function (obj) {
                newObj = obj.slice(indexObj.start, indexObj.end);
                indexObj.start = indexObj.end;
                indexObj.end = indexObj.end + indexObj.pageSize;
                var html = template(tplId, { list: newObj });
                $ele.html(html);

                loadMore($ele, tplId, indexObj, height, obj);
            }
        })
    }

    function loadMore($ele, tplId, indexObj, height, dataArr) {
        var level = height;
        $ele[0].addEventListener('touchmove', function (event) {
            if (indexObj.start >= dataArr.length) {
                return;
            }
            if ($ele.scrollTop() > height) {
                height += level;
                indexObj.end = indexObj.start + indexObj.pageSize;
                newObj = dataArr.slice(indexObj.start, indexObj.end)
                indexObj.start = indexObj.end;
                indexObj.end = indexObj.start + indexObj.pageSize;
                if (indexObj.end > dataArr.length - 1) {
                    indexObj.end = dataArr.length
                }
                var html = template(tplId, { list: newObj });
                $ele[0].innerHTML += html;

                $ele.scrollTop(height + 10000);
            }

        });
    }

  
        var indexObj = { start: 0, end: 10, pageSize: 5 }
        var url = "http://czdm.ittun.com/api/getlianzai";
        var height = $('.slide2 .content li').height() * 5;
        initialization(indexObj, url, $('.slide2 .content'), 'tplContent2',height);

        
        // ==================== 第三滑块 ===================

      
        var indexObj = { start: 0, end: 8, pageSize: 4 }
        var url = "http://czdm.ittun.com/api/gettopics";
        var height = $('.slide3 .content li').height() * 4;
        initialization(indexObj, url, $('.slide3 .content'), 'tplContent3',height);

        // ; (function () {
        //     var dataArr;
        //     var newObj;
        //     var start = 0;
        //     var end = 8;
        //     var pageSize = 4;
        //     $.get({
        //         url: "http://czdm.ittun.com/api/gettopics",
        //         dataType: 'json',
        //         success: function (obj) {
        //             dataArr = obj;
        //             newObj = obj.slice(0, 8);
        //             start = 8;
        //             end = start + pageSize;
        //             var html = template('tplContent3', { list: newObj });
        //             $('.slide3 .content').html(html);
        //         }
        //     })

        //     var height = $('.slide3 .content li').height() * 4;
        //     // console.log(height);
        //     var slide3Content = document.querySelector('.slide3 .content');
        //     slide3Content.addEventListener('touchmove', function (event) {
        //         if (start >= dataArr.length) {
        //             return;
        //         }
        //         if ($('.slide3 .content').scrollTop() > height) {
        //             height += 605
        //             end = start + pageSize;
        //             newObj = dataArr.slice(start, end)
        //             start = end;
        //             end = start + pageSize;
        //             if (end > dataArr.length - 1) {
        //                 end = dataArr.length
        //             }
        //             var html = template('tplContent3', { list: newObj });
        //             $('.slide3 .content')[0].innerHTML += html;

        //             $('.slide3 .content').scrollTop(height + 10000);
        //         }

        //     });

        // }())


    // ====================公共模块===================
    $('.fa-angle-left').click(function () {
        mySwiper.slideTo(0, 800, false);
    })

})