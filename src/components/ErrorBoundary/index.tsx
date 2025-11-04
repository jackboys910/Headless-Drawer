import { Component, type ReactNode, type PropsWithChildren } from 'react'

type ErrorBoundaryProps = PropsWithChildren<{
  fallback?: ReactNode
}>

type ErrorBoundaryState = { hasError: boolean }

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error('Uncaught error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div role="alert" className="p-4 text-center text-red-600">
            Something wrong
          </div>
        )
      )
    }
    return this.props.children
  }
}
