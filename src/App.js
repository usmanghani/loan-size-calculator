import { useState } from "react";

export default function LoanSizeCalculator() {
  const [payment, setPayment] = useState(1000);
  const [apr, setApr] = useState(6.5);
  const [loan10, setLoan10] = useState(0);
  const [loan30, setLoan30] = useState(0);

  function calculateLoanSize(payment, apr, years) {
    const r = apr / 100 / 12;
    const n = years * 12;
    if (r === 0) return payment * n;
    return payment * (1 - Math.pow(1 + r, -n)) / r;
  }

  function handleCalculate() {
    const l10 = calculateLoanSize(payment, apr, 10);
    const l30 = calculateLoanSize(payment, apr, 30);
    setLoan10(l10);
    setLoan30(l30);
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Loan Size Calculator</h1>

      <div className="mb-4">
        <label className="block mb-1">Monthly Payment ($)</label>
        <input
          type="number"
          value={payment}
          onChange={(e) => setPayment(parseFloat(e.target.value))}
          className="border rounded p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">APR (%)</label>
        <input
          type="number"
          value={apr}
          onChange={(e) => setApr(parseFloat(e.target.value))}
          className="border rounded p-2 w-full"
        />
      </div>

      <button
        onClick={handleCalculate}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Calculate
      </button>

      <div className="bg-gray-100 p-4 rounded">
        <p>🔹 Max Loan (10 Years): <strong>${loan10.toFixed(2)}</strong></p>
        <p>🔹 Max Loan (30 Years): <strong>${loan30.toFixed(2)}</strong></p>
        <p>📈 Difference: <strong>${(loan30 - loan10).toFixed(2)}</strong></p>
      </div>
    </div>
  );
}
