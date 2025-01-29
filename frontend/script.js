let twitch = window.Twitch.ext;

twitch.onContext((context) => {
  console.log("Extension loaded!", context);
});

// Function to Spend Bits
function spendBits(amount) {
  console.log(`Trying to spend ${amount} Bits`);

  if (typeof Twitch !== "undefined" && Twitch.ext) {
    Twitch.ext.bits.useBits(amount);

    // Send transaction to Flask API on Render
    fetch("https://your-flask-api.onrender.com/bits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bits_used: amount, user_name: "TestUser" }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Transaction processed:", data))
      .catch((error) => console.error("Error:", error));
  } else {
    alert("Twitch API not available.");
  }
}
