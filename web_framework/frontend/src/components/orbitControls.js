import * as THREE from 'three';

class OrbitControls {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;

    this.enabled = true;
    this.enableDamping = true;
    this.dampingFactor = 0.25;

    // 이 위치로 이동
    this.target = new THREE.Vector3(0, 0, 0);

    this.rotationSpeed = 1.0;
    this.zoomSpeed = 1.2;
    this.panSpeed = 0.3;

    this.minDistance = 0;
    this.maxDistance = Infinity;

    this.state = 'NONE';

    this.mousePos = new THREE.Vector2();

    // 마우스 이벤트 핸들러 설정
    this.domElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.domElement.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.domElement.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.domElement.addEventListener('wheel', this.onMouseWheel.bind(this));
  }

  onMouseDown(event) {
    if (!this.enabled) return;

    event.preventDefault();

    if (event.button === 0) {
      this.state = 'ROTATE';
    }

    this.mousePos.set(event.clientX, event.clientY);
  }

  onMouseMove(event) {
    if (!this.enabled) return;

    if (this.state === 'ROTATE') {
      const deltaX = (event.clientX - this.mousePos.x) * this.rotationSpeed;
      const deltaY = (event.clientY - this.mousePos.y) * this.rotationSpeed;

      this.camera.rotation.y -= deltaX * 0.005;
      this.camera.rotation.x -= deltaY * 0.005;

      this.mousePos.set(event.clientX, event.clientY);
    }
  }

  onMouseUp() {
    if (!this.enabled) return;
    this.state = 'NONE';
  }

  onMouseWheel(event) {
    if (!this.enabled) return;

    const delta = event.deltaY > 0 ? -1 : 1;

    // 줌
    const distance = this.camera.position.distanceTo(this.target);
    const newDistance = Math.max(
      this.minDistance,
      Math.min(this.maxDistance, distance + delta * this.zoomSpeed)
    );

    this.camera.position.set(
      this.camera.position.x * (newDistance / distance),
      this.camera.position.y * (newDistance / distance),
      this.camera.position.z * (newDistance / distance)
    );
  }

  update() {
    if (this.enableDamping) {
      this.camera.rotation.x += (this.target.x - this.camera.rotation.x) * this.dampingFactor;
      this.camera.rotation.y += (this.target.y - this.camera.rotation.y) * this.dampingFactor;
    }
  }
}

export { OrbitControls };
