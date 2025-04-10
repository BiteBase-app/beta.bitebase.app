import { SimpleLayout } from "@/components/SimpleLayout";
import VercelBiteBaseAI from "@/components/VercelBiteBaseAI";

export default function VercelBiteBaseAIPage() {
  return (
    <SimpleLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">BiteBase AI Assistant</h1>
        <p className="text-muted-foreground mb-8">
          Ask questions about restaurant market research, location analysis, competitive analysis, and business strategy.
        </p>
        <div className="max-w-3xl mx-auto">
          <VercelBiteBaseAI />
        </div>
      </div>
    </SimpleLayout>
  );
}
