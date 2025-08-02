// ====== MUSIC DATABASE ======
const musicDatabase = [
    {
        id: 1,
        title: "Blackout",
        artist: "Muse",
        album: "Absolution",
        duration: "4:22",
        src: "/musics-database/Muse - Blackout.mp3",
        cover: "https://www.vagalume.com.br/muse/discografia/absolution.webp",
        year: "2003"
    },
    {
        id: 2,
        title: "Hysteria",
        artist: "Muse",
        album: "Absolution", 
        duration: "3:47",
        src: "/musics-database/Muse - Hysteria.mp3",
        cover: "https://www.vagalume.com.br/muse/discografia/absolution.webp",
        year: "2003"
    },
    {
        id: 3,
        title: "Supermassive Black Hole",
        artist: "Muse",
        album: "Black Holes and Revelations",
        duration: "3:30",
        src: "/musics-database/Muse - Supermassive Black Hole.mp3",
        cover: "https://www.vagalume.com.br/muse/discografia/black-holes-and-revelations.webp",
        year: "2006"
    },
    {
        id: 4,
        title: "Creep",
        artist: "Radiohead",
        album: "Pablo Honey",
        duration: "3:56",
        src: "/musics-database/Radiohead - Creep.mp3",
        cover: "https://www.vagalume.com.br/radiohead/discografia/pablo-honey.webp",
        year: "1993"
    },
    {
        id: 5,
        title: "Yellow",
        artist: "Coldplay",
        album: "Parachutes",
        duration: "4:26",
        src: "/musics-database/Coldplay - Yellow.mp3",
        cover: "https://www.vagalume.com.br/coldplay/discografia/parachutes.webp",
        year: "2000"
    },
    {
        id: 6,
        title: "Dancing Queen",
        artist: "Izzie Naylor",
        album: "Cover Collection",
        duration: "3:50",
        src: "./music/Izzie-dancing-queen.mp3",
        cover: "./assets/izzie.png",
        year: "2023"
    },
    {
        id: 7,
        title: "Yellow",
        artist: "Izzie Naylor", 
        album: "Coldplay Covers",
        duration: "4:15",
        src: "./music/Izzie-yellow-coldplay.mp3",
        cover: "./assets/izzie.png",
        year: "2023"
    },
    {
        id: 8,
        title: "Remember Me",
        artist: "Izzie Naylor",
        album: "Original Songs",
        duration: "3:28",
        src: "./music/izzie-remember-me.mp3",
        cover: "./assets/izzie.png",
        year: "2023"
    }
];

// ====== LOAD EXTERNAL MUSIC DATABASE ======
async function loadExternalMusicDatabase() {
    try {
        console.log('Tentando carregar banco de dados externo...');
        const response = await fetch('./musics-database/music-library.json');
        
        if (response.ok) {
            const externalMusic = await response.json();
            console.log('JSON carregado:', externalMusic);
            
            // Adiciona músicas externas ao banco principal
            externalMusic.forEach(song => {
                // Verifica se a música já existe para evitar duplicatas
                if (!musicDatabase.find(existing => existing.id === song.id)) {
                    // Converte string id para number se necessário
                    const newSong = {
                        ...song,
                        id: musicDatabase.length + 1 // Gera novo ID numérico
                    };
                    musicDatabase.push(newSong);
                }
            });
            
            console.log('Banco de dados externo carregado:', externalMusic.length, 'músicas adicionadas');
            console.log('Total de músicas:', musicDatabase.length);
            
            // Atualiza a playlist com as novas músicas
            updatePlaylistDisplay();
        } else {
            console.log('Resposta não OK:', response.status, response.statusText);
        }
    } catch (error) {
        console.log('Erro ao carregar banco externo:', error);
        console.log('Usando apenas músicas padrão');
    }
}

// ====== SELECT SONG FUNCTION ======
function selectSong(index) {
    if (index < 0 || index >= musicDatabase.length) return;
    
    console.log('🎵 Selecionando música:', index, musicDatabase[index].title);
    loadSong(index);
    updatePlaylistDisplay(); // Atualiza a visualização da playlist
}

