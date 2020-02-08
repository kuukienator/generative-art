(() => {
    const run = (canvas) => {
        const segments = 15;
        const context = canvas.getContext("2d");
        const size = canvas.width;

        const getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        };

        const radians = degrees => degrees * Math.PI/180;

        const circle = (ctx) => ( position, radius, width) => {
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)'
            ctx.lineWidth = width;
            ctx.beginPath();
            ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
            ctx.stroke();
        }

        const dottedCircle = ctx => (dottedLine, position, radius) => {
            console.log(dottedLine);
            ctx.lineWidth = 2;
            dottedLine.forEach(lineSegment => {
                console.log('lineSegment', lineSegment);
                ctx.beginPath();
                ctx.arc(position.x, position.y, radius, radians(lineSegment.start), radians(lineSegment.end));
                ctx.stroke();
                ctx.closePath();
            });
        }

        const subdivideLine = (start, end, segments) => {
            if (segments === 0) {
                return {start, end: end * 0.8};
            }

            const splitPoint = getRandomInt(start, end);
            console.log(start, end, splitPoint);

            return [
                subdivideLine(start, splitPoint, segments - 1),
                subdivideLine(splitPoint, end, segments - 1)
            ].flat();
        }

        const dottedLine = () => {
            const minLength = 20;
            const maxLength = 30;
            const spacing = 10;
            const segments = 10;
            

            const line = [];

            for (let i = 0; i < segments; i++) {
                const start = i === 0 ? 0 : (line[i - 1][1] + spacing);
                const end = start + getRandomInt(minLength, maxLength);
                line.push([start, end]);
            }

            return line;
        }

        const clear = (ctx) => ctx.clearRect(0, 0, size, size);

        const maxRadius = size/2;
        const center = {x: size/2, y: size/2};
        const segmentRadius = maxRadius * 0.9 / segments;
        
        
        for (let i = 1; i < segments + 1; i++) {
            //circle(context)(center, (i * segmentRadius) + getRandomInt(-5, 5), getRandomInt(2, 6));   
            //dottedCircle(context)(subdivideLine(0, 360, 3), center, i * segmentRadius);
            
        }

        const line = subdivideLine(0, 360, 2);
        /*
        const line = [
            {start: 0, end: 60},
            {start: 70, end: 90},
            {start: 95, end: 120},
            {start: 130, end: 150},
            {start: 160, end: 250},
            {start: 260, end: 330},
        ];
        */

        clear(context);
        dottedCircle(context)(line, center, maxRadius * 0.8);
        
        return canvas;
    };

    const artwork = { run, name: 'circleWaves'};

    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = artwork;
    } else {
        window.GenerativeArt = Object.assign({}, window.GenerativeArt, {[artwork.name]: artwork});
    }

})();