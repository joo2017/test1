import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  duration?: number; // Duration in ms before stopping emission
}

export const Confetti: React.FC<ConfettiProps> = ({ duration = 6000 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isEmittingRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    const colors = ['#ec4899', '#8b5cf6', '#facc15', '#3b82f6', '#ffffff']; // K-pop theme colors

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        dx: Math.random() * 4 - 2,
        dy: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        tilt: Math.random() * 10,
        tiltAngle: Math.random() * 10,
        tiltAngleIncrement: Math.random() * 0.1 + 0.05,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.2
      });
    }

    // Stop emitting new particles after duration
    const stopTimeout = setTimeout(() => {
      isEmittingRef.current = false;
    }, duration);

    let animationId: number;

    const draw = () => {
      // Clear with slight transparency for trail effect (optional, strictly clear here)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let activeParticles = 0;

      particles.forEach((p) => {
        // Only update visible particles
        if (p.y <= canvas.height + 20) {
            activeParticles++;
            p.tiltAngle += p.tiltAngleIncrement;
            p.y += p.dy;
            p.x += Math.sin(p.tiltAngle) * 0.5; // Sway
            p.rotation += p.rotationSpeed;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            
            ctx.restore();
        }

        // Recycle logic
        if (p.y > canvas.height) {
           if (isEmittingRef.current) {
               p.y = -20;
               p.x = Math.random() * canvas.width;
               p.dy = Math.random() * 4 + 2;
           } 
           // If not emitting, particle just stays below canvas (effectively removed from view)
        }
      });

      // Stop animation loop if not emitting and no active particles (mostly off screen)
      if (!isEmittingRef.current && activeParticles === 0) {
        cancelAnimationFrame(animationId);
        return;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(stopTimeout);
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [duration]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[100]" />;
};