// ====== UPDATE PLAYLIST DISPLAY ======
function updatePlaylistDisplay() {
    const musicListContainer = document.getElementById('music-list');
    const mobileMusicListContainer = document.getElementById('mobile-music-list');
    
    if (musicListContainer) {
        musicListContainer.innerHTML = '';
        
        musicDatabase.forEach((song, index) => {
            const listItem = document.createElement('li');
            listItem.className = `flex items-center gap-3 hover:bg-gray-800/50 p-2 rounded cursor-pointer transition-colors ${currentSongIndex === index ? 'bg-gray-800/70 border-l-2 border-blue-400' : ''}`;
            
            // Adicionar event listener diretamente
            listItem.addEventListener('click', () => selectSong(index));
            
            const isCurrentSong = currentSongIndex === index;
            const numberColor = isCurrentSong ? 'text-blue-400' : 'text-gray-500';
            const playIcon = isCurrentSong ? '<i class="fas fa-play text-blue-400 text-xs ml-auto"></i>' : '';
            
            listItem.innerHTML = `
                <span class="${numberColor} text-xs w-6 text-center">${String(index + 1).padStart(2, '0')}</span>
                <img src="${song.cover}" alt="${song.title}" class="w-10 h-10 rounded object-cover">
                <div class="flex flex-col flex-1 min-w-0">
                    <h4 class="text-white text-sm font-medium truncate">${song.title}</h4>
                    <p class="text-gray-400 text-xs truncate">${song.artist}</p>
                </div>
                <span class="text-gray-400 text-xs hidden md:block">${song.duration}</span>
                ${playIcon}
            `;
            
            musicListContainer.appendChild(listItem);
        });
    }
    
    // Atualizar também a lista mobile
    if (mobileMusicListContainer) {
        mobileMusicListContainer.innerHTML = '';
        
        musicDatabase.forEach((song, index) => {
            const listItem = document.createElement('li');
            listItem.className = `flex items-center gap-3 hover:bg-gray-800/50 p-3 rounded cursor-pointer transition-colors ${currentSongIndex === index ? 'bg-gray-800/70 border-l-2 border-blue-400' : ''}`;
            
            // Adicionar event listener diretamente para mobile
            listItem.addEventListener('click', () => {
                console.log('📱 Clique mobile na música:', index, song.title);
                selectSong(index);
                // Fechar o menu mobile após selecionar uma música
                const mobilePlaylist = document.getElementById('mobile-playlist');
                if (mobilePlaylist) {
                    mobilePlaylist.classList.add('-translate-x-full');
                }
            });
            
            const isCurrentSong = currentSongIndex === index;
            const numberColor = isCurrentSong ? 'text-blue-400' : 'text-gray-500';
            const playIcon = isCurrentSong ? '<i class="fas fa-play text-blue-400 text-xs ml-auto"></i>' : '';
            
            listItem.innerHTML = `
                <span class="${numberColor} text-xs w-6 text-center">${String(index + 1).padStart(2, '0')}</span>
                <img src="${song.cover}" alt="${song.title}" class="w-12 h-12 rounded object-cover">
                <div class="flex flex-col flex-1 min-w-0">
                    <h4 class="text-white text-sm font-medium truncate">${song.title}</h4>
                    <p class="text-gray-400 text-xs truncate">${song.artist}</p>
                    <p class="text-gray-400 text-xs truncate">${song.album}</p>
                </div>
                <span class="text-gray-400 text-xs">${song.duration}</span>
                ${playIcon}
            `;
            
            mobileMusicListContainer.appendChild(listItem);
        });
    }
    
    console.log('✅ Playlist atualizada com', musicDatabase.length, 'músicas');
}

// ====== GLOBAL VARIABLES ======
let currentSongIndex = 0; // Começar com a primeira música (Dancing Queen - Izzie Naylor)
let isPlaying = false;
let audioElement = null;
let currentVolume = 0.75;

