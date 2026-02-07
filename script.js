const hargaBahan = {
    "Satin": 35000,
    "Katun": 30000,
    "Linen": 45000,
    "Jersey": 25000,
    "Rayon": 20000
};

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const hargaOutput = document.getElementById("hargaOutput");
const hasil = document.getElementById("hasil");

// 🔄 Checkbox behave like radio (1 pilihan, bisa ganti)
checkboxes.forEach(cb => {
    cb.addEventListener("change", function () {

        // uncheck lainnya
        checkboxes.forEach(other => {
            if (other !== this) {
                other.checked = false;
            }
        });

        // reset semua class background
        document.body.classList.remove(
            "katun",
            "satin",
            "linen",
            "jersey",
            "rayon"
        );

        if (this.checked) {
            const bahan = this.value.toLowerCase();
            document.body.classList.add(bahan);

            hargaOutput.innerText =
                `${this.value}: Rp ${hargaBahan[this.value].toLocaleString()}/meter`;
        } else {
            hargaOutput.innerText = "Pilih jenis bahan";
        }
    });
});


document.getElementById("orderForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const namaBaju = document.getElementById("namaBaju").value;
    const jumlah = parseInt(document.getElementById("jumlah").value);
    const bahanDipilih = document.querySelector('input[type="checkbox"]:checked');

    if (!bahanDipilih) {
        alert("Pilih satu jenis bahan!");
        return;
    }

    const harga = hargaBahan[bahanDipilih.value];
    const totalHarga = harga * jumlah;

    hasil.innerHTML = `
        <h3>Ringkasan Pesanan</h3>
        <p><strong>Nama Baju:</strong> ${namaBaju}</p>
        <p><strong>Jumlah:</strong> ${jumlah} meter</p>
        <p><strong>Jenis Bahan:</strong> ${bahanDipilih.value}</p>
        <p><strong>Harga per Meter:</strong> Rp ${harga.toLocaleString()}</p>
        <p><strong>Total Harga:</strong> Rp ${totalHarga.toLocaleString()}</p>

        <button id="buatPesanan" class="btn-order">
            Buat Pesanan
        </button>
    `;
});

// 🎉 Status pesanan berhasil
document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "buatPesanan") {
        hasil.innerHTML = `
            <h3>Status Pesanan</h3>
            <p class="status-berhasil">✅ Pesanan berhasil dibuat!</p>
        `;
    }
});
