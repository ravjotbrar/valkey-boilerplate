import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';

export function ConnectionForm() {
  const [host, setHost] = useState('localhost');
  const [port, setPort] = useState('6379');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(''); // '', 'connecting', 'connected', 'error'

  const handleConnect = async () => {
    setStatus('connecting');

    const result = await await window.electron.ipcRenderer.invoke('valkey-connect', {
      host, port, username, password
    });
    if (result.success) {
      setStatus('connected');
    } else {
      setStatus('error');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Connect to Valkey</CardTitle>
        <CardDescription>
          Enter connection details for your Valkey server
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Host</label>
          <Input 
            value={host} 
            onChange={(e) => setHost(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Port</label>
          <Input 
            type="number" 
            value={port} 
            onChange={(e) => setPort(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Username (optional)</label>
          <Input 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Password (optional)</label>
          <Input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        {status === 'connecting' && (
          <div className="text-sm text-blue-500">Connecting...</div>
        )}
        
        {status === 'connected' && (
          <div className="text-sm text-green-500">Connected successfully!</div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleConnect} 
          disabled={status === 'connecting' || status === 'connected'}
        >
          {status === 'connecting' ? 'Connecting...' : 'Connect'}
        </Button>
      </CardFooter>
    </Card>
  );
}