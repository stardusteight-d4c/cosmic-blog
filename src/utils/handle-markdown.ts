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

  textareaElement.value = newValue
  textareaElement.focus()

  moveCursorPosition(textareaElement, toParse.displacement)
}

function markdownParse(text: string, type: string) {
  if (type === 'bold') {
    return { text: `**${text}**`, displacement: 2 }
  } else if (type === 'italic') {
    return { text: `_${text}_`, displacement: 1 }
  } else if (type === 'underline') {
    return { text: `<u>${text}</u>`, displacement: 4 }
  } else if (type === 'link') {
    return { text: `[${text}](link)`, displacement: 0 }
  } else if (type === 'image') {
    return { text: `![description](img_url)`, displacement: 0 }
  } else if (type === 'code-block') {
    return { text: `\`\`\`lang\n${text}\n\`\`\``, displacement: 3 }
  } else if (type === 'heading-two') {
    return { text: `## ${text}`, displacement: 0 }
  } else if (type === 'quotes') {
    return { text: `> ${text}`, displacement: 0 }
  } else if (type === 'align-left') {
    return {
      text: `<div style="text-align: left;">${text}</div>`,
      displacement: 6,
    }
  } else if (type === 'align-center') {
    return {
      text: `<div style="text-align: center;">${text}</div>`,
      displacement: 6,
    }
  } else if (type === 'align-right') {
    return {
      text: `<div style="text-align: right;">${text}</div>`,
      displacement: 6,
    }
  }
}

function moveCursorPosition(
  textareaElement: HTMLTextAreaElement,
  displacement: number
) {
  const cursorCurrentPostion = textareaElement.selectionStart
  const newPosition = cursorCurrentPostion - displacement
  textareaElement.selectionStart = newPosition
  textareaElement.selectionEnd = newPosition
}
