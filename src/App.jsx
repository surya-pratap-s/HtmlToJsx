import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import Header from './components/Header';
import StatsPanel from './components/StatsPanel';
import ActionButtons from './components/ActionButtons';
import ProgressBar from './components/ProgressBar';
import ConverterSection from './components/ConverterSection';
import Footer from './components/Footer';
import { convertHTMLToJSX } from './utils/converter';

const App = () => {
  const [htmlInput, setHtmlInput] = useState('');
  const [jsxOutput, setJsxOutput] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [fileSize, setFileSize] = useState(0);
  const [conversionTime, setConversionTime] = useState(0);

  const debounceRef = useRef(null);
  const processingRef = useRef(false);

  const debouncedConvert = useCallback((html) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const delay = html.length > 10000 ? 800 : 300;
    debounceRef.current = setTimeout(async () => {
      if (html.trim() && !processingRef.current) {
        processingRef.current = true;
        setIsConverting(true);
        setProcessingProgress(0);
        try {
          const result = await convertHTMLToJSX(html, setProcessingProgress);
          setJsxOutput(result.jsx);
          setConversionTime(result.processingTime);
          setProcessingProgress(100);
        } catch (error) {
          console.error('Conversion error:', error);
        } finally {
          setIsConverting(false);
          processingRef.current = false;
        }
      } else if (!html.trim()) {
        setJsxOutput('');
        setProcessingProgress(0);
        setConversionTime(0);
      }
    }, delay);
  }, []);

  const handleInputChange = useCallback((value) => {
    setHtmlInput(value);
    setFileSize(new Blob([value]).size);
    debouncedConvert(value);
  }, [debouncedConvert]);

  const handleManualConvert = useCallback(async () => {
    if (htmlInput.trim() && !processingRef.current) {
      processingRef.current = true;
      setIsConverting(true);
      setProcessingProgress(0);
      try {
        const result = await convertHTMLToJSX(htmlInput, setProcessingProgress);
        setJsxOutput(result.jsx);
        setConversionTime(result.processingTime);
        setProcessingProgress(100);
      } catch (error) {
        console.error('Conversion error:', error);
      } finally {
        setIsConverting(false);
        processingRef.current = false;
      }
    }
  }, [htmlInput]);

  const copyToClipboard = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(jsxOutput);
      } else {
        const ta = document.createElement('textarea');
        ta.value = jsxOutput;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [jsxOutput]);

  const downloadJSX = useCallback(() => {
    const a = document.createElement('a');
    const file = new Blob([jsxOutput], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = 'converted-component.jsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }, [jsxOutput]);

  const clearInputs = useCallback(() => {
    setHtmlInput('');
    setJsxOutput('');
    setFileSize(0);
    setConversionTime(0);
    setProcessingProgress(0);
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  const sampleHTML = useMemo(() => `
    <div class="container">
      <h1 style="color: blue; font-size: 24px; margin-bottom: 10px;">Hello World</h1>
      <div class="form-group">
        <label for="email" style="display: block; margin-bottom: 5px;">Email Address:</label>
        <input type="email" id="email" class="input-field" maxlength="50" readonly />
      </div>
      <div class="image-container">
        <img src="image.jpg" alt="Sample Image" style="max-width: 100%; height: auto;" />
      </div>
      <br />
      <div class="button-group">
        <button onclick="handleClick()" class="primary-btn" tabindex="1">Click Me</button>
        <button onclick="handleReset()" class="secondary-btn" tabindex="2">Reset</button>
      </div>
      <div contenteditable="true" spellcheck="false" style="border: 1px solid #ccc; padding: 10px;">
        Editable content area
      </div>
    </div>`, []);

  const loadSample = useCallback(() => {
    handleInputChange(sampleHTML);
  }, [handleInputChange, sampleHTML]);

  const formatFileSize = bytes => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* background animation elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <Header />
        <StatsPanel {...{ fileSize, conversionTime, isConverting, processingProgress, formatFileSize }} />
        <ActionButtons {...{ loadSample, handleManualConvert, clearInputs, htmlInput, isConverting }} />
        <ProgressBar {...{ isConverting, processingProgress }} />
        <ConverterSection {...{ htmlInput, jsxOutput, handleInputChange, copyToClipboard, downloadJSX, copySuccess, isConverting, processingProgress }} />
        <Footer />
      </div>

      <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
        `}</style>

    </div>
  );
};

export default App;
