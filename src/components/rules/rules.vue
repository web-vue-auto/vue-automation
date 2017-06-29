<template>
 <div class="service">
  <div class="service-list">
    <ul class="clearfix">
      <li v-for="item in items"> 
      <router-link :to="item.rout">
        <div class="item-box">
        <h3>{{ item.title }}</h3>
        <h4>{{ item.content }}</h4>
        <div class="overlay-start"></div>
        <div class="overlay-bottom"></div>
        <div class="overlay-left"></div>
        <div class="overlay-top"></div>
        <div class="overlay-right"></div>
        <div class="start-point"> <i class="circle"></i> </div>
        </div>
        <div class="service-icon">
        <div class="circle">+</div>
      </div> 
      </router-link>
    </li>
    </ul>
  </div>
</div>


</template>
<script>
    export default {
        data () {
            return {
                items : [
                    {
                        title : "UI规范",
                        content:'UI设计规范',
                        rout:'uipage'
                    },
                    {
                        title : "编码规范",
                        content:'内容包括基于jquery的编码规范以及前端编码规范文档',
                        rout:'codepage'
                    },
                    {
                        title : "历史记录",
                        content:'历史记录存档',
                        rout:'permission'
                    }
                ]
            }
        }
    }

</script>
<style>
.clearfix:after,
.clearfix:before {
    content: " ";
    display: table
}

.clearfix:after {
    clear: both
}

.service {
    position: relative;
    background-color: #fff;
    zoom: 1
}

.service .service-list {
    position: relative;
    width: 1218px;
    height: 432px;
    margin: 0 auto;
    overflow: hidden;
    zoom: 1
}

.service ul {
    position: absolute;
    left: 0;
    top: 30%;
    width: 1218px;
    height: 432px;
    padding-top: 5px;
    transition: left .8s ease-in-out
}

.service li {
    float: left;
    width: 406px;
    height: 216px
}

.service li a {
    position: relative;
    display: block;
    width: 100%;
    height: 216px;
    padding: 10px 0 0 92px;
    zoom: 1
}

.service .item-box {
    position: relative;
    width: 274px;
    height: 186px;
    padding: 20px 0 0 60px;
    background: url(/static/images/kuang.png) 0 0 no-repeat;
    color: #00a0ff;
    zoom: 1
}

.service .overlay-start {
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 34px;
    height: 10px;
    background-color: #fff
}

.service .overlay-bottom {
    position: absolute;
    left: -2px;
    bottom: -2px;
    width: 295px;
    height: 15px;
    background-color: #fff
}

.service .overlay-left {
    position: absolute;
    left: -2px;
    top: -2px;
    width: 15px;
    height: 189px;
    background-color: #fff
}

.service .overlay-top {
    position: absolute;
    right: -2px;
    top: -2px;
    width: 295px;
    height: 15px;
    background-color: #fff
}

.service .overlay-right {
    position: absolute;
    right: -2px;
    bottom: -2px;
    width: 15px;
    height: 189px;
    background-color: #fff
}

.service .service-icon {
    position: absolute;
    left: 53px;
    top: 35px;
    width: 100px;
    height: 110px;
    padding-top: 12px;
    background-color: #fff;
    z-index: 11
}

.service .service-icon .circle {
    width: 80px;
    height: 80px;
    line-height: 80px;
    background: url(/static/images/bigcircle.png) 0 0 no-repeat;
    text-align: center;
    color: #359EFB;
    font-size: 28px;
}

.service .service-icon .iconfont {
    font-size: 32px;
    color: #00a0ff
}

.service .start-point {
    position: absolute;
    right: -8px;
    bottom: -3px;
    width: 0;
    height: 16px;
    background-color: #fff;
    overflow: hidden
}

.service .start-point .circle {
    float: right;
    width: 16px;
    height: 16px;
    background: url(/static/images/smallcircle.png) 0 0 no-repeat
}

.service h3 {
    line-height: 52px;
    font-size: 24px;
    color: #666
}

.service h4 {
    line-height: 27px;
    font-size: 14px;
    color: #666
}

