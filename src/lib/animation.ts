interface AnimationInterface {
  cancel: Function;
  animate: Function;
}

export const AnimationEngine = (): AnimationInterface => {
  let currentAnimationFrame = null;

  const animationLoop = (
    stepSize: number = 1000,
    animateCallback: Function
  ) => {
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
    };

    currentAnimationFrame = window.requestAnimationFrame(step);
  };

  const cancel = () => {
    if (currentAnimationFrame) {
      window.cancelAnimationFrame(currentAnimationFrame);
    }
  };

  const animate = (stepSize: number, animateCallback: Function) => {
    if (currentAnimationFrame) {
      window.cancelAnimationFrame(currentAnimationFrame);
    }
    animationLoop(stepSize, animateCallback);
  };
  return {
    cancel,
    animate,
  };
};

export default AnimationEngine;
