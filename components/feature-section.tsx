import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Video, Shield, Users, Zap, Smartphone } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Instant Messaging",
      desc: "Lightning-fast messages with real-time delivery. Stay connected with ease.",
      icon: <MessageCircle className="h-6 w-6" />,
    },
    {
      title: "HD Video Calls",
      desc: "Crystal-clear video calls with one click. Great for personal chats or team meetings.",
      icon: <Video className="h-6 w-6" />,
    },
    {
      title: "Privacy First",
      desc: "End-to-end encryption that keeps your conversations private. Your data stays yours.",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: "Group Chats",
      desc: "Create groups for friends, family, or teams. Manage conversations with simple controls.",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Lightning Fast",
      desc: "Built for speed. Everything syncs instantly across all your devices.",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: "Smart Sync",
      desc: "Messages and media stay perfectly synced across all devices with zero effort.",
      icon: <Smartphone className="h-6 w-6 rotate-45" />,
    },
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 flex flex-col items-center text-center gap-12">
      <div className="max-w-3xl space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Everything you need to stay connected
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Built for seamless communication, whether you&apos;re chatting with
          friends or collaborating with your team.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {features.map((f, i) => (
          <Card
            key={i}
            className="group hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border border-border/60"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-center items-center">
                <div className="p-3 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors">
                  {f.icon}
                </div>
              </div>
              <h3 className="font-semibold text-xl">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
