import { useEffect } from 'react';

interface Oscillator {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;
  init(e: Partial<Oscillator>): void;
  update(): number;
  value(): number;
}

interface NodeType {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface LineType {
  spring: number;
  friction: number;
  nodes: NodeType[];
  init(e: { spring: number }): void;
  update(): void;
  draw(): void;
}

type CanvasCtx = CanvasRenderingContext2D & { running?: boolean; frame?: number };

const useCanvasCursor = () => {
  function n(this: Oscillator, e?: Partial<Oscillator>) {
    this.init(e || {});
  }
  n.prototype = {
    init: function (this: Oscillator, e: Partial<Oscillator>) {
      this.phase = e.phase || 0;
      this.offset = e.offset || 0;
      this.frequency = e.frequency || 0.001;
      this.amplitude = e.amplitude || 1;
    },
    update: function (this: Oscillator) {
      this.phase += this.frequency;
      return this.offset + Math.sin(this.phase) * this.amplitude;
    },
    value: function (this: Oscillator) {
      return this.offset + Math.sin(this.phase) * this.amplitude;
    },
  };

  function Node(this: NodeType) {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
  }

  function Line(this: LineType, e?: { spring: number }) {
    this.init(e || { spring: 0.4 });
  }

  Line.prototype = {
    init: function (this: LineType, e: { spring: number }) {
      this.spring = e.spring + 0.1 * Math.random() - 0.02;
      this.friction = E.friction + 0.01 * Math.random() - 0.002;
      this.nodes = [];
      for (let t: NodeType, n = 0; n < E.size; n++) {
        t = new (Node as unknown as { new (): NodeType })();
        t.x = pos.x;
        t.y = pos.y;
        this.nodes.push(t);
      }
    },
    update: function (this: LineType) {
      let e = this.spring,
        t = this.nodes[0];
      t.vx += (pos.x - t.x) * e;
      t.vy += (pos.y - t.y) * e;
      for (let n: NodeType, i = 0, a = this.nodes.length; i < a; i++) {
        t = this.nodes[i];
        if (i > 0) {
          n = this.nodes[i - 1];
          t.vx += (n.x - t.x) * e;
          t.vy += (n.y - t.y) * e;
          t.vx += n.vx * E.dampening;
          t.vy += n.vy * E.dampening;
        }
        t.vx *= this.friction;
        t.vy *= this.friction;
        t.x += t.vx;
        t.y += t.vy;
        e *= E.tension;
      }
    },
    draw: function (this: LineType) {
      let e: NodeType,
        t: NodeType,
        n = this.nodes[0].x,
        i = this.nodes[0].y;
      ctx.beginPath();
      ctx.moveTo(n, i);
      for (let a = 1, o = this.nodes.length - 2; a < o; a++) {
        e = this.nodes[a];
        t = this.nodes[a + 1];
        n = 0.5 * (e.x + t.x);
        i = 0.5 * (e.y + t.y);
        ctx.quadraticCurveTo(e.x, e.y, n, i);
      }
      e = this.nodes[this.nodes.length - 2];
      t = this.nodes[this.nodes.length - 1];
      ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
      ctx.stroke();
      ctx.closePath();
    },
  };

  function onMousemove(e: MouseEvent | TouchEvent) {
    function o() {
      lines = [];
      for (let e = 0; e < E.trails; e++)
        lines.push(new (Line as unknown as { new (e: { spring: number }): LineType })({ spring: 0.4 + (e / E.trails) * 0.025 }));
    }
    function c(e: MouseEvent | TouchEvent) {
      if ('touches' in e) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      } else {
        pos.x = e.clientX;
        pos.y = e.clientY;
      }
      e.preventDefault();
    }
    function l(e: TouchEvent) {
      if (e.touches.length === 1) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      }
    }
    document.removeEventListener('mousemove', onMousemove);
    document.removeEventListener('touchstart', onMousemove);
    document.addEventListener('mousemove', c);
    document.addEventListener('touchmove', c);
    document.addEventListener('touchstart', l);
    c(e);
    o();
    render();
  }

  function render() {
    if (ctx.running) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = 'hsla(' + Math.round(f.update()) + ',50%,50%,0.2)';
      ctx.lineWidth = 1;
      for (let t = 0; t < E.trails; t++) {
        const e = lines[t];
        e.update();
        e.draw();
      }
      ctx.frame!++;
      window.requestAnimationFrame(render);
    }
  }

  function resizeCanvas() {
    ctx.canvas.width = window.innerWidth - 20;
    ctx.canvas.height = window.innerHeight;
  }

  let ctx: CanvasCtx,
    f: Oscillator,
    lines: LineType[] = [];
  const pos: { x: number; y: number } = { x: 0, y: 0 };
  const E = {
    debug: true,
    friction: 0.5,
    trails: 20,
    size: 50,
    dampening: 0.25,
    tension: 0.98,
  } as const;

  const renderCanvas = function () {
    ctx = (document.getElementById('canvas') as HTMLCanvasElement).getContext('2d') as CanvasCtx;
    ctx.running = true;
    ctx.frame = 1;
    f = new (n as unknown as { new (e: Partial<Oscillator>): Oscillator })({
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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useCanvasCursor;