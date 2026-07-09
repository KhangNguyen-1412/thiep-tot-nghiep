import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
    getFirestore, 
    doc,
    setDoc,
    collection, 
    getDocs, 
    QueryDocumentSnapshot,
    DocumentData
} from "firebase/firestore";
import confetti from "canvas-confetti";
import html2canvas from "html2canvas";

// --- TYPE INTERFACES ---

interface Template {
    name: string;
    title: string;
    titleFallback: string;
    message: string;
}

interface InvitationTemplates {
    [key: string]: Template;
}

// Global declaration for Window to expose event handlers to HTML
declare global {
    interface Window {
        fireConfetti: () => void;
        downloadCardAsImage: () => void;
    }
}

// --- FIREBASE CONFIG & INITIALIZATION ---
const firebaseConfig = {
  apiKey: "AIzaSyA_r_AmcyIQvPZILXPlG1cOUX8hwuVFLFk",
  authDomain: "graduinvitation.firebaseapp.com",
  projectId: "graduinvitation",
  storageBucket: "graduinvitation.firebasestorage.app",
  messagingSenderId: "751745147382",
  appId: "1:751745147382:web:a295ef879b93a299c3e7d7",
  measurementId: "G-2ZJ4LKCQYV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

try {
    getAnalytics(app);
} catch (e) {
    console.warn("Firebase Analytics could not be initialized:", e);
}

// --- SAFE STORAGE UTILITY ---

// --- COUNTDOWN TIMER ---
const graduationDate = new Date("Jul 24, 2026 07:30:00").getTime();

function updateCountdown(): void {
    const now = new Date().getTime();
    const distance = graduationDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let html = '';
    
    if (distance < 0) {
        html = '<div class="text-2xl font-serif text-brand-secondary font-bold pulse-slow">Lễ Tốt Nghiệp Đang Diễn Ra!</div>';
        clearInterval(timerInterval);
    } else {
        html = `
            <div class="flex flex-col items-center">
                <div class="w-16 h-16 sm:w-20 sm:h-20 bg-brand-primary rounded-xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold font-serif shadow-md mb-2">
                    ${days}
                </div>
                <span class="text-xs sm:text-sm uppercase font-semibold text-gray-500">Ngày</span>
            </div>
            <div class="flex flex-col items-center">
                <div class="w-16 h-16 sm:w-20 sm:h-20 bg-brand-primary rounded-xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold font-serif shadow-md mb-2">
                    ${hours.toString().padStart(2, '0')}
                </div>
                <span class="text-xs sm:text-sm uppercase font-semibold text-gray-500">Giờ</span>
            </div>
            <div class="flex flex-col items-center">
                <div class="w-16 h-16 sm:w-20 sm:h-20 bg-brand-primary rounded-xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold font-serif shadow-md mb-2">
                    ${minutes.toString().padStart(2, '0')}
                </div>
                <span class="text-xs sm:text-sm uppercase font-semibold text-gray-500">Phút</span>
            </div>
            <div class="flex flex-col items-center">
                <div class="w-16 h-16 sm:w-20 sm:h-20 bg-brand-primary rounded-xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold font-serif shadow-md mb-2">
                    ${seconds.toString().padStart(2, '0')}
                </div>
                <span class="text-xs sm:text-sm uppercase font-semibold text-gray-500">Giây</span>
            </div>
        `;
    }

    const countdownEl = document.getElementById("countdown");
    if (countdownEl) {
        countdownEl.innerHTML = html;
    }
}

updateCountdown();
const timerInterval = setInterval(updateCountdown, 1000);

// --- CONFETTI EFFECTS ---
function fireConfetti(): void {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { 
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#1a365d', '#c5a059', '#ffffff']
        }));
        confetti(Object.assign({}, defaults, { 
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#1a365d', '#c5a059', '#ffffff']
        }));
    }, 250);
}

setTimeout(() => {
   confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1a365d', '#c5a059']
    });
}, 1500);

// --- ADMINISTRATOR CMS SYSTEM ---

