import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Square, RotateCcw } from "lucide-react";

interface ControlPanelProps {
  isRunning: boolean;
  selectedPath: string;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onPathChange: (path: string) => void;
}

export const ControlPanel = ({
  isRunning,
  selectedPath,
  onStart,
  onStop,
  onReset,
  onPathChange,
}: ControlPanelProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Steuerung</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="path-select">Übertragungspfad</Label>
          <Select value={selectedPath} onValueChange={onPathChange}>
            <SelectTrigger id="path-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">
                Primär: Mars → Repeater1 → Erde
              </SelectItem>
              <SelectItem value="backup">
                Backup: Mars → Repeater2 → Erde
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          {!isRunning ? (
            <Button onClick={onStart} className="flex-1">
              <Play className="w-4 h-4 mr-2" />
              Simulation starten
            </Button>
          ) : (
            <Button onClick={onStop} variant="destructive" className="flex-1">
              <Square className="w-4 h-4 mr-2" />
              Stoppen
            </Button>
          )}
          
          <Button onClick={onReset} variant="outline">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>System:</strong> PQMS v12</p>
            <p><strong>Architektur:</strong> Proaktives Quanten-Mesh</p>
            <p><strong>Channels:</strong> 10 parallele Kanäle</p>
            <p><strong>TRL:</strong> 4 (Labor-Validierung)</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
