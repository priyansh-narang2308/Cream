export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 mt-24 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-semibold">
            Beam <br />
            <span className="text-xs text-center font-light ">
              &copy; 2025
            </span>
          </h2>

          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Support
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Built independently as a personal project. If anything here
          unintentionally infringes on rights, just let me know and I&apos;ll
          update or remove it right away.
        </p>
      </div>
    </footer>
  );
}
