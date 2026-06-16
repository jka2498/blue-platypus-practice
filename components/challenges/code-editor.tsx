"use client";

import Editor, { type OnMount, type BeforeMount } from "@monaco-editor/react";
import { Loader2 } from "lucide-react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string | number;
  readOnly?: boolean;
  onRunShortcut?: () => void;
}

/** Monaco editor wrapped with the DevPath dark theme + Cmd/Ctrl+Enter run hook. */
export function CodeEditor({
  value,
  onChange,
  language = "javascript",
  height = "100%",
  readOnly = false,
  onRunShortcut,
}: CodeEditorProps) {
  const beforeMount: BeforeMount = (monaco) => {
    monaco.editor.defineTheme("devpath", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#1A1A1A",
        "editor.lineHighlightBackground": "#232323",
        "editorLineNumber.foreground": "#5A5A5A",
        "editorGutter.background": "#1A1A1A",
        "editorIndentGuide.background1": "#2A2A2A",
      },
    });
  };

  const onMount: OnMount = (editor, monaco) => {
    if (onRunShortcut) {
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        onRunShortcut();
      });
    }
  };

  return (
    <Editor
      value={value}
      language={language}
      height={height}
      theme="devpath"
      beforeMount={beforeMount}
      onMount={onMount}
      onChange={(v) => onChange(v ?? "")}
      loading={
        <div className="flex h-full items-center justify-center bg-code-bg text-[#9b958f]">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      }
      options={{
        readOnly,
        fontSize: 13,
        fontFamily: "var(--font-jetbrains-mono), monospace",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        padding: { top: 14, bottom: 14 },
        tabSize: 2,
        smoothScrolling: true,
        automaticLayout: true,
        lineNumbersMinChars: 3,
        renderLineHighlight: "line",
        scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
      }}
    />
  );
}
