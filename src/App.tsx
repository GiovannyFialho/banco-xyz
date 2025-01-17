import { Button } from "@/components/ui/button";

export function App() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col gap-1">
        <h1 className="text-6xl font-bold">Hello World</h1>
        <Button type="button">Botão do Shadcn/UI</Button>
      </div>
    </div>
  );
}
