import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./SnakeGame.module.css";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

const GRID_SIZE = 14;
const CELL_SIZE = 22;
const INITIAL_SPEED = 100;
const SPEED_INCREMENT = 5;

export const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([
    { x: 7, y: 7 },
    { x: 6, y: 7 },
    { x: 5, y: 7 },
    { x: 4, y: 7 },
  ]);
  const [food, setFood] = useState<Position>({ x: 10, y: 7 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const nextDirectionRef = useRef<Direction>("RIGHT");
  const [gameOver, setGameOver] = useState(false);

  // Helper to update next direction without causing re-render
  const setNextDirection = useCallback((dir: Direction) => {
    nextDirectionRef.current = dir;
  }, []);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [particles, setParticles] = useState<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
    }>
  >([]);

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("snakeHighScore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const generateFood = useCallback((snakeBody: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      snakeBody.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    const initialSnake = [
      { x: 7, y: 7 },
      { x: 6, y: 7 },
      { x: 5, y: 7 },
      { x: 4, y: 7 },
    ];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection("RIGHT");
    setNextDirection("RIGHT");
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    setGameStarted(true);
  }, [generateFood]);

  const checkCollision = useCallback(
    (head: Position, body: Position[]): boolean => {
      // Wall collision
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        return true;
      }
      // Self collision
      return body.some(
        (segment) => segment.x === head.x && segment.y === head.y
      );
    },
    []
  );

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return;

    const speed = Math.max(
      50,
      INITIAL_SPEED - Math.floor(score / 5) * SPEED_INCREMENT
    );
    const gameLoop = setInterval(() => {
      const currentDirection = nextDirectionRef.current;
      setDirection(currentDirection);

      setSnake((prevSnake) => {
        const head = prevSnake[0];
        let newHead: Position;

        switch (currentDirection) {
          case "UP":
            newHead = { x: head.x, y: head.y - 1 };
            break;
          case "DOWN":
            newHead = { x: head.x, y: head.y + 1 };
            break;
          case "LEFT":
            newHead = { x: head.x - 1, y: head.y };
            break;
          case "RIGHT":
            newHead = { x: head.x + 1, y: head.y };
            break;
        }

        if (checkCollision(newHead, prevSnake)) {
          setGameOver(true);
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("snakeHighScore", score.toString());
          }
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check if food is eaten
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((prev) => prev + 1);

          // Create particles at food position
          const newParticles = [];
          const computedStyle = getComputedStyle(document.documentElement);
          const dangerColor = computedStyle
            .getPropertyValue("--color-danger")
            .trim();

          for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 * i) / 12;
            newParticles.push({
              x: food.x * CELL_SIZE + CELL_SIZE / 2,
              y: food.y * CELL_SIZE + CELL_SIZE / 2,
              vx: Math.cos(angle) * (2 + Math.random() * 2),
              vy: Math.sin(angle) * (2 + Math.random() * 2),
              life: 1,
              color: dangerColor,
            });
          }
          setParticles(newParticles);

          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(gameLoop);
  }, [
    gameStarted,
    gameOver,
    isPaused,
    food,
    score,
    highScore,
    checkCollision,
    generateFood,
  ]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted && !gameOver) {
        if (
          ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(
            e.key
          )
        ) {
          resetGame();
          return;
        }
      }

      if (e.key === " ") {
        e.preventDefault();
        if (gameOver) {
          resetGame();
        } else if (gameStarted) {
          setIsPaused((prev) => !prev);
        }
        return;
      }

      if (gameOver || isPaused) return;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          if (direction !== "DOWN") setNextDirection("UP");
          break;
        case "ArrowDown":
          e.preventDefault();
          if (direction !== "UP") setNextDirection("DOWN");
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (direction !== "RIGHT") setNextDirection("LEFT");
          break;
        case "ArrowRight":
          e.preventDefault();
          if (direction !== "LEFT") setNextDirection("RIGHT");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameOver, isPaused, gameStarted, resetGame]);

  // Touch controls
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling while playing
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!touchStartRef.current) return;

    if (!gameStarted && !gameOver) {
      resetGame();
      touchStartRef.current = null;
      return;
    }

    if (gameOver) {
      touchStartRef.current = null;
      return;
    }

    if (isPaused) {
      touchStartRef.current = null;
      return;
    }

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const minSwipeDistance = 20; // Reduced for easier swiping

    // Determine if swipe is more horizontal or vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0 && direction !== "LEFT") {
          setNextDirection("RIGHT");
        } else if (deltaX < 0 && direction !== "RIGHT") {
          setNextDirection("LEFT");
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0 && direction !== "UP") {
          setNextDirection("DOWN");
        } else if (deltaY < 0 && direction !== "DOWN") {
          setNextDirection("UP");
        }
      }
    }

    touchStartRef.current = null;
  };

  // Particle animation
  useEffect(() => {
    if (particles.length === 0) return;

    const animationInterval = setInterval(() => {
      setParticles((prevParticles) => {
        return prevParticles
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.2, // Gravity
            life: particle.life - 0.02,
          }))
          .filter((particle) => particle.life > 0);
      });
    }, 16);

    return () => clearInterval(animationInterval);
  }, [particles.length]);

  // Helper function to adjust color brightness
  const adjustColorBrightness = (color: string, amount: number): string => {
    const hex = color.replace("#", "");
    const r = Math.max(
      0,
      Math.min(255, parseInt(hex.substring(0, 2), 16) + amount)
    );
    const g = Math.max(
      0,
      Math.min(255, parseInt(hex.substring(2, 4), 16) + amount)
    );
    const b = Math.max(
      0,
      Math.min(255, parseInt(hex.substring(4, 6), 16) + amount)
    );
    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get computed CSS colors
    const computedStyle = getComputedStyle(document.documentElement);
    const bgColor = computedStyle.getPropertyValue("--color-background").trim();
    const surfaceColor = computedStyle
      .getPropertyValue("--color-surface")
      .trim();
    const borderColor = computedStyle.getPropertyValue("--color-border").trim();
    const primaryColor = computedStyle
      .getPropertyValue("--color-primary")
      .trim();
    const dangerColor = computedStyle.getPropertyValue("--color-danger").trim();

    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, bgColor);
    gradient.addColorStop(1, surfaceColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw subtle grid
    ctx.strokeStyle = borderColor;
    ctx.globalAlpha = 0.15;
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Draw smooth snake with continuous body
    if (snake.length > 0) {
      ctx.save();

      // Draw snake as smooth rounded rectangles forming a continuous body
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;

      // Draw snake body as rounded squares for better cohesion
      snake.forEach((segment, index) => {
        if (index < snake.length - 1) {
          const x = segment.x * CELL_SIZE + CELL_SIZE / 2;
          const y = segment.y * CELL_SIZE + CELL_SIZE / 2;
          const nextSegment = snake[index + 1];
          const nextX = nextSegment.x * CELL_SIZE + CELL_SIZE / 2;
          const nextY = nextSegment.y * CELL_SIZE + CELL_SIZE / 2;

          const segmentColor = primaryColor; // Use same color for entire snake
          const radius = CELL_SIZE / 2 - 1;

          // Calculate angle for connector
          const angle = Math.atan2(nextY - y, nextX - x);
          const perpAngle = angle + Math.PI / 2;
          const connectorWidth = radius * 2;

          // Shadow for connector
          ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
          ctx.shadowBlur = 6;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;

          // Create gradient for connector with better depth
          const connectorGradient = ctx.createLinearGradient(
            x + (Math.cos(perpAngle) * connectorWidth) / 2,
            y + (Math.sin(perpAngle) * connectorWidth) / 2,
            x - (Math.cos(perpAngle) * connectorWidth) / 2,
            y - (Math.sin(perpAngle) * connectorWidth) / 2
          );
          connectorGradient.addColorStop(
            0,
            adjustColorBrightness(segmentColor, -35)
          );
          connectorGradient.addColorStop(
            0.2,
            adjustColorBrightness(segmentColor, -10)
          );
          connectorGradient.addColorStop(0.5, segmentColor);
          connectorGradient.addColorStop(
            0.8,
            adjustColorBrightness(segmentColor, -10)
          );
          connectorGradient.addColorStop(
            1,
            adjustColorBrightness(segmentColor, -35)
          );

          ctx.fillStyle = connectorGradient;
          ctx.beginPath();
          ctx.moveTo(
            x + (Math.cos(perpAngle) * connectorWidth) / 2,
            y + (Math.sin(perpAngle) * connectorWidth) / 2
          );
          ctx.lineTo(
            nextX + (Math.cos(perpAngle) * connectorWidth) / 2,
            nextY + (Math.sin(perpAngle) * connectorWidth) / 2
          );
          ctx.lineTo(
            nextX - (Math.cos(perpAngle) * connectorWidth) / 2,
            nextY - (Math.sin(perpAngle) * connectorWidth) / 2
          );
          ctx.lineTo(
            x - (Math.cos(perpAngle) * connectorWidth) / 2,
            y - (Math.sin(perpAngle) * connectorWidth) / 2
          );
          ctx.closePath();
          ctx.fill();
        }
      });

      // Draw segments on top
      snake.forEach((segment, index) => {
        const x = segment.x * CELL_SIZE + CELL_SIZE / 2;
        const y = segment.y * CELL_SIZE + CELL_SIZE / 2;
        const isHead = index === 0;
        const isTail = index === snake.length - 1;
        const radius = isHead
          ? CELL_SIZE / 2
          : isTail
          ? CELL_SIZE / 2.3
          : CELL_SIZE / 2 - 1;

        // Use same color for entire snake with subtle variation for depth
        const segmentColor = adjustColorBrightness(
          primaryColor,
          -3 * (index % 2)
        );

        // Shadow
        ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;

        // Main body with enhanced 3D gradient
        const bodyGradient = ctx.createRadialGradient(
          x - radius / 2.5,
          y - radius / 2.5,
          0,
          x,
          y,
          radius * 1.2
        );
        bodyGradient.addColorStop(0, adjustColorBrightness(segmentColor, 50));
        bodyGradient.addColorStop(
          0.25,
          adjustColorBrightness(segmentColor, 25)
        );
        bodyGradient.addColorStop(0.6, segmentColor);
        bodyGradient.addColorStop(
          0.85,
          adjustColorBrightness(segmentColor, -25)
        );
        bodyGradient.addColorStop(1, adjustColorBrightness(segmentColor, -45));

        ctx.fillStyle = bodyGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Reset shadow for details
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;

        // Outer rim/border for definition
        ctx.strokeStyle = adjustColorBrightness(segmentColor, -50);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, radius - 0.5, 0, Math.PI * 2);
        ctx.stroke();

        // Scale pattern texture (only on body, not head)
        if (!isHead && index % 2 === 0) {
          ctx.globalAlpha = 0.2;

          // Diamond/hexagon scale pattern
          const scaleSize = radius * 0.4;
          ctx.strokeStyle = adjustColorBrightness(segmentColor, -60);
          ctx.lineWidth = 1;

          for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 3) {
            const sx = x + Math.cos(angle) * scaleSize;
            const sy = y + Math.sin(angle) * scaleSize;
            ctx.beginPath();
            ctx.arc(sx, sy, scaleSize * 0.5, 0, Math.PI * 2);
            ctx.stroke();
          }

          ctx.globalAlpha = 1;
        }

        // Primary highlight (glossy shine)
        const highlight1 = ctx.createRadialGradient(
          x - radius / 2.5,
          y - radius / 2.5,
          0,
          x - radius / 2.5,
          y - radius / 2.5,
          radius * 0.6
        );
        highlight1.addColorStop(0, "rgba(255, 255, 255, 0.7)");
        highlight1.addColorStop(0.5, "rgba(255, 255, 255, 0.3)");
        highlight1.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = highlight1;
        ctx.beginPath();
        ctx.arc(
          x - radius / 2.5,
          y - radius / 2.5,
          radius * 0.6,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Secondary highlight (smaller, brighter)
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(x - radius / 3, y - radius / 3, radius * 0.25, 0, Math.PI * 2);
        ctx.fill();

        // Subtle inner shadow for depth
        ctx.globalAlpha = 0.15;
        const innerShadow = ctx.createRadialGradient(
          x + radius / 3,
          y + radius / 3,
          0,
          x + radius / 3,
          y + radius / 3,
          radius * 0.8
        );
        innerShadow.addColorStop(0, "rgba(0, 0, 0, 0.5)");
        innerShadow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = innerShadow;
        ctx.beginPath();
        ctx.arc(x + radius / 3, y + radius / 3, radius * 0.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      ctx.restore();

      // Draw head details (eyes and mouth)
      const head = snake[0];
      const headX = head.x * CELL_SIZE + CELL_SIZE / 2;
      const headY = head.y * CELL_SIZE + CELL_SIZE / 2;

      // Eyes
      ctx.fillStyle = surfaceColor;
      ctx.strokeStyle = adjustColorBrightness(primaryColor, -40);
      ctx.lineWidth = 1.5;

      const eyeSize = 4;
      const eyeOffset = 5;

      let leftEyeX = headX - eyeOffset;
      let leftEyeY = headY - eyeOffset;
      let rightEyeX = headX + eyeOffset;
      let rightEyeY = headY - eyeOffset;

      if (direction === "DOWN") {
        leftEyeX = headX - eyeOffset;
        leftEyeY = headY + eyeOffset;
        rightEyeX = headX + eyeOffset;
        rightEyeY = headY + eyeOffset;
      } else if (direction === "LEFT") {
        leftEyeX = headX - eyeOffset;
        leftEyeY = headY - eyeOffset;
        rightEyeX = headX - eyeOffset;
        rightEyeY = headY + eyeOffset;
      } else if (direction === "RIGHT") {
        leftEyeX = headX + eyeOffset;
        leftEyeY = headY - eyeOffset;
        rightEyeX = headX + eyeOffset;
        rightEyeY = headY + eyeOffset;
      }

      // Draw eyes with pupils
      [
        { x: leftEyeX, y: leftEyeY },
        { x: rightEyeX, y: rightEyeY },
      ].forEach((eye) => {
        ctx.beginPath();
        ctx.arc(eye.x, eye.y, eyeSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Pupil
        ctx.fillStyle = adjustColorBrightness(primaryColor, -60);
        ctx.beginPath();
        ctx.arc(eye.x, eye.y, eyeSize / 2, 0, Math.PI * 2);
        ctx.fill();

        // Eye shine
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        ctx.arc(eye.x - 1, eye.y - 1, eyeSize / 3, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Draw apple with pulsing animation
    const time = Date.now() / 1000;
    const pulse = Math.sin(time * 3) * 0.08 + 1;
    const appleSize = (CELL_SIZE / 2 - 1) * pulse;
    const appleX = food.x * CELL_SIZE + CELL_SIZE / 2;
    const appleY = food.y * CELL_SIZE + CELL_SIZE / 2;

    ctx.save();

    // Apple shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 3;

    // Apple body with gradient
    const appleGradient = ctx.createRadialGradient(
      appleX - appleSize / 3,
      appleY - appleSize / 3,
      0,
      appleX,
      appleY,
      appleSize
    );
    appleGradient.addColorStop(0, adjustColorBrightness(dangerColor, 50));
    appleGradient.addColorStop(0.5, dangerColor);
    appleGradient.addColorStop(1, adjustColorBrightness(dangerColor, -30));

    ctx.fillStyle = appleGradient;
    ctx.beginPath();
    ctx.arc(appleX, appleY, appleSize, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Stem
    ctx.strokeStyle = adjustColorBrightness(dangerColor, -70);
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(appleX, appleY - appleSize);
    ctx.lineTo(appleX + 2, appleY - appleSize - 5);
    ctx.stroke();

    // Leaf
    ctx.fillStyle = "#4CAF50";
    ctx.beginPath();
    ctx.ellipse(
      appleX + 5,
      appleY - appleSize - 2,
      4,
      2.5,
      Math.PI / 4,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Leaf vein
    ctx.strokeStyle = adjustColorBrightness("#4CAF50", -30);
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(appleX + 3, appleY - appleSize - 2);
    ctx.lineTo(appleX + 6, appleY - appleSize - 2);
    ctx.stroke();

    // Apple highlight
    const appleShine = ctx.createRadialGradient(
      appleX - appleSize / 3,
      appleY - appleSize / 3,
      0,
      appleX - appleSize / 3,
      appleY - appleSize / 3,
      appleSize / 2.5
    );
    appleShine.addColorStop(0, "rgba(255, 255, 255, 0.7)");
    appleShine.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.fillStyle = appleShine;
    ctx.beginPath();
    ctx.arc(
      appleX - appleSize / 3,
      appleY - appleSize / 3,
      appleSize / 2.5,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw particles
    particles.forEach((particle) => {
      const particleGradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        4
      );
      particleGradient.addColorStop(0, particle.color);
      particleGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.globalAlpha = particle.life;
      ctx.fillStyle = particleGradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 4 * particle.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    // Request animation frame for smooth food pulsing
    const animationId = requestAnimationFrame(() => {
      // Trigger re-render for animation
    });
    return () => cancelAnimationFrame(animationId);
  }, [snake, food, direction, particles]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.scoreBoard}>
          <div className={styles.scoreItem}>
            <span className={styles.label}>Score</span>
            <span className={styles.value}>{score}</span>
          </div>
          <div className={styles.scoreItem}>
            <span className={styles.label}>High Score</span>
            <span className={styles.value}>{highScore}</span>
          </div>
        </div>
      </div>

      <div className={styles.gameArea}>
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className={styles.canvas}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />

        {!gameStarted && !gameOver && (
          <div className={styles.overlay}>
            <div className={styles.message}>
              <h2>Snake Game</h2>
              <p className={styles.objective}>
                Eat the apple to grow. Don't hit the walls or yourself!
              </p>
              <div className={styles.controls}>
                <p>🎮 Desktop: Arrow keys to move, Space to pause</p>
                <p>📱 Mobile: Use buttons below to control</p>
              </div>
              <p className={styles.startPrompt}>
                Press any arrow key or tap UP button to start
              </p>
            </div>
          </div>
        )}

        {isPaused && !gameOver && (
          <div className={styles.overlay}>
            <div className={styles.message}>
              <h2>Paused</h2>
              <p>Press Space to continue</p>
            </div>
          </div>
        )}

        {gameOver && (
          <div className={styles.overlay}>
            <div className={styles.message}>
              <h2>Game Over!</h2>
              <p className={styles.finalScore}>Score: {score}</p>
              {score === highScore && score > 0 && (
                <p className={styles.newRecord}>🎉 New High Score!</p>
              )}
              <button onClick={resetGame} className={styles.button}>
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Controls */}
      <div className={styles.mobileControls}>
        <div className={styles.controlsGrid}>
          <div className={styles.controlRow}>
            <button
              className={styles.controlButton}
              onClick={() => {
                if (!gameStarted && !gameOver) {
                  resetGame();
                } else if (!gameOver && !isPaused && direction !== "DOWN") {
                  setNextDirection("UP");
                }
              }}
              aria-label="Move up"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 14l5-5 5 5z" />
              </svg>
            </button>
          </div>
          <div className={styles.controlRow}>
            <button
              className={styles.controlButton}
              onClick={() => {
                if (!gameOver && !isPaused && direction !== "RIGHT") {
                  setNextDirection("LEFT");
                }
              }}
              aria-label="Move left"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14 7l-5 5 5 5z" />
              </svg>
            </button>
            <button
              className={styles.controlButton}
              onClick={() => {
                if (!gameOver && !isPaused && direction !== "UP") {
                  setNextDirection("DOWN");
                }
              }}
              aria-label="Move down"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>
            <button
              className={styles.controlButton}
              onClick={() => {
                if (!gameOver && !isPaused && direction !== "LEFT") {
                  setNextDirection("RIGHT");
                }
              }}
              aria-label="Move right"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M10 7l5 5-5 5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
