const defaultPredefines = require("./defaultPredefines");


class Twin {
    /* 
        cycleNumber, t
        predefines { Xo2, A, L, v, T, R, SaO2, CoO2 }
        na
        Va
        resolution
        Pb = [   ] // size resolution + 1 | meaningful data from [1]
        // input device
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
        this.t = 0;
        this.na = (initialConditions.Pr * initialConditions.Vr) / (this.predefines.R * this.predefines.T);
        this.Va = initialConditions.Vr;
        this.resolution = initialConditions.resolution;
        this.Pb = new Array(initialConditions.resolution + 1);
        for(let i=0; i<initialConditions.resolution + 1; i++) {
            this.Pb[i] = initialConditions.Pv + ( i / initialConditions.resolution ) * ( initialConditions.Part - initialConditions.Pv );
        }
    }
    getPa = () => (this.na * this.predefines.R * this.predefines.T) / (this.Va);
    getdt = () => (this.predefines.L) / (this.resolution * this.predefines.v);
    getPart = () => this.Pb[this.resolution];


}

module.exports = { Twin }