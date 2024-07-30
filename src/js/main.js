//// QUERY SELECTOR

function element(element) {
  return document.querySelector(element);
}

///// HAM BTN AND NAV OPEN/CLOSEDS

const hamBtn = document.querySelector(".ham-btn");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
hamBtn.addEventListener("click", (e) => {
  if (nav.getAttribute("aria-expanded") === "false") {
    nav.setAttribute("aria-expanded", "true");
    hamBtn.setAttribute("data-active", "true");
    document.querySelector(".main").classList.add("body-overlay");
    // header.setAttribute("data-active", "false");
  } else {
    nav.setAttribute("aria-expanded", "false");
    hamBtn.setAttribute("data-active", "false");
    document.querySelector(".main").classList.remove("body-overlay");

    // header.setAttribute("data-active", "true");
  }
  nav.addEventListener("click", (e) => {
    if (!e.target.matches(".nav__list")) {
      nav.setAttribute("aria-expanded", "false");
      hamBtn.setAttribute("data-active", "false");
      document.querySelector(".main").classList.remove("body-overlay");
    }
  });
});

document.body.addEventListener("click", (e) => {
  if (nav.getAttribute("aria-expanded") === "true") {
    if (e.target.matches(".body-overlay")) {
      nav.setAttribute("aria-expanded", "false");
      hamBtn.setAttribute("data-active", "false");
      document.querySelector(".main").classList.remove("body-overlay");
    }
  }
});

// PROJECT COUNTER

document.addEventListener("DOMContentLoaded", function () {
  let valueDisplays = document.querySelectorAll(".count");
  let interval = 10000;

  // Function to start the counter
  function startCounter(valueDisplay) {
    let startValue = 0;
    let endValue = Number(valueDisplay.getAttribute("data-num"));
    let duration = Math.floor(interval / endValue);
    let counter = setInterval(() => {
      startValue += 1;
      valueDisplay.textContent = startValue;
      if (startValue == endValue) {
        clearInterval(counter);
      }
    }, duration);
  }

  // Intersection Observer callback
  let observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        observer.unobserve(entry.target); // Stop observing once the counter starts
      }
    });
  };

  // Intersection Observer options
  let observerOptions = {
    threshold: 0.5, // Trigger when 50% of the element is in view
  };

  // Create an Intersection Observer
  let observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe each value display element
  valueDisplays.forEach((valueDisplay) => {
    observer.observe(valueDisplay);
  });
});

// SWIPER

var swiper = new Swiper(".testimonial-swiper", {
  slidesPerView: 1,
  spaceBetween: 550,
  loop: true,
  autoplay: true,
  speed: 1500,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// INPUT FOCUS

const contactInputAll = document.querySelectorAll(".contact__form-input input");
const contactLabelAll = document.querySelectorAll(".contact-label");

contactInputAll.forEach((contactInput) => {
  contactInput.addEventListener("input", (e) => {
    const inputValue = e.target.value;
    const label = e.target.nextElementSibling;
    if (inputValue.trim() === "") {
      label.classList.remove("contact-focus-js");
    } else {
      label.classList.add("contact-focus-js");
    }
  });
});

// HERO PLAY VIDEO BTN

const videoOverlay = document.createElement("div");
const heroCta = document.querySelector(".play-video-btn");

heroCta.addEventListener("click", (e) => {
  // Create a div for the video overlay
  videoOverlay.classList.add("hero-overlay");

  // Create the video element and set its attributes
  const videoClip = document.createElement("video");
  videoClip.src = "/src/assets/konig-pferd-ovelray-video.mp4";
  videoClip.autoplay = true;
  videoClip.loop = true;
  videoClip.controls = true;
  videoClip.muted = false;
  videoClip.poster = "/src/assets/images/thumbnail-splash-overlay.jpg";
  videoClip.preload = "auto";
  videoClip.crossOrigin = "anonymous";
  videoClip.playsInline = true;
  videoClip.disableRemotePlayback = true;
  videoClip.classList.add("modal-video");

  // Create the source element and set its attributes
  const sourceElement = document.createElement("source");
  sourceElement.src = "video.mp4";
  sourceElement.type = "video/mp4";

  // Append the source element to the video element
  videoClip.appendChild(sourceElement);

  // Append the video element to the video overlay div
  videoOverlay.append(videoClip);

  // Append the video overlay div to the body
  document.body.append(videoOverlay);
});
videoOverlay.addEventListener("click", (e) => {
  if (e.target.matches(".hero-overlay")) {
    videoOverlay.firstElementChild.remove();
    videoOverlay.remove();
  }
});

// SADDLE TABS

const tabsBtns = document.querySelectorAll(".saddles-tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabsBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    tabsBtns.forEach((btn) => btn.setAttribute("data-active", "false"));
    e.currentTarget.setAttribute("data-active", "true");
    const tabId = btn.textContent;
    const abc = [...tabContents];
    const apn = abc.find((obj) => tabId === obj.dataset.id);
    abc.forEach((obj) => obj.setAttribute("data-active", "false"));
    apn.setAttribute("data-active", "true");
  });
});

