import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Star } from "lucide-react";

export type ParticleShape = "circle" | "heart" | "star";

interface FloatingParticlesProps {
  count?: number;
  colors?: string[];
  shape?: ParticleShape;
  minSize?: number;
  maxSize?: number;
  speed?: "slow" | "normal";
  opacity?: number;
}

export function FloatingParticles({
  count = 15,
  colors = ["#ffffff"],
  shape = "circle",
  minSize = 4,
  maxSize = 12,
  speed = "normal",
  opacity = 0.5,
}: FloatingParticlesProps) {
  const prefersReducedMotion = useReducedMotion();
  const [particles, setParticles] = useState<Array<{
    id: number;
    color: string;
    left: string;
    size: number;
    duration: number;
    delay: number;
    xTarget: string;
  }>>([]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      color: colors[i % colors.length],
      left: `${Math.random() * 100}%`,
      size: Math.random() * (maxSize - minSize) + minSize,
      duration: (Math.random() * 8 + 12) * (speed === "slow" ? 1.5 : 1), // slow, smooth drift upwards
      delay: Math.random() * 10, // stagger the initial start
      xTarget: `${Math.random() * 20 - 10}vw`,
    }));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(newParticles);
  }, [count, colors, minSize, maxSize, speed, prefersReducedMotion]);

  if (prefersReducedMotion || particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: p.left,
            top: "110%", // start safely below the screen
            opacity,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ["0vh", "-130vh"], // drift up well past the top
            x: ["0vw", p.xTarget],
            rotate: shape === "circle" ? 0 : [0, 360],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        >
          {shape === "circle" && (
            <div
              style={{ backgroundColor: p.color }}
              className="w-full h-full rounded-full"
            />
          )}
          {shape === "heart" && (
            <Heart 
              style={{ color: p.color, fill: p.color }} 
              width={p.size} 
              height={p.size} 
              strokeWidth={0} 
            />
          )}
          {shape === "star" && (
            <Star 
              style={{ color: p.color, fill: p.color }} 
              width={p.size} 
              height={p.size} 
              strokeWidth={0} 
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
