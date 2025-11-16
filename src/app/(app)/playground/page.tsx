
import { Gamepad2 } from "lucide-react";
import CodePlayground from "@/components/playground/code-playground";

export default function PlaygroundPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Gamepad2 className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline">Code Playground</h1>
          <p className="text-muted-foreground">
            Write Python code to control the character on the canvas. Try giving it commands!
          </p>
        </div>
      </div>
      <CodePlayground />
    </div>
  );
}
