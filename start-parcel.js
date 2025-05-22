// start-parcel.js
const { spawn } = require("child_process");

// !!! Замените '/path/to/your/npm' на фактический путь, который вы получили от `which npm`
const npmPath = "/usr/local/bin/npm"; // Пример, измените на ваш фактический путь

console.log("Starting Parcel via npm run start...");

const parcelProcess = spawn(npmPath, ["run", "start"], {
  cwd: __dirname, // Убедитесь, что Parcel запускается из корневой директории проекта
  stdio: "inherit", // Перенаправляем вывод Parcel в консоль PM2
});

parcelProcess.on("exit", code => {
  console.log(`Parcel process exited with code ${code}`);
  // В продакшене, возможно, стоит перезапускать или логировать ошибку
  // Здесь просто выходим, чтобы PM2 мог управлять перезапусками
  process.exit(code);
});

parcelProcess.on("error", err => {
  console.error("Failed to start Parcel process:", err);
  process.exit(1);
});
