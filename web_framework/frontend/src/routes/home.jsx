import { useNavigate } from "react-router-dom";
import { Button, Card, Typography } from "antd";
import "./home.css";
import backgroundVideo from "../../images/background-video.mp4";

const { Title, Paragraph } = Typography;

export default function Home() {
    const navigate = useNavigate();

    const onAnalysisPageClick = () => {
        navigate("/analysis/blood-O2/40_100_2_100_10000_5_False");
    };
    
    const on3DAnalysisPageClick = () => {
        navigate("/analysis/3Dmodels");
    };

    const onPresentationPageClick = () => {
        navigate("/presentation");
    };

    return (
        <div className="home-container">
            <video className="background-video" autoPlay loop muted>
                <source src={backgroundVideo} type="video/mp4" />
            </video>
            <Card className="home-card">
                <Title level={2} className="title">Welcome</Title>
                <Paragraph className="description">
                    Created and provided by <strong>Connection</strong>.
                </Paragraph>
                <Button type="primary" size="large" onClick={onAnalysisPageClick}>
                    To Blood O₂ Pressure Analysis Page
                </Button>
                <Button type="primary" size="large" onClick={on3DAnalysisPageClick}>
                    To 3D model Analysis Page
                </Button>
                <Button type="primary" size="large" onClick={onPresentationPageClick}>
                    To Presentation Page
                </Button>
            </Card>
        </div>
    );
}
