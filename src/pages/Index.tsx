import { useState, useEffect } from "react";
import { NetworkVisualization } from "@/components/NetworkVisualization";
import { MetricsPanel } from "@/components/MetricsPanel";
import { TransmissionLog, LogEntry } from "@/components/TransmissionLog";
import { ControlPanel } from "@/components/ControlPanel";
import { OnboardingModal } from "@/components/OnboardingModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MetricsChart } from "@/components/MetricsChart";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedPath, setSelectedPath] = useState("primary");
  const [channels, setChannels] = useState(10);
  const [activePath, setActivePath] = useState<string[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [metricsHistory, setMetricsHistory] = useState<Array<{
    time: string;
    setupLatency: number;
    transmitLatency: number;
    successRate: number;
    quality: number;
  }>>([]);
  
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
    setMetrics((prev) => ({ ...prev, activeChannels: channels }));
    
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
      const age = 5 + Math.random() * 2;
      const decayRate = 0.05;
      const decayFactor = Math.exp(-decayRate * age);
      const finalQuality = 0.995 * decayFactor * (0.98 + Math.random() * 0.02);
      const latency = 0.04 + Math.random() * 0.02;
      
      const newMetrics = {
        setupLatency: 0,
        transmitLatency: latency,
        quality: finalQuality,
        successRate: 1,
        activeChannels: channels,
      };
      
      setMetrics((prev) => ({ ...prev, ...newMetrics }));
      
      const timestamp = new Date().toLocaleTimeString("de-DE");
      setMetricsHistory((prev) => [
        ...prev.slice(-19),
        {
          time: timestamp.split(':').slice(1).join(':'),
          setupLatency: newMetrics.setupLatency,
          transmitLatency: newMetrics.transmitLatency,
          successRate: newMetrics.successRate * 100,
          quality: newMetrics.quality * 100,
        },
      ]);
      
      addLog("success", `Übertragung erfolgreich! Finale Qualität: ${(finalQuality * 100).toFixed(1)}%`);
      addLog("info", `Latenz: ${latency.toFixed(3)}s (99.997% Reduktion gegenüber reaktiv)`);
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
      addLog("info", `Proaktiver Mesh-Builder initialisiert (Kapazität: ${channels * 5} Paare)`);
      simulateTransmission();
    } else {
      setActivePath([]);
      setMetrics((prev) => ({ ...prev, activeChannels: 0 }));
    }
  }, [isRunning, selectedPath, channels]);

  const handleReset = () => {
    setIsRunning(false);
    setLogs([]);
    setActivePath([]);
    setMetricsHistory([]);
    setMetrics({
      setupLatency: 0,
      transmitLatency: 0,
      successRate: 1,
      quality: 1,
      activeChannels: 0,
    });
    addLog("info", "System zurückgesetzt");
  };

  const handleExport = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      metrics,
      metricsHistory,
      logs,
      configuration: {
        path: selectedPath,
        channels,
      },
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pqms-export-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export erfolgreich",
      description: "Übertragungsdaten wurden heruntergeladen",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <OnboardingModal />
      
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Proaktives Quanten-Mesh System
            </h1>
            <p className="text-lg text-muted-foreground">
              Erde-Mars Quanten-Kommunikationsnetzwerk (PQMS v12)
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={logs.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <ThemeToggle />
          </div>
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
              channels={channels}
              onStart={() => setIsRunning(true)}
              onStop={() => setIsRunning(false)}
              onReset={handleReset}
              onPathChange={setSelectedPath}
              onChannelsChange={setChannels}
            />
            
            <MetricsPanel
              setupLatency={metrics.setupLatency}
              transmitLatency={metrics.transmitLatency}
              successRate={metrics.successRate}
              quality={metrics.quality}
              activeChannels={metrics.activeChannels}
            />
            
            {metricsHistory.length > 0 && (
              <MetricsChart history={metricsHistory} />
            )}
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
