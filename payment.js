// ==========================================
// PARKWISE PAYMENT PAGE
// payment.js
// ==========================================

// Payment Methods

const methods = document.querySelectorAll(".method");

methods.forEach(method => {

    method.addEventListener("click", () => {

        methods.forEach(item => {

            item.classList.remove("active");

        });

        method.classList.add("active");

    });

});

// ==========================================
// Create Success Popup
// ==========================================

const popup = document.createElement("div");

popup.className = "successPopup";

popup.innerHTML = `

<div style="font-size:80px;">✅</div>

<h2>Payment Successful</h2>

<p>

Your parking has been reserved successfully.

</p>

<button id="homeButton">

Return Home

</button>

`;

document.body.appendChild(popup);

// ==========================================
// Pay Button
// ==========================================

const payButton = document.getElementById("payButton");

payButton.addEventListener("click", () => {

    payButton.disabled = true;

    payButton.innerHTML = "Processing Payment...";

    setTimeout(() => {

        popup.style.display = "block";

        payButton.innerHTML = "Payment Complete";

        launchConfetti();

        localStorage.setItem("parkwisePaid", "true");

        localStorage.setItem("paymentTime", new Date().toLocaleString());

    }, 2500);

});

// ==========================================
// Home Button
// ==========================================

document.addEventListener("click", (e) => {

    if (e.target.id === "homeButton") {

        window.location.href = "index.html";

    }

});

// ==========================================
// Fake Receipt
// ==========================================

function downloadReceipt() {

    const receipt = `

=========== PARKWISE RECEIPT ===========

Parking : Connaught Place

Duration : 1 Hour

Amount : ₹40

Status : Paid

Time : ${new Date().toLocaleString()}

========================================

`;

    const blob = new Blob([receipt], {

        type: "text/plain"

    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "ParkWiseReceipt.txt";

    link.click();

}

// ==========================================
// Confetti
// ==========================================

function launchConfetti() {

    for (let i = 0; i < 120; i++) {

        const piece = document.createElement("div");

        piece.style.position = "fixed";

        piece.style.left = Math.random() * 100 + "%";

        piece.style.top = "-20px";

        piece.style.width = "10px";

        piece.style.height = "10px";

        piece.style.borderRadius = "50%";

        piece.style.background = `hsl(${Math.random() * 360},100%,50%)`;

        piece.style.zIndex = "99999";

        document.body.appendChild(piece);

        const duration = 3000 + Math.random() * 2000;

        piece.animate(

            [

                {

                    transform: "translateY(0px) rotate(0deg)",

                    opacity: 1

                },

                {

                    transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`,

                    opacity: 0

                }

            ],

            {

                duration: duration,

                easing: "linear"

            }

        );

        setTimeout(() => {

            piece.remove();

        }, duration);

    }

}

// ==========================================
// Auto Restore

// ==========================================

if (localStorage.getItem("parkwisePaid") === "true") {

    console.log("Previous payment detected.");

}

// ==========================================
// Keyboard Shortcuts
// ==========================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        popup.style.display = "none";

    }

});

// ==========================================
// Ripple Effect
// ==========================================

payButton.addEventListener("mousedown", function (e) {

    const ripple = document.createElement("span");

    ripple.style.position = "absolute";

    ripple.style.width = "20px";

    ripple.style.height = "20px";

    ripple.style.background = "rgba(255,255,255,.5)";

    ripple.style.borderRadius = "50%";

    ripple.style.left = e.offsetX + "px";

    ripple.style.top = e.offsetY + "px";

    ripple.style.transform = "translate(-50%,-50%)";

    ripple.style.pointerEvents = "none";

    ripple.animate(

        [

            {

                transform: "translate(-50%,-50%) scale(1)",

                opacity: 1

            },

            {

                transform: "translate(-50%,-50%) scale(15)",

                opacity: 0

            }

        ],

        {

            duration: 600

        }

    );

    payButton.appendChild(ripple);

    setTimeout(() => {

        ripple.remove();

    }, 600);

});

// ==========================================
// END
// ==========================================