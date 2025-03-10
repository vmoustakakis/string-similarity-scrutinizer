
import { StringComparison } from "@/components/StringComparison";
import { URLConverter } from "@/components/URLConverter";
import { JSONFormatter } from "@/components/JSONFormatter";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col px-4 py-8 bg-gradient-to-br from-slate-50 to-indigo-50">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-800 mb-2">String Tools</h1>
        <p className="text-slate-600 max-w-md mx-auto">
          Compare strings, convert URLs, and format JSON all in one place
        </p>
      </header>
      
      <main className="flex-1 w-full max-w-6xl mx-auto">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-6">String Comparison</h2>
          <StringComparison />
        </section>
        
        <Separator className="my-8" />
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-6">URL Encoding/Decoding</h2>
          <URLConverter />
        </section>
        
        <Separator className="my-8" />
        
        <section>
          <h2 className="text-2xl font-semibold text-indigo-700 mb-6">JSON Formatter</h2>
          <JSONFormatter />
        </section>
      </main>
      
      <footer className="mt-12 text-center text-sm text-slate-500">
        <p>Built with care for efficient string operations</p>
      </footer>
    </div>
  );
};

export default Index;
