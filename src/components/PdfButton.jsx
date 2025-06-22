import clsx from "clsx";

const PdfButton = ({ bgColor = "bg-indigo-700", hoverColor = "bg-indigo-900" }) => {
  return (
    <button
      onClick={() => window.print()}
      className={clsx(
        "px-4 py-1 text-white rounded",
        bgColor,
        `hover:${hoverColor}`
      )}
    >
      PDF
    </button>
  );
};

export default PdfButton;
