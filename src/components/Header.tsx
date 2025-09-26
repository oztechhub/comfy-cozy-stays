import { Button } from "@/components/ui/button";
import { Search, User, Menu, Heart, MapPin } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <MapPin className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">StayFinder</span>
        </div>
        
        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
            Browse
          </a>
          <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
            Host Your Property
          </a>
          <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
            Help
          </a>
        </nav>
        
        {/* User Actions */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Heart className="h-4 w-4 mr-2" />
            Favorites
          </Button>
          
          <Button variant="outline" size="sm">
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
          
          <Button variant="default" size="sm" className="hidden sm:flex">
            Sign Up
          </Button>
          
          {/* Mobile Menu */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;