document.addEventListener("DOMContentLoaded", function () {
    // Login demo: simpan email di browser, lalu buka Dashboard.
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            localStorage.setItem("tanamkuUser", email);
            window.location.href = "dashboard.html";
        });
    }

    // Registrasi demo.
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("regEmail").value;
            localStorage.setItem("tanamkuUser", email);
            alert("Pendaftaran demo berhasil. Silakan masuk.");
            window.location.href = "index.html";
        });
    }

    // Simpan data tanaman ke localStorage browser.
    const plantForm = document.getElementById("plantForm");

    if (plantForm) {
        plantForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const tanaman = {
                name: document.getElementById("plantName").value,
                type: document.getElementById("plantType").value,
                location: document.getElementById("plantLocation").value
            };

            const daftarTanaman = JSON.parse(
                localStorage.getItem("tanamkuPlants") || "[]"
            );

            daftarTanaman.push(tanaman);
            localStorage.setItem("tanamkuPlants", JSON.stringify(daftarTanaman));
            alert("Data tanaman disimpan di browser demo.");
            window.location.href = "tanaman.html";
        });
    }

    // Cari tanaman berdasarkan teks pada baris tabel.
    const searchPlant = document.getElementById("searchPlant");

    if (searchPlant) {
        searchPlant.addEventListener("input", function () {
            const kataKunci = searchPlant.value.toLowerCase();
            const barisTanaman = document.querySelectorAll("#plantRows tr");

            barisTanaman.forEach(function (baris) {
                const cocok = baris.innerText.toLowerCase().includes(kataKunci);
                baris.style.display = cocok ? "" : "none";
            });
        });
    }

    // Jadwal perawatan demo.
    const scheduleForm = document.getElementById("scheduleForm");

    if (scheduleForm) {
        scheduleForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Jadwal demo berhasil dicatat.");
            scheduleForm.reset();
        });
    }

    // Simpan profil demo.
    const profileForm = document.getElementById("profileForm");

    if (profileForm) {
        profileForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Profil demo berhasil disimpan.");
        });
    }

    // Periksa kecocokan kata sandi demo.
    const passwordForm = document.getElementById("passwordForm");

    if (passwordForm) {
        passwordForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const inputPassword = passwordForm.querySelectorAll("input");

            if (inputPassword[0].value !== inputPassword[1].value) {
                alert("Kata sandi tidak sama.");
                return;
            }

            alert("Kata sandi demo diperbarui.");
            passwordForm.reset();
        });
    }

    // Unduh laporan tanaman dalam format CSV.
    const tombolExport = document.getElementById("exportCsv");

    if (tombolExport) {
        tombolExport.addEventListener("click", function () {
            const dataLaporan = [
                ["Nama Tanaman", "Kondisi", "Lokasi"],
                ["Monstera", "Sehat", "Ruang tamu"],
                ["Lidah Mertua", "Sehat", "Teras"],
                ["Anggrek", "Sehat", "Balkon"]
            ];

            const isiCsv = dataLaporan
                .map(function (baris) {
                    return baris.join(",");
                })
                .join("\n");

            const fileCsv = new Blob([isiCsv], {
                type: "text/csv;charset=utf-8;"
            });
            const tautan = document.createElement("a");
            tautan.href = URL.createObjectURL(fileCsv);
            tautan.download = "laporan-tanamku.csv";
            tautan.click();
            URL.revokeObjectURL(tautan.href);
        });
    }
});
