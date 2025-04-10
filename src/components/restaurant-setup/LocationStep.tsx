
import { CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Building, Navigation, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface LocationStepProps {
  formData: {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    neighborhood?: string;
    district?: string;
    buildingName?: string;
    floor?: string;
    nearestBTS?: string;
    nearestMRT?: string;
  };
  updateFormData: (key: string, value: any) => void;
}

const LocationStep = ({ formData, updateFormData }: LocationStepProps) => {
  return (
    <>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-primary" />
          <CardTitle>Bangkok Location</CardTitle>
        </div>
        <CardDescription>
          Enter the location details for your restaurant in Bangkok
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-muted/30 rounded-lg border border-border shadow-sm">
          <p className="text-sm mb-2 font-medium">Bangkok Location Insights:</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• BTS/MRT proximity significantly impacts foot traffic</li>
            <li>• Different districts attract different customer demographics</li>
            <li>• Tourist areas vs. local neighborhoods have different peak hours</li>
            <li>• Mall locations vs. street-front have different visibility factors</li>
          </ul>
        </div>

        <div className="space-y-2">
          <Label htmlFor="district" className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            District
          </Label>
          <Select
            value={formData.district}
            onValueChange={(value) => updateFormData("district", value)}
          >
            <SelectTrigger id="district" className="shadow-sm">
              <SelectValue placeholder="Select Bangkok district" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="watthana">Watthana (Sukhumvit)</SelectItem>
              <SelectItem value="pathum-wan">Pathum Wan (Siam)</SelectItem>
              <SelectItem value="bang-rak">Bang Rak (Silom)</SelectItem>
              <SelectItem value="khlong-toei">Khlong Toei</SelectItem>
              <SelectItem value="phra-khanong">Phra Khanong</SelectItem>
              <SelectItem value="sathon">Sathon</SelectItem>
              <SelectItem value="phra-nakhon">Phra Nakhon (Old City)</SelectItem>
              <SelectItem value="chatuchak">Chatuchak</SelectItem>
              <SelectItem value="huai-khwang">Huai Khwang</SelectItem>
              <SelectItem value="ratchathewi">Ratchathewi</SelectItem>
              <SelectItem value="din-daeng">Din Daeng</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="buildingName" className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              Building/Mall Name
            </Label>
            <Input
              id="buildingName"
              placeholder="e.g., Terminal 21, EmQuartier"
              value={formData.buildingName}
              onChange={(e) => updateFormData("buildingName", e.target.value)}
              className="shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="floor">
              Floor/Unit Number
            </Label>
            <Input
              id="floor"
              placeholder="e.g., 4th Floor, Unit 401"
              value={formData.floor}
              onChange={(e) => updateFormData("floor", e.target.value)}
              className="shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="streetAddress" className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Street Address
          </Label>
          <Input
            id="streetAddress"
            placeholder="e.g., 123 Sukhumvit Rd, Soi 21"
            value={formData.streetAddress}
            onChange={(e) => updateFormData("streetAddress", e.target.value)}
            className="shadow-sm"
          />
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Navigation className="h-4 w-4 text-muted-foreground" />
            Public Transportation
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="nearestBTS" className="text-xs text-muted-foreground">
                Nearest BTS Station
              </Label>
              <Select
                value={formData.nearestBTS}
                onValueChange={(value) => updateFormData("nearestBTS", value)}
              >
                <SelectTrigger id="nearestBTS" className="shadow-sm">
                  <SelectValue placeholder="Select BTS station" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Not Applicable</SelectItem>
                  <SelectItem value="asok">Asok</SelectItem>
                  <SelectItem value="phrom-phong">Phrom Phong</SelectItem>
                  <SelectItem value="thong-lo">Thong Lo</SelectItem>
                  <SelectItem value="ekkamai">Ekkamai</SelectItem>
                  <SelectItem value="siam">Siam</SelectItem>
                  <SelectItem value="chit-lom">Chit Lom</SelectItem>
                  <SelectItem value="sala-daeng">Sala Daeng</SelectItem>
                  <SelectItem value="mo-chit">Mo Chit</SelectItem>
                  <SelectItem value="victory-monument">Victory Monument</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nearestMRT" className="text-xs text-muted-foreground">
                Nearest MRT Station
              </Label>
              <Select
                value={formData.nearestMRT}
                onValueChange={(value) => updateFormData("nearestMRT", value)}
              >
                <SelectTrigger id="nearestMRT" className="shadow-sm">
                  <SelectValue placeholder="Select MRT station" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Not Applicable</SelectItem>
                  <SelectItem value="sukhumvit">Sukhumvit</SelectItem>
                  <SelectItem value="silom">Silom</SelectItem>
                  <SelectItem value="lumphini">Lumphini</SelectItem>
                  <SelectItem value="chatuchak-park">Chatuchak Park</SelectItem>
                  <SelectItem value="huai-khwang">Huai Khwang</SelectItem>
                  <SelectItem value="thailand-cultural-centre">Thailand Cultural Centre</SelectItem>
                  <SelectItem value="sam-yan">Sam Yan</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode" className="flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            Postal Code
          </Label>
          <Input
            id="zipCode"
            placeholder="e.g., 10110"
            value={formData.zipCode}
            onChange={(e) => updateFormData("zipCode", e.target.value)}
            className="shadow-sm"
          />
        </div>

        <div className="hidden">
          <Input
            id="city"
            value="Bangkok"
            onChange={(e) => updateFormData("city", e.target.value)}
          />
          <Input
            id="state"
            value="Thailand"
            onChange={(e) => updateFormData("state", e.target.value)}
          />
        </div>
      </CardContent>
    </>
  );
};

export default LocationStep;
