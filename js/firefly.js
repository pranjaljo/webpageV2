function Animation(selector, option) {
    this.canvas = this.init(selector);
    this.fireflies = new Array(option.count).fill({}).map(function () {
        return new Firefly(option);
    });
}
Animation.prototype.init = function (selector) {
    var canvas = document.querySelector(selector);
    var resize = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    return canvas;
}
Animation.prototype.draw = function () {
    var drawer = this.draw.bind(this);
    this.redraw();
    window.requestAnimationFrame(drawer);
}
Animation.prototype.redraw = function () {
    var ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.fireflies.forEach(function (firefly) {
        firefly.fly();
        firefly.flicker();
        ctx.beginPath();
        ctx.arc(firefly.x, firefly.y, firefly.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = firefly.color;
        ctx.shadowBlur = firefly.radius * 5;
        ctx.shadowColor = "white";
        ctx.fill();
    })
}
function Firefly(option) {
    this.x = random(window.innerWidth, option.radius, true);
    this.y = random(window.innerHeight, option.radius, true);
    this.radius = random(option.radius + 0.5, option.radius - 0.5);
    this.veer = false;
    this.angle = random(360, 0, true);
    this.rate = random(30 / 1000, 6 / 1000);
    this.speed = random(option.speed, option.speed / 8);
    this.opacity = random(1, 0.001);
    this.flare = this.opacity > 0.5;
    this.color = option.color;
}
Firefly.prototype.fly = function () {
    if (this.angle >= 360 || this.angle <= 0 || Math.random() * 360 < 6) {
        this.veer = !this.veer;
    }
    this.angle -= this.veer ? -this.speed : this.speed;
    this.x += Math.sin((Math.PI / 180) * this.angle) * this.speed;
    this.y += Math.cos((Math.PI / 180) * this.angle) * this.speed;
    if (this.x < 0) this.x += window.innerWidth;
    if (this.x > window.innerWidth) this.x -= window.innerWidth;
    if (this.y < 0) this.y += window.innerHeight;
    if (this.y > window.innerHeight) this.y -= window.innerHeight;
}
Firefly.prototype.flicker = function () {
    if (this.opacity >= 1 || this.opacity <= 0.001) {
        this.flare = !this.flare;
    }
    this.opacity -= this.flare ? -this.rate : this.rate;
    this.color = setOpacity(this.color, this.opacity.toFixed(3));
}
function random(max, min, isInt) {
    return isInt
        ? Math.floor((Math.random() * (max - min) + min))
        : Number((Math.random() * (max - min) + min).toFixed(3));
}
function setOpacity(color, opacity) {
    var colors = color.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\S+)\)$/);

    return "rgba(" + colors[1] + ", " + colors[2] + ", " + colors[3] + ", " + opacity + ")";
}
new Animation('#background-firefly-canvas', {
    radius: 2,
    color: "rgba(236, 236, 255, 1)",
    count: 25,
    speed: 1,
}).draw();
