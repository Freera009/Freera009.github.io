// Freera animated particle logo — VIVID edition
// trail:true  = faint afterglow (hero only)
// trail:false = fully transparent bg (nav / footer)
(function (g) {

  // Vivid, high-contrast cycling palette
  var PALETTE = [
    '#7C3AED', // deep violet
    '#A855F7', // bright purple
    '#EC4899', // hot pink
    '#F59E0B', // amber gold
    '#06B6D4', // cyan
    '#10B981', // emerald
    '#F43F5E', // rose red
    '#8B5CF6', // violet
    '#C026D3', // magenta
    '#3B82F6', // electric blue
  ];

  var SPARKLE_COLORS = ['#F59E0B', '#EC4899', '#C026D3', '#06B6D4', '#A855F7'];

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
              x: x + (Math.random() - 0.5) * W * 0.6,
              y: y + (Math.random() - 0.5) * H * 1.2,
              vx: 0, vy: 0,
              size: 1.2 + Math.random() * 2.2,
              colorIdx: Math.floor(Math.random() * PALETTE.length),
              phase: Math.random() * Math.PI * 2,
              colorSpeed: 0.004 + Math.random() * 0.008,
              colorOffset: Math.random() * PALETTE.length
            });
          }
        }
      }
    }

    function sparkle(x, y, s, color, op) {
      ctx.globalAlpha = op;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x, y - s);
      ctx.lineTo(x + s * 0.2, y - s * 0.2);
      ctx.lineTo(x + s, y);
      ctx.lineTo(x + s * 0.2, y + s * 0.2);
      ctx.lineTo(x, y + s);
      ctx.lineTo(x - s * 0.2, y + s * 0.2);
      ctx.lineTo(x - s, y);
      ctx.lineTo(x - s * 0.2, y - s * 0.2);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    function draw() {
      if (trail) {
        ctx.fillStyle = 'rgba(244,244,254,0.18)';
        ctx.fillRect(0, 0, W, H);
      } else {
        ctx.clearRect(0, 0, W, H);
      }

      var t = Date.now() * 0.001;

      particles.forEach(function(p) {
        var dx = p.tx - p.x, dy = p.ty - p.y;
        p.vx += dx * 0.055;
        p.vy += dy * 0.055;

        if (interactive) {
          var dmx = p.x - mx, dmy = p.y - my;
          var dist = Math.sqrt(dmx * dmx + dmy * dmy);
          if (dist < 90) {
            var f = (90 - dist) / 90;
            p.vx += dmx * f * 0.28;
            p.vy += dmy * f * 0.28;
          }
        }

        p.phase += 0.032;
        p.x += p.vx + Math.sin(p.phase) * 0.22;
        p.y += p.vy + Math.cos(p.phase * 0.8) * 0.14;
        p.vx *= 0.84;
        p.vy *= 0.84;

        // Color cycles independently per particle
        p.colorOffset += p.colorSpeed;
        var color = PALETTE[Math.floor(p.colorOffset) % PALETTE.length];

        var alpha = 0.55 + Math.sin(p.phase + t) * 0.45;
        ctx.globalAlpha = Math.max(0.1, alpha);
        ctx.fillStyle = color;
        ctx.beginPath();
        var sz = p.size * (0.9 + Math.sin(p.phase * 1.3) * 0.15);
        ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      if (sparkles) {
        var sc1 = SPARKLE_COLORS[Math.floor(t * 1.5) % SPARKLE_COLORS.length];
        var sc2 = SPARKLE_COLORS[Math.floor(t * 1.0 + 2) % SPARKLE_COLORS.length];
        var sc3 = SPARKLE_COLORS[Math.floor(t * 0.7 + 4) % SPARKLE_COLORS.length];
        sparkle(W - 55, 45,  14 + Math.sin(t * 2.2) * 4,   sc1, 0.8 + Math.sin(t * 3) * 0.2);
        sparkle(W - 28, 90,   8 + Math.sin(t * 1.8) * 2.5, sc2, 0.5 + Math.sin(t * 2.5) * 0.3);
        sparkle(W - 80, 75,   5 + Math.sin(t * 2.8) * 1.5, sc3, 0.35 + Math.sin(t * 2) * 0.2);
      }

      requestAnimationFrame(draw);
    }

    document.fonts.ready.then(function() { sample(); draw(); });
  }

  g.createFreeraLogo = createFreeraLogo;
})(window);
