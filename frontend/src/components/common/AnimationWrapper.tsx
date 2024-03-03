import React, { type ReactElement, ReactNode } from 'react';

interface AnimationWrapperProps {
	color: "red" | "green"
	active: boolean | null;
	message: string;
	children: ReactNode;
}

const AnimationWrapper = ({color, active, message, children}: AnimationWrapperProps): ReactElement => {
	return (
		<div
			className={`bg-theme-senary min-h-[190px] absolute top-0 left-0 w-full flex flex-wrap items-center border rounded-md transition-all duration-1000 
			${active ? 'visible opacity-100' : 'invisible opacity-0'}
			${color == "red" ? "border-red-500" : "border-green-500"}
		`}
		>
			<div className="w-full flex items-center justify-center">
				{children}
			</div>
			<p className={`${color == "red" ? "text-red-500" : "text-green-500"} w-full text-center -mt-6`}>
				{message}
			</p>
		</div>
	)
}

export default AnimationWrapper