// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
}

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetUrl = this.href.split('#')[0];
        const currentUrl = window.location.href.split('#')[0];

        if (targetUrl === currentUrl || targetUrl === '') {
            e.preventDefault();
            
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const finalTargetId = targetId.includes('#') ? '#' + targetId.split('#')[1] : null; 
            
            if (finalTargetId) {
                const targetElement = document.querySelector(finalTargetId);
                if (targetElement) {
                    const headerOffset = document.querySelector('header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    let offsetPosition = elementPosition - headerOffset;

                    if (offsetPosition < 0 && (targetElement.id === 'home' || targetElement.id === 'program-unggulan-list' || targetElement.id === 'profil-kami')) {
                        offsetPosition = 0; // Prevent scrolling too high for top sections
                    }
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        }
    });
});

// Generic Slideshow Function
function setupSlideshow(slideSelector, dotSelector, interval = 5000) {
    const slides = document.querySelectorAll(slideSelector);
    const dots = document.querySelectorAll(dotSelector);
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }

    if (slides.length > 0) {
        showSlide(currentSlide);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoSlide(); // Reset timer on manual navigation
        });
    });

    function startAutoSlide() {
        if (slides.length > 1) {
            autoSlideInterval = setInterval(() => {
                const nextSlide = (currentSlide + 1) % slides.length;
                showSlide(nextSlide);
            }, interval);
        }
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    startAutoSlide(); // Start auto-slide on load
}

// Setup Hero Slideshow (pastikan ada .hero-slide dan .hero-dot di index.html)
setupSlideshow('.hero-slide', '.hero-dot', 5000);

// Setup Gallery Slideshow (pastikan ada .gallery-slide dan .gallery-dot di index.html)
// Jika Anda ingin galeri menjadi slideshow, pastikan markupnya di index.html sudah sesuai seperti yang saya berikan sebelumnya.
// Jika tidak, hapus baris ini.
setupSlideshow('.gallery-slide', '.gallery-dot', 7000); 


// Scroll Reveal Animation
function checkScroll() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            section.classList.add('visible');
        } else {
            // section.classList.remove('visible'); // Opsional: hilangkan visible jika sudah tidak di viewport
        }
    });
    
    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    }
}

window.addEventListener('scroll', checkScroll);
document.addEventListener('DOMContentLoaded', checkScroll);


// Back to top button
const backToTopButton = document.getElementById('back-to-top');
if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Program Modal (hanya relevan untuk index.html, tambahkan pengecekan)
const programModal = document.getElementById('program-modal');
const programDetailBtns = document.querySelectorAll('.program-detail-btn');
const closeModalBtn = document.getElementById('close-modal');

