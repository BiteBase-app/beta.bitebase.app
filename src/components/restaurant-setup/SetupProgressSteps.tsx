
import { CheckIcon } from "lucide-react";

interface Step {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface SetupProgressStepsProps {
  steps: Step[];
  currentStep: number;
}

const SetupProgressSteps = ({ steps, currentStep }: SetupProgressStepsProps) => {
  return (
    <div className="relative mb-16">
      {/* Progress line */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-0.5 bg-muted" />
      </div>

      {/* Mobile view - vertical steps */}
      <div className="md:hidden">
        <ol className="relative flex flex-col space-y-4 px-4">
          {steps.map((step, index) => (
            <li key={step.id} className="flex items-center gap-4">
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border shadow-sm text-center ${
                  index <= currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted bg-background text-muted-foreground"
                }`}
              >
                {index < currentStep ? (
                  <CheckIcon className="h-4 w-4" />
                ) : step.icon ? (
                  step.icon
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              <span
                className={`text-sm ${
                  index <= currentStep ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {step.name}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Desktop view - horizontal steps */}
      <ol className="relative hidden md:flex justify-between text-sm max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <li key={step.id} className="flex flex-col items-center">
            <div
              className={`relative flex h-10 w-10 items-center justify-center rounded-full border shadow-sm text-center ${
                index <= currentStep
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted bg-background text-muted-foreground"
              }`}
            >
              {index < currentStep ? (
                <CheckIcon className="h-5 w-5" />
              ) : step.icon ? (
                step.icon
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div className="h-14 relative w-20">
              <span
                className={`absolute top-2 left-1/2 -translate-x-1/2 text-center text-xs w-full line-clamp-2 ${
                  index <= currentStep ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {step.name}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default SetupProgressSteps;
