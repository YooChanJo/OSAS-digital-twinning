const solver = require("./solver").Solver;
const sampleGenerator = require("./sampleGenerator");

const twin = new solver({Vr: 2, Pr: 100, Pv: 40, Part: 100, resolution: 10000}, 0.000000007);
const VinSample =  sampleGenerator.VinSampleGenerator(2, twin.dt);
const NinSample =  sampleGenerator.NinSampleGenerator(2, twin.dt);

console.log(twin);
console.log(VinSample)
console.log(NinSample)

twin.evolve({Vin: VinSample, Nin: NinSample});

const data = twin.history.map(h => {return {t: h.t, Va: h.Va, Pa: h.Pa, Part: h.Pb[twin.resolution]} });
console.log(data);