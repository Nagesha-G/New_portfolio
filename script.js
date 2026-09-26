/* =========================================
   NAGESHA PORTFOLIO — FINAL SCRIPT
========================================= */

const CONTACT = {
  email: "iamnagesha3871@gmail.com",
  github: "https://github.com/Nagesha-G",
  linkedin: "https://www.linkedin.com/in/nagesha-g-307989428/"
};

/* ---------- Theme ---------- */
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("nagesha-theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
}

function updateThemeButton() {
  if (!themeToggle) return;
  themeToggle.textContent = document.body.classList.contains("light") ? "DARK" : "LIGHT";
}

updateThemeButton();

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const theme = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("nagesha-theme", theme);
  updateThemeButton();
});

/* ---------- Mobile menu ---------- */
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

menuToggle?.addEventListener("click", () => {
  mainNav?.classList.toggle("mobile");
});

mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("mobile");
  });
});

/* ---------- Reveal animations ---------- */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* ---------- Back to top ---------- */
const backTop = document.getElementById("back-top");

window.addEventListener("scroll", () => {
  if (!backTop) return;
  backTop.classList.toggle("show", window.scrollY > 500);
});

backTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------- Contact links ---------- */
const emailLink = document.getElementById("email-link");
const githubLink = document.getElementById("github-link");
const linkedinLink = document.getElementById("linkedin-link");

if (emailLink) {
  emailLink.textContent = CONTACT.email;
  emailLink.href = `mailto:${CONTACT.email}`;
}

if (githubLink) {
  githubLink.href = CONTACT.github;
  githubLink.textContent = CONTACT.github.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

if (linkedinLink) {
  linkedinLink.href = CONTACT.linkedin;
  linkedinLink.textContent = CONTACT.linkedin.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/* ---------- Contact form ---------- */
const contactForm = document.getElementById("contact-form");

contactForm?.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("sender-name")?.value.trim();
  const email = document.getElementById("sender-email")?.value.trim();
  const subject = document.getElementById("sender-subject")?.value.trim();
  const message = document.getElementById("sender-message")?.value.trim();

  if (!name || !email || !subject || !message) return;

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    message
  ].join("\n");

  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
});

/* ---------- Simple portfolio chatbot ---------- */
const chatToggle = document.getElementById("chat-toggle");
const chatClose = document.getElementById("chat-close");
const chatWindow = document.querySelector(".chat-window");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

function addChatMessage(text, type = "bot-message") {
  if (!chatMessages) return;
  const message = document.createElement("div");
  message.className = type;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function portfolioAnswer(question) {
  const q = question.toLowerCase();

  if (q.includes("who") || q.includes("nagesha") || q.includes("about")) {
    return "Nagesha G is a developer, learner and builder who enjoys creating practical software and learning through real projects.";
  }

  if (q.includes("education") || q.includes("college") || q.includes("bca")) {
    return "Nagesha completed a BCA from Nagarjuna College of Management Studies in 2026 with a CGPA of 9.4.";
  }

  if (q.includes("project")) {
    return "The portfolio includes ComputeLens, AI Resume Analyzer, Focus India and Expense Tracker projects.";
  }

  if (q.includes("skill") || q.includes("technology") || q.includes("tech")) {
    return "Skills shown here include Python, JavaScript, C, C++, HTML, CSS, Django, MERN, MySQL, MongoDB, Git, GitHub and AI-assisted development.";
  }

  if (q.includes("experience") || q.includes("internship")) {
    return "The portfolio includes MERN, Python/SQL, full-stack, and AI development and prompt engineering internship experiences.";
  }

  if (q.includes("contact") || q.includes("email") || q.includes("github") || q.includes("linkedin")) {
    return `You can contact Nagesha at ${CONTACT.email}, or use the GitHub and LinkedIn links in the Contact section.`;
  }

  if (q.includes("resume") || q.includes("cv")) {
    return "You can use the Resume button at the top or Download CV / Resume in the Contact section.";
  }

  return "I can answer questions about Nagesha, education, experience, projects, skills, resume and contact details.";
}

chatToggle?.addEventListener("click", () => {
  chatWindow?.classList.toggle("open");
});

chatClose?.addEventListener("click", () => {
  chatWindow?.classList.remove("open");
});

chatForm?.addEventListener("submit", event => {
  event.preventDefault();

  const question = chatInput?.value.trim();
  if (!question) return;

  addChatMessage(question, "user-message");
  addChatMessage(portfolioAnswer(question));

  chatInput.value = "";
});

document.querySelectorAll(".quick-questions button").forEach(button => {
  button.addEventListener("click", () => {
    const question = button.dataset.q || button.textContent;
    addChatMessage(question, "user-message");
    addChatMessage(portfolioAnswer(question));
  });
});

/* ---------- Three.js background ---------- */
if (typeof THREE !== "undefined") {
  const canvas = document.getElementById("three-bg");

  if (canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 18;

    const group = new THREE.Group();
    scene.add(group);

    const nodeGeometry = new THREE.SphereGeometry(0.055, 10, 10);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x67e8f9 });

    const nodes = [];
    const nodeCount = 45;

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 8
      );
      group.add(node);
      nodes.push(node);
    }

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.10
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].position.distanceTo(nodes[j].position) < 3.8) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            nodes[i].position,
            nodes[j].position
          ]);
          group.add(new THREE.Line(geometry, lineMaterial));
        }
      }
    }

    const shapes = [];

    function addShape(geometry, color, x, y, z, scale) {
      const material = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.18
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      mesh.scale.setScalar(scale);
      group.add(mesh);
      shapes.push(mesh);
    }

    addShape(new THREE.IcosahedronGeometry(2.1, 1), 0x67e8f9, -7, 3, -2, 1);
    addShape(new THREE.TorusGeometry(2, 0.02, 8, 64), 0xf472b6, 7, -2, -3, 1);
    addShape(new THREE.OctahedronGeometry(1.8, 0), 0xfb923c, 5, 4, -1, 1);

    function animate() {
      requestAnimationFrame(animate);

      group.rotation.y += 0.0007;
      group.rotation.x += 0.0002;

      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.001 + index * 0.0003;
        shape.rotation.y += 0.0012 + index * 0.0002;
      });

      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}
