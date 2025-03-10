
import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  showLineNumbers?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, showLineNumbers = false, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const [lineCount, setLineCount] = React.useState(1);
    
    React.useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);
    
    // Update line count when text changes
    React.useEffect(() => {
      if (showLineNumbers && textareaRef.current) {
        const lines = (textareaRef.current.value.match(/\n/g) || []).length + 1;
        setLineCount(lines);
      }
    }, [props.value, showLineNumbers]);
    
    if (!showLineNumbers) {
      return (
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={textareaRef}
          {...props}
        />
      );
    }
    
    return (
      <div className="relative flex min-h-[80px] w-full rounded-md border border-input bg-background text-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
        <div className="flex-shrink-0 select-none py-2 px-2 text-right text-muted-foreground bg-muted border-r border-input" style={{ width: '3rem' }}>
          {Array.from({ length: lineCount }).map((_, index) => (
            <div key={index} className="leading-6">{index + 1}</div>
          ))}
        </div>
        <textarea
          className={cn(
            "flex min-h-[80px] w-full py-2 px-3 bg-transparent border-0 outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={textareaRef}
          style={{ resize: props.style?.resize || 'vertical' }}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
