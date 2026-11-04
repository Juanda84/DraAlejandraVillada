"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
/* Illustration of independently animating crowns; not diagnostic or clinical prediction. */
function Crown({ index, progress }: { index: number; progress: React.RefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => {
    // Crown: tapered neck, broad rounded incisal edge and organically curved anterior surface.
    const segments=32, rings=17, vertices:number[]=[], inds:number[]=[];
    for (let j=0;j<=rings;j++) {
      const v=j/rings, y=(v-.5)*1.12;
      const fullness = .76 + .23*Math.sin(Math.PI*v) + .05*Math.cos(Math.PI*2*v);
      const waist = v<.12 ? .84+v*1.12 : 1;
      for (let i=0;i<=segments;i++) {
        const u=i/segments*Math.PI*2;
        const w=(.48 - .06*Math.abs(index-5.5)/5.5)*fullness*waist;
        const front = .21*Math.cos(u) + .085*Math.sin(Math.PI*v);
        vertices.push(Math.cos(u)*w, y, Math.sin(u)*.27*fullness + front);
        if (i<segments&&j<rings) { const a=j*(segments+1)+i,b=a+segments+1; inds.push(a,b,a+1,a+1,b,b+1); }
      }
    }
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geo.setIndex(inds);geo.computeVertexNormals();return geo;
  },[index]);
  const material=useMemo(()=>new THREE.MeshPhysicalMaterial({ color:'#fbf4ec', metalness:0,roughness:.17,transmission:.18,transparent:true,opacity:.68,thickness:.4,clearcoat:.8,clearcoatRoughness:.17,side:THREE.DoubleSide}),[]);
  const theta=(index-5.5)/5.5;
  const homeX=theta*3.82, homeY=-.35 - Math.pow(Math.abs(theta),1.85)*.43, homeZ=0.44 - theta*theta*.62;
  const dx=Math.sin(index*4.07)*.23,dy=Math.cos(index*3.3)*.24,dz=Math.sin(index*3.84)*.20;
  useFrame((_,delta)=>{
    if(!group.current)return;
    const p=progress.current||0;
    const t=THREE.MathUtils.smoothstep(p,.09+index*.026,.67+index*.012);
    const f=1-Math.exp(-delta*6.5);
    group.current.position.lerp(new THREE.Vector3(homeX+dx*(1-t),homeY+dy*(1-t),homeZ+dz*(1-t)),f);
    group.current.rotation.z=THREE.MathUtils.lerp(group.current.rotation.z,theta*-.18+(1-t)*Math.sin(index*2.3)*.19,f);
    group.current.rotation.y=THREE.MathUtils.lerp(group.current.rotation.y,-theta*.30+(1-t)*Math.cos(index*3.2)*.13,f);
  });
  return <group ref={group}><mesh geometry={geometry} material={material}/></group>;
}
function Arch({progress}:{progress:React.RefObject<number>}){
 const arch=useRef<THREE.Group>(null);
 useFrame(({clock},delta)=>{if(!arch.current)return;const f=1-Math.exp(-delta*3);arch.current.rotation.y=THREE.MathUtils.lerp(arch.current.rotation.y,-.06+Math.sin(clock.elapsedTime*.32)*.028,f);arch.current.rotation.x=THREE.MathUtils.lerp(arch.current.rotation.x,-.04-(progress.current||0)*.025,f);});
 return <group ref={arch} scale={.87}>{Array.from({length:12},(_,i)=><Crown key={i} index={i} progress={progress}/>)}</group>;
}
export default function SmileScene({progress}:{progress:React.RefObject<number>}){
 return <Canvas camera={{position:[0,0,13],fov:34}} dpr={[1,1.5]} gl={{alpha:true,powerPreference:'high-performance',antialias:true}} aria-label="Animación tridimensional conceptual de una arcada dental"><ambientLight intensity={1.5}/><directionalLight position={[-3,4,5]} intensity={2.3} color="#fffaf2"/><pointLight position={[2,-2,3]} intensity={2.1} color="#d4b8a1"/><Arch progress={progress}/></Canvas>
}
