export default function AdminFooter() {
  return (
    <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
      <span>Copyright &copy; {new Date().getFullYear()} Navya EdTech. All rights reserved.</span>
      <span>Management Platform v2.0</span>
    </footer>
  );
}
