/**
 * Text Analysis Tool
 * Provides real-time analysis of text including word count, character count,
 * reading level metrics, and sentiment analysis.
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const textInput = document.getElementById('text-input');
    const clearBtn = document.getElementById('clear-btn');
    const sampleBtn = document.getElementById('sample-btn');
    
    // Analysis result elements
    const wordCountEl = document.getElementById('word-count');
    const charCountEl = document.getElementById('char-count');
    const charNoSpacesEl = document.getElementById('char-no-spaces');
    const letterCountEl = document.getElementById('letter-count');
    const spaceCountEl = document.getElementById('space-count');
    const newlineCountEl = document.getElementById('newline-count');
    const symbolCountEl = document.getElementById('symbol-count');
    const sentenceCountEl = document.getElementById('sentence-count');
    const paragraphCountEl = document.getElementById('paragraph-count');
    
    // Event listeners
    clearBtn.addEventListener('click', clearText);
    sampleBtn.addEventListener('click', loadSampleText);
    textInput.addEventListener('input', debounce(analyzeText, 500));
    
    // Main function to analyze text
    function analyzeText() {
        const text = textInput.value.trim();
        
        if (!text) {
            resetResults();
            return;
        }
        
        // Basic counts
        const wordCount = countWords(text);
        const charCount = text.length;
        const charNoSpaces = text.replace(/\s/g, '').length;
        const sentenceCount = countSentences(text);
        const paragraphCount = countParagraphs(text);
        
        // Character breakdown counts
        const charDetails = countCharacterDetails(textInput.value); // Use non-trimmed value to preserve all characters
        
        // Update the DOM with basic counts
        wordCountEl.textContent = wordCount;
        charCountEl.textContent = charCount;
        charNoSpacesEl.textContent = `Without spaces: ${charNoSpaces}`;
        letterCountEl.textContent = charDetails.letters;
        spaceCountEl.textContent = charDetails.spaces;
        newlineCountEl.textContent = charDetails.newlines;
        symbolCountEl.textContent = charDetails.specialSymbols;
        sentenceCountEl.textContent = sentenceCount;
        paragraphCountEl.textContent = paragraphCount;
    }
    
    // Helper functions for text analysis
    function countWords(text) {
        return text.split(/\s+/).filter(word => word.length > 0).length;
    }
    
    function countSentences(text) {
        // Count sequences ending with ., !, ? and handle edge cases
        return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    }
    
    function countParagraphs(text) {
        // Split by double newlines and count non-empty paragraphs
        return text.split(/\n\s*\n/).filter(para => para.trim().length > 0).length || 1;
    }
    
    // New function to count character details
    function countCharacterDetails(text) {
        // Count letters (a-z, A-Z)
        const letters = (text.match(/[a-zA-Z]/g) || []).length;
        
        // Count spaces
        const spaces = (text.match(/[ ]/g) || []).length;
        
        // Count newlines
        const newlines = (text.match(/\n/g) || []).length;
        
        // Count digits
        const digits = (text.match(/\d/g) || []).length;
        
        // Count special symbols (anything not a letter, digit, space, or newline)
        const specialSymbols = text.length - letters - digits - spaces - newlines;
        
        return {
            letters: letters,
            spaces: spaces,
            newlines: newlines,
            digits: digits,
            specialSymbols: specialSymbols
        };
    }
    
    function clearText() {
        textInput.value = '';
        resetResults();
    }
    
    function resetResults() {
        // Reset basic counts
        wordCountEl.textContent = '0';
        charCountEl.textContent = '0';
        charNoSpacesEl.textContent = 'Without spaces: 0';
        letterCountEl.textContent = '0';
        spaceCountEl.textContent = '0';
        newlineCountEl.textContent = '0';
        symbolCountEl.textContent = '0';
        sentenceCountEl.textContent = '0';
        paragraphCountEl.textContent = '0';
    }
    
    function loadSampleText() {
        textInput.value = `Text analysis is the process of using computer systems to understand human language. It helps us extract meaning from unstructured text data. This technology powers many applications we use daily.

Natural Language Processing (NLP) combines computer science, artificial intelligence, and linguistics to enable computers to understand human language. By using statistical models, computers can analyze text quickly and efficiently.

Text analysis can identify key themes, measure sentiment, classify content, and extract specific information from documents.`;
        analyzeText();
    }
    
    // Utility function to debounce frequent events
    function debounce(func, delay) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }
});