// GSAP

///////// INTERSECTION OBSERVER

// from left stagger

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
      //  else {
      //   entry.target.classList.remove("active");
      // }
    });
  },
  { threshold: 0.2 }
);
// left
const left = document.querySelectorAll(".hidden-left");
left.forEach((el) => observer.observe(el));
// right
const right = document.querySelectorAll(".hidden-right");
right.forEach((el) => observer.observe(el));
// bottom
const fade = document.querySelectorAll(".hidden-fade");
fade.forEach((el) => observer.observe(el));

// baguette GALLERY
baguetteBox.run(".gallery");

////// LANGUAGES

let currLanguage = localStorage.getItem("language") || "de";
let langOverlay = document.querySelector(".lang-question");

///// language intro overlay modal

if (!localStorage.getItem("language")) {
  langOverlay.setAttribute("data-active", "true");
  document.querySelectorAll(".lang-question__option-btn").forEach((option) => {
    option.addEventListener("click", (e) => {
      function updateLanguage(language) {
        if (language === "en") {
          en();
        } else if (language === "de") {
          de();
        }
      }
      const selectedLanguage = e.target.dataset.value;
      if (selectedLanguage === "en" || selectedLanguage === "de") {
        localStorage.setItem("language", selectedLanguage);
        updateLanguage(selectedLanguage);

        document
          .querySelectorAll(".language-form__option")
          .forEach((option) => {
            option.classList.remove("active");
          });
        const initiallySelectedOption = document.querySelector(
          `.language-form__option > [data-value="${selectedLanguage}"]`
        );
        initiallySelectedOption.parentElement.classList.add("active");
      }
      langOverlay.setAttribute("data-active", "false");
    });
  });
}

// set LANGUAGE to LOCAL STORAGE

document.addEventListener("DOMContentLoaded", () => {
  let options = document.querySelectorAll(".language-form__option");

  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      options.forEach((opt) => {
        opt.classList.remove("active");
      });

      if (!option.classList.contains("active")) {
        option.classList.add("active");
      }

      const selectedLanguage = e.target.dataset.value;

      if (selectedLanguage === "en" || selectedLanguage === "de") {
        localStorage.setItem("language", selectedLanguage);
        updateLanguage(selectedLanguage);
      }
    });
  });

  function updateLanguage(language) {
    if (language === "en") {
      en();
    } else if (language === "de") {
      de();
    }
  }
  // Call the function to set the initial language based on localStorage
  updateLanguage(currLanguage);

  // Add the 'active' class to the initially selected language
  const initiallySelectedOption = document.querySelector(
    `[data-value="${currLanguage}"]`
  );
  if (initiallySelectedOption) {
    initiallySelectedOption.parentElement.classList.add("active");
  }
});

