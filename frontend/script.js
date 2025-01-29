let twitch = window.Twitch.ext;

twitch.onContext((context) => {
  console.log("Extension loaded!", context);
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ Script loaded!");

  document.getElementById("bits-100").addEventListener("click", function () {
    spendBits(100);
  });

  document.getElementById("bits-500").addEventListener("click", function () {
    spendBits(500);
  });

  document.getElementById("bits-1000").addEventListener("click", function () {
    spendBits(1000);
  });
});

function spendBits(amount) {
  console.log(`🟢 Attempting to spend ${amount} Bits`);

  if (typeof Twitch !== "undefined" && Twitch.ext) {
    Twitch.ext.bits.useBits(amount);

    // Send transaction to Flask API (Render-hosted)
    fetch("https://waltmillsybitsmenu-flask.onrender.com/bits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bits_used: amount, user_name: "TestUser" }),
    })
      .then((response) => response.json())
      .then((data) => console.log("✅ Bits Processed:", data))
      .catch((error) => console.error("❌ Fetch Error:", error));
  } else {
    console.error("❌ Twitch API not available");
    alert("Twitch API not available.");
  }
}
