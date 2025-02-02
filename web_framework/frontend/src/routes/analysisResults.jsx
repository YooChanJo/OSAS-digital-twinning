import { useState } from "react";
import { useParams } from "react-router-dom";



export default function AnalysisResults() {
    const { query } = useParams();
    const queryArray = query.split("%");
    const [Pv, setPv] = useState(queryArray[0]);
    const [Part, setPart] = useState(queryArray[1]);
    const [Vr, setVr] = useState(queryArray[2]);
    const [Pr, setPr] = useState(queryArray[3]);
    const [resolution, setResolution] = useState(queryArray[4]);
    
    return <>{Pv + " " + Part + " " + Vr + " " + Pr + " " + resolution}</>;

}
