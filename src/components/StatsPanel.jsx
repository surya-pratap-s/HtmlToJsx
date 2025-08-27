import { Activity, Zap, RefreshCw } from 'lucide-react';

const StatsPanel = ({ fileSize, conversionTime, isConverting, processingProgress, formatFileSize }) => (
    <div className="flex justify-center gap-8 mt-6 mb-4">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-2 text-green-400">
                <Activity className="w-5 h-5" />
                <span className="text-sm font-semibold">File Size</span>
            </div>
            <div className="text-white font-bold text-lg">{formatFileSize(fileSize)}</div>
        </div>
        {conversionTime > 0 && (
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center gap-2 text-blue-400">
                    <Zap className="w-5 h-5" />
                    <span className="text-sm font-semibold">Process Time</span>
                </div>
                <div className="text-white font-bold text-lg">{conversionTime}ms</div>
            </div>
        )}
        {isConverting && (
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center gap-2 text-yellow-400">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span className="text-sm font-semibold">Progress</span>
                </div>
                <div className="text-white font-bold text-lg">{Math.round(processingProgress)}%</div>
            </div>
        )}
    </div>
);

export default StatsPanel;
