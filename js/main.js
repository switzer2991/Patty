// Homepage - Image Upload Functionality

document.addEventListener('DOMContentLoaded', () => {
    const uploadBox = document.getElementById('uploadBox');
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('previewContainer');
    const previewImage = document.getElementById('previewImage');
    const searchButton = document.getElementById('searchButton');
    const cancelButton = document.getElementById('cancelButton');

    // Drag and drop functionality
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.style.borderColor = 'var(--primary-pink)';
        uploadBox.style.background = 'var(--light-pink)';
    });

    uploadBox.addEventListener('dragleave', () => {
        uploadBox.style.borderColor = 'var(--silver)';
        uploadBox.style.background = 'var(--white)';
    });

    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.style.borderColor = 'var(--silver)';
        uploadBox.style.background = 'var(--white)';
        
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            handleImageUpload(files[0]);
        }
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleImageUpload(e.target.files[0]);
        }
    });

    // Handle image upload
    function handleImageUpload(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            uploadBox.style.display = 'none';
            previewContainer.style.display = 'block';
            
            // Store image in sessionStorage for search page
            sessionStorage.setItem('uploadedImage', e.target.result);
        };
        
        reader.readAsDataURL(file);
    }

    // Search button click
    searchButton.addEventListener('click', () => {
        // In a real app, this would send the image to a backend API
        // For now, we'll just navigate to the search results page
        window.location.href = 'search.html';
    });

    // Cancel button click
    cancelButton.addEventListener('click', () => {
        uploadBox.style.display = 'block';
        previewContainer.style.display = 'none';
        fileInput.value = '';
        sessionStorage.removeItem('uploadedImage');
    });
});
