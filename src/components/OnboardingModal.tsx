import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const OnboardingModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("pqms-onboarding-seen");
    if (!hasSeenOnboarding) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("pqms-onboarding-seen", "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Willkommen beim Proaktiven Quanten-Mesh System
          </DialogTitle>
          <DialogDescription className="space-y-4 pt-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Was ist PQMS?</h4>
              <p>
                Das Proaktive Quanten-Mesh System (PQMS v12) ist eine Simulation
                für interplanetare Quantenkommunikation zwischen Erde und Mars.
                Es eliminiert Setup-Latenz durch permanente "Hot-Standby" Verschränkungspaare.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Wie funktioniert es?</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Wählen Sie einen Übertragungspfad (Primär oder Backup)</li>
                <li>Passen Sie die Anzahl paralleler Kanäle an</li>
                <li>Starten Sie die Simulation und beobachten Sie Live-Metriken</li>
                <li>Analysieren Sie das Übertragungsprotokoll</li>
              </ol>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Technische Details</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Setup-Latenz:</strong> 0s (proaktiv vs. ~1.500s reaktiv)</li>
                <li><strong>Übertragungslatenz:</strong> ~0,05s inkl. Repeater-Swaps</li>
                <li><strong>Erfolgsrate:</strong> 100% bei optimalen Bedingungen</li>
                <li><strong>TRL:</strong> 4 (Laborvalidierter Prototyp)</li>
              </ul>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end pt-4">
          <Button onClick={handleClose}>Simulation starten</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
