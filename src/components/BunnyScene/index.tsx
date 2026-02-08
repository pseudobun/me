'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import * as THREE from 'three';

function parsePathVertices(d: string): [number, number][] {
  const verts: [number, number][] = [];
  const re = /[ML]\s*([\d.eE+-]+)\s+([\d.eE+-]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(d)) !== null) {
    const x = Number.parseFloat(m[1]);
    const y = Number.parseFloat(m[2]);
    if (
      !verts.some(
        (v) => Math.abs(v[0] - x) < 0.5 && Math.abs(v[1] - y) < 0.5,
      )
    ) {
      verts.push([x, y]);
    }
  }
  return verts;
}

function hexToRgb(hex: string): [number, number, number] {
  return [
    Number.parseInt(hex.slice(1, 3), 16) / 255,
    Number.parseInt(hex.slice(3, 5), 16) / 255,
    Number.parseInt(hex.slice(5, 7), 16) / 255,
  ];
}

function BunnyHead() {
  const meshRef = useRef<THREE.Group>(null);
  const [svgText, setSvgText] = useState<string | null>(null);
  const animProgress = useRef(0);

  useEffect(() => {
    fetch('/bunnysden.svg')
      .then((res) => res.text())
      .then(setSvgText);
  }, []);

  const { frontGeo, backGeo } = useMemo(() => {
    if (!svgText) return { frontGeo: null, backGeo: null };

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');

    const headGroup = doc.querySelector('g[filter="url(#Filter)"]');
    if (!headGroup) return { frontGeo: null, backGeo: null };

    const paths = headGroup.querySelectorAll('path');
    const positions: number[] = [];
    const colors: number[] = [];

    // SVG bunny head bounds: x ~[262-761], y ~[0-650]
    const cx = 512;
    const cy = 330;
    const scale = 1 / 170;
    const domeRadius = 3.5;

    for (const path of paths) {
      const d = path.getAttribute('d');
      const fill = path.getAttribute('fill');
      if (!d || !fill || fill === 'none') continue;

      const verts = parsePathVertices(d);
      if (verts.length < 3) continue;

      const [r, g, b] = hexToRgb(fill);

      for (let i = 0; i < 3; i++) {
        const vx = (verts[i][0] - cx) * scale;
        const vy = -(verts[i][1] - cy) * scale;

        // Spherical dome projection
        const dist = Math.sqrt(vx * vx + vy * vy);
        const maxDist = domeRadius * 0.82;
        const normDist = Math.min(dist, maxDist) / maxDist;
        const vz =
          Math.sqrt(Math.max(0.001, 1 - normDist * normDist)) *
            domeRadius *
            0.35 -
          0.15;

        positions.push(vx, vy, vz);
        colors.push(r, g, b);
      }
    }

    const frontGeometry = new THREE.BufferGeometry();
    frontGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3),
    );
    frontGeometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colors, 3),
    );
    frontGeometry.computeVertexNormals();

    // Create back shell (mirrored z, darker colors)
    const backPositions: number[] = [];
    const backColors: number[] = [];
    for (let i = 0; i < positions.length; i += 3) {
      backPositions.push(positions[i], positions[i + 1], positions[i + 2] - 0.3);
      const ci = i;
      backColors.push(
        colors[ci] * 0.3,
        colors[ci + 1] * 0.3,
        colors[ci + 2] * 0.3,
      );
    }
    const backGeometry = new THREE.BufferGeometry();
    backGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(backPositions, 3),
    );
    backGeometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(backColors, 3),
    );
    backGeometry.computeVertexNormals();

    return { frontGeo: frontGeometry, backGeo: backGeometry };
  }, [svgText]);

  useFrame(({ pointer, clock }) => {
    if (!meshRef.current) return;

    // Entrance animation
    animProgress.current = Math.min(animProgress.current + 0.008, 1);
    const ease = 1 - (1 - animProgress.current) ** 3; // easeOutCubic
    meshRef.current.scale.setScalar(ease);

    // Mouse-follow rotation with smooth lerp
    const targetY = pointer.x * 0.35;
    const targetX = -pointer.y * 0.25;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetY,
      0.04,
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetX,
      0.04,
    );

    // Floating animation
    meshRef.current.position.y =
      Math.sin(clock.elapsedTime * 0.6) * 0.1;
  });

  if (!frontGeo || !backGeo) return null;

  return (
    <group ref={meshRef} scale={0}>
      <mesh geometry={frontGeo}>
        <meshStandardMaterial
          vertexColors
          flatShading
          side={THREE.FrontSide}
          roughness={0.55}
          metalness={0.05}
        />
      </mesh>
      <mesh geometry={backGeo}>
        <meshStandardMaterial
          vertexColors
          flatShading
          side={THREE.BackSide}
          roughness={0.8}
          metalness={0.0}
        />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const initialPositions = useRef<Float32Array | null>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 60;
    const positions = new Float32Array(count * 3);
    const opacities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 4;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = Math.sin(theta) * radius - 2;
      opacities[i] = Math.random();
    }

    initialPositions.current = positions.slice();
    geo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3),
    );
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current || !initialPositions.current) return;

    const positions = ref.current.geometry.attributes.position
      .array as Float32Array;
    const init = initialPositions.current;
    const t = clock.elapsedTime;

    for (let i = 0; i < positions.length / 3; i++) {
      const i3 = i * 3;
      positions[i3] = init[i3] + Math.sin(t * 0.3 + i * 0.5) * 0.15;
      positions[i3 + 1] =
        init[i3 + 1] + Math.sin(t * 0.4 + i * 0.7) * 0.2;
      positions[i3 + 2] =
        init[i3 + 2] + Math.cos(t * 0.2 + i * 0.3) * 0.1;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;

    ref.current.rotation.y = t * 0.01;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.025}
        color="#f0a17a"
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.1}
        color="#fff8f0"
      />
      <directionalLight
        position={[-4, -2, -4]}
        intensity={0.25}
        color="#ffd0b0"
      />
      <pointLight
        position={[0, 4, 4]}
        intensity={0.4}
        color="#fff5ee"
        distance={12}
      />
      <pointLight
        position={[-3, -2, 2]}
        intensity={0.15}
        color="#e0c0ff"
        distance={10}
      />
      <BunnyHead />
      <FloatingParticles />
    </>
  );
}

export default function BunnyScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-muted-foreground/20 border-t-primary animate-spin" />
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
