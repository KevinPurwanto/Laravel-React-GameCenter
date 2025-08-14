// import AppLayout from '@/layouts/app-layout';
// import { type BreadcrumbItem } from '@/types';
// import { Head } from '@inertiajs/react';
// import { useEffect, useRef, useState } from 'react';

// const breadcrumbs: BreadcrumbItem[] = [
//     { title: 'LeaderBoard', href: '/dashboard' },
//     { title: 'Flappy Bird', href: '/flappyBird' },
// ];

// export default function FlappyBird() {
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const [score, setScore] = useState(0);
//     const scoreRef = useRef(0);
//     const [gameRunning, setGameRunning] = useState(false);
//     const [gameOver, setGameOver] = useState(false);

//     const bird = useRef({ x: 50, y: 150, w: 34, h: 26, gravity: 0.25, jump: 4.6, speed: 0 });
//     const pipes = useRef<{ x: number; y: number; scored?: boolean }[]>([]);
//     const animationRef = useRef<number>(0);
//     const frames = useRef(0);

//     useEffect(() => {
//         if (!gameRunning) return;
//         const canvas = canvasRef.current!;
//         const ctx = canvas.getContext("2d")!;

//         function draw() {
//             ctx.fillStyle = "#70c5ce";
//             ctx.fillRect(0, 0, canvas.width, canvas.height);

//             // bird
//             ctx.fillStyle = "yellow";
//             ctx.fillRect(bird.current.x, bird.current.y, bird.current.w, bird.current.h);

//             // pipes
//             ctx.fillStyle = "green";
//             pipes.current.forEach(p => {
//                 ctx.fillRect(p.x, p.y, 50, 150);
//                 ctx.fillRect(p.x, p.y + 150 + 120, 50, canvas.height - (p.y + 150 + 120));
//             });

//             // score
//             ctx.fillStyle = "white";
//             ctx.font = "20px Arial";
//             ctx.fillText(`Score: ${scoreRef.current}`, 10, 30);
//         }

//         function update() {
//             bird.current.speed += bird.current.gravity;
//             bird.current.y += bird.current.speed;

//             // spawn pipes
//             if (frames.current % 100 === 0) {
//                 pipes.current.push({
//                     x: canvas.width,
//                     y: Math.floor(Math.random() * 100) - 100,
//                     scored: false
//                 });
//             }

//             // move pipes & detect
//             pipes.current.forEach((p, index) => {
//                 p.x -= 2;

//                 // tambah score saat burung melewati pipa
//                 if (!p.scored && p.x + 50 < bird.current.x) {
//                     p.scored = true;
//                     scoreRef.current += 1;
//                     setScore(scoreRef.current);
//                 }

//                 // hapus pipa keluar layar
//                 if (p.x + 50 < 0) {
//                     pipes.current.splice(index, 1);
//                 }

//                 // collision
//                 if (
//                     bird.current.x < p.x + 50 &&
//                     bird.current.x + bird.current.w > p.x &&
//                     (bird.current.y < p.y + 150 ||
//                         bird.current.y + bird.current.h > p.y + 150 + 120)
//                 ) {
//                     endGame();
//                 }
//             });

//             // out of bounds
//             if (bird.current.y + bird.current.h >= canvas.height || bird.current.y <= 0) {
//                 endGame();
//             }
//         }

//         function loop() {
//             update();
//             draw();
//             frames.current++;
//             animationRef.current = requestAnimationFrame(loop);
//         }

//         function handleClick() {
//             if (gameRunning) {
//                 bird.current.speed = -bird.current.jump;
//             }
//         }

//         canvas.addEventListener("click", handleClick);
//         loop();

//         return () => {
//             cancelAnimationFrame(animationRef.current);
//             canvas.removeEventListener("click", handleClick);
//         };

//     }, [gameRunning]);

//     function startGame() {
//         scoreRef.current = 0;
//         setScore(0);
//         setGameOver(false);
//         setGameRunning(true);
//         bird.current.y = 150;
//         bird.current.speed = 0;
//         pipes.current = [];
//         frames.current = 0;
//     }

//     function endGame() {
//         setGameRunning(false);
//         setGameOver(true);
//         saveScore(scoreRef.current);
//     }

//     function saveScore(finalScore: number) {
//         const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;
//         const username = (document.querySelector('meta[name="username"]') as HTMLMetaElement)?.content;
//         fetch('/api/scores', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRF-TOKEN': csrfToken,
//             },
//             body: JSON.stringify({
//                 player_name: username,
//                 game: 'flappy_bird',
//                 score: finalScore
//             })
//         });
//     }

//     return (
//         <AppLayout breadcrumbs={breadcrumbs}>
//             <Head title="Flappy Bird" />
//             <div className="flex flex-col items-center gap-4 p-4">
//                 <canvas ref={canvasRef} width={400} height={600} className="border"></canvas>

