import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Crown, ArrowUp } from 'lucide-react';

const W = 400;
const H = 600;
const ROAD_LEFT = 60;
const ROAD_RIGHT = W - 60;
const BEST_KEY = 'br-best';

const CAR_COLORS = ['#FF6F61', '#53A8FF', '#FFC531', '#34D399', '#A78BFA', '#F9A8D4'];

function getBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY) || 0);
  } catch {
    return 0;
  }
}

function drawBike(ctx, x, y) {
  ctx.save();
  ctx.translate(x, y);
  // shadow
  ctx.fillStyle = 'rgba(20,20,20,0.18)';
  ctx.beginPath();
  ctx.ellipse(0, 2, 16, 34, 0, 0, Math.PI * 2);
  ctx.fill();
  // wheels
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.ellipse(0, -22, 7, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(0, 22, 7, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  // frame
  ctx.strokeStyle = '#FF6F61';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, -14);
  ctx.lineTo(0, 10);
  ctx.moveTo(0, 10);
  ctx.lineTo(9, -6);
  ctx.moveTo(-8, -14);
  ctx.lineTo(8, -14);
  ctx.stroke();
  // rider
  ctx.fillStyle = '#FFC531';
  ctx.beginPath();
  ctx.arc(0, -2, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.restore();
}

function drawCar(ctx, c) {
  ctx.save();
  ctx.translate(c.x, c.y);
  ctx.fillStyle = 'rgba(20,20,20,0.18)';
  ctx.beginPath();
  ctx.ellipse(0, 3, 20, 42, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = c.color;
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = 3;
  // body (rounded rect)
  const w = 40;
  const h = 78;
  ctx.beginPath();
  ctx.roundRect(-w / 2, -h / 2, w, h, 10);
  ctx.fill();
  ctx.stroke();
  // windshield + roof
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.beginPath();
  ctx.roundRect(-14, -h / 2 + 8, 28, 16, 5);
  ctx.fill();
  ctx.fillStyle = c.color;
  ctx.globalAlpha = 0.55;
  ctx.beginPath();
  ctx.roundRect(-14, -6, 28, 18, 5);
  ctx.fill();
  ctx.globalAlpha = 1;
  // headlights
  ctx.fillStyle = '#FFF6C9';
  ctx.beginPath();
  ctx.arc(-11, h / 2 - 6, 5, 0, Math.PI * 2);
  ctx.arc(11, h / 2 - 6, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export default function BikeRush() {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState('menu'); // menu | playing | over
  const [best, setBest] = useState(getBest);
  const [finalScore, setFinalScore] = useState(0);
  const gameRef = useRef(null);

  const start = () => {
    setPhase('playing');
    gameRef.current?.startGame();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const G = {
      running: false,
      player: { x: W / 2, y: H - 110 },
      cars: [],
      spawnT: 0,
      dist: 0,
      speed: 260,
      boost: false,
      steer: 0, // -1 left, 0 none, 1 right
      dashOff: 0,
      last: 0,
      raf: 0,
    };
    gameRef.current = {
      startGame() {
        G.running = true;
        G.player.x = W / 2;
        G.cars = [];
        G.dist = 0;
        G.speed = 260;
        G.spawnT = 0.4;
        G.boost = false;
        G.steer = 0;
        G.last = performance.now();
      },
      stop() {
        G.running = false;
      },
      setBoost(on) {
        G.boost = on;
      },
    };

    const onKeyDown = (e) => {
      if (e.repeat) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') G.steer = -1;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') G.steer = 1;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') G.boost = true;
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', ' '].includes(e.key)) e.preventDefault();
    };
    const onKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        if (G.steer === -1) G.steer = 0;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        if (G.steer === 1) G.steer = 0;
      }
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') G.boost = false;
    };

    const canvasX = (clientX) => {
      const r = canvas.getBoundingClientRect();
      return ((clientX - r.left) / r.width) * W;
    };
    const onPointerDown = (e) => {
      if (!G.running) return;
      const x = canvasX(e.clientX);
      G.steer = x < W / 2 ? -1 : 1;
      canvas.setPointerCapture?.(e.pointerId);
    };
    const onPointerUp = () => {
      if (!G.running) return;
      G.steer = 0;
    };
    const onPointerCancel = onPointerUp;

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerCancel);

    const spawnCar = () => {
      const w = 44;
      const x = ROAD_LEFT + w / 2 + Math.random() * (ROAD_RIGHT - ROAD_LEFT - w);
      const carSpeed = G.speed * (0.45 + Math.random() * 0.3);
      G.cars.push({
        x,
        y: -60,
        speed: carSpeed,
        color: CAR_COLORS[Math.floor(Math.random() * CAR_COLORS.length)],
      });
    };

    const hit = (a, b) =>
      Math.abs(a.x - b.x) < 34 && Math.abs(a.y - b.y) < 62;

    const frame = (now) => {
      const dt = Math.min((now - G.last) / 1000, 0.05);
      G.last = now;

      if (G.running) {
        const target = G.boost ? 520 : 260 + Math.min(G.dist / 40, 220);
        G.speed += (target - G.speed) * Math.min(dt * 2.5, 1);
        const px = 340 * dt;
        G.player.x += G.steer * px;
        G.player.x = Math.max(ROAD_LEFT + 22, Math.min(ROAD_RIGHT - 22, G.player.x));

        G.dashOff = (G.dashOff + G.speed * dt) % 60;
        G.dist += (G.speed * dt) / 12;

        G.spawnT -= dt;
        const interval = Math.max(0.32, 0.95 - G.dist / 900) / (G.boost ? 1.6 : 1);
        if (G.spawnT <= 0) {
          spawnCar();
          if (G.dist > 500 && Math.random() < 0.35) spawnCar();
          G.spawnT = interval;
        }

        for (const c of G.cars) c.y += (G.speed - c.speed) * dt * 0.9 + c.speed * dt * 0.25;
        G.cars = G.cars.filter((c) => c.y < H + 80);

        for (const c of G.cars) {
          if (hit(G.player, c)) {
            G.running = false;
            const score = Math.floor(G.dist);
            setFinalScore(score);
            setBest((prev) => {
              if (score > prev) {
                try {
                  localStorage.setItem(BEST_KEY, String(score));
                } catch {
                  /* ignore */
                }
                return score;
              }
              return prev;
            });
            setPhase('over');
            break;
          }
        }
      }

      // ---- draw ----
      ctx.clearRect(0, 0, W, H);
      // grass
      ctx.fillStyle = '#CDE8B5';
      ctx.fillRect(0, 0, W, H);
      // road
      ctx.fillStyle = '#4A4A4A';
      ctx.fillRect(ROAD_LEFT - 14, 0, ROAD_RIGHT - ROAD_LEFT + 28, H);
      ctx.fillStyle = '#5C5C5C';
      ctx.fillRect(ROAD_LEFT, 0, ROAD_RIGHT - ROAD_LEFT, H);
      // edges
      ctx.fillStyle = '#FFC531';
      ctx.fillRect(ROAD_LEFT - 14, 0, 6, H);
      ctx.fillRect(ROAD_RIGHT + 8, 0, 6, H);
      // lane dashes
      ctx.fillStyle = '#F5EFE6';
      for (let y = -60 + G.dashOff; y < H + 60; y += 60) {
        ctx.fillRect(W / 2 - 4, y, 8, 30);
      }
      // speed lines when boosting
      if (G.running && G.boost) {
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 3;
        for (let i = 0; i < 8; i++) {
          const y = ((i * 97 + G.dashOff * 2) % (H + 80)) - 40;
          ctx.beginPath();
          ctx.moveTo(ROAD_LEFT + 8, y);
          ctx.lineTo(ROAD_LEFT + 8, y + 46);
          ctx.moveTo(ROAD_RIGHT - 8, y);
          ctx.lineTo(ROAD_RIGHT - 8, y + 46);
          ctx.stroke();
        }
      }

      for (const c of G.cars) drawCar(ctx, c);
      if (G.running || phase === 'over') drawBike(ctx, G.player.x, G.player.y);

      // HUD
      if (G.running) {
        ctx.fillStyle = '#1a1a1a';
        ctx.font = '900 26px "Arial Black", Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${Math.floor(G.dist)} m`, 16, 36);
        ctx.font = '700 15px Arial, sans-serif';
        ctx.fillStyle = '#3a3a3a';
        ctx.fillText(`BEST ${Math.max(best, Math.floor(G.dist))} m`, 16, 60);
        if (G.boost) {
          ctx.fillStyle = '#FF6F61';
          ctx.font = '900 20px "Arial Black", Arial, sans-serif';
          ctx.textAlign = 'right';
          ctx.fillText('BOOST!', W - 16, 36);
        }
      }

      G.raf = requestAnimationFrame(frame);
    };
    G.raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(G.raf);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerCancel);
      gameRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {phase === 'menu' && (
        <div className="text-center py-6">
          <p className="font-hand text-3xl font-bold text-inksoft mb-2">dodge the traffic, feel the wind</p>
          <p className="font-medium text-inksoft mb-6 max-w-md mx-auto">
            Steer with ← → or A / D — hold the left / right half of the road on
            touch. Hold ↑ or BOOST for extra speed (and extra danger).
          </p>
          <button onClick={start} className="btn-chunky bg-sun text-lg">
            <Play size={20} strokeWidth={2.75} /> Start engines
          </button>
          {best > 0 && (
            <p className="mt-4 font-bold text-inksoft flex items-center justify-center gap-2">
              <Crown size={18} className="text-sun" strokeWidth={2.75} /> Best: {best} m
            </p>
          )}
        </div>
      )}

      {(phase === 'playing' || phase === 'over') && (
        <div className="relative mx-auto" style={{ maxWidth: 400 }}>
          <canvas
            ref={canvasRef}
            style={{ width: '100%', aspectRatio: '400 / 600', touchAction: 'none' }}
            className="block rounded-xl border-[3px] border-ink shadow-hard bg-[#CDE8B5]"
            aria-label="Bike Rush game"
          />
          {phase === 'playing' && (
            <button
              onPointerDown={(e) => {
                e.preventDefault();
                gameRef.current?.setBoost(true);
              }}
              onPointerUp={() => gameRef.current?.setBoost(false)}
              onPointerLeave={() => gameRef.current?.setBoost(false)}
              onPointerCancel={() => gameRef.current?.setBoost(false)}
              className="btn-chunky bg-coral text-white !py-2 !px-5 text-[15px] absolute bottom-4 right-4 select-none"
              style={{ touchAction: 'none' }}
              aria-label="Hold for speed boost"
            >
              <ArrowUp size={17} strokeWidth={2.75} /> BOOST
            </button>
          )}
        </div>
      )}

      {phase === 'over' && (
        <div className="text-center py-5">
          <p className="font-display font-extrabold text-4xl">Crash! {finalScore} m</p>
          <p className="font-hand text-3xl font-bold mt-1 text-coral">
            {finalScore >= best && finalScore > 0
              ? 'new record! the traffic fears you.'
              : 'the traffic sends its regards. retry?'}
          </p>
          {best > 0 && (
            <p className="mt-2 font-bold text-inksoft flex items-center justify-center gap-2">
              <Crown size={18} className="text-sun" strokeWidth={2.75} /> Best: {best} m
            </p>
          )}
          <button onClick={start} className="btn-chunky bg-sun text-lg mt-5">
            <RotateCcw size={20} strokeWidth={2.75} /> Ride again
          </button>
        </div>
      )}
    </div>
  );
}
