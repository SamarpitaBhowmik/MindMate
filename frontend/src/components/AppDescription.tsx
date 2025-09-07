import { Card } from "@/components/ui/card";
import { MessageSquare, Volume2, Trophy, Zap } from "lucide-react";

const AppDescription = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Problem Statement */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 font-heading">
            <span className="text-gradient">The Challenge</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Millions with ADHD, autism, or dyslexia struggle with daily organization. 
            <span className="text-accent font-semibold"> Standard calendars don't work.</span>
            <br />
            <span className="text-primary font-semibold">Mind Mate adapts to their needs.</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <Card className="p-6 glass-card hover-friendly group cursor-pointer">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center group-hover:animate-wiggle transition-transform duration-300">
                <MessageSquare className="w-8 h-8 text-white animate-pulse-soft" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Adaptive AI Coach</h3>
            <p className="text-muted-foreground mb-4">
              WhatsApp & SMS integration breaks down complex tasks into manageable steps tailored to your unique needs.
            </p>
            <div className="flex items-center text-sm text-primary font-medium group-hover:animate-bounce-gentle">
              <span>Learn more</span>
              <Zap className="w-4 h-4 ml-1" />
            </div>
          </Card>

          {/* Feature 2 */}
          <Card className="p-6 glass-card hover-friendly group cursor-pointer">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-light rounded-2xl flex items-center justify-center group-hover:animate-wiggle transition-transform duration-300">
                <Volume2 className="w-8 h-8 text-white animate-pulse-soft" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Multi-modal Reminders</h3>
            <p className="text-muted-foreground mb-4">
              Choose between text, voice, or visual reminders that work best for your learning style and preferences.
            </p>
            <div className="flex items-center text-sm text-accent font-medium group-hover:animate-bounce-gentle">
              <span>Explore options</span>
              <Zap className="w-4 h-4 ml-1" />
            </div>
          </Card>

          {/* Feature 3 */}
          <Card className="p-6 glass-card hover-friendly group cursor-pointer">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary-light rounded-2xl flex items-center justify-center group-hover:animate-wiggle transition-transform duration-300">
                <Trophy className="w-8 h-8 text-white animate-pulse-soft" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Progress Gamification</h3>
            <p className="text-muted-foreground mb-4">
              Celebrate streaks, milestones, and achievements with a reward system designed to maintain motivation.
            </p>
            <div className="flex items-center text-sm text-secondary font-medium group-hover:animate-bounce-gentle">
              <span>View rewards</span>
              <Zap className="w-4 h-4 ml-1" />
            </div>
          </Card>

          {/* Feature 4 */}
          <Card className="p-6 glass-card hover-friendly group cursor-pointer">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-warning to-yellow-400 rounded-2xl flex items-center justify-center group-hover:animate-wiggle transition-transform duration-300">
                <Zap className="w-8 h-8 text-white animate-pulse-soft" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Smart Adaptation</h3>
            <p className="text-muted-foreground mb-4">
              Our AI learns your patterns, energy levels, and preferences to suggest optimal task scheduling.
            </p>
            <div className="flex items-center text-sm text-warning font-medium group-hover:animate-bounce-gentle">
              <span>See how it works</span>
              <Zap className="w-4 h-4 ml-1" />
            </div>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Join thousands who've transformed their daily routine
          </p>
          <div className="flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center hover-friendly animate-pulse-soft">
                <span className="text-white text-xs">★</span>
              </div>
            ))}
            <span className="ml-2 text-muted-foreground">4.9/5 from 2,000+ users</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDescription;