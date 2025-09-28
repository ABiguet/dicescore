document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[name]');
    inputs.forEach(input => {
        console.log(input.name, input.value);
    });
})