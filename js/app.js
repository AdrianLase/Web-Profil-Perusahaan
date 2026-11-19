/* ====================================================
   APP.JS — PT Sinar Pangan Digital
   Toast, Product Filter, Contact Form Validation
   ==================================================== */
'use strict';

// =============================================
// 1. TOAST NOTIFICATION
// =============================================
function showToast(message, type, duration) {
    type = type || 'success';
    duration = duration || 3500;
    var t = document.getElementById('toastNotif');
    if (!t) return;
    t.className = 'toast-sp ' + type;
    t.innerHTML = '<i class="bi ' + (type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill') + '"></i> ' + message;
    setTimeout(function() { t.classList.add('show'); }, 10);
    setTimeout(function() { t.classList.remove('show'); }, duration);
}

// =============================================
// 2. PRODUCT FILTER (only runs on produk.html)
// =============================================
function initProductFilter() {
    var filterBar = document.getElementById('filterBar');
    var grid = document.getElementById('productGrid');
    var countEl = document.getElementById('productCount');
    if (!filterBar || !grid) return;

    var products = [
        { name: "Beras Pandan Wangi Premium", desc: "Beras pandan wangi pilihan dari petani Cianjur, pulen dan beraroma harum alami.", category: "beras", price: "Rp 75.000/5kg", icon: "bi-basket2-fill", gradient: "var(--primary-gradient)", tag: "Best Seller" },
        { name: "Minyak Goreng Kelapa Sawit", desc: "Minyak goreng jernih dua kali penyaringan, rendah kolesterol dan tahan panas tinggi.", category: "minyak", price: "Rp 45.000/2L", icon: "bi-droplet-fill", gradient: "var(--accent-gradient)", tag: "Best Seller" },
        { name: "Tepung Terigu Serbaguna", desc: "Tepung terigu protein sedang untuk aneka kue, roti, gorengan, dan mie homemade.", category: "tepung", price: "Rp 14.500/kg", icon: "bi-snow2", gradient: "linear-gradient(135deg,#6366f1,#8b5cf6)", tag: "" },
        { name: "Bumbu Rendang Instan", desc: "Bumbu rendang siap masak dengan rempah asli Padang, cukup tambahkan santan dan daging.", category: "bumbu", price: "Rp 18.500/pcs", icon: "bi-fire", gradient: "linear-gradient(135deg,#f43f5e,#e11d48)", tag: "Favorit" },
        { name: "Gula Aren Premium", desc: "Gula aren asli dari Banten, aroma karamel alami untuk kopi, kolak, dan hidangan tradisional.", category: "gula", price: "Rp 35.000/500g", icon: "bi-cup-hot-fill", gradient: "linear-gradient(135deg,#f59e0b,#d97706)", tag: "Premium" },
        { name: "Beras Merah Organik", desc: "Beras merah organik kaya serat dan antioksidan, cocok untuk diet sehat.", category: "beras", price: "Rp 68.000/2kg", icon: "bi-basket2-fill", gradient: "var(--primary-gradient)", tag: "Organik" }
    ];

    function renderProducts(filter) {
        var filtered = filter === 'semua' ? products : products.filter(function(p) { return p.category === filter; });
        var existing = grid.querySelectorAll('.product-card');
        existing.forEach(function(el) { el.classList.add('hiding'); });

        setTimeout(function() {
            grid.innerHTML = '';
            filtered.forEach(function(p, i) {
                var tagHtml = p.tag ? '<span class="badge-sp" style="font-size:0.65rem">' + p.tag + '</span>' : '';
                var card = document.createElement('div');
                card.className = 'col-6 col-md-4 col-lg-3 product-card hiding';
                card.setAttribute('role', 'listitem');
                card.innerHTML =
                    '<div class="glass h-100" style="padding:1.2rem">' +
                        '<div class="d-flex align-items-start justify-content-between mb-2">' +
                            '<div class="icon-box icon-box-sm" style="background:' + p.gradient + ';border-radius:10px"><i class="bi ' + p.icon + '"></i></div>' +
                            tagHtml +
                        '</div>' +
                        '<h6 class="fw-bold mb-1" style="font-size:.88rem;line-height:1.35">' + p.name + '</h6>' +
                        '<p class="text-secondary mb-2" style="font-size:.78rem;line-height:1.5">' + p.desc + '</p>' +
                        '<div class="d-flex align-items-center justify-content-between mt-auto">' +
                            '<span class="price-tag">' + p.price + '</span>' +
                            '<span class="badge-sp badge-sp-outline" style="font-size:.65rem;text-transform:capitalize">' + p.category + '</span>' +
                        '</div>' +
                    '</div>';
                grid.appendChild(card);
                setTimeout(function() { card.classList.remove('hiding'); }, 40 * i);
            });
            if (countEl) countEl.textContent = 'Menampilkan ' + filtered.length + ' produk';
        }, existing.length > 0 ? 200 : 0);
    }

    filterBar.addEventListener('click', function(e) {
        var btn = e.target.closest('.filter-btn');
        if (!btn) return;
        this.querySelectorAll('.filter-btn').forEach(function(b) {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        renderProducts(btn.getAttribute('data-filter'));
    });

    renderProducts('semua');
}

// =============================================
// 3. CONTACT FORM VALIDATION (only on kontak.html)
// =============================================
function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var fields = {
        nama:   { el: document.getElementById('cNama'),   err: document.getElementById('err-nama') },
        email:  { el: document.getElementById('cEmail'),  err: document.getElementById('err-email') },
        telp:   { el: document.getElementById('cTelp'),   err: document.getElementById('err-telp') },
        subjek: { el: document.getElementById('cSubjek'), err: document.getElementById('err-subjek') },
        pesan:  { el: document.getElementById('cPesan'),  err: document.getElementById('err-pesan') }
    };
    var charCount = document.getElementById('charCount');
    var btnSubmit = document.getElementById('btnSubmit');

    function validateField(name) {
        var f = fields[name];
        var val = f.el.value.trim();
        var msg = '';

        switch (name) {
            case 'nama':
                if (!val) msg = 'Nama lengkap wajib diisi.';
                else if (val.length < 3) msg = 'Nama minimal 3 karakter.';
                else if (val.length > 100) msg = 'Nama maksimal 100 karakter.';
                break;
            case 'email':
                if (!val) msg = 'Email wajib diisi.';
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) msg = 'Format email tidak valid.';
                break;
            case 'telp':
                if (!val) msg = 'Nomor telepon wajib diisi.';
                else if (!/^(\+62|62|08)[0-9]{8,13}$/.test(val.replace(/[\s\-]/g, ''))) msg = 'Format nomor telepon tidak valid (contoh: 08xx atau +62xx).';
                break;
            case 'subjek':
                if (!val) msg = 'Silakan pilih subjek pesan.';
                break;
            case 'pesan':
                if (!val) msg = 'Pesan wajib diisi.';
                else if (val.length < 10) msg = 'Pesan minimal 10 karakter.';
                else if (val.length > 500) msg = 'Pesan maksimal 500 karakter.';
                break;
        }

        if (msg) {
            f.el.classList.add('is-invalid');
            f.el.classList.remove('is-valid');
            f.err.textContent = msg;
            f.err.style.display = 'block';
            f.err.style.visibility = 'visible';
            return false;
        } else {
            f.el.classList.remove('is-invalid');
            f.el.classList.add('is-valid');
            f.err.style.display = 'none';
            return true;
        }
    }

    // Real-time validation
    Object.keys(fields).forEach(function(name) {
        fields[name].el.addEventListener('blur', function() { validateField(name); });
        fields[name].el.addEventListener('input', function() {
            if (fields[name].el.classList.contains('is-invalid')) validateField(name);
        });
    });

    // Character counter
    fields.pesan.el.addEventListener('input', function() {
        var len = this.value.length;
        charCount.textContent = len + '/500';
        charCount.style.color = len > 500 ? 'var(--red-500)' : len > 400 ? 'var(--amber-500)' : 'var(--text-muted)';
    });

    // Submit
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var isValid = true;
        Object.keys(fields).forEach(function(name) {
            if (!validateField(name)) isValid = false;
        });

        if (!isValid) {
            var firstInvalid = form.querySelector('.is-invalid');
            if (firstInvalid) firstInvalid.focus();
            showToast('Mohon perbaiki kesalahan pada formulir.', 'error');
            return;
        }

        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Mengirim...';

        setTimeout(function() {
            showToast('Pesan Anda berhasil terkirim! Tim kami akan segera menghubungi Anda.', 'success', 4500);
            form.reset();
            charCount.textContent = '0/500';
            Object.keys(fields).forEach(function(name) {
                fields[name].el.classList.remove('is-valid', 'is-invalid');
                fields[name].err.style.display = 'none';
            });
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = '<i class="bi bi-send-fill"></i> Kirim Pesan';
        }, 1500);
    });
}

