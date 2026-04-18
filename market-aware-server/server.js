const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const products = {
  laptop: {
    name: "High-End Workstation",
    price: 2500,
    region: "Conflict Zone"
  },
  shirt: {
    name: "Cotton T-Shirt",
    price: 30,
    region: "Stable Zone"
  }
};

app.get('/api/analyze/:item', async (req, res) => {
  const item = req.params.item;
  const product = products[item];

  const newsHeadline =
    item === "laptop"
      ? "War escalates in chip manufacturing hub, factories closing down."
      : "Local textile markets see record harvest and peace.";

  try {
    const sentimentScore =
      item === "laptop" ? -0.8 : 0.7;

    const isUrgent =
      sentimentScore < -0.3 &&
      product.region === "Conflict Zone";

    res.json({
      ...product,
      newsHeadline,
      sentimentScore,
      isUrgent,
      recommendation: isUrgent
        ? "BUY NOW: Prices likely to spike"
        : "PRICE STABLE: Buy at leisure"
    });

  } catch (error) {
    res.status(500).json({ error: "Failed" });
  }
});

app.listen(5000, () =>
  console.log("Server running on port 5000")
);