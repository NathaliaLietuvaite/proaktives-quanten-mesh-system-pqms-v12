import { Card } from "@/components/ui/card";
import { Activity, Zap, CheckCircle2, Timer } from "lucide-react";

interface MetricsPanelProps {
  setupLatency: number;
  transmitLatency: number;
  successRate: number;
  quality: number;
  activeChannels: number;
  adagradConvergence?: number;
  bpIterations?: number;
  surfaceCodeFidelity?: number;
  cmeFlux?: number;
  qber?: number;
}

export const MetricsPanel = ({
  setupLatency,
  transmitLatency,
  successRate,
  quality,
  activeChannels,
  adagradConvergence = 1,
  bpIterations = 0,
  surfaceCodeFidelity = 0.95,
  cmeFlux = 1.0,
  qber = 0,
}: MetricsPanelProps) => {
  const coreMetrics = [
    {
      label: "Setup-Latenz",
      value: `${setupLatency.toFixed(3)} s`,
      icon: Timer,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Übertragungslatenz",
      value: `${transmitLatency.toFixed(3)} s`,
      icon: Zap,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "Qualität",
      value: `${(quality * 100).toFixed(1)}%`,
      icon: Activity,
      color: quality > 0.95 ? "text-metric-positive" : "text-metric-warning",
      bgColor: quality > 0.95 ? "bg-metric-positive/10" : "bg-metric-warning/10",
    },
  ];

  const v18Metrics = [
    {
      label: "AdaGrad Konvergenz",
      value: `${(adagradConvergence * 100).toFixed(1)}%`,
      subValue: `${bpIterations} Iterationen`,
    },
    {
      label: "Surface Code Fidelity",
      value: `${(surfaceCodeFidelity * 100).toFixed(2)}%`,
      subValue: `QBER: ${(qber * 100).toFixed(3)}%`,
    },
    {
      label: "CME Flux",
      value: `${cmeFlux.toFixed(2)}x`,
      subValue: cmeFlux > 1.5 ? "Erhöht" : "Normal",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">System-Metriken v18</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {coreMetrics.map((metric) => (
          <Card key={metric.label} className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                <p className="text-xl font-bold">{metric.value}</p>
              </div>
              <div className={`${metric.bgColor} ${metric.color} p-2 rounded-lg`}>
                <metric.icon className="w-4 h-4" />
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Aktive Kanäle</p>
            <p className="text-2xl font-bold">{activeChannels}/10</p>
          </div>
          <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(activeChannels / 10) * 100}%` }}
            />
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-muted/30">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          AdaGrad BP-Decoder v18
        </h4>
        <div className="space-y-3">
          {v18Metrics.map((metric) => (
            <div key={metric.label} className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                <p className="text-xs text-muted-foreground/70">{metric.subValue}</p>
              </div>
              <p className="text-lg font-bold">{metric.value}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
