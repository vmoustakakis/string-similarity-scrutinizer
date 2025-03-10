
import { StringComparison } from "@/components/StringComparison";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col px-4 py-8 bg-gradient-to-br from-slate-50 to-indigo-50">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-800 mb-2">String Similarity Scrutinizer</h1>
        <p className="text-slate-600 max-w-md mx-auto">
          Compare two strings and see the differences highlighted character by character
        </p>
      </header>
      
      <main className="flex-1 w-full max-w-5xl mx-auto">
        <StringComparison />
      </main>
      
      <footer className="mt-12 text-center text-sm text-slate-500">
        <p>Built with care for efficient string comparison</p>
      </footer>
    </div>
  );
};

export default Index;
