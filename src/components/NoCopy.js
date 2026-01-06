import { useEffect } from "react";

export default function NoCopy() {
    useEffect(() => {
        // Disable right click menu
        const handleContextMenu = e => e.preventDefault();
        document.addEventListener("contextmenu", handleContextMenu);

        // Block ONLY copy shortcut (Ctrl + C)
        const blockKeys = e => {
            const key = e.key.toLowerCase();
            if (e.ctrlKey && key === "c") {
                e.preventDefault();
                return false;
            }
        };
        document.addEventListener("keydown", blockKeys);

        // Block copy event (like context menu Copy)
        const blockCopy = e => e.preventDefault();
        document.addEventListener("copy", blockCopy);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", blockKeys);
            document.removeEventListener("copy", blockCopy);
        };
    }, []);

    return null;
}
