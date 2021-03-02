import { Result } from "@yy/tofu-ui-react";
import React from "react";

class ErrorBoundary extends React.Component<
  any,
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  // componentDidCatch(error, errorInfo) {
  componentDidCatch() {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Result status="fail" title="渲染失败" style={{ height: 300 }}>
          {this.state.error?.message}
        </Result>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
