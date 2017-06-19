<template>
	<div>
	<div class="header" id="demo">
		<div class="canvaszz"> </div>
		<canvas id="canvas"></canvas> 
		<!-- 入口 -->
		<div class="entrance">
			<ul class="clearfix">
				<li>
					<img src="/static/images/life.png" @click="routeGo(0)">
				</li>
				<li>
					<img src="/static/images/work.png" @click="routeGo(1)">
				</li>
			</ul>
		</div>
	</div>
	</div>
</template>
<style scope>
	.header {
		position: relative;
	}
	.header .entrance{
		position: absolute;
		width: 100%;
		height: 400px;
		top: 220px;
		left: 0;
		text-align: center;
	}
	.header .entrance ul {
		display: inline-block;
		width: 60%;
	}
	.header .entrance ul li{
		width: 250px;
		height: 250px;
		line-height: 250px;
		float: left;
		padding: 10px;
		cursor: pointer;
		border:1px solid #fff;
		-moz-box-shadow: -1px 0px 19px #ffffff;
		-webkit-box-shadow: -1px 0px 19px #ffffff;
		box-shadow: -1px 0px 19px #ffffff;
		border-radius: 50%;
	}
	.header .entrance ul li:hover{
		-moz-box-shadow: -1px 0px 30px #ffffff;
		-webkit-box-shadow: -1px 0px 30px #ffffff;
		box-shadow: -1px 0px 30px #ffffff;

		transform: rotate(0deg) scale(1.2) skew(-2deg) translate(0px);
		-webkit-transform: rotate(0deg) scale(1.2) skew(-2deg) translate(0px);
		-moz-transform: rotate(0deg) scale(1.2) skew(-2deg) translate(0px);
		-o-transform: rotate(0deg) scale(1.2) skew(-2deg) translate(0px);
		-ms-transform: rotate(0deg) scale(1.2) skew(-2deg) translate(0px);
	}
	.header .entrance ul li:nth-child(2){
		float: right;
	}
	.header .entrance ul li img{
		width: 100%;
	}
</style>
 <script>
 export default {
 	methods:{
 		routeGo (index) {
 			// 路由跳转
 			if (index == 1) this.$router.push({ name: 'bbswork'});
 			else this.$router.push({ name: 'bbslife'});
 		}
 	},	
 	mounted () {
 		var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'),

		w = canvas.width = document.body.clientWidth-20,
		h = canvas.height = window.innerHeight,


		hue = 217,
		stars = [],
		count = 0,
		maxStars = 60;//星星数量

		var canvas2 = document.createElement('canvas'),
		ctx2 = canvas2.getContext('2d');
		canvas2.width = 100;
		canvas2.height = 100;
		var half = canvas2.width / 2,
		gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
		// 修改点的颜色
		gradient2.addColorStop(0.025, '#FFFFE0');
		gradient2.addColorStop(0.1, '#fff');
		gradient2.addColorStop(0.25, '#FFFFE0');

		gradient2.addColorStop(1, '#FFEC8B');

		ctx2.fillStyle = gradient2;
		ctx2.beginPath();
		ctx2.arc(half, half, half, 0, Math.PI * 2);
		ctx2.fill();

		// End cache

		function random(min, max) {
		if (arguments.length < 2) {
		max = min;
		min = 0;
		}

		if (min > max) {
		var hold = max;
		max = min;
		min = hold;
		}

		return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		function maxOrbit(x, y) {
		var max = Math.max(x, y),
		diameter = Math.round(Math.sqrt(max * max + max * max));
		return diameter / 2;
		//星星移动范围，值越大范围越小，
		}

		var Star = function() {

		this.orbitRadius = random(maxOrbit(w, h));
		this.radius = random(60, this.orbitRadius) / 8; 
		//星星大小
		this.orbitX = w / 2;
		this.orbitY = h / 2;
		this.timePassed = random(0, maxStars);
		this.speed = random(this.orbitRadius) / 50000; 
		//星星移动速度
		this.alpha = random(2, 10) / 10;

		count++;
		stars[count] = this;
		}

		Star.prototype.draw = function() {
		var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
		y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
		twinkle = random(10);

		if (twinkle === 1 && this.alpha > 0) {
		this.alpha -= 0.05;
		} else if (twinkle === 2 && this.alpha < 1) {
		this.alpha += 0.05;
		}

		ctx.globalAlpha = this.alpha;
		ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
		this.timePassed += this.speed;
		}

		for (var i = 0; i < maxStars; i++) {
		new Star();
		}

		function animation() {
		ctx.globalCompositeOperation = 'source-over';
		ctx.globalAlpha = 0.5; //尾巴
		// 背景颜色修改
		ctx.fillStyle = '#fff';
		ctx.fillRect(0, 0, w, h)

		for (var i = 1, l = stars.length; i < l; i++) {
		stars[i].draw();
		};

		window.requestAnimationFrame(animation);
		}

		animation();
 	}
 }
 </script>