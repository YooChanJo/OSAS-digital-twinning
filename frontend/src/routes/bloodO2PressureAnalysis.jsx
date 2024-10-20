import { useNavigate } from "react-router-dom";

export default function BloodO2PressureAnalysis() {
    const navigate = useNavigate();
    const onBackToHomeClick = () => {
        navigate("/");
    }
    return (<>


    <button onClick={onBackToHomeClick}>Back to Home</button>
    </>);
}