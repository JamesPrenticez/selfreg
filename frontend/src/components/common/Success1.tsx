import React, {useEffect, useState} from 'react'


interface SuccessProps {
  isActive: boolean | null;
  bgcolor: string;
}

const Success1 = ({ isActive, bgcolor }: SuccessProps ) => {

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes stroke {
        100% { stroke-dashoffset: 0; }
      }
      @keyframes scale {
        0%, 100% { transform: none; }
        50% { transform: scale3d(1.1, 1.1, 1); }
      }
      @keyframes fill {
        100% { box-shadow: inset 0px 0px 0px 50px white; }
      } 
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);




  // Styles

  // Container styles
  let containerStyle = {
    width: '100px',
    height: '100px',
    animation: isActive ? 'scale .3s ease-in-out .9s both' : '',
    opacity: isActive ? '1' : '0',
    transition: 'all 1s',
  };

  let wrapper = {
    width: '100%',
    height: '100%',
    animation: isActive ? 'fill .4s ease-in-out .4s forwards' : '',
  };

  let outer_circle = {
    //fill: '#fff',
    stroke: 'rgb(34 197 94)',
    strokeDasharray: 166,
    strokeDashoffset: 166,
    animation: isActive ? 'stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards' : '',
  };

  let tick = {
    stroke: 'rgb(34 197 94)',
    strokeDasharray: 48,
    strokeDashoffset: 48,
    animation: isActive ?  'stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards' : '',
  };

  return (
    <div style={containerStyle}>
    <svg
      style={wrapper}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 52 52'
      strokeWidth={2}
      clipPath="url(#clip-path)" 
    >

      <defs>
        <mask id="maskID">
          <rect width="100%" height="100%" fill="white"/>
          <circle cx='26' cy='26' r='25' fill='black'/>
        </mask>
      </defs>
      <rect width="52" height="52" fill={bgcolor} mask="url(#maskID)"  />

      <circle style={outer_circle} cx='26' cy='26' r='25' fill='none' />
      <path style={tick} fill='none' d='M14.1 27.2l7.1 7.2 16.7-16.8' />
    </svg>
    </div>
  );
}

export default Success1;