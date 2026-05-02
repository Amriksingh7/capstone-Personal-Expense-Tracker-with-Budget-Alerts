import { useState } from "react"
import Header from "./topbar.jsx"
import ExpenseList, { categoryColors } from "./article.jsx"

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: #f1f5f9;
    color: #1e293b;
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
  }

  .topbar {
    background: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    padding: 0 40px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .topbar-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .logo-icon {
    width: 32px;
    height: 32px;
    background: #6366f1;
    color: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
  }

  .logo-text {
    font-size: 17px;
    font-weight: 700;
    color: #1e293b;
    letter-spacing: -0.3px;
  }

  .month-tag {
    background: #f1f5f9;
    color: #64748b;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 20px;
    border: 1px solid #e2e8f0;
  }

  .tagline {
    font-size: 13px;
    color: #94a3b8;
    font-weight: 400;
  }

  .page {
    max-width: 980px;
    margin: 0 auto;
    padding: 32px 24px 60px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .alert {
    border-radius: 10px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    font-weight: 500;
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .alert-danger {
    background: #fff1f2;
    border: 1px solid #fecdd3;
    color: #be123c;
  }

  .alert-warning {
    background: #fffbeb;
    border: 1px solid #fde68a;
    color: #92400e;
  }

  .alert-icon {
    font-size: 18px;
    flex-shrink: 0;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .stat-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px 22px;
  }

  .stat-label {
    font-size: 12px;
    font-weight: 500;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  }

  .stat-value {
    font-size: 26px;
    font-weight: 700;
    color: #1e293b;
    letter-spacing: -0.5px;
  }

  .stat-value.danger { color: #e11d48; }
  .stat-value.safe   { color: #16a34a; }

  .stat-sub {
    font-size: 12px;
    color: #94a3b8;
    margin-top: 4px;
  }

  .budget-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px 22px;
  }

  .budget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
  }

  .budget-title {
    font-size: 14px;
    font-weight: 600;
    color: #1e293b;
  }

  .budget-edit {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .budget-edit input {
    width: 110px;
    border: 1px solid #e2e8f0;
    border-radius: 7px;
    padding: 6px 10px;
    font-size: 13px;
    font-family: 'Inter', sans-serif;
    color: #1e293b;
    outline: none;
    transition: border-color 0.2s;
  }

  .budget-edit input:focus {
    border-color: #6366f1;
  }

  .btn-set {
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 7px;
    padding: 6px 14px;
    font-size: 13px;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-set:hover {
    background: #4f46e5;
  }

  .progress-bar-wrap {
    background: #f1f5f9;
    border-radius: 99px;
    height: 8px;
    overflow: hidden;
  }

  .progress-bar-fill {
    height: 100%;
    border-radius: 99px;
    transition: width 0.4s ease, background 0.3s;
  }

  .progress-safe    { background: #22c55e; }
  .progress-warning { background: #f59e0b; }
  .progress-danger  { background: #ef4444; }

  .progress-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    font-size: 12px;
    color: #94a3b8;
  }

  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
  }

  .card-head {
    padding: 16px 20px;
    border-bottom: 1px solid #f1f5f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-head-title {
    font-size: 14px;
    font-weight: 600;
    color: #1e293b;
  }

  .card-head-count {
    font-size: 12px;
    color: #94a3b8;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    padding: 2px 10px;
  }

  .form-body {
    padding: 18px 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .form-row {
    display: flex;
    gap: 10px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex: 1;
  }

  .field label {
    font-size: 12px;
    font-weight: 500;
    color: #64748b;
  }

  .field input,
  .field select {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 9px 12px;
    font-size: 13px;
    font-family: 'Inter', sans-serif;
    color: #1e293b;
    background: #ffffff;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
  }

  .field input:focus,
  .field select:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  .field input::placeholder {
    color: #cbd5e1;
  }

  .btn-submit {
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 0;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: background 0.2s;
    width: 100%;
    margin-top: 2px;
  }

  .btn-submit:hover {
    background: #4f46e5;
  }

  .expense-list {
    display: flex;
    flex-direction: column;
  }

  .expense-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    border-bottom: 1px solid #f8fafc;
    transition: background 0.15s;
  }

  .expense-row:last-child {
    border-bottom: none;
  }

  .expense-row:hover {
    background: #fafbfc;
  }

  .expense-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .expense-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .expense-name {
    font-size: 14px;
    font-weight: 500;
    color: #1e293b;
    display: block;
    margin-bottom: 4px;
  }

  .expense-meta {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .expense-category {
    font-size: 11px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 20px;
  }

  .expense-date {
    font-size: 11px;
    color: #94a3b8;
  }

  .expense-right {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .expense-amount {
    font-size: 15px;
    font-weight: 600;
    color: #1e293b;
  }

  .btn-delete {
    background: none;
    border: 1px solid #f1f5f9;
    color: #cbd5e1;
    width: 26px;
    height: 26px;
    border-radius: 6px;
    font-size: 11px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-delete:hover {
    background: #fff1f2;
    color: #e11d48;
    border-color: #fecdd3;
  }

  .empty-state {
    padding: 48px 20px;
    text-align: center;
  }

  .empty-icon {
    font-size: 36px;
    margin-bottom: 12px;
  }

  .empty-title {
    font-size: 15px;
    font-weight: 600;
    color: #475569;
    margin-bottom: 4px;
  }

  .empty-sub {
    font-size: 13px;
    color: #94a3b8;
  }

  .breakdown-list {
    padding: 8px 0;
  }

  .breakdown-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
  }

  .breakdown-left {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: #475569;
    font-weight: 500;
  }

  .breakdown-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .breakdown-amount {
    font-size: 13px;
    font-weight: 600;
    color: #1e293b;
  }

  .no-breakdown {
    padding: 32px 20px;
    text-align: center;
    font-size: 13px;
    color: #94a3b8;
  }
`

const categories = ["Food", "Transport", "Shopping", "Entertainment", "Health", "Bills", "Other"]



function BudgetAlert({ spent, budget }) {
  if (!budget || budget <= 0) return null
  const pct = (spent / budget) * 100
  if (pct < 80) return null

  if (pct >= 100) {
    return (
      <div className="alert alert-danger">
        <span className="alert-icon">🚨</span>
        <span>Budget exceeded! You have spent ₹{spent.toLocaleString("en-IN")} out of your ₹{budget.toLocaleString("en-IN")} budget.</span>
      </div>
    )
  }

  return (
    <div className="alert alert-warning">
      <span className="alert-icon">⚠️</span>
      <span>You've used {Math.round(pct)}% of your budget. Only ₹{(budget - spent).toLocaleString("en-IN")} remaining.</span>
    </div>
  )
}

function BudgetBar({ spent, budget }) {
  const pct = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0
  const cls = pct >= 100 ? "progress-danger" : pct >= 80 ? "progress-warning" : "progress-safe"

  return (
    <div className="budget-card">
      <div className="budget-header">
        <span className="budget-title">Monthly Budget</span>
      </div>
      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: pct + "%"}} class={cls}></div>
      </div>
      <div className="progress-labels">
        <span>₹{spent.toLocaleString("en-IN")} spent</span>
        <span>{budget > 0 ? `₹${budget.toLocaleString("en-IN")} budget` : "No budget set"}</span>
      </div>
    </div>
  )
}

function AddExpenseForm({ onAdd }) {
  const [name, setName]       = useState("")
  const [amount, setAmount]   = useState("")
  const [category, setCategory] = useState("Food")
  const [date, setDate]       = useState(new Date().toISOString().split("T")[0])

  function submit() {
    const n = name.trim()
    const a = parseFloat(amount)
    if (!n || isNaN(a) || a <= 0) return
    onAdd({ id: Date.now(), name: n, amount: a, category, date })
    setName("")
    setAmount("")
    setCategory("Food")
    setDate(new Date().toISOString().split("T")[0])
  }

  return (
    <div className="card">
      <div className="card-head">
        <span className="card-head-title">Add Expense</span>
      </div>
      <div className="form-body">
        <div className="form-row">
          <div className="field" style={{ flex: 2 }}>
            <label>Description</label>
            <input
              placeholder="e.g. Lunch, Cab, Netflix"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
          </div>
          <div className="field">
            <label>Amount (₹)</label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="field">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <button className="btn-submit" onClick={submit}>Add Expense</button>
      </div>
    </div>
  )
}

function CategoryBreakdown({ expenses }) {
  const map = {}
  expenses.forEach((e) => {
    map[e.category] = (map[e.category] || 0) + e.amount
  })

  const sorted = Object.entries(map).sort((a, b) => b[1] - a[1])

  return (
    <div className="card" style={{ height: "fit-content" }}>
      <div className="card-head">
        <span className="card-head-title">By Category</span>
      </div>
      {sorted.length === 0
        ? <div className="no-breakdown">No data yet</div>
        : <div className="breakdown-list">
            {sorted.map(([cat, total]) => (
              <div className="breakdown-item" key={cat}>
                <span className="breakdown-left">
                  <span
                    className="breakdown-dot"
                    style={{ background: (categoryColors[cat] || categoryColors.Other).dot }}
                  ></span>
                  {cat}
                </span>
                <span className="breakdown-amount">₹{total.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
      }
    </div>
  )
}

export default function App() {
  const [expenses, setExpenses] = useState([])
  const [budget, setBudget]     = useState(10000)
  const [budgetInput, setBudgetInput] = useState("10000")

  const totalSpent  = expenses.reduce((s, e) => s + e.amount, 0)
  const remaining   = budget - totalSpent
  const pct         = budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0
  const progressCls = pct >= 100 ? "progress-danger" : pct >= 80 ? "progress-warning" : "progress-safe"

  function addExpense(expense) {
    setExpenses((prev) => [expense, ...prev])
  }

  function deleteExpense(id) {
    setExpenses((prev) => prev.filter((e) => e.id !== id))
  }

  function saveBudget() {
    const val = parseFloat(budgetInput)
    if (!isNaN(val) && val > 0) setBudget(val)
  }

  return (
    <>
      <style>{css}</style>
      <Header />
      <div className="page">

        <BudgetAlert spent={totalSpent} budget={budget} />

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Spent</div>
            <div className="stat-value">₹{totalSpent.toLocaleString("en-IN")}</div>
            <div className="stat-sub">{expenses.length} transactions</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Remaining Budget</div>
            <div className={`stat-value ${remaining < 0 ? "danger" : "safe"}`}>
              ₹{Math.abs(remaining).toLocaleString("en-IN")}
            </div>
            <div className="stat-sub">{remaining < 0 ? "over budget" : "left to spend"}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Budget Used</div>
            <div className={`stat-value ${pct >= 100 ? "danger" : pct >= 80 ? "" : "safe"}`}>
              {budget > 0 ? Math.round(pct) + "%" : "—"}
            </div>
            <div className="stat-sub">of ₹{budget.toLocaleString("en-IN")} budget</div>
          </div>
        </div>

        <div className="budget-card">
          <div className="budget-header">
            <span className="budget-title">Monthly Budget</span>
            <div className="budget-edit">
              <input
                type="number"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveBudget()}
                placeholder="Set budget"
              />
              <button className="btn-set" onClick={saveBudget}>Set</button>
            </div>
          </div>
          <div className="progress-bar-wrap">
            <div
              className={`progress-bar-fill ${progressCls}`}
              style={{ width: pct + "%" }}
            ></div>
          </div>
          <div className="progress-labels">
            <span>₹{totalSpent.toLocaleString("en-IN")} spent</span>
            <span>₹{budget.toLocaleString("en-IN")} budget</span>
          </div>
        </div>

        <AddExpenseForm onAdd={addExpense} />

        <div className="two-col">
          <div className="card">
            <div className="card-head">
              <span className="card-head-title">Recent Expenses</span>
              <span className="card-head-count">{expenses.length} total</span>
            </div>
            <ExpenseList expenses={expenses} onDelete={deleteExpense} />
          </div>
          <CategoryBreakdown expenses={expenses} />
        </div>

      </div>
    </>
  )
}
