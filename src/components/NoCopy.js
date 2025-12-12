import { useEffect } from "react";

export default function NoCopy() {
    useEffect(() => {
        // Block Right Click
        const handleContextMenu = e => e.preventDefault();
        document.addEventListener("contextmenu", handleContextMenu);

        // Block Text Selection
        const style = document.createElement("style");
        style.innerHTML = `
      * {
        user-select: none !important;
        -webkit-user-select: none !important;
      }
    `;
        document.head.appendChild(style);

        // Block Copy Shortcuts (Ctrl+C, Ctrl+U, Ctrl+S, F12, etc.)
        const blockKeys = e => {
            const key = e.key.toLowerCase();
            if (
                (e.ctrlKey && ["c", "u", "s", "p"].includes(key)) ||
                (e.ctrlKey && e.shiftKey && ["i", "j"].includes(key)) ||
                key === "f12"
            ) {
                e.preventDefault();
                return false;
            }
        };
        document.addEventListener("keydown", blockKeys);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", blockKeys);
            document.head.removeChild(style);
        };
    }, []);

    return null;
}
