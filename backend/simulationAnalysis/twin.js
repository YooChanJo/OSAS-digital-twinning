const defaultPredefines = require("./defaultPredefines");


class Twin {
    constructor(initialConditions, predefines) {
        /* 
            predefines {
                Xo2
                A
                L
                v
                T
                R
                SaO2
                CoO2
            }
            na
            Va
            resolution
            Pb = [   ]
            // input device
        */
        // predefined constants and functions
        if(!predefines) this.predefines = defaultPredefines; // predefines 정의 안됨
        else this.predefines = predefines;
        /* 
            initialConditions {
                Pv,
                Part,
                Vr,
                Pr,
                resolution, // # of blood segment --> values assign to 1 ~ resolution
                // initialization of cycle 0 is always linear
            }
         */
        //this.cycleNumber = 0;
        this.na = (initialConditions.Pr * initialConditions.Vr) / (this.predefines.R * this.predefines.T);
        this.Va = initialConditions.Vr;
        this.resolution = initialConditions.resolution;
        this.Pb = new Array(initialConditions.resolution + 1);
        for(let i=0; i<initialConditions.resolution + 1; i++) {
            this.Pb[i] = initialConditions.Pv + ( i / initialConditions.resolution ) * ( initialConditions.Part - initialConditions.Pv );
        }
        //this.t
    }
    getPa() {
        return (this.na * this.predefines.R * this.predefines.T) / (this.Va);
    }
    getdt() {
        return (this.predefines.L) / (this.resolution * this.predefines.v);
    }
    

}

module.exports = { Twin }