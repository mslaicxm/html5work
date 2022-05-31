window.addEventListener('load', function () {
    var ul = document.querySelector('.main-ul')
    var picW = ul.children[0].offsetWidth
    var arrowIndex = 0
    var circleIndex = 0
    var ol = this.document.querySelector('.main-ol')
    var mainlogo = this.document.querySelector('.main-logo')
    var arrowleft = this.document.querySelector('.arrow-left')
    var arrowright = this.document.querySelector('.arrow-right')
    //节流阀
    var flag = true
    //生成ol的li圆点
    for (var i = 0; i < ul.children.length; i++) {
        var li = this.document.createElement('li')
        li.setAttribute('index', i)
        ol.append(li)
        //li点击事件
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            this.className = 'current'
            var index = this.getAttribute('index')
            animate(ul, -(picW * index))
            arrowIndex = circleIndex = index

        })
    }
    ol.children[0].className = 'current'
    //克隆ul孩子
    var li0 = ul.children[0].cloneNode(true)
    ul.appendChild(li0)

    // 自动轮播
    var timer = setInterval(function () {
        arrowright.click()
    }, 1500)
    mainlogo.addEventListener('mouseenter', function () {
        arrowleft.style.display = 'block'
        arrowright.style.display = 'block'
        clearInterval(timer)
        timer = null
    })
    mainlogo.addEventListener('mouseleave', function () {
        arrowleft.style.display = 'none'
        arrowright.style.display = 'none'
        timer = setInterval(function () {
            arrowright.click()
        }, 1500)
    })
    arrowleft.addEventListener('click', function () {
        if (flag) {
            flag = false
            if (arrowIndex == 0) {
                arrowIndex = ul.children.length - 1
            }
            arrowIndex--;
            console.log(arrowIndex);

            circleIndex--;
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            if (circleIndex < 0) {
                circleIndex = ol.children.length - 1
            }
            console.log(circleIndex);
            ol.children[circleIndex].className = 'current'
            animate(ul, -(arrowIndex * picW), function () {
                flag = true
            })
        }
    })


    arrowright.addEventListener('click', function () {
        if (flag) {
            flag = false
            if (arrowIndex >= ul.children.length - 1) {
                arrowIndex = 0
            }
            arrowIndex++;
            circleIndex++;
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            if (arrowIndex >= ul.children.length - 1) {
                circleIndex = 0
            }
            ol.children[circleIndex].className = 'current'
            animate(ul, -(arrowIndex * picW), function () {
                flag = true
            })
        }

    })
    //跳转页面
    var img = document.querySelectorAll('.jumpto')
    for (var i = 0; i < img.length; i++) {
        img[i].addEventListener('click', function () {
            // location.replace("../detail.html")
            self.location.href = "detail.html"

        })
    }
    var goapp = this.document.querySelector('.goapp')

    goapp.addEventListener('click', function () {

        self.location.href = "app/index.html"

    })
    var shopcar = this.document.querySelector('.shopcar')

    shopcar.addEventListener('click', function () {
        console.log("ttt");
        self.location.href = "shopcar/index.html"

    })

})