// Gaming Wiki JavaScript Functionality

class GameWiki {
    constructor() {
        this.currentSection = 'home';
        this.games = [];
    this.favorites = new Set();
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupSearch();
        this.setupModal();
        this.loadSampleData();
        this.setupFilters();
    this.loadFavorites();
    this.setupExtraControls();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.showSection(section);
                this.updateActiveNav(link);
            });
        });
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected section
        const targetSection = document.getElementById(`${sectionName}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionName;
            
            // Load section-specific content
            this.loadSectionContent(sectionName);
        }
    }

    updateActiveNav(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        if (activeLink) activeLink.classList.add('active');
    }

    setupSearch() {
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        if (!searchInput || !searchBtn) return;
        
        const doSearch = () => {
            const query = searchInput.value.trim();
            if (query) this.search(query);
        };

        searchBtn.addEventListener('click', doSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') doSearch();
        });
    }

    search(query) {
        console.log(`Searching for: ${query}`);
        // Implement search functionality
        const results = this.performSearch(query);
        this.displaySearchResults(results);
    }

    performSearch(query) {
        const games = this.games || [];
        const q = (query || '').toLowerCase();
        return games.filter(item =>
            (item.title && item.title.toLowerCase().includes(q)) ||
            (item.description && item.description.toLowerCase().includes(q)) ||
            (item.overview && item.overview.toLowerCase().includes(q)) ||
            (item.tags && item.tags.some(tag => tag.toLowerCase().includes(q)))
        );
    }

    displaySearchResults(results) {
        // Show search results in games section for now
        this.showSection('games');
    this.renderGames(results);
    }

    setupModal() {
        const modal = document.getElementById('game-modal');
        if (!modal) return;
        const closeBtn = document.querySelector('.close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    showGameModal(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (game) {
            const modal = document.getElementById('game-modal');
            const content = document.getElementById('game-detail-content');
            content.innerHTML = this.generateGameDetailHTML(game);
            modal.style.display = 'block';
        }
    }

    generateGameDetailHTML(game) {
        return `
            <div class="game-detail">
                <div class="game-header">
                    <div class="game-image">
                        ${game.image ? `<img src="${game.image}" alt="${game.title}">` : `
                        <div class="game-placeholder">
                            <i class="${game.icon}"></i>
                        </div>`}
                    </div>
                    <div class="game-info">
                        <h1>${game.title}</h1>
                        <p class="game-description">${game.description}</p>
                        <div class="game-meta">
                            <span><strong>Platform:</strong> ${game.platform}</span>
                            <span><strong>Genre:</strong> ${game.genre}</span>
                            <span><strong>Release:</strong> ${game.releaseDate}</span>
                        </div>
                        <div class="game-tags">
                            ${game.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="game-sections">
                    <div class="section-tabs">
                        <button class="section-tab active" data-tab="overview">Overview</button>
                        <button class="section-tab" data-tab="characters">Characters</button>
                        <button class="section-tab" data-tab="maps">Maps</button>
                        <button class="section-tab" data-tab="trivia">Trivia</button>
                    </div>
                    
                    <div class="section-content">
                        <div class="tab-pane active" id="overview-tab">
                            <h3>Overview</h3>
                            <p>${game.overview || game.gameplay || 'Detailed overview coming soon...'}</p>
                        </div>
                        <div class="tab-pane" id="characters-tab">
                            <h3>Characters</h3>
                            <div class="characters-grid">
                                ${this.generateCharactersHTML(game.characters || [])}
                            </div>
                        </div>
                        <div class="tab-pane" id="maps-tab">
                            <h3>Maps & Locations</h3>
                            <div class="maps-grid">
                                ${this.generateMapsHTML(game.maps || [])}
                            </div>
                        </div>
                        <div class="tab-pane" id="trivia-tab">
                            <h3>Trivia</h3>
                            <div class="trivia-list">
                                ${this.generateTriviaHTML(game.trivia || [])}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateCharactersHTML(characters) {
        if (characters.length === 0) {
            return '<p>Character information coming soon...</p>';
        }
        return characters.map(char => `
            <div class="character-card">
                <div class="character-icon">
                    <i class="fas fa-user"></i>
                </div>
                <h4>${char.name}</h4>
                <p>${char.description}</p>
            </div>
        `).join('');
    }

    generateMapsHTML(maps) {
        if (maps.length === 0) {
            return '<p>Interactive maps coming soon...</p>';
        }
        return maps.map(map => `
            <div class="map-card">
                <div class="map-preview">
                    <i class="fas fa-map"></i>
                </div>
                <h4>${map.name}</h4>
                <p>${map.description}</p>
                <button class="btn-primary">View Interactive Map</button>
            </div>
        `).join('');
    }

    generateTriviaHTML(trivia) {
        if (!trivia || trivia.length === 0) {
            return '<p>Trivia coming soon...</p>';
        }
        return trivia.map(item => `
            <div class="trivia-item">
                <i class="fas fa-lightbulb"></i>
                <p>${item}</p>
            </div>
        `).join('');
    }

    

    setupCommunityTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.dataset.tab;
                this.showCommunityTab(tabName);
                this.updateActiveTab(btn);
            });
        });
    }

    showCommunityTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const targetTab = document.getElementById(`${tabName}-tab`);
        if (targetTab) {
            targetTab.classList.add('active');
            this.loadCommunityContent(tabName);
        }
    }

    updateActiveTab(activeBtn) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    setupGuideCategories() {
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                this.filterGuides(category);
                this.updateActiveCategory(btn);
            });
        });
    }

    updateActiveCategory(activeBtn) {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    filterGuides(category) {
        let filteredGuides = this.guides;
        if (category !== 'all') {
            filteredGuides = this.guides.filter(guide => guide.category === category);
        }
        this.renderGuides(filteredGuides);
    }

    setupFilters() {
        const platformFilter = document.getElementById('platform-filter');
        const genreFilter = document.getElementById('genre-filter');
        
        if (platformFilter) {
            platformFilter.addEventListener('change', () => {
                this.applyFilters();
            });
        }
        
        if (genreFilter) {
            genreFilter.addEventListener('change', () => {
                this.applyFilters();
            });
        }
    }

    applyFilters() {
        const platform = document.getElementById('platform-filter')?.value || '';
        const genre = document.getElementById('genre-filter')?.value || '';
        const favOnly = document.getElementById('favorites-only')?.checked || false;
        
        let filteredGames = this.games;
        
        if (platform) {
            filteredGames = filteredGames.filter(game => 
                game.platform.toLowerCase().includes(platform.toLowerCase())
            );
        }
        
        if (genre) {
            filteredGames = filteredGames.filter(game => 
                game.genre.toLowerCase().includes(genre.toLowerCase())
            );
        }

        if (favOnly) {
            filteredGames = filteredGames.filter(game => this.favorites.has(game.id));
        }
        
        this.renderGames(filteredGames);
    }

    loadSectionContent(sectionName) {
        switch(sectionName) {
            case 'games':
                this.renderGames(this.games);
                break;
            default:
                break;
        }
    }

    renderGames(games) {
        const gamesGrid = document.getElementById('games-grid');
        if (!gamesGrid) return;
        
        gamesGrid.innerHTML = games.map(game => `
            <div class="game-card" data-game-id="${game.id}">
                <div class="card-image">
                    ${game.image ? `<img src="${game.image}" alt="${game.title}">` : `
                    <div class="game-placeholder">
                        <i class="${game.icon}"></i>
                    </div>`}
                    <button class="favorite-btn ${this.favorites.has(game.id) ? 'active' : ''}" title="Toggle favorite" aria-label="Toggle favorite" data-game-id="${game.id}">
                        <i class="${this.favorites.has(game.id) ? 'fas fa-heart' : 'far fa-heart'}"></i>
                    </button>
                </div>
                <div class="card-content">
                    <h3>${game.title}</h3>
                    <p>${game.description}</p>
                    <div class="card-tags">
                        ${game.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="card-meta">
                        <span><i class="fas fa-gamepad"></i> ${game.platform}</span>
                        <span><i class="fas fa-star"></i> ${game.rating}/10</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add click listeners to game cards
        gamesGrid.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', () => {
                const gameId = card.dataset.gameId;
                this.showGameModal(gameId);
            });
        });

        // Wire up favorite buttons (prevent card click propagation)
        gamesGrid.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.getAttribute('data-game-id');
                this.toggleFavorite(id);
                // Re-render current filtered view for immediate UI update
                this.applyFilters();
            });
        });
    }

    // Favorites: state + storage
    loadFavorites() {
        try {
            const raw = localStorage.getItem('gw_favorites');
            if (raw) this.favorites = new Set(JSON.parse(raw));
        } catch {}
    }

    saveFavorites() {
        try {
            localStorage.setItem('gw_favorites', JSON.stringify(Array.from(this.favorites)));
        } catch {}
    }

    toggleFavorite(gameId) {
        if (this.favorites.has(gameId)) this.favorites.delete(gameId);
        else this.favorites.add(gameId);
        this.saveFavorites();
    }

    setupExtraControls() {
        const favOnly = document.getElementById('favorites-only');
        if (favOnly) {
            favOnly.addEventListener('change', () => this.applyFilters());
        }
        const randomBtn = document.getElementById('random-game-btn');
        if (randomBtn) {
            randomBtn.addEventListener('click', () => {
                const currentCards = Array.from(document.querySelectorAll('#games-grid .game-card'));
                const pool = currentCards.length ? currentCards : [];
                if (!pool.length) return;
                const pick = pool[Math.floor(Math.random() * pool.length)];
                const id = pick.getAttribute('data-game-id');
                this.showSection('games');
                this.showGameModal(id);
            });
        }
    }

    

    loadCommunityContent(tabName) {
        const tabContent = document.getElementById(`${tabName}-tab`);
        if (!tabContent) return;
        
        switch(tabName) {
            case 'forums':
                tabContent.innerHTML = this.generateForumsHTML();
                break;
            case 'polls':
                tabContent.innerHTML = this.generatePollsHTML();
                break;
            case 'fanart':
                tabContent.innerHTML = this.generateFanArtHTML();
                break;
            case 'leaderboard':
                tabContent.innerHTML = this.generateLeaderboardHTML();
                break;
        }
    }

    generateForumsHTML() {
        return `
            <div class="forums-list">
                <div class="forum-category">
                    <h3><i class="fas fa-gamepad"></i> General Gaming</h3>
                    <div class="forum-topics">
                        <div class="topic-item">
                            <div class="topic-info">
                                <h4>Best games of 2024 discussion</h4>
                                <p>What are your top picks for this year?</p>
                                <div class="topic-meta">
                                    <span>by GameMaster92</span>
                                    <span>47 replies</span>
                                    <span>2 hours ago</span>
                                </div>
                            </div>
                        </div>
                        <div class="topic-item">
                            <div class="topic-info">
                                <h4>Looking for co-op game recommendations</h4>
                                <p>Need suggestions for games to play with friends</p>
                                <div class="topic-meta">
                                    <span>by CoopGamer</span>
                                    <span>23 replies</span>
                                    <span>5 hours ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="forum-category">
                    <h3><i class="fas fa-trophy"></i> Game-Specific</h3>
                    <div class="forum-topics">
                        <div class="topic-item">
                            <div class="topic-info">
                                <h4>Cyberpunk 2077 - Best builds for 2.0</h4>
                                <p>Share your favorite character builds</p>
                                <div class="topic-meta">
                                    <span>by CyberNinja</span>
                                    <span>89 replies</span>
                                    <span>1 day ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generatePollsHTML() {
        return `
            <div class="polls-container">
                <div class="poll-item">
                    <h3>Game of the Year 2024</h3>
                    <div class="poll-options">
                        <div class="poll-option">
                            <span class="option-text">Baldur's Gate 3</span>
                            <div class="option-bar">
                                <div class="option-fill" style="width: 45%"></div>
                            </div>
                            <span class="option-percentage">45%</span>
                        </div>
                        <div class="poll-option">
                            <span class="option-text">Spider-Man 2</span>
                            <div class="option-bar">
                                <div class="option-fill" style="width: 30%"></div>
                            </div>
                            <span class="option-percentage">30%</span>
                        </div>
                        <div class="poll-option">
                            <span class="option-text">Alan Wake 2</span>
                            <div class="option-bar">
                                <div class="option-fill" style="width: 25%"></div>
                            </div>
                            <span class="option-percentage">25%</span>
                        </div>
                    </div>
                    <div class="poll-meta">
                        <span>2,847 votes</span>
                        <button class="btn-primary">Vote</button>
                    </div>
                </div>
                
                <div class="poll-item">
                    <h3>Best Gaming Platform</h3>
                    <div class="poll-options">
                        <div class="poll-option">
                            <span class="option-text">PC</span>
                            <div class="option-bar">
                                <div class="option-fill" style="width: 55%"></div>
                            </div>
                            <span class="option-percentage">55%</span>
                        </div>
                        <div class="poll-option">
                            <span class="option-text">PlayStation 5</span>
                            <div class="option-bar">
                                <div class="option-fill" style="width: 25%"></div>
                            </div>
                            <span class="option-percentage">25%</span>
                        </div>
                        <div class="poll-option">
                            <span class="option-text">Xbox Series X</span>
                            <div class="option-bar">
                                <div class="option-fill" style="width: 20%"></div>
                            </div>
                            <span class="option-percentage">20%</span>
                        </div>
                    </div>
                    <div class="poll-meta">
                        <span>1,523 votes</span>
                        <button class="btn-primary">Vote</button>
                    </div>
                </div>
            </div>
        `;
    }

    generateFanArtHTML() {
        return `
            <div class="fanart-gallery">
                <div class="gallery-filters">
                    <button class="filter-btn active">All</button>
                    <button class="filter-btn">Fan Art</button>
                    <button class="filter-btn">Mods</button>
                    <button class="filter-btn">Screenshots</button>
                </div>
                
                <div class="gallery-grid">
                    <div class="gallery-item">
                        <div class="gallery-image">
                            <div class="image-placeholder">
                                <i class="fas fa-image"></i>
                            </div>
                        </div>
                        <div class="gallery-info">
                            <h4>Cyberpunk Night City Art</h4>
                            <p>by DigitalArtist</p>
                            <div class="gallery-stats">
                                <span><i class="fas fa-heart"></i> 234</span>
                                <span><i class="fas fa-eye"></i> 1.2K</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="gallery-item">
                        <div class="gallery-image">
                            <div class="image-placeholder">
                                <i class="fas fa-cog"></i>
                            </div>
                        </div>
                        <div class="gallery-info">
                            <h4>Enhanced Graphics Mod</h4>
                            <p>by ModMaster</p>
                            <div class="gallery-stats">
                                <span><i class="fas fa-download"></i> 5.7K</span>
                                <span><i class="fas fa-star"></i> 4.8</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateLeaderboardHTML() {
        return `
            <div class="leaderboard">
                <div class="leaderboard-header">
                    <h3><i class="fas fa-crown"></i> Top Contributors</h3>
                    <select class="leaderboard-filter">
                        <option>This Month</option>
                        <option>All Time</option>
                        <option>This Week</option>
                    </select>
                </div>
                
                <div class="leaderboard-list">
                    <div class="leaderboard-item rank-1">
                        <div class="rank-badge">1</div>
                        <div class="contributor-info">
                            <h4>GameMaster92</h4>
                            <p>Lore Master • Guide Creator</p>
                        </div>
                        <div class="contributor-stats">
                            <span>1,247 contributions</span>
                            <span>15.2K reputation</span>
                        </div>
                    </div>
                    
                    <div class="leaderboard-item rank-2">
                        <div class="rank-badge">2</div>
                        <div class="contributor-info">
                            <h4>MapExplorer</h4>
                            <p>Map Maker • Achievement Hunter</p>
                        </div>
                        <div class="contributor-stats">
                            <span>892 contributions</span>
                            <span>12.8K reputation</span>
                        </div>
                    </div>
                    
                    <div class="leaderboard-item rank-3">
                        <div class="rank-badge">3</div>
                        <div class="contributor-info">
                            <h4>StrategyPro</h4>
                            <p>Guide Master • Build Expert</p>
                        </div>
                        <div class="contributor-stats">
                            <span>756 contributions</span>
                            <span>9.4K reputation</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    loadSampleData() {
        // Sample Games Data
        this.games = [
            {
                id: 'cyberpunk2077',
                title: 'Cyberpunk 2077',
                description: 'Open-world action-adventure story set in Night City',
                platform: 'PC, PlayStation, Xbox',
                genre: 'RPG',
                releaseDate: '2020',
                rating: 8.5,
                icon: 'fas fa-robot',
                image: './346844-Cyberpunk-2077-Video-Game-Female-V.jpg',
                tags: ['RPG', 'Open World', 'Sci-Fi'],
                overview: 'Cyberpunk 2077 is set in the neon-soaked metropolis of Night City where mega-corps and street gangs shape everyday life. You play as V, a mercenary climbing the ladder in a world of body mods, black-market tech, and moral gray areas. The 2.0 update refines combat and perks, creating a fast, kinetic shooter-RPG hybrid with strong narrative choices.',
                gameplay: 'Cyberpunk 2077 is an action role-playing video game played in a first-person perspective as V, a mercenary whose voice, face, hairstyles, body type and modifications, background, and clothing are customisable.',
                characters: [
                    { name: 'V', description: 'Main protagonist, customizable mercenary' },
                    { name: 'Johnny Silverhand', description: 'Digital ghost of a rockerboy terrorist' },
                    { name: 'Judy Alvarez', description: 'Braindance virtuoso and key Mox member' },
                    { name: 'Panam Palmer', description: 'Aldecaldos nomad and elite sharpshooter' }
                ],
                maps: [
                    { name: 'Night City', description: 'The sprawling metropolis where the game takes place' }
                ],
                trivia: [
                    'Johnny Silverhand is portrayed by Keanu Reeves.',
                    'Patch 2.0 overhauled perks and the police system.',
                    'Night City is divided into six regions, each with distinct factions.'
                ],
                achievements: [
                    { name: 'The Star', description: 'Complete The Star ending', progress: 100, unlocked: true, icon: 'fas fa-star' },
                    { name: 'Breathtaking', description: 'Take your first steps in Night City', progress: 100, unlocked: true, icon: 'fas fa-walking' }
                ]
            },
            {
                id: 'eldenring',
                title: 'Elden Ring',
                description: 'Action RPG fantasy game in the Lands Between',
                platform: 'PC, PlayStation, Xbox',
                genre: 'Action RPG',
                releaseDate: '2022',
                rating: 9.5,
                icon: 'fas fa-ring',
                image: './maxresdefault.jpg',
                tags: ['Souls-like', 'Fantasy', 'Open World'],
                overview: 'Elden Ring sends you across the Lands Between to restore the shattered Elden Ring. Explore a seamless open world packed with legacy dungeons, field bosses, and secrets. Build your Tarnished your way with deep stats, Ashes of War, and dozens of unique weapon classes.',
                gameplay: 'Elden Ring features a vast open world with seamless exploration and challenging combat.',
                characters: [
                    { name: 'Tarnished', description: 'The player character seeking to become Elden Lord' },
                    { name: 'Melina', description: 'Mysterious maiden who aids the Tarnished' },
                    { name: 'Ranni the Witch', description: 'A Lunar Princess entwined with a fateful scheme' },
                    { name: 'Starscourge Radahn', description: 'Demigod general wielding gravitational might' },
                    { name: 'Maliketh', description: 'The Black Blade guarding a terrible secret' }
                ],
                trivia: [
                    'Co-created by Hidetaka Miyazaki and George R. R. Martin.',
                    'Features a seamless open world called the Lands Between.'
                ]
            },
            {
                id: 'baldursgate3',
                title: "Baldur's Gate 3",
                description: 'Turn-based RPG based on Dungeons & Dragons',
                platform: 'PC, PlayStation',
                genre: 'RPG',
                releaseDate: '2023',
                rating: 9.8,
                icon: 'fas fa-dice-d20',
                image: 'https://images.unsplash.com/photo-1618588507085-c79565432917?q=80&w=1600&auto=format&fit=crop',
                tags: ['RPG', 'Turn-based', 'Fantasy', 'D&D'],
                overview: 'Baldur\'s Gate 3 adapts D\u0026D 5e into a reactive, cinematic adventure. Your party navigates branching quests, tactical turn-based combat, and rich companion storylines, with almost every decision impacting relationships and outcomes.',
                characters: [
                    { name: 'Astarion', description: 'High-elf rogue cursed with vampiric hunger' },
                    { name: 'Shadowheart', description: 'Cleric of Shar with a hidden past' },
                    { name: 'Lae\'zel', description: 'Githyanki warrior loyal to her people' },
                    { name: 'Gale', description: 'Wizard carrying a volatile magical burden' },
                    { name: 'Karlach', description: 'Fiery tiefling barbarian with a mechanical heart' }
                ],
                trivia: [
                    'Based on Dungeons & Dragons 5th Edition rules.',
                    'Developed by Larian Studios, creators of Divinity: Original Sin.'
                ]
            },
            {
                id: 'hogwartslegacy',
                title: 'Hogwarts Legacy',
                description: 'Action RPG set in the Harry Potter universe',
                platform: 'PC, PlayStation, Xbox, Nintendo Switch',
                genre: 'Action RPG',
                releaseDate: '2023',
                rating: 8.2,
                icon: 'fas fa-magic',
                image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1600&auto=format&fit=crop',
                tags: ['RPG', 'Magic', 'Open World', 'Harry Potter'],
                overview: 'Set in the 1800s, Hogwarts Legacy lets you live the wizarding life as a fifth-year student with ancient magic. Attend classes, brew potions, tame beasts, and explore a sprawling castle and surrounding highlands full of secrets.',
                characters: [
                    { name: 'The Player (Fifth-Year)', description: 'A student who can perceive ancient magic' },
                    { name: 'Professor Eleazar Fig', description: 'Mentor guiding your investigation' },
                    { name: 'Sebastian Sallow', description: 'A Slytherin student drawn to dark secrets' },
                    { name: 'Poppy Sweeting', description: 'A Hufflepuff who cares deeply for beasts' },
                    { name: 'Ominis Gaunt', description: 'A Slytherin from a notorious line' }
                ],
                trivia: [
                    'Set in the 1800s, long before Harry Potter’s time.',
                    'Players are sorted into Hogwarts houses and attend classes.'
                ]
            },
            {
                id: 'witcher3',
                title: 'The Witcher 3: Wild Hunt',
                description: 'Story-driven open-world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.',
                platform: 'PC, PlayStation, Xbox, Nintendo Switch',
                genre: 'RPG',
                releaseDate: '2015',
                rating: 9.7,
                icon: 'fas fa-wolf-pack-battalion',
                image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop',
                tags: ['RPG', 'Open World', 'Fantasy'],
                overview: 'Geralt of Rivia roams war-torn lands to find his adopted daughter, Ciri, while the spectral Wild Hunt closes in. Mature storytelling, layered quest design, and meaningful choices define this genre classic.',
                characters: [
                    { name: 'Geralt of Rivia', description: 'A witcher, a monster slayer for hire.' },
                    { name: 'Ciri', description: 'Geralt’s adopted daughter with Elder Blood.' },
                    { name: 'Yennefer of Vengerberg', description: 'Powerful sorceress and Geralt’s true love' },
                    { name: 'Triss Merigold', description: 'Kind-hearted sorceress and ally of Geralt' }
                ],
                maps: [{ name: 'Velen', description: 'War-ravaged No Man’s Land.' }],
                trivia: [
                    'Won over 800 awards, including multiple Game of the Year awards.'
                ]
            },
            {
                id: 'spiderman2',
                title: 'Marvel’s Spider-Man 2',
                description: 'Swing, jump and utilize the new Web Wings to travel across an expanded Marvel’s New York.',
                platform: 'PlayStation 5',
                genre: 'Action',
                releaseDate: '2023',
                rating: 9.0,
                icon: 'fas fa-spider',
                image: 'https://images.unsplash.com/photo-1581789467576-61a1f91e8cd4?q=80&w=1600&auto=format&fit=crop',
                tags: ['Action', 'Superhero', 'Open World'],
                overview: 'Peter Parker and Miles Morales face new threats across a larger, denser New York. Web Wings, tag-team combat, and a darker symbiote storyline power a cinematic superhero adventure.',
                characters: [
                    { name: 'Peter Parker', description: 'The original Spider-Man balancing life and duty' },
                    { name: 'Miles Morales', description: 'Burgeoning Spider-Man with electrifying powers' },
                    { name: 'Venom', description: 'A dangerous union of symbiote and host' },
                    { name: 'Kraven the Hunter', description: 'Relentless predator seeking worthy prey' },
                    { name: 'Mary Jane Watson', description: 'Journalist and close ally of Peter' }
                ]
            },
            {
                id: 'rdr2',
                title: 'Red Dead Redemption 2',
                description: 'Epic tale of life in America at the dawn of the modern age.',
                platform: 'PC, PlayStation, Xbox',
                genre: 'Action Adventure',
                releaseDate: '2018',
                rating: 9.6,
                icon: 'fas fa-hat-cowboy',
                image: 'https://images.unsplash.com/photo-1534210623496-8e5309f36c1b?q=80&w=1600&auto=format&fit=crop',
                tags: ['Open World', 'Western', 'Story'],
                overview: 'Arthur Morgan and the Van der Linde gang struggle to survive as the West modernizes. RDR2 blends cinematic storytelling with immersive simulation—camp life, honor, and choice shape a sweeping American saga.',
                characters: [
                    { name: 'Arthur Morgan', description: 'Senior member of the Van der Linde gang' },
                    { name: 'Dutch van der Linde', description: 'Charismatic yet unstable gang leader' },
                    { name: 'John Marston', description: 'Former outlaw and Arthur’s friend' },
                    { name: 'Sadie Adler', description: 'Widow-turned-outlaw with fierce resolve' },
                    { name: 'Micah Bell', description: 'Volatile gunslinger with shifting loyalties' }
                ]
            }
        ];

        // Auto-map local images to games if available and not already set
        const imageMap = {
            cyberpunk2077: './346844-Cyberpunk-2077-Video-Game-Female-V.jpg',
            eldenring: './maxresdefault.jpg',
            baldursgate3: './Baldurs-Gate-3-header-scaled.jpg',
            hogwartslegacy: './Hogwarts legacy.jpg',
            spiderman2: './marvels-spider-man-2.jpg',
            rdr2: './Reddead redemption 2.jpg',
            witcher3: './The witcher .jpg'
        };
        this.games = this.games.map(g => ({
            ...g,
            image: imageMap[g.id] || g.image
        }));
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.gameWiki = new GameWiki();
    // Link Featured Articles to Games section and open details
    document.querySelectorAll('.featured-card[data-game]').forEach(card => {
        card.addEventListener('click', () => {
            const gameId = card.getAttribute('data-game');
            if (!gameId) return;
            window.gameWiki.showSection('games');
            // Open the modal for the selected game
            window.gameWiki.showGameModal(gameId);
        });
    });
    
    // Setup game modal tabs
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('section-tab')) {
            const tabName = e.target.dataset.tab;
            
            // Update active tab
            document.querySelectorAll('.section-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Show corresponding content
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            document.getElementById(`${tabName}-tab`).classList.add('active');
        }
    });
    
    // Add some interactive animations
    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('featured-card') || 
            e.target.classList.contains('game-card')) {
            e.target.style.transform = 'translateY(-5px)';
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.classList.contains('featured-card') || 
            e.target.classList.contains('game-card')) {
            e.target.style.transform = 'translateY(0)';
        }
    });
});

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Removed AI summary utilities for encyclopedia-only scope