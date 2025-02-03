import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import { OrbitControls } from "../components/orbitControls"; // 직접 만든 OrbitControls 파일 불러오기

const ThreeDModelView = () => {
  const canvasRef = useRef(null);
  const [currentModel, setCurrentModel] = useState(0); // 초기값을 0으로 설정

  // GLB 파일 경로들
  const models = [
    "../../images/glbFiles/0per.glb",  // 첫 번째 모델
    "../../images/glbFiles/50per.glb",  // 두 번째 모델
    "../../images/glbFiles/100per.glb"   // 세 번째 모델
  ];

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

    // 초기 렌더러 크기 설정
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1);

    // 카메라 위치 설정
    camera.position.set(0, 0, 3);
    camera.lookAt(0, 0, 20);

    // 조명 추가
    const ambientLight = new THREE.AmbientLight(0x404040, 1); // 주변광
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 방향광
    directionalLight.position.set(1, 1, 1).normalize(); // 방향광 위치 설정
    scene.add(ambientLight);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    let model;

    // 모델 로딩 함수
    const loadModel = (modelPath) => {
      if (model) {
        scene.remove(model);  // 기존 모델을 제거
      }
      loader.load(modelPath, (gltf) => {
        model = gltf.scene;
        scene.add(model);
      }, undefined, (error) => {
        console.error("모델 로딩 중 오류 발생:", error);
      });
    };

    // 첫 번째 모델 로드
    loadModel(models[currentModel]);

    // OrbitControls 추가
    const controls = new OrbitControls(camera, renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // OrbitControls 업데이트
      renderer.render(scene, camera);
    };
    animate();

    // 창 크기 변경 시 렌더러와 카메라 비율 업데이트
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // 모델 변경 시 로딩
    if (currentModel !== null) {
      loadModel(models[currentModel]);
    }

    // 정리 함수
    return () => {
      window.removeEventListener('resize', handleResize);

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) object.material.dispose();
        }
      });
    };
  }, [currentModel]);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
      <div 
        style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center', // 버튼을 중앙 정렬
          marginTop: '20px' // 버튼과 모델 간의 여유 공간
        }}
      >
        <button onClick={() => setCurrentModel(0)}>모델 1</button>
        <button onClick={() => setCurrentModel(1)}>모델 2</button>
        <button onClick={() => setCurrentModel(2)}>모델 3</button>
      </div>
    </div>
  );
};

export default ThreeDModelView;
