import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    collection, 
    getDocs, 
    deleteDoc, 
    query, 
    orderBy,
    QueryDocumentSnapshot,
    DocumentData
} from "firebase/firestore";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut, 
    onAuthStateChanged,
    User
} from "firebase/auth";
import html2canvas from "html2canvas";

// --- TYPE INTERFACES ---
interface Guest {
    id: string;
    name: string;
    group: string;
    url: string;
}

interface Template {
    name: string;
    title: string;
    titleFallback: string;
    message: string;
}

interface InvitationTemplates {
    [key: string]: Template;
}

declare global {
    interface Window {
        handleGoogleLogin: () => Promise<void>;
        handleLogout: () => Promise<void>;
        switchTab: (tab: string) => void;
        addGuestToList: () => Promise<void>;
        deleteGuest: (id: string) => Promise<void>;
        downloadGuestCardImage: (name: string, group: string) => void;
        copyGuestLink: (url: string) => void;
        resetToDefaultForm: () => void;
        filterGuestsTable: () => void;
        loadTemplateToEditor: () => void;
        saveTemplateChanges: () => Promise<void>;
        toggleNewGroupForm: (show?: boolean) => void;
        createNewGroupSubmit: () => Promise<void>;
        deleteCustomGroup: () => Promise<void>;
        copyToClipboardOnly: () => void;
    }
}


// --- FIREBASE INITIALIZATION ---
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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// --- SAFE STORAGE FALLBACK ---
const safeStorage = {
    getItem: function(key: string): string | null {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            return this._data[key] || null;
        }
    },
    setItem: function(key: string, value: string): void {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            this._data[key] = value;
        }
    },
    removeItem: function(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            delete this._data[key];
        }
    },
    _data: {} as Record<string, string>
};

// --- DEFAULT STATE ---
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
        message: `"Cảm ơn em vì đã luôn ở bên cạnh, lắng nghe, chia sẻ và là nguồn động lực giúp anh vượt qua những ngày học tập căng thẳng.<br class="hidden sm:block"> Ngày anh bước lên bục nhận bằng tốt nghiệp, anh muốn em là người đầu tiên chứng kiến khoảnh khắc này. Đến chung vui cùng anh nhé!"`
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
let GUESTS_LIST: Guest[] = [];

// --- FIRESTORE DATA LOADERS ---
async function initTemplates(): Promise<void> {
    try {
        const querySnapshot = await getDocs(collection(db, "templates"));
        if (querySnapshot.empty) {
            console.log("Initializing default templates on Firestore...");
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
        console.error("Lỗi khi nạp templates từ Firestore:", error);
        INVITATION_TEMPLATES = { ...DEFAULT_TEMPLATES };
    }
}

async function initGuests(): Promise<void> {
    try {
        const guestsRef = collection(db, "guests");
        const q = query(guestsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        GUESTS_LIST = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            GUESTS_LIST.push({
                id: doc.id,
                name: data.name || '',
                group: data.group || '',
                url: data.url || ''
            });
        });
    } catch (error) {
        console.error("Lỗi khi nạp khách mời từ Firestore:", error);
        GUESTS_LIST = [];
    }
}

