import { RefreshCw } from 'lucide-react';

const ProgressBar = ({ isConverting, processingProgress }) => (
    isConverting && (
        <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">Processing...</span>
                    <span className="text-sm text-slate-300">{Math.round(processingProgress)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${processingProgress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    )
);

export default ProgressBar;
