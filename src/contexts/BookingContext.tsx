import { createContext, useContext, useState, ReactNode } from 'react';

export interface Apartment {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  amenities: string[];
  availability: boolean;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  description: string;
  hostId: string;
  hostName: string;
}

export interface Booking {
  id: string;
  apartmentId: string;
  apartment: Apartment;
  userId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface BookingContextType {
  apartments: Apartment[];
  bookings: Booking[];
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  cancelBooking: (bookingId: string) => void;
  searchApartments: (query: string, location?: string, minPrice?: number, maxPrice?: number) => Apartment[];
  getApartmentById: (id: string) => Apartment | undefined;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Mock apartment data with extended details
const mockApartments: Apartment[] = [
  {
    id: "1",
    title: "Modern Downtown Loft",
    location: "Manhattan, New York",
    price: 180,
    rating: 4.8,
    reviews: 124,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600"
    ],
    amenities: ["wifi", "parking", "coffee"],
    availability: true,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    description: "A stunning modern loft in the heart of Manhattan with floor-to-ceiling windows, exposed brick walls, and a fully equipped kitchen. Perfect for business travelers or couples seeking luxury in the city.",
    hostId: "host1",
    hostName: "Sarah Johnson"
  },
  {
    id: "2",
    title: "Cozy Studio in Historic District",
    location: "Brooklyn, New York", 
    price: 120,
    rating: 4.6,
    reviews: 89,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600"
    ],
    amenities: ["wifi", "coffee"],
    availability: true,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: "Charming studio apartment located in Brooklyn's historic district. Features original hardwood floors, vintage fixtures, and modern amenities. Walking distance to subway and local cafes.",
    hostId: "host2",
    hostName: "Michael Chen"
  },
  {
    id: "3",
    title: "Luxury Penthouse Suite",
    location: "Midtown, New York",
    price: 350,
    rating: 4.9,
    reviews: 203,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600"
    ],
    amenities: ["wifi", "parking", "coffee"],
    availability: false,
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    description: "Ultra-luxury penthouse with panoramic city views, private terrace, premium furnishings, and concierge service. The epitome of Manhattan living with world-class amenities.",
    hostId: "host3",
    hostName: "Emma Rodriguez"
  },
  {
    id: "4",
    title: "Charming Garden Apartment",
    location: "Queens, New York",
    price: 95,
    rating: 4.4,
    reviews: 67,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600"
    ],
    amenities: ["wifi", "parking"],
    availability: true,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    description: "Peaceful garden apartment with private outdoor space, natural light, and quiet neighborhood setting. Perfect for families or groups seeking comfort and tranquility.",
    hostId: "host4",
    hostName: "David Park"
  },
  {
    id: "5",
    title: "Sleek Business District Flat",
    location: "Financial District, New York",
    price: 200,
    rating: 4.7,
    reviews: 156,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600"
    ],
    amenities: ["wifi", "coffee"],
    availability: true,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    description: "Contemporary apartment designed for business professionals. Located steps from Wall Street with modern furnishings, high-speed internet, and premium amenities.",
    hostId: "host5",
    hostName: "Lisa Thompson"
  },
  {
    id: "6",
    title: "Artist's Creative Space",
    location: "Williamsburg, Brooklyn",
    price: 140,
    rating: 4.5,
    reviews: 92,
    images: [
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600"
    ],
    amenities: ["wifi"],
    availability: true,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 3,
    description: "Unique artist's loft in trendy Williamsburg with creative atmosphere, natural light, and proximity to galleries, restaurants, and nightlife. Perfect for creative minds.",
    hostId: "host6",
    hostName: "Alex Rivera"
  }
];

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [apartments] = useState<Apartment[]>(mockApartments);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const createBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setBookings(prev => [...prev, newBooking]);
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' as const }
          : booking
      )
    );
  };

  const searchApartments = (query: string, location?: string, minPrice?: number, maxPrice?: number) => {
    return apartments.filter(apartment => {
      const matchesQuery = apartment.title.toLowerCase().includes(query.toLowerCase()) ||
                          apartment.location.toLowerCase().includes(query.toLowerCase());
      const matchesLocation = !location || apartment.location.toLowerCase().includes(location.toLowerCase());
      const matchesPrice = (!minPrice || apartment.price >= minPrice) && 
                          (!maxPrice || apartment.price <= maxPrice);
      
      return matchesQuery && matchesLocation && matchesPrice && apartment.availability;
    });
  };

  const getApartmentById = (id: string) => {
    return apartments.find(apartment => apartment.id === id);
  };

  return (
    <BookingContext.Provider value={{
      apartments,
      bookings,
      createBooking,
      cancelBooking,
      searchApartments,
      getApartmentById
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};