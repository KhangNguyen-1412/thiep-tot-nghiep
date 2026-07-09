// --- IMAGES ARRAY FOR THE LIGHTBOX ---
const IMAGES_LIST = [
    '/grad_photo_1.png',
    '/grad_photo_2.png',
    '/grad_photo_3.png'
];

// --- LIGHTBOX INTERACTIVE CONTROLLER ---
function openLightbox(source: number | string): void {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement | null;
    
    if (!lightbox || !lightboxImg) return;
    
    let imageUrl = '';
    if (typeof source === 'number') {
        imageUrl = IMAGES_LIST[source];
    } else {
        imageUrl = source;
    }
    
    if (imageUrl) {
        lightboxImg.src = imageUrl;
        
        lightbox.classList.remove('pointer-events-none', 'opacity-0');
        lightbox.classList.add('opacity-100');
        document.body.style.overflow = 'hidden'; // Block background scroll
    }
}

function closeLightbox(): void {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    lightbox.classList.add('pointer-events-none', 'opacity-0');
    lightbox.classList.remove('opacity-100');
    document.body.style.overflow = ''; // Restore background scroll
}

// --- SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER) ---
function initScrollReveal(): void {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed to maintain layout performance
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Offset bottom
    });
    
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

// --- AUDIO PLAYBACK MANAGEMENT ---
let audio: HTMLAudioElement | null = null;
let musicBtn: HTMLElement | null = null;
let musicIcon: HTMLElement | null = null;

function initAudio(): void {
    audio = document.getElementById('bg-audio') as HTMLAudioElement | null;
    musicBtn = document.getElementById('music-btn');
    musicIcon = document.getElementById('music-icon');
    const volumeSlider = document.getElementById('volume-slider') as HTMLInputElement | null;
    
    if (!audio || !musicBtn) return;

    // Load volume settings
    const savedVolume = localStorage.getItem('music_volume');
    const defaultVolume = savedVolume ? parseFloat(savedVolume) : 0.4;
    audio.volume = defaultVolume;
    if (volumeSlider) {
        volumeSlider.value = defaultVolume.toString();
    }

    // Check saved state
    const isMuted = localStorage.getItem('music_muted') === 'true' || defaultVolume === 0;
    if (!isMuted) {
        // Try playing immediately
        audio.play().then(() => {
            updateMusicUI(true);
        }).catch(err => {
            console.log('Autoplay blocked, waiting for interaction:', err);
            
            // Play on first scroll, move, touch, key or click
            const playOnInteraction = () => {
                if (audio) {
                    audio.play().then(() => {
                        updateMusicUI(true);
                    }).catch(e => console.log('Play failed:', e));
                }
                // Clean up listeners
                ['click', 'touchstart', 'scroll', 'mousemove', 'keydown'].forEach(evt => {
                    window.removeEventListener(evt, playOnInteraction);
                });
            };
            
            ['click', 'touchstart', 'scroll', 'mousemove', 'keydown'].forEach(evt => {
                window.addEventListener(evt, playOnInteraction, { passive: true });
            });
        });
    } else {
        updateMusicUI(false);
    }
}

function updateMusicUI(isPlaying: boolean): void {
    if (!musicBtn || !musicIcon) return;
    if (isPlaying) {
        musicBtn.classList.add('animate-spin-slow');
        musicIcon.innerHTML = `
            <svg class="w-5 h-5 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
            </svg>
        `;
    } else {
        musicBtn.classList.remove('animate-spin-slow');
        musicIcon.innerHTML = `
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>
            </svg>
        `;
    }
}

function toggleMusic(): void {
    if (!audio) return;
    const volumeSlider = document.getElementById('volume-slider') as HTMLInputElement | null;
    
    if (audio.paused) {
        if (audio.volume === 0) {
            audio.volume = 0.4;
            if (volumeSlider) volumeSlider.value = '0.4';
            localStorage.setItem('music_volume', '0.4');
        }
        audio.play().then(() => {
            updateMusicUI(true);
            localStorage.setItem('music_muted', 'false');
        }).catch(err => console.error(err));
    } else {
        audio.pause();
        updateMusicUI(false);
        localStorage.setItem('music_muted', 'true');
    }
}

