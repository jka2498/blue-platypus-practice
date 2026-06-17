import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

/** Styled markdown renderer for flashcard backs and challenge descriptions. */
export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div
      className={cn(
        "space-y-3 text-sm leading-relaxed text-foreground",
        "[&_h1]:text-xl [&_h1]:font-bold [&_h2]:text-lg [&_h2]:font-bold [&_h2]:tracking-tight",
        "[&_h3]:text-base [&_h3]:font-bold",
        "[&_p]:text-[0.95rem] [&_p]:text-foreground",
        "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1",
        "[&_a]:font-medium [&_a]:text-accent [&_a]:underline-offset-2 hover:[&_a]:underline",
        "[&_strong]:font-semibold",
        "[&_code]:rounded [&_code]:bg-code-inline-bg [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-code-inline-fg",
        "[&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-code-bg [&_pre]:p-4",
        "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-code-block-fg",
        "[&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:px-2 [&_th]:py-1 [&_th]:text-left",
        "[&_td]:border [&_td]:px-2 [&_td]:py-1",
        "[&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground",
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
