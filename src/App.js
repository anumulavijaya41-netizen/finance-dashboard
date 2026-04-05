import React, { useState } from "react";

function App() {

  const [role, setRole] = useState("viewer");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [transactions] = useState([
    { id: 1, date: "2026-04-01", amount: 500, category: "Food", type: "expense" },
    { id: 2, date: "2026-04-02", amount: 2000, category: "Salary", type: "income" },
    { id: 3, date: "2026-04-03", amount: 800, category: "Shopping", type: "expense" },
    { id: 4, date: "2026-04-04", amount: 1500, category: "Freelance", type: "income" }
  ]);

  // Calculations
  const income = transactions.filter(t => t.type === "income").reduce((a, b) => a + b.amount, 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0);
  const balance = income - expense;

  // Highest expense
  const highestExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((max, t) => (t.amount > max.amount ? t : max), { amount: 0 });

  // Filter + Search
  const filteredTransactions = transactions.filter(t =>
    (filter === "all" || t.type === filter) &&
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", background: "#f5f6fa" }}>

      <h1>💰 Finance Dashboard</h1>

      {/* Role Switch */}
      <div style={{ marginBottom: "10px" }}>
        <label>Role: </label>
        <select onChange={(e) => setRole(e.target.value)}>
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* SUMMARY CARDS */}
      <h2>Overview</h2>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={cardStyle}>💼 Balance <br /> ₹{balance}</div>
        <div style={cardStyle}>📈 Income <br /> ₹{income}</div>
        <div style={cardStyle}>📉 Expense <br /> ₹{expense}</div>
      </div>

      {/* TRANSACTIONS */}
      <h2>Transactions</h2>

      <input
        type="text"
        placeholder="Search category..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {role === "admin" && <button style={{ marginLeft: "10px" }}>Add Transaction</button>}

      <table border="1" cellPadding="10" style={{ marginTop: "10px", width: "100%" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map(t => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>₹{t.amount}</td>
                <td>{t.category}</td>
                <td>{t.type}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* INSIGHTS */}
      <h2>Insights</h2>
      <p>🔥 Highest Spending Category: {highestExpense.category}</p>
      <p>📊 Total Transactions: {transactions.length}</p>
      <p>💡 Observation: Expenses are {expense > income ? "higher" : "lower"} than income</p>

    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  width: "150px",
  textAlign: "center"
};

export default App;