// Data Program (tetap di JS karena ini data dinamis untuk modal)
const programs = {
    1: {
        title: "Edukasi Literasi & Lingkungan",
        category: "Pendidikan & Lingkungan",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        description: "Program ini berfokus pada peningkatan minat baca anak-anak desa serta penanaman kesadaran pentingnya menjaga lingkungan melalui modul belajar yang interaktif dan menyenangkan.",
        goals: [
            "Meningkatkan kemampuan literasi dasar anak-anak desa.",
            "Menumbuhkan kesadaran akan pentingnya pelestarian lingkungan sejak usia dini.",
            "Menyediakan akses buku dan bahan bacaan yang berkualitas.",
            "Mendorong partisipasi aktif anak-anak dalam kegiatan kebersihan lingkungan."
        ],
        achievements: "Telah menjangkau 20 sekolah dasar di pedesaan, mendistribusikan 5.000+ buku bacaan, dan mengadakan 100+ sesi edukasi lingkungan interaktif."
    },
    2: {
        title: "Pemberdayaan Ekonomi Lokal",
        category: "Ekonomi & Kesejahteraan",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        description: "Program ini membantu masyarakat desa mengembangkan usaha mikro dengan memberikan pelatihan keterampilan, modal usaha, dan akses ke pasar yang lebih luas.",
        goals: [
            "Meningkatkan pendapatan keluarga di pedesaan.",
            "Mengoptimalkan pemanfaatan sumber daya lokal.",
            "Menciptakan peluang usaha dan lapangan kerja baru di desa.",
            "Membangun jaringan pasar bagi produk-produk desa."
        ],
        achievements: "Membina 15 kelompok UMKM desa, berhasil memasarkan produk lokal ke tingkat kabupaten, dan meningkatkan pendapatan anggota rata-rata 30%."
    },
    3: {
        title: "Kesehatan & Sanitasi Desa",
        category: "Kesehatan Masyarakat",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        description: "Program ini fokus pada peningkatan kualitas kesehatan dan sanitasi dasar di desa-desa terpencil melalui penyuluhan, pembangunan fasilitas, dan penyediaan akses air bersih.",
        goals: [
            "Meningkatkan kesadaran masyarakat akan praktik hidup sehat dan higienis.",
            "Menyediakan akses sanitasi yang layak dan berkelanjutan.",
            "Mengurangi angka penyakit yang disebabkan oleh lingkungan tidak sehat.",
            "Meningkatkan partisipasi masyarakat dalam program kesehatan komunitas."
        ],
        achievements: "Mengadakan 50+ sesi penyuluhan kesehatan, membangun 10 fasilitas MCK komunal, dan cakupan imunisasi meningkat 40% di daerah sasaran."
    },
    4: {
        title: "Inovasi Pertanian & Lingkungan",
        category: "Pertanian & Lingkungan",
        image: "https://images.unsplash.com/photo-1500380804539-4e1e8e1e9ad6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        description: "Program ini mendukung petani desa dalam mengadopsi metode pertanian berkelanjutan, penggunaan pupuk organik, dan inovasi teknologi ramah lingkungan untuk hasil panen yang lebih baik.",
        goals: [
            "Meningkatkan produktivitas pertanian secara berkelanjutan.",
            "Mengurangi penggunaan bahan kimia berbahaya dalam pertanian.",
            "Mendorong diversifikasi tanaman dan ketahanan pangan lokal.",
            "Mengedukasi praktik pertanian organik dan konservasi tanah."
        ],
        achievements: "Melatih 300+ petani dalam praktik pertanian organik, membantu pembentukan 5 kelompok tani organik, dan memperkenalkan sistem irigasi hemat air di 8 desa."
    },
    5: {
        title: "Pengembangan Kapasitas Komunitas",
        category: "Pemberdayaan Masyarakat",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
        description: "Program ini bertujuan untuk membangun kapasitas kepemimpinan dan manajemen komunitas di desa, mendorong inisiatif lokal, dan memperkuat kelembagaan desa untuk pembangunan yang mandiri.",
        goals: [
            "Meningkatkan kemampuan pemimpin lokal dalam perencanaan dan pengelolaan desa.",
            "Mendorong munculnya inisiatif pembangunan dari masyarakat sendiri.",
            "Memperkuat struktur organisasi dan kelembagaan di tingkat desa.",
            "Meningkatkan partisipasi aktif seluruh elemen masyarakat dalam pengambilan keputusan."
        ],
        achievements: "Mengadakan 15 lokakarya pengembangan kapasitas dengan peserta dari 30 desa, menghasilkan 5 inisiatif pembangunan desa mandiri."
    },
    6: {
        title: "Akses Air Bersih & Sanitasi",
        category: "Infrastruktur & Lingkungan",
        image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        description: "Fokus pada penyediaan infrastruktur dasar untuk akses air bersih yang berkelanjutan dan fasilitas sanitasi yang layak, serta edukasi tentang pentingnya higienitas.",
        goals: [
            "Menyediakan sumber air bersih yang aman dan mudah diakses.",
            "Mengurangi angka penyakit terkait air dan sanitasi buruk.",
            "Membangun kesadaran akan pentingnya pengelolaan limbah rumah tangga.",
            "Mendorong praktik cuci tangan yang benar dan kebersihan pribadi."
        ],
        achievements: "Memfasilitasi pembangunan 7 sumur bor dan sistem penyaringan air, serta melakukan program edukasi sanitasi di 12 komunitas desa."
    }
};

