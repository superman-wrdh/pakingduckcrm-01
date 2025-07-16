import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Share2, Eye, Trash2, Pin, Search } from "lucide-react";

const Community = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [designs, setDesigns] = useState([
    {
      id: 1,
      title: "Minimalist Coffee Package",
      designer: "Sarah Chen",
      avatar: "SC",
      likes: 234,
      comments: 12,
      views: 1200,
      description: "Clean and modern coffee packaging with sustainable materials",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
      tags: ["Coffee", "Minimalist", "Sustainable"],
      isPinned: false
    },
    {
      id: 2,
      title: "Luxury Cosmetics Line",
      designer: "Alex Rodriguez",
      avatar: "AR",
      likes: 456,
      comments: 28,
      views: 2100,
      description: "Premium cosmetics packaging featuring gold foil accents and elegant typography. The design emphasizes luxury and sophistication.",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=600&fit=crop",
      tags: ["Cosmetics", "Luxury", "Gold Foil"],
      isPinned: true
    },
    {
      id: 3,
      title: "Organic Food Series",
      designer: "Emma Wilson",
      avatar: "EW",
      likes: 189,
      comments: 8,
      views: 890,
      description: "Natural and organic food packaging",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
      tags: ["Organic", "Food"],
      isPinned: false
    },
    {
      id: 4,
      title: "Tech Product Unboxing Experience",
      designer: "David Kim",
      avatar: "DK",
      likes: 789,
      comments: 45,
      views: 3400,
      description: "Innovative tech packaging that creates an unforgettable unboxing experience with interactive elements",
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=400&fit=crop",
      tags: ["Tech", "Interactive", "Experience"],
      isPinned: false
    },
    {
      id: 5,
      title: "Artisan Chocolate Collection",
      designer: "Maria Santos",
      avatar: "MS",
      likes: 312,
      comments: 19,
      views: 1650,
      description: "Handcrafted chocolate packaging with artistic illustrations",
      image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=400&fit=crop",
      tags: ["Chocolate", "Artisan", "Illustration"],
      isPinned: false
    },
    {
      id: 6,
      title: "Sustainable Wine Labels",
      designer: "James Thompson",
      avatar: "JT",
      likes: 567,
      comments: 34,
      views: 2300,
      description: "Eco-friendly wine packaging using recycled paper and natural inks. The design reflects the vineyard's commitment to sustainability.",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=300&h=500&fit=crop",
      tags: ["Wine", "Sustainable", "Natural"],
      isPinned: false
    },
    {
      id: 7,
      title: "Kids Toy Packaging",
      designer: "Lisa Park",
      avatar: "LP",
      likes: 445,
      comments: 22,
      views: 1800,
      description: "Playful and colorful toy packaging",
      image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&h=200&fit=crop",
      tags: ["Toys", "Kids", "Colorful"],
      isPinned: false
    },
    {
      id: 8,
      title: "Premium Tea Ceremony Set",
      designer: "Yuki Tanaka",
      avatar: "YT",
      likes: 678,
      comments: 41,
      views: 2850,
      description: "Traditional Japanese tea packaging with modern minimalist approach. Each element tells a story of craftsmanship and tradition.",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=600&fit=crop",
      tags: ["Tea", "Japanese", "Traditional", "Minimalist"],
      isPinned: true
    }
  ]);

  const handleDelete = (id: number) => {
    setDesigns(designs.filter(design => design.id !== id));
  };

  const handlePin = (id: number) => {
    setDesigns(designs.map(design => 
      design.id === id 
        ? { ...design, isPinned: !design.isPinned }
        : design
    ));
  };

  const filteredDesigns = designs.filter(design =>
    design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    design.designer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    design.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    design.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedDesigns = filteredDesigns.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <main className="flex-1 p-6 bg-background overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Design Community</h1>
          <p className="text-muted-foreground mb-6">
            Discover inspiring packaging designs from our creative community. Share your work, get feedback, and find inspiration for your next project.
          </p>
          
          {/* Search Box */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search designs, designers, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Design List */}
        <div className="space-y-4">
          {sortedDesigns.map((design) => (
            <Card 
              key={design.id} 
              className={`bg-card border hover:shadow-md transition-all duration-300 ${
                design.isPinned ? 'border-primary bg-primary/5' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                    <img 
                      src={design.image} 
                      alt={design.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground text-lg">{design.title}</h3>
                        {design.isPinned && (
                          <Pin className="h-4 w-4 text-primary fill-current" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePin(design.id)}
                          className={design.isPinned ? 'bg-primary/10 border-primary' : ''}
                        >
                          <Pin className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(design.id)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {design.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-foreground font-medium">{design.designer}</span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {design.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {design.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{design.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{design.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{design.views}</span>
                        </div>
                      </div>
                      <Share2 className="h-4 w-4 cursor-pointer hover:text-foreground transition-colors" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upload Section */}
        <div className="mt-12 bg-muted/50 border rounded-lg p-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">Share Your Design</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Have a packaging design you're proud of? Share it with the community and get valuable feedback from fellow designers and packaging experts.
          </p>
          <Button>
            Upload Design
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Community;