import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { 
  Palette, 
  Zap, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Star
} from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  // Redirect to dashboard if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const features = [
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Professional Design",
      description: "Work with experienced designers to bring your vision to life"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Turnaround",
      description: "Get your projects completed on time with our efficient workflow"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaborative Process",
      description: "Stay involved throughout the design process with real-time updates"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Quality Assured",
      description: "Every project goes through our rigorous quality control process"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      rating: 5,
      comment: "The team delivered exceptional work on our brand redesign. Highly recommended!"
    },
    {
      name: "Mike Chen",
      company: "Creative Agency",
      rating: 5,
      comment: "Professional service and amazing results. They understood our vision perfectly."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">DesignPortal</span>
          </div>
          <div className="flex gap-3">
            <Link to="/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <Badge className="mb-4">Trusted by 1000+ Companies</Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Transform Your Ideas Into
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {" "}Stunning Designs
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with professional designers, manage your projects seamlessly, 
            and bring your creative vision to life with our comprehensive design platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/signup">
              <Button size="lg" className="min-w-[200px]">
                Start Your Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/signin">
              <Button size="lg" variant="outline" className="min-w-[200px]">
                Client Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to manage your design projects efficiently
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-6 py-20 bg-muted/30 rounded-3xl mx-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground">
            Don't just take our word for it
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of satisfied clients and start your design journey today
          </p>
          <Link to="/signup">
            <Button size="lg" className="min-w-[200px]">
              Create Your Account
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <Palette className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">DesignPortal</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 DesignPortal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
