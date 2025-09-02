// =========================
// Mobile Menu Toggle
// =========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('show');
    // Swap icon (Font Awesome 6)
    const icon = hamburger.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    }
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');
        const icon = hamburger.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      }
    });
  });
}

// =========================
// Contact Form AJAX & Validation
// =========================
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
const submitBtn = form ? form.querySelector("button[type='submit']") : null;

function showStatus(message, type) {
  if (status) {
    status.textContent = message;
    status.className = `form-status ${type}`;
    status.style.display = "block";
  }
}

function validateForm() {
  let isValid = true;
  if (!form) return false;
  const name = form.elements["name"];
  const email = form.elements["email"];
  const message = form.elements["message"];
  if (name && name.value.trim() === "") {
    showStatus("Name is required.", "error");
    isValid = false;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !email.value.trim()) {
    showStatus("Email is required.", "error");
    isValid = false;
  } else if (email && !emailPattern.test(email.value.trim())) {
    showStatus("Enter a valid email.", "error");
    isValid = false;
  }
  if (message && message.value.trim() === "") {
    showStatus("Message cannot be empty.", "error");
    isValid = false;
  }
  return isValid;
}

if (form && submitBtn) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    status.style.display = "none";
    if (!validateForm()) return;
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        form.reset();
        showStatus("✅ Message sent successfully!", "success");
      } else {
        const data = await response.json();
        showStatus(data.errors?.map(err => err.message).join(", ") || "Submission error.", "error");
      }
    } catch (error) {
      showStatus("❌ Network error. Try again.", "error");
    } finally {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }
  });


}

function switchLanguage(lang) {
  alert('Language switched to: ' + lang);
  // You can add your actual language switching logic here
}





const translations = {
  en: {
    heroTitle: "Your Trusted Audit & Tax Consulting Partner",
    heroDesc: "We provide audit, tax, and advisory services in line with global best practices—helping businesses stay transparent, compliant, and confident.",
    aboutTitle: "About Us",
    aboutLead: "Our mission is to be the leading financial services firm in Nigeria through hard work, consistency, and innovative ideas.",
    contactTitle: "Contact Us",
    ctaTitle: "Ready to Work With Us?",
    ctaDesc: "Let’s help you handle your audit, tax, and advisory needs professionally.",
    // Add more keys as needed
  },
  fr: {
    heroTitle: "Votre partenaire de confiance en audit et fiscalité",
    heroDesc: "Nous fournissons des services d'audit, de fiscalité et de conseil selon les meilleures pratiques mondiales.",
    aboutTitle: "À propos de nous",
    aboutLead: "Notre mission est d'être le leader des services financiers au Nigéria grâce au travail acharné et à l'innovation.",
    contactTitle: "Contactez-nous",
    ctaTitle: "Prêt à travailler avec nous ?",
    ctaDesc: "Confiez-nous vos besoins en audit, fiscalité et conseil.",
  },
  ha: {
    heroTitle: "Abokin hulɗarku na gaskiya don bincike da haraji",
    heroDesc: "Muna samar da ayyukan bincike, haraji, da shawarwari bisa mafi kyawun ƙa'idoji na duniya.",
    aboutTitle: "Game da Mu",
    aboutLead: "Manufarmu ita ce zama jagoran kamfanin kudi a Najeriya ta hanyar aiki tukuru da kirkira.",
    contactTitle: "Tuntube Mu",
    ctaTitle: "Shirye kuke ku yi aiki da mu?",
    ctaDesc: "Bari mu taimaka muku da bukatun bincike, haraji, da shawarwari.",
  },
  yo: {
    heroTitle: "Alaba to gbẹkẹle fun Ayẹwo ati Iṣeduro Owo-ori",
    heroDesc: "A n pese iṣẹ ayẹwo, owo-ori ati imọran ni ibamu pẹlu awọn ilana agbaye.",
    aboutTitle: "Nipa Wa",
    aboutLead: "Ise wa ni lati di ile-iṣẹ iṣẹ inawo to ga julọ ni Naijiria.",
    contactTitle: "Kan si Wa",
    ctaTitle: "Ṣe o setan lati ṣiṣẹ pẹlu wa?",
    ctaDesc: "Jẹ ki a ran ọ lọwọ pẹlu awọn aini ayẹwo, owo-ori ati imọran rẹ.",
  },
  ig: {
    heroTitle: "Onye nkwado gị a pụrụ ịtụkwasị obi maka nyocha na ụtụ isi",
    heroDesc: "Anyị na-enye ọrụ nyocha, ụtụ isi na ndụmọdụ dabere na ụkpụrụ ụwa.",
    aboutTitle: "Banyere Anyị",
    aboutLead: "Ebumnuche anyị bụ ịbụ ụlọ ọrụ ego kacha mma na Naịjirịa site n'ịrụsi ọrụ ike na imepụta ihe.",
    contactTitle: "Kpọtụrụ Anyị",
    ctaTitle: "Ị dị njikere ịrụ ọrụ na anyị?",
    ctaDesc: "Ka anyị nyere gị aka na mkpa nyocha, ụtụ isi na ndụmọdụ.",
  }
};

function switchLanguage(lang) {
  const t = translations[lang] || translations.en;

  // Hero section
  const heroTitle = document.querySelector('.hero h1');
  const heroDesc = document.querySelector('.hero p');
  if (heroTitle) heroTitle.textContent = t.heroTitle;
  if (heroDesc) heroDesc.textContent = t.heroDesc;

  // About section
  const aboutTitle = document.querySelector('.about h2');
  const aboutLead = document.querySelector('.about .lead');
  if (aboutTitle) aboutTitle.textContent = t.aboutTitle;
  if (aboutLead) aboutLead.textContent = t.aboutLead;

  // Contact section
  const contactTitle = document.querySelector('.contact h2');
  if (contactTitle) contactTitle.textContent = t.contactTitle;

  // CTA section
  const ctaTitle = document.querySelector('.cta h2');
  const ctaDesc = document.querySelector('.cta p');
  if (ctaTitle) ctaTitle.textContent = t.ctaTitle;
  if (ctaDesc) ctaDesc.textContent = t.ctaDesc;

  // Add more selectors for other texts as needed
}
