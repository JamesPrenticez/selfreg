import React, {useEffect, useState} from 'react'

interface ErrorProps {
  isActive: boolean | null;
}

const ErrorAnimation = ({ isActive }: ErrorProps ) => {
  let min = 0;
  let max = 65535;
  const random = () => Math.floor(Math.random() * (max - min)) + min;
  const [randId, setRandId] = useState(random);

  const injectStyle = (style: string) => {
    const styleElement = document.createElement('style');
    styleElement.setAttribute('id', 'successStyleSheet');
    let styleSheet: CSSStyleSheet | null = null;
    document.head.appendChild(styleElement);
    styleSheet = styleElement.sheet!;
    styleSheet.insertRule(style, styleSheet.cssRules.length);
  };

  let stroke = `
    @keyframes stroke {
      100% { stroke-dashoffset: 0; }
    }
  `;
  let scale = `
    @keyframes scale {
      0%, 100% { transform: none; }
      50% { transform: scale3d(1.1, 1.1, 1); }
    }
  `;
  let keyframes = [stroke, scale];

  useEffect(() => {
    isActive
      ? (keyframes.map((type) => injectStyle(type)), setRandId(random))
      : document.getElementById('successStyleSheet') !== null &&
        document.head.removeChild(document.getElementById('successStyleSheet')!);
  }, [isActive]);

  // Styles
  let wrapper = {
    width: '100px',
    height: '100px',
    animation: 'fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both',
    opacity: isActive ? '1' : '0',
    visibility: isActive ? "visible" as const : "hidden" as const,
    transition: 'all 1s',
  };

  let outer_circle = {
		stroke: 'rgb(220 38 38)',
    strokeDasharray: 166,
    strokeDashoffset: 166,
    animation: 'stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards',
  };

  let cross_left = {
		stroke: 'rgb(220 38 38)',
    strokeDasharray: 48,
    strokeDashoffset: 48,
    transformOrigin: '50% 50% 0',
		animation: '0.5s ease 0.5s normal forwards 1 running stroke'
	}

	let cross_right = {
		stroke: 'rgb(220 38 38)',
    strokeDasharray: 48,
    strokeDashoffset: 48,
    transformOrigin: '50% 50% 0',
		animation: '0.5s ease 0.6s normal forwards 1 running stroke'
	}


  return (
    <svg
      key={randId}
      style={wrapper}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 52 52'
      strokeWidth={2}
    >
      <circle style={outer_circle} cx='26' cy='26' r='25' fill='none' />
      <path style={cross_left} fill="none" d="M16,16 l20,20" />
      <path style={cross_right} fill="none" d="M16,36 l20,-20" />
    </svg>
  );
};

export default ErrorAnimation