// --- GOOGLE AUTHENTICATION CONTROLLER ---
async function handleGoogleLogin(): Promise<void> {
    if (window.location.protocol === 'file:') {
        showToast('Google Sign-In không hoạt động từ giao thức file://');
        alert('Lỗi: Google Sign-In yêu cầu chạy qua máy chủ (ví dụ: http://localhost) để đảm bảo an toàn bảo mật.');
        return;
    }

    try {
        showToast('Đang kết nối Google...');
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const email = user.email;

        // Kiểm tra whitelist Admin trên Firestore
        const adminDocRef = doc(db, "config", "admin");
        const adminDoc = await getDoc(adminDocRef);
        let allowedEmails = ["khangnguyen1412@gmail.com"];

        if (!adminDoc.exists()) {
            if (email) allowedEmails.push(email);
            await setDoc(adminDocRef, { allowedEmails });
        } else {
            allowedEmails = adminDoc.data().allowedEmails || [];
        }

        if (email && allowedEmails.includes(email)) {
            safeStorage.setItem('isAdminLoggedIn', 'true');
            safeStorage.setItem('adminUserEmail', email);
            showToast(`Chào mừng Admin ${user.displayName || email}!`);
        } else {
            await signOut(auth);
            showToast('Tài khoản Google này không có quyền truy cập Admin!');
        }
    } catch (error: any) {
        console.error("Lỗi xác thực Google:", error);
        if (error.code === 'auth/unauthorized-domain') {
            showToast('Tên miền hiện tại chưa được cấu hình Authorized Domains trên Firebase.');
            alert('Lỗi Firebase (auth/unauthorized-domain):\nTên miền hoặc cổng port hiện tại của bạn chưa được thêm vào mục "Authorized Domains" trong Firebase Console.');
        } else {
            showToast('Đăng nhập thất bại.');
        }
    }
}

async function handleLogout(): Promise<void> {
    try {
        await signOut(auth);
    } catch (err) {
        console.error("Lỗi khi đăng xuất:", err);
    }
    safeStorage.removeItem('isAdminLoggedIn');
    safeStorage.removeItem('adminUserEmail');
    showToast('Đã đăng xuất!');
}

// Theo dõi trạng thái đăng nhập
onAuthStateChanged(auth, async (user: User | null) => {
    const loginContainer = document.getElementById('login-container');
    const dashboardContainer = document.getElementById('dashboard-container');
    
    if (user) {
        // Có user đăng nhập, kiểm tra whitelist
        const email = user.email;
        const adminDocRef = doc(db, "config", "admin");
        const adminDoc = await getDoc(adminDocRef);
        let allowedEmails = ["khangnguyen1412@gmail.com"];
        if (adminDoc.exists()) {
            allowedEmails = adminDoc.data().allowedEmails || [];
        }

        if (email && allowedEmails.includes(email)) {
            // Đúng Admin Whitelisted
            safeStorage.setItem('isAdminLoggedIn', 'true');
            safeStorage.setItem('adminUserEmail', email);

            loginContainer?.classList.add('hidden');
            dashboardContainer?.classList.remove('hidden');

            const emailDisplay = document.getElementById('admin-email-display');
            if (emailDisplay) emailDisplay.textContent = email;

            showToast('Đang tải dữ liệu...');
            await showDashboard();
        } else {
            // Đăng nhập sai whitelist
            await signOut(auth);
            safeStorage.removeItem('isAdminLoggedIn');
            safeStorage.removeItem('adminUserEmail');
            loginContainer?.classList.remove('hidden');
            dashboardContainer?.classList.add('hidden');
        }
    } else {
        // Chưa đăng nhập
        safeStorage.removeItem('isAdminLoggedIn');
        safeStorage.removeItem('adminUserEmail');
        loginContainer?.classList.remove('hidden');
        dashboardContainer?.classList.add('hidden');
    }
});

async function showDashboard(): Promise<void> {
    await initTemplates();
    await initGuests();
    
    renderGroupOptions();
    renderGuestsTable();
}

// --- Giao diện Tabs và Tìm kiếm ---
function switchTab(tab: string): void {
    const tabGuests = document.getElementById('tab-guests');
    const tabTemplates = document.getElementById('tab-templates');
    const sidebarGuestsBtn = document.getElementById('sidebar-tab-guests');
    const sidebarTemplatesBtn = document.getElementById('sidebar-tab-templates');
    
    if (tab === 'guests') {
        tabGuests?.classList.remove('hidden');
        tabTemplates?.classList.add('hidden');
        
        if (sidebarGuestsBtn) {
            sidebarGuestsBtn.className = "w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 bg-brand-primary text-white shadow-md";
        }
        if (sidebarTemplatesBtn) {
            sidebarTemplatesBtn.className = "w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 text-gray-600 hover:bg-white/40 hover:text-brand-primary";
        }
    } else {
        tabGuests?.classList.add('hidden');
        tabTemplates?.classList.remove('hidden');
        
        if (sidebarGuestsBtn) {
            sidebarGuestsBtn.className = "w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 text-gray-600 hover:bg-white/40 hover:text-brand-primary";
        }
        if (sidebarTemplatesBtn) {
            sidebarTemplatesBtn.className = "w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 bg-brand-primary text-white shadow-md";
        }
        
        loadTemplateToEditor();
    }
}

