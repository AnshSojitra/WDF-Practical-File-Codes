document.addEventListener("DOMContentLoaded", () => {
  // Load FAQs
  fetch("data/faqs.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("faqContainer");
      data.forEach(faq => {
        const item = document.createElement("div");
        item.className = "faq-item";
        item.innerHTML = `<strong>${faq.question}</strong><div class="faq-answer">${faq.answer}</div>`;
        item.addEventListener("click", () => {
          const answer = item.querySelector(".faq-answer");
          answer.style.display = answer.style.display === "block" ? "none" : "block";
        });
        container.appendChild(item);
      });
    });
  
  document.addEventListener("DOMContentLoaded", () => {
  fetch("data/slider.json")
    .then(res => res.json())
    .then(images => {
      const slider = document.getElementById("imageSlider");
      images.forEach(img => {
        const imageEl = document.createElement("img");
        imageEl.src = img.url;
        imageEl.alt = img.caption || "Slider Image";
        slider.appendChild(imageEl);
      });
    });
});

  // Load Events
  fetch("data/events.json")
    .then(res => res.json())
    .then(events => {
      const slider = document.getElementById("eventSlider");
      events.forEach(event => {
        const card = document.createElement("div");
        card.className = "slider-card";
        card.innerHTML = `<h3>${event.title}</h3><p>${event.date}</p>`;
        slider.appendChild(card);
      });
    });
    
  // Popup
  const popup = document.getElementById("popup");
  document.getElementById("popupTrigger").addEventListener("click", () => {
    popup.classList.remove("hidden");
  });
  document.getElementById("closePopup").addEventListener("click", () => {
    popup.classList.add("hidden");
  });

  // Notification Banner
  const banner = document.getElementById("notificationBanner");
  setTimeout(() => banner.classList.remove("hidden"), 1000);
  setTimeout(() => banner.classList.add("hidden"), 5000);

  // Theme Switcher
  document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
});
