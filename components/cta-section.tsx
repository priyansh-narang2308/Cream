import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export function CTASection() {
  const benefits = [
    "No credit card required",
    "Free forever plan",
    "Setup in 30 seconds",
  ];

  return (
    <section className="w-full py-1 px-4 sm:px-6 flex justify-center">
      <div
        className="w-full max-w-5xl bg-muted/40 dark:bg-muted/25
        rounded-3xl p-10 sm:p-14 text-center shadow-sm border border-border/40"
      >
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
          Ready to transform your conversations?
        </h2>

        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
          Join thousands of users who&apos;ve already discovered a better way to
          communicate. Start your journey today — it&apos;s completely free.
        </p>

        <Button
          size="lg"
          className="px-10 py-6 text-lg h-auto rounded-xl cursor-pointer bg-black text-white 
          dark:bg-white dark:text-black shadow-md hover:shadow-lg transition-all"
        >
          Get Started For Free
        </Button>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <CheckCircle className="h-4 w-4 text-green-500" />
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
