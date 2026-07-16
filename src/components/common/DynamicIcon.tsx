import { lazy, Suspense, type ComponentType } from "react";
import { BriefcaseBusiness, type LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

const toKebabCase = (name: string) =>
  name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const lazyCache = new Map<string, ComponentType<LucideProps>>();

function resolveIcon(name: string): ComponentType<LucideProps> | null {
  const kebab = toKebabCase(name);
  const importFn = dynamicIconImports[kebab as keyof typeof dynamicIconImports];
  if (!importFn) return null;
  let Icon = lazyCache.get(kebab);
  if (!Icon) {
    Icon = lazy(importFn) as unknown as ComponentType<LucideProps>;
    lazyCache.set(kebab, Icon);
  }
  return Icon;
}

interface DynamicIconProps extends LucideProps {
  /**
   * Any lucide-react icon name in PascalCase (e.g. "ShoppingBag"), as freely
   * typed by an admin into a case-study's icon field. Falls back to
   * BriefcaseBusiness for unrecognised names so a typo never breaks layout.
   */
  name: string;
}

/**
 * Renders one lucide-react icon chosen by a runtime string without bundling
 * the ~1500-icon library: `import * as Icons from "lucide-react"` plus a
 * dynamic `Icons[name]` lookup (the previous approach here) forces Rollup to
 * keep every icon reachable, since it can't statically tell which ones are
 * used. This uses lucide-react's own per-icon dynamic-import map instead, so
 * only icons actually referenced by real data are ever downloaded.
 */
export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = resolveIcon(name);
  if (!Icon) return <BriefcaseBusiness {...props} />;
  return (
    <Suspense fallback={<BriefcaseBusiness {...props} />}>
      <Icon {...props} />
    </Suspense>
  );
}
