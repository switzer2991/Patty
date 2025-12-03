// Search Results Page Functionality

// Mock search results with match scores
const mockSearchResults = [
    {
        id: 1,
        title: "Oversized Knit Sweater Pattern",
        type: "knitting",
        difficulty: "beginner",
        image: "https://via.placeholder.com/300x400/FFB6C1/FFFFFF?text=Match+1",
        matchScore: 98,
        time: "20-30 hours",
        rating: 4.8
    },
    {
        id: 2,
        title: "Chunky Pullover Knit",
        type: "knitting",
        difficulty: "intermediate",
        image: "https://via.placeholder.com/300x400/C0C0C0/FFFFFF?text=Match+2",
        matchScore: 95,
        time: "25-35 hours",
        rating: 4.7
    },
    {
        id: 3,
        title: "Cozy Cable Sweater",
        type: "knitting",
        difficulty: "intermediate",
        image: "https://via.placeholder.com/300x400/FFB6C1/FFFFFF?text=Match+3",
        matchScore: 92,
        time: "22-28 hours",
        rating: 4.9
    },
    {
        id: 4,
        title: "Relaxed Fit Cardigan",
        type: "knitting",
        difficulty: "beginner",
        image: "https://via.placeholder.com/300x400/C0C0C0/FFFFFF?text=Match+4",
        matchScore: 89,
        time: "18-24 hours",
        rating: 4.6
    },
    {
        id: 5,
        title: "Raglan Sleeve Pullover",
        type: "knitting",
        difficulty: "intermediate",
        image: "https://via.placeholder.com/300x400/FFB6C1/FFFFFF?text=Match+5",
        matchScore: 87,
        time: "20-30 hours",
        rating: 4.5
    },
    {
        id: 6,
        title: "Drop Shoulder Sweater",
        type: "knitting",
        difficulty: "beginner",
        image: "https://via.placeholder.com/300x400/C0C0C0/FFFFFF?text=Match+6",
        matchScore: 85,
        time: "16-22 hours",
        rating: 4.8
    },
    {
        id: 7,
        title: "Textured Knit Top",
        type: "knitting",
        difficulty: "advanced",
        image: "https://via.placeholder.com/300x400/FFB6C1/FFFFFF?text=Match+7",
        matchScore: 83,
        time: "28-35 hours",
        rating: 4.7
    },
    {
        id: 8,
        title: "Classic Crew Neck",
        type: "knitting",
        difficulty: "beginner",
        image: "https://via.placeholder.com/300x400/C0C0C0/FFFFFF?text=Match+8",
        matchScore: 81,
        time: "15-20 hours",
        rating: 4.6
    },
    {
        id: 9,
        title: "Balloon Sleeve Sweater",
        type: "knitting",
        difficulty: "intermediate",
        image: "https://via.placeholder.com/300x400/FFB6C1/FFFFFF?text=Match+9",
        matchScore: 79,
        time: "22-28 hours",
        rating: 4.4
    },
    {
        id: 10,
        title: "Ribbed Turtleneck",
        type: "knitting",
        difficulty: "beginner",
        image: "https://via.placeholder.com/300x400/C0C0C0/FFFFFF?text=Match+10",
        matchScore: 77,
        time: "18-24 hours",
        rating: 4.9
    },
    {
        id: 11,
        title: "Mohair Blend Sweater",
        type: "knitting",
        difficulty: "intermediate",
        image: "https://via.placeholder.com/300x400/FFB6C1/FFFFFF?text=Match+11",
        matchScore: 75,
        time: "25-32 hours",
        rating: 4.5
    },
    {
        id: 12,
        title: "V-Neck Pullover",
        type: "knitting",
        difficulty: "beginner",
        image: "https://via.placeholder.com/300x400/C0C0C0/FFFFFF?text=Match+12",
        matchScore: 73,
        time: "16-22 hours",
        rating: 4.7
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const searchImage = document.getElementById('searchImage');
    const resultCount = document.getElementById('resultCount');
    const resultsGrid = document.getElementById('resultsGrid');

    // Load uploaded image from sessionStorage
    const uploadedImage = sessionStorage.getItem('uploadedImage');
    if (uploadedImage) {
        searchImage.src = uploadedImage;
    } else {
        // Use placeholder if no image was uploaded
        searchImage.src = 'https://via.placeholder.com/200x200/FFB6C1/FFFFFF?text=Uploaded+Image';
    }

    // Update result count
    resultCount.textContent = `Found ${mockSearchResults.length} matching patterns`;

    // Render search results
    renderResults(mockSearchResults);

    function renderResults(results) {
        resultsGrid.innerHTML = '';
        results.forEach(result => {
            const card = createResultCard(result);
            resultsGrid.appendChild(card);
        });
    }

    function createResultCard(result) {
        const card = document.createElement('div');
        card.className = 'result-card';
        card.onclick = () => window.location.href = `pattern-detail.html?id=${result.id}`;

        card.innerHTML = `
            <img src="${result.image}" alt="${result.title}">
            <div class="result-card-content">
                <span class="match-score">${result.matchScore}% Match</span>
                <h3>${result.title}</h3>
                <div class="pattern-meta">
                    <span class="craft-type">${getCraftIcon(result.type)} ${capitalize(result.type)}</span>
                    <span class="difficulty ${result.difficulty}">${capitalize(result.difficulty)}</span>
                </div>
                <div class="pattern-card-footer">
                    <span>⭐ ${result.rating}</span>
                    <span>${result.time}</span>
                </div>
            </div>
        `;

        return card;
    }

    function getCraftIcon(type) {
        const icons = {
            knitting: '🧶',
            crochet: '🪡',
            sewing: '✂️'
        };
        return icons[type] || '🧵';
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});
