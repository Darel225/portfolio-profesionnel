document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const timeline = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });
  timeline
    .from(".site-header", { y: -40, opacity: 0 })
    .from(".hero-copy", { y: 60, opacity: 0 }, "-=0.5")
    .from(".hero-visual", { y: 60, opacity: 0 }, "-=0.6");

  gsap.utils
    .toArray("section")
    .filter((section) => !section.classList.contains("hero-section"))
    .forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });
    });

  document.querySelectorAll("[data-tilt]").forEach((card) => {
    const handleTilt = (event) => {
      const bounds = card.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const rotateX = ((event.clientY - centerY) / bounds.height) * 10;
      const rotateY = -((event.clientX - centerX) / bounds.width) * 10;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    };

    card.addEventListener("pointermove", handleTilt);
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });

  const downloadLinks = [
    document.getElementById("downloadCvPrimary"),
    document.getElementById("downloadCvSecondary"),
  ].filter(Boolean);

  const attachCv = (file) => {
    const objectUrl = URL.createObjectURL(file);
    downloadLinks.forEach((link) => {
      link.href = objectUrl;
      link.download = file.name;
      link.textContent = `Télécharger ${file.name}`;
    });
  };

  const bindUploaders = () => {
    document.querySelectorAll(".upload-trigger input").forEach((input) => {
      input.addEventListener("change", (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (file.type !== "application/pdf") {
          alert("Merci d’importer un fichier PDF.");
          return;
        }
        attachCv(file);
        event.target.value = "";
      });
    });
  };

  bindUploaders();

  const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "a05ec3ea-b1bd-4d67-a7d2-7d646f8ad772");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
});


