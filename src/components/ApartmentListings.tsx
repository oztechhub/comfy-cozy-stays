import ApartmentCard from "./ApartmentCard";
import { Button } from "@/components/ui/button";
import { Filter, SlidersHorizontal } from "lucide-react";

// Mock data for demonstration
const mockApartments = [
  {
    id: "1",
    title: "Modern Downtown Loft",
    location: "Manhattan, New York",
    price: 180,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
    amenities: ["wifi", "parking", "coffee"],
    availability: true
  },
  {
    id: "2", 
    title: "Cozy Studio in Historic District",
    location: "Brooklyn, New York",
    price: 120,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
    amenities: ["wifi", "coffee"],
    availability: true
  },
  {
    id: "3",
    title: "Luxury Penthouse Suite", 
    location: "Midtown, New York",
    price: 350,
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
    amenities: ["wifi", "parking", "coffee"],
    availability: false
  },
  {
    id: "4",
    title: "Charming Garden Apartment",
    location: "Queens, New York", 
    price: 95,
    rating: 4.4,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400",
    amenities: ["wifi", "parking"],
    availability: true
  },
  {
    id: "5",
    title: "Sleek Business District Flat",
    location: "Financial District, New York",
    price: 200,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400", 
    amenities: ["wifi", "coffee"],
    availability: true
  },
  {
    id: "6",
    title: "Artist's Creative Space",
    location: "Williamsburg, Brooklyn",
    price: 140,
    rating: 4.5,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400",
    amenities: ["wifi"],
    availability: true
  }
];

const ApartmentListings = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Featured Properties
            </h2>
            <p className="text-muted-foreground">
              Discover handpicked apartments perfect for your stay
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Sort by
            </Button>
          </div>
        </div>
        
        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {mockApartments.length} properties • 
            <span className="text-success font-medium"> {mockApartments.filter(apt => apt.availability).length} available</span>
          </p>
        </div>
        
        {/* Apartment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mockApartments.map((apartment) => (
            <ApartmentCard key={apartment.id} {...apartment} />
          ))}
        </div>
        
        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground">
            Load More Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ApartmentListings;