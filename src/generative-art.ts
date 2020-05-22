import PlayGround from './artworks/playground';
import TrianglesArtwork from './artworks/triangles';
import SemiCirclesArtwork from './artworks/semi-circles';
import CicleWavesArtwork from './artworks/circle-waves';
import LinesArtwork from './artworks/lines';
import WavesArtwork from './artworks/waves';
import CircleArtwork from './artworks/circles';
import HeatWavesArtwork from './artworks/heat-waves';
import ShortLinesArtwork from './artworks/short-lines';
import SegmentsArtwork from './artworks/segments';

import { PALETTES } from './lib/color-palettes';

import { ArtWork, Palette } from './types/index';

class GenerativeArt {
  artWorks: Array<ArtWork> = [];
  activePalette: Palette = PALETTES[0];

  renderPalettes(palettes: Array<Palette>) {
    const createPalette = (p: Palette): HTMLDivElement => {
      const paletteContainer = document.createElement('div');
      paletteContainer.className = 'palette';
      p.forEach((c) => {
        const colorContainer = document.createElement('div');
        colorContainer.className = 'color';
        colorContainer.style.backgroundColor = c.toString();
        paletteContainer.appendChild(colorContainer);
      });

      return paletteContainer;
    };

    const palettesContainer = document.querySelector('.palettes');
    const activePalette = document.querySelector('.activePalette');
    activePalette.addEventListener('click', () => {
      palettesContainer.classList.toggle('show');
    });
    const activePaletteContainer = createPalette(palettes[0]);
    activePalette.appendChild(activePaletteContainer);

    palettes.forEach((p) => {
      const paletteContainer = createPalette(p);
      paletteContainer.addEventListener('click', () => {
        this.activePalette = p;
        palettesContainer.classList.remove('show');
        activePalette.textContent = '';
        activePalette.appendChild(createPalette(p));
      });
      palettesContainer.appendChild(paletteContainer);
    });
  }

  addArtwork(artwork: ArtWork, options: any = {}) {
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
      artwork.run(canvas, { ...options, colors: this.activePalette })
    );

    artWorkContainer.appendChild(artWorkHeadline);
    artWorkContainer.appendChild(canvas);
    artWorkContainer.appendChild(regenerateButton);

    if (artwork.animate) {
      const animateButton = document.createElement('button');
      animateButton.innerText = 'Animate';
      artWorkContainer.appendChild(animateButton);

      animateButton.addEventListener('click', () =>
        artwork.animate(canvas, { ...options, colors: this.activePalette })
      );
    }

    artWorks.appendChild(artWorkContainer);

    artwork.run(canvas, { ...options, colors: this.activePalette });

    this.artWorks.push(artwork);
  }
}

const generativeArt = new GenerativeArt();

generativeArt.renderPalettes(PALETTES);

generativeArt.addArtwork(PlayGround());
generativeArt.addArtwork(TrianglesArtwork());
generativeArt.addArtwork(SemiCirclesArtwork());
generativeArt.addArtwork(CicleWavesArtwork());
generativeArt.addArtwork(LinesArtwork());
generativeArt.addArtwork(WavesArtwork());
generativeArt.addArtwork(CircleArtwork());
generativeArt.addArtwork(HeatWavesArtwork());
generativeArt.addArtwork(ShortLinesArtwork());
generativeArt.addArtwork(SegmentsArtwork());
