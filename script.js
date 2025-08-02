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
    const playPauseBtns = [
        document.getElementById('play-pause-btn'),
        document.getElementById('play-pause-btn-mobile')
    ];
    const prevBtns = [
        document.getElementById('prev-btn'),
        document.getElementById('prev-btn-mobile')
    ];
    const nextBtns = [
        document.getElementById('next-btn'),
        document.getElementById('next-btn-mobile')
    ];
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeSpan = document.getElementById('current-time');
    const durationSpan = document.getElementById('duration');

    let isPlaying = false;
    let currentSongIndex = 0;

    // Lista de músicas
    const songs = [
        {
            src: '/music/Izzie-dancing-queen.mp3',
            title: 'Dancing Queen',
            artist: 'Izzie Naylor',
            image: '/assets/izzie.png'
        },
        {
            src: '/music/Izzie-yellow-coldplay.mp3',
            title: 'Yellow',
            artist: 'Izzie Naylor',
            image: '/assets/izzie.png'
        },
        {
            src: '/music/izzie-remember-me.mp3',
            title: 'Remember Me',
            artist: 'Izzie Naylor',
            image: '/assets/izzie.png'
        }
    ];

    // Função para carregar música
    function loadSong(index) {
        const song = songs[index];
        audio.src = song.src;
        
        // Atualizar interface
        const img = document.querySelector('#music-player img');
        const title = document.querySelector('#music-player h4');
        const artist = document.querySelector('#music-player p');
        
        if (img) img.src = song.image;
        if (title) title.textContent = song.title;
        if (artist) artist.textContent = song.artist;
        
        console.log('🎵 Música carregada:', song.title);
    }

    // Função para tocar/pausar
    function togglePlayPause() {
        if (isPlaying) {
            audio.pause();
            playPauseBtns.forEach(btn => {
                if (btn) {
                    const icon = btn.querySelector('i');
                    if (icon) icon.className = 'fas fa-play text-xs sm:text-sm xl:text-base';
                }
            });
            isPlaying = false;
            console.log('⏸️ Música pausada');
        } else {
            audio.play().then(() => {
                playPauseBtns.forEach(btn => {
                    if (btn) {
                        const icon = btn.querySelector('i');
                        if (icon) icon.className = 'fas fa-pause text-xs sm:text-sm xl:text-base';
                    }
                });
                isPlaying = true;
                console.log('▶️ Música tocando');
            }).catch(error => {
                console.error('❌ Erro ao tocar música:', error);
            });
        }
    }

    // Função para música anterior
    function prevSong() {
        currentSongIndex = currentSongIndex > 0 ? currentSongIndex - 1 : songs.length - 1;
        loadSong(currentSongIndex);
        if (isPlaying) {
            audio.play();
        }
        console.log('⏮️ Música anterior:', songs[currentSongIndex].title);
    }

    // Função para próxima música
    function nextSong() {
        currentSongIndex = currentSongIndex < songs.length - 1 ? currentSongIndex + 1 : 0;
        loadSong(currentSongIndex);
        if (isPlaying) {
            audio.play();
        }
        console.log('⏭️ Próxima música:', songs[currentSongIndex].title);
    }

    // Event listeners para botões
    playPauseBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', togglePlayPause);
    });

    prevBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', prevSong);
    });

    nextBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', nextSong);
    });

    // Barra de progresso clicável
    if (progressContainer) {
        progressContainer.addEventListener('click', function(e) {
            const containerWidth = progressContainer.offsetWidth;
            const clickX = e.offsetX;
            const duration = audio.duration;
            
            if (duration) {
                const newTime = (clickX / containerWidth) * duration;
                audio.currentTime = newTime;
                console.log('⏯️ Tempo alterado para:', formatTime(newTime));
            }
        });
    }

    // Atualizar barra de progresso
    if (audio) {
        audio.addEventListener('timeupdate', function() {
            if (audio.duration) {
                const progress = (audio.currentTime / audio.duration) * 100;
                if (progressBar) progressBar.style.width = progress + '%';
                if (currentTimeSpan) currentTimeSpan.textContent = formatTime(audio.currentTime);
            }
        });

        audio.addEventListener('loadedmetadata', function() {
            if (durationSpan) durationSpan.textContent = formatTime(audio.duration);
        });

        // Auto-play próxima música quando terminar
        audio.addEventListener('ended', function() {
            nextSong();
        });

        // Auto-play quando a página carregar
        audio.addEventListener('canplaythrough', function() {
            if (!isPlaying) {
                console.log('🚀 Iniciando reprodução automática...');
                togglePlayPause();
            }
        }, { once: true });
    }

    // Função para formatar tempo
    function formatTime(time) {
        if (isNaN(time)) return '0:00';
        
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Inicializar com a primeira música
    loadSong(currentSongIndex);
    
    console.log('🎵 Music Player inicializado com auto-play');
});