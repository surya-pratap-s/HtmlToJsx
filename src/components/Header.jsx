import { Code, Sparkles, ArrowRight } from "lucide-react";

const Header = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-4">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
          <Code className="w-8 h-8 text-white" />
        </div>
        <ArrowRight className="w-6 h-6 text-purple-400 mx-4" />
        <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
      </div>
      <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
        HTML to JSX Converter
      </h1>
      <p className="text-xl text-slate-300 max-w-2xl mx-auto">
        High-performance converter with optimized processing for handling large files smoothly
      </p>
    </div>
  );
};

export default Header;
