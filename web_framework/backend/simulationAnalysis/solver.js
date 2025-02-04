const defaultPredefines = require("./defaultPredefines");
const sampleGenerator = require("./sampleGenerator");

class History {
    constructor(currentStatus) {
        this.t = currentStatus.t;
        this.Va = currentStatus.Va;
        this.Pa = currentStatus.Pa;
        this.Pb = currentStatus.Pb;
    }
}

class Solver {
    constructor(initialConditions, k, predefines) {
        // predefined constants and functions
        if(!predefines) this.predefines = defaultPredefines; // predefines 정의 안됨
        else this.predefines = predefines;
        // k
        this.k = k;
        // properties
        this.t = 0;
        this.Va = initialConditions.Vr;
        this.Pa = initialConditions.Pr;
        this.na = (initialConditions.Pr * initialConditions.Vr) / (this.predefines.R * this.predefines.T);
        this.Pb = new Array(initialConditions.resolution + 1);
        for(let i=0; i<initialConditions.resolution + 1; i++) { // linear initialization
            this.Pb[i] = 
                initialConditions.Pv + 
                ( i / initialConditions.resolution ) * 
                ( initialConditions.Part - initialConditions.Pv );
        }
        this.resolution = initialConditions.resolution;
        this.dt = (this.predefines.L) / (this.resolution * this.predefines.v);
        this.history = [
            new History({
                t: this.t,
                Va: this.Va,
                Pa: this.Pa,
                Pb: this.Pb,
            })
        ];
    }
    intPb0toL() {
        let sum = 0;
        const dx = this.predefines.L / this.resolution;
        for(let i=0;i<this.resolution;i++) {
            sum += this.Pb[i] * dx;
        }
        return sum;
    }
    evolve(input) { // contains Vin, Nin vectors spaced with dt both should start and end with 0
        const initialVa = this.Va;
        const gasExchangeConst = 4 * 3.14159265358979 * this.k * this.predefines.L / this.predefines.A;
        for(let i=1;i<input.Vin.length; i++) {
            this.t += this.dt;
            this.Va = initialVa + input.Vin[i];
            if(i <= 10)console.log(this.na, this.k * this.predefines.A * (-this.Pa + this.intPb0toL() / this.predefines.L) * this.dt, + this.predefines.Xo2 * (input.Nin[i] - input.Nin[i - 1]));
            this.na += 
                this.k * this.predefines.A * (-this.Pa + this.intPb0toL() / this.predefines.L) * this.dt
                + this.predefines.Xo2 * (input.Nin[i] - input.Nin[i - 1]);
            // Pb updating
            for(let j=this.resolution;j>=1;j--) {
                this.Pb[j] = 
                    this.Pb[j - 1]
                    + this.predefines.dPbdCoO2(this.Pb[j-1]) * gasExchangeConst * (this.Pa - this.Pb[j-1]) * this.dt;
            }
            this.Pa = this.na * this.predefines.R * this.predefines.T / this.Va;
            this.history.push(new History({
                t: this.t,
                Va: this.Va,
                Pa: this.Pa,
                Pb: this.Pb
            }));
        }
    }
    getHistory() { return this.history; }
}

module.exports = { Solver };

/*
    Solver {
        t
        predefines { Xo2, A, L, v, T, R, SaO2, CoO2 }
        na
        Va, Pa
        resolution, dt
        Pb = [   ] // size resolution + 1 | meaningful data from [1]
        k,
        history
    }
    initialConditions {
        Pv, Part, Vr, Pr,
        resolution, //  of blood segment --> values assign to 1 ~ resolution
        // 
    }
*/