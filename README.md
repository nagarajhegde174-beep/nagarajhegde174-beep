## Hi there 👋

<!--
**nagarajhegde174-beep/nagarajhegde174-beep** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->
<!-- 🌟 Profile Header -->
<h1 align="center">Hi 👋, I'm <span style="color:#00E8FF;">Nagaraj Hegde</span></h1>

<!-- 🔥 Typing Animation -->
<div align="center">
  <span id="typing-text" style="font-size:22px; font-weight:bold; color:#00E8FF;"></span>
</div>

<!-- 🧩 Typing Script -->
<script>
const texts = [
  "Python Developer 🐍",
  "Full Stack Learner 💻",
  "Tech Enthusiast 🚀"
];

let index = 0;
let charIndex = 0;
const typingSpeed = 100;
const eraseSpeed = 60;
const delayBetweenTexts = 1000;

function type() {
  if (charIndex < texts[index].length) {
    document.getElementById("typing-text").textContent += texts[index].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, delayBetweenTexts);
  }
}

function erase() {
  if (charIndex > 0) {
    document.getElementById("typing-text").textContent = texts[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, eraseSpeed);
  } else {
    index = (index + 1) % texts.length;
    setTimeout(type, typingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  type();
});
</script>
