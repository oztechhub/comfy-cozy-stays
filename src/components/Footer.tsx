import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <MapPin className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">StayFinder</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your trusted partner for finding the perfect accommodation. From short stays to extended visits, we've got you covered.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Browse Properties</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Host Your Property</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">My Bookings</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Favorites</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Help Center</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Customer Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Safety & Security</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Cancellation Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Privacy Policy</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@stayfinder.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>123 Business Ave<br />New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2024 StayFinder. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;