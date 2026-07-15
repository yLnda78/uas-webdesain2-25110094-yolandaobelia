document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(function () {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
    }, 800);
  }

  AOS.init({
    duration: 1200,   
    once: true,       
    easing: 'ease-out-cubic'
  });

  const contentSections = document.querySelectorAll("main section");

  document.addEventListener("click", function (event) {
    const targetLink = event.target.closest("[data-page]");
    if (!targetLink) return;

    event.preventDefault();

    const targetPageId = targetLink.getAttribute("data-page");
    const targetSection = document.getElementById(targetPageId);

    if (!targetSection) return;

    contentSections.forEach(function (section) {
      section.classList.remove("active");
    });

    targetSection.classList.add("active");

    setTimeout(function() {
      AOS.refresh();
    }, 150);

    document.querySelectorAll("[data-page]").forEach(function (el) {
      el.classList.remove("active-nav");
    });

    document.querySelectorAll(".navbar-nav .nav-link").forEach(function (navLink) {
      if (navLink.getAttribute("data-page") === targetPageId) {
        navLink.classList.add("active-nav");
      }
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    const navbarCollapseElement = document.getElementById("navbarNav");
    if (navbarCollapseElement) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapseElement);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    }
  });

  const btnBackToTop = document.getElementById("btnBackToTop");
  
  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      btnBackToTop.classList.add("show");
    } else {
      btnBackToTop.classList.remove("show");
    }
  });

  btnBackToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  popoverTriggerList.forEach(function (popoverTriggerEl) {
    new bootstrap.Popover(popoverTriggerEl);
  });

  // FORM HUBUNGI / KRITIK SARAN
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const nama = contactForm.querySelector('[name="nama"]').value;
      const kategori = contactForm.querySelector('[name="kategori"]').value;
      const pesan = contactForm.querySelector('[name="pesan"]').value;

      const nomorWA = "628126424020"; 

      const teksPesan = `Halo Sarapan Pagi TKA,%0A%0A` +
                        `Saya ingin mengirimkan formulir pesan berikut:%0A%0A` +
                        `*Nama Lengkap:* ${encodeURIComponent(nama)}%0A` +
                        `*Kategori:* ${encodeURIComponent(kategori)}%0A` +
                        `*Isi Pesan:* ${encodeURIComponent(pesan)}`;

      window.open(`https://wa.me/${nomorWA}?text=${teksPesan}`, '_blank');
      
      contactForm.reset(); 
    });
  }

  // --- LOGIKA UTAMA FITUR PEMESANAN KURSI / RESERVASI MEJA ---
  const mejaBoxes = document.querySelectorAll(".meja-box");
  const btnBukaForm = document.getElementById("btnBukaFormReservasi");
  const inputMejaTerpilih = document.getElementById("inputMejaTerpilih");
  const reservasiForm = document.getElementById("reservasiForm");
  let mejaTerpilihData = "";

  mejaBoxes.forEach(function (meja) {
    meja.addEventListener("click", function () {
      mejaBoxes.forEach(box => box.classList.remove("selected"));
      
      this.classList.add("selected");
      
      mejaTerpilihData = this.getAttribute("data-meja");
      inputMejaTerpilih.value = mejaTerpilihData;
      
      if (btnBukaForm) {
        btnBukaForm.classList.remove("disabled");
      }
    });
  });

  if (btnBukaForm) {
    btnBukaForm.addEventListener("click", function() {
      if(!mejaTerpilihData) return;
      const modalReservasi = new bootstrap.Modal(document.getElementById('formReservasiModal'));
      modalReservasi.show();
    });
  }

  if (reservasiForm) {
    reservasiForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const nama = reservasiForm.querySelector('[name="namaRes"]').value;
      const jam = reservasiForm.querySelector('[name="jamRes"]').value;
      const orang = reservasiForm.querySelector('[name="jumlahOrang"]').value;

      const nomorWA = "628126424020"; 

      const teksPesan = `Halo Kedai Sarapan Pagi TKA,%0A%0A` +
                        `Saya ingin melakukan *Booking/Reservasi Kursi* dengan detail berikut:%0A%0A` +
                        `*Pilihan Tempat:* ${encodeURIComponent(mejaTerpilihData)}%0A` +
                        `*Nama Pemesan:* ${encodeURIComponent(nama)}%0A` +
                        `*Jam Kedatangan:* ${encodeURIComponent(jam)}%0A` +
                        `*Jumlah Orang:* ${encodeURIComponent(orang)} Orang%0A%0A` +
                        `Mohon konfirmasi ketersediaan mejanya segera, Terima Kasih!`;

      window.open(`https://wa.me/${nomorWA}?text=${teksPesan}`, '_blank');
      
      const modalElement = document.getElementById('formReservasiModal');
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if(modalInstance) modalInstance.hide();
      
      reservasiForm.reset(); 
    });
  }
});

function setModalContent(title, description) {
  const modalTitle = document.getElementById("modalMenuTitle");
  const modalDesc = document.getElementById("modalMenuDesc");
  
  if (modalTitle && modalDesc) {
    modalTitle.textContent = title;
    modalDesc.textContent = description;
  }
}