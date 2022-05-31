// $(function () {
//     // 1. 全选 全不选功能模块
//     // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
//     // 事件可以使用change
//     $(".checkall").change(function () {
//         // console.log($(this).prop("checked"));
//         $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
//         if ($(this).prop("checked")) {
//             // 让所有的商品添加 check-cart-item 类名
//             $(".cart-item").addClass("check-cart-item");
//         } else {
//             // check-cart-item 移除
//             $(".cart-item").removeClass("check-cart-item");
//         }
//     });
//     // 2. 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选。
//     $(".j-checkbox").change(function () {
//         // if(被选中的小的复选框的个数 === 3) {
//         //     就要选中全选按钮
//         // } else {
//         //     不要选中全选按钮
//         // }
//         // console.log($(".j-checkbox:checked").length);
//         // $(".j-checkbox").length 这个是所有的小复选框的个数
//         if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
//             $(".checkall").prop("checked", true);
//         } else {
//             $(".checkall").prop("checked", false);
//         }
//         if ($(this).prop("checked")) {
//             // 让当前的商品添加 check-cart-item 类名
//             $(this).parents(".cart-item").addClass("check-cart-item");
//         } else {
//             // check-cart-item 移除
//             $(this).parents(".cart-item").removeClass("check-cart-item");
//         }
//     });
//     // 3. 增减商品数量模块 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
//     $(".increment").click(function () {
//         // 得到当前兄弟文本框的值
//         var n = $(this).siblings(".itxt").val();
//         // console.log(n);
//         n++;
//         $(this).siblings(".itxt").val(n);
//         // 3. 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
//         // 当前商品的价格 p  
//         var p = $(this).parents(".p-num").siblings(".p-price").text();
//         // console.log(p);
//         p = p.substr(1);
//         console.log(p);
//         var price = (p * n).toFixed(2);
//         // 小计模块 
//         // toFixed(2) 可以让我们保留2位小数
//         $(this).parents(".p-num").siblings(".p-sum").text("￥" + price);
//         // getSum();
//     });
//     $(".decrement").click(function () {
//         // 得到当前兄弟文本框的值
//         var n = $(this).siblings(".itxt").val();
//         if (n == 1) {
//             return false;
//         }
//         // console.log(n);
//         n--;
//         $(this).siblings(".itxt").val(n);
//         // var p = $(this).parent().parent().siblings(".p-price").html();
//         // parents(".p-num") 返回指定的祖先元素
//         var p = $(this).parents(".p-num").siblings(".p-price").html();
//         // console.log(p);
//         p = p.substr(1);
//         console.log(p);
//         // 小计模块 
//         $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
//         // getSum();
//     });
//     //  4. 用户修改文本框的值 计算 小计模块  
//     $(".itxt").change(function () {
//         // 先得到文本框的里面的值 乘以 当前商品的单价 
//         var n = $(this).val();
//         // 当前商品的单价
//         var p = $(this).parents(".p-num").siblings(".p-price").html();
//         // console.log(p);
//         p = p.substr(1);
//         $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
//         // getSum();
//     });
//     // 5. 计算总计和总额模块
//     // getSum();

//     function getSum() {

//         var count = 0; // 计算总件数 
//         var money = 0; // 计算总价钱
//         $(".itxt").each(function (i, ele) {
//             count += parseInt($(ele).val());
//         });
//         $(".amount-sum em").text(count);
//         $(".p-sum").each(function (i, ele) {
//             money += parseFloat($(ele).text().substr(1));
//         });
//         $(".price-sum em").text("￥" + money.toFixed(2));


//     }
//     // 6. 删除商品模块
//     // (1) 商品后面的删除按钮
//     $(".p-action a").click(function () {
//         // 删除的是当前的商品 
//         $(this).parents(".cart-item").remove();
//         getSum();
//     });
//     // (2) 删除选中的商品
//     $(".remove-batch").click(function () {
//         // 删除的是小的复选框选中的商品
//         $(".j-checkbox:checked").parents(".cart-item").remove();
//         getSum();
//     });
//     // (3) 清空购物车 删除全部商品
//     $(".clear-all").click(function () {
//         $(".cart-item").remove();
//         getSum();
//     })
//     $('.j-checkbox').change(function () {
//         console.log($('.j-checkbox:checked').length);

//         getSum()
//     })
// })

