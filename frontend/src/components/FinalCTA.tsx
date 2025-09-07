import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Rocket, ArrowRight, Sparkles } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main CTA Card */}
        <Card className="relative overflow-hidden p-12 md:p-16 text-center glass-card border-2 border-primary/30">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center glow-primary animate-glow hover-friendly">
                  <Rocket className="w-12 h-12 text-white animate-bounce-gentle" />
                </div>
                <div className="absolute -top-3 -right-3">
                  <Sparkles className="w-10 h-10 text-accent animate-pulse-soft" />
                </div>
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-heading">
              <span className="text-gradient">Boost Your Focus</span>
            </h2>
            
            {/* Subheading */}
            <p className="text-2xl md:text-3xl font-medium text-muted-foreground mb-8">
              One step at a time
            </p>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Join thousands of neurodivergent individuals who've transformed their daily routines 
              with Mind Mate's adaptive AI coaching. Your journey to better organization starts now.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button variant="hero" size="xl" className="min-w-64">
                <MessageSquare className="w-6 h-6" />
                Join via WhatsApp
                <ArrowRight className="w-6 h-6" />
              </Button>
              <Button variant="glass" size="xl" className="min-w-64">
                <Rocket className="w-6 h-6" />
                Start Free Trial
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="hover-friendly">
                <div className="text-3xl font-bold text-primary mb-2 animate-bounce-gentle">10,000+</div>
                <div className="text-muted-foreground">Active Users</div>
              </div>
              <div className="hover-friendly">
                <div className="text-3xl font-bold text-accent mb-2 animate-pulse-soft">98%</div>
                <div className="text-muted-foreground">Satisfaction Rate</div>
              </div>
              <div className="hover-friendly">
                <div className="text-3xl font-bold text-secondary mb-2 animate-bounce-gentle">4.9★</div>
                <div className="text-muted-foreground">App Store Rating</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Bottom Features */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card className="p-8 glass-card hover-friendly">
            <h3 className="text-2xl font-bold mb-4 text-gradient">Why Mind Mate?</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3 hover-friendly">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse-soft"></div>
                Designed specifically for neurodivergent minds
              </li>
              <li className="flex items-center gap-3 hover-friendly">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse-soft"></div>
                No overwhelming interfaces or complex setups
              </li>
              <li className="flex items-center gap-3 hover-friendly">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse-soft"></div>
                Works through platforms you already use
              </li>
              <li className="flex items-center gap-3 hover-friendly">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse-soft"></div>
                Adapts to your unique patterns and needs
              </li>
            </ul>
          </Card>

          <Card className="p-8 glass-card hover-friendly">
            <h3 className="text-2xl font-bold mb-4 text-gradient">Get Started Today</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3 hover-friendly">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse-soft">1</div>
                Scan the QR code or click "Join via WhatsApp"
              </li>
              <li className="flex items-center gap-3 hover-friendly">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse-soft">2</div>
                Send the activation code to get started
              </li>
              <li className="flex items-center gap-3 hover-friendly">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse-soft">3</div>
                Begin your personalized planning journey
              </li>
            </ul>
          </Card>
        </div>

        {/* Final Message */}
        <div className="text-center mt-16">
          <p className="text-sm text-muted-foreground">
            No credit card required • Start free • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;