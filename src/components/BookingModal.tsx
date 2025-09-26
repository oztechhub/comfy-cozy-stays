import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Calendar, 
  MapPin, 
  Star, 
  Users, 
  Wifi, 
  Car, 
  Coffee,
  Home,
  Bath,
  Bed,
  Shield,
  CreditCard,
  Clock
} from "lucide-react";
import { useState } from "react";
import { useBooking } from "@/contexts/BookingContext";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  apartment: {
    id: string;
    title: string;
    location: string;
    price: number;
    rating: number;
    reviews: number;
    images: string[];
    amenities: string[];
    bedrooms: number;
    bathrooms: number;
    maxGuests: number;
    description: string;
  };
}

const BookingModal = ({ isOpen, onClose, apartment }: BookingModalProps) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  
  const { createBooking } = useBooking();
  const { user, isAuthenticated } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const nights = checkIn && checkOut ? 
    Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const totalPrice = nights * apartment.price;
  const cleaningFee = 25;
  const serviceFee = Math.round(totalPrice * 0.12);
  const finalTotal = totalPrice + cleaningFee + serviceFee;

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to make a booking.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!checkIn || !checkOut) {
      toast({
        title: "Please select dates",
        description: "Check-in and check-out dates are required.",
        variant: "destructive",
      });
      return;
    }

    setIsBooking(true);
    
    try {
      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      createBooking({
        apartmentId: apartment.id,
        apartment,
        userId: user!.id,
        checkIn,
        checkOut,
        guests,
        totalPrice: finalTotal,
        status: 'confirmed'
      });

      toast({
        title: "Booking confirmed!",
        description: `Your stay at ${apartment.title} has been booked successfully.`,
      });
      
      onClose();
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Booking failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  const amenityIcons = {
    wifi: <Wifi className="h-4 w-4" />,
    parking: <Car className="h-4 w-4" />,
    coffee: <Coffee className="h-4 w-4" />
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{apartment.title}</DialogTitle>
          <DialogDescription className="flex items-center space-x-4 text-base">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{apartment.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium">{apartment.rating}</span>
              <span className="text-muted-foreground">({apartment.reviews} reviews)</span>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
              {apartment.images.slice(0, 4).map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${apartment.title} ${index + 1}`}
                  className="w-full h-32 object-cover hover:scale-105 transition-smooth cursor-pointer"
                />
              ))}
            </div>
            
            {/* Property Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Bed className="h-4 w-4" />
                  <span>{apartment.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Bath className="h-4 w-4" />
                  <span>{apartment.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>Up to {apartment.maxGuests} guests</span>
                </div>
              </div>
              
              <p className="text-foreground leading-relaxed">
                {apartment.description}
              </p>
            </div>
            
            {/* Amenities */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Amenities</h3>
              <div className="grid grid-cols-2 gap-2">
                {apartment.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    {amenityIcons[amenity as keyof typeof amenityIcons] || <Home className="h-4 w-4" />}
                    <span className="capitalize">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Safety */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Safety & Security</h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Verified property with 24/7 support</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Booking Card */}
          <div className="bg-card border rounded-xl p-6 h-fit sticky top-4">
            <div className="space-y-6">
              {/* Price */}
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  ${apartment.price}
                  <span className="text-base font-normal text-muted-foreground">/night</span>
                </div>
              </div>
              
              {/* Booking Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="checkin" className="text-xs font-medium">Check-in</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="checkin"
                        type="date" 
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkout" className="text-xs font-medium">Check-out</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="checkout"
                        type="date" 
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="guests" className="text-xs font-medium">Guests</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <select 
                      id="guests"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full h-10 pl-10 pr-3 rounded-md border border-input bg-background text-sm"
                    >
                      {[...Array(apartment.maxGuests)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} Guest{i + 1 > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Price Breakdown */}
              {nights > 0 && (
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>${apartment.price} × {nights} nights</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cleaning fee</span>
                    <span>${cleaningFee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service fee</span>
                    <span>${serviceFee}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${finalTotal}</span>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="w-full"
                  disabled={!checkIn || !checkOut || isBooking}
                  onClick={handleBooking}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {isBooking ? 'Processing...' : nights > 0 ? `Book Now - $${finalTotal}` : 'Select Dates'}
                </Button>
                
                <Button variant="outline" size="sm" className="w-full">
                  <Clock className="h-4 w-4 mr-2" />
                  Reserve Now, Pay Later
                </Button>
              </div>
              
              <p className="text-xs text-center text-muted-foreground">
                You won't be charged yet. Free cancellation before 24 hours.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;