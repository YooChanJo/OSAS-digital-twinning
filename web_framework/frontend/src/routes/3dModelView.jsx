import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import { OrbitControls } from "three-stdlib";
import { Button } from "antd";
import "./3DModelView.css"; // CSS 파일 import

const models = {
  "0%": "../../images/glbFiles/0per.glb",
  "50%": "../../images/glbFiles/50per.glb",
  "80%": "../../images/glbFiles/80per.glb",
  "100%": "../../images/glbFiles/100per.glb",
};

const ThreeDModelView = () => {
  const mountRef = useRef(null);
  const [currentModel, setCurrentModel] = useState(models["80%"]);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  let modelRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 0.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controlsRef.current = controls;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;

    const loader = new GLTFLoader();
    loader.load(currentModel, (gltf) => {
      if (modelRef.current) sceneRef.current.remove(modelRef.current);
      const model = gltf.scene;
      model.position.set(0, -1.5, 0);
      sceneRef.current.add(model);
      modelRef.current = model;
    });
  }, [currentModel]);

  const zoomIn = () => {
    if (cameraRef.current) cameraRef.current.position.z -= 0.2;
  };

  const zoomOut = () => {
    if (cameraRef.current) cameraRef.current.position.z += 0.2;
  };

  return (
    <div className="threeD-container">
      <h1 className="threeD-title">3D Model Viewer</h1>
      <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />
      
      {/* 모델 변경 버튼 */}
      <div className="model-buttons">
        {Object.keys(models).map((key) => (
          <Button key={key} onClick={() => setCurrentModel(models[key])}>
            {key}
          </Button>
        ))}
      </div>

      {/* 확대/축소 버튼 (오른쪽 하단) */}
      <div className="zoom-buttons">
        <Button onClick={zoomIn}>+</Button>
        <Button onClick={zoomOut}>-</Button>
      </div>
    </div>
  );
};

export default ThreeDModelView;
