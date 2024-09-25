document.getElementById('upload-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('image-input');
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    try {
        const response = await fetch('http://localhost:3000/get-text', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById('result').innerHTML = `<h4>Extracted Text:</h4><p>${data.text}</p>`;
        } else {
            document.getElementById('result').innerHTML = `<p>Error: ${data.message}</p>`;
        }
    } catch (error) {
        document.getElementById('result').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
