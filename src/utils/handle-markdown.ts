export function handleMarkdown(
  textareaElement: HTMLTextAreaElement,
  type: string
) {
  const selectionStart = textareaElement.selectionStart
  const selectionEnd = textareaElement.selectionEnd
  const selectedText = textareaElement.value.slice(selectionStart, selectionEnd)

  const toParse = markdownParse(selectedText, type)!

  const newValue =
    textareaElement.value.slice(0, selectionStart) +
    toParse.text +
    textareaElement.value.slice(selectionEnd)

  const newCursorPosition = selectionStart + toParse.cursorOffset! + selectedText.length

  textareaElement.value = newValue
  textareaElement.setSelectionRange(newCursorPosition, newCursorPosition)
  textareaElement.focus()
}

function markdownParse(text: string, type: string) {
  if (type === 'bold') {
    return { text: `**${text}**`,  cursorOffset: 2 }
  } else if (type === 'italic') {
    return { text: `_${text}_`, cursorOffset: 1 }
  } else if (type === 'underline') {
    return { text: `<u>${text}</u>`, cursorOffset: 4 }
  } else if (type === 'link') {
    return { text: `[${text}](link)`, cursorOffset: 1 }
  } else if (type === 'image') {
    return { text: `![description](img_url)`, cursorOffset: 0 }
  } else if (type === 'code-block') {
    return { text: `\`\`\`lang\n${text}\n\`\`\`` }
  } else if (type === 'heading-two') {
    return { text: `## ${text}` }
  } else if (type === 'quotes') {
    return { text: `> ${text}` }
  } else if (type === 'align-left') {
    return {
      text: `<div style="text-align: left;">${text}</div>`,
    }
  } else if (type === 'align-center') {
    return {
      text: `<div style="text-align: center;">${text}</div>`,
    }
  } else if (type === 'align-right') {
    return {
      text: `<div style="text-align: right;">${text}</div>`,
    }
  }
}
