// Bet-crash JavaScript

document.addEventListener("DOMContentLoaded", () => {
    console.log("Bet-crash Loaded");

    // Welcome message
    const title = document.querySelector(".hero h1");
    if (title) {
        title.style.opacity = "0";
        title.style.transform = "translateY(20px)";

        setTimeout(() => {
            title.style.transition = "all 0.8s ease";
            title.style.opacity = "1";
            title.style.transform = "translateY(0)";
        }, 300);
    }

    // Fake online players counter
    const players = document.getElementById("players");

    if (players) {
        let count = 1280;

        setInterval(() => {
            count += Math.floor(Math.random() * 8) - 3;

            if (count < 1200) count = 1200;

            players.textContent = count.toLocaleString();
        }, 2000);
    }

    // Buttons animation
    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("mouseenter", () => {
            button.style.transform = "scale(1.05)";
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "scale(1)";
        });
    });
});
