const randn = () => {
    const l = 10;
    let x = 0;
    for (let i = 0; i < l; i++) {
        x += Math.random();
    }

    return x / l;
};

const randn_bm = () => {
    var u = 0,
        v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

const randn_bm_2 = () => {
    var u = 0,
        v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return randn_bm(); // resample between 0 and 1
    return num;
};

const getRandomIntBM = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(randn_bm() * (max - min)) + min;
};

const getRandomIntBM2 = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(randn_bm_2() * (max - min)) + min;
};