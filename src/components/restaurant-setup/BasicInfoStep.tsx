
import { CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InfoIcon, MapPin, Users, DollarSign } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

interface BasicInfoStepProps {
  formData: {
    restaurantName: string;
    conceptDescription: string;
    targetAudience: string;
    cuisineType?: string;
    priceRange?: string;
    neighborhood?: string;
    establishedYear?: string;
    isLocalBrand?: boolean;
  };
  updateFormData: (key: string, value: any) => void;
}

const BasicInfoStep = ({ formData, updateFormData }: BasicInfoStepProps) => {
  return (
    <>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <InfoIcon className="h-5 w-5 text-primary" />
          <CardTitle>Restaurant Information</CardTitle>
        </div>
        <CardDescription>
          Tell us about your restaurant in Bangkok
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="restaurantName">Restaurant Name</Label>
          <Input
            id="restaurantName"
            placeholder="Enter restaurant name"
            value={formData.restaurantName}
            onChange={(e) => updateFormData("restaurantName", e.target.value)}
            className="shadow-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="conceptDescription">Concept Description</Label>
          <Textarea
            id="conceptDescription"
            placeholder="Describe your restaurant concept"
            value={formData.conceptDescription}
            onChange={(e) => updateFormData("conceptDescription", e.target.value)}
            rows={3}
            className="shadow-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cuisineType" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            Cuisine Type
          </Label>
          <Select
            value={formData.cuisineType}
            onValueChange={(value) => updateFormData("cuisineType", value)}
          >
            <SelectTrigger className="shadow-sm">
              <SelectValue placeholder="Select cuisine type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thai">Thai</SelectItem>
              <SelectItem value="international-thai">International-Thai Fusion</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
              <SelectItem value="korean">Korean</SelectItem>
              <SelectItem value="italian">Italian</SelectItem>
              <SelectItem value="american">American</SelectItem>
              <SelectItem value="cafe">Café & Bakery</SelectItem>
              <SelectItem value="street-food">Street Food</SelectItem>
              <SelectItem value="seafood">Seafood</SelectItem>
              <SelectItem value="vegetarian">Vegetarian/Vegan</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="targetAudience" className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            Target Audience
          </Label>
          <Input
            id="targetAudience"
            placeholder="Who is your target customer? (e.g., tourists, office workers, families)"
            value={formData.targetAudience}
            onChange={(e) => updateFormData("targetAudience", e.target.value)}
            className="shadow-sm"
          />
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <Label htmlFor="neighborhood" className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Bangkok Neighborhood
          </Label>
          <Select
            value={formData.neighborhood}
            onValueChange={(value) => updateFormData("neighborhood", value)}
          >
            <SelectTrigger className="shadow-sm">
              <SelectValue placeholder="Select neighborhood" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sukhumvit">Sukhumvit</SelectItem>
              <SelectItem value="silom">Silom/Sathorn</SelectItem>
              <SelectItem value="siam">Siam/Ratchaprasong</SelectItem>
              <SelectItem value="chinatown">Chinatown/Yaowarat</SelectItem>
              <SelectItem value="rattanakosin">Rattanakosin/Old City</SelectItem>
              <SelectItem value="thonglor">Thonglor/Ekkamai</SelectItem>
              <SelectItem value="ari">Ari</SelectItem>
              <SelectItem value="chatuchak">Chatuchak/Ladprao</SelectItem>
              <SelectItem value="riverside">Riverside</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priceRange" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            Price Range
          </Label>
          <RadioGroup
            value={formData.priceRange}
            onValueChange={(value) => updateFormData("priceRange", value)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="budget" id="budget" />
              <Label htmlFor="budget">฿ Budget</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="moderate" id="moderate" />
              <Label htmlFor="moderate">฿฿ Moderate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="upscale" id="upscale" />
              <Label htmlFor="upscale">฿฿฿ Upscale</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="luxury" id="luxury" />
              <Label htmlFor="luxury">฿฿฿฿ Luxury</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="isLocalBrand" className="flex items-center gap-2">
            Brand Type
          </Label>
          <RadioGroup
            value={formData.isLocalBrand ? "local" : "international"}
            onValueChange={(value) => updateFormData("isLocalBrand", value === "local")}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="local" id="local" />
              <Label htmlFor="local">Local Thai Brand</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="international" id="international" />
              <Label htmlFor="international">International Brand</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </>
  );
};

export default BasicInfoStep;
