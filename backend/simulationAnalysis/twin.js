const defaultPredefines = require("./defaultPredefines");
const sampleGenerator = require("./sampleGenerator");

class Twin {
    /* 
        cycleNumber, t
        predefines { Xo2, A, L, v, T, R, SaO2, CoO2 }
        na
        Va, Pa
        resolution, dt
        Pb = [   ] // size resolution + 1 | meaningful data from [1]
        input {
            Vin = [] // sample interval of dt
            Pin = []
            *optional size = (number) // Vin Pin size
        }
    */
    constructor(initialConditions, predefines) {
        /* 
            initialConditions {
                Pv, Part, Vr, Pr,
                resolution, // # of blood segment --> values assign to 1 ~ resolution
                // initialization of cycle 0 is always linear
            }
        */
        // predefined constants and functions
        if(!predefines) this.predefines = defaultPredefines; // predefines 정의 안됨
        else this.predefines = predefines;
        // properties
        this.cycleNumber = 0;
        this.t = 0; // 0 <= t <= 5

        this.na = (initialConditions.Pr * initialConditions.Vr) / (this.predefines.R * this.predefines.T);
        this.Va = initialConditions.Vr;
        this.Pa = initialConditions.Pr;
        this.Pb = new Array(initialConditions.resolution + 1);
        for(let i=0; i<initialConditions.resolution + 1; i++) {
            this.Pb[i] = initialConditions.Pv + ( i / initialConditions.resolution ) * ( initialConditions.Part - initialConditions.Pv );
        }

        this.resolution = initialConditions.resolution;
        this.dt = (this.predefines.L) / (this.resolution * this.predefines.v);
        
        this.input = {
            Vin: null,
            Pin: null,
        }
    }
    updatePa = () => { 
        this.Pa = (this.na * this.predefines.R * this.predefines.T) / (this.Va);
    }
    updatedt = () => { 
        this.dt = (this.predefines.L) / (this.resolution * this.predefines.v);
    }
    getPart = () => this.Pb[this.resolution];
    
    // nomalizeGeneralInput
    attachInput(normalizedVin, normalizedPin) {
        this.input.Vin = normalizedVin;
        this.input.Pin = normalizedPin;
    }
    detachInput() {
        this.input.Vin = null;
        this.input.Pin = null;
    }
    
    evolveCycle() {
        
    }

}

module.exports = { Twin }