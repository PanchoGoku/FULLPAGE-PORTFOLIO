import { useEffect } from "react";
//exportamos el hook

export default function useMagnetic(ref) {
  useEffect(()=>{
    const el = ref.current
    if(!el) return
    const handleMove = (e)=>{
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width/2
      const y = e.clientY - rect.top - rect.height/2
      el.style.transform = `translate(${x*0.2}px,${y*0.2}px)`
    }
    const reset = ()=> el.style.transform = `translate(0,0)`
    el.addEventListener("mousemove",handleMove)
    el.addEventListener("mouseleave",reset)
    return ()=>{
      el.removeEventListener("mousemove",handleMove)
      el.removeEventListener("mouseleave",reset)
    }
  },[ref])
}
