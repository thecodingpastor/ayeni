import useCopyToClipboard from "../../utils/hooks/useCopyToClipboard";

const CopyUrlButton: React.FC<{ url: string }> = ({ url }) => {
  const { copy, copyStatus } = useCopyToClipboard(url);
  let buttonText = "Copy URL";

  if (copyStatus === "copied") {
    buttonText = "Copied";
  } else if (copyStatus === "failed") {
    buttonText = "Copy failed!";
  }

  return (
    <button
      className="ellipses"
      onClick={copy}
      style={{
        cursor: "pointer",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "1rem",
        marginBottom: "1rem",
        background: "#a18ecb",
        color: "#5630a8",
        fontSize: "1.2rem",
      }}
    >
      {buttonText}
    </button>
  );
};

export default CopyUrlButton;
