// ...existing code...

// If there's any code handling CV downloads, update it to point to the correct path
function setupCVDownload() {
    const cvDownloadBtn = document.querySelector('.cv-download-btn');
    if (cvDownloadBtn) {
        // Make sure the href points to the correct PDF file
        cvDownloadBtn.setAttribute('href', 'assets/files/tanush_cv.pdf');
    }
}

// Call this function when the document is ready if it's not already included
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    setupCVDownload();
    // ...existing code...
});