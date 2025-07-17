import React from 'react';
import { ConnectionForm } from './components/ConnectionForm';

function App() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Valkey UI</h1>
          <p className="text-muted-foreground">A desktop client for Valkey</p>
        </div>
        
        <ConnectionForm />
      </div>
    </div>
  );
}

export default App;