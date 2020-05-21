import PlayGround from './artworks/playground.js';
import TrianglesArtwork from './artworks/triangles.js';
import SemiCirclesArtwork from './artworks/semi-circles.js';
import CicleWavesArtwork from './artworks/circle-waves.js';
import LinesArtwork from './artworks/lines.js';
import WavesArtwork from './artworks/waves.js';
import CircleArtwork from './artworks/circles.js';
import HeatWavesArtwork from './artworks/heat-waves.js';
import ShortLinesArtwork from './artworks/short-lines.js';
import SegmentsArtwork from './artworks/segments.js';

const GenerativeArt = {
    addArtwork: (artwork, options) => {
        const artWorks = document.querySelector('.artworks');
        const artWorkContainer = document.createElement('div');
        artWorkContainer.classList.add('artwork');

        const artWorkHeadline = document.createElement('h2');
        artWorkHeadline.textContent = artwork.name;

        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 600;

        const regenerateButton = document.createElement('button');
        regenerateButton.innerText = 'Regenerate';
        regenerateButton.addEventListener('click', () =>
            artwork.run(canvas, options)
        );

        artWorkContainer.appendChild(artWorkHeadline);
        artWorkContainer.appendChild(canvas);
        artWorkContainer.appendChild(regenerateButton);

        if (typeof artwork.animate === 'function') {
            const animateButton = document.createElement('button');
            animateButton.innerText = 'Animate';
            artWorkContainer.appendChild(animateButton);

            animateButton.addEventListener('click', () =>
                artwork.animate(canvas, options)
            );
        }

        artWorks.appendChild(artWorkContainer);

        artwork.run(canvas, options);

        // callback({ canvas, regenerateButton });
    },
};

GenerativeArt.addArtwork(PlayGround());
GenerativeArt.addArtwork(TrianglesArtwork());
GenerativeArt.addArtwork(SemiCirclesArtwork());
GenerativeArt.addArtwork(CicleWavesArtwork());
const linesArtwork = LinesArtwork();
GenerativeArt.addArtwork(linesArtwork, {
    ...linesArtwork.defaultOptions,
    maxDepth: 8,
    colors: ['#941B0C', '#BC3908', '#F6AA1C'],
    lineWidthFactor: 0.0045,
    count: 5,
});
const wavesArtwork = WavesArtwork();
GenerativeArt.addArtwork(wavesArtwork, {
    ...wavesArtwork.defaultOptions,
});

const cirlceArtwork = CircleArtwork();
GenerativeArt.addArtwork(cirlceArtwork, {
    ...cirlceArtwork.defaultOptions,
});
const heatWavesArtwork = HeatWavesArtwork();
GenerativeArt.addArtwork(heatWavesArtwork, {
    ...heatWavesArtwork.defaultOptions,
});
const shortLinesArtwork = ShortLinesArtwork();
GenerativeArt.addArtwork(shortLinesArtwork, {
    ...shortLinesArtwork.defaultOptions,
});
const segmentsArtwork = SegmentsArtwork();
GenerativeArt.addArtwork(segmentsArtwork, {
    ...segmentsArtwork.defaultOptions,
});