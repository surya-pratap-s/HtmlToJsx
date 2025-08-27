import { RefreshCw } from 'lucide-react';

const ActionButtons = ({
    loadSample,
    handleManualConvert,
    clearInputs,
    htmlInput,
    isConverting
}) => (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
            onClick={loadSample}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
            Load Sample HTML
        </button>
        <button
            onClick={handleManualConvert}
            disabled={!htmlInput.trim() || isConverting}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
        >
            {isConverting && <RefreshCw className="w-4 h-4 animate-spin" />}
            Convert Now
        </button>
        <button
            onClick={clearInputs}
            className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
            Clear All
        </button>
    </div>
);

export default ActionButtons;