const DEFAULT_TEMPLATES: InvitationTemplates = {
    a309: {
        name: "Anh em Phòng A309 (Hiện tại)",
        title: "Thân gửi {name} - Phòng A309,",
        titleFallback: "Gửi Anh Em Phòng Ký Túc Xá A309,",
        message: `"Bốn năm đại học trôi qua nhanh như một cái chớp mắt, và cuối cùng thì ngày này cũng đến.<br class="hidden sm:block"> Cảm ơn anh em đã cùng ăn, cùng ngủ, cùng 'cày' game và 'gánh' tui qua những kỳ thi sinh tử.<br class="hidden sm:block"> Đến chung vui cùng tui trong ngày trọng đại này nhé! Sự hiện diện của anh em là món quà tuyệt vời nhất."`
    },
    cuua309: {
        name: "Cựu thành viên Phòng A309",
        title: "Thân gửi {name} - Cựu Thành Viên A309,",
        titleFallback: "Gửi Anh Em Cựu Thành Viên Phòng A309,",
        message: `"Dù đã ra phòng và mỗi đứa một phương trời, nhưng những kỷ niệm thời ở chung phòng A309 vẫn là những năm tháng rực rỡ nhất.<br class="hidden sm:block"> Cảm ơn anh đã đồng hành cùng em. Đến chung vui cùng em trong ngày tốt nghiệp nhé!."`
    },
    giadinh: {
        name: "Gia đình ruột thịt",
        title: "Kính gửi {name},",
        titleFallback: "Kính gửi Bố Mẹ & Gia đình,",
        message: `"Con xin bày tỏ lòng biết ơn sâu sắc nhất đến bố mẹ và gia đình, những người đã luôn chăm sóc, dìu dắt và là điểm tựa vững chắc nhất của con suốt chặng đường học tập vừa qua.<br class="hidden sm:block"> Sự hiện diện của gia đình trong ngày tốt nghiệp là niềm hạnh phúc lớn lao nhất của con."`
    },
    dongho: {
        name: "Họ hàng / Dòng họ",
        title: "Kính gửi {name},",
        titleFallback: "Kính gửi Họ Hàng & Dòng Họ,",
        message: `"Con/cháu xin gửi lời cảm ơn chân thành nhất đến cô dì, chú bác và họ hàng đã luôn động viên, quan tâm và ủng hộ con/cháu trong suốt những năm tháng đi học.<br class="hidden sm:block"> Trân trọng kính mời mọi người đến chung vui cùng con/cháu trong ngày lễ tốt nghiệp này."`
    },
    nguoiyeu: {
        name: "Người yêu",
        title: "Gửi Bé Yêu {name},",
        titleFallback: "Gửi Bé Yêu Của Anh,",
        message: `"Cảm ơn em vì đã luôn ở bên cạnh, lắng nghe, chia sẻ và là nguồn động lực lớn lao giúp anh vượt qua những ngày học tập căng thẳng.<br class="hidden sm:block"> Ngày anh bước lên bục nhận bằng tốt nghiệp, anh muốn em là người đầu tiên chứng kiến khoảnh khắc này. Đến chung vui cùng anh nhé!"`
    },
    banbe: {
        name: "Bạn bè / Bạn học",
        title: "Thân gửi bạn {name},",
        titleFallback: "Thân gửi Bạn,",
        message: `"Cảm ơn bạn đã luôn đồng hành, chia sẻ tài liệu học tập, cùng cày deadline thức đêm làm bài tập lớn và tạo nên những kỷ niệm thời sinh viên thật đẹp.<br class="hidden sm:block"> Hãy đến chung vui cùng mình trong ngày trọng đại này nhé! Sự hiện diện của bạn là niềm vui lớn của mình."`
    },
    thayco: {
        name: "Thầy cô giáo",
        title: "Kính gửi Thầy/Cô {name},",
        titleFallback: "Kính gửi Quý Thầy Cô,",
        message: `"Em xin bày tỏ lòng biết ơn sâu sắc đến Thầy/Cô, những người lái đò tận tụy đã truyền dạy kiến thức, dìu dắt và định hướng cho em trong suốt thời gian học tập tại trường đại học.<br class="hidden sm:block"> Trân trọng kính mời Thầy/Cô đến chung vui cùng em trong buổi lễ tốt nghiệp này."`
    },
    khac: {
        name: "Khách mời khác",
        title: "Thân gửi {name},",
        titleFallback: "Thân gửi Bạn,",
        message: `"Bốn năm đại học trôi qua nhanh như một cái chớp mắt, và cuối cùng thì ngày này cũng đến.<br class="hidden sm:block"> Sự đồng hành và ủng hộ của bạn trong suốt chặng đường học tập vừa qua là niềm vinh hạnh lớn của mình.<br class="hidden sm:block"> Hãy đến chung vui cùng mình trong ngày trọng đại này nhé!"`
    }
};

