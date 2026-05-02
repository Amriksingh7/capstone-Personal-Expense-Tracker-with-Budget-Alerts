function Header() {
  const now = new Date()
  const month = now.toLocaleString("default", { month: "long", year: "numeric" })

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="logo">
          <span className="logo-icon">₹</span>
          <span className="logo-text">SpendSmart</span>
        </div>
        <span className="month-tag">{month}</span>
      </div>
      <div className="topbar-right">
        <span className="tagline">Personal Expense Tracker</span>
      </div>
    </div>
  )
}

export default Header
