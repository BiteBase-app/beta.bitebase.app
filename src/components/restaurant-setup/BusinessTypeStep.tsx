
import { Store, UtensilsCrossed } from "lucide-react";
import { CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface BusinessTypeStepProps {
  businessType: string;
  setBusinessType: (type: string) => void;
}

const BusinessTypeStep = ({ businessType, setBusinessType }: BusinessTypeStepProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle>What type of restaurant are you setting up?</CardTitle>
        <CardDescription>
          Let us know if you're starting a new restaurant or have an existing one
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={businessType}
          onValueChange={setBusinessType}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <RadioGroupItem
              value="new"
              id="new"
              className="peer sr-only"
            />
            <Label
              htmlFor="new"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-muted/20 p-6 hover:bg-muted/30 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 [&:has([data-state=checked])]:border-primary cursor-pointer shadow-sm transition-all"
            >
              <UtensilsCrossed className="mb-3 h-10 w-10 text-primary" />
              <div className="text-center">
                <span className="text-lg font-medium">New Restaurant</span>
                <p className="text-sm text-muted-foreground mt-1">
                  I'm planning to open a new restaurant
                </p>
              </div>
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="existing"
              id="existing"
              className="peer sr-only"
            />
            <Label
              htmlFor="existing"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-muted/20 p-6 hover:bg-muted/30 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 [&:has([data-state=checked])]:border-primary cursor-pointer shadow-sm transition-all"
            >
              <Store className="mb-3 h-10 w-10 text-primary" />
              <div className="text-center">
                <span className="text-lg font-medium">Existing Restaurant</span>
                <p className="text-sm text-muted-foreground mt-1">
                  I already own a restaurant
                </p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </>
  );
};

export default BusinessTypeStep;
