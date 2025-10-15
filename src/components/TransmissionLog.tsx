import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export interface LogEntry {
  timestamp: string;
  type: "info" | "success" | "warning" | "error";
  message: string;
}

interface TransmissionLogProps {
  logs: LogEntry[];
}

export const TransmissionLog = ({ logs }: TransmissionLogProps) => {
  const getTypeColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "success":
        return "bg-metric-positive text-white";
      case "warning":
        return "bg-metric-warning text-white";
      case "error":
        return "bg-destructive text-white";
      default:
        return "bg-primary text-white";
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Übertragungsprotokoll</h3>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-2">
          {logs.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Keine Übertragungen aufgezeichnet
            </p>
          ) : (
            logs.map((log, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-border"
              >
                <Badge className={getTypeColor(log.type)} variant="secondary">
                  {log.type}
                </Badge>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">
                    {log.timestamp}
                  </p>
                  <p className="text-sm break-words">{log.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};
