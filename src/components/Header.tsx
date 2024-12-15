import { Button } from "@/components/ui/button";


export function Header() {
  return (
    <header className="bg-black/50 backdrop-blur-sm border-b border-slate-800 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
      
          <span className="font-mono font-semibold text-2xl">Call.io</span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            {["Pricing", "About", "Contact"].map((item) => (
              <li key={item}>
                <Button variant="ghost" className="font-mono text-gray-400 hover:text-white">
                  {item}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

