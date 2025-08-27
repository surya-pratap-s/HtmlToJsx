import { Zap, Activity, RefreshCw, Code } from 'lucide-react';

const Footer = () => (<>
    <div className="mt-16 grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {[{
            icon: <Zap />,
            title: 'Async Processing',
            desc: 'Non-blocking conversion with progress tracking'
        }, {
            icon: <Activity />,
            title: 'Smart Batching',
            desc: 'Optimized processing for any file size'
        }, {
            icon: <RefreshCw />,
            title: 'Adaptive Timing',
            desc: 'Smart delays based on content size'
        }, {
            icon: <Code />,
            title: 'Memory Efficient',
            desc: 'Optimized algorithms with caching'
        }].map(({ icon, title, desc }, idx) => (
            <div key={idx} className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 text-center border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
                <div className="w-12 h-12 bg-green-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    {icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm">{desc}</p>
            </div>
        ))}
    </div>

    <div className="mt-16 text-center text-slate-400">
        <p>High-Performance HTML to JSX Converter • Handles files of any size without blocking</p>
    </div>
</>);

export default Footer;
