# 🎵 Music Player

Um player de música moderno e responsivo desenvolvido com HTML, CSS (Tailwind) e JavaScript.

## ✨ Funcionalidades

### 🎛️ **Player Principal**
- ▶️ Play/Pause
- ⏮️ Música anterior
- ⏭️ Próxima música
- 🔀 Shuffle
- 🔁 Repeat
- 🔊 Controle de volume
- 📊 Barra de progresso interativa

### 📋 **Playlist**
- 📁 Navegação (My Playlist, Last Listening, Recommended)
- 🎵 Lista de músicas com capas
- 🎯 Seleção de música por clique
- ▶️ Indicador visual da música atual

### ❤️ **Interações**
- ❤️ Favoritar músicas (player e área principal)
- 🔍 Barra de pesquisa
- 🎨 Interface responsiva
- 🖱️ Hover effects

## 🗂️ **Estrutura de Arquivos**

```
musicplayer/
├── app.html                 # Página principal do player
├── functions.js             # Todas as funcionalidades JavaScript
├── script.js               # Scripts antigos (manter para referência)
├── styles.css              # Estilos customizados
├── index.html              # Página inicial (se houver)
├── assets/                 # Imagens e recursos
│   ├── band.webp
│   ├── izzie.png
│   └── ...
├── music/                  # Músicas da Izzie Naylor
│   ├── Izzie-dancing-queen.mp3
│   ├── Izzie-yellow-coldplay.mp3
│   └── izzie-remember-me.mp3
└── musics-database/        # Banco de músicas externas
    ├── music-library.json  # Configuração das músicas
    ├── muse-blackout.mp3   # (adicione seus arquivos MP3 aqui)
    ├── muse-hysteria.mp3
    └── ...
```

## 🎵 **Adicionando Músicas**

### **Método 1: Pasta musics-database**
1. Coloque seus arquivos MP3 na pasta `musics-database/`
2. Edite o arquivo `music-library.json`:

```json
[
    {
        "id": "artista-musica",
        "title": "Nome da Música",
        "artist": "Nome do Artista",
        "album": "Nome do Álbum",
        "duration": "4:22",
        "src": "./musics-database/arquivo.mp3",
        "cover": "https://url-da-capa.jpg",
        "year": "2023",
        "genre": "Rock"
    }
]
```

### **Método 2: Direto no código**
Edite o array `musicDatabase` no arquivo `functions.js`:

```javascript
const musicDatabase = [
    // ... músicas existentes
    {
        id: 6,
        title: "Sua Música",
        artist: "Seu Artista",
        album: "Seu Álbum",
        duration: "3:45",
        src: "./musics-database/sua-musica.mp3",
        cover: "url-da-capa.jpg",
        year: "2023"
    }
];
```

## 🚀 **Como Usar**

1. **Abrir o Player**: Abra `app.html` no navegador
2. **Reproduzir**: Clique no botão play ▶️
3. **Navegar**: Use os controles anterior/próximo
4. **Selecionar**: Clique em qualquer música da playlist
5. **Volume**: Clique na barra de volume para ajustar
6. **Progresso**: Clique na barra de progresso para navegar na música

## 🔧 **Funcionalidades Técnicas**

### **JavaScript Modular**
- Sistema de módulos organizados
- Event listeners centralizados
- Gerenciamento de estado global
- Tratamento de erros de áudio

### **Carregamento Dinâmico**
- Carrega `music-library.json` automaticamente
- Atualiza playlist dinamicamente
- Suporte a múltiplas fontes de música

### **API Pública**
```javascript
// Acesso via console do navegador
window.musicPlayer.loadSong(2);           // Carregar música por índice
window.musicPlayer.togglePlayPause();     // Play/Pause
window.musicPlayer.playNext();            // Próxima música
window.musicPlayer.playPrevious();        // Música anterior
window.musicPlayer.updateVolume(50);      // Volume 50%
window.musicPlayer.getCurrentSong();      // Música atual
window.musicPlayer.isPlaying();           // Status de reprodução
```

## 🐛 **Solução de Problemas**

### **Música não carrega**
- ✅ Verifique se o arquivo MP3 existe
- ✅ Confirme o caminho no `src`
- ✅ Teste em servidor local (não apenas arquivo://)

### **Controles não funcionam**
- ✅ Abra o console (F12) para ver erros
- ✅ Verifique se `functions.js` está carregando
- ✅ Confirme se há conflitos de JavaScript

### **Playlist vazia**
- ✅ Verifique `music-library.json` está válido
- ✅ Confirme sintaxe JSON correta
- ✅ Teste com músicas hardcoded primeiro

## 📋 **TODO / Próximas Funcionalidades**

- [ ] Sistema de busca funcional
- [ ] Modo shuffle real
- [ ] Modo repeat (uma música / todas)
- [ ] Equalizer visual
- [ ] Suporte a playlists múltiplas
- [ ] Histórico de reprodução
- [ ] Sistema de favoritos persistente
- [ ] Visualizador de forma de onda

## 🛠️ **Desenvolvimento**

### **Tecnologias**
- **HTML5** - Estrutura
- **Tailwind CSS** - Estilização
- **JavaScript ES6+** - Funcionalidades
- **Font Awesome** - Ícones
- **Audio API** - Reprodução

### **Compatibilidade**
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

---

**Desenvolvido com ❤️ para uma experiência musical incrível!** 🎵
