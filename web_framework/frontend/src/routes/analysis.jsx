import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Form, Typography, Card, Slider } from "antd";
import "./analysis.css";
import * as d3 from "d3";

const { Title, Paragraph } = Typography;

export default function Analysis() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [graphType, setGraphType] = useState("Va"); // "Va" or "Pa" or "Part"
    
    const query = useParams().query;
    const splitQuery = query.split('_');
    const [Pv, setPv] = useState(Number(splitQuery[0]));
    const [Part, setPart] = useState(Number(splitQuery[1]));
    const [Vr, setVr] = useState(Number(splitQuery[2]));
    const [Pr, setPr] = useState(Number(splitQuery[3]));
    const [resolution, setResolution] = useState(Number(splitQuery[4]));
    const [k, setK] = useState(Number(splitQuery[5]));

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
        console.log(values)
        const query = `${values.Pv}_${values.Part}_${values.Vr}_${values.Pr}_${values.resolution}_${values.k}`;
        navigate(`/analysis/blood-O2/${query}`);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const divWidth = document.querySelector(".graph-div").offsetWidth;
        const divHeight = document.querySelector(".graph-div").offsetHeight;
        drawGraph(divWidth * 0.8, divHeight * 0.8, { top: 70, right: 50, bottom: 50, left: 50 });
    }, [data, graphType]);

    const drawGraph = (width, height, margin) => {
    
        const svg = d3.select("#graph")
            .attr("width", width)
            .attr("height", height);
    
        svg.selectAll("*").remove(); // 이전 그래프 제거
    
        const x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.time)])
            .range([margin.left, width - margin.right]);
    
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => (graphType === "volume-aveoli" ? d.volume : d.pressure))])
            .range([height - margin.bottom, margin.top]);
    
        svg.append("g")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => x(d.time))
            .attr("cy", d => y(graphType === "Va" ? d.volume : d.pressure))
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
                        initialValues={{ Pv: Pv, Part: Part, Vr: Vr, Pr: Pr, resolution: resolution, k: k }} // k의 초기값 50 설정
                    >
                        <Form.Item label="O₂ pressure of the venous blood (mmHg)" name="Pv" rules={[{ required: true }]}> 
                            <Input type="number" value={Pv} onChange={(v) => setPv(v)} />
                        </Form.Item>
                        <Form.Item label="Initial O₂ pressure of the arterial blood (mmHg)" name="Part" rules={[{ required: true }]}> 
                            <Input type="number" value={Part} onChange={(v) => setPart(v)} />
                        </Form.Item>
                        <Form.Item label="Initial volume of remaining air (L) (2~3)" name="Vr" rules={[{ required: true }]}> 
                            <Input type="number" value={Vr} onChange={(v) => setVr(v)} />
                        </Form.Item>
                        <Form.Item label="Initial O₂ pressure of remaining air (mmHg)" name="Pr" rules={[{ required: true }]}> 
                            <Input type="number" value={Pr} onChange={(v) => setPr(v)} />
                        </Form.Item>
                        <Form.Item label="Number of segments (resolution)" name="resolution" rules={[{ required: true }]}> 
                            <Input type="number" value={resolution} onChange={(v) => setResolution(v)} />
                        </Form.Item>
                        <Form.Item label="k value (1-10) * e-9 (mol / (m^2 * mmHg))" name="k">
                            <Slider min={0.1} max={10} step={0.1} value={k} onChange={(v) => setK(v)} />
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
                    <Button className="graph-button" onClick={() => setGraphType("Va")} style={{backgroundColor: graphType === "Va" ? "orange" : "#40a9ff"}}>Va</Button>
                    <Button className="graph-button" onClick={() => setGraphType("Pa")} style={{backgroundColor: graphType === "Pa" ? "orange" : "#40a9ff"}}>Pa</Button>
                    <Button className="graph-button" onClick={() => setGraphType("Vart")} style={{backgroundColor: graphType === "Vart" ? "orange" : "#40a9ff"}}>Vart</Button>
                </div>
            </div>
        </div>
    );
}
