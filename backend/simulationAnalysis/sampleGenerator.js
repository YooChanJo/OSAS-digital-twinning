const PI = 3.141592656358979;

const period = 5;
const inhalation = 2;
const exhalation = period - inhalation;

const VinSampleFunction = (t) => {
    t -= Math.floor(t / period) * period
    t *= PI / ( 2 * period );
    return Math.sqrt(3) * 3 / 4  * Math.sin(t) * Math.cos(t) * Math.cos(t);
}
const PinSampleFunction = (t) => {
    t -= Math.floor(t / period) * period
    t *= PI / (2 * period);
    if( t <= inhalation ) return -Math.sin(PI * t / inhalation);
    else return Math.sin(PI * (t-inhalation) / exhalation); // Is not going to be needed
}

const VinSampleGenerator = (cycles, dt) => {
    const result = [];
    for(let t = 0; t <= period * cycles; t += dt) {
        result.push(VinSampleFunction(t));
    }
    return result;
}
const PinSampleGenerator = (cycles, dt) => {
    const result = [];
    for(let t = 0; t <= period * cycles; t += dt) {
        result.push(PinSampleFunction(t));
    }
    return result;
}

module.exports = { VinSampleGenerator, PinSampleGenerator };