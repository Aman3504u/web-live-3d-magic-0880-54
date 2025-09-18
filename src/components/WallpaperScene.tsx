import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, Box, Torus } from "@react-three/drei";
import * as THREE from "three";
import { Preferences } from "@capacitor/preferences";

interface AnimatedMeshProps {
  position: [number, number, number];
  color: string;
  type: "box" | "sphere" | "torus";
}

function AnimatedMesh({ position, color, type }: AnimatedMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
      
      // Pulsating effect when hovered
      if (hovered) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const geometry = type === "box" ? (
    <boxGeometry args={[1, 1, 1]} />
  ) : type === "sphere" ? (
    <sphereGeometry args={[0.7, 32, 32]} />
  ) : (
    <torusGeometry args={[0.8, 0.3, 16, 100]} />
  );

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {geometry}
      <meshStandardMaterial 
        color={hovered ? "#ffffff" : color}
        emissive={hovered ? color : "#000000"}
        emissiveIntensity={hovered ? 0.3 : 0}
        metalness={0.7}
        roughness={0.2}
      />
    </mesh>
  );
}

function CameraController() {
  const { camera } = useThree();
  
  useEffect(() => {
    const handleGesture = (event: CustomEvent) => {
      const { type, deltaX, deltaY, scale, rotation } = event.detail;
      
      switch (type) {
        case 'pan':
          camera.position.x -= deltaX * 0.01;
          camera.position.y += deltaY * 0.01;
          break;
        case 'zoom':
          camera.position.z = Math.max(2, Math.min(15, camera.position.z * scale));
          break;
        case 'rotate':
          camera.rotation.y += rotation * 0.01;
          break;
      }
    };

    // Listen for gesture events from native Android
    window.addEventListener('wallpaper-gesture', handleGesture as EventListener);
    
    return () => {
      window.removeEventListener('wallpaper-gesture', handleGesture as EventListener);
    };
  }, [camera]);

  return null;
}

interface WallpaperSceneProps {
  url?: string;
  isActive: boolean;
}

export function WallpaperScene({ url, isActive }: WallpaperSceneProps) {
  const [sceneConfig, setSceneConfig] = useState({
    meshCount: 5,
    animationSpeed: 1,
    backgroundColor: "#0a0a0f"
  });

  useEffect(() => {
    loadSceneConfig();
  }, []);

  const loadSceneConfig = async () => {
    try {
      const config = await Preferences.get({ key: 'wallpaper_scene_config' });
      if (config.value) {
        setSceneConfig(JSON.parse(config.value));
      }
    } catch (error) {
      console.log('Using default scene config');
    }
  };

  if (!isActive) {
    return (
      <div className="w-full h-full bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Wallpaper paused</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        style={{ background: sceneConfig.backgroundColor }}
      >
        <CameraController />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        {/* Animated Meshes */}
        <AnimatedMesh position={[-2, 0, 0]} color="#6366f1" type="box" />
        <AnimatedMesh position={[0, 0, 0]} color="#22d3ee" type="sphere" />
        <AnimatedMesh position={[2, 0, 0]} color="#f59e0b" type="torus" />
        <AnimatedMesh position={[0, 2, -2]} color="#ef4444" type="box" />
        <AnimatedMesh position={[0, -2, -2]} color="#22c55e" type="sphere" />
        
        {/* Particle System */}
        <Particles />
        
        {/* Controls for development/preview */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 100;
  
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.rotation.x += 0.0005;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#6366f1"
        transparent
        opacity={0.6}
      />
    </points>
  );
}