function changeVolume(val: string): void {
    if (!audio) return;
    const volume = parseFloat(val);
    audio.volume = volume;
    localStorage.setItem('music_volume', val);
    
    if (volume > 0) {
        if (audio.paused) {
            audio.play().then(() => {
                updateMusicUI(true);
            }).catch(e => console.error(e));
        }
        localStorage.setItem('music_muted', 'false');
    } else {
        audio.pause();
        updateMusicUI(false);
        localStorage.setItem('music_muted', 'true');
    }
}

// --- 3D BOOK FLIP CONTROLLER ---
declare const pdfjsLib: any;

let currentPdf: any = null;
let bookSheets: HTMLElement[] = [];
let currentSheetIndex = 0;
let totalSheetsCount = 0;

function updateBookPageIndicator(): void {
    const indicator = document.getElementById('book-page-num');
    if (!indicator) return;
    if (totalSheetsCount === 0) {
        indicator.textContent = 'Trang 0 / 0';
        return;
    }
    if (currentSheetIndex === 0) {
        indicator.textContent = 'Bìa trước (Trang 1)';
    } else if (currentSheetIndex === totalSheetsCount) {
        indicator.textContent = 'Bìa sau';
    } else {
        const leftPage = currentSheetIndex * 2;
        const rightPage = leftPage + 1;
        indicator.textContent = `Trang ${leftPage} - ${rightPage}`;
    }
}

function updateZIndices(): void {
    for (let i = 0; i < totalSheetsCount; i++) {
        const sheet = bookSheets[i];
        if (i < currentSheetIndex) {
            sheet.style.zIndex = i.toString();
        } else if (i === currentSheetIndex) {
            sheet.style.zIndex = totalSheetsCount.toString();
        } else {
            sheet.style.zIndex = (totalSheetsCount - i).toString();
        }
    }
}

async function openBookModal(pdfUrl: string, title: string): Promise<void> {
    const modal = document.getElementById('book-modal');
    const modalTitle = document.getElementById('book-modal-title');
    const spine = document.getElementById('book-spine');
    
    if (!modal || !spine) return;

    if (modalTitle) {
        modalTitle.textContent = title;
    }

    modal.classList.remove('pointer-events-none', 'opacity-0');
    modal.classList.add('opacity-100');
    document.body.style.overflow = 'hidden';

    spine.innerHTML = `
        <div id="book-loading" class="absolute inset-0 flex flex-col items-center justify-center text-white space-y-3">
            <svg class="animate-spin h-8 w-8 text-brand-secondary" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-xs text-gray-300">Đang khởi tạo sách lật...</span>
        </div>
    `;

    try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        currentPdf = await loadingTask.promise;
        
        const numPages = currentPdf.numPages;
        totalSheetsCount = Math.ceil(numPages / 2);
        currentSheetIndex = 0;
        bookSheets = [];

        spine.innerHTML = '';

        for (let i = 0; i < totalSheetsCount; i++) {
            const sheet = document.createElement('div');
            sheet.className = 'absolute right-0 top-0 w-1/2 h-full origin-left transform-style-3d z-10';

            const frontPageNum = 2 * i + 1;
            const frontPageDiv = document.createElement('div');
            frontPageDiv.className = 'absolute inset-0 backface-hidden bg-white flex items-center justify-center p-1 sm:p-2 page-right-style';
            
            if (frontPageNum <= numPages) {
                const canvas = document.createElement('canvas');
                canvas.className = 'w-full h-full object-contain';
                frontPageDiv.appendChild(canvas);
                renderPdfPageToCanvas(frontPageNum, canvas);

                // Crease + Outer Edge Bend Shadow for right-side page
                const creaseOverlay = document.createElement('div');
                creaseOverlay.className = 'absolute inset-0 pointer-events-none z-20';
                creaseOverlay.style.background = 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 8%, rgba(0,0,0,0) 85%, rgba(0,0,0,0.06) 100%)';
                frontPageDiv.appendChild(creaseOverlay);
            } else {
                frontPageDiv.innerHTML = '<div class="text-xs text-gray-400">Trang trống</div>';
            }

            const backPageNum = 2 * i + 2;
            const backPageDiv = document.createElement('div');
            backPageDiv.className = 'absolute inset-0 backface-hidden bg-white flex items-center justify-center p-1 sm:p-2 page-left-style';
            backPageDiv.style.transform = 'rotateY(180deg)';
            
            if (backPageNum <= numPages) {
                const canvas = document.createElement('canvas');
                canvas.className = 'w-full h-full object-contain';
                backPageDiv.appendChild(canvas);
                renderPdfPageToCanvas(backPageNum, canvas);

                // Crease + Outer Edge Bend Shadow for left-side page
                const creaseOverlay = document.createElement('div');
                creaseOverlay.className = 'absolute inset-0 pointer-events-none z-20';
                creaseOverlay.style.background = 'linear-gradient(to left, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 8%, rgba(0,0,0,0) 85%, rgba(0,0,0,0.06) 100%)';
                backPageDiv.appendChild(creaseOverlay);
            } else {
                backPageDiv.innerHTML = '<div class="text-xs text-gray-400">Trang trống</div>';
            }

            sheet.appendChild(frontPageDiv);
            sheet.appendChild(backPageDiv);
            spine.appendChild(sheet);
            bookSheets.push(sheet);
        }

        updateZIndices();
        updateBookPageIndicator();

    } catch (err) {
        console.error('Error loading PDF flipbook:', err);
        spine.innerHTML = '<div class="text-xs text-red-400 text-center">Không thể tải tài liệu sách lật. Vui lòng thử lại!</div>';
    }
}

