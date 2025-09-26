import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/contexts/UserContext';
import { useBooking } from '@/contexts/BookingContext';
import { 
  Home, 
  Calendar, 
  MapPin, 
  Star, 
  CreditCard, 
  User, 
  Phone, 
  Mail,
  LogOut,
  Plus
} from 'lucide-react';
import Header from '@/components/Header';

const Dashboard = () => {
  const { user, logout } = useUser();
  const { bookings } = useBooking();
  const [activeTab, setActiveTab] = useState('bookings');

  const userBookings = bookings.filter(booking => booking.userId === user?.id);
  const upcomingBookings = userBookings.filter(booking => 
    booking.status === 'confirmed' && new Date(booking.checkIn) > new Date()
  );
  const pastBookings = userBookings.filter(booking => 
    new Date(booking.checkOut) < new Date()
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'cancelled': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Please Sign In</CardTitle>
            <CardDescription>You need to be logged in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="flex space-x-4">
            <Button asChild className="flex-1">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link to="/register">Sign Up</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Profile */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-lg">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {user.isHost ? 'Host' : 'Guest'} • Joined {new Date(user.joinedDate).getFullYear()}
                    </p>
                  </div>

                  <div className="w-full space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="w-full pt-4 border-t space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <User className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    
                    {user.isHost && (
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link to="/host-dashboard">
                          <Home className="h-4 w-4 mr-2" />
                          Host Dashboard
                        </Link>
                      </Button>
                    )}
                    
                    <Button variant="ghost" size="sm" className="w-full text-destructive" onClick={logout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Bookings</span>
                  <span className="font-semibold">{userBookings.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Upcoming</span>
                  <span className="font-semibold text-primary">{upcomingBookings.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <span className="font-semibold text-success">{pastBookings.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <Button asChild>
                  <Link to="/">
                    <Plus className="h-4 w-4 mr-2" />
                    Book New Stay
                  </Link>
                </Button>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="bookings">All Bookings</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past Stays</TabsTrigger>
                </TabsList>

                <TabsContent value="bookings" className="space-y-4">
                  <div className="space-y-4">
                    {userBookings.length === 0 ? (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold text-foreground mb-2">No bookings yet</h3>
                          <p className="text-muted-foreground text-center mb-4">
                            Start exploring amazing apartments and make your first booking!
                          </p>
                          <Button asChild>
                            <Link to="/">Browse Apartments</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ) : (
                      userBookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} getStatusColor={getStatusColor} />
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="upcoming" className="space-y-4">
                  <div className="space-y-4">
                    {upcomingBookings.length === 0 ? (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold text-foreground mb-2">No upcoming bookings</h3>
                          <p className="text-muted-foreground text-center mb-4">
                            Plan your next adventure and book an amazing stay!
                          </p>
                          <Button asChild>
                            <Link to="/">Find Your Next Stay</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ) : (
                      upcomingBookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} getStatusColor={getStatusColor} />
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="past" className="space-y-4">
                  <div className="space-y-4">
                    {pastBookings.length === 0 ? (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <Home className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold text-foreground mb-2">No past stays</h3>
                          <p className="text-muted-foreground text-center">
                            Your completed bookings will appear here.
                          </p>
                        </CardContent>
                      </Card>
                    ) : (
                      pastBookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} getStatusColor={getStatusColor} />
                      ))
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingCard = ({ booking, getStatusColor }: { booking: any; getStatusColor: (status: string) => string }) => (
  <Card className="overflow-hidden">
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
                <MapPin className="h-3 w-3 mr-1" />
                {booking.apartment.location}
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
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3" />
                <span>{booking.apartment.rating}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 font-semibold text-foreground">
              <CreditCard className="h-3 w-3" />
              <span>${booking.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default Dashboard;