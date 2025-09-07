import { Button } from "@/components/ui/button";
import { Brain, Sparkles, Target } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30 animate-float"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Logo/Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center glow-primary animate-glow hover-friendly">
              <Brain className="w-10 h-10 text-white animate-pulse-soft" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-accent animate-bounce-gentle" />
            </div>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-heading">
          <span className="text-gradient">Mind Mate</span>
        </h1>
        
        {/* Tagline */}
        <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground mb-4 font-heading">
          (A.D.A.P.T.)
        </p>
        
        {/* Subheading */}
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
          <span className="font-semibold text-foreground">Assistive Daily AI for Planning Tasks</span>
          <br />
          AI-powered daily planning support for neurodivergent students and adults.
        </p>
        
        {/* Features Preview */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-card-border hover-friendly">
            <Target className="w-4 h-4 text-primary animate-pulse-soft" />
            <span className="text-sm font-medium">ADHD Support</span>
          </div>
          <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-card-border hover-friendly">
            <Brain className="w-4 h-4 text-accent animate-pulse-soft" />
            <span className="text-sm font-medium">Autism Friendly</span>
          </div>
          <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-card-border hover-friendly">
            <Sparkles className="w-4 h-4 text-secondary animate-pulse-soft" />
            <span className="text-sm font-medium">Dyslexia Adaptive</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="hero" size="xl" className="min-w-48">
            Get Started
          </Button>
          <Button variant="glass" size="xl" className="min-w-48">
            Learn More
          </Button>
        </div>

        {/* Social Proof */}
        <p className="text-sm text-muted-foreground mt-8">
          Trusted by over 10,000 neurodivergent individuals worldwide
        </p>
      </div>
    </section>
  );
};

export default Hero;