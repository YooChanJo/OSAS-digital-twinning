// 폐포에 들어오는 공기의 산소 몰분율 (%)
const Xo2 = 19.7;
// 총 확산 단면적 (mm^2)
const A = 8 * (10 ** 7); 
// 혈관 길이 (mm)
const L = 1;
// 혈류 속도 (mm/s)
const v = 1.33;
// 온도 (K)
const T = 310;
// 기체상수 (mmHg * L / (mol * K))
const R = 62.3637;


// O2 saturation(Pb)
const SaO2 = (Pb) => (Pb ** 2.7) / (26.6 ** 2.7 + Pb ** 2.7);
const dSaO2dPb = (Pb) => (
    2.7 * (Pb ** 1.7) / (26.6 ** 2.7 + Pb ** 2.7) +
    (Pb ** 2.7) * (2.7 * (Pb ** 1.7)) / ((26.6 ** 2.7 + Pb ** 2.7)**2)
);
// O2 content(Pb)
const CoO2 = (Pb) => 4.464 * (10 ** -10) * (1.34 * 15 * this.SaO2(Pb) + 0.003 * Pb);

const dCoO2dPb = (Pb) => 4.464 * (10 ** -10) * (1.34 * 15 * this.dSaO2dPb(Pb) + 0.003);
const dPbdCoO2 = (Pb) => 1 / this.dCoO2dPb(Pb);

export default { Xo2, A, L, v, T, R, SaO2, dSaO2dPb, CoO2, dCoO2dPb, dPbdCoO2 };