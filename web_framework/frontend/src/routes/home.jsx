import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const onAnalysisPageClick = () => {
        navigate("/analysis/init-form");
    }
    return (<>
        <button onClick={onAnalysisPageClick}>To blood o2 pressure analysis page</button>
    </>);
}