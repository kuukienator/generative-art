(() => {
    const run = (canvas) => {
        const context = canvas.getContext("2d");
        //context.filter = 'best';
        //context.imageSmoothingEnabled = true;
        const size = canvas.width;

        const getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        };


        const radians = degrees => degrees * Math.PI / 180;
        const distance = (p1, p2) => Math.sqrt(Math.pow((p1.x-p2.x), 2) + Math.pow((p1.y-p2.y), 2));
        const clear = (ctx) => ctx.clearRect(0, 0, size, size);
        

        clear(context);
        const circlesCount = 100;
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

        ];
        const colors = HRL_COLORS_PALETTES[0].map(color => `hsl(${color.h}, ${color.s}%, ${color.l}%, 1)`);
        
        const getLine = (initialY, width, segmentWidth) => {
            const pointsCount = width/ segmentWidth;
            const line = [];
            for (let i = 0; i < pointsCount; i++) {
               line.push({x: i * segmentWidth, y: initialY + getRandomInt(10, 50)});
            }
            return line;
        }

        const drawWavyCurve = (ctx, y, width, color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(0, size);
            ctx.lineTo(0, y);
            ctx.quadraticCurveTo(width/2, y - getRandomInt(20, 75), width, y);
            ctx.lineTo(width, size);
            //ctx.stroke();
            ctx.fill();
        }

        const wavesCount = 15;
        const waveSize = size / wavesCount;

        for (let i = 0; i < wavesCount; i++) {
            drawWavyCurve(context, (waveSize * i), size, (i %2 === 0 ? '#ff1453' : '#25799e')); 
        }


        return canvas;
    };

    const artwork = {
        run,
        name: 'moreWaves'
    };

    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = artwork;
    } else {
        window.GenerativeArt = Object.assign({}, window.GenerativeArt, {
            [artwork.name]: artwork
        });
    }

})();