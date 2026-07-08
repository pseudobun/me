'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { cn } from '@/lib/utils';
import { COLORS, POSITIONS } from './geometry';

/**
 * The Bunny's Den logo rebuilt as a closed low-poly 3D head and rendered with
 * three.js. The front facets carry their baked SVG shades; the generated back
 * and sides make it solid from every angle. It's lit with a studio environment
 * for a soft PBR sheen and spring-damped so it turns to face the pointer with a
 * little weight. Falls back to a still pose when the visitor prefers reduced
 * motion, and pauses when off-screen or backgrounded.
 */
export default function BunnyHead({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio, 2);
    let size = mount.clientWidth || 48;

    // ---- renderer ----------------------------------------------------------
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(dpr);
    renderer.setSize(size, size);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    // ---- scene / camera ----------------------------------------------------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 5.6);

    // Studio environment for realistic reflections/ambient, generated at
    // runtime (no external asset, CSP-safe).
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envMap;

    // ---- geometry / material ----------------------------------------------
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(POSITIONS.slice(), 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(COLORS.slice(), 3));
    geometry.computeVertexNormals(); // per-face normals (unshared verts -> flat)
    geometry.center();

    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      flatShading: true,
      roughness: 0.58,
      metalness: 0.1,
      envMapIntensity: 0.35,
    });

    const bunny = new THREE.Mesh(geometry, material);
    bunny.scale.setScalar(0.92);
    const group = new THREE.Group();
    group.add(bunny);
    scene.add(group);

    // ---- lights (three-point + tinted rim) ---------------------------------
    scene.add(new THREE.AmbientLight(0xffffff, 0.22));
    const key = new THREE.DirectionalLight(0xffffff, 0.85);
    key.position.set(2, 3, 4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xdfe6ff, 0.35);
    fill.position.set(-3, 1, 2);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0x8698eb, 0.65); // brand "wave"
    rim.position.set(-1.5, -2, -3);
    scene.add(rim);

    // ---- pointer follow with a critically-damped spring --------------------
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const vel = { x: 0, y: 0 };
    const MAX_Y = 0.7;
    const MAX_X = 0.45;
    const STIFF = 120;
    const DAMP = 20;

    const onPointerMove = (e: PointerEvent) => {
      const r = renderer.domElement.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const ny = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
      target.y = Math.max(-1, Math.min(1, nx)) * MAX_Y;
      target.x = Math.max(-1, Math.min(1, ny)) * MAX_X;
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };
    if (!reduceMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerleave', onLeave);
    }

    // ---- render loop, paused when hidden or off-screen ---------------------
    const clock = new THREE.Clock();
    let raf = 0;
    let visible = true;
    const renderFrame = () => {
      const dt = Math.min(clock.getDelta(), 1 / 30);
      const t = clock.getElapsedTime();
      const idleY = reduceMotion ? 0 : Math.sin(t * 0.55) * 0.09;
      const idleX = reduceMotion ? 0 : Math.sin(t * 0.9) * 0.045;

      for (const ax of ['x', 'y'] as const) {
        const goal = ax === 'x' ? target.x + idleX : target.y + idleY;
        const a = (goal - cur[ax]) * STIFF - vel[ax] * DAMP;
        vel[ax] += a * dt;
        cur[ax] += vel[ax] * dt;
      }
      group.rotation.x = cur.x;
      group.rotation.y = cur.y;
      group.rotation.z = -cur.y * 0.08; // slight head-tilt into the turn
      group.position.y = reduceMotion ? 0 : Math.sin(t * 0.8) * 0.02;

      renderer.render(scene, camera);
    };
    const loop = () => {
      renderFrame();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (raf) return;
      clock.getDelta(); // drop the gap so the spring doesn't jump
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0.01 }
    );
    io.observe(mount);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    // ---- responsive --------------------------------------------------------
    const ro = new ResizeObserver(() => {
      const s = mount.clientWidth;
      if (!s || s === size) return;
      size = s;
      renderer.setSize(size, size);
    });
    ro.observe(mount);

    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onLeave);
      envMap.dispose();
      pmrem.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} aria-hidden className={cn('aspect-square w-12', className)} />;
}
