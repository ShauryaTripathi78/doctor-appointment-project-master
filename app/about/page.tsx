import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Activity, Users, Heart, Shield, Award, MapPin, Phone, Mail } from "lucide-react"

const teamMembers = [
  {
    name: "Dr. James Wilson",
    role: "Chief Medical Officer",
    image: "/placeholder.svg?height=200&width=200",
    description: "Leading healthcare innovation with 20+ years of experience in medical administration.",
  },
  {
    name: "Sarah Mitchell",
    role: "Head of Operations",
    image: "/placeholder.svg?height=200&width=200",
    description: "Ensuring seamless healthcare delivery and patient satisfaction across all touchpoints.",
  },
  {
    name: "Dr. Michael Rodriguez",
    role: "Director of Quality Assurance",
    image: "/placeholder.svg?height=200&width=200",
    description: "Maintaining the highest standards of medical care and patient safety protocols.",
  },
]

const values = [
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description: "Every decision we make is guided by what's best for our patients' health and wellbeing.",
  },
  {
    icon: Shield,
    title: "Trust & Integrity",
    description: "We maintain the highest ethical standards and build lasting relationships based on trust.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from medical care to customer service.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in the power of teamwork between patients, doctors, and healthcare professionals.",
  },
]

export default function About() {
  return (
    <div className="min-h-screen bg-white">
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
              <Link href="/about" className="text-blue-600 font-medium">
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
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About MediCare+</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing healthcare by making quality medical care accessible, convenient, and
            patient-centered. Our mission is to connect patients with the right doctors at the right time.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardContent>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To democratize healthcare by providing a seamless platform that connects patients with qualified
                  healthcare professionals, making quality medical care accessible to everyone, everywhere.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To become the world's most trusted healthcare platform, where patients can easily find, connect with,
                  and receive care from the best medical professionals in their area.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Story</h2>
            <div className="text-lg text-gray-600 leading-relaxed space-y-6">
              <p>
                MediCare+ was founded in 2020 with a simple yet powerful vision: to make healthcare more accessible and
                convenient for everyone. Our founders, experienced healthcare professionals and technology experts,
                recognized the challenges patients face when trying to find and book appointments with qualified
                doctors.
              </p>
              <p>
                What started as a small team of passionate individuals has grown into a comprehensive healthcare
                platform serving thousands of patients and hundreds of healthcare providers. We've facilitated over
                25,000 appointments and continue to expand our network of verified medical professionals.
              </p>
              <p>
                Today, MediCare+ stands as a testament to the power of technology in improving healthcare delivery,
                making it easier for patients to get the care they need when they need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600">Experienced professionals dedicated to your health</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600">{member.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Numbers that reflect our commitment to healthcare</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Verified Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
              <div className="text-gray-600">Happy Patients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">25,000+</div>
              <div className="text-gray-600">Appointments Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600">Medical Specialties</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Healthcare Community</h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the future of healthcare with MediCare+. Book your first appointment today.
          </p>
          <Button size="lg" variant="secondary" asChild className="px-8 py-3">
            <Link href="/register">Get Started</Link>
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
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Online Consultations</li>
                <li>Appointment Booking</li>
                <li>Health Records</li>
                <li>Prescription Management</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" /> +1 (555) 123-4567
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" /> info@medicareplus.com
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" /> 123 Healthcare St
                </li>
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