// ====== AUDIO ELEMENT CREATION ======
function createAudioElement() {
    if (!audioElement) {
        audioElement = document.createElement('audio');
        audioElement.preload = 'metadata';
        audioElement.volume = currentVolume;
        
        // Event listeners do audio
        audioElement.addEventListener('loadedmetadata', updateDuration);
        audioElement.addEventListener('timeupdate', updateProgress);
        audioElement.addEventListener('ended', autoPlayNextSong); // Usar autoPlayNextSong para continuar tocando
        audioElement.addEventListener('error', handleAudioError);
        
        document.body.appendChild(audioElement);
    }
    return audioElement;
}

// ====== MUSIC PLAYER FUNCTIONS ======
function loadSong(index) {
    if (index < 0 || index >= musicDatabase.length) return;
    
    const song = musicDatabase[index];
    const audio = createAudioElement();
    
    // Parar música atual se estiver tocando
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    }
    
    // Carregar nova música
    audio.src = song.src;
    currentSongIndex = index;
    
    // Resetar botão play/pause para estado inicial (play)
    resetPlayButton();
    
    // Resetar barra de progresso
    resetProgressBar();
    
    // Atualizar informações no player
    updatePlayerDisplay(song);
    updatePlaylistHighlight(index);
}

function updatePlayerDisplay(song) {
    // Atualizar player principal
    const playerImage = document.querySelector('#player img');
    const playerTitle = document.querySelector('#player h3');
    const playerArtist = document.querySelector('#player p');
    
    if (playerImage) playerImage.src = song.cover;
    if (playerTitle) playerTitle.textContent = song.title;
    if (playerArtist) playerArtist.textContent = song.artist;
}

// ====== RESET FUNCTIONS ======
function resetPlayButton() {
    const playButton = document.querySelector('#player .fa-play, #player .fa-pause');
    if (playButton) {
        playButton.classList.remove('fa-pause');
        playButton.classList.add('fa-play');
    }
}

function resetProgressBar() {
    const progressBar = document.querySelector('#player .bg-cyan-400');
    const currentTimeEl = document.querySelector('#player .text-xs:first-child');
    const durationEl = document.querySelector('#player .text-xs:last-child');
    
    if (progressBar) {
        progressBar.style.width = '0%';
    }
    
    if (currentTimeEl) {
        currentTimeEl.textContent = '0:00';
    }
    
    if (durationEl) {
        durationEl.textContent = '0:00';
    }
}

function updatePlaylistHighlight(index) {
    // Remove destaque anterior
    const playlistItems = document.querySelectorAll('#playlist ul li');
    playlistItems.forEach((item, i) => {
        if (i >= 3) { // Ignora os 3 primeiros (menu de navegação)
            item.classList.remove('bg-gray-800/70', 'border-l-2', 'border-blue-400');
            const number = item.querySelector('span');
            const playIcon = item.querySelector('.fa-play');
            
            if (number) number.classList.replace('text-blue-400', 'text-gray-500');
            if (playIcon) playIcon.remove();
        }
    });
    
    // Adiciona destaque na música atual
    const currentItem = playlistItems[index + 3]; // +3 porque os primeiros 3 são menu
    if (currentItem) {
        currentItem.classList.add('bg-gray-800/70', 'border-l-2', 'border-blue-400');
        const number = currentItem.querySelector('span');
        if (number) number.classList.replace('text-gray-500', 'text-blue-400');
        
        // Adiciona ícone de play
        if (!currentItem.querySelector('.fa-play')) {
            const playIcon = document.createElement('i');
            playIcon.className = 'fas fa-play text-blue-400 text-xs';
            currentItem.appendChild(playIcon);
        }
    }
}

function togglePlayPause() {
    const audio = createAudioElement();
    const playButton = document.querySelector('#player .fa-play, #player .fa-pause');
    
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        if (playButton) {
            playButton.classList.remove('fa-pause');
            playButton.classList.add('fa-play');
        }
    } else {
        audio.play().then(() => {
            isPlaying = true;
            if (playButton) {
                playButton.classList.remove('fa-play');
                playButton.classList.add('fa-pause');
            }
        }).catch(error => {
            console.error('Erro ao reproduzir música:', error);
        });
    }
}

function playPreviousSong() {
    const newIndex = currentSongIndex > 0 ? currentSongIndex - 1 : musicDatabase.length - 1;
    loadSong(newIndex);
    // Não tocar automaticamente - aguardar usuário clicar play
}

