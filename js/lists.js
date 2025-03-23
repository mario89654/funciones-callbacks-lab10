 // Función de orden superior para listas numeradas
 function parseOrderedList(markdown, transformer) {
    const lines = markdown.split("\n");
    const result = [];
    let isInList = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (/^\d+\.\s+/.test(line)) {
            if (!isInList) {
                result.push("<ol>");
                isInList = true;
            }
            result.push(transformer(line));
        } else {
            if (isInList) {
                result.push("</ol>");
                isInList = false;
            }
            result.push(line);
        }
    }

    if (isInList) {
        result.push("</ol>");
    }

    return result.join("\n");
}
