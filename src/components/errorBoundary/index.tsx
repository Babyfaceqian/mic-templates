import * as React from 'react';
interface State {
	hasError: boolean;
}

export interface ErrorBoundaryProps {
	children: any;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false
		};
	}
	public render() {
		return this.state.hasError ? (
			<div>Something went wrong!</div>
		) : (
			this.props.children
		);
	}
}
