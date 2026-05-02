const categoryColors = {
  Food:          { bg: "#fff7ed", color: "#c2410c", dot: "#f97316" },
  Transport:     { bg: "#eff6ff", color: "#1d4ed8", dot: "#3b82f6" },
  Shopping:      { bg: "#fdf4ff", color: "#7e22ce", dot: "#a855f7" },
  Entertainment: { bg: "#f0fdf4", color: "#15803d", dot: "#22c55e" },
  Health:        { bg: "#fff1f2", color: "#be123c", dot: "#f43f5e" },
  Bills:         { bg: "#fefce8", color: "#a16207", dot: "#eab308" },
  Other:         { bg: "#f8fafc", color: "#475569", dot: "#94a3b8" },
}

function ExpenseRow({ expense, onDelete }) {
  const style = categoryColors[expense.category] || categoryColors.Other
  const date = new Date(expense.date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  })

  return (
    <div className="expense-row">
      <div className="expense-left">
        <div className="expense-dot" style={{ background: style.dot }}></div>
        <div className="expense-info">
          <span className="expense-name">{expense.name}</span>
          <div className="expense-meta">
            <span
              className="expense-category"
              style={{ background: style.bg, color: style.color }}
            >
              {expense.category}
            </span>
            <span className="expense-date">{date}</span>
          </div>
        </div>
      </div>
      <div className="expense-right">
        <span className="expense-amount">₹{expense.amount.toLocaleString("en-IN")}</span>
        <button className="btn-delete" onClick={() => onDelete(expense.id)}>✕</button>
      </div>
    </div>
  )
}

function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🧾</div>
        <p className="empty-title">No expenses yet</p>
        <p className="empty-sub">Add your first expense above to get started</p>
      </div>
    )
  }

  return (
    <div className="expense-list">
      {expenses.map((e) => (
        <ExpenseRow key={e.id} expense={e} onDelete={onDelete} />
      ))}
    </div>
  )
}

export { categoryColors }
export default ExpenseList
