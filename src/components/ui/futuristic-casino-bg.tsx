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

  // Advanced noise functions
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
    m = m*m; m = m*m;
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

  // Futuristic casino background
  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 mouse = u_mouse / u_resolution.xy;
    float time = u_time * 0.5;
    
    // Deep space black base
    vec3 color = vec3(0.0, 0.0, 0.02);
    
    // Cyberpunk grid system
    vec2 grid = st * 20.0;
    vec2 gridId = floor(grid);
    vec2 gridUv = fract(grid);
    
    // Animated grid lines
    float gridLine = 0.0;
    gridLine += smoothstep(0.0, 0.02, gridUv.x) * smoothstep(0.98, 1.0, gridUv.x);
    gridLine += smoothstep(0.0, 0.02, gridUv.y) * smoothstep(0.98, 1.0, gridUv.y);
    
    // Pulsing grid intensity
    float gridPulse = sin(time * 2.0 + dot(gridId, vec2(0.3, 0.7))) * 0.5 + 0.5;
    vec3 gridColor = vec3(0.0, 1.0, 0.8) * gridLine * 0.3 * gridPulse;
    
    // Holographic scan lines
    float scanLine = sin(st.y * 800.0 + time * 10.0) * 0.04;
    scanLine *= smoothstep(0.0, 0.1, sin(time * 0.5 + st.y * 3.0));
    vec3 scanColor = vec3(0.0, 0.8, 1.0) * scanLine;
    
    // Floating casino chips (holographic)
    for(int i = 0; i < 15; i++) {
      float fi = float(i);
      vec2 chipPos = vec2(
        sin(time * 0.3 + fi * 2.0) * 0.4 + 0.5,
        fract(time * 0.1 + fi * 0.1)
      );
      
      float chipDist = distance(st, chipPos);
      float chip = smoothstep(0.05, 0.03, chipDist);
      
      // Holographic rim
      float chipRim = smoothstep(0.05, 0.04, chipDist) - smoothstep(0.04, 0.03, chipDist);
      
      // Chip colors based on index
      vec3 chipColor = vec3(1.0, 0.8, 0.0); // Gold
      if(mod(fi, 3.0) == 1.0) chipColor = vec3(1.0, 0.2, 0.3); // Red
      if(mod(fi, 3.0) == 2.0) chipColor = vec3(0.2, 1.0, 0.5); // Green
      
      color += chipColor * chip * 0.8;
      color += chipColor * chipRim * 2.0;
    }
    
    // Volumetric light beams from above
    for(int i = 0; i < 5; i++) {
      float fi = float(i);
      float beamX = 0.2 + fi * 0.15;
      float beamWidth = 0.08;
      
      float beam = smoothstep(beamWidth, 0.0, abs(st.x - beamX));
      beam *= smoothstep(1.0, 0.3, st.y);
      beam *= (1.0 + sin(time * 3.0 + fi * 2.0) * 0.3);
      
      vec3 beamColor = vec3(1.0, 0.9, 0.2) * beam * 0.4;
      color += beamColor;
    }
    
    // Holographic casino table edge
    float tableEdge = smoothstep(0.85, 0.9, st.y) * smoothstep(0.1, 0.9, st.x);
    tableEdge *= (1.0 + sin(st.x * 20.0 + time * 4.0) * 0.2);
    vec3 tableColor = vec3(0.0, 1.0, 0.6) * tableEdge * 0.6;
    
    // Depth fog with neon tint
    float depth = 1.0 - length(st - vec2(0.5)) * 0.8;
    depth = pow(depth, 1.5);
    
    // Mouse interaction - holographic ripples
    float mouseDist = distance(st, mouse);
    float mouseRipple = sin(mouseDist * 30.0 - time * 8.0) * 0.5 + 0.5;
    mouseRipple *= smoothstep(0.3, 0.0, mouseDist);
    vec3 mouseColor = vec3(0.5, 0.8, 1.0) * mouseRipple * 0.3;
    
    // Cyberpunk atmosphere particles
    float particles = 0.0;
    for(int i = 0; i < 20; i++) {
      float fi = float(i);
      vec2 particlePos = vec2(
        fract(sin(fi * 12.9898) * 43758.5453),
        fract(time * 0.05 + fi * 0.1)
      );
      
      float particleDist = distance(st, particlePos);
      particles += smoothstep(0.01, 0.005, particleDist) * 0.8;
    }
    vec3 particleColor = vec3(0.8, 0.9, 1.0) * particles;
    
    // Combine all elements
    color += gridColor;
    color += scanColor;
    color += tableColor;
    color += mouseColor;
    color += particleColor;
    
    // Apply depth and atmospheric perspective
    color *= depth;
    
    // Cyberpunk color grading
    color.r *= 0.9;
    color.g *= 1.1;
    color.b *= 1.2;
    
    // Add subtle film grain
    float grain = (fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.1;
    color += grain * 0.02;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function FuturisticCasinoBackground() {
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
          background: 'radial-gradient(ellipse at center, #000205 0%, #000000 100%)'
        }}
      />
      
      {/* Additional cyberpunk overlay layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Holographic scan lines */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 2px,
                rgba(0, 255, 200, 0.03) 2px,
                rgba(0, 255, 200, 0.03) 4px
              )
            `,
            animation: 'scanlines 0.1s linear infinite'
          }}
        />
        
        {/* Corner UI elements */}
        <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-cyan-400 opacity-30" />
        <div className="absolute top-4 right-4 w-20 h-20 border-r-2 border-t-2 border-cyan-400 opacity-30" />
        <div className="absolute bottom-4 left-4 w-20 h-20 border-l-2 border-b-2 border-cyan-400 opacity-30" />
        <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-cyan-400 opacity-30" />
      </div>
    </div>
  );
}