function de() {
  element(".hero--cta").innerText = "Entdecken Sie Ihren Sattel";
  element(
    ".offer--subheadline"
  ).innerText = `Sattelanpassung | Sattelverkauf | Sattel Passform Beurteilung und Druckmessung (fast aller Sattelmarken)`;
  element(".nav-link-1").innerText = "Angebot";
  element(".nav-link-2").innerText = "Merkmale";
  element(".nav-link-3").innerText = "Sättel";
  element(".nav-link-4").innerText = "Kontakt";
  element(".hero__headline").innerText = "do it with passion or not at all!";
  element(".hero__footer-subheadline").innerText =
    "SPEZIALISIERTE SÄTTEL FÜR IHR PFERD";
  element(
    ".dietmar--subheadline"
  ).innerText = `Experte für Sattelverkauf und Sattelanpassung in Österreich (ausg. Vorarlberg & Tirol)`;
  element(
    ".dietmar--paragraph-one"
  ).innerText = `Ich treffe persönlich eine Vorselektion und bringe den richtigen
                Sattel zum Pferd/Reiter:in-Paar und nicht umgekehrt. Da ich
                selbst aktiv Dressur bis zur schweren Klasse reite, selbst
                Springturniere absolviert habe und mir das Wohl aller Pferde
                sehr am Herzen liegt, verwende ich nur Produkte von Herstellern,
                die sich bei meiner persönlichen Testung bewährt haben.`;
  element(
    ".dietmar--paragraph-two"
  ).innerText = `Langes Studium der Anatomie und Bewegungsphysiologie an der Vet.
                Med. Universität in Wien und eine internationale
                Sattlerausbildung mit Schwerpunkt Saddlefitting haben mir das
                handwerkliche Rüstzeug sowie das notwendige breite Wissen um die
                Sattelpassform ermöglicht.`;
  element(".project-counter--heading").innerText = `Aus Liebe zum Pferd`;
  element(".count__caption--seit").innerText = `Seit`;
  element(".count__caption--bundeslander").innerText = `Bundesländer`;
  element(".count__caption--kunden").innerText = `Kunden`;
  element(".count__caption--pferde").innerText = `eigene Pferde`;
  element(".offer--heading").innerText = `Konzept Konig Pferd garantiert`;
  element(".offer-1-heading").innerText = `Bestes Preis-Leistungsverhältnis`;
  element(
    ".offer-1-subheading"
  ).innerText = `Lorem ipsum dolor sit amet consectetur. Arcu magna risus
  platea nunc ridiculus. Parturient euismod elit placerat sed
  non.`;
  element(".offer-2-heading").innerText = `Faire Preis-Leistung`;
  element(
    ".offer-2-subheading"
  ).innerText = `Meine Leistungen stehen in einem fairen
  Preis-Leistungsverhältnis. Ich besuche und berate Dich gerne
  vor Ort und nehme mir dafür genügend Zeit.`;
  element(".offer-3-heading").innerText = `Passform Garantie`;
  element(
    ".offer-3-subheading"
  ).innerText = `Mein Angebot ist markenübergreifend. Der Sattel wird nach
  sorgfältiger Auswahl persönlich erstangepasst, die genaue
  Passform wird garantiert.`;
  element(".offer-4-heading").innerText = `Absolute Verlässlichkeit`;
  element(
    ".offer-4-subheading"
  ).innerText = `König Pferd steht für ein Höchstmaß an Zuverlässigkeit bei
                zeitgerechter Terminvergabe. Sättel werden ohne Zeit- und
                Kaufzwang getestet.`;
  element(".offer-5-heading").innerText = `Mega Erfahrung`;
  element(
    ".offer-5-subheading"
  ).innerText = `Mit Stolz kann ich auf ein langjähriges Erfahrungswissen
  zurückgreifen. Ich vertreibe nur Produkte, die ich persönlich
  getestet habe.`;
  element(
    ".offer-6-heading"
  ).innerText = `Wissen am neuesten Stand der Technik`;
  element(
    ".offer-6-subheading"
  ).innerText = `Lorem ipsum dolor sit amet consectetur. Arcu magna risus
  platea nunc ridiculus. Parturient euismod elit placerat sed
  non.`;
  element(".offer-7-heading").innerText = `Seriosität`;
  element(
    ".offer-7-subheading"
  ).innerText = `Lorem ipsum dolor sit amet consectetur. Arcu magna risus
  platea nunc ridiculus. Parturient euismod elit placerat sed
  non.`;
  element(".testimonial--heading").innerText = `Kundenmeinung`;
  element(
    ".testimonial--1-paragraph"
  ).innerText = `Für uns der Beste! Preis/Leistung stimmt zu 100%. Man wird
                sehr gut beraten und es wird auf die Bedürfnisse vom Reiter
                und vom Pferd eingegangen. Das Pferd wird genau vermessen und
                anschließend wird beim vorreiten geschaut ob wirklich alles
                paßt. Würden nie wo anders einen Sattel kaufen.`;
  element(".testimonial--name").innerText = `Natalie U. (Google rezension)`;
  element(
    ".testimonial--2-paragraph"
  ).innerText = `Habe 31 Sättel ausprobiert! Entweder für mich nicht passend oder für das Pferd. Dann hat mich König Pferd beraten und den perfekten Sattel gebracht. Mein Pferd geht seither hervorragend. Fazit: Zuverlässig! Kompetent! Sehr schnelle Terminverhabe! Pünktlich! Perfekte Lösung für Pferd und Reiter! Hervorragende Nachbetreuung bei Veränderungen des Pferderückens.`;
  element(".testimonial--2-name").innerText = `Christina R. (Google rezension)`;
  element(
    ".testimonial--3-paragraph"
  ).innerText = `König Pferd hat mich super beraten, mein Pferd hat seit mittlerweile 8 Jahren den selben Sattel und hatte nie Probleme. Jährlicher Check genügt. Auch weitere Einsteller bei uns im Stall wurden kompetent beraten, ohne das Gefühl zu haben, es werde etwas aufgeschwatzt. Erkärt und arbeitet immer genau und ist sehr pünktlich und zuverlässig.`;
  element(".testimonial--3-name").innerText = `Elisabeth G. (Google rezension)`;
  element(".feature--heading").innerText = `Der perfekte Sattel`;
  element(
    ".feature--subheading"
  ).innerText = `Liegt auf dem Pferderücken an der richtigen Stelle, gewährt durch
            seine Lage dem Pferd immer optimale Bewegungsfreiheit und passt
            auch dem Reiter.`;
  element(".feature--2-heading").innerText = `Sattelmodell`;
  element(
    ".feature--2-subheading"
  ).innerText = `Sattelänge, Kissenkanal und Braumbreite ist korrekt.`;
  element(".feature--3-heading").innerText = `Reiter:in`;
  element(
    ".feature--3-subheading"
  ).innerText = `Sattelmodell und Sitzgröße ist auf den/die Reiter:in
                    abgestimmt.`;
  element(".feature--4-heading").innerText = `Flexiblität`;
  element(
    ".feature--4-subheading"
  ).innerText = `Lässt sich mit der ändernden Anatomie des Pferdes
                    anpassen.`;
  element(".feature--5-heading").innerText = `Widerristfreiheit`;
  element(
    ".feature--5-subheading"
  ).innerText = `Sattelänge, Kissenkanal und Braumbreite ist korrekt.`;
  element(".feature--6-heading").innerText = `Schwerpunkt`;
  element(
    ".feature--6-subheading"
  ).innerText = `Liegt in der Mitte, Schulter und Lende tragen kein
                    Gewicht.`;
  element(".feature--7-heading").innerText = `Bewegungsfreiheit`;
  element(
    ".feature--7-subheading"
  ).innerText = `Ein korrekt angepasster Sattel bietet enorme
                    Bewerungsfreiheit.`;
  element(".saddles--heading").innerText = `Sattelverkauf`;
  element(
    ".saddles--subheading"
  ).innerText = `Der Sattelkauf ist für den Kunden ohne Risiko, da der Sattel nach
            sorgfältiger Auswahl erstangepasst wird, die genaue Passform wird
            hierbei garantiert. Ein Ausschnitt der angebotenen Hersteller und
            Marken:`;
  element(".partnership--heading").innerText = `Sattelmarken`;
  element(".preise--heading").innerText = `Preise`;
  element(".preise--upperheadline").innerText = `Saddlechecking`;
  element(".inkl--1-ust").innerText = `inkl. Ust`;
  element(".li--1").innerText = `Anfahrt`;
  element(".li--2").innerText = `Überprüfung des alten Sattels`;
  element(".li--3").innerText = `Ohne Anpassung`;
  element(".preise--2-upperheadline").innerText = `Saddlefitting`;
  element(".inkl--2-ust").innerText = `inkl. Ust`;
  element(".li--4").innerText = `Anfahrt`;
  element(".li--5").innerText = `Vermessung`;
  element(".li--6").innerText = `Anpassung`;
  element(".li--7").innerText = `Kammerweite einstellen (kalt)`;
  element(".kontakt--heading").innerText = `Kontaktiere uns`;
  element(".kontakt--1-label").innerText = `Name und Nachname`;
  element(".kontakt--2-label").innerText = `Ihre E-Mail-Adresse`;
  element(".kontakt--3-label").innerText = `eine Nachricht hinterlassen`;
  element(".kontakt--submit").innerText = `Anfrage senden`;
  element(
    ".kontakt--socials-heading"
  ).innerText = `Wir sehen uns in den sozialen Netzwerken`;
}
function en() {
  element(".hero--cta").innerText = "Discover your saddle";
  element(
    ".offer--subheadline"
  ).innerText = `Saddle fitting | Saddle sales | Saddle fit assessment and pressure measurement (almost all saddle brands)`;
  element(".nav-link-1").innerText = "Offer";
  element(".nav-link-2").innerText = "Characteristics";
  element(".nav-link-3").innerText = "Saddles";
  element(".nav-link-4").innerText = "Contact";
  element(".hero__headline").innerText = "do it with passion or not at all!";
  element(".hero__footer-subheadline").innerText =
    "SPECIALIZED SADDLES FOR YOUR HORSE";
  element(
    ".dietmar--subheadline"
  ).innerText = `Expert for saddle sales and saddle fitting in Austria (from Vorarlberg and Tyrol)`;
  element(
    ".dietmar--paragraph-one"
  ).innerText = `I personally make a pre-selection and bring the right saddle to the horse/rider pair and not the other way around. Since I actively ride dressage up to the advanced level, have competed in show jumping competitions myself and the well-being of all horses is very important to me, I only use products from manufacturers that have proven themselves in my personal testing.`;
  element(
    ".dietmar--paragraph-two"
  ).innerText = `Long studies of anatomy and movement physiology at the Vet. Med. University in Vienna and an international saddlery training with a focus on saddle fitting have given me the technical skills and the necessary broad knowledge of saddle fit.`;
  element(".project-counter--heading").innerText = `For the love of horses`;
  element(".count__caption--seit").innerText = `Since`;
  element(".count__caption--bundeslander").innerText = `Federal states`;
  element(".count__caption--kunden").innerText = `Customers`;
  element(".count__caption--pferde").innerText = `own horses`;
  element(".offer--heading").innerText = `Concept Konig Pferd guaranteed`;
  element(".offer-1-heading").innerText = `best price performance ratio`;
  element(
    ".offer-1-subheading"
  ).innerText = `Lorem ipsum dolor sit amet consectetur. Arcu magna risus
  platea nunc ridiculus. Parturient euismod elit placerat sed
  non.`;
  element(".offer-2-heading").innerText = `Fair price-performance`;
  element(
    ".offer-2-subheading"
  ).innerText = `My services represent a fair price-performance ratio. I would be happy to visit you and advise you on site and will take enough time to do so.`;
  element(".offer-3-heading").innerText = `Fit Guarantee`;
  element(
    ".offer-3-subheading"
  ).innerText = `My offer is cross-brand. The saddle is personally adjusted after careful selection, and the exact fit is guaranteed.`;
  element(".offer-4-heading").innerText = `Absolute reliability`;
  element(
    ".offer-4-subheading"
  ).innerText = `König Pferd stands for the highest level of reliability with punctual delivery. Saddles are tested without any time constraints or purchase pressure.`;
  element(".offer-5-heading").innerText = `Mega experience`;
  element(
    ".offer-5-subheading"
  ).innerText = `I am proud to be able to draw on many years of experience. I only sell products that I have personally tested.`;
  element(".offer-6-heading").innerText = `State-of-the-art knowledge`;
  element(
    ".offer-6-subheading"
  ).innerText = `Lorem ipsum dolor sit amet consectetur. Arcu magna risus
  platea nunc ridiculus. Parturient euismod elit placerat sed
  non.`;
  element(".offer-7-heading").innerText = `Seriousness`;
  element(
    ".offer-7-subheading"
  ).innerText = `Lorem ipsum dolor sit amet consectetur. Arcu magna risus
  platea nunc ridiculus. Parturient euismod elit placerat sed
  non.`;
  element(".testimonial--heading").innerText = `Customer opinion`;
  element(
    ".testimonial--1-paragraph"
  ).innerText = `The best for us! Price/performance ratio is 100% right. You get very good advice and the needs of the rider and the horse are taken into account. The horse is measured precisely and then it is checked during the test ride to make sure everything really fits. We would never buy a saddle anywhere else.`;
  element(".testimonial--name").innerText = `Natalie U. (Google rezension)`;
  element(
    ".testimonial--2-paragraph"
  ).innerText = `I have tried 31 saddles! Either they weren't right for me or for the horse. Then König Pferd advised me and brought me the perfect saddle. My horse has been doing great since then. Conclusion: Reliable! Competent! Very quick appointments! On time! Perfect solution for horse and rider! Excellent aftercare for changes to the horse's back.`;
  element(".testimonial--2-name").innerText = `Christina R. (Google rezension)`;
  element(".testimonial--3-paragraph").innerText = `  
  König Pferd gave me great advice. My horse has had the same saddle for 8 years now and has never had any problems. An annual check is enough. Other boarders in our stable also received competent advice without feeling like they were being talked into something. He always explains and works precisely and is very punctual and reliable.`;
  element(".testimonial--3-name").innerText = `Elisabeth G. (Google rezension)`;
  element(".feature--heading").innerText = `The perfect saddle`;
  element(
    ".feature--subheading"
  ).innerText = `Sits in the right place on the horse's back, its position always gives the horse optimal freedom of movement and also fits the rider.`;
  element(".feature--2-heading").innerText = `Saddle model`;
  element(
    ".feature--2-subheading"
  ).innerText = `Saddle length, cushion channel and bridle width are correct.`;
  element(".feature--3-heading").innerText = `Rider:in`;
  element(
    ".feature--3-subheading"
  ).innerText = `Saddle model and seat size are tailored to the rider.`;
  element(".feature--4-heading").innerText = `Flexibility`;
  element(
    ".feature--4-subheading"
  ).innerText = `Can be adapted to the changing anatomy of the horse.`;
  element(".feature--5-heading").innerText = `Freedom at the withers`;
  element(
    ".feature--5-subheading"
  ).innerText = `Saddle length, cushion channel and bridle width are correct.`;
  element(".feature--6-heading").innerText = `Main emphasis`;
  element(
    ".feature--6-subheading"
  ).innerText = `Located in the middle, shoulder and loin do not bear any weight.`;
  element(".feature--7-heading").innerText = `Freedom of movement`;
  element(
    ".feature--7-subheading"
  ).innerText = `A correctly fitted saddle offers enormous freedom of assessment.`;
  element(".saddles--heading").innerText = `Saddle sale`;
  element(
    ".saddles--subheading"
  ).innerText = `Buying a saddle is risk-free for the customer, as the saddle is first adjusted after
careful selection, and the exact fit is guaranteed. A selection of the manufacturers and
brands offered:`;
  element(".partnership--heading").innerText = `Saddle brands`;
  element(".preise--heading").innerText = `Price`;
  element(".preise--upperheadline").innerText = `Saddle checking`;
  element(".inkl--1-ust").innerText = `incl. VAT`;
  element(".li--1").innerText = `Directions`;
  element(".li--2").innerText = `Checking the old saddle`;
  element(".li--3").innerText = `Without adjustment`;
  element(".preise--2-upperheadline").innerText = `Saddle fitting`;
  element(".inkl--2-ust").innerText = `incl. VAT`;
  element(".li--4").innerText = `Directions`;
  element(".li--5").innerText = `Measurement`;
  element(".li--6").innerText = `Adjustment`;
  element(".li--7").innerText = `Adjust chamber width (cold)`;
  element(".kontakt--heading").innerText = `Contact us`;
  element(".kontakt--1-label").innerText = `Name and surname`;
  element(".kontakt--2-label").innerText = `Your email address`;
  element(".kontakt--3-label").innerText = `Leave a message`;
  element(".kontakt--submit").innerText = `Send request`;
  element(".kontakt--socials-heading").innerText = `See you on social networks`;
}
