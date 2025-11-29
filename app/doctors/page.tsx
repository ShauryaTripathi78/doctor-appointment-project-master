"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Activity, Search, MapPin, Star, Clock, Filter } from "lucide-react"

const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    experience: 15,
    rating: 4.9,
    reviews: 234,
    image: "/placeholder.svg?height=150&width=150",
    nextAvailable: "Today 2:00 PM",
    fee: "$150",
    location: "Downtown Medical Center",
    education: "Harvard Medical School",
    languages: ["English", "Spanish"],
    about: "Specialized in interventional cardiology with expertise in complex cardiac procedures.",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Neurologist",
    experience: 12,
    rating: 4.8,
    reviews: 189,
    image: "/placeholder.svg?height=150&width=150",
    nextAvailable: "Tomorrow 10:00 AM",
    fee: "$200",
    location: "Neuroscience Institute",
    education: "Johns Hopkins University",
    languages: ["English", "Mandarin"],
    about: "Expert in treating neurological disorders including epilepsy and movement disorders.",
  },
  {
    id: 3,
    name: "Dr. Emily Davis",
    specialization: "Pediatrician",
    experience: 10,
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=150&width=150",
    nextAvailable: "Today 4:30 PM",
    fee: "$120",
    location: "Children's Hospital",
    education: "Stanford Medical School",
    languages: ["English", "French"],
    about: "Dedicated to providing comprehensive care for children from infancy through adolescence.",
  },
  {
    id: 4,
    name: "Dr. Robert Wilson",
    specialization: "Orthopedic Surgeon",
    experience: 18,
    rating: 4.7,
    reviews: 298,
    image: "/placeholder.svg?height=150&width=150",
    nextAvailable: "Monday 9:00 AM",
    fee: "$250",
    location: "Orthopedic Center",
    education: "Mayo Clinic",
    languages: ["English"],
    about: "Specializes in joint replacement surgery and sports medicine injuries.",
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    specialization: "Ophthalmologist",
    experience: 14,
    rating: 4.8,
    reviews: 167,
    image: "/placeholder.svg?height=150&width=150",
    nextAvailable: "Wednesday 11:00 AM",
    fee: "$180",
    location: "Eye Care Center",
    education: "UCLA Medical School",
    languages: ["English", "Portuguese"],
    about: "Expert in cataract surgery and retinal diseases with advanced laser techniques.",
  },
  {
    id: 6,
    name: "Dr. James Rodriguez",
    specialization: "General Medicine",
    experience: 8,
    rating: 4.6,
    reviews: 143,
    image: "/placeholder.svg?height=150&width=150",
    nextAvailable: "Today 3:00 PM",
    fee: "$100",
    location: "Family Health Clinic",
    education: "University of Miami",
    languages: ["English", "Spanish"],
    about: "Provides comprehensive primary care for adults and preventive medicine.",
  },
]

const specialties = [
  { name: "All Specialties", value: "all" },
  { name: "Cardiology", value: "cardiologist" },
  { name: "Neurology", value: "neurologist" },
  { name: "Pediatrics", value: "pediatrician" },
  { name: "Orthopedics", value: "orthopedic surgeon" },
  { name: "Ophthalmology", value: "ophthalmologist" },
  { name: "General Medicine", value: "general medicine" },
]

export default function Doctors() {
  const [doctors, setDoctors] = useState(mockDoctors)
  const [filteredDoctors, setFilteredDoctors] = useState(mockDoctors)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [sortBy, setSortBy] = useState("rating")

  useEffect(() => {
    let filtered = doctors

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by specialty
    if (selectedSpecialty !== "all") {
      filtered = filtered.filter((doctor) => doctor.specialization.toLowerCase() === selectedSpecialty)
    }

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "experience":
          return b.experience - a.experience
        case "fee":
          return Number.parseInt(a.fee.replace("$", "")) - Number.parseInt(b.fee.replace("$", ""))
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredDoctors(filtered)
  }, [searchTerm, selectedSpecialty, sortBy, doctors])

  return (
    <div className="min-h-screen bg-gray-50">
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
              <Link href="/doctors" className="text-blue-600 font-medium">
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
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Doctor</h1>
          <p className="text-xl text-gray-600 mb-8">Browse through our network of verified healthcare professionals</p>

          {/* Search and Filter Bar */}
          <div className="max-w-4xl mx-auto">
            <Card className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search doctors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty.value} value={specialty.value}>
                        {specialty.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                    <SelectItem value="fee">Lowest Fee</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{filteredDoctors.length} Doctors Found</h2>
            <div className="text-gray-600">
              Showing results for {selectedSpecialty === "all" ? "all specialties" : selectedSpecialty}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-xl transition-shadow overflow-hidden">
                <CardContent className="p-0">
                  {/* Doctor Image and Basic Info */}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={doctor.image || "/placeholder.svg"}
                        alt={doctor.name}
                        className="w-20 h-20 rounded-full object-cover mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900">{doctor.name}</h3>
                        <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                        <p className="text-sm text-gray-600">{doctor.experience} years experience</p>
                      </div>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center mb-4">
                      <div className="flex items-center mr-4">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-semibold">{doctor.rating}</span>
                        <span className="ml-1 text-gray-600">({doctor.reviews} reviews)</span>
                      </div>
                    </div>

                    {/* Location and Education */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{doctor.location}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Education:</strong> {doctor.education}
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {doctor.languages.map((language, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {language}
                        </Badge>
                      ))}
                    </div>

                    {/* About */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{doctor.about}</p>

                    {/* Availability and Fee */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-green-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{doctor.nextAvailable}</span>
                      </div>
                      <Badge variant="outline" className="text-lg font-semibold">
                        {doctor.fee}
                      </Badge>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button className="flex-1" asChild>
                        <Link href="/book">Book Appointment</Link>
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all doctors</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedSpecialty("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Book Your Appointment?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of patients who trust MediCare+ for their healthcare needs.
          </p>
          <Button size="lg" variant="secondary" asChild className="px-8 py-3">
            <Link href="/register">Get Started Today</Link>
          </Button>
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
              <p className="text-gray-400">Your trusted healthcare partner.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/doctors" className="hover:text-white">
                    Doctors
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
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
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📞 +1 (555) 123-4567</li>
                <li>✉️ info@medicareplus.com</li>
                <li>📍 123 Healthcare St</li>
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
