import Link from "next/link";
import { ArrowRight, GitGraph, Database, Bot } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Visualize Your Digital Universe
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Connect your Google Drive accounts, Docker containers, and AI tools. 
                Create meaningful visualizations and insights using AI-powered analysis.
              </p>
            </div>
            <div className="space-x-4">
              <Link
                href="/visualize"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition-colors bg-foreground rounded-lg hover:bg-foreground/80"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 bg-background rounded-full">
                <GitGraph className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold">Node Visualization</h2>
              <p className="text-gray-500 dark:text-gray-400">
                View your Google Drive accounts as interconnected nodes. 
                Discover relationships and optimize your digital workspace.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 bg-background rounded-full">
                <Database className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold">Docker Integration</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Monitor and manage your Docker containers with visual insights.
                Track dependencies and optimize performance.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 bg-background rounded-full">
                <Bot className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold">AI-Powered Analysis</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Use GPT-4 to generate insights from your data.
                Create timeline views and discover patterns in your digital ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Visualization Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold text-center mb-8">Interactive Data Visualization</h2>
          <div className="border rounded-lg p-6 bg-muted/20">
            <pre className="overflow-auto p-4 rounded bg-background">
              <code>{`graph TD
    A[Main Google Account] --> B[Shared Drive 1]
    A --> C[Shared Drive 2]
    B --> D[Docker Projects]
    C --> E[AI Tools]
    D --> F[Container 1]
    D --> G[Container 2]
    E --> H[GPT Integration]
    style A fill:#4f46e5
    style B fill:#06b6d4
    style C fill:#06b6d4
    style D fill:#2dd4bf
    style E fill:#f59e0b`}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
