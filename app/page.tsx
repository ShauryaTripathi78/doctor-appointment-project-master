import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Star,
  Shield,
  Users,
  Heart,
  Stethoscope,
  Brain,
  Eye,
  Bone,
  Baby,
  Activity,
} from "lucide-react"

const topDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    experience: 15,
    rating: 4.9,
    reviews: 234,
    image: "/placeholder.svg?height=100&width=100",
    nextAvailable: "Today 2:00 PM",
    fee: "$150",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Neurologist",
    experience: 12,
    rating: 4.8,
    reviews: 189,
    image: "/placeholder.svg?height=100&width=100",
    nextAvailable: "Tomorrow 10:00 AM",
    fee: "$200",
  },
  {
    id: 3,
    name: "Dr. Emily Davis",
    specialization: "Pediatrician",
    experience: 10,
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=100&width=100",
    nextAvailable: "Today 4:30 PM",
    fee: "$120",
  },
]

const specialties = [
  { name: "Cardiology", icon: Heart, count: 24, color: "text-red-500" },
  { name: "Neurology", icon: Brain, count: 18, color: "text-purple-500" },
  { name: "Orthopedics", icon: Bone, count: 32, color: "text-blue-500" },
  { name: "Pediatrics", icon: Baby, count: 28, color: "text-green-500" },
  { name: "Ophthalmology", icon: Eye, count: 15, color: "text-yellow-500" },
  { name: "General Medicine", icon: Stethoscope, count: 45, color: "text-gray-500" },
]

const stats = [
  { label: "Verified Doctors", value: "500+", icon: Users },
  { label: "Happy Patients", value: "10,000+", icon: Heart },
  { label: "Appointments Booked", value: "25,000+", icon: Calendar },
  { label: "Years of Service", value: "15+", icon: Shield },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">MediCare+</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link href="/doctors" className="text-gray-700 hover:text-blue-600">
                Doctors
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Health, Our <span className="text-blue-600">Priority</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Book appointments with verified doctors, get expert medical advice, and manage your healthcare journey with
            ease.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4 p-2 bg-white rounded-2xl shadow-lg">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input placeholder="Search doctors, specialties..." className="pl-10 border-0 focus:ring-0 text-lg" />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input placeholder="Location" className="pl-10 border-0 focus:ring-0 text-lg" />
              </div>
              <Button size="lg" className="px-8">
                Search
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="px-8 py-3">
              <Link href="/book">Book Appointment</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="px-8 py-3 bg-transparent">
              <Link href="/doctors">Browse Doctors</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Medical Specialties</h2>
            <p className="text-xl text-gray-600">Find the right specialist for your needs</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {specialties.map((specialty, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 group-hover:scale-110 transition-transform ${specialty.color}`}
                  >
                    <specialty.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{specialty.name}</h3>
                  <p className="text-sm text-gray-600">{specialty.count} doctors</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Doctors Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Rated Doctors</h2>
              <p className="text-xl text-gray-600">Meet our most experienced and trusted doctors</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/doctors">View All Doctors</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {topDoctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{doctor.name}</h3>
                      <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                      <p className="text-sm text-gray-600">{doctor.experience} years experience</p>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-4">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold">{doctor.rating}</span>
                      <span className="ml-1 text-gray-600">({doctor.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-green-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{doctor.nextAvailable}</span>
                    </div>
                    <Badge variant="secondary">{doctor.fee}</Badge>
                  </div>

                  <Button className="w-full" asChild>
                    <Link href="/book">Book Appointment</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose MediCare+?</h2>
            <p className="text-xl text-gray-600">Experience healthcare like never before</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardContent>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Verified Doctors</h3>
                <p className="text-gray-600">
                  All our doctors are verified and licensed professionals with years of experience.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Easy Booking</h3>
                <p className="text-gray-600">
                  Book appointments instantly with our user-friendly platform. No waiting, no hassle.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">24/7 Support</h3>
                <p className="text-gray-600">Get round-the-clock support for all your healthcare needs and queries.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Take Control of Your Health?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied patients who trust MediCare+ for their healthcare needs.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" asChild className="px-8 py-3">
              <Link href="/register">Get Started Today</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">MediCare+</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted healthcare partner, providing quality medical services and connecting you with the best
                doctors.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/doctors" className="hover:text-white">
                    Find Doctors
                  </Link>
                </li>
                <li>
                  <Link href="/book" className="hover:text-white">
                    Book Appointment
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Specialties</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Cardiology</li>
                <li>Neurology</li>
                <li>Pediatrics</li>
                <li>Orthopedics</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📞 +1 (555) 123-4567</li>
                <li>✉️ info@medicareplus.com</li>
                <li>📍 123 Healthcare St, Medical City</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MediCare+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
