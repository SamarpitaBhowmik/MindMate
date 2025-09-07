import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Smartphone, ArrowRight } from "lucide-react";
import qrCodeImage from "@/assets/qr-code-placeholder.jpg";

const QRSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 font-heading">
            <span className="text-gradient">Connect Instantly</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Get started with Mind Mate through WhatsApp in seconds
          </p>
        </div>

        <Card className="max-w-4xl mx-auto glass-card p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* QR Code */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-xl animate-pulse-soft"></div>
                <div className="relative bg-card rounded-3xl p-6 border border-card-border hover-friendly animate-bounce-gentle">
                  <img 
                    src={qrCodeImage} 
                    alt="QR Code to connect with Mind Mate on WhatsApp" 
                    className="w-48 h-48 mx-auto rounded-2xl hover-glow"
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Scan with your phone's camera
              </p>
            </div>

            {/* Instructions */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 hover-friendly">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0 animate-pulse-soft">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Scan the QR Code</h3>
                  <p className="text-muted-foreground">
                    Use your phone's camera to scan the QR code above
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 hover-friendly">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0 animate-pulse-soft">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Send the Code</h3>
                  <p className="text-muted-foreground mb-2">
                    Send this message to start using Mind Mate:
                  </p>
                  <div className="bg-secondary/20 text-secondary font-mono text-sm p-3 rounded-lg border border-secondary/30 hover-glow">
                    join zipper-duty
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 hover-friendly">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 animate-pulse-soft">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Start Planning</h3>
                  <p className="text-muted-foreground">
                    Begin your personalized AI-powered planning journey immediately
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Button variant="secondary" size="lg" className="w-full">
                  <MessageSquare className="w-5 h-5" />
                  Open WhatsApp Directly
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Alternative Connection Methods */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">Don't have WhatsApp? No problem!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="lg">
              <Smartphone className="w-5 h-5" />
              Try via SMS
            </Button>
            <Button variant="outline" size="lg">
              <MessageSquare className="w-5 h-5" />
              Email Setup
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QRSection;