if (programModal && programDetailBtns.length > 0 && closeModalBtn) {
    programDetailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const programId = btn.getAttribute('data-program');
            const program = programs[programId];
            
            if (program) {
                document.getElementById('modal-title').textContent = program.title;
                document.getElementById('modal-category').textContent = program.category;
                document.getElementById('modal-image').src = program.image;
                document.getElementById('modal-image').alt = program.title;
                document.getElementById('modal-description').textContent = program.description;
                
                const goalsList = document.getElementById('modal-goals');
                goalsList.innerHTML = '';
                program.goals.forEach(goal => {
                    const li = document.createElement('li');
                    li.textContent = goal;
                    goalsList.appendChild(li);
                });
                
                document.getElementById('modal-achievements').textContent = program.achievements;
                
                programModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeModalBtn.addEventListener('click', () => {
        programModal.classList.add('hidden');
        document.body.style.overflow = '';
    });

    programModal.addEventListener('click', (e) => {
        if (e.target === programModal) {
            programModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
}

// Lightbox Gallery (hanya relevan untuk index.html, tambahkan pengecekan)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightbox = document.getElementById('close-lightbox');
// Ganti galleryItems dari .gallery-img menjadi query spesifik jika hanya satu lightbox
// const galleryItems = document.querySelectorAll('.gallery-img'); 

// Jika lightbox hanya untuk galeri utama di index.html, pastikan ini hanya bereaksi di sana
// Jika Anda ingin lightbox umum, pastikan .gallery-img ada di kedua tempat atau buat fungsi terpisah
const mainGalleryImages = document.querySelectorAll('#gallery .gallery-slide'); // Menggunakan .gallery-slide sebagai item yang bisa diklik untuk Lightbox
// Mengubah ini karena sekarang galeri utama adalah slideshow, bukan grid item lagi.
// Jika ingin fungsionalitas lightbox, mungkin perlu tombol "Lihat Foto" di dalam setiap slide atau di bawah slideshow.

// Untuk sekarang, kita nonaktifkan fungsionalitas lightbox otomatis pada klik slide jika tidak ada elemen pemicu yang jelas di markup baru.
// Jika Anda ingin lightbox, pikirkan kembali bagaimana pengguna akan memicunya.
// Misal, tambahkan tombol "Perbesar Foto" di dalam setiap .gallery-slide.

// Contoh sederhana: Mengaktifkan lightbox saat klik slideshow itu sendiri (tidak disarankan untuk UX yang baik)
// slides.forEach(slide => {
//     slide.addEventListener('click', () => {
//         lightboxImg.src = slide.style.backgroundImage.slice(5, -2); // Extract URL
//         lightboxCaption.textContent = slide.alt || 'Galeri Kegiatan';
//         lightbox.style.display = 'flex';
//         document.body.style.overflow = 'hidden';
//     });
// });


if (lightbox && closeLightbox) { // Lightbox bisa tetap berfungsi jika dipicu manual
    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}


// View More Button (hanya relevan untuk index.html, tambahkan pengecekan)
const viewMoreBtn = document.getElementById('view-more-btn');
if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => {
        alert('Fitur ini akan mengarahkan ke halaman galeri lengkap. Dalam implementasi nyata, ini akan membuka halaman baru dengan semua foto.');
    });
}

// Form Validation
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (name && email && subject && message) {
        alert('Terima kasih! Pesan Anda telah berhasil dikirim. Kami akan segera menghubungi Anda.');
        e.target.reset();
    } else {
        alert('Harap lengkapi semua field yang diperlukan.');
    }
});