function playNextSong() {
    const newIndex = currentSongIndex < musicDatabase.length - 1 ? currentSongIndex + 1 : 0;
    loadSong(newIndex);
    // Não tocar automaticamente - aguardar usuário clicar play
}

// Função especial para auto-play quando música termina
function autoPlayNextSong() {
    const newIndex = currentSongIndex < musicDatabase.length - 1 ? currentSongIndex + 1 : 0;
    loadSong(newIndex);
    // Tocar automaticamente quando música anterior termina
    if (isPlaying) {
        setTimeout(() => {
            const audio = createAudioElement();
            audio.play().then(() => {
                isPlaying = true;
                const playButton = document.querySelector('#player .fa-play, #player .fa-pause');
                if (playButton) {
                    playButton.classList.remove('fa-play');
                    playButton.classList.add('fa-pause');
                }
            });
        }, 100);
    }
}

// ====== PROGRESS BAR FUNCTIONS ======
function updateProgress() {
    const audio = audioElement;
    if (!audio || !audio.duration) return;
    
    const progressBar = document.querySelector('#player .bg-cyan-400');
    const currentTimeEl = document.querySelector('#player .text-xs:first-child');
    
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    
    if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
    }
    
    if (currentTimeEl) {
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
}

function updateDuration() {
    const audio = audioElement;
    if (!audio || !audio.duration) return;
    
    const durationEl = document.querySelector('#player .text-xs:last-child');
    if (durationEl) {
        durationEl.textContent = formatTime(audio.duration);
    }
}

function seekTo(percent) {
    const audio = audioElement;
    if (!audio || !audio.duration) return;
    
    audio.currentTime = (percent / 100) * audio.duration;
}

// ====== VOLUME CONTROL ======
function updateVolume(percent) {
    const audio = audioElement;
    if (!audio) return;
    
    currentVolume = percent / 100;
    audio.volume = currentVolume;
    
    const volumeBar = document.querySelector('#player .w-20 .bg-cyan-400');
    const volumeIcon = document.querySelector('#player .fa-volume-up, #player .fa-volume-down, #player .fa-volume-mute');
    
    if (volumeBar) {
        volumeBar.style.width = `${percent}%`;
    }
    
    if (volumeIcon) {
        volumeIcon.classList.remove('fa-volume-up', 'fa-volume-down', 'fa-volume-mute');
        
        if (percent === 0) {
            volumeIcon.classList.add('fa-volume-mute');
        } else if (percent < 50) {
            volumeIcon.classList.add('fa-volume-down');
        } else {
            volumeIcon.classList.add('fa-volume-up');
        }
    }
}

// ====== UTILITY FUNCTIONS ======
function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function handleAudioError(error) {
    console.error('Erro no áudio:', error);
    // Tenta próxima música se houver erro (sem auto-play)
    playNextSong();
}

// ====== PLAYLIST NAVIGATION ======
function initPlaylistNavigation() {
    const myplaylist = document.getElementById('myplaylist');
    const lastListening = document.getElementById('lastListening');
    const recommended = document.getElementById('recommended');

    function resetAllStates() {
        [myplaylist, lastListening, recommended].forEach(item => {
            if (item) {
                item.classList.remove('text-blue-400');
                item.classList.add('text-gray-400');
                const icon = item.querySelector('i');
                if (icon) {
                    icon.classList.remove('text-blue-400');
                    icon.classList.add('text-gray-400');
                }
            }
        });
    }

    function setActiveState(activeItem) {
        resetAllStates();
        activeItem.classList.remove('text-gray-400');
        activeItem.classList.add('text-blue-400');
        const icon = activeItem.querySelector('i');
        if (icon) {
            icon.classList.remove('text-gray-400');
            icon.classList.add('text-blue-400');
        }
    }

    if (myplaylist) myplaylist.addEventListener('click', () => setActiveState(myplaylist));
    if (lastListening) lastListening.addEventListener('click', () => setActiveState(lastListening));
    if (recommended) recommended.addEventListener('click', () => setActiveState(recommended));
}

