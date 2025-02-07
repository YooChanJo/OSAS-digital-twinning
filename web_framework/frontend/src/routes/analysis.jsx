import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Form, Typography, Card, Slider } from "antd";
import "./analysis.css";
import * as d3 from "d3";
import { Solver } from "../utils/simulationAnalysis/solver";
import { NinSampleGenerator, VinSampleGenerator } from "../utils/simulationAnalysis/sampleGenerator";

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
    const [activated] = useState(splitQuery[6] == "True");
    
    useEffect(() => {
        const divWidth = document.querySelector(".graph-div").offsetWidth;
        const divHeight = document.querySelector(".graph-div").offsetHeight;
        drawGraph(divWidth * 0.8, divHeight * 0.8, { top: 70, right: 50, bottom: 50, left: 50 });
    }, [data, graphType]);
    const calculateDataAndUpdate = () => {
        console.time("calculation time");
        const solver = new Solver({ Pv, Part, Vr, Pr, resolution, k: k * 1e-9 });
        const VinSample = VinSampleGenerator(2, solver.dt);
        const NinSample = NinSampleGenerator(2, solver.dt);
        solver.attachInput({Vin: VinSample, Nin: NinSample});
        const inputLength = solver.getInputLength();
        let tmpData = [];
        console.log("working");
        let index = 1;
        const interval = setInterval(() => {
            if(index >= inputLength) {
                console.timeEnd("calculation time");
                clearInterval(interval);
            }
            else {
                solver.evolveSteps(10);
                index += 10;
                tmpData = solver.refinedHistory();
                setData(tmpData);
                console.log(tmpData);
            }
        }, 100);
    };
    useEffect(() => {
        if(splitQuery.length !== 7) navigate("/");
        if(activated) { // start calculation
            calculateDataAndUpdate();
        }
    }, []);

    const onFinish = (values) => {
        const query = `${values.Pv}_${values.Part}_${values.Vr}_${values.Pr}_${values.resolution}_${values.k}`;
        navigate(`/analysis/blood-O2/${query}_True`);
    };

    const drawGraph = (width, height, margin) => {
    
        const svg = d3.select("#graph")
            .attr("width", width)
            .attr("height", height);
    
        svg.selectAll("*").remove(); // 이전 그래프 제거
    
        const x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.t)])
            .range([margin.left, width - margin.right]);
    
        const y = d3.scaleLinear()
            .domain([d3.min(data, d => (graphType === "Va" ? d.Va : graphType === "Pa" ? d.Pa : d.Part)), d3.max(data, d => (graphType === "Va" ? d.Va : graphType === "Pa" ? d.Pa : d.Part))])
            .range([height - margin.bottom, margin.top]);
    
        // X 축 스타일 변경 (얇은 회색 선)
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x))
            
            // .selectAll("path, line, text")
            // .style("stroke", "#707070")  // 진한 회색 축
            // .style("fill", "#707070")    // 텍스트 진한 회색
            // .style("stroke-width", 0.05);   // 얇은 선
    
        // Y 축 스타일 변경 (얇은 회색 선)
        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            // .selectAll("path, line, text")
            // .style("stroke", "#707070")  // 진한 회색 축
            // .style("fill", "#707070")    // 텍스트 진한 회색
            // .style("stroke-width", 0.05);   // 얇은 선

        const line = d3.line()
        .x(data => x(data.t))
        .y(data => y((graphType === "Va" ? data.Va : graphType === "Pa" ? data.Pa : data.Part)));

        svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1)
        .attr("d", line);

        // .selectAll("circle")
        // .data(data)
        // .enter()
        // .append("circle")
        // .attr("cx", d => x(d.time))
        // .attr("cy", d => y((graphType === "Va" ? d.Va : graphType === "Pa" ? d.Pa : d.Part)))
        // .attr("r", 3)
        // .style("fill", "#707070")
        // .transition()
        // .duration(500)
        // .ease(d3.easeCircleIn);
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
