import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


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
        <></>
    );

}
