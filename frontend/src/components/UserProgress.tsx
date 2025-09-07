import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Flame, CheckCircle, Target, TrendingUp, Star } from "lucide-react";

const UserProgress = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  // Mock user data
  const mockUserData = {
    name: "Alex Johnson",
    streak: 7,
    completedTasks: 42,
    nextStep: "Complete morning routine checklist",
    weeklyGoal: 85,
    level: 3,
    achievements: ["7-Day Streak", "Early Bird", "Task Master"]
  };

  const handleSearch = () => {
    if (phoneNumber.length > 8) {
      setIsSearched(true);
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 font-heading">
            <span className="text-gradient">Track Your Progress</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            See how you're crushing your goals and building lasting habits
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="p-6 glass-card">
            <h3 className="text-xl font-bold text-center mb-4">Check Your Stats</h3>
            <div className="flex gap-3">
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 bg-background/50 border-card-border"
              />
              <Button 
                onClick={handleSearch}
                className="px-8"
                disabled={phoneNumber.length < 8}
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-3">
              We'll show you your current progress and achievements
            </p>
          </Card>
        </div>

        {/* Progress Display */}
        {isSearched && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Card className="glass-card p-8 mb-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gradient mb-2">
                  Welcome back, {mockUserData.name}! 🎉
                </h3>
                <p className="text-muted-foreground">Here's your amazing progress</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Current Streak */}
                <Card className="p-6 bg-gradient-to-br from-secondary/20 to-secondary/5 border-secondary/30">
                  <div className="flex items-center justify-between mb-4">
                    <Flame className="w-8 h-8 text-secondary" />
                    <span className="text-3xl font-bold text-secondary">{mockUserData.streak}</span>
                  </div>
                  <h4 className="font-bold text-lg">Current Streak</h4>
                  <p className="text-sm text-muted-foreground">Days in a row</p>
                  <div className="mt-3 bg-secondary/20 rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full w-full"></div>
                  </div>
                </Card>

                {/* Completed Tasks */}
                <Card className="p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
                  <div className="flex items-center justify-between mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                    <span className="text-3xl font-bold text-primary">{mockUserData.completedTasks}</span>
                  </div>
                  <h4 className="font-bold text-lg">Tasks Completed</h4>
                  <p className="text-sm text-muted-foreground">This month</p>
                  <div className="mt-3 bg-primary/20 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-4/5"></div>
                  </div>
                </Card>

                {/* Weekly Goal */}
                <Card className="p-6 bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30">
                  <div className="flex items-center justify-between mb-4">
                    <Target className="w-8 h-8 text-accent" />
                    <span className="text-3xl font-bold text-accent">{mockUserData.weeklyGoal}%</span>
                  </div>
                  <h4 className="font-bold text-lg">Weekly Goal</h4>
                  <p className="text-sm text-muted-foreground">Almost there!</p>
                  <div className="mt-3 bg-accent/20 rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: `${mockUserData.weeklyGoal}%` }}></div>
                  </div>
                </Card>
              </div>

              {/* Next Step */}
              <Card className="mt-6 p-6 bg-gradient-to-r from-warning/10 to-warning/5 border-warning/30">
                <div className="flex items-start gap-4">
                  <TrendingUp className="w-6 h-6 text-warning flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">Next Suggested Step</h4>
                    <p className="text-foreground mb-3">{mockUserData.nextStep}</p>
                    <Button variant="outline" size="sm">
                      Mark as Done
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Achievements */}
              <div className="mt-8">
                <h4 className="font-bold text-lg mb-4 text-center">Recent Achievements</h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {mockUserData.achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 px-4 py-2 rounded-full border border-primary/30"
                    >
                      <Star className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Motivational Message */}
            <div className="text-center">
              <p className="text-lg font-medium text-gradient mb-4">
                You're crushing it! 🚀
              </p>
              <p className="text-muted-foreground">
                Keep up the momentum and watch your productivity soar
              </p>
            </div>
          </div>
        )}

        {/* Demo encouragement for non-searched state */}
        {!isSearched && (
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Try entering any phone number to see a demo of the progress tracking
            </p>
            <Button 
              variant="ghost" 
              onClick={() => {
                setPhoneNumber("+1 (555) 123-4567");
                setIsSearched(true);
              }}
            >
              View Demo Progress
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserProgress;