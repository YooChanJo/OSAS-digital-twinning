import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Input, Form, Typography, Card } from "antd";
import "./AnalysisInitForm.css";

const { Title, Paragraph } = Typography;

export default function AnalysisInitForm() {
    const navigate = useNavigate();

    const onFinish = (values) => {
        const query = `${values.Pv}_${values.Part}_${values.Vr}_${values.Pr}_${values.resolution}`;
        navigate(`/analysis/results/${query}`);
    };

    return (
        <div className="analysis-container">
            <Card className="analysis-card">
                <Title level={2} className="title">Blood O₂ Pressure Analysis</Title>
                <Paragraph className="description">
                    Enter the initial conditions to analyze blood oxygen pressure.
                </Paragraph>
                <Form layout="vertical" onFinish={onFinish} initialValues={{ Pv: 40, Part: 100, Vr: 2, Pr: 100, resolution: 10000 }}>
                    <Form.Item label="O₂ pressure of the venous blood (mmHg)" name="Pv" rules={[{ required: true }]}> 
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label="Initial O₂ pressure of the arterial blood (mmHg)" name="Part" rules={[{ required: true }]}> 
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label="Initial volume of remaining air (L) (2~3)" name="Vr" rules={[{ required: true }]}> 
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label="Initial O₂ pressure of remaining air (mmHg)" name="Pr" rules={[{ required: true }]}> 
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label="Number of segments (resolution)" name="resolution" rules={[{ required: true }]}> 
                        <Input type="number" />
                    </Form.Item>
                    <div className="button-group">
                        <Button type="primary" htmlType="submit">Submit</Button>
                        <Button onClick={() => navigate("/")}>Back to Home</Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
}
