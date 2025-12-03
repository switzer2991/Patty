// Explore Page - Pattern Grid Functionality

// Mock pattern data
const mockPatterns = [
    {
        id: 1,
        title: "Cozy Knit Sweater",
        type: "knitting",
        difficulty: "beginner",
        image: "https://via.placeholder.com/300x400/FFB6C1/FFFFFF?text=Knit+Sweater",
        time: "20-30 hours",
        rating: 4.8
    },
    {
        id: 2,
        title: "Vintage Crochet Cardigan",
        type: "crochet",
        difficulty: "intermediate",
        image: "https://via.placeholder.com/300x500/C0C0C0/FFFFFF?text=Crochet+Cardigan",
        time: "15-25 hours",
        rating: 4.5
    },
    {
        id: 3,
        title: "Simple Summer Dress",
        type: "sewing",
        difficulty: "beginner",
        image: "https://via.placeholder.com/300x450/FFB6C1/FFFFFF?text=Summer+Dress",
        time: "8-12 hours",
        rating: 4.9
    },
    {
        id: 4,
        title: "Chunky Cable Knit Blanket",
        type: "knitting",
        difficulty: "advanced",
        image: "https://via.placeholder.com/300x350/C0C0C0/FFFFFF?text=Knit+Blanket",
        time: "40-50 hours",
        rating: 4.7
    },
    {
        id: 5,
        title: "Bohemian Crochet Top",
        type: "crochet",
        difficulty: "intermediate",
        image: "https://via.placeholder.com/300x550/FFB6C1/FFFFFF?text=Crochet+Top",
        time: "12-18 hours",
        rating: 4.6
    },
    {
        id: 6,
        title: "Classic Button-Up Shirt",
        type: "sewing",
        difficulty: "intermediate",
        image: "https://via.placeholder.com/300x400/C0C0C0/FFFFFF?text=Button+Shirt",
        time: "10-15 hours",
        rating: 4.4
    },
    {
        id: 7,
        title: "Lace Knit Shawl",
        type: "knitting",
        difficulty: "advanced",
        image: "https://via.placeholder.com/300x420/FFB6C1/FFFFFF?text=Knit+Shawl",
        time: "25-35 hours",
        rating: 4.9
    },
    {
        id: 8,
        title: "Granny Square Tote Bag",
        type: "crochet",
        difficulty: "beginner",
        image: "https://via.placeholder.com/300x380/C0C0C0/FFFFFF?text=Crochet+Bag",
        time: "5-8 hours",
        rating: 4.8
    },
    {
        id: 9,
        title: "A-Line Midi Skirt",
        type: "sewing",
        difficulty: "beginner",
        image: "https://via.placeholder.com/300x460/FFB6C1/FFFFFF?text=Midi+Skirt",
        time: "6-10 hours",
        rating: 4.7
    },
    {
        id: 10,
        title: "Fair Isle Pullover",
        type: "knitting",
        difficulty: "advanced",
        image: "https://via.placeholder.com/300x500/C0C0C0/FFFFFF?text=Fair+Isle",
        time: "30-40 hours",
        rating: 4.6
    },
    {
        id: 11,
        title: "Amigurumi Plush Toy",
        type: "crochet",
        difficulty: "intermediate",
        image: "https://via.placeholder.com/300x360/FFB6C1/FFFFFF?text=Amigurumi",
        time: "8-12 hours",
        rating: 4.9
    },
    {
        id: 12,
        title: "Wrap Dress Pattern",
        type: "sewing",
        difficulty: "intermediate",
        image: "https://via.placeholder.com/300x480/C0C0C0/FFFFFF?text=Wrap+Dress",
        time: "12-16 hours",
        rating: 4.5
    }
];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    const patternsGrid = document.getElementById('patternsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sortSelect');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    let currentFilter = 'all';
    let displayedPatterns = 12;

    // Render patterns
    function renderPatterns(patterns) {
        patternsGrid.innerHTML = '';
        patterns.slice(0, displayedPatterns).forEach(pattern => {
            const card = createPatternCard(pattern);
            patternsGrid.appendChild(card);
        });

        // Show/hide load more button
        if (displayedPatterns >= patterns.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    // Create pattern card element
    function createPatternCard(pattern) {
        const card = document.createElement('div');
        card.className = 'pattern-card';
        card.onclick = () => window.location.href = `pattern-detail.html?id=${pattern.id}`;

        card.innerHTML = `
            <img src="${pattern.image}" alt="${pattern.title}">
            <div class="pattern-card-content">
                <h3>${pattern.title}</h3>
                <div class="pattern-meta">
                    <span class="craft-type">${getCraftIcon(pattern.type)} ${capitalize(pattern.type)}</span>
                    <span class="difficulty ${pattern.difficulty}">${capitalize(pattern.difficulty)}</span>
                </div>
                <div class="pattern-card-footer">
                    <span>⭐ ${pattern.rating}</span>
                    <span>${pattern.time}</span>
                </div>
            </div>
        `;

        return card;
    }

    // Get craft icon
    function getCraftIcon(type) {
        const icons = {
            knitting: '🧶',
            crochet: '🪡',
            sewing: '✂️'
        };
        return icons[type] || '🧵';
    }

    // Capitalize first letter
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Filter patterns
    function filterPatterns(type) {
        if (type === 'all') {
            return mockPatterns;
        }
        return mockPatterns.filter(p => p.type === type);
    }

    // Sort patterns
    function sortPatterns(patterns, sortType) {
        const sorted = [...patterns];
        switch(sortType) {
            case 'popular':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'recent':
                return sorted.reverse();
            case 'easy':
                return sorted.sort((a, b) => {
                    const order = { beginner: 1, intermediate: 2, advanced: 3 };
                    return order[a.difficulty] - order[b.difficulty];
                });
            case 'advanced':
                return sorted.sort((a, b) => {
                    const order = { beginner: 1, intermediate: 2, advanced: 3 };
                    return order[b.difficulty] - order[a.difficulty];
                });
            default:
                return sorted;
        }
    }

    // Update display
    function updateDisplay() {
        const filtered = filterPatterns(currentFilter);
        const sorted = sortPatterns(filtered, sortSelect.value);
        renderPatterns(sorted);
    }

    // Filter button click handlers
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            displayedPatterns = 12;
            updateDisplay();
        });
    });

    // Sort change handler
    sortSelect.addEventListener('change', updateDisplay);

    // Load more button
    loadMoreBtn.addEventListener('click', () => {
        displayedPatterns += 12;
        updateDisplay();
    });

    // Initial render
    updateDisplay();
});
