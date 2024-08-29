document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const responseMessage = document.getElementById('responseMessage');

    try {
        const response = await fetch('/submit-form', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        responseMessage.innerText = result.message;
    } catch (error) {
        responseMessage.innerText = 'There was an error submitting the form.';
    }
});
