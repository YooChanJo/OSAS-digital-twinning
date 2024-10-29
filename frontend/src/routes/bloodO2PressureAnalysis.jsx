//import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function BloodO2PressureAnalysis() {
    const navigate = useNavigate();
    const onBackToHomeClick = () => {
        navigate("/");
    }
    const onFormSubmit = async (e) => {
        e.preventDefault();
        const Pv = Number(e.target[0].value);
        const Part = Number(e.target[1].value);
        const Vr = Number(e.target[2].value);
        const Pr = Number(e.target[3].value);
        try {
            const res = await axios.post("/api/blood-pressure-analysis", { Pv, Part, Vr, Pr });
            console.log(res);
        } catch (err) {
            console.log(err.message);
        }
    }
    
    return (<>
        <h2>Welcome to blood O2 pressure analysis page</h2>
        <form onSubmit={onFormSubmit} style={{border: "1px solid black", padding: "10px", marginBottom: "10px"}}>
            <h2>Inital Conditions</h2>
            <label htmlFor="Pv">O2 pressure of the venous blood (mmHg)</label><br />
            <input id="Pv" type="number" defaultValue={40}></input><br />
            <label htmlFor="Part">Initial O2 pressure of the arterial blood (mmHg) - (cycle 0)</label><br />
            <input id="Part" type="number" defaultValue={100}></input><br />
            <label htmlFor="Vr">Volume of residue (L)</label><br />
            <input id="Vr" type="number" defaultValue={1}></input><br />
            <label htmlFor="Pr">Inital O2 pressure of residue (mmHg) - (cycle 0)</label><br />
            <input id="Pr" type="number" defaultValue={100}></input>
            <h2>Predefined Constants</h2>
            <p>
                Xo2 = 19.7%, A = 8 * 10^7 mm^2, L = 1mm, v = 1.33 mm/s, <br/>
                T = 310K, R = 62.3637 mmHg * L / (mol * K)
            </p>
            <input type="submit" value="Submit initial conditions and predefined constants"/>
        </form>
        <button onClick={onBackToHomeClick}>Back to Home</button>
    </>);
}