const form = document.getElementById('email-form');
const result = document.querySelector('.message');

form.addEventListener('submit', function(e) {
e.preventDefault();
const formData = new FormData(form);
const object = Object.fromEntries(formData);
const json = JSON.stringify(object);
const resolveMessage = document.querySelector('.w-form-done');
const rejectedMessage = document.querySelector('.w-form-fail');

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML =resolveMessage.innerText;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = rejectedMessage.innerText;
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});