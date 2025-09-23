const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

const pieCtx = document.getElementById("pieChart").getContext("2d");
const pieGradient1 = pieCtx.createLinearGradient(0, 0, 0, 200);
pieGradient1.addColorStop(0, "#43cea2"); // teal-green
pieGradient1.addColorStop(1, "#185a9d"); // blue

const pieGradient2 = pieCtx.createLinearGradient(0, 0, 0, 200);
pieGradient2.addColorStop(0, "#f7971e"); // orange
pieGradient2.addColorStop(1, "#ffd200"); // yellow

new Chart(pieCtx, {
  type: "pie",
  data: {
    labels: ["Green", "Orange"],
    datasets: [
      {
        data: [40, 60],
        backgroundColor: [pieGradient1, pieGradient2],
        borderWidth: 0,
      },
    ],
  },
  options: {
    plugins: { legend: { display: false } },
  },
});

// BAR CHART
const barCtx = document.getElementById("barChart").getContext("2d");
const barGradient = barCtx.createLinearGradient(0, 0, 0, 300);
barGradient.addColorStop(0, "#36d1dc"); // aqua
barGradient.addColorStop(1, "#5b86e5"); // blue-violet

new Chart(barCtx, {
  type: "bar",
  data: {
    labels: ["A", "B", "C", "D"],
    datasets: [
      {
        data: [4, 10, 3, 6],
        backgroundColor: barGradient,
        borderRadius: 0,
      },
    ],
  },
  options: {
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  },
});

// LINE CHART
const lineCtx = document.getElementById("lineChart").getContext("2d");
const lineGradient = lineCtx.createLinearGradient(0, 0, 400, 0);
lineGradient.addColorStop(0, "#ff6a00"); // orange
lineGradient.addColorStop(1, "#ee0979"); // pink

new Chart(lineCtx, {
  type: "line",
  data: {
    labels: [1, 2, 3, 4, 5],
    datasets: [
      {
        data: [3, 10, 4, 7, 5],
        borderColor: lineGradient,
        backgroundColor: "rgba(238, 9, 121, 0.15)",
        fill: true,
        tension: 0.1,
        pointRadius: 2,
        pointBackgroundColor: "#ff6a00",
      },
    ],
  },
  options: {
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { display: false } },
  },
});

// GAUGE CHART
const gaugeCtx = document.getElementById("gaugeChart").getContext("2d");
const gaugeGradient = gaugeCtx.createLinearGradient(0, 0, 0, 200);
gaugeGradient.addColorStop(0, "#00c6ff"); // cyan
gaugeGradient.addColorStop(1, "#0072ff"); // deep blue

new Chart(gaugeCtx, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [70, 30],
        backgroundColor: [gaugeGradient, "rgba(0,0,255,0.2)"],
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

//       const canvas = document.getElementById("particles");
//       const ctx = canvas.getContext("2d");
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;

//       // Particle setup
//       const particleCount = 200;
//       const particles = [];

//       for (let i = 0; i < particleCount; i++) {
//         particles.push({
//           x: Math.random() * canvas.width,
//           y: Math.random() * canvas.height,
//           vx: (Math.random() - 0.5) * 0.5,
//           vy: (Math.random() - 0.5) * 0.5,
//           size: 2 + Math.random() * 2,
//         });
//       }

//       // Draw particles and lines
//       function animate() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         // Move particles
//         for (let p of particles) {
//           p.x += p.vx;
//           p.y += p.vy;

//           if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
//           if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

//           ctx.beginPath();
//           ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//           ctx.fillStyle = "rgba(255,255,255,0.8)";
//           ctx.fill();
//         }

//         // Draw lines if close
//         for (let i = 0; i < particles.length; i++) {
//           for (let j = i + 1; j < particles.length; j++) {
//             const dx = particles[i].x - particles[j].x;
//             const dy = particles[i].y - particles[j].y;
//             const dist = Math.sqrt(dx * dx + dy * dy);
//             if (dist < 100) {
//               ctx.beginPath();
//               ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 100})`;
//               ctx.lineWidth = 1;
//               ctx.moveTo(particles[i].x, particles[i].y);
//               ctx.lineTo(particles[j].x, particles[j].y);
//               ctx.stroke();
//             }
//           }
//         }

//         requestAnimationFrame(animate);
//       }

//       animate();
