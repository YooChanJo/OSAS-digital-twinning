import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LinePlot from "../components/linePlot";


export default function AnalysisResults() {
    const { query } = useParams();
    const [Pv, setPv] = useState();
    const [Part, setPart] = useState();
    const [Vr, setVr] = useState();
    const [Pr, setPr] = useState();
    const [resolution, setResolution] = useState();
    useEffect(() => {
        const queryArray = query.split("_");
        setPv(Number(queryArray[0]));
        setPart(Number(queryArray[1]));
        setVr(Number(queryArray[2]));
        setPr(Number(queryArray[3]));
        setResolution(Number(queryArray[4]));
    }, [])
    
    return (
        <div style={{display: "flex", flexDirection: "row", width: "100vw", height: "100vh"}}>
            <div style={{height: "100%", width: "400px", borderRight: "1px solid black"}}> {/* control panel */}
                
            </div>
            <div width="calc(100% - 400px)" height="100%">
                <LinePlot  height={"100%"} width={"100%"}/> {/* graph */}
            </div>
        </div>
    );

}
