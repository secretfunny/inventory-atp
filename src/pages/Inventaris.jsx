import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";

export default function Inventaris() {
    const [showForm, setShowForm] = useState(false);
    const [nama, setNama] = useState("");
    const [kode, setKode] = useState("");
    const [kategori, setKategori] = useState("");
    const [lokasi, setLokasi] = useState("");
    const [status, setStatus] = useState("");
    const [dataInventaris, setDataInventaris] = useState([]);
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState("");
    const [searchNama, setSearchNama] = useState("");
    const [filterKategori, setFilterKategori] = useState("");
    const [filterLokasi, setFilterLokasi] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [loading, setLoading] = useState(false);

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


    const isDuplicate = dataInventaris.some(
        (item) => item.kode === kode && item.id !== editId
    );

    if (isDuplicate) {
        toast.error("Kode inventaris sudah digunakan!");
        return;
    }

    // ✅ SIMPAN DATA
    const handleSave = async () => {
        if (!nama || !kode || !kategori || !lokasi || !status) {
            toast.error("Semua field wajib diisi!");
            return;
        }

        setLoading(true); // 🔥 mulai loading

        try {
            if (editId) {
                await updateDoc(doc(db, "inventaris", editId), {
                    nama,
                    kode,
                    kategori,
                    lokasi,
                    status,
                });

                toast.success("Data berhasil diupdate!");
                setEditId(null);

            } else {
                await addDoc(collection(db, "inventaris"), {
                    nama,
                    kode,
                    kategori,
                    lokasi,
                    status,
                    createdAt: new Date(),
                });

                toast.success("Data berhasil disimpan!");
            }

            setNama("");
            setKode("");
            setKategori("");
            setLokasi("");
            setStatus("");
            setShowForm(false);

            await fetchData();

        } catch (error) {
            console.error(error);
            toast.error("Gagal menyimpan data");
        }

        setLoading(false); // 🔥 selesai loading
    };

    // ✅ EDIT DATA
    const handleEdit = (item) => {
        setNama(item.nama);
        setKode(item.kode);
        setKategori(item.kategori);
        setLokasi(item.lokasi);
        setStatus(item.status);

        setEditId(item.id);
        setShowForm(true);
    };


    // ✅ DELETE DATA
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "inventaris", id));
            toast.success("Data berhasil dihapus");

            await fetchData(); // refresh
        } catch (error) {
            console.error(error);
            toast.error("Gagal menghapus data");
        }
    };


    // ✅ FILTER DATA
    const filteredData = dataInventaris.filter((item) => {
        return (
            item.nama.toLowerCase().includes(searchNama.toLowerCase()) &&
            item.kategori.toLowerCase().includes(filterKategori.toLowerCase()) &&
            item.lokasi.toLowerCase().includes(filterLokasi.toLowerCase()) &&
            item.status.toLowerCase().includes(filterStatus.toLowerCase())
        );
    });


    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Inventaris Page</h1>

            {/* BUTTON */}
            <button
                onClick={() => {
                    setEditId(null); // 🔥 reset mode edit
                    setNama("");
                    setKode("");
                    setKategori("");
                    setLokasi("");
                    setStatus("");
                    setShowForm(true);
                }}

                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                + Tambah Barang
            </button>

            {/* FORM */}
            {showForm && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                    onClick={() => setShowForm(false)}
                >
                    <div
                        className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-fadeIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* 🔥 tombol X */}
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
                        >
                            ✕
                        </button>

                        <h2 className="text-lg font-semibold mb-3">
                            {editId ? "Edit Barang" : "Tambah Barang"}
                        </h2>

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
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    "Simpan"
                                )}
                            </button>

                            <button onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded">
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-4 gap-3 mb-4">

                <input
                    placeholder="Cari Nama..."
                    value={searchNama}
                    onChange={(e) => setSearchNama(e.target.value)}
                    className="border p-2 rounded"
                />

                <input
                    placeholder="Kategori"
                    value={filterKategori}
                    onChange={(e) => setFilterKategori(e.target.value)}
                    className="border p-2 rounded"
                />

                <input
                    placeholder="Lokasi"
                    value={filterLokasi}
                    onChange={(e) => setFilterLokasi(e.target.value)}
                    className="border p-2 rounded"
                />

                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Semua Status</option>
                    <option value="Dipakai">Dipakai</option>
                    <option value="Tersedia">Tersedia</option>
                    <option value="Rusak">Rusak</option>
                </select>

            </div>
            <div className="bg-white rounded-lg shadow p-4">
                {/* TABLE */}
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="p-3">Kode</th>
                            <th className="p-3">Nama</th>
                            <th className="p-3">Kategori</th>
                            <th className="p-3">Lokasi</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {dataInventaris
                            .filter((item) => {
                                return (
                                    (item.nama || "").toLowerCase().includes(searchNama.toLowerCase()) &&
                                    (item.kategori || "").toLowerCase().includes(filterKategori.toLowerCase()) &&
                                    (item.lokasi + "").toLowerCase().includes(filterLokasi.toLowerCase()) &&
                                    (item.status || "").toLowerCase().includes(filterStatus.toLowerCase())
                                );
                            })
                            .map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="p-3">{item.kode}</td>
                                    <td className="p-3">{item.nama}</td>
                                    <td className="p-3">{item.kategori}</td>
                                    <td className="p-3">{item.lokasi}</td>

                                    {/* 🔥 STATUS BADGE */}
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === "Dipakai"
                                                ? "bg-green-100 text-green-600"
                                                : item.status === "Tersedia"
                                                    ? "bg-blue-100 text-blue-600"
                                                    : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>

                                    {/* 🔥 AKSI ICON */}
                                    <td className="p-3 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="p-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition"
                                        >
                                            <Pencil size={16} />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}