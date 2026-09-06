'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════
   GENUINE 3D iPHONE 16 PRO (TITANIUM PEACH / DESERT TITANIUM)
   Built with real Three.js WebGL:
   - Rounded rectangular extruded chassis with bezel & beveling
   - Front Face: Curved OLED screen, Dynamic Island, Welcome text & Cute 3D Robot
   - Back Face: Frosted Desert Titanium backplate, Apple logo, raised camera plateau
   - Camera Plateau: 3 sapphire lenses with titanium rings, flash & mic — correct L layout
   - Seamless 3D edges: antenna bands, power button, volume rockers, action button
   - Interactive 360° rotation & drag physics, with smooth spring return
   ═══════════════════════════════════════════════════════════════ */

export default function ThreeIphoneCanvas({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 460;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // ── STUDIO LIGHTING ──────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xfff5f0, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 6, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffd5c8, 1.5);
    fillLight.position.set(-5, -2, 4);
    scene.add(fillLight);

    const backRimLight = new THREE.DirectionalLight(0xff9880, 2.5);
    backRimLight.position.set(0, 4, -7);
    scene.add(backRimLight);

    // ── CREATE TEXTURES VIA 2D CANVAS ────────────────────────────
    // 1. Front Screen Canvas Texture
    const frontCanvas = document.createElement('canvas');
    frontCanvas.width = 1024;
    frontCanvas.height = 2048;
    const ctx = frontCanvas.getContext('2d')!;

    // Screen Background Gradient (Peach / Desert)
    const screenGrad = ctx.createLinearGradient(0, 0, 0, 2048);
    screenGrad.addColorStop(0, '#FFEFE9');
    screenGrad.addColorStop(0.5, '#FFDFD3');
    screenGrad.addColorStop(1, '#FFC2B2');
    ctx.fillStyle = screenGrad;
    ctx.fillRect(0, 0, 1024, 2048);

    // Dynamic Island
    ctx.fillStyle = '#050303';
    ctx.beginPath();
    ctx.roundRect(512 - 140, 60, 280, 75, 37.5);
    ctx.fill();

    // Camera Lens inside Dynamic Island
    ctx.fillStyle = '#111A14';
    ctx.beginPath();
    ctx.arc(512 - 70, 97.5, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#1C2920';
    ctx.beginPath();
    ctx.arc(512 - 70, 97.5, 8, 0, Math.PI * 2);
    ctx.fill();

    // Screen Header Tag
    ctx.fillStyle = '#F25A45';
    ctx.font = 'bold 36px sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('WINDMILL PROTOCOL', 90, 260);

    // Welcome & Trading Typography
    ctx.fillStyle = '#140E0C';
    ctx.font = '900 106px sans-serif';
    ctx.fillText('Discover', 90, 380);
    ctx.fillText('& Trade', 90, 485);
    
    // Live Trade Badge
    ctx.fillStyle = '#FFF2EE';
    ctx.strokeStyle = '#FFD5C8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(90, 520, 360, 60, 30);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10B981';
    ctx.beginPath();
    ctx.arc(125, 550, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#261915';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText('LIVE ORDERBOOK', 150, 558);

    // ── 3D CUTE BOT CHARACTER ON SCREEN ──────────────────────────
    // Shadow underneath robot
    const botShadow = ctx.createRadialGradient(512, 1720, 40, 512, 1720, 280);
    botShadow.addColorStop(0, 'rgba(180, 90, 70, 0.45)');
    botShadow.addColorStop(1, 'rgba(255, 230, 220, 0)');
    ctx.fillStyle = botShadow;
    ctx.beginPath();
    ctx.ellipse(512, 1720, 280, 70, 0, 0, Math.PI * 2);
    ctx.fill();

    // 1. Right Arm & Forearm (viewer's right)
    ctx.fillStyle = '#FAF5F2';
    ctx.strokeStyle = '#E2D3CC';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.roundRect(700, 1260, 110, 240, 55);
    ctx.fill();
    ctx.stroke();
    // Arm ring joint
    ctx.fillStyle = '#1E1715';
    ctx.beginPath();
    ctx.roundRect(690, 1340, 130, 24, 12);
    ctx.fill();

    // 2. Left Arm & Forearm (viewer's left)
    ctx.fillStyle = '#FAF5F2';
    ctx.beginPath();
    ctx.roundRect(220, 1260, 110, 240, 55);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#1E1715';
    ctx.beginPath();
    ctx.roundRect(210, 1340, 130, 24, 12);
    ctx.fill();

    // 3. Robot Neck Joint
    ctx.fillStyle = '#221A18';
    ctx.beginPath();
    ctx.roundRect(460, 1180, 104, 60, 20);
    ctx.fill();

    // 4. Robot Torso with glossy ceramic bevel
    const torsoGrad = ctx.createLinearGradient(340, 1220, 680, 1600);
    torsoGrad.addColorStop(0, '#FFFFFF');
    torsoGrad.addColorStop(0.5, '#F7ECE7');
    torsoGrad.addColorStop(1, '#DECBC3');
    ctx.fillStyle = torsoGrad;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.roundRect(330, 1210, 364, 390, 130);
    ctx.fill();
    ctx.stroke();

    // Chest Collar & Core Indicator
    ctx.fillStyle = '#1A1311';
    ctx.beginPath();
    ctx.roundRect(432, 1260, 160, 36, 18);
    ctx.fill();
    ctx.fillStyle = '#FF6B57';
    ctx.beginPath();
    ctx.arc(512, 1278, 9, 0, Math.PI * 2);
    ctx.fill();

    // Chest Display Screen (Crypto protocol stats)
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(412, 1340, 200, 160, 45);
    ctx.fill();

    // 5. Robot Head Outer Casing (Rounded television bulb shape)
    const headGrad = ctx.createLinearGradient(200, 680, 820, 1200);
    headGrad.addColorStop(0, '#FFFFFF');
    headGrad.addColorStop(0.6, '#F8EFEA');
    headGrad.addColorStop(1, '#DFCFC8');
    ctx.fillStyle = headGrad;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.roundRect(220, 680, 584, 510, 175);
    ctx.fill();
    ctx.stroke();

    // Left Ear / Antenna Dial
    ctx.fillStyle = '#DFCFC8';
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.roundRect(175, 870, 65, 130, 32.5);
    ctx.fill();
    ctx.stroke();

    // Metallic Antenna
    ctx.strokeStyle = '#998781';
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(215, 870);
    ctx.lineTo(135, 720);
    ctx.stroke();
    // Antenna Ball Tip
    ctx.fillStyle = '#FF5A43';
    ctx.beginPath();
    ctx.arc(130, 710, 30, 0, Math.PI * 2);
    ctx.fill();

    // Right Ear Dial
    ctx.fillStyle = '#DFCFC8';
    ctx.beginPath();
    ctx.roundRect(784, 870, 65, 130, 32.5);
    ctx.fill();
    ctx.stroke();

    // 6. Black OLED Face Screen
    const faceGrad = ctx.createLinearGradient(280, 740, 740, 1130);
    faceGrad.addColorStop(0, '#1E1715');
    faceGrad.addColorStop(1, '#0C0807');
    ctx.fillStyle = faceGrad;
    ctx.beginPath();
    ctx.roundRect(276, 735, 472, 400, 125);
    ctx.fill();

    // 7. Glowing Orange/Coral Vertical Oval Eyes
    ctx.fillStyle = '#FF5A43';
    ctx.shadowColor = '#FF4E36';
    ctx.shadowBlur = 55;
    ctx.beginPath();
    ctx.ellipse(415, 935, 52, 98, 0, 0, Math.PI * 2);
    ctx.ellipse(609, 935, 52, 98, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // Reset

    // Eye Core Highlights (bright coral reflection)
    ctx.fillStyle = '#FF8B7A';
    ctx.beginPath();
    ctx.ellipse(415, 935, 38, 76, 0, 0, Math.PI * 2);
    ctx.ellipse(609, 935, 38, 76, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFF5F2';
    ctx.beginPath();
    ctx.ellipse(405, 905, 14, 28, 0, 0, Math.PI * 2);
    ctx.ellipse(599, 905, 14, 28, 0, 0, Math.PI * 2);
    ctx.fill();

    // Home Indicator Bar
    ctx.fillStyle = '#1A1412';
    ctx.beginPath();
    ctx.roundRect(512 - 160, 1980, 320, 14, 7);
    ctx.fill();

    const frontTexture = new THREE.CanvasTexture(frontCanvas);

    // ── BACK FACE CANVAS TEXTURE ──────────────────────────────────
    // Exact match to iPhone 16 Pro Desert Titanium backplate from reference photos
    const backCanvas = document.createElement('canvas');
    backCanvas.width = 1024;
    backCanvas.height = 2048;
    const bCtx = backCanvas.getContext('2d')!;

    // Desert titanium / copper-orange satin backplate base
    const backGrad = bCtx.createLinearGradient(0, 0, 0, 2048);
    backGrad.addColorStop(0, '#E47432');
    backGrad.addColorStop(0.3, '#DB6926');
    backGrad.addColorStop(0.7, '#D25E1D');
    backGrad.addColorStop(1, '#C25013');
    bCtx.fillStyle = backGrad;
    bCtx.fillRect(0, 0, 1024, 2048);

    // Subtle satin brushed texture sheen
    bCtx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    bCtx.lineWidth = 1;
    for (let i = 0; i < 2048; i += 6) {
      bCtx.beginPath();
      bCtx.moveTo(0, i);
      bCtx.lineTo(1024, i);
      bCtx.stroke();
    }

    // ── LOWER BODY MATTE PANEL (matching reference photo) ─────────
    const lowerPanelX = 60;
    const lowerPanelY = 710;
    const lowerPanelW = 904;
    const lowerPanelH = 1250;
    const lowerPanelR = 80;

    const panelGrad = bCtx.createLinearGradient(0, lowerPanelY, 0, lowerPanelY + lowerPanelH);
    panelGrad.addColorStop(0, '#DA6724');
    panelGrad.addColorStop(1, '#C45214');
    bCtx.fillStyle = panelGrad;
    bCtx.beginPath();
    bCtx.roundRect(lowerPanelX, lowerPanelY, lowerPanelW, lowerPanelH, lowerPanelR);
    bCtx.fill();

    // Subtle border around lower matte panel
    bCtx.strokeStyle = 'rgba(255, 215, 195, 0.3)';
    bCtx.lineWidth = 3;
    bCtx.beginPath();
    bCtx.roundRect(lowerPanelX, lowerPanelY, lowerPanelW, lowerPanelH, lowerPanelR);
    bCtx.stroke();

    const backTexture = new THREE.CanvasTexture(backCanvas);

    // ── EXACT APPLE LOGO FROM USER IMAGE ─────────────────────────
    // Directly renders the user-provided Apple logo image perfectly centered
    const logoImg = new Image();
    logoImg.src = '/apple-logo.png';
    const drawAppleLogo = () => {
      const logoW = 210;
      const logoH = Math.round(logoW * (348 / 286)); // ~255
      bCtx.drawImage(logoImg, 512 - logoW / 2, 1340 - logoH / 2, logoW, logoH);
      backTexture.needsUpdate = true;
    };
    if (logoImg.complete) {
      drawAppleLogo();
    } else {
      logoImg.onload = drawAppleLogo;
    }

    // ── 3D IPHONE GEOMETRY GROUP ─────────────────────────────────
    const phoneGroup = new THREE.Group();
    scene.add(phoneGroup);

    // Rounded rectangle shape for phone body with authentic iPhone Pro curve curvature
    const phoneWidth = 2.42;
    const phoneHeight = 4.96;
    const phoneRadius = 0.46;
    const phoneThickness = 0.22;

    const createPhoneShape = (w: number, h: number, r: number) => {
      const s = new THREE.Shape();
      const x = -w / 2;
      const y = -h / 2;
      s.moveTo(x, y + r);
      s.lineTo(x, y + h - r);
      s.quadraticCurveTo(x, y + h, x + r, y + h);
      s.lineTo(x + w - r, y + h);
      s.quadraticCurveTo(x + w, y + h, x + w, y + h - r);
      s.lineTo(x + w, y + r);
      s.quadraticCurveTo(x + w, y, x + w - r, y);
      s.lineTo(x + r, y);
      s.quadraticCurveTo(x, y, x, y + r);
      return s;
    };

    const shape = createPhoneShape(phoneWidth, phoneHeight, phoneRadius);

    // Contoured Apple-style beveling for smooth ergonomic edges
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: phoneThickness,
      bevelEnabled: true,
      bevelSegments: 16,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.07,
    };

    const chassisGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    chassisGeometry.center();

    // Titanium Chassis Material with vibrant Desert Copper sheen
    const titaniumChassisMaterial = new THREE.MeshStandardMaterial({
      color: 0xde6c26,
      roughness: 0.26,
      metalness: 0.85,
    });

    const chassisMesh = new THREE.Mesh(chassisGeometry, titaniumChassisMaterial);
    chassisMesh.castShadow = true;
    chassisMesh.receiveShadow = true;
    phoneGroup.add(chassisMesh);

    // Screen and Back shapes matching exact curved borders
    const screenShape = createPhoneShape(phoneWidth * 0.955, phoneHeight * 0.955, phoneRadius * 0.92);
    const frontPlaneGeo = new THREE.ShapeGeometry(screenShape, 32);
    const pos = frontPlaneGeo.attributes.position;
    const uvs = new Float32Array((pos.count) * 2);
    const sw = phoneWidth * 0.955;
    const sh = phoneHeight * 0.955;
    for (let i = 0; i < pos.count; i++) {
      uvs[i * 2] = (pos.getX(i) + sw / 2) / sw;
      uvs[i * 2 + 1] = (pos.getY(i) + sh / 2) / sh;
    }
    frontPlaneGeo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

    const frontPlaneMat = new THREE.MeshBasicMaterial({ map: frontTexture, transparent: true });
    const frontPlane = new THREE.Mesh(frontPlaneGeo, frontPlaneMat);
    frontPlane.position.z = phoneThickness / 2 + 0.072;
    phoneGroup.add(frontPlane);

    // Back Plate Plane
    const backShape = createPhoneShape(phoneWidth * 0.955, phoneHeight * 0.955, phoneRadius * 0.92);
    const backPlaneGeo = new THREE.ShapeGeometry(backShape, 32);
    const backPos = backPlaneGeo.attributes.position;
    const backUvs = new Float32Array(backPos.count * 2);
    for (let i = 0; i < backPos.count; i++) {
      backUvs[i * 2] = 1.0 - (backPos.getX(i) + sw / 2) / sw;
      backUvs[i * 2 + 1] = (backPos.getY(i) + sh / 2) / sh;
    }
    backPlaneGeo.setAttribute('uv', new THREE.BufferAttribute(backUvs, 2));

    const backPlaneMat = new THREE.MeshStandardMaterial({
      map: backTexture,
      roughness: 0.35,
      metalness: 0.25,
    });
    const backPlane = new THREE.Mesh(backPlaneGeo, backPlaneMat);
    backPlane.rotation.y = Math.PI;
    backPlane.position.z = -(phoneThickness / 2 + 0.072);
    phoneGroup.add(backPlane);

    // ── CAMERA VISOR / PLATEAU (SLEEK HORIZONTAL VISOR, NOT SQUARISH) ──
    // In reference photo, the camera visor is a wide, horizontal pill-like shape
    // spanning across the top of the phone (~90% width, ~28% height, aspect ratio ~ 1.6:1)
    const plateauGroup = new THREE.Group();
    const pW = 2.14;   // Wide horizontal visor
    const pH = 1.34;   // Sleek horizontal proportion
    const pRad = 0.42; // Very smooth, rounded organic corners matching phone contour

    // Position at upper portion of back
    const plateauPosY = phoneHeight / 2 - pH / 2 - 0.16; // ~1.65
    plateauGroup.position.set(0, plateauPosY, -(phoneThickness / 2 + 0.03));
    plateauGroup.rotation.y = Math.PI;
    phoneGroup.add(plateauGroup);

    const pShape = new THREE.Shape();
    const px = -pW / 2;
    const py = -pH / 2;
    pShape.moveTo(px, py + pRad);
    pShape.lineTo(px, py + pH - pRad);
    pShape.quadraticCurveTo(px, py + pH, px + pRad, py + pH);
    pShape.lineTo(px + pW - pRad, py + pH);
    pShape.quadraticCurveTo(px + pW, py + pH, px + pW, py + pH - pRad);
    pShape.lineTo(px + pW, py + pRad);
    pShape.quadraticCurveTo(px + pW, py, px + pW - pRad, py);
    pShape.lineTo(px + pRad, py);
    pShape.quadraticCurveTo(px, py, px, py + pRad);

    const plateauExtrude = new THREE.ExtrudeGeometry(pShape, {
      depth: 0.045,
      bevelEnabled: true,
      bevelSize: 0.028,
      bevelThickness: 0.022,
      bevelSegments: 8,
    });
    plateauExtrude.center();
    const plateauMat = new THREE.MeshStandardMaterial({
      color: 0xdf6e2e,
      roughness: 0.26,
      metalness: 0.78,
    });
    const plateauMesh = new THREE.Mesh(plateauExtrude, plateauMat);
    plateauGroup.add(plateauMesh);

    // ── TRIPLE CAMERA LENSES (LARGE LENSES & TIGHT TRIANGLE MATCHING PHOTO) ──
    // Reference close-up photo media_1788664293205.png:
    // Left column: Top-left and bottom-left large lenses (x: -0.56, y: ±0.28)
    // Middle column: Third lens nestled tightly between them (x: -0.10, y: 0.00)
    // Large prominent radius: outerR 0.245, innerR 0.195
    const lensData = [
      { x: -0.56, y: 0.28,  outerR: 0.245, innerR: 0.195, pupilR: 0.088 }, // top-left
      { x: -0.56, y: -0.28, outerR: 0.245, innerR: 0.195, pupilR: 0.088 }, // bottom-left
      { x: -0.10, y: 0.00,  outerR: 0.245, innerR: 0.195, pupilR: 0.088 }, // middle (tight cluster)
    ];

    lensData.forEach(({ x, y, outerR, innerR, pupilR }) => {
      // Titanium Bronze Outer Ring with authentic chamfered rim
      const ringGeo = new THREE.CylinderGeometry(outerR, outerR, 0.065, 40);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0xcc6024, roughness: 0.18, metalness: 0.92 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(x, y, 0.048);
      plateauGroup.add(ring);

      // Deep Black Lens Glass Core
      const lensGeo = new THREE.CylinderGeometry(innerR, innerR, 0.07, 40);
      const lensMat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.03, metalness: 0.98 });
      const lens = new THREE.Mesh(lensGeo, lensMat);
      lens.rotation.x = Math.PI / 2;
      lens.position.set(x, y, 0.052);
      plateauGroup.add(lens);

      // Sapphire Blue/Green Pupil Element
      const pupilGeo = new THREE.CircleGeometry(pupilR, 24);
      const pupilMat = new THREE.MeshBasicMaterial({ color: 0x0a221c });
      const pupil = new THREE.Mesh(pupilGeo, pupilMat);
      pupil.position.set(x, y, 0.092);
      plateauGroup.add(pupil);
    });

    // ── FLASH, MIC & LIDAR (RIGHT COLUMN OF VISOR) ────────────────
    const rightColX = 0.58;

    // 1. True Tone Flash (Top-Right, aligned with top lens)
    const flashRingGeo = new THREE.CylinderGeometry(0.092, 0.092, 0.035, 28);
    const flashRingMat = new THREE.MeshStandardMaterial({ color: 0xe8e2dc, roughness: 0.18, metalness: 0.9 });
    const flashRing = new THREE.Mesh(flashRingGeo, flashRingMat);
    flashRing.rotation.x = Math.PI / 2;
    flashRing.position.set(rightColX, 0.28, 0.038);
    plateauGroup.add(flashRing);

    const flashGlassGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.04, 28);
    const flashGlassMat = new THREE.MeshStandardMaterial({ color: 0xf8f5ee, roughness: 0.12, metalness: 0.1 });
    const flashGlass = new THREE.Mesh(flashGlassGeo, flashGlassMat);
    flashGlass.rotation.x = Math.PI / 2;
    flashGlass.position.set(rightColX, 0.28, 0.044);
    plateauGroup.add(flashGlass);

    const ledCoreGeo = new THREE.CircleGeometry(0.042, 20);
    const ledCoreMat = new THREE.MeshBasicMaterial({ color: 0xffe5a3 });
    const ledCore = new THREE.Mesh(ledCoreGeo, ledCoreMat);
    ledCore.position.set(rightColX, 0.28, 0.068);
    plateauGroup.add(ledCore);

    // 2. Microphone Pinhole (Middle-Right, between flash and lidar)
    const micGeo = new THREE.CircleGeometry(0.016, 16);
    const micMat = new THREE.MeshBasicMaterial({ color: 0x0a0706 });
    const micHole = new THREE.Mesh(micGeo, micMat);
    micHole.position.set(rightColX - 0.02, 0.04, 0.052);
    plateauGroup.add(micHole);

    // 3. LiDAR / Camera Sensor (Bottom-Right, aligned with bottom lens)
    const lidarRingGeo = new THREE.CylinderGeometry(0.088, 0.088, 0.032, 28);
    const lidarRingMat = new THREE.MeshStandardMaterial({ color: 0x241814, roughness: 0.3, metalness: 0.8 });
    const lidarRing = new THREE.Mesh(lidarRingGeo, lidarRingMat);
    lidarRing.rotation.x = Math.PI / 2;
    lidarRing.position.set(rightColX, -0.26, 0.036);
    plateauGroup.add(lidarRing);

    const lidarGlassGeo = new THREE.CircleGeometry(0.072, 24);
    const lidarGlassMat = new THREE.MeshBasicMaterial({ color: 0x050404 });
    const lidarGlass = new THREE.Mesh(lidarGlassGeo, lidarGlassMat);
    lidarGlass.position.set(rightColX, -0.26, 0.056);
    plateauGroup.add(lidarGlass);

    // ── BUTTONS ON CHASSIS SIDES ─────────────────────────────────
    const buttonMat = new THREE.MeshStandardMaterial({ color: 0xba4836, roughness: 0.3, metalness: 0.8 });

    // Action Button (Left side top)
    const actionBtn = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.12), buttonMat);
    actionBtn.position.set(-phoneWidth / 2 - 0.04, 1.2, 0);
    phoneGroup.add(actionBtn);

    // Volume Up & Down (Left side)
    const volUp = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.38, 0.12), buttonMat);
    volUp.position.set(-phoneWidth / 2 - 0.04, 0.75, 0);
    phoneGroup.add(volUp);

    const volDown = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.38, 0.12), buttonMat);
    volDown.position.set(-phoneWidth / 2 - 0.04, 0.28, 0);
    phoneGroup.add(volDown);

    // Power Button (Right side)
    const powerBtn = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.52, 0.12), buttonMat);
    powerBtn.position.set(phoneWidth / 2 + 0.04, 0.65, 0);
    phoneGroup.add(powerBtn);

    // Camera Control Pad (Right side lower)
    const camPad = new THREE.Mesh(
      new THREE.BoxGeometry(0.03, 0.42, 0.11),
      new THREE.MeshStandardMaterial({ color: 0x9c3322, roughness: 0.6 })
    );
    camPad.position.set(phoneWidth / 2 + 0.035, -0.85, 0);
    phoneGroup.add(camPad);

    // ── INTERACTIVE ROTATION DRAG CONTROLS ───────────────────────
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
      container.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      targetRotationY += deltaX * 0.018;
      targetRotationX = Math.max(-0.4, Math.min(0.4, targetRotationX + deltaY * 0.012));

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      container.releasePointerCapture?.(e.pointerId);
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointercancel', onPointerUp);

    // ── ANIMATION LOOP ───────────────────────────────────────────
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth damping towards target rotation
      phoneGroup.rotation.y += (targetRotationY - phoneGroup.rotation.y) * 0.1;
      phoneGroup.rotation.x += (targetRotationX - phoneGroup.rotation.x) * 0.1;

      // Subtle natural idle floating when not actively dragged
      if (!isDragging) {
        phoneGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.07;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointercancel', onPointerUp);
      resizeObserver.disconnect();
      renderer.dispose();
      chassisGeometry.dispose();
      plateauExtrude.dispose();
      frontPlaneGeo.dispose();
      backPlaneGeo.dispose();
      titaniumChassisMaterial.dispose();
      plateauMat.dispose();
      frontTexture.dispose();
      backTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      <div
        ref={mountRef}
        className="w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px] h-[410px] sm:h-[450px] md:h-[490px] lg:h-[510px] cursor-grab active:cursor-grabbing touch-none"
        title="Click & Drag to rotate in 3D"
      />
      <span className="text-[10px] font-mono font-bold text-[#8C7169] uppercase tracking-widest mt-1 opacity-85 flex items-center gap-1.5 pointer-events-none">
        <span>↔</span> 360° Real 3D Turn
      </span>
    </div>
  );
}
