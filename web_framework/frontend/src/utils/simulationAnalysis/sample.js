import Solver from "./solver";
import { VinSampleGenerator, NinSampleGenerator } from "./sampleGenerator";

const twin = new Solver({Vr: 2, Pr: 100, Pv: 40, Part: 100, resolution: 10000, k: 0.000000007});
const VinSample =  VinSampleGenerator(2, twin.dt);
const NinSample =  NinSampleGenerator(2, twin.dt);

console.log(twin);
console.log(VinSample)
console.log(NinSample)

twin.evolve({Vin: VinSample, Nin: NinSample});

const data = twin.refinedHistory();
console.log(data);