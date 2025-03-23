// Botón "Generar Vista Previa"
previewBtn.addEventListener("click", () => {
    const rawMarkdown = markdownInput.value;

    // Paso 1: listas
    const withLists = parseOrderedList(rawMarkdown, (line) => {
        const content = line.replace(/^\d+\.\s*/, "");
        return `<li>${content}</li>`;

    // Paso 2: bloques de código
    const withCode = transformCodeBlocks(withLists);

    // Paso 3: render final
    previewSection.innerHTML = marked.parse(withCode);
});

// Vista previa automática
markdownInput.addEventListener("input", () => {
    if (!isFormatting) {
        previewSection.innerHTML = marked.parse(markdownInput.value);
    }
});

// Reset del botón cuando se selecciona nuevo texto
function resetFormatButton() {
    formatBtn.textContent = "Aplicar Formato en Negrita";
    formatBtn.className = "text-white px-4 py-2 rounded w-fit mt-2 bg-blue-500";
}

markdownInput.addEventListener("mouseup", resetFormatButton);
markdownInput.addEventListener("keyup", (e) => {
    if (e.shiftKey || e.key.startsWith("Arrow")) {
        resetFormatButton();
    }
});
});
