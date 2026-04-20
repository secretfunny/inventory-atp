import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";



export default function Inventaris() {
    const [showForm, setShowForm] = useState(false);
    const [nama, setNama] = useState("");
    const [kode, setKode] = useState("");
    const [kategori, setKategori] = useState("");
    const [lokasi, setLokasi] = useState("");
    const [status, setStatus] = useState("");
    const [dataInventaris, setDataInventaris] = useState([]);

    // ✅ FETCH DATA
    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "inventaris"));

            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setDataInventaris(data);
        } catch (error) {
            console.error(error);
        }
    };

    // ✅ LOAD SAAT PAGE DIBUKA
    useEffect(() => {
        fetchData();
    }, []);

    // ✅ SIMPAN DATA
    const handleSave = async () => {
        try {
            await addDoc(collection(db, "inventaris"), {
                nama,
                kode,
                kategori,
                lokasi,
                status,
                createdAt: new Date(),
            });

            alert("Data berhasil disimpan!");

            setNama("");
            setKode("");
            setKategori("");
            setLokasi("");
            setStatus("");
            setShowForm(false);

            // 🔥 refresh data
            await fetchData();

        } catch (error) {
            console.error(error);
            alert("Gagal menyimpan data");
        }
    };

    // ✅ DELETE DATA
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "inventaris", id));
            alert("Data berhasil dihapus");

            await fetchData(); // refresh
        } catch (error) {
            console.error(error);
            alert("Gagal menghapus data");
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Inventaris Page</h1>

            {/* BUTTON */}
            <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                + Tambah Barang
            </button>

            <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
            >
                Hapus
            </button>

            {/* FORM */}
            {showForm && (
                <div className="mt-4 p-4 border rounded-lg bg-white shadow">
                    <h2 className="text-lg font-semibold mb-3">Tambah Barang</h2>

                    <input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama Barang" className="w-full mb-2 p-2 border rounded" />
                    <input value={kode} onChange={(e) => setKode(e.target.value)} placeholder="Kode Inventaris" className="w-full mb-2 p-2 border rounded" />
                    <input value={kategori} onChange={(e) => setKategori(e.target.value)} placeholder="Kategori" className="w-full mb-2 p-2 border rounded" />
                    <input value={lokasi} onChange={(e) => setLokasi(e.target.value)} placeholder="Lokasi" className="w-full mb-2 p-2 border rounded" />

                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full mb-2 p-2 border rounded">
                        <option value="">Pilih Status</option>
                        <option value="Dipakai">Dipakai</option>
                        <option value="Tersedia">Tersedia</option>
                        <option value="Rusak">Rusak</option>
                    </select>

                    <div className="flex gap-2 mt-3">
                        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
                            Simpan
                        </button>

                        <button onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded">
                            Batal
                        </button>
                    </div>
                </div>
            )}

            {/* TABLE */}
            <table className="w-full border mt-4">
                <thead>

                    <tr>
                        <th className="border p-2">Aksi</th>
                        <th className="border p-2">Kode</th>
                        <th className="border p-2">Nama</th>
                        <th className="border p-2">Kategori</th>
                        <th className="border p-2">Lokasi</th>
                        <th className="border p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {dataInventaris.map((item) => (
                        <tr key={item.id}>
                            <td className="border p-2 flex gap-2">
                                <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="bg-red-600 text-white px-2 py-1 rounded"
                                >
                                    Hapus
                                </button>
                            </td>

                            <td className="border p-2">{item.kode}</td>
                            <td className="border p-2">{item.nama}</td>
                            <td className="border p-2">{item.kategori}</td>
                            <td className="border p-2">{item.lokasi}</td>
                            <td className="border p-2">{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}