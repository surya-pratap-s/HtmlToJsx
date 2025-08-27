// Conversion Logic Utils
export const convertHTMLToJSX = async (html, setProcessingProgress) => {
    if (!html.trim()) return { jsx: '', processingTime: 0 };

    const startTime = performance.now();
    let jsx = html;

    const replacements = [
        { regex: /<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)([^>]*?)>/gi, replacement: '<$1$2 />' },
        { regex: /\sclass=/gi, replacement: ' className=' },
        { regex: /\sfor=/gi, replacement: ' htmlFor=' },
        { regex: /\s(tabindex)=/gi, replacement: ' tabIndex=' },
        { regex: /\s(maxlength)=/gi, replacement: ' maxLength=' },
        { regex: /\s(readonly)=/gi, replacement: ' readOnly=' },
        { regex: /\s(contenteditable)=/gi, replacement: ' contentEditable=' },
        { regex: /\s(spellcheck)=/gi, replacement: ' spellCheck=' },
        { regex: /\s(crossorigin)=/gi, replacement: ' crossOrigin=' },
        { regex: /\s(novalidate)=/gi, replacement: ' noValidate=' },
        { regex: /\s(autofocus)=/gi, replacement: ' autoFocus=' },
        { regex: /\s(autoplay)=/gi, replacement: ' autoPlay=' }
    ];

    for (let i = 0; i < replacements.length; i++) {
        jsx = jsx.replace(replacements[i].regex, replacements[i].replacement);

        if (html.length > 10000 && i % 3 === 0) {
            setProcessingProgress((i / replacements.length) * 40);
            await new Promise(resolve => setTimeout(resolve, 0));
        }
    }

    setProcessingProgress(50);
    jsx = await processStyleAttributes(jsx, html.length > 50000, setProcessingProgress);
    setProcessingProgress(75);

    await new Promise(resolve => setTimeout(resolve, 0));
    jsx = formatJSXOptimized(jsx);

    const endTime = performance.now();
    const processingTime = Math.round(endTime - startTime);

    return { jsx, processingTime };
};

export const processStyleAttributes = async (jsx, isLargeFile) => {
    const styleRegex = /style=["']([^"']+)["']/gi;
    let match;
    const matches = [];

    while ((match = styleRegex.exec(jsx)) !== null) {
        matches.push({ fullMatch: match[0], styles: match[1], index: match.index });
    }

    if (matches.length === 0) return jsx;

    let result = jsx;
    let processedCount = 0;

    for (let i = matches.length - 1; i >= 0; i--) {
        const matchInfo = matches[i];
        const styleObj = {};
        const styles = matchInfo.styles.split(';');

        for (const style of styles) {
            if (style.trim()) {
                const colonIndex = style.indexOf(':');
                if (colonIndex > 0) {
                    const property = style.substring(0, colonIndex).trim();
                    const value = style.substring(colonIndex + 1).trim();
                    if (property && value) {
                        const camelCaseProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
                        styleObj[camelCaseProperty] = value;
                    }
                }
            }
        }

        const replacement = `style={${JSON.stringify(styleObj)}}`;
        result = result.substring(0, matchInfo.index) + replacement + result.substring(matchInfo.index + matchInfo.fullMatch.length);

        processedCount++;
        if (isLargeFile && processedCount % 10 === 0) {
            await new Promise(resolve => setTimeout(resolve, 0));
        }
    }

    return result;
};

export const formatJSXOptimized = (jsx) => {
    if (!jsx.trim()) return jsx;

    const lines = jsx.replace(/></g, '>\n<').split('\n');
    const result = [];
    let indentLevel = 0;
    const indentSize = 2;
    const indentCache = {};

    const getIndent = (level) => {
        if (!indentCache[level]) {
            indentCache[level] = ' '.repeat(level * indentSize);
        }
        return indentCache[level];
    };

    for (let i = 0; i < lines.length; i++) {
        const trimmedLine = lines[i].trim();
        if (!trimmedLine) continue;

        if (trimmedLine.startsWith('</')) {
            indentLevel = Math.max(0, indentLevel - 1);
        }

        result.push(getIndent(indentLevel) + trimmedLine);

        if (trimmedLine.startsWith('<') &&
            !trimmedLine.startsWith('</') &&
            !trimmedLine.endsWith('/>') &&
            !trimmedLine.includes('<!')) {
            indentLevel++;
        }
    }

    return result.join('\n');
};
