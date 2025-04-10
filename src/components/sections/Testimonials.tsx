
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    content:
      "BiteBaseAI helped us identify the perfect location for our new bistro. The demographic analysis and foot traffic data were spot on. We're now operating at 85% capacity in our first quarter!",
    author: {
      name: "Emma Rodriguez",
      role: "Owner, Bistro Nouveau",
      image: "https://i.pravatar.cc/150?img=1",
    },
  },
  {
    content:
      "The market research provided by BiteBaseAI gave us confidence to pivot our menu offerings. Their trend analysis showed growing demand for plant-based options, which now account for 40% of our sales.",
    author: {
      name: "Michael Chen",
      role: "Executive Chef, Green Table",
      image: "https://i.pravatar.cc/150?img=2",
    },
  },
  {
    content:
      "As a restaurant consultant, I've tried numerous analytics tools. BiteBaseAI stands out for its comprehensive approach and actionable insights. It's now an essential part of my toolkit for every client.",
    author: {
      name: "Sarah Johnson",
      role: "F&B Consultant",
      image: "https://i.pravatar.cc/150?img=3",
    },
  },
  {
    content:
      "We were struggling to understand why our third location wasn't performing as well as the others. BiteBaseAI's analysis identified key demographic differences we had missed. After adjusting our strategy, we're now profitable.",
    author: {
      name: "David Williams",
      role: "Director, Urban Eats Group",
      image: "https://i.pravatar.cc/150?img=4",
    },
  },
];

export function Testimonials() {
  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-bite-600">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by restaurant owners worldwide
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            See how BiteBaseAI is helping restaurant entrepreneurs make data-driven decisions and achieve success.
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col justify-between shadow-sm">
              <CardContent className="p-6">
                <p className="text-foreground leading-7 mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={testimonial.author.image} alt={testimonial.author.name} />
                    <AvatarFallback>{testimonial.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{testimonial.author.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.author.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
