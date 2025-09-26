import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useBooking } from '@/contexts/BookingContext';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Heart,
  SlidersHorizontal,
  Users,
  Wifi,
  Car,
  Coffee
} from 'lucide-react';
import Header from '@/components/Header';
import BookingModal from '@/components/BookingModal';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchApartments, apartments } = useBooking();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filteredApartments, setFilteredApartments] = useState(apartments);
  
  const amenityIcons = {
    wifi: <Wifi className="h-3 w-3" />,
    parking: <Car className="h-3 w-3" />,
    coffee: <Coffee className="h-3 w-3" />
  };

  useEffect(() => {
    const results = searchApartments(
      searchQuery,
      location,
      priceRange[0],
      priceRange[1]
    );
    
    // Apply sorting
    let sortedResults = [...results];
    switch (sortBy) {
      case 'price-low':
        sortedResults.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedResults.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sortedResults.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // relevance - keep original order
        break;
    }
    
    setFilteredApartments(sortedResults);
  }, [searchQuery, location, priceRange, sortBy, searchApartments]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (location) params.set('location', location);
    setSearchParams(params);
  };

  const toggleFavorite = (apartmentId: string) => {
    setFavorites(prev => 
      prev.includes(apartmentId) 
        ? prev.filter(id => id !== apartmentId)
        : [...prev, apartmentId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </h3>
                </div>

                {/* Search */}
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search apartments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Enter location..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-4">
                  <Label>Price Range</Label>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={500}
                      min={50}
                      step={10}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Sort By */}
                <div className="space-y-2">
                  <Label>Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSearch} className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {searchQuery ? `Search results for "${searchQuery}"` : 'All Apartments'}
                </h1>
                <p className="text-muted-foreground">
                  {filteredApartments.length} properties found
                </p>
              </div>
            </div>

            {/* Results Grid */}
            <div className="space-y-4">
              {filteredApartments.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Search className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Try adjusting your search criteria or browse all apartments.
                    </p>
                    <Button asChild>
                      <Link to="/">Browse All Apartments</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredApartments.map((apartment) => (
                  <Card key={apartment.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-smooth">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative md:w-80 h-64 md:h-48">
                          <img 
                            src={apartment.images[0]} 
                            alt={apartment.title}
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Favorite Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-3 right-3 h-8 w-8 p-0 bg-background/80 hover:bg-background/90 backdrop-blur-sm rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(apartment.id);
                            }}
                          >
                            <Heart 
                              className={`h-4 w-4 ${favorites.includes(apartment.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
                            />
                          </Button>
                          
                          {/* Availability Badge */}
                          {apartment.availability && (
                            <Badge variant="default" className="absolute top-3 left-3 bg-success text-success-foreground">
                              Available
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex-1 p-6 space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <h3 className="text-xl font-semibold text-foreground">{apartment.title}</h3>
                              <div className="flex items-center text-muted-foreground">
                                <MapPin className="h-4 w-4 mr-1" />
                                {apartment.location}
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Users className="h-4 w-4" />
                                  <span>{apartment.maxGuests} guests</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 fill-accent text-accent" />
                                  <span className="font-medium">{apartment.rating}</span>
                                  <span>({apartment.reviews} reviews)</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-2xl font-bold text-foreground">${apartment.price}</div>
                              <div className="text-sm text-muted-foreground">per night</div>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground line-clamp-2">
                            {apartment.description}
                          </p>
                          
                          {/* Amenities */}
                          <div className="flex items-center space-x-4">
                            {apartment.amenities.slice(0, 3).map((amenity, index) => (
                              <div key={index} className="flex items-center space-x-1 text-sm text-muted-foreground">
                                {amenityIcons[amenity as keyof typeof amenityIcons] || <div className="h-3 w-3 rounded-full bg-muted" />}
                                <span className="capitalize">{amenity}</span>
                              </div>
                            ))}
                            {apartment.amenities.length > 3 && (
                              <span className="text-sm text-muted-foreground">+{apartment.amenities.length - 3} more</span>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">View Details</Button>
                            </div>
                            <Button 
                              onClick={() => setSelectedApartment(apartment)}
                              className="hover:bg-primary-hover"
                            >
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedApartment && (
        <BookingModal
          isOpen={!!selectedApartment}
          onClose={() => setSelectedApartment(null)}
          apartment={selectedApartment}
        />
      )}
    </div>
  );
};

export default SearchResults;
