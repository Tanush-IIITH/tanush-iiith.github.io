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
    const prepositionCountContainer = document.getElementById('preposition-count-container');
    const articleCountContainer = document.getElementById('article-count-container');
    const warningEl = document.getElementById('word-warning');
    
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
    
    // Lists of words to analyze - corrected pronoun list
    const pronouns = [
        // Personal pronouns
        'i', 'me', 'my', 'mine', 'myself', 
        'you', 'your', 'yours', 'yourself', 'yourselves',
        'he', 'him', 'his', 'himself',
        'she', 'her', 'hers', 'herself',
        'it', 'its', 'itself',
        'we', 'us', 'our', 'ours', 'ourselves',
        'they', 'them', 'their', 'theirs', 'themselves',
        
        // Demonstrative pronouns
        'this', 'that', 'these', 'those',
        
        // Interrogative pronouns
        'who', 'whom', 'whose', 'which', 'what',
        
        // Relative pronouns - note 'that' is already included above
        'who', 'whom', 'whose', 'which',
        
        // Indefinite pronouns
        'anybody', 'anyone', 'anything', 'each', 'either', 'everybody', 
        'everyone', 'everything', 'neither', 'nobody', 'nothing', 
        'one', 'somebody', 'someone', 'something', 
        'both', 'few', 'several', 'all', 'any', 'some', 'none'
    ];
    
    // Remove duplicates from the pronouns list
    const uniquePronouns = [...new Set(pronouns)];

    const prepositions = [
        'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among', 
        'around', 'as', 'at', 'before', 'behind', 'below', 'beneath', 'beside', 
        'between', 'beyond', 'by', 'concerning', 'considering', 'despite', 'down', 
        'during', 'except', 'for', 'from', 'in', 'inside', 'into', 'like', 'near', 
        'of', 'off', 'on', 'onto', 'out', 'outside', 'over', 'past', 'regarding', 
        'round', 'since', 'through', 'throughout', 'to', 'toward', 'towards', 
        'under', 'underneath', 'until', 'unto', 'up', 'upon', 'with', 'within', 'without'
    ];
    
    const indefiniteArticles = ['a', 'an', 'the'];
    
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
        
        // Display a floating warning if the word count is less than 10,000
        if (wordCount < 10000) {
            warningEl.textContent = `Warning: The text contains only ${wordCount} words, which is less than the required 10,000 words.`;
            warningEl.style.display = 'block';
            warningEl.style.textAlign = 'center';
        } else {
            warningEl.style.display = 'none';
        }
        
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
        
        // Tokenize text and analyze word groups
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        countWordGroup(words, uniquePronouns, pronounCountContainer, 'pronoun');
        countWordGroup(words, prepositions, prepositionCountContainer, 'preposition');
        countWordGroup(words, indefiniteArticles, articleCountContainer, 'article');
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
    
    // Function to count words from a specific group
    function countWordGroup(words, wordList, containerElement, type) {
        // Create word frequency map
        const wordCounts = {};
        let totalCount = 0;
        
        words.forEach(word => {
            if (wordList.includes(word)) {
                wordCounts[word] = (wordCounts[word] || 0) + 1;
                totalCount++;
            }
        });
        
        // Display results
        if (totalCount > 0) {
            // Sort by frequency (descending)
            const sortedWords = Object.entries(wordCounts)
                .sort((a, b) => b[1] - a[1]);
                
            let html = '';
            sortedWords.forEach(([word, count]) => {
                html += `
                    <div class="${type}-item">
                        <span class="${type}-word">${word}</span>
                        <span class="${type}-count">${count}</span>
                    </div>
                `;
            });
            
            containerElement.innerHTML = html;
        } else {
            containerElement.innerHTML = `
                <div class="empty-${type}-container">
                    <i class="fas fa-search"></i>
                    <p class="no-data-msg">No ${type}s detected</p>
                </div>
            `;
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
        
        // Reset word group counts
        if (pronounCountContainer) {
            pronounCountContainer.innerHTML = `
                <div class="empty-pronoun-container">
                    <i class="fas fa-search"></i>
                    <p class="no-data-msg">No pronouns detected</p>
                </div>
            `;
        }
        
        if (prepositionCountContainer) {
            prepositionCountContainer.innerHTML = `
                <div class="empty-preposition-container">
                    <i class="fas fa-search"></i>
                    <p class="no-data-msg">No prepositions detected</p>
                </div>
            `;
        }
        
        if (articleCountContainer) {
            articleCountContainer.innerHTML = `
                <div class="empty-article-container">
                    <i class="fas fa-search"></i>
                    <p class="no-data-msg">No articles detected</p>
                </div>
            `;
        }
        
        // Hide the warning element
        warningEl.style.display = 'none';
    }
    
    function loadSampleText() {
        textInput.value = `
Technology has revolutionized the way we live, work, and interact with the world around us. From the invention of the wheel to the rise of artificial intelligence, technological advancements have consistently shaped human history. The digital age, in particular, has brought about unprecedented changes, enabling instant communication, access to vast amounts of information, and automation of complex tasks.

The internet, one of the most transformative technologies of the modern era, has connected billions of people worldwide. It has democratized knowledge, allowing individuals to learn, share, and collaborate across borders. Social media platforms have further amplified this connectivity, creating virtual communities and enabling real-time interactions.

Artificial intelligence (AI) is another groundbreaking technology that is reshaping industries. AI-powered systems can analyze data, recognize patterns, and make decisions with minimal human intervention. Applications of AI range from healthcare, where it aids in diagnosing diseases, to autonomous vehicles, which promise safer and more efficient transportation.

Cloud computing has revolutionized the way businesses operate by providing scalable and cost-effective solutions for data storage and processing. It has enabled startups and enterprises alike to innovate without the need for significant upfront investments in infrastructure.

The rise of the Internet of Things (IoT) has further blurred the lines between the physical and digital worlds. IoT devices, such as smart thermostats and wearable fitness trackers, collect and share data to improve efficiency and enhance user experiences.

Blockchain technology, initially popularized by cryptocurrencies like Bitcoin, is now being explored for its potential in secure and transparent record-keeping. Industries such as finance, supply chain, and healthcare are leveraging blockchain to enhance trust and reduce fraud.

Despite its many benefits, technology also poses challenges. Privacy concerns, cybersecurity threats, and the digital divide are pressing issues that need to be addressed. As technology continues to evolve, it is crucial to strike a balance between innovation and ethical considerations.

The future of technology holds immense promise. Emerging fields like quantum computing, biotechnology, and renewable energy are poised to tackle some of humanity's most pressing challenges. By fostering collaboration and investing in research and development, we can harness the power of technology to create a better, more sustainable world.

`.repeat(30); // Repeat to generate approximately 10,000 words
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
