import { Code, Sparkles, Copy, Download, RefreshCw } from 'lucide-react';

const ConverterSection = ({
    htmlInput,
    jsxOutput,
    handleInputChange,
    copyToClipboard,
    downloadJSX,
    copySuccess,
    isConverting,
    processingProgress
}) => (
    <div className="max-w-7xl mx-auto w-full gap-4 flex flex-col">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                    <Code className="w-6 h-6 text-purple-400" /> HTML Input
                </h2>
                <div className="text-sm text-slate-400">{htmlInput.length.toLocaleString()} chars</div>
            </div>
            <textarea
                value={htmlInput}
                onChange={e => handleInputChange(e.target.value)}
                placeholder="Paste your HTML code here... (Optimized for large files)"
                className="w-full h-96 bg-slate-900/80 text-slate-100 border border-slate-600 rounded-xl p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                spellCheck={false}
            />
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-blue-400" /> JSX Output
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={copyToClipboard}
                        disabled={!jsxOutput}
                        className="p-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                        title="Copy to clipboard"
                    >
                        <Copy className="w-4 h-4" />
                    </button>
                    <button
                        onClick={downloadJSX}
                        disabled={!jsxOutput}
                        className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                        title="Download JSX file"
                    >
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <div className="relative">
                <textarea
                    value={jsxOutput}
                    readOnly
                    placeholder="Converted JSX will appear here..."
                    className="w-full h-96 bg-slate-900/80 text-slate-100 border border-slate-600 rounded-xl p-4 font-mono text-sm resize-none focus:outline-none"
                    spellCheck={false}
                />
                {copySuccess && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-lg text-sm animate-fade-in">
                        Copied!
                    </div>
                )}
                {isConverting && (
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <div className="text-white flex items-center gap-3">
                            <RefreshCw className="w-6 h-6 animate-spin" />
                            <span>Converting... {Math.round(processingProgress)}%</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
);

export default ConverterSection;
