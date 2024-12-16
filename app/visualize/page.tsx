'use client';

import { useSession } from "next-auth/react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MermaidDiagram } from "@/components/visualization/MermaidDiagram";

export default function VisualizePage() {
  const { data: session } = useSession();

  const getDriveStructure = () => {
    return `graph TD
    A[${session?.user?.email || 'Main Account'}] --> B[Drive 1]
    A --> C[Drive 2]
    B --> D[Documents]
    C --> E[Projects]
    D --> F[Work Files]
    E --> G[Personal Projects]
    style A fill:#4f46e5,stroke:#4338ca
    style B fill:#06b6d4,stroke:#0891b2
    style C fill:#06b6d4,stroke:#0891b2
    style D fill:#2dd4bf,stroke:#14b8a6
    style E fill:#f59e0b,stroke:#d97706`;
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Data Visualization</h1>
        
        {session && (
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Your Google Drive Structure</h2>
              <div className="bg-muted p-4 rounded">
                <MermaidDiagram 
                  chart={getDriveStructure()}
                  className="w-full overflow-x-auto"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">Drive Statistics</h3>
                <div className="space-y-2">
                  <p>Connected Account: {session.user?.email}</p>
                  <p>Status: Active</p>
                  <p>Last Sync: Just now</p>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button 
                    className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
                    onClick={() => console.log('Refresh visualization')}
                  >
                    Refresh Visualization
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
} 