
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight } from "lucide-react";

// Define form schema for basic restaurant info
export const restaurantInfoSchema = z.object({
  name: z.string().min(2, "Restaurant name must be at least 2 characters"),
  location: z.string().min(5, "Please enter a valid address"),
  cuisine: z.string().min(2, "Please specify the cuisine type"),
  isNew: z.boolean(),
});

export type RestaurantInfoFormValues = z.infer<typeof restaurantInfoSchema>;

interface RestaurantInfoFormProps {
  onSubmit: (data: RestaurantInfoFormValues) => void;
}

const RestaurantInfoForm = ({ onSubmit }: RestaurantInfoFormProps) => {
  const form = useForm<RestaurantInfoFormValues>({
    resolver: zodResolver(restaurantInfoSchema),
    defaultValues: {
      name: "",
      location: "",
      cuisine: "",
      isNew: true,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Restaurant Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter restaurant name" {...field} />
              </FormControl>
              <FormDescription>
                The name of your restaurant as it will appear to customers.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location/Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter address" {...field} />
              </FormControl>
              <FormDescription>
                The physical address or location of your restaurant.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cuisine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuisine Type</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Italian, Chinese, Fusion" {...field} />
              </FormControl>
              <FormDescription>
                The primary type of cuisine your restaurant serves.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isNew"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>New Restaurant</FormLabel>
                <FormDescription>
                  Check this if your restaurant is not yet operational.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Save and Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
};

export default RestaurantInfoForm;