// --- CRUD KHÁCH MỜI ---
function renderGroupOptions(): void {
    const selectForm = document.getElementById('guest-group') as HTMLSelectElement | null;
    const selectEditor = document.getElementById('template-select') as HTMLSelectElement | null;
    
    if (selectForm) {
        selectForm.innerHTML = '';
        Object.keys(INVITATION_TEMPLATES).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = INVITATION_TEMPLATES[key].name || key;
            selectForm.appendChild(option);
        });
    }
    
    if (selectEditor) {
        selectEditor.innerHTML = '';
        Object.keys(INVITATION_TEMPLATES).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = INVITATION_TEMPLATES[key].name || key;
            selectEditor.appendChild(option);
        });
    }
}

async function addGuestToList(): Promise<void> {
    const nameInput = document.getElementById('guest-name') as HTMLInputElement | null;
    const groupSelect = document.getElementById('guest-group') as HTMLSelectElement | null;
    if (!nameInput || !groupSelect) return;

    const nameVal = nameInput.value.trim();
    const groupVal = groupSelect.value;
    
    if (!nameVal) {
        showToast('Vui lòng điền tên khách mời!');
        return;
    }

    // Xây dựng URL động
    const origin = window.location.origin;
    const params = new URLSearchParams();
    params.append('name', nameVal);
    params.append('group', groupVal);
    const invitationUrl = `${origin}/index.html?${params.toString()}`;

    const guestId = Date.now().toString();
    const newGuest = {
        name: nameVal,
        group: groupVal,
        url: invitationUrl,
        createdAt: Date.now()
    };

    try {
        showToast('Đang thêm khách mời...');
        await setDoc(doc(db, "guests", guestId), newGuest);
        
        GUESTS_LIST.unshift({ id: guestId, ...newGuest });
        renderGuestsTable();
        
        const previewContainer = document.getElementById('preview-container');
        const previewInput = document.getElementById('guest-link-preview') as HTMLInputElement | null;
        if (previewInput && previewContainer) {
            previewInput.value = invitationUrl;
            previewContainer.classList.remove('hidden');
        }

        try {
            await navigator.clipboard.writeText(invitationUrl);
            showToast(`Đã lưu & sao chép link cho ${nameVal}!`);
        } catch (clipErr) {
            showToast(`Đã tạo khách mời ${nameVal}!`);
        }
        
        nameInput.value = '';
    } catch (err) {
        console.error("Lỗi khi thêm khách mời:", err);
        showToast('Lỗi khi lưu khách mời vào cơ sở dữ liệu!');
    }
}

