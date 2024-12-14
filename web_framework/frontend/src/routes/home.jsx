import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const onBloodO2PressureAnalysisPageClick = () => {
        navigate("/analysis/blood-o2-pressure-analysis")
    }
    return (<>
        <button onClick={onBloodO2PressureAnalysisPageClick}>To blood o2 pressure analysis page</button>
    </>);
}