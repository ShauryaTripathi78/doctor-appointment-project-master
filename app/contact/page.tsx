"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import toast from "react-hot-toast"
import { Activity, MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.")
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      setLoading(false)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

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
              <Link href="/about" className="text-gray-700 hover:text-blue-600">
                About
              </Link>
              <Link href="/contact" className="text-blue-600 font-medium">
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
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or need assistance? We're here to help. Get in touch with our support team and we'll respond
            as quickly as possible.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <Card className="text-center p-6">
              <CardContent>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-sm text-gray-500 mt-1">Mon-Fri 8AM-8PM</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-600">info@medicareplus.com</p>
                <p className="text-sm text-gray-500 mt-1">24/7 Support</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <MapPin className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Address</h3>
                <p className="text-gray-600">123 Healthcare Street</p>
                <p className="text-sm text-gray-500 mt-1">Medical City, MC 12345</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Hours</h3>
                <p className="text-gray-600">Mon-Fri: 8AM-8PM</p>
                <p className="text-sm text-gray-500 mt-1">Sat-Sun: 9AM-5PM</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours. For urgent medical matters, please
                call our emergency line.
              </p>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Form</CardTitle>
                  <CardDescription>We'd love to hear from you</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map and Additional Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Visit Our Office</h2>
              <p className="text-gray-600 mb-8">
                Our office is conveniently located in the heart of Medical City. We welcome walk-ins during business
                hours, but appointments are recommended.
              </p>

              {/* Map Placeholder */}
              <Card className="mb-8">
                <CardContent className="p-0">
                  <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Interactive Map</p>
                      <p className="text-sm text-gray-400">123 Healthcare Street, Medical City</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">How quickly will I get a response?</h4>
                    <p className="text-gray-600 text-sm">
                      We typically respond to all inquiries within 24 hours during business days.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Can I book appointments through this form?</h4>
                    <p className="text-gray-600 text-sm">
                      For appointment booking, please use our dedicated booking system or call our office directly.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Do you offer emergency services?</h4>
                    <p className="text-gray-600 text-sm">
                      For medical emergencies, please call 911. Our platform is for non-emergency appointments and
                      consultations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Don't wait to take control of your health. Book an appointment with one of our qualified doctors today.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" asChild className="px-8 py-3">
              <Link href="/book">Book Appointment</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/doctors">Browse Doctors</Link>
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
