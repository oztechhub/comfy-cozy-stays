import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/contexts/UserContext';
import { useBooking } from '@/contexts/BookingContext';
import { 
  Home, 
  Calendar, 
  MapPin, 
  Star, 
  DollarSign, 
  Users, 
  Plus,
  MoreHorizontal,
  TrendingUp,
  Eye,
  Edit
} from 'lucide-react';
import Header from '@/components/Header';

const HostDashboard = () => {
  const { user } = useUser();
  const { apartments, bookings } = useBooking();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user || !user.isHost) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You need to be a registered host to access this page</CardDescription>
          </CardHeader>
          <CardContent className="flex space-x-4">
            <Button asChild className="flex-1">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link to="/">Browse Apartments</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const hostApartments = apartments.filter(apt => apt.hostId === user.id);
  const hostBookings = bookings.filter(booking => 
    hostApartments.some(apt => apt.id === booking.apartmentId)
  );
  
  const totalRevenue = hostBookings
    .filter(booking => booking.status === 'confirmed')
    .reduce((sum, booking) => sum + booking.totalPrice, 0);
  
  const averageRating = hostApartments.length > 0 
    ? hostApartments.reduce((sum, apt) => sum + apt.rating, 0) / hostApartments.length
    : 0;

  const upcomingBookings = hostBookings.filter(booking => 
    booking.status === 'confirmed' && new Date(booking.checkIn) > new Date()
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'cancelled': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Host Dashboard</h1>
              <p className="text-muted-foreground">Manage your properties and bookings</p>
            </div>
            <Button asChild>
              <Link to="/add-property">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{hostApartments.length}</div>
                <p className="text-xs text-muted-foreground">
                  {hostApartments.filter(apt => apt.availability).length} available
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{hostBookings.length}</div>
                <p className="text-xs text-muted-foreground">
                  {upcomingBookings.length} upcoming
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-success">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  From confirmed bookings
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">
                  Across all properties
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>Latest reservation activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {hostBookings.slice(0, 5).map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{booking.apartment.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                            <span className="text-sm font-medium">${booking.totalPrice}</span>
                          </div>
                        </div>
                      ))}
                      {hostBookings.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No bookings yet
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Performing Properties */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Properties</CardTitle>
                    <CardDescription>Your best performing listings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {hostApartments
                        .sort((a, b) => b.rating - a.rating)
                        .slice(0, 3)
                        .map((apartment) => (
                          <div key={apartment.id} className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">{apartment.title}</p>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3 mr-1" />
                                {apartment.location}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center text-sm">
                                <Star className="h-3 w-3 fill-accent text-accent mr-1" />
                                {apartment.rating}
                              </div>
                              <span className="text-sm font-medium">${apartment.price}/night</span>
                            </div>
                          </div>
                        ))}
                      {hostApartments.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No properties yet
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="properties" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hostApartments.map((apartment) => (
                  <Card key={apartment.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <img 
                        src={apartment.images[0]} 
                        alt={apartment.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge 
                        className={`absolute top-3 left-3 ${apartment.availability ? 'bg-success' : 'bg-destructive'}`}
                      >
                        {apartment.availability ? 'Available' : 'Unavailable'}
                      </Badge>
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold text-foreground line-clamp-1">{apartment.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {apartment.location}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-sm">
                          <Star className="h-3 w-3 fill-accent text-accent" />
                          <span className="font-medium">{apartment.rating}</span>
                          <span className="text-muted-foreground">({apartment.reviews})</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-foreground">${apartment.price}</span>
                          <span className="text-sm text-muted-foreground">/night</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {hostApartments.length === 0 && (
                  <Card className="col-span-full">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Home className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No properties yet</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        Start earning by listing your first property on StayFinder!
                      </p>
                      <Button asChild>
                        <Link to="/add-property">Add Your First Property</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-4">
              <div className="space-y-4">
                {hostBookings.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No bookings yet</h3>
                      <p className="text-muted-foreground text-center">
                        Bookings for your properties will appear here once guests start booking.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  hostBookings.map((booking) => (
                    <Card key={booking.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex">
                          <img 
                            src={booking.apartment.images[0]} 
                            alt={booking.apartment.title}
                            className="w-32 h-32 object-cover"
                          />
                          <div className="flex-1 p-4 space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-foreground line-clamp-1">{booking.apartment.title}</h3>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                  <Users className="h-3 w-3 mr-1" />
                                  {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                                </div>
                              </div>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-4 text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1 font-semibold text-foreground">
                                <DollarSign className="h-3 w-3" />
                                <span>${booking.totalPrice}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;