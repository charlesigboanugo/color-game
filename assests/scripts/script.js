document.addEventListener("DOMContentLoaded", () => {
    let score = 0;
    const scoreElement = document.getElementById("score");
    const gameStatus = document.querySelector("[data-testid='gameStatus']");
    const colorBox = document.querySelector("[data-testid='colorBox']");
    const colorOptions = document.querySelectorAll("[data-testid='colorOption']");
    const newGameButton = document.querySelector("[data-testid='newGameButton']");

    // Generate a random RGB color
    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Start the game with a new target color
    function startGame() {
        const targetColor = getRandomColor();
        colorBox.style.backgroundColor = targetColor;

        // Assign random colors to buttons, including the correct color
        const correctIndex = Math.floor(Math.random() * 6);
        colorOptions.forEach((button, index) => {
            const color = index === correctIndex ? targetColor : getRandomColor();
            button.style.backgroundColor = color;
            button.onclick = () => checkGuess(color, targetColor);
        });

        gameStatus.textContent = "";
    }

    // Check if the guessed color is correct
    function checkGuess(selectedColor, targetColor) {
        if (selectedColor === targetColor) {
            gameStatus.textContent = "Correct! 🎉";
            gameStatus.style.color = "limegreen";
            score++;
            scoreElement.textContent = score;

            // Change background theme slightly for variation
            document.body.style.backgroundColor = getRandomColor();

            // Start new round after a short delay
            setTimeout(() => startGame(), 1000);
        } else {
            gameStatus.textContent = "Wrong! Try Again!";
            gameStatus.style.color = "red";

            // Apply fade-out effect
            gameStatus.classList.add("fade-out");
            setTimeout(() => gameStatus.classList.remove("fade-out"), 500);
        }
    }

    // Restart the game when clicking "New Game"
    newGameButton.addEventListener("click", () => {
        score = 0;
        scoreElement.textContent = score;
        document.body.style.backgroundColor = "#121212"; // Reset background to dark theme
        startGame();
    });

    // Start game initially
    startGame();
});
