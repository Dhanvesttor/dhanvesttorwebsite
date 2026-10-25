import { Container } from "@/components/ui/Container";
export function Disclaimer({ text, className }: { text: string; className?: string }) {
  return (
    <div className={className ?? "border-t border-line bg-paper"}>
      <Container className="py-8"><p className="max-w-[120ch] text-[12.5px] leading-relaxed text-mist">{text}</p></Container>
    </div>
  );
}
