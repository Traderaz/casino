"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const vertexShader = `
  attribute vec4 position;
  void main() {
    gl_Position = position;
  }
`;

const fragmentShader = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;

  // Noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Luxury casino background
  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 mouse = u_mouse / u_resolution.xy;
    
    // Create depth layers
    float time = u_time * 0.1;
    
    // Base luxury gradient
    vec3 baseColor = vec3(0.0, 0.0, 0.0);
    
    // Layer 1: Deep casino felt texture
    float felt = snoise(st * 8.0 + time * 0.5) * 0.1;
    vec3 feltColor = vec3(0.02, 0.05, 0.03) * (1.0 + felt);
    
    // Layer 2: Volumetric lighting from top
    float lightBeam = smoothstep(0.3, 0.7, st.x) * smoothstep(0.0, 0.4, st.y);
    lightBeam *= (1.0 + sin(time + st.x * 10.0) * 0.1);
    vec3 goldLight = vec3(1.0, 0.84, 0.0) * lightBeam * 0.08;
    
    // Layer 3: Subtle red accent lighting
    float redAccent = smoothstep(0.8, 1.0, st.y) * smoothstep(0.2, 0.8, st.x);
    redAccent *= (1.0 + sin(time * 2.0 + st.y * 5.0) * 0.2);
    vec3 redLight = vec3(0.84, 0.14, 0.22) * redAccent * 0.05;
    
    // Layer 4: Green casino table reflection
    float greenReflect = smoothstep(0.0, 0.3, st.y) * smoothstep(0.1, 0.9, st.x);
    greenReflect *= (1.0 + snoise(st * 4.0 + time) * 0.3);
    vec3 greenLight = vec3(0.0, 1.0, 0.53) * greenReflect * 0.03;
    
    // Layer 5: Luxury particle field
    vec2 particleGrid = st * 20.0;
    vec2 particleId = floor(particleGrid);
    vec2 particleUv = fract(particleGrid) - 0.5;
    
    float particleTime = time + dot(particleId, vec2(12.9898, 78.233));
    vec2 particleOffset = vec2(sin(particleTime), cos(particleTime * 1.3)) * 0.3;
    particleUv += particleOffset;
    
    float particleDist = length(particleUv);
    float particle = smoothstep(0.1, 0.0, particleDist);
    
    // Random particle colors
    float particleRand = fract(sin(dot(particleId, vec2(12.9898, 78.233))) * 43758.5453);
    vec3 particleColor = vec3(1.0, 0.84, 0.0); // Gold
    if (particleRand > 0.7) particleColor = vec3(0.84, 0.14, 0.22); // Red
    else if (particleRand > 0.4) particleColor = vec3(0.0, 1.0, 0.53); // Green
    
    vec3 particles = particleColor * particle * 0.4 * (0.5 + 0.5 * sin(time * 3.0 + particleRand * 10.0));
    
    // Layer 6: Sophisticated depth fog
    float depth = 1.0 - smoothstep(0.0, 1.0, distance(st, vec2(0.5)));
    depth = pow(depth, 1.5);
    
    // Layer 7: Interactive mouse lighting
    float mouseDist = distance(st, mouse);
    float mouseLight = smoothstep(0.3, 0.0, mouseDist);
    vec3 mouseGlow = vec3(1.0, 0.84, 0.0) * mouseLight * 0.15;
    
    // Layer 8: Premium vignette
    float vignette = smoothstep(0.0, 0.4, distance(st, vec2(0.5)));
    vignette = 1.0 - vignette * vignette * 0.8;
    
    // Combine all layers with sophisticated blending
    vec3 finalColor = baseColor;
    finalColor += feltColor;
    finalColor += goldLight * depth;
    finalColor += redLight * depth;
    finalColor += greenLight * depth;
    finalColor += particles;
    finalColor += mouseGlow;
    
    // Apply vignette
    finalColor *= vignette;
    
    // Color grading for luxury feel
    finalColor = pow(finalColor, vec3(0.9)); // Slight gamma correction
    finalColor *= 1.1; // Slight brightness boost
    finalColor = mix(finalColor, finalColor * vec3(1.05, 1.0, 0.95), 0.1); // Warm tint
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function PremiumWebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Compile shader
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vertexShader);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fragmentShader);
    
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Create buffer
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1
    ]), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const u_resolution = gl.getUniformLocation(program, 'u_resolution');
    const u_time = gl.getUniformLocation(program, 'u_time');
    const u_mouse = gl.getUniformLocation(program, 'u_mouse');

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: rect.height - (e.clientY - rect.top)
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Render loop
    const render = (time: number) => {
      // Resize canvas
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);

      // Set uniforms
      gl.uniform2f(u_resolution, canvas.width, canvas.height);
      gl.uniform1f(u_time, time * 0.001);
      gl.uniform2f(u_mouse, mouseRef.current.x * devicePixelRatio, mouseRef.current.y * devicePixelRatio);

      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)'
        }}
      />
      
      {/* Additional luxury overlay layers */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 30% 20%, rgba(255, 215, 0, 0.02) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 70% 80%, rgba(215, 38, 56, 0.015) 0%, transparent 60%),
            linear-gradient(135deg, transparent 0%, rgba(0, 255, 136, 0.008) 50%, transparent 100%)
          `
        }}
      />
      
      {/* Sophisticated grain texture */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")
          `,
          mixBlendMode: 'overlay'
        }}
      />
    </div>
  );
}
