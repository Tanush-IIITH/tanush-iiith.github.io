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
    const pronounCountContainer = document.getElementById('pronoun-count-container');
    
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

        // Update pronoun analysis
        updatePronounAnalysis(text);
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
    
    // New function to analyze pronouns
    function updatePronounAnalysis(text) {
        // Define pronoun categories and their words
        const pronounCategories = {
            'Personal': ['i', 'me', 'my', 'mine', 'myself', 
                        'you', 'your', 'yours', 'yourself', 'yourselves',
                        'he', 'him', 'his', 'himself',
                        'she', 'her', 'hers', 'herself',
                        'it', 'its', 'itself',
                        'we', 'us', 'our', 'ours', 'ourselves',
                        'they', 'them', 'their', 'theirs', 'themselves'],
            'Demonstrative': ['this', 'that', 'these', 'those'],
            'Interrogative': ['who', 'whom', 'whose', 'which', 'what'],
            'Relative': ['who', 'whom', 'whose', 'which', 'that'],
            'Indefinite': ['anybody', 'anyone', 'anything', 'each', 'either', 'everybody', 
                          'everyone', 'everything', 'neither', 'nobody', 'no one', 'nothing', 
                          'one', 'somebody', 'someone', 'something', 'both', 'few', 'many', 
                          'several', 'all', 'any', 'most', 'none', 'some']
        };
        
        // Convert text to lowercase and tokenize by splitting on non-word characters
        const words = text.toLowerCase().split(/\W+/).filter(word => word.length > 0);
        
        // Initialize pronoun counts
        const pronounCounts = {};
        let totalPronouns = 0;
        
        // Count pronouns by category
        for (const category in pronounCategories) {
            pronounCounts[category] = {};
            const pronounsInCategory = pronounCategories[category];
            
            words.forEach(word => {
                if (pronounsInCategory.includes(word.toLowerCase())) {
                    // Increment count for specific pronoun
                    pronounCounts[category][word] = (pronounCounts[category][word] || 0) + 1;
                    totalPronouns++;
                }
            });
        }
        
        // Display results
        if (totalPronouns > 0) {
            let html = '';
            
            // Generate HTML for each category that has pronouns
            for (const category in pronounCounts) {
                const categoryPronouns = pronounCounts[category];
                const pronounsFound = Object.keys(categoryPronouns).length;
                
                if (pronounsFound > 0) {
                    html += `<div class="pronoun-category">
                              <span class="pronoun-category-name">${category}:</span>
                              <div class="pronoun-list">`;
                    
                    // Add each pronoun with its count
                    Object.entries(categoryPronouns)
                        .sort((a, b) => b[1] - a[1]) // Sort by count (descending)
                        .forEach(([pronoun, count]) => {
                            html += `<div class="pronoun-item">
                                      <span class="pronoun-word">${pronoun}</span>
                                      <span class="pronoun-count">${count}</span>
                                    </div>`;
                        });
                    
                    html += `</div></div>`;
                }
            }
            
            pronounCountContainer.innerHTML = html;
        } else {
            // Better formatted "No pronouns detected" message
            pronounCountContainer.innerHTML = `
                <div class="empty-pronoun-container">
                    <i class="fas fa-search"></i>
                    <p class="no-data-msg">No pronouns detected</p>
                </div>`;
        }
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

        // Reset pronoun count with better formatted message
        pronounCountContainer.innerHTML = `
            <div class="empty-pronoun-container">
                <i class="fas fa-search"></i>
                <p class="no-data-msg">No pronouns detected</p>
            </div>`;
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
