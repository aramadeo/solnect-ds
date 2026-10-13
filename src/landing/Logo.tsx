import symbol from '../assets/logo/symbol.svg';
import { cn } from '../lib/cn';

/** Figma: LNB / head / logo (symbol 32px + 타이틀) */
export function Logo({ title = 'Solnect DS', className }: { title?: string; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-gap-sm', className)}>
      <span className="relative size-32 shrink-0">
        <img src={symbol} alt="" className="absolute inset-[10%] size-[80%]" />
      </span>
      <span className="text-heading-xs text-text-primary">{title}</span>
    </span>
  );
}
