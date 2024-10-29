const defaultPredefines = require("./defaultPss");


class Twin {
    constructor(initialConditions, predefines) {
        // predefined constants and functions
        if(!predefines) this.predefines = defaultPredefines; // predefines 정의 안됨
        else this.predefines = predefines;
        /* 
            initialConditions {
                Pv,
                Part,
                Vr,
                Pr,
                n, // # of blood segment
                // initialization of cycle 0 is always linear
            }
         */
        //this.cycleNumber = 0;
        this.na = (initialConditions.Pr * initialConditions.Vr) / (predefines.R * predefines.T);
        this.Va = initialConditions.Vr;
        //this.dt
        //this.t



    }
    getPa() {
        return (this.na * this.predefines.R * this.predefines.T) / (this.Va);
    }


}
