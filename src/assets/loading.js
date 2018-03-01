var ctx = document.querySelector("canvas").getContext("2d");

function resize(canvas) {
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;
  if (width != canvas.width || height != canvas.height) {
    canvas.width = width;
    canvas.height = height;
  }
}

function render(time) {
  time *= 0.001;
  resize(ctx.canvas);
  ctx.save();
  var w = ctx.canvas.width;
  var h = ctx.canvas.height;
  var hw = w / 2;
  var hh = h / 2;
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = "red";
  var grd = ctx.createLinearGradient(-400, 0, 400, 0);
  grd.addColorStop(0, "#FF4843");
  grd.addColorStop(0.2, "#FFBF43");
  grd.addColorStop(0.4, "#FBFF93");
  grd.addColorStop(0.6, "#79C975");
  grd.addColorStop(.8, "#328BDC");
  grd.addColorStop(1, "#6A3072");
  ctx.fillStyle = grd;
  ctx.translate(hw, hh);
  ctx.rotate(time * 0.1);
  for (var ii = 0; ii < 200; ++ii) {
    ctx.rotate(Math.sin(time * 0.3) * 0.5);
    ctx.fillRect(-hw, -hh, w, h);

    ctx.scale(0.9, 0.9);
  }
  ctx.restore();

  requestAnimationFrame(render);
}
requestAnimationFrame(render);
