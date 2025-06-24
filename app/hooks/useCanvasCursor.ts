import { useEffect } from 'react';

const useCanvasCursor = () => {
  function n(e) {
    this.init(e || {});
  }
  n.prototype = {
    init: function (e) {
      this.phase = e.phase || 0;
      this.offset = e.offset || 0;
      this.frequency = e.frequency || 0.001;
      this.amplitude = e.amplitude || 1;
    },
    update: function () {
      return (
        (this.phase += this.frequency),
        (e = this.offset + Math.sin(this.phase) * this.amplitude)
      );
    },
    value: function () {
      return e;
    },
  };

  function Line(e) {
    this.init(e || {});
  }
  Line.prototype = {
    init: function (e) {
      this.spring = e.spring + 0.1 * Math.random() - 0.02;
      this.friction = E.friction + 0.01 * Math.random() - 0.002;
      this.nodes = [];
      for (var t, n = 0; n < E.size; n++) {
        t = new Node();
        t.x = pos.x;
        t.y = pos.y;
        this.nodes.push(t);
      }
    },
    update: function () {
      var e = this.spring,
        t = this.nodes[0];
      t.vx += (pos.x - t.x) * e;
      t.vy += (pos.y - t.y) * e;
      for (var n, i = 0, a = this.nodes.length; i < a; i++)
        (t = this.nodes[i]),
          0 < i &&
            ((n = this.nodes[i - 1]),
            (t.vx += (n.x - t.x) * e),
            (t.vy += (n.y - t.y) * e),
            (t.vx += n.vx * E.dampening),
            (t.vy += n.vy * E.dampening)),
          (t.vx *= this.friction),
          (t.vy *= this.friction),
          (t.x += t.vx),
          (t.y += t.vy),
          (e *= E.tension);
    },
    draw: function () {
      var e,
        t,
        n = this.nodes[0].x,
        i = this.nodes[0].y;
      ctx.beginPath();
      ctx.moveTo(n, i);
      for (var a = 1, o = this.nodes.length - 2; a < o; a++) {
        e = this.nodes[a];
        t = this.nodes[a + 1];
        n = 0.5 * (e.x + t.x);
        i = 0.5 * (e.y + t.y);
        ctx.quadraticCurveTo(e.x, e.y, n, i);
      }
      e = this.nodes[a];
      t = this.nodes[a + 1];
      ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
      ctx.stroke();
      ctx.closePath();
    },
  };

  function onMousemove(e) {
    function o() {
      lines = [];
      for (var e = 0; e < E.trails; e++)
        lines.push(new Line({ spring: 0.4 + (e / E.trails) * 0.025 }));
    }
    function c(e) {
      e.touches
        ? ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY))
        : ((pos.x = e.clientX), (pos.y = e.clientY)),
        e.preventDefault();
    }
    function l(e) {
      1 == e.touches.length &&
        ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY));
    }
    document.removeEventListener('mousemove', onMousemove),
      document.removeEventListener('touchstart', onMousemove),
      document.addEventListener('mousemove', c),
      document.addEventListener('touchmove', c),
      document.addEventListener('touchstart', l),
      c(e),
      o(),
      render();
  }

  function render() {
    if (ctx.running) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = 'hsla(' + Math.round(f.update()) + ',50%,50%,0.2)';
      ctx.lineWidth = 1;
      for (var e, t = 0; t < E.trails; t++) {
        (e = lines[t]).update();
        e.draw();
      }
      ctx.frame++;
      window.requestAnimationFrame(render);
    }
  }

  function resizeCanvas() {
    ctx.canvas.width = window.innerWidth - 20;
    ctx.canvas.height = window.innerHeight;
  }

  var ctx,
    f,
    let x = 0,
    let y = 0,
    let lastX = 0,
    let lastY = 0,
    let vx = 0,
    let vy = 0,
    let rafId,
    let isTouch = false,
    let isMoving = false,
    let isVisible = true,
    let isCanvasVisible = true,
    let isFirstMove = true,
    let pointerType = '',
    let pointerDown = false,
    let pointerDownTime = 0,
    let pointerUpTime = 0,
    let pointerDownX = 0,
    let pointerDownY = 0,
    let pointerUpX = 0,
    let pointerUpY = 0,
    let pointerMoveX = 0,
    let pointerMoveY = 0,
    let pointerMoveTime = 0,
    let pointerMoveVX = 0,
    let pointerMoveVY = 0,
    let pointerMoveAX = 0,
    let pointerMoveAY = 0,
    let pointerMoveA = 0,
    let pointerMoveAngle = 0,
    let pointerMoveSpeed = 0,
    let pointerMoveDistance = 0,
    let pointerMoveDirection = 0,
    let pointerMoveDirectionAngle = 0,
    let pointerMoveDirectionSpeed = 0,
    let pointerMoveDirectionDistance = 0,
    let pointerMoveDirectionVX = 0,
    let pointerMoveDirectionVY = 0,
    let pointerMoveDirectionAX = 0,
    let pointerMoveDirectionAY = 0,
    let pointerMoveDirectionA = 0,
    let pointerMoveDirectionAngle2 = 0,
    let pointerMoveDirectionSpeed2 = 0,
    let pointerMoveDirectionDistance2 = 0,
    let pointerMoveDirectionVX2 = 0,
    let pointerMoveDirectionVY2 = 0,
    let pointerMoveDirectionAX2 = 0,
    let pointerMoveDirectionAY2 = 0,
    let pointerMoveDirectionA2 = 0,
    let pointerMoveDirectionAngle3 = 0,
    let pointerMoveDirectionSpeed3 = 0,
    let pointerMoveDirectionDistance3 = 0,
    let pointerMoveDirectionVX3 = 0,
    let pointerMoveDirectionVY3 = 0,
    let pointerMoveDirectionAX3 = 0,
    let pointerMoveDirectionAY3 = 0,
    let pointerMoveDirectionA3 = 0,
    let pointerMoveDirectionAngle4 = 0,
    let pointerMoveDirectionSpeed4 = 0,
    let pointerMoveDirectionDistance4 = 0,
    let pointerMoveDirectionVX4 = 0,
    let pointerMoveDirectionVY4 = 0,
    let pointerMoveDirectionAX4 = 0,
    let pointerMoveDirectionAY4 = 0,
    let pointerMoveDirectionA4 = 0,
    let pointerMoveDirectionAngle5 = 0,
    let pointerMoveDirectionSpeed5 = 0,
    let pointerMoveDirectionDistance5 = 0,
    let pointerMoveDirectionVX5 = 0,
    let pointerMoveDirectionVY5 = 0,
    let pointerMoveDirectionAX5 = 0,
    let pointerMoveDirectionAY5 = 0,
    let pointerMoveDirectionA5 = 0,
    E = {
      debug: true,
      friction: 0.5,
      trails: 20,
      size: 50,
      dampening: 0.25,
      tension: 0.98,
    };
  function Node() {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
  }

  const renderCanvas = function () {
    ctx = document.getElementById('canvas').getContext('2d');
    ctx.running = true;
    ctx.frame = 1;
    f = new n({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });
    document.addEventListener('mousemove', onMousemove);
    document.addEventListener('touchstart', onMousemove);
    document.body.addEventListener('orientationchange', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('focus', () => {
      if (!ctx.running) {
        ctx.running = true;
        render();
      }
    });
    window.addEventListener('blur', () => {
      ctx.running = true;
    });
    resizeCanvas();
  };

  useEffect(() => {
    renderCanvas();
    return () => {
      ctx.running = false;
      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('touchstart', onMousemove);
      document.body.removeEventListener('orientationchange', resizeCanvas);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('focus', () => {
        if (!ctx.running) {
          ctx.running = true;
          render();
        }
      });
      window.removeEventListener('blur', () => {
        ctx.running = true;
      });
    };
  }, []);
};

export default useCanvasCursor; 