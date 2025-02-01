const PI = 3.141592656358979;
const R = 62.3637;
const T = 310;

const PERIOD = 5;
const INHALATION = 2;
const EXHALATION = PERIOD - INHALATION;

const VinSampleFunction = (t) => {
    t -= Math.floor(t / PERIOD) * PERIOD
    t *= PI / ( 2 * PERIOD );
    return Math.sqrt(3) * 3 / 4  * Math.sin(t) * Math.cos(t) * Math.cos(t);
}
const NinSampleFunction = (t) => {
    t -= Math.floor(t / PERIOD) * PERIOD
    if( t <= INHALATION ) return (760 - Math.sin(PI * t / INHALATION)) * VinSampleFunction(t) / R / T;
    else return (760 + Math.sin(PI * (t-INHALATION) / EXHALATION)) * VinSampleFunction(t) / R / T;
}

const VinSampleGenerator = (cycles, dt) => {
    const result = [];
    for(let t = 0; t <= PERIOD * cycles; t += dt) {
        result.push(VinSampleFunction(t));
    }
    return result;
}
const NinSampleGenerator = (cycles, dt) => {
    const result = [];
    for(let t = 0; t <= PERIOD * cycles; t += dt) {
        result.push(NinSampleFunction(t));
    }
    return result;
}

module.exports = { VinSampleGenerator, NinSampleGenerator };