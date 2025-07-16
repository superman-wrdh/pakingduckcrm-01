import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit,
  Save,
  X
} from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Sarah Chen",
    title: "Senior Packaging Designer",
    email: "sarah.chen@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "March 2023",
    avatar: "/api/placeholder/100/100",
    bio: "Passionate packaging designer with 8+ years of experience creating sustainable and innovative packaging solutions for leading brands."
  });

  const [editedProfile, setEditedProfile] = useState(userProfile);

  const handleEdit = () => {
    setEditedProfile(userProfile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* User Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback className="text-lg">
                {userProfile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              {!isEditing ? (
                <>
                  <div>
                    <h3 className="text-xl font-semibold">{userProfile.name}</h3>
                    <p className="text-muted-foreground">{userProfile.title}</p>
                  </div>
                  <p className="text-sm">{userProfile.bio}</p>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={editedProfile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={editedProfile.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={editedProfile.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Packaging Design</Badge>
                <Badge variant="secondary">Sustainable Materials</Badge>
                <Badge variant="secondary">Brand Development</Badge>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              {!isEditing ? (
                <span className="text-sm">{userProfile.email}</span>
              ) : (
                <Input
                  value={editedProfile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="text-sm"
                />
              )}
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              {!isEditing ? (
                <span className="text-sm">{userProfile.phone}</span>
              ) : (
                <Input
                  value={editedProfile.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="text-sm"
                />
              )}
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              {!isEditing ? (
                <span className="text-sm">{userProfile.location}</span>
              ) : (
                <Input
                  value={editedProfile.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="text-sm"
                />
              )}
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Joined {userProfile.joinDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;