async function renderPdfPageToCanvas(pageNum: number, canvas: HTMLCanvasElement): Promise<void> {
    if (!currentPdf) return;
    try {
        const page = await currentPdf.getPage(pageNum);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const viewport = page.getViewport({ scale: 1.5 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        await page.render(renderContext).promise;
    } catch (err) {
        console.error(`Error rendering page ${pageNum}:`, err);
    }
}

function closeBookModal(): void {
    const modal = document.getElementById('book-modal');
    if (!modal) return;
    modal.classList.add('pointer-events-none', 'opacity-0');
    modal.classList.remove('opacity-100');
    document.body.style.overflow = '';
    
    currentPdf = null;
    bookSheets = [];
    totalSheetsCount = 0;
    currentSheetIndex = 0;
}

function nextBookPage(): void {
    if (currentSheetIndex >= totalSheetsCount) return;
    const sheet = bookSheets[currentSheetIndex];
    sheet.classList.remove('sheet-flip-backward');
    sheet.classList.add('sheet-flip-forward');
    currentSheetIndex++;
    updateZIndices();
    updateBookPageIndicator();
}

function prevBookPage(): void {
    if (currentSheetIndex <= 0) return;
    currentSheetIndex--;
    const sheet = bookSheets[currentSheetIndex];
    sheet.classList.remove('sheet-flip-forward');
    sheet.classList.add('sheet-flip-backward');
    updateZIndices();
    updateBookPageIndicator();
}

function initBookEvents(): void {
    const container = document.getElementById('book-container');
    if (!container) return;

    // 1. Direct click on book halves to flip
    container.addEventListener('click', (e) => {
        if (totalSheetsCount === 0) return;
        
        const rect = container.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        
        if (clickX > rect.width / 2) {
            nextBookPage();
        } else {
            prevBookPage();
        }
    });

    // 2. Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextBookPage();
            } else {
                prevBookPage();
            }
        }
    }, { passive: true });

    // 3. Keyboard arrow keys support
    window.addEventListener('keydown', (e) => {
        const modal = document.getElementById('book-modal');
        if (!modal || modal.classList.contains('pointer-events-none')) return;

        if (e.key === 'ArrowRight' || e.key === ' ') {
            nextBookPage();
        } else if (e.key === 'ArrowLeft') {
            prevBookPage();
        } else if (e.key === 'Escape') {
            closeBookModal();
        }
    });
}

// --- BOOTSTRAP ---
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initAudio();
    initBookEvents();
});

// --- EXPOSE HANDLERS TO WINDOW FOR INLINE ONCLICK EVENTS ---
declare global {
    interface Window {
        openLightbox: (source: number | string) => void;
        closeLightbox: () => void;
        toggleMusic: () => void;
        changeVolume: (val: string) => void;
        openBookModal: (pdfUrl: string, title: string) => void;
        closeBookModal: () => void;
        nextBookPage: () => void;
        prevBookPage: () => void;
    }
}

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.toggleMusic = toggleMusic;
window.changeVolume = changeVolume;
window.openBookModal = openBookModal;
window.closeBookModal = closeBookModal;
window.nextBookPage = nextBookPage;
window.prevBookPage = prevBookPage;
export {};