.service a:hover h3,
.service a:hover h4 {
    color: #00a0ff
}

.service a:hover .overlay-bottom {
    animation: borderslideBottom .15s linear 0s 1;
    animation-fill-mode: forwards
}

.service a:hover .overlay-left {
    animation: bordersildeLeft .2s linear .15s 1;
    animation-fill-mode: forwards
}

.service a:hover .overlay-top {
    animation: bordersildeTop .15s linear .35s 1;
    animation-fill-mode: forwards
}

.service a:hover .overlay-right {
    animation: bordersildeRight .2s linear .5s 1;
    animation-fill-mode: forwards
}

.service a:hover .start-point {
    animation: bordersildeEnd .1s linear .7s 1;
    animation-fill-mode: forwards
}

.service .arrow {
    top: 357px
}

.case {
    position: relative;
    padding-top: 10px;
    background-color: #fff;
    zoom: 1
}

.case .arrow {
    top: 183px
}

@-moz-keyframes slogan {
    0% {
        opacity: 0;
        margin-top: 0
    }
    100% {
        opacity: 1;
        margin-top: -30px
    }
}

@-webkit-keyframes slogan {
    0% {
        opacity: 0;
        margin-top: 0
    }
    100% {
        opacity: 1;
        margin-top: -30px
    }
}

@keyframes slogan {
    0% {
        opacity: 0;
        margin-top: 0
    }
    100% {
        opacity: 1;
        margin-top: -30px
    }
}

@-moz-keyframes clickme {
    0% {
        opacity: .2;
        transform: translate3d(0, -5px, 0)
    }
    100% {
        opacity: .8;
        transform: translate3d(0, 5px, 0)
    }
}

@-webkit-keyframes clickme {
    0% {
        opacity: .2;
        transform: translate3d(0, -5px, 0)
    }
    100% {
        opacity: .8;
        transform: translate3d(0, 5px, 0)
    }
}

@keyframes clickme {
    0% {
        opacity: .2;
        transform: translate3d(0, -5px, 0)
    }
    100% {
        opacity: .8;
        transform: translate3d(0, 5px, 0)
    }
}

@-moz-keyframes borderslideBottom {
    from {
        width: 295px
    }
    to {
        width: 0
    }
}

@-webkit-keyframes borderslideBottom {
    from {
        width: 295px
    }
    to {
        width: 0
    }
}

@keyframes borderslideBottom {
    from {
        width: 295px
    }
    to {
        width: 0
    }
}

@-moz-keyframes bordersildeLeft {
    from {
        height: 189px
    }
    to {
        height: 0
    }
}

@-webkit-keyframes bordersildeLeft {
    from {
        height: 189px
    }
    to {
        height: 0
    }
}

@keyframes bordersildeLeft {
    from {
        height: 189px
    }
    to {
        height: 0
    }
}

@-moz-keyframes bordersildeTop {
    from {
        width: 295px
    }
    to {
        width: 0
    }
}

@-webkit-keyframes bordersildeTop {
    from {
        width: 295px
    }
    to {
        width: 0
    }
}

@keyframes bordersildeTop {
    from {
        width: 295px
    }
    to {
        width: 0
    }
}

@-moz-keyframes bordersildeRight {
    from {
        height: 189px
    }
    to {
        height: 0
    }
}

@-webkit-keyframes bordersildeRight {
    from {
        height: 189px
    }
    to {
        height: 0
    }
}

@keyframes bordersildeRight {
    from {
        height: 189px
    }
    to {
        height: 0
    }
}

@-moz-keyframes bordersildeEnd {
    from {
        width: 0
    }
    to {
        width: 34px
    }
}

@-webkit-keyframes bordersildeEnd {
    from {
        width: 0
    }
    to {
        width: 34px
    }
}

@keyframes bordersildeEnd {
    from {
        width: 0
    }
    to {
        width: 34px
    }
}

.hovertreeinfo {
    text-align: center;
    margin: 50px 0;
    font: normal 14px/24px 'MicroSoft YaHei';
}

.hovertreeinfo a {
    color: blue
}
</style>
