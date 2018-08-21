import React from 'react';
import ErrorUi from './ui'
import "./error.css"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    console.warn("error is", error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorUi />
    }
    return this.props.children;
  }
}

export default ErrorBoundary