// ====== HEART ICONS ======
function initHeartIcons() {
    // Heart icon no player
    const favoriteIcon = document.getElementById('favoriteicon');
    if (favoriteIcon) {
        favoriteIcon.addEventListener('click', () => {
            favoriteIcon.classList.toggle('far');
            favoriteIcon.classList.toggle('fas');
            favoriteIcon.classList.toggle('text-red-500');
            favoriteIcon.classList.toggle('text-white');
        });
    }

    // Heart icon na área principal
    const mainHeartIcon = document.querySelector('#principal .fa-heart');
    if (mainHeartIcon) {
        mainHeartIcon.addEventListener('click', () => {
            mainHeartIcon.classList.toggle('far');
            mainHeartIcon.classList.toggle('fas');
            mainHeartIcon.classList.toggle('text-red-500');
            mainHeartIcon.classList.toggle('text-white');
        });
    }
}

// ====== EVENT LISTENERS ======
function initEventListeners() {
    // Player controls
    const playButton = document.querySelector('#player .bg-white');
    const prevButton = document.querySelector('#player .fa-step-backward');
    const nextButton = document.querySelector('#player .fa-step-forward');
    
    if (playButton) playButton.addEventListener('click', togglePlayPause);
    if (prevButton) prevButton.addEventListener('click', playPreviousSong);
    if (nextButton) nextButton.addEventListener('click', playNextSong);
    
    // Progress bar
    const progressContainer = document.querySelector('#player .bg-gray-600');
    if (progressContainer) {
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const percent = ((e.clientX - rect.left) / rect.width) * 100;
            seekTo(percent);
        });
    }
    
    // Volume control
    const volumeContainer = document.querySelector('#player .w-20');
    if (volumeContainer) {
        volumeContainer.addEventListener('click', (e) => {
            const rect = volumeContainer.getBoundingClientRect();
            const percent = ((e.clientX - rect.left) / rect.width) * 100;
            updateVolume(percent);
        });
    }
    
    // Shuffle and repeat buttons
    const shuffleButton = document.querySelector('#player .fa-random');
    const repeatButton = document.querySelector('#player .fa-redo');
    
    if (shuffleButton) {
        shuffleButton.addEventListener('click', () => {
            shuffleButton.classList.toggle('text-gray-400');
            shuffleButton.classList.toggle('text-blue-400');
        });
    }
    
    if (repeatButton) {
        repeatButton.addEventListener('click', () => {
            repeatButton.classList.toggle('text-gray-400');
            repeatButton.classList.toggle('text-blue-400');
        });
    }
}

// ====== INITIALIZATION ======
function initializeApp() {
    document.addEventListener('DOMContentLoaded', async () => {
        console.log('🎵 Inicializando Music Player...');
        
        // Atualizar playlist inicial com músicas hardcoded
        console.log('📋 Atualizando playlist inicial...');
        updatePlaylistDisplay();
        
        // Carregar banco de dados externo primeiro
        console.log('📥 Carregando banco de dados externo...');
        await loadExternalMusicDatabase();
        
        // Criar elemento de áudio
        console.log('🔊 Criando elemento de áudio...');
        createAudioElement();
        
        // Carregar música inicial (primeira música da lista)
        console.log('🎶 Carregando música inicial...');
        loadSong(currentSongIndex);
        
        // Inicializar todas as funcionalidades
        console.log('⚙️ Inicializando funcionalidades...');
        initPlaylistNavigation();
        initHeartIcons();
        initEventListeners();
        
        console.log('✅ Music Player inicializado com sucesso!');
        console.log('📊 Banco de músicas carregado:', musicDatabase.length, 'músicas');
        console.log('🎵 Músicas disponíveis:', musicDatabase.map(s => `${s.artist} - ${s.title}`));
    });
}

// ====== START APP ======
initializeApp();

// ====== EXPORT FUNCTIONS FOR EXTERNAL USE ======
window.musicPlayer = {
    database: musicDatabase,
    loadSong,
    togglePlayPause,
    playNext: playNextSong,
    playPrevious: playPreviousSong,
    updateVolume,
    getCurrentSong: () => musicDatabase[currentSongIndex],
    isPlaying: () => isPlaying
};