import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

interface Node {
  id: string;
  x: number;
  y: number;
  type: "planet" | "repeater";
  label: string;
}

interface Link {
  source: string;
  target: string;
}

interface NetworkVisualizationProps {
  activePath: string[];
  transmitting: boolean;
}

export const NetworkVisualization = ({ activePath, transmitting }: NetworkVisualizationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationFrame, setAnimationFrame] = useState(0);

  const nodes: Node[] = [
    { id: "Erde", x: 80, y: 250, type: "planet", label: "Erde" },
    { id: "Repeater1A", x: 220, y: 120, type: "repeater", label: "R1-A" },
    { id: "Repeater1B", x: 380, y: 120, type: "repeater", label: "R1-B" },
    { id: "Repeater2A", x: 220, y: 380, type: "repeater", label: "R2-A" },
    { id: "Repeater2B", x: 380, y: 380, type: "repeater", label: "R2-B" },
    { id: "Repeater3", x: 300, y: 250, type: "repeater", label: "R3-Bridge" },
    { id: "Mars", x: 520, y: 250, type: "planet", label: "Mars" },
  ];

  const links: Link[] = [
    // Pfad 1 (oben)
    { source: "Erde", target: "Repeater1A" },
    { source: "Repeater1A", target: "Repeater1B" },
    { source: "Repeater1B", target: "Mars" },
    // Pfad 2 (unten)
    { source: "Erde", target: "Repeater2A" },
    { source: "Repeater2A", target: "Repeater2B" },
    { source: "Repeater2B", target: "Mars" },
    // Pfad 3 (Verbindung)
    { source: "Erde", target: "Repeater3" },
    { source: "Repeater3", target: "Repeater1B" },
    { source: "Repeater3", target: "Repeater2B" },
    { source: "Repeater3", target: "Mars" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scale = window.devicePixelRatio || 1;
    canvas.width = 600 * scale;
    canvas.height = 500 * scale;
    canvas.style.width = "600px";
    canvas.style.height = "500px";
    ctx.scale(scale, scale);

    // Clear canvas
    ctx.clearRect(0, 0, 600, 500);

    // Draw links
    links.forEach((link) => {
      const sourceNode = nodes.find((n) => n.id === link.source);
      const targetNode = nodes.find((n) => n.id === link.target);
      
      if (!sourceNode || !targetNode) return;

      const isActivePath = 
        activePath.length > 0 &&
        activePath.indexOf(sourceNode.id) !== -1 &&
        activePath.indexOf(targetNode.id) !== -1 &&
        Math.abs(activePath.indexOf(sourceNode.id) - activePath.indexOf(targetNode.id)) === 1;

      ctx.beginPath();
      ctx.moveTo(sourceNode.x, sourceNode.y);
      ctx.lineTo(targetNode.x, targetNode.y);
      ctx.strokeStyle = isActivePath ? "hsl(142, 76%, 36%)" : "hsl(214, 32%, 88%)";
      ctx.lineWidth = isActivePath ? 3 : 1.5;
      ctx.stroke();

      // Animate quantum particles on active path
      if (isActivePath && transmitting) {
        const progress = (animationFrame % 100) / 100;
        const x = sourceNode.x + (targetNode.x - sourceNode.x) * progress;
        const y = sourceNode.y + (targetNode.y - sourceNode.y) * progress;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "hsl(270, 80%, 60%)";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "hsl(270, 80%, 60%)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    // Draw nodes
    nodes.forEach((node) => {
      const isActive = activePath.includes(node.id);
      
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.type === "planet" ? 25 : 15, 0, Math.PI * 2);
      
      if (isActive) {
        ctx.fillStyle = node.type === "planet" ? "hsl(214, 95%, 36%)" : "hsl(142, 76%, 36%)";
        ctx.shadowBlur = 20;
        ctx.shadowColor = node.type === "planet" ? "hsl(214, 95%, 36%)" : "hsl(142, 76%, 36%)";
      } else {
        ctx.fillStyle = "hsl(0, 0%, 100%)";
      }
      
      ctx.fill();
      ctx.shadowBlur = 0;
      
      ctx.strokeStyle = isActive ? "hsl(142, 76%, 36%)" : "hsl(214, 32%, 88%)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw label
      ctx.fillStyle = "hsl(215, 25%, 15%)";
      ctx.font = node.type === "planet" ? "bold 14px sans-serif" : "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(node.label, node.x, node.y + (node.type === "planet" ? 45 : 35));
    });
  }, [activePath, transmitting, animationFrame]);

  useEffect(() => {
    if (!transmitting) return;
    
    const interval = setInterval(() => {
      setAnimationFrame((prev) => (prev + 1) % 100);
    }, 20);

    return () => clearInterval(interval);
  }, [transmitting]);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Netzwerk Topologie</h3>
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          className="border border-border rounded-lg"
        />
      </div>
    </Card>
  );
};