// =============================================
// 4. BACKGROUND SWITCHER WIDGET
// =============================================
function initBgSwitcher() {
    // Create floating widget HTML
    var widgetHtml = 
        '<button class="bg-switcher-btn" id="bgSwitcherBtn" title="Ganti Background Website">' +
            '<i class="bi bi-palette-fill"></i>' +
        '</button>' +
        '<div class="bg-switcher-panel" id="bgSwitcherPanel">' +
            '<h6><i class="bi bi-paint-bucket me-1"></i>Pilih Background Web</h6>' +
            '<div class="d-flex flex-column gap-1">' +
                '<div class="bg-option-item active" data-bg="#060d13" data-type="color">' +
                    '<span class="bg-dot" style="background:#060d13"></span> Dark Food-Tech' +
                '</div>' +
                '<div class="bg-option-item" data-bg="#042f2e" data-type="color">' +
                    '<span class="bg-dot" style="background:#042f2e"></span> Emerald Forest' +
                '</div>' +
                '<div class="bg-option-item" data-bg="#091e3a" data-type="color">' +
                    '<span class="bg-dot" style="background:#091e3a"></span> Midnight Blue' +
                '</div>' +
                '<div class="bg-option-item" data-bg="#18181b" data-type="color">' +
                    '<span class="bg-dot" style="background:#18181b"></span> Warm Charcoal' +
                '</div>' +
                '<div class="bg-option-item" data-bg="img/bg.svg" data-type="image">' +
                    '<span class="bg-dot" style="background:linear-gradient(135deg,#10b981,#f59e0b)"></span> Gambar Vector (img/bg.svg)' +
                '</div>' +
            '</div>' +
        '</div>';

    var container = document.createElement('div');
    container.innerHTML = widgetHtml;
    document.body.appendChild(container);

    var btn = document.getElementById('bgSwitcherBtn');
    var panel = document.getElementById('bgSwitcherPanel');
    var options = panel.querySelectorAll('.bg-option-item');

    // Toggle panel
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        panel.classList.toggle('show');
    });

    document.addEventListener('click', function(e) {
        if (!panel.contains(e.target) && e.target !== btn) {
            panel.classList.remove('show');
        }
    });

    // Apply saved background
    var savedBg = localStorage.getItem('sp_bg_val');
    var savedType = localStorage.getItem('sp_bg_type');
    if (savedBg && savedType) {
        applyBg(savedBg, savedType);
        options.forEach(function(opt) {
            opt.classList.toggle('active', opt.getAttribute('data-bg') === savedBg);
        });
    }

    // Option click handler
    options.forEach(function(opt) {
        opt.addEventListener('click', function() {
            var bgVal = this.getAttribute('data-bg');
            var bgType = this.getAttribute('data-type');

            options.forEach(function(o) { o.classList.remove('active'); });
            this.classList.add('active');

            applyBg(bgVal, bgType);
            localStorage.setItem('sp_bg_val', bgVal);
            localStorage.setItem('sp_bg_type', bgType);

            showToast('Background berhasil diubah!', 'success', 2000);
        });
    });
}

function applyBg(val, type) {
    if (type === 'image') {
        document.body.style.backgroundColor = '#060d13';
        document.body.style.backgroundImage = 'linear-gradient(rgba(6, 13, 19, 0.82), rgba(6, 13, 19, 0.82)), url("' + val + '")';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundRepeat = 'no-repeat';
    } else {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = val;
    }
}

// =============================================
// 5. INIT ON PAGE LOAD
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    initProductFilter();
    initContactForm();
    initBgSwitcher();
});
