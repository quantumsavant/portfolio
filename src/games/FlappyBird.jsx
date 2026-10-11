import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Crown } from 'lucide-react';

const W = 400;
const H = 560;
const BEST_KEY = 'fb-best';
const GRAV = 1500;
const FLAP = -430;
const PIPE_W = 68;
const GAP = 155;
const SPACING = 230;

function getBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY) || 0);
  } catch {
    return 0;
  }
}

export default function FlappyBird() {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState('menu'); // menu | playing | over
  const [best, setBest] = useState(getBest);
  const [finalScore, setFinalScore] = useState(0);
  const apiRef = useRef(null);

  const start = () => {
    setPhase('playing');
    apiRef.current?.startGame();
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
      bird: { y: H * 0.42, vy: 0, rot: 0 },
      pipes: [],
      score: 0,
      speed: 165,
      last: 0,
      raf: 0,
      dead: false,
      overAt: 0,
    };

    const reset = () => {
      G.bird.y = H * 0.42;
      G.bird.vy = 0;
      G.bird.rot = 0;
      G.pipes = [];
      G.score = 0;
      G.speed = 165;
      G.dead = false;
      G.last = performance.now();
      spawnPipe(W + 60);
      spawnPipe(W + 60 + SPACING);
    };

    const spawnPipe = (x) => {
      const margin = 70;
      const gapY = margin + Math.random() * (H - margin * 2 - GAP - 90);
      G.pipes.push({ x, gapY, scored: false });
    };

    const flap = () => {
      if (!G.running || G.dead) return;
      G.bird.vy = FLAP;
    };

    apiRef.current = {
      startGame() {
        reset();
        G.running = true;
      },
      flap,
    };

    const onKeyDown = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        flap();
      }
    };
    const onPointerDown = (e) => {
      e.preventDefault();
      if (!G.running) return;
      if (G.dead) {
        if (performance.now() - G.overAt > 400) {
          // handled by React overlay button instead; ignore
        }
        return;
      }
      flap();
    };

    window.addEventListener('keydown', onKeyDown);
    canvas.addEventListener('pointerdown', onPointerDown);

    const birdX = 110;
    const birdR = 16;

    const collide = (p) => {
      const inX = birdX + birdR > p.x && birdX - birdR < p.x + PIPE_W;
      if (!inX) return false;
      return G.bird.y - birdR < p.gapY || G.bird.y + birdR > p.gapY + GAP;
    };

    const drawBird = () => {
      const { y, rot } = G.bird;
      ctx.save();
      ctx.translate(birdX, y);
      ctx.rotate(rot);
      // body
      ctx.fillStyle = '#FFC531';
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, birdR, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // wing
      ctx.fillStyle = '#FF9F1C';
      ctx.beginPath();
      ctx.ellipse(-5, 4, 9, 6, -0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // eye
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(6, -5, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath();
      ctx.arc(8, -5, 3, 0, Math.PI * 2);
      ctx.fill();
      // beak
      ctx.fillStyle = '#FF6F61';
      ctx.beginPath();
      ctx.moveTo(birdR - 2, 1);
      ctx.lineTo(birdR + 8, 5);
      ctx.lineTo(birdR - 2, 9);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    };

    const drawPipe = (p) => {
      ctx.fillStyle = '#34D399';
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 3;
      const capH = 26;
      // top pipe
      ctx.fillRect(p.x, 0, PIPE_W, p.gapY - capH);
      ctx.strokeRect(p.x, 0, PIPE_W, p.gapY - capH);
      ctx.fillRect(p.x - 5, p.gapY - capH, PIPE_W + 10, capH);
      ctx.strokeRect(p.x - 5, p.gapY - capH, PIPE_W + 10, capH);
      // bottom pipe
      const by = p.gapY + GAP;
      ctx.fillRect(p.x, by + capH, PIPE_W, H - by - capH);
      ctx.strokeRect(p.x, by + capH, PIPE_W, H - by - capH);
      ctx.fillRect(p.x - 5, by, PIPE_W + 10, capH);
      ctx.strokeRect(p.x - 5, by, PIPE_W + 10, capH);
    };

    const frame = (now) => {
      const dt = Math.min((now - G.last) / 1000, 0.05);
      G.last = now;

      if (G.running && !G.dead) {
        G.bird.vy += GRAV * dt;
        G.bird.y += G.bird.vy * dt;
        G.bird.rot = Math.max(-0.35, Math.min(1.2, G.bird.vy / 900));

        G.speed = Math.min(165 + G.score * 4, 260);
        for (const p of G.pipes) {
          p.x -= G.speed * dt;
          if (!p.scored && p.x + PIPE_W < birdX) {
            p.scored = true;
            G.score += 1;
          }
        }
        const lastPipe = G.pipes[G.pipes.length - 1];
        if (lastPipe && lastPipe.x < W - SPACING) spawnPipe(lastPipe.x + SPACING);
        G.pipes = G.pipes.filter((p) => p.x > -PIPE_W - 20);

        const hitPipe = G.pipes.some(collide);
        const hitGround = G.bird.y + birdR >= H - 26;
        const hitSky = G.bird.y - birdR <= 0;
        if (hitPipe || hitGround || hitSky) {
          G.dead = true;
          G.overAt = now;
          setFinalScore(G.score);
          setBest((prev) => {
            if (G.score > prev) {
              try {
                localStorage.setItem(BEST_KEY, String(G.score));
              } catch {
                /* ignore */
              }
              return G.score;
            }
            return prev;
          });
          setTimeout(() => setPhase('over'), 550);
        }
      }

      // ---- draw ----
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#BFE3F0');
      sky.addColorStop(1, '#EAF6D9');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);
      // clouds
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      const cloudOff = G.running ? (now / 40) % (W + 160) : 0;
      for (let i = 0; i < 3; i++) {
        const cx = ((i * 210 - cloudOff) % (W + 160) + W + 160) % (W + 160) - 80;
        const cy = 70 + i * 60;
        ctx.beginPath();
        ctx.arc(cx, cy, 22, 0, Math.PI * 2);
        ctx.arc(cx + 22, cy + 4, 17, 0, Math.PI * 2);
        ctx.arc(cx - 22, cy + 5, 15, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const p of G.pipes) drawPipe(p);
      // ground
      ctx.fillStyle = '#D9B36C';
      ctx.fillRect(0, H - 26, W, 26);
      ctx.fillStyle = '#34D399';
      ctx.fillRect(0, H - 26, W, 8);
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, H - 26);
      ctx.lineTo(W, H - 26);
      ctx.stroke();

      if (G.running) drawBird();

      // score
      if (G.running) {
        ctx.fillStyle = '#1a1a1a';
        ctx.font = '900 44px "Arial Black", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#F5EFE6';
        ctx.lineWidth = 6;
        ctx.strokeText(String(G.score), W / 2, 70);
        ctx.fillText(String(G.score), W / 2, 70);
      }

      G.raf = requestAnimationFrame(frame);
    };
    G.raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(G.raf);
      window.removeEventListener('keydown', onKeyDown);
      canvas.removeEventListener('pointerdown', onPointerDown);
      apiRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {phase === 'menu' && (
        <div className="text-center py-6">
          <p className="font-hand text-3xl font-bold text-inksoft mb-2">flap like your rent depends on it</p>
          <p className="font-medium text-inksoft mb-6 max-w-md mx-auto">
            Tap, click, or press Space to flap. Thread the pipes. Don't kiss
            the ground.
          </p>
          <button onClick={start} className="btn-chunky bg-sun text-lg">
            <Play size={20} strokeWidth={2.75} /> Take flight
          </button>
          {best > 0 && (
            <p className="mt-4 font-bold text-inksoft flex items-center justify-center gap-2">
              <Crown size={18} className="text-sun" strokeWidth={2.75} /> Best: {best}
            </p>
          )}
        </div>
      )}

      {(phase === 'playing' || phase === 'over') && (
        <div className="relative mx-auto" style={{ maxWidth: 400 }}>
          <canvas
            ref={canvasRef}
            style={{ width: '100%', aspectRatio: '400 / 560', touchAction: 'none' }}
            className="block rounded-xl border-[3px] border-ink shadow-hard"
            aria-label="Flappy Bird game — tap to flap"
          />
          {phase === 'over' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="clipping p-6 text-center mx-4">
                <p className="font-display font-extrabold text-4xl">Splat! {finalScore}</p>
                <p className="font-hand text-3xl font-bold mt-1 text-coral">
                  {finalScore >= best && finalScore > 0
                    ? 'new record! gravity is furious.'
                    : finalScore === 0
                      ? 'zero pipes. the bird believes in you anyway.'
                      : 'so close. the pipes are laughing.'}
                </p>
                <p className="mt-2 font-bold text-inksoft flex items-center justify-center gap-2">
                  <Crown size={18} className="text-sun" strokeWidth={2.75} /> Best: {best}
                </p>
                <button onClick={start} className="btn-chunky bg-sun text-lg mt-5">
                  <RotateCcw size={20} strokeWidth={2.75} /> Flap again
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
