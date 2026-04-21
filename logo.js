// Freera animated particle logo — purple theme
// trail:true  = faint afterglow (hero only)
// trail:false = fully transparent bg (nav / footer)
(function (g) {
  var PURPLE = {
    colors: ['#A78BFA','#7C5CF9','#6246E5','#C4B5FD','#DDD6FE','#8B5CF6'],
    sparkle: '#A78BFA', sparkle2: '#C4B5FD'
  };
  function createFreeraLogo(id, opts) {
    opts = opts || {};
    var c = document.getElementById(id); if (!c) return;
    var ctx = c.getContext('2d');
    var W = c.width, H = c.height;
    var text        = opts.text        || 'Freera';
    var fontSize    = opts.fontSize    || 120;
    var textX       = opts.textX       || W / 2;
    var textY       = opts.textY       || H / 2 + 8;
    var step        = opts.step        || 3;
    var interactive = opts.interactive !== false;
    var sparkles    = opts.sparkles    !== false;
    var trail       = opts.trail       === true;
    var mx = -999, my = -999;
    if (interactive) {
      c.addEventListener('mousemove', function(e) {
        var r = c.getBoundingClientRect();
        mx = (e.clientX - r.left) * (W / r.width);
        my = (e.clientY - r.top)  * (H / r.height);
      });
      c.addEventListener('mouseleave', function() { mx = -999; my = -999; });
    }
    var off = document.createElement('canvas');
    off.width = W; off.height = H;
    var octx = off.getContext('2d');
    var particles = [];
    function sample() {
      octx.clearRect(0, 0, W, H);
      octx.fillStyle = '#fff';
      octx.font = '900 ' + fontSize + 'px Fraunces, Georgia, serif';
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      octx.fillText(text, textX, textY);
      var d = octx.getImageData(0, 0, W, H);
      particles = [];
      for (var y = 0; y < H; y += step) {
        for (var x = 0; x < W; x += step) {
          if (d.data[(y * W + x) * 4 + 3] > 128) {
            particles.push({
              tx: x, ty: y,
              x: x + (Math.random() - 0.5) * W * 0.5,
              y: y + (Math.random() - 0.5) * H,
              vx: 0, vy: 0,
              size: 0.8 + Math.random() * 1.8,
              colorIdx: Math.floor(Math.random() * 6),
              phase: Math.random() * Math.PI * 2
            });
          }
        }
      }
    }
    function sparkle(x, y, s, color, op) {
      ctx.globalAlpha = op; ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x,y-s); ctx.lineTo(x+s*.18,y-s*.18);
      ctx.lineTo(x+s,y); ctx.lineTo(x+s*.18,y+s*.18);
      ctx.lineTo(x,y+s); ctx.lineTo(x-s*.18,y+s*.18);
      ctx.lineTo(x-s,y); ctx.lineTo(x-s*.18,y-s*.18);
      ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
    }
    function draw() {
      if (trail) {
        ctx.fillStyle = 'rgba(244,244,254,0.22)';
        ctx.fillRect(0, 0, W, H);
      } else {
        ctx.clearRect(0, 0, W, H); // fully transparent — NO white box
      }
      particles.forEach(function(p) {
        var dx = p.tx - p.x, dy = p.ty - p.y;
        p.vx += dx * 0.04; p.vy += dy * 0.04;
        if (interactive) {
          var dmx = p.x - mx, dmy = p.y - my;
          var dist = Math.sqrt(dmx*dmx + dmy*dmy);
          if (dist < 80) {
            var f = (80 - dist) / 80;
            p.vx += dmx * f * 0.18; p.vy += dmy * f * 0.18;
          }
        }
        p.phase += 0.025;
        p.x += p.vx + Math.sin(p.phase) * 0.15;
        p.y += p.vy + Math.cos(p.phase * 0.7) * 0.1;
        p.vx *= 0.88; p.vy *= 0.88;
        ctx.globalAlpha = 0.6 + Math.sin(p.phase) * 0.4;
        ctx.fillStyle = PURPLE.colors[p.colorIdx % 6];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      if (sparkles) {
        var t = Date.now() * 0.001;
        sparkle(W-60, 48, 14+Math.sin(t*2)*3,   PURPLE.sparkle,  0.7+Math.sin(t*3)*0.3);
        sparkle(W-30, 88,  7+Math.sin(t*1.5)*2, PURPLE.sparkle2, 0.4+Math.sin(t*2.5)*0.2);
      }
      requestAnimationFrame(draw);
    }
    document.fonts.ready.then(function() { sample(); draw(); });
  }
  g.createFreeraLogo = createFreeraLogo;
})(window);
