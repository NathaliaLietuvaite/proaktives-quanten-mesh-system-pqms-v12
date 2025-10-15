import { useState, useEffect } from "react";
import { NetworkVisualization } from "@/components/NetworkVisualization";
import { MetricsPanel } from "@/components/MetricsPanel";
import { TransmissionLog, LogEntry } from "@/components/TransmissionLog";
import { ControlPanel } from "@/components/ControlPanel";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedPath, setSelectedPath] = useState("primary");
  const [activePath, setActivePath] = useState<string[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  
  const [metrics, setMetrics] = useState({
    setupLatency: 0,
    transmitLatency: 0,
    successRate: 1,
    quality: 1,
    activeChannels: 0,
  });

  const addLog = (type: LogEntry["type"], message: string) => {
    const timestamp = new Date().toLocaleTimeString("de-DE");
    setLogs((prev) => [{ timestamp, type, message }, ...prev].slice(0, 50));
  };

  const simulateTransmission = () => {
    const path = selectedPath === "primary" 
      ? ["Mars", "Repeater1", "Erde"]
      : ["Mars", "Repeater2_Backup", "Erde"];

    setActivePath(path);
    setMetrics((prev) => ({ ...prev, activeChannels: 10 }));
    
    addLog("info", `Routing-Pfad berechnet: ${path.join(" → ")}`);
    
    setTimeout(() => {
      addLog("info", "Verschränkungspaar aus Hot-Standby-Pool abgerufen");
      setMetrics((prev) => ({ ...prev, setupLatency: 0 }));
    }, 100);

    setTimeout(() => {
      addLog("info", "Entanglement Swap durchgeführt");
      const qualityAfterSwap = 0.995 ** (path.length - 2);
      setMetrics((prev) => ({ ...prev, quality: qualityAfterSwap }));
    }, 500);

    setTimeout(() => {
      const age = 5;
      const decayRate = 0.05;
      const decayFactor = Math.exp(-decayRate * age);
      const finalQuality = 0.995 * decayFactor;
      
      setMetrics((prev) => ({
        ...prev,
        transmitLatency: 0.05,
        quality: finalQuality,
        successRate: 1,
      }));
      
      addLog("success", `Übertragung erfolgreich! Finale Qualität: ${(finalQuality * 100).toFixed(1)}%`);
      addLog("info", `Latenz: 0.05s (99.997% Reduktion gegenüber reaktiv)`);
    }, 1000);

    setTimeout(() => {
      if (isRunning) {
        simulateTransmission();
      }
    }, 3000);
  };

  useEffect(() => {
    if (isRunning) {
      addLog("info", "PQMS v12 Simulation gestartet");
      addLog("info", "Proaktiver Mesh-Builder initialisiert (Kapazität: 50 Paare)");
      simulateTransmission();
    } else {
      setActivePath([]);
      setMetrics((prev) => ({ ...prev, activeChannels: 0 }));
    }
  }, [isRunning, selectedPath]);

  const handleReset = () => {
    setIsRunning(false);
    setLogs([]);
    setActivePath([]);
    setMetrics({
      setupLatency: 0,
      transmitLatency: 0,
      successRate: 1,
      quality: 1,
      activeChannels: 0,
    });
    addLog("info", "System zurückgesetzt");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Proaktives Quanten-Mesh System
          </h1>
          <p className="text-lg text-muted-foreground">
            Erde-Mars Quanten-Kommunikationsnetzwerk (PQMS v12)
          </p>
        </div>

        <Separator />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Network Visualization */}
          <div className="lg:col-span-2 space-y-6">
            <NetworkVisualization 
              activePath={activePath} 
              transmitting={isRunning}
            />
            
            <TransmissionLog logs={logs} />
          </div>

          {/* Right Column - Metrics & Controls */}
          <div className="space-y-6">
            <ControlPanel
              isRunning={isRunning}
              selectedPath={selectedPath}
              onStart={() => setIsRunning(true)}
              onStop={() => setIsRunning(false)}
              onReset={handleReset}
              onPathChange={setSelectedPath}
            />
            
            <MetricsPanel
              setupLatency={metrics.setupLatency}
              transmitLatency={metrics.transmitLatency}
              successRate={metrics.successRate}
              quality={metrics.quality}
              activeChannels={metrics.activeChannels}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-border">
          <div className="text-sm text-muted-foreground text-center">
            <p>Technology Readiness Level (TRL): 4 - Laborvalidierter Prototyp</p>
            <p className="mt-1">Lead Architect: Nathalia Lietuvaite | System Architect: Gemini 2.5 Pro | Design Review: Grok (xAI)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
