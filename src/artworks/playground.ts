//@ts-check

import { getRandomInt, radians} from '../lib/math';
import { ArtWork } from '../types/index';

const artwork = (): ArtWork => {
    let currentAnimationFrame = null;

    const run = (canvas: HTMLCanvasElement) => {
        if (currentAnimationFrame) {
            window.cancelAnimationFrame(currentAnimationFrame);
        }
        const context = canvas.getContext("2d");
        const size = canvas.width;
        const COLUMN_COUNT = 20;
        const CELL_SIZE = size/COLUMN_COUNT;

        const clear = (ctx) => ctx.clearRect(0, 0, size, size);
        
        clear(context);
        const HRL_COLORS_PALETTES = [
            // 540d6e-ee4266-ffd23f-3bceac-0ead69
            [{
                    h: 198,
                    s: 63,
                    l: 38
                },
                {
                    h: 170,
                    s: 40,
                    l: 60
                },
                {
                    h: 139,
                    s: 36,
                    l: 78
                },
                {
                    h: 71,
                    s: 100,
                    l: 87
                },
                {
                    h: 344,
                    s: 100,
                    l: 54
                }
            ],
            [{
                    h: 309,
                    s: 51,
                    l: 90
                },
                {
                    h: 350,
                    s: 21,
                    l: 78
                },
                {
                    h: 325,
                    s: 26,
                    l: 52
                },
                {
                    h: 296,
                    s: 39,
                    l: 31
                },
                {
                    h: 237,
                    s: 63,
                    l: 15
                }
            ],
            [{
                    h: 352,
                    s: 70,
                    l: 70
                },
                {
                    h: 13,
                    s: 90,
                    l: 58
                },
                {
                    h: 248,
                    s: 31,
                    l: 23
                },
                {
                    h: 173,
                    s: 70,
                    l: 35
                },
                {
                    h: 71,
                    s: 58,
                    l: 64
                }
            ],
            [{
                    h: 284,
                    s: 79,
                    l: 24
                },
                {
                    h: 347,
                    s: 83,
                    l: 60
                },
                {
                    h: 46,
                    s: 100,
                    l: 62
                },
                {
                    h: 166,
                    s: 60,
                    l: 52
                },
                {
                    h: 154,
                    s: 85,
                    l: 37
                }
            ],
            [{
                h: 198,
                s: 63,
                l: 38
            },
            {
                h: 170,
                s: 40,
                l: 60
            }
        ],

        ];
        const colors = HRL_COLORS_PALETTES[3].map(color => `hsl(${color.h}, ${color.s}%, ${color.l}%, 1)`);

        const drawDebugCirle = (ctx, point) => {
            ctx.beginPath();
            ctx.arc(point[0], point[1], 3, 0, 2 * Math.PI);
            ctx.fill();
        }

        /**
         * 
         * @param {number} r 
         * @param {number} a 
         * @param {number} x 
         * @param {number} y 
         */
        const getCirclePointByAngle = (r, a, x, y) => {
            return [
                x + (r * Math.cos(radians(a))),
                y + (r * Math.sin(radians(a)))
            ]
        }

        /**
         * 
         * @param {CanvasRenderingContext2D} ctx 
         * @param {number} x 
         * @param {number} y 
         * @param {number} radius 
         * @param {number} sides 
         * @param {number} offest 
         * @param {string} color 
         */
        const drawPolygon = (ctx, x, y, radius, sides, offest = 0, color = 'rgba(255, 0, 0, 0.1)') => {
            const arcAngle = 360/sides;
            ctx.fillStyle = color;
            ctx.beginPath();
    
            for (let i = 0; i <= sides; i++) {
                const point = getCirclePointByAngle(getRandomInt(radius, radius * 1.2), (i * arcAngle) + offest, x, y)
                if (i === 0) {
                    ctx.moveTo(point[0], point[1]);
                }
    
                ctx.lineTo(point[0], point[1]);
            }
            ctx.fill();
        }


       

        const drawBlot = (x, y, r, color) => {
            for (let i = 0; i <50; i++) {            
                drawPolygon(context, x, y, getRandomInt(r, r + 10), getRandomInt(6, 12), getRandomInt(0, 60), color);
            }
        }

        drawBlot(size/2, size/2, 100, 'rgba(255, 0, 0, 0.1)');
        drawBlot(size/2, size/3, 80, 'rgba(255, 160, 0, 0.1)');
        drawBlot(size/3, size/3, 70, 'rgba(255, 200, 0, 0.1)');
        drawBlot(size/3, size/2, 110, 'rgba(0, 255, 100, 0.1)');

        return canvas;
    };

    const animationLoop = (stepSize:number = 1000, animateCallback: Function) => {
        animateCallback();
        let start = null;

        const step = (timestamp) => {
            if (!start) {
                start = timestamp;
            }

            const progress = timestamp - start;

            if (progress >= stepSize) {
                start = timestamp;
                animateCallback();
            }

            currentAnimationFrame = window.requestAnimationFrame(step);
        }

        currentAnimationFrame = window.requestAnimationFrame(step);
    }

    const animate = (canvas: HTMLCanvasElement) => {
        if (currentAnimationFrame) {
            window.cancelAnimationFrame(currentAnimationFrame);
        }
        animationLoop(200, () => run(canvas));

    }

    return  {
        run,
        animate,
        name: 'Playground'
    };
};

export default artwork;