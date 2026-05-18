

        /* LOADER */

        window.addEventListener("load", () => {

            setTimeout(() => {
                document.getElementById("loader").style.opacity = "0";

                setTimeout(() => {
                    document.getElementById("loader").style.display = "none";
                }, 1000);

            }, 1800);
        });


        /* CURSOR GLOW */

        const glow = document.querySelector(".cursor-glow");

        document.addEventListener("mousemove", (e) => {

            glow.style.left = `${e.clientX}px`;
            glow.style.top = `${e.clientY}px`;
        });


        /* LIVE CLOCK */

        function updateClock() {

            const now = new Date();

            document.getElementById("clock").innerHTML =
                now.toLocaleTimeString();
        }

        setInterval(updateClock, 1000);

        updateClock();


        /* TYPING EFFECT */

        const words = [
            "Future Engineer",
            "Everyday Coding",
            "Cyber Grindset",
            "Anime + Programming"
        ];

        let i = 0;
        let j = 0;

        let currentWord = "";

        let isDeleting = false;


        function type() {

            currentWord = words[i];

            if (isDeleting) {
                j--;
            }
            else {
                j++;
            }

            document.querySelector(".typing").innerHTML =
                currentWord.substring(0, j);

            if (!isDeleting && j === currentWord.length) {

                isDeleting = true;

                setTimeout(type, 1200);

                return;
            }

            if (isDeleting && j === 0) {

                isDeleting = false;

                i = (i + 1) % words.length;
            }

            setTimeout(type, isDeleting ? 50 : 100);
        }

        type();


        /* TILT EFFECT */

        VanillaTilt.init(document.querySelectorAll(".card"), {

            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.25
        });


        /* TIMER */

        let time = 7200;

        let timerInterval;


        function updateTimer() {

            let minutes = Math.floor(time / 60);

            let seconds = time % 60;

            document.getElementById("timer").innerHTML =
                `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }


        function startTimer() {

            clearInterval(timerInterval);

            timerInterval = setInterval(() => {

                if (time > 0) {
                    time--;
                    updateTimer();
                }

            }, 1000);
        }


        function pauseTimer() {
            clearInterval(timerInterval);
        }


        function resetTimer() {

            clearInterval(timerInterval);

            time = 1500;

            updateTimer();
        }

        function setCustomTimer() {

            const customInput =
                document.getElementById("customMinutes");

            let minutes =
                parseInt(customInput.value);

            if (isNaN(minutes) || minutes <= 0) {

                alert("Enter valid minutes");

                return;
            }

            clearInterval(timerInterval);

            time = minutes * 60;

            updateTimer();

            customInput.value = "";
        }


        updateTimer();


        /* TODO */

        function addTask() {

            const input = document.getElementById("taskInput");

            if (input.value.trim() === "") return;

            const li = document.createElement("li");

            li.className = "task-item";

            li.innerHTML = `
                <span>${input.value}</span>
                <button class="delete-btn">✖</button>
            `;

            li.querySelector("span").addEventListener("click", () => {
                li.querySelector("span").classList.toggle("completed");
            });

            li.querySelector("button").addEventListener("click", () => {
                li.remove();
            });

            document.getElementById("taskList").appendChild(li);

            input.value = "";
        }

        /* LEETCODE STATS */

        function fetchLeetCodeStats(){

    const username =
    document.getElementById("leetcodeUsername").value;

    if(username.trim() === ""){

        alert("Enter username");

        return;
    }

    fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`)

    .then(res => res.json())

    .then(data => {

        document.getElementById("leetcodeSolved")
        .innerHTML = data.totalSolved;

        document.getElementById("easyBar")
        .style.width =
        `${(data.easySolved / data.totalSolved) * 100}%`;

        document.getElementById("mediumBar")
        .style.width =
        `${(data.mediumSolved / data.totalSolved) * 100}%`;

        document.getElementById("hardBar")
        .style.width =
        `${(data.hardSolved / data.totalSolved) * 100}%`;

    })

    .catch(err => {

        console.log(err);

        alert("User not found");

    });
}
  