"use client";
import { Canvas,useFrame } from "@react-three/fiber";
import { useMemo,useRef } from "react";
import * as THREE from "three";
/** Decorative 3D light traces around a photographed smile. No dental geometry or clinical simulation. */
function LightFilaments(){
  const group=useRef<THREE.Group>(null);
  const curves=useMemo(()=>Array.from({length:6},(_,i)=>{
    const points=Array.from({length:61},(_,j)=>{
      const u=j/60*Math.PI*2;
      return new THREE.Vector3(1.65*Math.cos(u)+.30,-.10+.46*Math.sin(u)*Math.cos(.12*i),-.3+Math.sin(u*2+i*.5)*.21+i*.016);
    });
    return new THREE.CatmullRomCurve3(points,true,"catmullrom",.34);
  }),[]);
  useFrame(({clock})=>{if(group.current){group.current.rotation.z=Math.sin(clock.elapsedTime*.3)*.017;group.current.rotation.y=Math.sin(clock.elapsedTime*.2)*.04;}});
  return <group ref={group} position={[1.45,-.05,0]} rotation={[.1,-.12,-.14]}>
    {curves.map((c,i)=><mesh key={i} rotation={[i*.042,i*.043,i*.055]}>
      <tubeGeometry args={[c,125,i%3===0?.005:.002,4,true]}/>
      <meshBasicMaterial color={i%2===0?"#ffd8bb":"#efaaa6"} transparent opacity={i%3===0?.48:.18} depthWrite={false}/>
    </mesh>)}
  </group>;
}
export default function SmileScene(){
  return <Canvas camera={{position:[0,0,7],fov:42}} dpr={[1,1.35]} gl={{alpha:true,powerPreference:"low-power",antialias:false}}>
    <LightFilaments/>
  </Canvas>;
}
