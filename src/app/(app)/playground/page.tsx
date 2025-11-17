
import { Gamepad2 } from "lucide-react";
import CodePlayground from "@/components/playground/code-playground";

export default function PlaygroundPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Gamepad2 className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline">Playground Challenges</h1>
          <p className="text-muted-foreground">
            Write Python code to control the rocket and complete the challenges!
          </p>
        </div>
      </div>
      <CodePlayground />
    </div>
  );
}
