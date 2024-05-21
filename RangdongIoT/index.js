const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json()); // Middleware để phân tích cú pháp JSON bodies

// Hàm để điều khiển LED
const controlLED = async (id, status) => {
  try {
    const response = await axios.post(
      "https://digitaldev.io.vn/mqtt/publish",
      {
        message: {
          method: "control_led",
          params: {
            id: id,
            status: status,
          },
        },
        topic: "apptogate",
      },
      {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Phản hồi điều khiển LED:", response.data);
  } catch (error) {
    console.error("Lỗi điều khiển LED:", error);
  }
};

// Route để điều khiển LED
app.post("/control-led", async (req, res) => {
  const { id, status } = req.body;
  try {
    await controlLED(id, status);
    res.status(200).send("Lệnh điều khiển LED đã được gửi");
  } catch (error) {
    res.status(500).send("Lỗi khi điều khiển LED");
  }
});

// Route cơ bản cho đường dẫn '/'
app.get("/", (req, res) => {
  res.send("Xin chào! Đây là API điều khiển LED.");
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