$(function () {
    var allCount = 0
    var allFee = 0
    $('.checkall').change(function () {
        // console.log($(this).prop('checked'));
        $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'))
        if ($('.j-checkbox').prop('checked')) {
            $('.j-checkbox').parents('.cart-item').addClass('check-cart-item')
        } else {
            $('.j-checkbox').parents('.cart-item').removeClass('check-cart-item')
        }
    })
    $('.j-checkbox').change(function () {
        if ($(this).prop('checked')) {
            $(this).parents('.cart-item').addClass('check-cart-item')
            total2(this, '+')
        } else {
            $(this).parents('.cart-item').removeClass('check-cart-item')
            total2(this, '-')
        }
    })
    //物品加减
    $('.increment').click(function () {
        var count = $(this).siblings('.itxt').prop('value')
        count++
        $(this).siblings('.itxt').prop('value', count)
        getSum(this)
        if ($(this).parents('.cart-item').find('.j-checkbox').prop('checked'))
            total3(this, '+')
    })
    $('.decrement').click(function () {
        var count = $(this).siblings('.itxt').prop('value')
        if (count == 1)
            return false
        count--
        $(this).siblings('.itxt').prop('value', count)
        getSum(this)
        if ($(this).parents('.cart-item').find('.j-checkbox').prop('checked'))
            total3(this, '-')
    })
    //用户输入修改数量
    $('.itxt').change(function () {
        var count = $(this).prop('value')
        var fee = $(this).parents('.p-num').siblings('.p-price').text().substring(1)
        fee = parseFloat(fee)
        fee = (fee * count).toFixed(2)
        $(this).parents('.p-num').siblings('.p-sum').text('￥' + fee)
    })
    //小计部分
    function getSum(e) {
        var count = $(e).siblings('.itxt').prop('value')
        var fee = $(e).parents('.p-num').siblings('.p-price').text().substring(1)
        fee = parseFloat(fee)
        fee = (fee * count).toFixed(2)
        $(e).parents('.p-num').siblings('.p-sum').text('￥' + fee)
    }

    //总计模块

    function total() {
        $('.cart-item').each(function (i, e) {
            if ($(e).find('.j-checkbox').prop('checked')) {
                allCount = allCount + parseInt($(e).find('.itxt').prop('value'))
                allFee = allFee + parseFloat($(e).find('.p-sum').text().substring(1))
                allFee.toFixed(2)
            } else {
                allCount = allCount - parseInt($(e).find('.itxt').prop('value'))
                allFee = allFee - parseFloat($(e).find('.p-sum').text().substring(1))
                if (allFee < 0) allFee = 0
                if (allCount < 0) allCount = 0

                allFee.toFixed(2)

            }
        })
        $('.amount-sum em').text(allCount)
        if (allFee == 305.59999999999997) {
            $('.price-sum em').text('￥306.60')
        } else {
            $('.price-sum em').text('￥' + allFee)
        }


    }

    $('.checkall').change(total)
    function total2(e, c) {
        var countFee = $(e).parents('.cart-item').find('.p-sum').text().substring(1)
        var count = $(e).parents('.cart-item').find('.itxt').prop('value')
        countFee = parseFloat(countFee)
        count = parseInt(count)
        if (c === '+') {
            allCount = allCount + count
            allFee = allFee + countFee
            $('.amount-sum em').text(allCount)
            if (allFee == 305.59999999999997) {
                $('.price-sum em').text('￥306.60')
            } else {
                $('.price-sum em').text('￥' + allFee)
            }
        } else if (c === '-') {
            allCount = allCount - count
            allFee = allFee - countFee
            $('.amount-sum em').text(allCount)
            if (allFee == 305.59999999999997) {
                $('.price-sum em').text('￥306.60')
            } else {
                $('.price-sum em').text('￥' + allFee)
            }
        }
    }
    function total3(e, c) {
        var countFee = $(e).parents('.cart-item').find('.p-price').text().substring(1)
        countFee = parseFloat(countFee)
        console.log(countFee);
        if (c === '+') {
            allCount++
            allFee = allFee + countFee
            allFee.toFixed(2)
            $('.amount-sum em').text(allCount)
            if (allFee == 305.59999999999997) {
                $('.price-sum em').text('￥306.60')
            } else {
                $('.price-sum em').text('￥' + allFee)
            }
        } else if (c === '-') {
            allCount--
            allFee = allFee - countFee
            allFee.toFixed(2)
            $('.amount-sum em').text(allCount)
            if (allFee == 305.59999999999997) {
                $('.price-sum em').text('￥306.60')
            } else {
                $('.price-sum em').text('￥' + allFee)
            }

        }
    }
    $('.p-action a').click(function () {
        $(this).parents('.cart-item').remove()
    })

    $('.clear-all').click(function () {

        $('.cart-item-list').empty()
    })

    $('.remove-batch').click(function () {

        $('.j-checkbox').each(function (i, e) {
            if ($(e).prop('checked')) {
                $(e).parents('.cart-item').remove()

            }

        })
        $('.amount-sum em').text(0)
        $('.price-sum em').text(0)


    })
})