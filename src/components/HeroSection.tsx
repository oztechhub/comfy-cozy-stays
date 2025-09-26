import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Users, Search } from "lucide-react";
import heroImage from "@/assets/hero-apartment.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Beautiful apartment interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Find Your Perfect
            <span className="block text-primary">Stay</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
            Discover amazing apartments and homes for short stays, business trips, or extended visits in cities worldwide.
          </p>
          
          {/* Search Form */}
          <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Where</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="City, neighborhood..." 
                    className="pl-10 border-0 bg-muted/50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Check-in</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="date" 
                    className="pl-10 border-0 bg-muted/50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Check-out</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="date" 
                    className="pl-10 border-0 bg-muted/50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <select className="w-full h-10 pl-10 pr-3 rounded-md border-0 bg-muted/50 text-sm">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4+ Guests</option>
                  </select>
                </div>
              </div>
            </div>
            
            <Button variant="hero" size="lg" className="w-full mt-6">
              <Search className="h-4 w-4 mr-2" />
              Search Properties
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;