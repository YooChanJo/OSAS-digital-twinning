// 폐포에 들어오는 공기의 산소 몰분율 (%)
module.exports.Xo2 = 19.7;
// 총 확산 단면적 (mm^2)
module.exports.A = 8 * (10 ** 7); 
// 혈관 길이 (mm)
module.exports.L = 1;
// 혈류 속도 (mm/s)
module.exports.v = 1.33;
// 온도 (K)
module.exports.T = 310;
// 기체상수 (mmHg * L / (mol * K))
module.exports.R = 62.3637;


// O2 saturation(Pb)
module.exports.SaO2 = (Pb) => (Pb ** 2.7) / (26.6 ** 2.7 + Pb ** 2.7);
module.exports.dSaO2dPb = (Pb) => (
    2.7 * (Pb ** 1.7) / (26.6 ** 2.7 + Pb ** 2.7) +
    (Pb ** 2.7) * (2.7 * (Pb ** 1.7)) / ((26.6 ** 2.7 + Pb ** 2.7)**2)
);
// O2 content(Pb)
module.exports.CoO2 = (Pb) => 4.464 * (10 ** -10) * (1.34 * 15 * this.SaO2(Pb) + 0.003 * Pb);

module.exports.dCoO2dPb = (Pb) => 4.464 * (10 ** -10) * (1.34 * 15 * this.dSaO2dPb(Pb) + 0.003);
module.exports.dPbdCoO2 = (Pb) => 1 / this.dCoO2dPb(Pb);