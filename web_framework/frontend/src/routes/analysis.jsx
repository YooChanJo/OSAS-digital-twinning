import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Form, Typography, Card, Slider } from "antd";
import "./analysis.css";
import * as d3 from "d3";

const { Title, Paragraph } = Typography;

export default function Analysis() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [graphType, setGraphType] = useState("volume"); // "volume" or "pressure"

    // Simulate receiving new data sequentially
    const fetchData = async () => {
        const newData = await fetchDataSequentially(); // your data fetching logic with await
        setData(newData);
    };

    const fetchDataSequentially = () => {
        // Simulate real-time data fetching
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    { time: 0, volume: 2, pressure: 100 },
                    { time: 1, volume: 2.1, pressure: 98 },
                    { time: 2, volume: 2.3, pressure: 95 },
                    // Add more data points here...
                ]);
            }, 1000);
        });
    };

    const onFinish = (values) => {
        const query = `${values.Pv}_${values.Part}_${values.Vr}_${values.Pr}_${values.resolution}_${values.k}`;
        navigate(`/analysis/results/${query}`);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Toggle between volume and pressure graph
    const toggleGraphType = (type) => {
        setGraphType(type);
    };

    useEffect(() => {
        drawGraph();
    }, [data, graphType]);

    const drawGraph = () => {
        const width = 800;  // 그래프 너비 조정
        const height = 500; // 그래프 높이 조정
        const margin = { top: 70, right: 50, bottom: 50, left: 50 }; // 여백을 최소화
    
        const svg = d3.select("#graph")
            .attr("width", width)
            .attr("height", height);
    
        svg.selectAll("*").remove(); // 이전 그래프 제거
    
        const x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.time)])
            .range([margin.left, width - margin.right]);
    
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => (graphType === "volume" ? d.volume : d.pressure))])
            .range([height - margin.bottom, margin.top]);
    
        svg.append("g")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => x(d.time))
            .attr("cy", d => y(graphType === "volume" ? d.volume : d.pressure))
            .attr("r", 3)
            .style("fill", "#707070")
            .transition()
            .duration(500)
            .ease(d3.easeCircleIn);
    
        // X 축 스타일 변경 (얇은 회색 선)
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x))
            .selectAll("path, line, text")
            .style("stroke", "#707070")  // 진한 회색 축
            .style("fill", "#707070")    // 텍스트 진한 회색
            .style("stroke-width", 0.05);   // 얇은 선
    
        // Y 축 스타일 변경 (얇은 회색 선)
        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .selectAll("path, line, text")
            .style("stroke", "#707070")  // 진한 회색 축
            .style("fill", "#707070")    // 텍스트 진한 회색
            .style("stroke-width", 0.05);   // 얇은 선
    };
    

    return (
        <div className="analysis-container">
            <div className="card-div">
                <Card className="analysis-card">
                    <Title level={2} className="title">Blood O₂ Pressure Analysis</Title>
                    <Paragraph className="description">
                        Enter the initial conditions to analyze blood oxygen pressure.
                    </Paragraph>
                    <Form 
                        layout="vertical" 
                        onFinish={onFinish} 
                        initialValues={{ Pv: 40, Part: 100, Vr: 2, Pr: 100, resolution: 10000, k: 50 }} // k의 초기값 50 설정
                    >
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
                        <Form.Item label="k value (0-100)" name="k">
                            <Slider min={0} max={100} />
                        </Form.Item>
                        <div className="button-group">
                            <Button type="primary" htmlType="submit">Submit</Button>
                            <Button onClick={() => navigate("/")}>Back to Home</Button>
                        </div>
                    </Form>
                </Card>
            </div>
            <div className="graph-container">
                <div className="graph-div">
                    <svg id="graph"></svg>
                </div>
                <div className="graph-button-div">
                    <Button className="graph-button" onClick={() => toggleGraphType("volume-alveoli")}>Va</Button>
                    <Button className="graph-button" onClick={() => toggleGraphType("pressure-alveoli")}>Pa</Button>
                    <Button className="graph-button" onClick={() => toggleGraphType("volume-blood")}>Vb</Button>
                </div>
            </div>
        </div>
    );
}
