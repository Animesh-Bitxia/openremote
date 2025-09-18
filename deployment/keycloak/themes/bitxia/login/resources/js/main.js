// 🔹 Button toggle
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

if (signUpButton && signInButton) {
  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });
}

// 🔹 Charts (Chart.js required from CDN in login.ftl)
if (typeof Chart !== "undefined") {
  // Pie Chart
  new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: ["Blue", "Light Blue"],
      datasets: [
        {
          data: [40, 60],
          backgroundColor: ["#0984e3", "#74b9ff"],
          borderWidth: 0,
        },
      ],
    },
    options: { plugins: { legend: { display: false } } },
  });

  // Bar Chart
  new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: ["A", "B", "C", "D"],
      datasets: [
        {
          data: [4, 7, 3, 6],
          backgroundColor: "#0984e3",
          borderRadius: 6,
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { x: { display: false }, y: { display: false } },
    },
  });

  // Line Chart
  new Chart(document.getElementById("lineChart"), {
    type: "line",
    data: {
      labels: [1, 2, 3, 4, 5],
      datasets: [
        {
          data: [3, 6, 4, 7, 5],
          borderColor: "#0984e3",
          backgroundColor: "#74b9ff",
          fill: false,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: "#0984e3",
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { x: { display: false }, y: { display: false } },
    },
  });

  // Gauge Chart
  new Chart(document.getElementById("gaugeChart"), {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [70, 30],
          backgroundColor: ["#0984e3", "rgba(9,132,227,0.2)"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      rotation: -90,
      circumference: 180,
      plugins: { legend: { display: false } },
    },
  });
}

// 🔹 Particle background
const canvas = document.getElementById("particles");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particleCount = 200;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: 2 + Math.random() * 2,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw particles
    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.fill();
    }

    // Draw lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 100})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}
