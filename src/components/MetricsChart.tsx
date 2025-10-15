import { Card } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface MetricsChartProps {
  history: Array<{
    time: string;
    setupLatency: number;
    transmitLatency: number;
    quality: number;
    successRate: number;
  }>;
}

export const MetricsChart = ({ history }: MetricsChartProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Metriken-Verlauf</h3>
      
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Latenz (s)</p>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={history}>
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                domain={[0, 0.2]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line 
                type="monotone" 
                dataKey="transmitLatency" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Qualität (%)</p>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={history}>
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                domain={[90, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line 
                type="monotone" 
                dataKey="quality" 
                stroke="hsl(var(--metric-positive))" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
