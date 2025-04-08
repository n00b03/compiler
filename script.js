document.addEventListener('DOMContentLoaded', () => {
    const runBtn = document.getElementById('runBtn');
    const htmlInput = document.getElementById('htmlInput');
    const cssInput = document.getElementById('cssInput');
    const jsInput = document.getElementById('jsInput');
    const output = document.getElementById('output');
    const status = document.getElementById('status');

    // Check if all elements are found
    if (!runBtn || !htmlInput || !cssInput || !jsInput || !output || !status) {
        console.error('One or more required elements not found!');
        return;
    }

    // Function to update the output
    function updateOutput() {
        try {
            const html = htmlInput.value || '';
            const css = cssInput.value || '';
            const js = jsInput.value || '';

            // Log the input values for debugging
            console.log('HTML:', html);
            console.log('CSS:', css);
            console.log('JS:', js);

            // Create the full HTML document as a string
            const fullCode = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>${css}</style>
                </head>
                <body>
                    ${html}
                    <script>
                        try {
                            ${js}
                        } catch (e) {
                            console.error('JavaScript Error:', e);
                        }
                    </script>
                </body>
                </html>
            `;

            // Log the generated code for debugging
            console.log('Generated Code:', fullCode);

            // Use srcdoc to set the iframe content
            output.srcdoc = fullCode;

            // Update status
            status.classList.remove('hidden');
            status.classList.remove('error');
            status.textContent = 'Code executed successfully!';
        } catch (error) {
            console.error('Error updating output:', error);
            status.classList.remove('hidden');
            status.classList.add('error');
            status.textContent = 'Error: Failed to execute code. Check the console for details.';
        }
    }

    // Run the code when the button is clicked
    runBtn.addEventListener('click', updateOutput);

    // Auto-update on input (live preview)
    htmlInput.addEventListener('input', updateOutput);
    cssInput.addEventListener('input', updateOutput);
    jsInput.addEventListener('input', updateOutput);

    // Initialize with a simpler default example
    htmlInput.value = `<h1>Hello, World!</h1>`;
    cssInput.value = `h1 { color: blue; text-align: center; font-family: Arial, sans-serif; }`;
    jsInput.value = `document.querySelector('h1').addEventListener('click', () => {
        alert('Hello from JavaScript!');
    });`;
    updateOutput();
});