function renderGuestsTable(filteredList: Guest[] = GUESTS_LIST): void {
    const tbody = document.getElementById('guests-table-body');
    const countEl = document.getElementById('guests-count');
    
    if (countEl) countEl.textContent = filteredList.length.toString();
    if (!tbody) return;

    if (filteredList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" class="p-6 text-center text-gray-500 italic">Không tìm thấy khách mời nào phù hợp.</td></tr>`;
        return;
    }

    tbody.innerHTML = '';
    filteredList.forEach(guest => {
        const groupName = INVITATION_TEMPLATES[guest.group] ? INVITATION_TEMPLATES[guest.group].name : guest.group;
        
        const tr = document.createElement('tr');
        tr.className = "hover:bg-white/30 transition-colors border-b border-brand-secondary/5";
        
        const escapedName = guest.name.replace(/"/g, '&quot;');
        const escapedGroup = guest.group.replace(/"/g, '&quot;');
        const escapedUrl = guest.url.replace(/"/g, '&quot;');

        tr.innerHTML = `
            <td class="p-4 font-semibold text-brand-primary text-xs sm:text-sm">${guest.name}</td>
            <td class="p-4"><span class="bg-brand-secondary/15 text-brand-primary px-3 py-1 rounded-full text-[10px] font-semibold border border-brand-secondary/25">${groupName}</span></td>
            <td class="p-4 text-right space-x-1.5 whitespace-nowrap">
                <button onclick="window.copyGuestLink('${escapedUrl}')" class="bg-brand-primary hover:bg-opacity-90 text-white p-2 rounded-xl inline-flex items-center justify-center transition-colors" title="Copy Link Mời">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                </button>
                <button onclick="window.downloadGuestCardImage('${escapedName}', '${escapedGroup}')" class="bg-brand-secondary hover:bg-opacity-95 text-brand-primary p-2 rounded-xl inline-flex items-center justify-center transition-colors border border-brand-secondary/20" title="Tải Ảnh Thiệp">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </button>
                <button onclick="window.deleteGuest('${guest.id}')" class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl inline-flex items-center justify-center transition-colors" title="Xóa Khách">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function filterGuestsTable(): void {
    const searchInput = document.getElementById('guest-search') as HTMLInputElement | null;
    if (!searchInput) return;

    const queryVal = searchInput.value.toLowerCase().trim();
    if (!queryVal) {
        renderGuestsTable(GUESTS_LIST);
        return;
    }

    const filtered = GUESTS_LIST.filter(guest => guest.name.toLowerCase().includes(queryVal));
    renderGuestsTable(filtered);
}

function copyGuestLink(url: string): void {
    navigator.clipboard.writeText(url)
        .then(() => showToast('Đã copy link mời!'))
        .catch(() => showToast('Không tự động copy được, vui lòng copy tay.'));
}

async function deleteGuest(id: string): Promise<void> {
    if (confirm('Bạn chắc chắn muốn xóa khách mời này khỏi danh sách?')) {
        try {
            showToast('Đang xóa...');
            await deleteDoc(doc(db, "guests", id));
            GUESTS_LIST = GUESTS_LIST.filter(g => g.id !== id);
            renderGuestsTable();
            filterGuestsTable(); // Re-apply search filter if active
            showToast('Đã xóa khách mời!');
        } catch (err) {
            console.error("Lỗi khi xóa khách mời:", err);
            showToast('Không thể xóa khách mời khỏi cơ sở dữ liệu!');
        }
    }
}

// Chụp màn hình thiệp mời ẩn cho khách
function downloadGuestCardImage(name: string, group: string): void {
    const wrapper = document.getElementById('hidden-card-wrapper');
    const titleEl = document.getElementById('hidden-invitation-title');
    const messageEl = document.getElementById('hidden-invitation-message');
    
    if (!wrapper || !titleEl || !messageEl) return;

    const template = INVITATION_TEMPLATES[group] || DEFAULT_TEMPLATES[group] || DEFAULT_TEMPLATES['khac'];
    
    // 1. Thay thế câu chúc động ẩn
    if (name) {
        if (template.title && template.title.includes('{name}')) {
            titleEl.textContent = template.title.replace(/{name}/g, name);
        } else {
            titleEl.textContent = (template.title || '') + ' ' + name;
        }
    } else {
        titleEl.textContent = template.titleFallback;
    }

    messageEl.innerHTML = template.message;
    showToast(`Đang kết xuất ảnh thiệp của ${name}...`);

    // 2. Chụp canvas
    setTimeout(() => {
        html2canvas(wrapper.querySelector('main') as HTMLElement, {
            scale: 3,
            useCORS: true,
            backgroundColor: '#fdfbf7',
            logging: false,
            allowTaint: true
        }).then((canvas: HTMLCanvasElement) => {
            const link = document.createElement('a');
            link.download = `Thiep_Moi_Tot_Nghiep_${name.replace(/\s+/g, '_')}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            showToast('Tải ảnh thiệp thành công!');
        }).catch(err => {
            console.error("Lỗi khi kết xuất thiệp:", err);
            showToast('Kết xuất ảnh thất bại!');
        });
    }, 200);
}

function resetToDefaultForm(): void {
    const nameInput = document.getElementById('guest-name') as HTMLInputElement | null;
    const groupSelect = document.getElementById('guest-group') as HTMLSelectElement | null;
    if (nameInput) nameInput.value = '';
    if (groupSelect) groupSelect.value = 'banbe';
}

// --- CRUD MẪU LỜI MỜI ---
function loadTemplateToEditor(): void {
    const selectEditor = document.getElementById('template-select') as HTMLSelectElement | null;
    if (!selectEditor) return;

    const key = selectEditor.value;
    const template = INVITATION_TEMPLATES[key];
    if (!template) return;

    const editorGroupName = document.getElementById('editor-group-name') as HTMLInputElement | null;
    const editorTemplateTitle = document.getElementById('editor-template-title') as HTMLInputElement | null;
    const editorTemplateMessage = document.getElementById('editor-template-message') as HTMLTextAreaElement | null;

    if (editorGroupName) editorGroupName.value = template.name || key;
    if (editorTemplateTitle) editorTemplateTitle.value = template.title || '';
    if (editorTemplateMessage) editorTemplateMessage.value = template.message || '';

    const deleteBtn = document.getElementById('btn-delete-group');
    const isSystemGroup = ['a309', 'cuua309', 'giadinh', 'dongho', 'nguoiyeu', 'banbe', 'thayco', 'khac'].includes(key);
    if (deleteBtn) {
        if (isSystemGroup) {
            deleteBtn.classList.add('hidden');
        } else {
            deleteBtn.classList.remove('hidden');
        }
    }
}

async function saveTemplateChanges(): Promise<void> {
    const selectEditor = document.getElementById('template-select') as HTMLSelectElement | null;
    if (!selectEditor) return;
    const key = selectEditor.value;
    if (!key || !INVITATION_TEMPLATES[key]) return;

    const editorGroupName = document.getElementById('editor-group-name') as HTMLInputElement | null;
    const editorTemplateTitle = document.getElementById('editor-template-title') as HTMLInputElement | null;
    const editorTemplateMessage = document.getElementById('editor-template-message') as HTMLTextAreaElement | null;

    if (!editorGroupName || !editorTemplateTitle || !editorTemplateMessage) return;

    const newName = editorGroupName.value.trim();
    const newTitle = editorTemplateTitle.value.trim();
    const newMessage = editorTemplateMessage.value.trim();

    if (!newName || !newTitle || !newMessage) {
        showToast('Vui lòng nhập đầy đủ các trường thông tin mẫu!');
        return;
    }

    const updatedTemplate = {
        name: newName,
        title: newTitle,
        titleFallback: newTitle.replace(/{name}/g, '').trim(),
        message: newMessage
    };

    try {
        showToast('Đang cập nhật mẫu...');
        await setDoc(doc(db, "templates", key), updatedTemplate);
        INVITATION_TEMPLATES[key] = updatedTemplate;

        renderGroupOptions();
        selectEditor.value = key;
        loadTemplateToEditor();

        showToast('Đã lưu mẫu câu chúc thành công!');
    } catch (err) {
        console.error("Lỗi khi lưu mẫu câu chúc:", err);
        showToast('Lỗi lưu cơ sở dữ liệu!');
    }
}

function toggleNewGroupForm(show?: boolean): void {
    const form = document.getElementById('new-group-form');
    if (!form) return;

    if (show === undefined) {
        form.classList.toggle('hidden');
    } else if (show) {
        form.classList.remove('hidden');
    } else {
        form.classList.add('hidden');
    }
}

async function createNewGroupSubmit(): Promise<void> {
    const newGroupId = document.getElementById('new-group-id') as HTMLInputElement | null;
    const newGroupName = document.getElementById('new-group-name') as HTMLInputElement | null;
    const newGroupTitle = document.getElementById('new-group-title') as HTMLInputElement | null;
    const newGroupMessage = document.getElementById('new-group-message') as HTMLTextAreaElement | null;

    if (!newGroupId || !newGroupName || !newGroupTitle || !newGroupMessage) return;

    const idVal = newGroupId.value.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const nameVal = newGroupName.value.trim();
    const titleVal = newGroupTitle.value.trim();
    const msgVal = newGroupMessage.value.trim();

    if (!idVal || !nameVal || !titleVal || !msgVal) {
        showToast('Vui lòng điền đầy đủ thông tin nhóm mới!');
        return;
    }

    if (INVITATION_TEMPLATES[idVal]) {
        showToast('Mã nhóm đã tồn tại! Hãy nhập mã khác.');
        return;
    }

    const newGroup = {
        name: nameVal,
        title: titleVal,
        titleFallback: titleVal.replace(/{name}/g, '').trim(),
        message: msgVal
    };

    try {
        showToast('Đang tạo nhóm...');
        await setDoc(doc(db, "templates", idVal), newGroup);
        INVITATION_TEMPLATES[idVal] = newGroup;

        newGroupId.value = '';
        newGroupName.value = '';
        newGroupTitle.value = '';
        newGroupMessage.value = '';

        toggleNewGroupForm(false);
        renderGroupOptions();

        const selectEditor = document.getElementById('template-select') as HTMLSelectElement | null;
        if (selectEditor) {
            selectEditor.value = idVal;
            loadTemplateToEditor();
        }

        showToast(`Đã thêm nhóm "${nameVal}" thành công!`);
    } catch (err) {
        console.error("Lỗi khi tạo nhóm mới:", err);
        showToast('Lỗi khi thêm nhóm vào cơ sở dữ liệu!');
    }
}

async function deleteCustomGroup(): Promise<void> {
    const selectEditor = document.getElementById('template-select') as HTMLSelectElement | null;
    if (!selectEditor) return;
    const key = selectEditor.value;
    if (!key) return;

    const isSystemGroup = ['a309', 'cuua309', 'giadinh', 'dongho', 'nguoiyeu', 'banbe', 'thayco', 'khac'].includes(key);
    if (isSystemGroup) {
        showToast('Không thể xóa nhóm mặc định của hệ thống!');
        return;
    }

    if (confirm(`Bạn chắc chắn muốn xóa vĩnh viễn mối quan hệ "${INVITATION_TEMPLATES[key].name}"?`)) {
        try {
            showToast('Đang xóa...');
            await deleteDoc(doc(db, "templates", key));
            delete INVITATION_TEMPLATES[key];

            renderGroupOptions();
            loadTemplateToEditor();
            showToast('Xóa thành công.');
        } catch (err) {
            console.error("Lỗi khi xóa nhóm:", err);
            showToast('Lỗi khi xóa nhóm khỏi cơ sở dữ liệu!');
        }
    }
}

// --- HỆ THỐNG TOAST ---
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

function copyToClipboardOnly(): void {
    const previewInput = document.getElementById('guest-link-preview') as HTMLInputElement | null;
    if (previewInput) {
        navigator.clipboard.writeText(previewInput.value)
            .then(() => showToast('Đã sao chép link mời!'));
    }
}

// --- EXPOSE HANDLERS TO WINDOW ---
window.handleGoogleLogin = handleGoogleLogin;
window.handleLogout = handleLogout;
window.switchTab = switchTab;
window.addGuestToList = addGuestToList;
window.deleteGuest = deleteGuest;
window.downloadGuestCardImage = downloadGuestCardImage;
window.copyGuestLink = copyGuestLink;
window.resetToDefaultForm = resetToDefaultForm;
window.filterGuestsTable = filterGuestsTable;
window.loadTemplateToEditor = loadTemplateToEditor;
window.saveTemplateChanges = saveTemplateChanges;
window.toggleNewGroupForm = toggleNewGroupForm;
window.createNewGroupSubmit = createNewGroupSubmit;
window.deleteCustomGroup = deleteCustomGroup;
window.copyToClipboardOnly = copyToClipboardOnly;
