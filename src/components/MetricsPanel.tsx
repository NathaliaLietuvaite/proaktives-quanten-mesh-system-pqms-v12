import { Card } from "@/components/ui/card";
import { Activity, Zap, CheckCircle2, Timer } from "lucide-react";

interface MetricsPanelProps {
  setupLatency: number;
  transmitLatency: number;
  successRate: number;
  quality: number;
  activeChannels: number;
}

export const MetricsPanel = ({
  setupLatency,
  transmitLatency,
  successRate,
  quality,
  activeChannels,
}: MetricsPanelProps) => {
  const metrics = [
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
      label: "Erfolgsrate",
      value: `${(successRate * 100).toFixed(1)}%`,
      icon: CheckCircle2,
      color: "text-metric-positive",
      bgColor: "bg-metric-positive/10",
    },
    {
      label: "Qualität",
      value: `${(quality * 100).toFixed(1)}%`,
      icon: Activity,
      color: quality > 0.95 ? "text-metric-positive" : "text-metric-warning",
      bgColor: quality > 0.95 ? "bg-metric-positive/10" : "bg-metric-warning/10",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">System-Metriken</h3>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
              <div className={`${metric.bgColor} ${metric.color} p-2 rounded-lg`}>
                <metric.icon className="w-5 h-5" />
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
    </div>
  );
};
