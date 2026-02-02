import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const STORAGE_KEY = "markdown-playground";

export default function MarkdownEditor() {
    const [value, setValue] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setValue(saved);
        else setValue("# Markdown Playground\n\n여기는 나만의 놀이터 ✨");
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, value);
    }, [value]);

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "100%" }}>
      <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
              padding: 16,
              border: "none",
              outline: "none",
              resize: "none",
          }}
      />

            <div style={{ padding: 16, overflowY: "auto", borderLeft: "1px solid #eee" }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {value}
                </ReactMarkdown>
            </div>
        </div>
    );
}
