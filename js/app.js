// document.addEventListener("DOMContentLoaded", () => {
//     const previewBtn = document.querySelector("#previewBtn");
//     const contrastBtn = document.querySelector("#contrastBtn");
//     const markdownInput = document.querySelector("#editor");
//     const previewSection = document.querySelector("#preview");
//     const charCount = document.querySelector("#charCount");
//     const formatBtn = document.querySelector("#formatBtn");
//     let isContrastApplied = false;
//     let currentFormat = "bold";

//     // Actualizar el contador de caracteres
//     markdownInput.addEventListener("input", () => {
//         charCount.textContent = `Caracteres: ${markdownInput.value.length}`;
//     });

//     // Verificar si marked está disponible y configurarlo
//     if (typeof marked === 'undefined') {
//         console.error("La librería Marked no está cargada correctamente.");
//         alert("Error: La librería de Markdown no está disponible. La vista previa podría no funcionar correctamente.");
//     } else {
//         // Configurar marked para manejar Markdown con asteriscos
//         marked.setOptions({
//             gfm: true,
//             breaks: true
//         });
//     }

//     // Función para convertir Markdown a HTML manualmente si es necesario
//     function simpleMarkdownToHtml(text) {
//         // Básico: negrita
//         text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
//         // Básico: cursiva
//         text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
//         // Encabezados
//         text = text.replace(/^# (.*$)/gm, '<h1>$1</h1>');
//         text = text.replace(/^## (.*$)/gm, '<h2>$1</h2>');
//         text = text.replace(/^### (.*$)/gm, '<h3>$1</h3>');
//         // Párrafos
//         text = text.replace(/^\s*(\n)?(.+)/gm, function (m) {
//             return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p>' + m + '</p>';
//         });
//         return text;
//     }

//     // Función para generar la vista previa
//     previewBtn.addEventListener("click", () => {
//         const markdownText = markdownInput.value;
        
//         if (markdownText.trim() === "") {
//             previewSection.innerHTML = "<p class='text-gray-500'>No hay contenido para mostrar</p>";
//             return;
//         }
        
//         try {
//             // Intenta usar marked si está disponible
//             if (typeof marked !== 'undefined') {
//                 const htmlContent = marked.parse(markdownText);
//                 previewSection.innerHTML = htmlContent;
//                 console.log("Vista previa generada con marked:", htmlContent);
//             } else {
//                 // Fallback a nuestra función simple
//                 const htmlContent = simpleMarkdownToHtml(markdownText);
//                 previewSection.innerHTML = htmlContent;
//                 console.log("Vista previa generada manualmente:", htmlContent);
//             }
//         } catch (error) {
//             console.error("Error al procesar Markdown:", error);
//             // Usar el método alternativo si marked falla
//             const htmlContent = simpleMarkdownToHtml(markdownText);
//             previewSection.innerHTML = htmlContent;
//         }
//     });

//     // Función para contrastar encabezados
//     contrastBtn.addEventListener("click", () => {
//         isContrastApplied = !isContrastApplied;
        
//         // Seleccionar todos los encabezados en la vista previa
//         const headings = previewSection.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
//         if (isContrastApplied) {
//             // Aplicar contraste a los encabezados
//             headings.forEach(heading => {
//                 heading.classList.add('bg-blue-100', 'p-2', 'rounded');
//             });
//             contrastBtn.textContent = "Quitar Contraste";
//         } else {
//             // Quitar contraste de los encabezados
//             headings.forEach(heading => {
//                 heading.classList.remove('bg-blue-100', 'p-2', 'rounded');
//             });
//             contrastBtn.textContent = "Contrastar Encabezados";
//         }
//     });

//     // Función de orden superior que recibe un callback para aplicar el formato
//     function toggleFormat(callback) {
//         const start = markdownInput.selectionStart;
//         const end = markdownInput.selectionEnd;
        
//         // Verificar si hay texto seleccionado
//         if (start !== end) {
//             const selectedText = markdownInput.value.substring(start, end);
//             const formattedText = callback(selectedText);
            
//             // Actualizar el contenido
//             markdownInput.value = 
//                 markdownInput.value.substring(0, start) +
//                 formattedText +
//                 markdownInput.value.substring(end);
            
//             // Mantener la selección
//             markdownInput.setSelectionRange(start, start + formattedText.length);
//             markdownInput.focus();
            
//             // Actualizar contador de caracteres
//             charCount.textContent = `Caracteres: ${markdownInput.value.length}`;
//         } else {
//             alert("Por favor, selecciona texto antes de aplicar formato");
//         }
//     }

//     // Lógica para alternar formato
//     formatBtn.addEventListener("click", () => {
//         toggleFormat(text => {
//             // Si ya tiene negrita, quitar negrita
//             if (text.startsWith("**") && text.endsWith("**")) {
//                 formatBtn.textContent = "Aplicar Formato (Negrita)";
//                 currentFormat = "bold";
//                 return text.slice(2, -2);
//             } 
//             // Si ya tiene cursiva, quitar cursiva
//             else if (text.startsWith("*") && text.endsWith("*") && !text.startsWith("**")) {
//                 formatBtn.textContent = "Aplicar Formato (Cursiva)";
//                 currentFormat = "italic";
//                 return text.slice(1, -1);
//             } 
//             // Aplicar formato según estado actual
//             else {
//                 if (currentFormat === "bold") {
//                     formatBtn.textContent = "Aplicar Formato (Cursiva)";
//                     currentFormat = "italic";
//                     return `**${text}**`;
//                 } else {
//                     formatBtn.textContent = "Aplicar Formato (Negrita)";
//                     currentFormat = "bold";
//                     return `*${text}*`;
//                 }
//             }
//         });
//     });
// });                 
  document.addEventListener("DOMContentLoaded", () => {
    const previewBtn = document.querySelector("#previewBtn");
    const contrastBtn = document.querySelector("#contrastBtn");
    const markdownInput = document.querySelector("#editor");
    const previewSection = document.querySelector("#preview");
    const charCount = document.querySelector("#charCount");
    let isContrastApplied = false;
    
    // Crear y agregar el botón manualmente al DOM
    let formatBtn = document.querySelector("#formatBtn");
    if (!formatBtn) {
        formatBtn = document.createElement("button");
        formatBtn.textContent = "Aplicar Formato";
        formatBtn.id = "formatBtn";
        formatBtn.classList.add("bg-blue-500", "text-white", "p-2", "rounded", "mt-2");
        markdownInput.insertAdjacentElement("afterend", formatBtn);
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
            previewSection.innerHTML = marked.parse(markdownInput.value);
        }
    }

    formatBtn.addEventListener("click", () => {
        toggleFormat(text => {
            if (/^\*\*.*\*\*$/.test(text)) { // Si el texto ya tiene negrita
                return text.replace(/\*\*/g, "");
            } else if (/^\*.*\*$/.test(text)) { // Si el texto ya tiene cursiva
                return text.replace(/\*/g, "");
            } else {
                return `**${text}**`;
            }
        });
    });

    previewBtn.addEventListener("click", () => {
        const markdownText = markdownInput.value;
        
        if (markdownText.trim() === "") {
            previewSection.innerHTML = "<p class='text-gray-500'>No hay contenido para mostrar</p>";
            return;
        }
        
        try {
            previewSection.innerHTML = marked.parse(markdownText);
        } catch (error) {
            console.error("Error al procesar Markdown:", error);
        }
    });

    console.log("El script se está ejecutando"); // Verificación en consola
});
