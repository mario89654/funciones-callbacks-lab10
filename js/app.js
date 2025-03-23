document.addEventListener("DOMContentLoaded", () => {
    const previewBtn = document.querySelector("#previewBtn");
    const contrastBtn = document.querySelector("#contrastBtn");
    const markdownInput = document.querySelector("#editor");
    const previewSection = document.querySelector("#preview");
    const charCount = document.querySelector("#charCount");
    let isContrastApplied = false;
    let isFormatting = false;

    // Crear y agregar el botón manualmente al DOM
    let formatBtn = document.querySelector("#formatBtn");
    if (!formatBtn) {
        const formatWrapper = document.createElement("div");
        formatWrapper.className = "flex justify-center mb-2";

        formatBtn = document.createElement("button");
        formatBtn.textContent = "Aplicar Formato en Negrita";
        formatBtn.id = "formatBtn";
        formatBtn.className = "text-white px-4 py-2 rounded bg-blue-500 w-fit";

        formatWrapper.appendChild(formatBtn);
        markdownInput.insertAdjacentElement("afterend", formatWrapper);
    }

    function toggleFormat(callback) {
        const start = markdownInput.selectionStart;
        const end = markdownInput.selectionEnd;
        if (start !== end) {
            const selectedText = markdownInput.value.substring(start, end);
            const formattedText = callback(selectedText);
            markdownInput.value =
                markdownInput.value.substring(0, start) +
                formattedText +
                markdownInput.value.substring(end);
            markdownInput.setSelectionRange(start, start + formattedText.length);
            markdownInput.focus();
        }
    }

    formatBtn.addEventListener("click", () => {
        isFormatting = true;

        const start = markdownInput.selectionStart;
        const end = markdownInput.selectionEnd;

        if (start !== end) {
            const selectedText = markdownInput.value.substring(start, end);
            const trimmed = selectedText.trim();

            let formattedText = "";
            let nextLabel = "";
            let nextClasses = [];

            if (/^\*\*(.+)\*\*$/.test(trimmed)) {
                formattedText = `*${trimmed.slice(2, -2)}*`;
                nextLabel = "Aplicar Formato Normal";
                nextClasses = ["bg-gray-600"];
            } else if (/^\*(.+)\*$/.test(trimmed)) {
                formattedText = trimmed.slice(1, -1);
                nextLabel = "Aplicar Formato en Negrita";
                nextClasses = ["bg-blue-500"];
            } else {
                formattedText = `**${trimmed}**`;
                nextLabel = "Aplicar Formato en Cursiva";
                nextClasses = ["bg-green-500"];
            }

            markdownInput.value =
                markdownInput.value.substring(0, start) +
                formattedText +
                markdownInput.value.substring(end);

            markdownInput.setSelectionRange(start, start + formattedText.length);
            markdownInput.focus();

            formatBtn.textContent = nextLabel;
            formatBtn.className = "text-white px-4 py-2 rounded w-fit mt-2 " + nextClasses.join(" ");

            previewSection.innerHTML = marked.parse(markdownInput.value);
        }

        isFormatting = false;
    });

   // list .


    // blocks. 

        // format.
        
    });