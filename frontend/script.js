let twitch = window.Twitch.ext;

twitch.onContext((context) => {
  console.log("Extension loaded!", context);
});

// Function to Spend Bits
function spendBits(amount) {
  if (twitch.bits) {
    twitch.bits.useBits(amount);
    document.getElementById("status").innerText = `Spent ${amount} Bits!`;

    // Send Transaction to Backend
    fetch("http://localhost:5000/bits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bits_used: amount, user_name: "Viewer123" }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Transaction processed:", data))
      .catch((error) => console.error("Error:", error));
  } else {
    alert("Bits feature not supported.");
  }
}