let INVITATION_TEMPLATES: InvitationTemplates = {};

// Khởi tạo các mẫu câu chúc từ Firestore
async function initTemplates(): Promise<void> {
    try {
        const querySnapshot = await getDocs(collection(db, "templates"));
        if (querySnapshot.empty) {
            console.log("Firestore templates are empty. Initializing defaults...");
            INVITATION_TEMPLATES = { ...DEFAULT_TEMPLATES };
            for (const [key, value] of Object.entries(DEFAULT_TEMPLATES)) {
                await setDoc(doc(db, "templates", key), value);
            }
        } else {
            const temp: InvitationTemplates = {};
            querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
                temp[doc.id] = doc.data() as Template;
            });
            INVITATION_TEMPLATES = Object.assign({}, DEFAULT_TEMPLATES, temp);
        }
    } catch (error) {
        console.error("Lỗi khi tải mẫu câu chúc từ Firestore:", error);
        INVITATION_TEMPLATES = { ...DEFAULT_TEMPLATES };
    }
}

// Định dạng tiêu đề theo xưng hô động
function getInvitationTitle(template: Template | undefined, name: string | null): string {
    if (!template) return '';
    if (name) {
        if (template.title && template.title.includes('{name}')) {
            return template.title.replace(/{name}/g, name);
        } else {
            return (template.title || '') + ' ' + name;
        }
    } else {
        return template.titleFallback || (template.title ? template.title.replace(/{name}/g, '').trim() : '');
    }
}

// Cập nhật giao diện xem trước thiệp mời
function updateCardPreview(name: string | null, group: string | null): void {
    let selectedGroup = 'a309';
    if (group && INVITATION_TEMPLATES[group]) {
        selectedGroup = group;
    } else if (name) {
        selectedGroup = 'khac';
    }

    const template = INVITATION_TEMPLATES[selectedGroup] || DEFAULT_TEMPLATES[selectedGroup] || DEFAULT_TEMPLATES['khac'];
    
    const titleEl = document.getElementById('invitation-title');
    if (titleEl) {
        titleEl.textContent = getInvitationTitle(template, name);
    }

    const messageEl = document.getElementById('invitation-message');
    if (messageEl) {
        messageEl.innerHTML = template ? template.message : '';
    }
}

// Khởi tạo và kiểm tra tham số URL khi khách vào thiệp
function initInvitation(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const group = urlParams.get('group');
    const isAdminParam = urlParams.get('admin') === 'true';

    updateCardPreview(name, group);

    const hasPersonalization = name || group;
    const showOwnerTools = !hasPersonalization || isAdminParam;

    const adminBtn = document.getElementById('admin-button-container');
    if (adminBtn) {
        if (showOwnerTools) {
            adminBtn.classList.remove('hidden');
        } else {
            adminBtn.classList.add('hidden');
        }
    }

    const downloadBtn = document.getElementById('btn-download-image');
    const printBtn = document.getElementById('btn-print-invitation');
    if (downloadBtn && printBtn) {
        if (showOwnerTools) {
            downloadBtn.classList.remove('hidden');
            printBtn.classList.remove('hidden');
        } else {
            downloadBtn.classList.add('hidden');
            printBtn.classList.add('hidden');
        }
    }
}