//                 {!gameRunning && !gameOver && (
//                     <button onClick={startGame} className="bg-green-500 px-4 py-2 rounded text-white">
//                         Play
//                     </button>
//                 )}

//                 {gameOver && (
//                     <>
//                         <p className="text-lg font-bold">Game Over! Skor: {scoreRef.current}</p>
//                         <button onClick={startGame} className="bg-blue-500 px-4 py-2 rounded text-white">
//                             Try Again
//                         </button>
//                     </>
//                 )}
//             </div>
//         </AppLayout>
//     );
// }

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'LeaderBoard', href: '/dashboard' },
    { title: 'Flappy Bird', href: '/flappyBird' },
];

export default function FlappyBird() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const scoreRef = useRef(0);
    const [gameRunning, setGameRunning] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const bird = useRef({ x: 50, y: 150, w: 34, h: 26, gravity: 0.25, jump: 4.6, speed: 0 });
    const pipes = useRef<{ x: number; y: number; scored?: boolean }[]>([]);
    const animationRef = useRef<number>(0);
    const frames = useRef(0);

    useEffect(() => {
        if (!gameRunning) return;
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        function draw() {
            ctx.fillStyle = "#70c5ce";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // bird
            ctx.fillStyle = "yellow";
            ctx.fillRect(bird.current.x, bird.current.y, bird.current.w, bird.current.h);

            // pipes
            ctx.fillStyle = "green";
            pipes.current.forEach(p => {
                ctx.fillRect(p.x, p.y, 50, 150);
                ctx.fillRect(p.x, p.y + 150 + 120, 50, canvas.height - (p.y + 150 + 120));
            });

            // score
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.fillText(`Score: ${scoreRef.current}`, 10, 30);
        }

        function update() {
            bird.current.speed += bird.current.gravity;
            bird.current.y += bird.current.speed;

            // spawn pipes
            if (frames.current % 100 === 0) {
                pipes.current.push({
                    x: canvas.width,
                    y: Math.floor(Math.random() * 100) - 100,
                    scored: false
                });
            }

            // move pipes & detect
            pipes.current.forEach((p, index) => {
                p.x -= 2;

                // tambah score saat burung melewati pipa
                if (!p.scored && p.x + 50 < bird.current.x) {
                    p.scored = true;
                    scoreRef.current += 1;
                    setScore(scoreRef.current);
                }

                // hapus pipa keluar layar
                if (p.x + 50 < 0) {
                    pipes.current.splice(index, 1);
                }

                // collision
                if (
                    bird.current.x < p.x + 50 &&
                    bird.current.x + bird.current.w > p.x &&
                    (bird.current.y < p.y + 150 ||
                        bird.current.y + bird.current.h > p.y + 150 + 120)
                ) {
                    endGame();
                }
            });

            // out of bounds
            if (bird.current.y + bird.current.h >= canvas.height || bird.current.y <= 0) {
                endGame();
            }
        }

        function loop() {
            update();
            draw();
            frames.current++;
            animationRef.current = requestAnimationFrame(loop);
        }

        loop();

        return () => {
            cancelAnimationFrame(animationRef.current);
        };

    }, [gameRunning]);

    function handleClickAnywhere() {
        if (gameRunning) {
            bird.current.speed = -bird.current.jump;
        }
    }

    function startGame() {
        scoreRef.current = 0;
        setScore(0);
        setGameOver(false);
        setGameRunning(true);
        bird.current.y = 150;
        bird.current.speed = 0;
        pipes.current = [];
        frames.current = 0;
    }

    function endGame() {
        setGameRunning(false);
        setGameOver(true);
        saveScore(scoreRef.current);
    }

    function saveScore(finalScore: number) {
        const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;
        const username = (document.querySelector('meta[name="username"]') as HTMLMetaElement)?.content;
        fetch('/api/scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify({
                player_name: username,
                game: 'flappy_bird',
                score: finalScore
            })
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Flappy Bird" />
            <div
                className="flex flex-col items-center gap-4 p-4 cursor-pointer"
                onClick={handleClickAnywhere} // klik di mana saja di div ini bisa lompat
            >
                <div className="relative">
                    <canvas ref={canvasRef} width={400} height={600} className="border"></canvas>

                    {/* Tombol Play dan Try Again di tengah canvas */}
                    {!gameRunning && !gameOver && (
                        <button
                            onClick={(e) => { e.stopPropagation(); startGame(); }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 px-4 py-2 rounded text-white"
                        >
                            Play
                        </button>
                    )}

                    {gameOver && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                            <p className="text-lg font-bold text-white drop-shadow-lg">Game Over! Skor: {scoreRef.current}</p>
                            <button
                                onClick={(e) => { e.stopPropagation(); startGame(); }}
                                className="mt-2 bg-blue-500 px-4 py-2 rounded text-white"
                            >
                                Try Again
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
