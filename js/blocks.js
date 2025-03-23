// Función de primera clase para bloques de código
const transformCodeBlocks = (markdown) => {
    return markdown.replace(/```([\s\S]*?)```/g, (_, code) => {
        const escapedCode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return `<pre><code class="resaltado">${escapedCode}</code></pre>`;
    });
};
