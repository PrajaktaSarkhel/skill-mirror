/**
 * Lightweight, safe code syntax tokenizer for dark-mode display
 * Supports JavaScript/TypeScript and Python tokens
 */

export function highlightCode(code: string, language: string = "javascript"): string {
  // Escape HTML entities first
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  if (language === "javascript" || language === "typescript") {
    // Comments
    html = html.replace(/(\/\/[^\n]*)/g, '<span class="code-comment">$1</span>');
    // Strings
    html = html.replace(/(["'`])(.*?)\1/g, '<span class="code-string">$1$2$1</span>');
    // Numbers
    html = html.replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>');
    // Keywords
    const keywords = /\b(const|let|var|function|return|if|else|for|while|import|export|from|default|async|await|new|try|catch|class|extends|typeof|instanceof)\b/g;
    html = html.replace(keywords, '<span class="code-keyword">$1</span>');
    // Built-ins & Common Methods
    const builtins = /\b(console|log|push|map|filter|forEach|setTimeout|setInterval|clearInterval|Promise|resolve|reject|useState|useEffect|queueMicrotask)\b/g;
    html = html.replace(builtins, '<span class="code-function">$1</span>');
    // Operators
    html = html.replace(/(=&gt;|&lt;=|===|==|!=|!==|\+|-|\*|\/|=&gt;|=>)/g, '<span class="code-operator">$1</span>');
  } else if (language === "python") {
    // Comments
    html = html.replace(/(#[^\n]*)/g, '<span class="code-comment">$1</span>');
    // Strings
    html = html.replace(/(["'])(.*?)\1/g, '<span class="code-string">$1$2$1</span>');
    // Numbers
    html = html.replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>');
    // Keywords
    const pyKeywords = /\b(def|return|if|elif|else|for|while|in|import|from|as|class|try|except|with|None|True|False|is|not|and|or|lambda)\b/g;
    html = html.replace(pyKeywords, '<span class="code-keyword">$1</span>');
    // Built-ins & Methods
    const pyBuiltins = /\b(print|append|extend|len|range|list|dict|set|int|str)\b/g;
    html = html.replace(pyBuiltins, '<span class="code-function">$1</span>');
  }

  return html;
}
