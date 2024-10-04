import { useState } from "react";
import Table from "./components/Table";
import Input from "./components/Input";
import Button from "./components/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [m, setM] = useState<number>(0);
  const [n, setN] = useState<number>(0);
  const [matrix, setMatrix] = useState<number[][] | null>(null);

  const handleGenerate = () => {
    if (m % 2 === 0 || n % 2 === 0 || m < 3 || n < 3) {
      toast.error("ابعاد باید فرد و بزرگتر از 3 باشند.");
      setMatrix(null);
    } else {
      const emptyMatrix = Array.from({ length: m }, () => Array(n).fill(0));
      setMatrix(emptyMatrix);
    }
  };

  return (
    <main className="flex flex-col items-center p-5 font-vazir" dir="rtl">
      <div className="flex flex-col items-center space-y-4">
        <p dir="rtl" className="sm:text-lg">
          لطفاً مقادیر زیر را تکمیل نمائید.
        </p>
        <Input label="تعداد سطرها" value={m} onChange={(e) => setM(Number(e.target.value))} />
        <Input label="تعداد ستون‌ها" value={n} onChange={(e) => setN(Number(e.target.value))} />
        <Button label="تولید جدول" onClick={handleGenerate} />
      </div>
      {matrix && <Table matrix={matrix} setMatrix={setMatrix} />}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
};

export default Home;
