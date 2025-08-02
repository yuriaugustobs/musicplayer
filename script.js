// Efeito de Neve
document.addEventListener('DOMContentLoaded', function() {
    const snowContainer = document.getElementById('snow-container');
    const numberOfSnowflakes = 100;
    
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        // Posição horizontal aleatória
        const leftPosition = Math.random() * 100;
        snowflake.style.left = leftPosition + '%';
        
        // Tamanho aleatório entre 2px e 8px
        const size = Math.random() * 6 + 2;
        snowflake.style.width = size + 'px';
        snowflake.style.height = size + 'px';
        
        // Delay aleatório para iniciar a animação
        const delay = Math.random() * 5;
        snowflake.style.animationDelay = delay + 's';
        
        // Duração aleatória da animação
        const duration = Math.random() * 8 + 6; // Entre 6s e 14s
        snowflake.style.animationDuration = duration + 's';
        
        // Opacidade aleatória
        const opacity = Math.random() * 0.6 + 0.4; // Entre 0.4 e 1.0
        snowflake.style.opacity = opacity;
        
        return snowflake;
    }
    
    // Criar flocos de neve iniciais
    for (let i = 0; i < numberOfSnowflakes; i++) {
        const snowflake = createSnowflake();
        snowContainer.appendChild(snowflake);
    }
    
    // Função para remover flocos antigos e adicionar novos continuamente
    setInterval(() => {
        const snowflakes = snowContainer.children;
        if (snowflakes.length > numberOfSnowflakes * 1.5) {
            // Remove flocos em excesso
            for (let i = 0; i < 10; i++) {
                if (snowflakes[i]) {
                    snowContainer.removeChild(snowflakes[i]);
                }
            }
        }
        
        // Adiciona novos flocos
        for (let i = 0; i < 5; i++) {
            const snowflake = createSnowflake();
            snowContainer.appendChild(snowflake);
        }
    }, 2000);
});

// Controle do efeito de neve (opcional)
window.toggleSnow = function() {
    const snowContainer = document.getElementById('snow-container');
    if (snowContainer.style.display === 'none') {
        snowContainer.style.display = 'block';
    } else {
        snowContainer.style.display = 'none';
    }
};

// Efeito Spotlight que segue o mouse
document.addEventListener('DOMContentLoaded', function() {
    const heroContainer = document.getElementById('container-for-hero-with-menu');
    
    // Criar overlay para o spotlight
    const spotlightOverlay = document.createElement('div');
    spotlightOverlay.id = 'spotlight-overlay';
    spotlightOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle 300px at 50% 50%, transparent 0%, rgba(43, 96, 138, 0.8) 70%);
        pointer-events: none;
        z-index: 50;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Adicionar overlay ao container do hero
    heroContainer.appendChild(spotlightOverlay);
    
    // Função para atualizar a posição do spotlight
    function updateSpotlight(e) {
        const rect = heroContainer.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        spotlightOverlay.style.background = `radial-gradient(circle 650px at ${x}% ${y}%, transparent 0%, transparent 20%, rgba(43, 96, 138, 0.6) 70%)`;
    }
    
    // Event listeners para o mouse
    heroContainer.addEventListener('mouseenter', function() {
        spotlightOverlay.style.opacity = '1';
    });
    
    heroContainer.addEventListener('mouseleave', function() {
        spotlightOverlay.style.opacity = '0';
    });
    
    heroContainer.addEventListener('mousemove', updateSpotlight);
});

// Music Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio-element');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playPauseBtnMobile = document.getElementById('play-pause-btn-mobile');
    const prevBtn = document.getElementById('prev-btn');
    const prevBtnMobile = document.getElementById('prev-btn-mobile');
    const nextBtn = document.getElementById('next-btn');
    const nextBtnMobile = document.getElementById('next-btn-mobile');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const songTitle = document.querySelector('#music-player h4');
    const artistName = document.querySelector('#music-player p');
    
    let isPlaying = false;
    let currentSongIndex = 0;
    
    // Playlist com as músicas
    const playlist = [
        {
            src: '/music/Izzie-dancing-queen.mp3',
            title: 'Dancing Queen',
            artist: 'Izzie Naylor',
            cover: '/assets/izzie.png'
        },
        {
            src: '/music/Izzie-yellow-coldplay.mp3',
            title: 'Yellow',
            artist: 'Izzie Naylor',
            cover: '/assets/izzie.png'
        },
        {
            src: '/music/izzie-remember-me.mp3',
            title: 'Remember Me',
            artist: 'Izzie Naylor',
            cover: '/assets/izzie.png'
        }
    ];
    
    // Função para carregar uma música
    function loadSong(index) {
        const song = playlist[index];
        audio.src = song.src;
        songTitle.textContent = song.title;
        artistName.textContent = song.artist;
        
        // Atualizar a imagem se necessário
        const coverImg = document.querySelector('#music-player img');
        coverImg.src = song.cover;
        coverImg.alt = `${song.artist} - ${song.title}`;
        
        // Reset progress
        progressBar.style.width = '0%';
        currentTimeEl.textContent = '0:00';
        durationEl.textContent = '0:00';
    }
    
    // Função para sincronizar botões play/pause
    function updatePlayPauseButtons(playing) {
        const icon = playing ? '<i class="fas fa-pause text-sm"></i>' : '<i class="fas fa-play text-sm"></i>';
        const iconMobile = playing ? '<i class="fas fa-pause text-xs"></i>' : '<i class="fas fa-play text-xs"></i>';
        
        if (playPauseBtn) playPauseBtn.innerHTML = icon;
        if (playPauseBtnMobile) playPauseBtnMobile.innerHTML = iconMobile;
    }
    
    // Carregar primeira música
    loadSong(currentSongIndex);
    
    // Play/Pause functionality for both buttons
    function togglePlayPause() {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
        } else {
            audio.play();
            isPlaying = true;
        }
        updatePlayPauseButtons(isPlaying);
    }
    
    if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);
    if (playPauseBtnMobile) playPauseBtnMobile.addEventListener('click', togglePlayPause);
    
    // Update progress bar
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = progressPercent + '%';
            
            currentTimeEl.textContent = formatTime(audio.currentTime);
        }
    });
    
    // Set duration when loaded
    audio.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audio.duration);
    });
    
    // Click on progress bar to seek
    progressContainer.addEventListener('click', (e) => {
        const clickX = e.offsetX;
        const width = progressContainer.offsetWidth;
        const duration = audio.duration;
        
        audio.currentTime = (clickX / width) * duration;
    });
    
    // Format time helper function
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Previous button functionality for both buttons
    function previousSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        
        if (isPlaying) {
            audio.play();
        }
    }
    
    if (prevBtn) prevBtn.addEventListener('click', previousSong);
    if (prevBtnMobile) prevBtnMobile.addEventListener('click', previousSong);
    
    // Next button functionality for both buttons
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        
        if (isPlaying) {
            audio.play();
        }
    }
    
    if (nextBtn) nextBtn.addEventListener('click', nextSong);
    if (nextBtnMobile) nextBtnMobile.addEventListener('click', nextSong);
    
    // Auto next when song ends
    audio.addEventListener('ended', () => {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        
        if (isPlaying) {
            audio.play();
        }
    });
});