import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, MapPin, Wifi, Car, Coffee } from "lucide-react";
import { useState } from "react";
import BookingModal from "./BookingModal";
import { useBooking } from "@/contexts/BookingContext";

interface ApartmentCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  availability: boolean;
}

const ApartmentCard = ({ 
  id, 
  title, 
  location, 
  price, 
  rating, 
  reviews, 
  image, 
  amenities, 
  availability 
}: ApartmentCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { getApartmentById } = useBooking();
  
  const apartment = getApartmentById(id);
  
  const amenityIcons = {
    wifi: <Wifi className="h-3 w-3" />,
    parking: <Car className="h-3 w-3" />,
    coffee: <Coffee className="h-3 w-3" />
  };

  return (
    <>
      <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-xl transition-smooth cursor-pointer">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
          
          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 h-8 w-8 p-0 bg-background/80 hover:bg-background/90 backdrop-blur-sm rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorited(!isFavorited);
            }}
          >
            <Heart 
              className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
            />
          </Button>
          
          {/* Availability Badge */}
          {availability && (
            <Badge variant="default" className="absolute top-3 left-3 bg-success text-success-foreground">
              Available
            </Badge>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <h3 className="font-semibold text-foreground line-clamp-1">{title}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {location}
              </div>
            </div>
            
            <div className="flex items-center space-x-1 text-sm">
              <Star className="h-3 w-3 fill-accent text-accent" />
              <span className="font-medium">{rating}</span>
              <span className="text-muted-foreground">({reviews})</span>
            </div>
          </div>
          
          {/* Amenities */}
          <div className="flex items-center space-x-2">
            {amenities.slice(0, 3).map((amenity, index) => (
              <div key={index} className="flex items-center space-x-1 text-xs text-muted-foreground">
                {amenityIcons[amenity as keyof typeof amenityIcons] || <div className="h-3 w-3 rounded-full bg-muted" />}
                <span className="capitalize">{amenity}</span>
              </div>
            ))}
            {amenities.length > 3 && (
              <span className="text-xs text-muted-foreground">+{amenities.length - 3} more</span>
            )}
          </div>
          
          {/* Price and Action */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div>
              <span className="text-lg font-bold text-foreground">${price}</span>
              <span className="text-sm text-muted-foreground">/night</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="hover:bg-primary hover:text-primary-foreground"
              onClick={() => setShowBookingModal(true)}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
      
      {/* Booking Modal */}
      {apartment && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          apartment={apartment}
        />
      )}
    </>
  );
};

export default ApartmentCard;