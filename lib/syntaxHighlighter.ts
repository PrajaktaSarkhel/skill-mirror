/**
 * Lightweight, 100% safe code syntax tokenizer.
 * Scans tokens in a single pass so generated HTML tags are NEVER re-scanned or corrupted.
 */

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function highlightCode(code: string, language: string = "javascript"): string {
  if (!code) return "";

  // Token definition regex patterns for single-pass scanning
  const isPython = language === "python";

  // Match: comments | strings | keywords | functions/builtins | numbers | operators | identifiers/whitespace
  const regex = isPython
    ? /(#[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b(?:def|return|if|elif|else|for|while|in|import|from|as|class|try|except|with|None|True|False|is|not|and|or|lambda)\b)|(\b(?:print|append|extend|len|range|list|dict|set|int|str)\b)|(\b\d+(?:\.\d+)?\b)|(==|!=|<=|>=|\+=|-=|\*=|\/=|[-+*/%=<>])/g
    : /(\/\/[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b(?:const|let|var|function|return|if|else|for|while|import|export|from|default|async|await|new|try|catch|class|extends|typeof|instanceof)\b)|(\b(?:console|log|push|map|filter|forEach|setTimeout|setInterval|clearInterval|Promise|resolve|reject|useState|useEffect|queueMicrotask)\b)|(\b\d+(?:\.\d+)?\b)|(=>|===|!==|==|!=|<=|>=|\+\+|--|\+=|-=|\*=|\/=|[-+*/%=<>])/g;

  let lastIndex = 0;
  let result = "";
  let match: RegExpExecArray | null;

  while ((match = regex.exec(code)) !== null) {
    // Append plain text between previous match and current match
    if (match.index > lastIndex) {
      result += escapeHtml(code.slice(lastIndex, match.index));
    }

    const [
      fullMatch,
      comment,
      stringToken,
      keyword,
      builtin,
      numberToken,
      operatorToken,
    ] = match;

    if (comment) {
      result += `<span class="code-comment">${escapeHtml(comment)}</span>`;
    } else if (stringToken) {
      result += `<span class="code-string">${escapeHtml(stringToken)}</span>`;
    } else if (keyword) {
      result += `<span class="code-keyword">${escapeHtml(keyword)}</span>`;
    } else if (builtin) {
      result += `<span class="code-function">${escapeHtml(builtin)}</span>`;
    } else if (numberToken) {
      result += `<span class="code-number">${escapeHtml(numberToken)}</span>`;
    } else if (operatorToken) {
      result += `<span class="code-operator">${escapeHtml(operatorToken)}</span>`;
    } else {
      result += escapeHtml(fullMatch);
    }

    lastIndex = regex.lastIndex;
  }

  // Append remaining text
  if (lastIndex < code.length) {
    result += escapeHtml(code.slice(lastIndex));
  }

  return result;
}
