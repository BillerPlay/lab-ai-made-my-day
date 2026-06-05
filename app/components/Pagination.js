// Prev / Next pagination controls.
export default function Pagination({ page, onPrev, onNext }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        marginTop: "32px",
      }}
    >
      <button
        onClick={onPrev}
        disabled={page === 1}
        style={{
          padding: "8px 18px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: page === 1 ? "#eee" : "#ef5350",
          color: page === 1 ? "#999" : "#fff",
          fontWeight: 600,
          cursor: page === 1 ? "not-allowed" : "pointer",
        }}
      >
        Previous
      </button>

      <span style={{ fontWeight: 700, fontSize: "15px" }}>Page {page}</span>

      <button
        onClick={onNext}
        style={{
          padding: "8px 18px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: "#ef5350",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Next
      </button>
    </div>
  );
}
