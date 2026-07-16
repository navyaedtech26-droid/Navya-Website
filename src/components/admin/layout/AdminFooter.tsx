/** AdminLTE-style footer: copyright left, version tag right. */
export default function AdminFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-[#dee2e6] bg-white px-4 py-3 text-xs text-[#6c757d]">
      <span>Copyright &copy; {new Date().getFullYear()} Navya EdTech. All rights reserved.</span>
      <span>Admin Dashboard</span>
    </footer>
  );
}
