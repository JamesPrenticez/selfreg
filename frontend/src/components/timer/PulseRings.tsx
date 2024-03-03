import React, { ReactNode, useEffect, useState } from 'react'

interface Props {
  play?: boolean;
  color?: string;
  children: ReactNode;
}

const PulseRings = ({
  play = true,
  color = "#d1d5db", 
  children
}: Props) => {



  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes pulsate1 {
        0% {
          width: 200px;
          height: 200px;
          opacity: 0.5;
          border-color: ${color};
       }
        25% {
          opacity: 1;
          border-color: ${color};
       }
        50%, 100% {
          width: 800px;
          height: 800px;
          opacity: 0;
          border-color: ${color};
       }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const pulseStyle = `absolute rounded-full border-2 -translate-x-1/2 -translate-y-1/2 w-12`

  return (
    <div className='bg-zinc-800 flex grow items-center justify-center overflow-hidden'>
        <div className='relative'>
          <div className={`${pulseStyle} border-transparent`} style={{ animation: play ? "6s linear 0s forwards pulsate1" : "" }} />
          <div className={`${pulseStyle} border-transparent`} style={{ animation: play ? "6s linear 1s forwards pulsate1" : "" }} />
          <div className={`${pulseStyle} border-transparent`} style={{ animation: play ? "6s linear 2s forwards pulsate1" : "" }} />
          <div className={`${pulseStyle} border-transparent`} style={{ animation: play ? "6s linear 3s forwards pulsate1" : "" }} />
          <div className={`${pulseStyle} border-transparent`} style={{ animation: play ? "6s linear 4s forwards pulsate1" : "" }} />
          <div className={`${pulseStyle} border-transparent`} style={{ animation: play ? "6s linear 5s forwards pulsate1" : "" }} />
          <div className={`${pulseStyle} border-transparent`} style={{ animation: play ? "6s linear 6s forwards pulsate1" : "" }} />
          {/* <div className={`${pulseStyle} border-transparent`} style={{ animation: play ? "6s linear 5s infinite pulsate1" : "none"}} />
          <div className={`${pulseStyle} border-transparent`} style={{ animation: play ? "6s linear 4s infinite pulsate1" : "none"}} />
          <div className={`${pulseStyle} border-transparent`} style={{ animation: play ? "6s linear 3s infinite pulsate1" : "none"}} />
          <div className={`${pulseStyle} border-transparent`} style={{ animation: play ? "6s linear 2s infinite pulsate1" : "none"}} />
          <div className={`${pulseStyle} border-transparent`} style={{ animation: play ? "6s linear 1s infinite pulsate1" : "none"}} />
          <div className={`${pulseStyle} border-transparent`} style={{ animation: play ? "6s linear 0s infinite pulsate1" : "none"}} /> */}
          {/* <div className={pulseStyle} style={{ animation: play ? "6s linear 3s infinite pulsate1" : "none", borderColor: color}} />
          <div className={pulseStyle} style={{ animation: play ? "6s linear 4s infinite pulsate1" : "none", borderColor: color}} />
          <div className={pulseStyle} style={{ animation: play ? "6s linear 5s infinite pulsate1" : "none", borderColor: color}} />
          <div className={pulseStyle} style={{ animation: play ? "6s linear 6s infinite pulsate1" : "none", borderColor: color}} /> */}
          <div className='absolute text-white -translate-x-1/2 -translate-y-1/2' >
            {children}
          </div>
        </div>
    </div>
  )
}

export default PulseRings;
