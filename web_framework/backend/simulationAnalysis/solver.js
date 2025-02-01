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
    constructor(initialConditions, predefines) {
        // predefined constants and functions
        if(!predefines) this.predefines = defaultPredefines; // predefines 정의 안됨
        else this.predefines = predefines;
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
    }    
    evolve() {




    }
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
        input {
            Vin = [] // sample interval of dt // should start with 0 end with 0
            Pin = [] // should start with 760mmHg and end with 760mmHg
            *optional size = (number) // Vin Pin size
        }
    }
    initialConditions {
        Pv, Part, Vr, Pr,
        resolution, //  of blood segment --> values assign to 1 ~ resolution
        // 
    }
*/