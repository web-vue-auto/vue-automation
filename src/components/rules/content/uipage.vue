<template>
    <div class="uiPage clearfix">

        <div class="demo-image first pull-left" data-image="/static/images/ui/1.png" data-title="" data-caption=""></div>
        <div class="demo-image second pull-left" data-image="/static/images/ui/2.png" data-title="" data-caption=""></div> 
        <div class="demo-image three pull-left" data-image="/static/images/ui/3.png" data-title="" data-caption=""></div>
        <div class="demo-image four pull-left" data-image="/static/images/ui/4.png" data-title="" data-caption=""></div> 
        <div class="demo-image five pull-left" data-image="/static/images/ui/5.png" data-title="" data-caption=""></div>
        <div class="demo-image six  pull-left" data-image="/static/images/ui/6.png" data-title="" data-caption=""></div> 
        <div class="demo-image seven pull-left" data-image="/static/images/ui/7.png" data-title="" data-caption=""></div>
        <div class="demo-image eight pull-left" data-image="/static/images/ui/8.png" data-title="" data-caption=""></div> 
        <div class="demo-image nine pull-left" data-image="/static/images/ui/9.png" data-title="" data-caption=""></div>
        <div class="demo-image ten pull-left" data-image="/static/images/ui/10.png" data-title="" data-caption=""></div> 
        <div class="demo-image eleven pull-left" data-image="/static/images/ui/11.png" data-title="" data-caption=""></div>
        <div class="demo-image twelve pull-left" data-image="/static/images/ui/12.png" data-title="" data-caption=""></div> 
        <div class="demo-image thirteen pull-left" data-image="/static/images/ui/13.png" data-title="" data-caption=""></div>
        <div class="demo-image fourteen pull-left" data-image="/static/images/ui/14.png" data-title="" data-caption=""></div> 
        <div class="demo-image fifteen pull-left" data-image="/static/images/ui/15.png" data-title="" data-caption=""></div>
        <div class="demo-image seventeen pull-left" data-image="/static/images/ui/front.png" data-title="" data-caption=""></div>
        <div class="demo-image eighteen pull-left" data-image="/static/images/ui/color.png" data-title="" data-caption=""></div> 

       
    </div>
</template>
<script>
export default {
    mounted: function () {//初始化
        var elements = document.querySelectorAll( '.demo-image' );
        Intense( elements );           
    }
}
</script>
<style>
    .uiPage{
        margin:100px 10px;
    }
    .demos {
      text-align: center;
      margin-top: 20px;
    }

    .demo-image {
        cursor: url("/static/images/plus_cursor.png") 25 25, auto;
        display: inline-block;
        width: 30%;
        min-height: 700px;
        background-size: cover;
        background-position: 50% 50%;
        margin: 20px 20px 0 20px; 
    }
    .demo-image.first {
        background-image: url("/static/images/ui/1.png");
     }
    .demo-image.second {
        background-position: 50% 10%;
        background-image: url("/static/images/ui/2.png");
    }
    .demo-image.three {
        background-image: url("/static/images/ui/3.png"); 
    }
    .demo-image.four {
        background-position: 50% 10%;
        background-image: url("/static/images/ui/4.png");
    }
    .demo-image.five {
        background-image: url("/static/images/ui/5.png"); 
    }
    .demo-image.six  {
        background-position: 50% 10%;
        background-image: url("/static/images/ui/6.png");
    }
    .demo-image.seven  {
        background-image: url("/static/images/ui/7.png"); 
    }
    .demo-image.eight {
        background-position: 50% 10%;
        background-image: url("/static/images/ui/8.png");
    }
    .demo-image.nine  {
        background-image: url("/static/images/ui/9.png"); 
    }
    .demo-image.ten  {
        background-position: 50% 10%;
        background-image: url("/static/images/ui/10.png");
    }
    .demo-image.eleven {
        background-image: url("/static/images/ui/11.png"); 
    }
    .demo-image.twelve {
        background-image: url("/static/images/ui/12.png"); 
    }
    .demo-image.thirteen {
        background-position: 50% 10%;
        background-image: url("/static/images/ui/13.png");
    }
    .demo-image.fourteen {
        background-image: url("/static/images/ui/14.png"); 
    }
    .demo-image.fifteen {
        background-position: 50% 10%;
        background-image: url("/static/images/ui/15.png");
    }
    .demo-image.seventeen {
        background-position: 50% 10%;
        background-image: url("/static/images/ui/front.png");
    }
    .demo-image.eighteen {
        background-image: url("/static/images/ui/color.png"); 
    }
</style>
