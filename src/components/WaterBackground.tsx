import { useEffect, useState } from "react";

interface WaterDrop {
  id: number;
  size: number;
  left: number;
  animationDelay: number;
  animationDuration: number;
}

interface Molecule {
  id: number;
  size: number;
  left: number;
  animationDelay: number;
}

export const WaterBackground = () => {
  const [waterDrops, setWaterDrops] = useState<WaterDrop[]>([]);
  const [molecules, setMolecules] = useState<Molecule[]>([]);

  useEffect(() => {
    // Generate random water drops
    const drops = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: Math.random() * 40 + 20, // 20-60px
      left: Math.random() * 100,
      animationDelay: Math.random() * 6,
      animationDuration: Math.random() * 4 + 6, // 6-10s
    }));

    // Generate floating molecules
    const mols = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 80 + 40, // 40-120px
      left: Math.random() * 100,
      animationDelay: Math.random() * 10,
    }));

    setWaterDrops(drops);
    setMolecules(mols);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0 wave-bg"
          style={{
            background: `radial-gradient(ellipse at top, hsl(var(--accent) / 0.1), transparent),
                        radial-gradient(ellipse at bottom right, hsl(var(--primary-light) / 0.15), transparent)`
          }}
        />
      </div>

      {/* Water drops */}
      {waterDrops.map((drop) => (
        <div
          key={drop.id}
          className="water-drop"
          style={{
            width: `${drop.size}px`,
            height: `${drop.size}px`,
            left: `${drop.left}%`,
            top: `${Math.random() * 60 + 20}%`,
            animationDelay: `${drop.animationDelay}s`,
            animationDuration: `${drop.animationDuration}s`,
          }}
        />
      ))}

      {/* Floating molecules */}
      {molecules.map((molecule) => (
        <div
          key={molecule.id}
          className="molecule"
          style={{
            width: `${molecule.size}px`,
            height: `${molecule.size}px`,
            left: `${molecule.left}%`,
            animationDelay: `${molecule.animationDelay}s`,
          }}
        />
      ))}

      {/* Additional decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-20 animate-water-pulse bg-gradient-to-br from-accent to-primary-light" />
      <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full opacity-25 animate-water-pulse bg-gradient-to-tr from-primary-light to-secondary" style={{ animationDelay: '1s' }} />
    </div>
  );
};