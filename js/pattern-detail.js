// Pattern Detail Page Functionality

// Mock pattern details
const patternDetails = {
    1: {
        title: "Cozy Knit Sweater Pattern",
        type: "knitting",
        difficulty: "beginner",
        description: "This beautiful oversized sweater features a relaxed fit and ribbed detailing. Perfect for cozy autumn days, this pattern includes detailed instructions for sizes XS through XXL. The design uses simple stockinette stitch with ribbed edges, making it perfect for confident beginners.",
        time: "20-30 hours",
        rating: 4.8,
        reviews: 156,
        sizes: "XS - XXL",
        materials: [
            "800-1200 yards of worsted weight yarn",
            "US Size 8 (5mm) circular needles",
            "US Size 6 (4mm) circular needles for ribbing",
            "Stitch markers",
            "Tapestry needle"
        ],
        price: 8.99,
        tags: ["sweater", "oversized", "beginner-friendly", "fall fashion"],
        images: [
            "https://via.placeholder.com/600x800/FFB6C1/FFFFFF?text=Main+View",
            "https://via.placeholder.com/600x800/C0C0C0/FFFFFF?text=Detail+View",
            "https://via.placeholder.com/600x800/FFB6C1/FFFFFF?text=Back+View"
        ]
    }
};

// Similar patterns for recommendation
const similarPatterns = [
    {
        id: 2,
        title: "Chunky Cable Sweater",
        image: "https://via.placeholder.com/250x350/C0C0C0/FFFFFF?text=Similar+1",
        type: "knitting",
        difficulty: "intermediate",
        rating: 4.7
    },
    {
        id: 3,
        title: "Ribbed Pullover",
        image: "https://via.placeholder.com/250x350/FFB6C1/FFFFFF?text=Similar+2",
        type: "knitting",
        difficulty: "beginner",
        rating: 4.9
    },
    {
        id: 4,
        title: "Classic Cardigan",
        image: "https://via.placeholder.com/250x350/C0C0C0/FFFFFF?text=Similar+3",
        type: "knitting",
        difficulty: "intermediate",
        rating: 4.6
    },
    {
        id: 5,
        title: "Textured Knit Top",
        image: "https://via.placeholder.com/250x350/FFB6C1/FFFFFF?text=Similar+4",
        type: "knitting",
        difficulty: "beginner",
        rating: 4.8
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Get pattern ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const patternId = urlParams.get('id') || '1';

    // Load pattern details (use default pattern 1 for demo)
    const pattern = patternDetails[patternId] || patternDetails['1'];

    // Populate pattern details
    document.getElementById('patternTitle').textContent = pattern.title;
    document.getElementById('patternDescription').textContent = pattern.description;
    
    // Update meta information
    document.querySelector('.craft-type').innerHTML = `${getCraftIcon(pattern.type)} ${capitalize(pattern.type)}`;
    document.querySelector('.difficulty').textContent = capitalize(pattern.difficulty);
    document.querySelector('.difficulty').className = `difficulty ${pattern.difficulty}`;
    document.querySelector('.rating').textContent = `⭐ ${pattern.rating} (${pattern.reviews} reviews)`;

    // Update stats
    const stats = document.querySelectorAll('.stat-value');
    stats[0].textContent = pattern.time;
    stats[1].textContent = capitalize(pattern.difficulty);
    stats[2].textContent = pattern.sizes;

    // Update materials list
    const materialsList = document.getElementById('materialsList');
    materialsList.innerHTML = '';
    pattern.materials.forEach(material => {
        const li = document.createElement('li');
        li.textContent = material;
        materialsList.appendChild(li);
    });

    // Update images
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    mainImage.src = pattern.images[0];
    thumbnails.forEach((thumb, index) => {
        if (pattern.images[index]) {
            thumb.src = pattern.images[index];
            thumb.onclick = () => {
                mainImage.src = pattern.images[index];
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            };
        }
    });

    // Update tags
    const tagsContainer = document.querySelector('.pattern-tags');
    tagsContainer.innerHTML = '';
    pattern.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = tag;
        tagsContainer.appendChild(span);
    });

    // Update price in button
    document.querySelector('.btn-primary.large').textContent = `Get Pattern - $${pattern.price}`;

    // Render similar patterns
    renderSimilarPatterns();

    function renderSimilarPatterns() {
        const similarGrid = document.getElementById('similarGrid');
        similarGrid.innerHTML = '';
        
        similarPatterns.forEach(similar => {
            const card = document.createElement('div');
            card.className = 'pattern-card';
            card.onclick = () => {
                window.location.href = `pattern-detail.html?id=${similar.id}`;
            };

            card.innerHTML = `
                <img src="${similar.image}" alt="${similar.title}">
                <div class="pattern-card-content">
                    <h3>${similar.title}</h3>
                    <div class="pattern-meta">
                        <span class="craft-type">${getCraftIcon(similar.type)} ${capitalize(similar.type)}</span>
                        <span class="difficulty ${similar.difficulty}">${capitalize(similar.difficulty)}</span>
                    </div>
                    <div class="pattern-card-footer">
                        <span>⭐ ${similar.rating}</span>
                    </div>
                </div>
            `;

            similarGrid.appendChild(card);
        });
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
