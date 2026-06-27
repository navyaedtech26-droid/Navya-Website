import { useRef, type MutableRefObject, type RefObject } from "react";
import { SERVICE_CARDS, type HoverRef } from "./data";
import { useGlobeCanvas, useConnectorCanvas } from "@/hooks/useGlobeCanvas";
import { ServiceCardItem } from "./ServiceCards";

function GlobeCanvas({ hoverRef }: { hoverRef: HoverRef }) {
  const canvasRef = useGlobeCanvas(hoverRef);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[5] w-full h-full cursor-grab active:cursor-grabbing"
    />
  );
}

function ConnectorCanvas({
  containerRef,
  cardRefs,
  hoverRef,
}: {
  containerRef: RefObject<HTMLDivElement>;
  cardRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  hoverRef: HoverRef;
}) {
  const canvasRef = useConnectorCanvas(containerRef, cardRefs, hoverRef);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-20 w-full h-full pointer-events-none"
    />
  );
}

// ─── Globe Stage (globe + connectors + cards share refs) ──────────────────────
export function GlobeStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverRef = useRef<number | null>(null);

  return (
    <div ref={containerRef} className="relative h-[380px] sm:h-[440px] lg:h-[520px]">
      <GlobeCanvas hoverRef={hoverRef} />
      <ConnectorCanvas containerRef={containerRef} cardRefs={cardRefs} hoverRef={hoverRef} />

      {SERVICE_CARDS.map((card, i) => (
        <ServiceCardItem
          key={card.title}
          card={card}
          index={i}
          hoverRef={hoverRef}
          registerRef={(el) => (cardRefs.current[i] = el)}
        />
      ))}
    </div>
  );
}
