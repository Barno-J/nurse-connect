import React from 'react';
import { AiOutlineWarning } from 'react-icons/ai';
import Button from './ui/Button';

const Error = ({
	message = 'Something went wrong.',
	onRetry = null,
	fullScreen = false,
	iconSize = '5xl',
}) => {
	return (
		<div
			className={`w-full min-h-screen flex items-center justify-center px-4 ${fullScreen
				? 'fixed inset-0 z-50 bg-card/90 backdrop-blur-sm'
				: ''
				}`}
		>
			<div className="flex flex-col items-center gap-4 text-center max-w-xs px-4">
				<div className="relative">
					<AiOutlineWarning
						className={`text-${iconSize} text-accent animate-bounce`}
						style={{ animationDuration: '2s' }}
					/>
					<div className="absolute inset-0 rounded-full bg-accent/10 animate-ping" />
				</div>

				<p className="text-base font-medium animate-fade-in">
					{message}
				</p>

				{onRetry && (
					<Button
						onClick={onRetry}
						className="button-primary mt-2 animate-fade-in-up"
					>
						Retry
					</Button>
				)}
			</div>
		</div>
	);
};

export default Error;