// --- UTILITY TOAST ---
const toast = document.getElementById('toast');
function showToast(message: string): void {
    const toastMsg = document.getElementById('toast-message');
    if (toastMsg) toastMsg.textContent = message;
    
    if (toast) {
        toast.classList.remove('pointer-events-none', 'opacity-0', 'translate-y-10');
        toast.classList.add('opacity-100', 'translate-y-0');
    }
    
    setTimeout(() => {
        if (toast) {
            toast.classList.add('pointer-events-none', 'opacity-0', 'translate-y-10');
            toast.classList.remove('opacity-100', 'translate-y-0');
        }
    }, 2500);
}

// --- DOWNLOAD CARD AS IMAGE (html2canvas) ---
function downloadCardAsImage(): void {
    const card = document.querySelector('main.glass-card') as HTMLElement | null;
    if (!card) return;

    const noPrintElements = card.querySelectorAll('.no-print');
    noPrintElements.forEach(el => {
        const htmlEl = el as HTMLElement;
        htmlEl.dataset.originalDisplay = htmlEl.style.display;
        htmlEl.style.display = 'none';
    });

    showToast('Đang tạo ảnh thiệp...');

    setTimeout(() => {
        html2canvas(card, {
            scale: 3,
            useCORS: true,
            backgroundColor: '#fdfbf7',
            logging: false,
            allowTaint: true,
            onclone: (clonedDoc: Document) => {
                const clonedCard = clonedDoc.querySelector('main.glass-card') as HTMLElement | null;
                if (clonedCard) {
                    clonedCard.classList.remove('animate-fade-in');
                    clonedCard.style.animation = 'none';
                    clonedCard.style.transition = 'none';
                    clonedCard.style.opacity = '1';
                    clonedCard.style.transform = 'none';

                    const allElements = clonedCard.querySelectorAll('*');
                    allElements.forEach(el => {
                        const htmlEl = el as HTMLElement;
                        htmlEl.classList.remove('animate-fade-in', 'animate-slide-up', 'pulse-slow');
                        htmlEl.style.animation = 'none';
                        htmlEl.style.transition = 'none';
                        htmlEl.style.transform = 'none';
                        
                        if (htmlEl.style.opacity !== '0' && !htmlEl.classList.contains('no-print')) {
                            htmlEl.style.opacity = '1';
                        }
                    });

                    const goldTexts = clonedCard.querySelectorAll('.gold-text');
                    goldTexts.forEach(el => {
                        const htmlEl = el as HTMLElement;
                        htmlEl.style.webkitBackgroundClip = 'initial';
                        htmlEl.style.webkitTextFillColor = 'initial';
                        htmlEl.style.background = 'none';
                        htmlEl.style.color = '#c5a059';
                    });
                }
            }
        }).then((canvas: HTMLCanvasElement) => {
            noPrintElements.forEach(el => {
                const htmlEl = el as HTMLElement;
                htmlEl.style.display = htmlEl.dataset.originalDisplay || '';
            });

            const link = document.createElement('a');
            const guestName = new URLSearchParams(window.location.search).get('name') || '';
            const filename = guestName ? `Thiep_Moi_Tot_Nghiep_${guestName.replace(/\s+/g, '_')}.png` : 'Thiep_Moi_Tot_Nghiep.png';
            
            link.download = filename;
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            showToast('Đã tải hình thiệp thành công!');
        }).catch((err: any) => {
            console.error('Lỗi khi chụp hình thiệp:', err);
            noPrintElements.forEach(el => {
                const htmlEl = el as HTMLElement;
                htmlEl.style.display = htmlEl.dataset.originalDisplay || '';
            });
            showToast('Không tải được ảnh. Hãy thử chụp màn hình nhé!');
        });
    }, 300);
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

// --- BOOTSTRAP SYSTEM ---
async function startApp(): Promise<void> {
    initAudio();
    await initTemplates();
    initInvitation();
}
startApp();

// --- EXPOSE HANDLERS TO WINDOW FOR ONCLICK COMPATIBILITY ---
declare global {
    interface Window {
        fireConfetti: () => void;
        downloadCardAsImage: () => void;
        toggleMusic: () => void;
        changeVolume: (val: string) => void;
    }
}

window.fireConfetti = fireConfetti;
window.downloadCardAsImage = downloadCardAsImage;
window.toggleMusic = toggleMusic;
window.changeVolume = changeVolume;

