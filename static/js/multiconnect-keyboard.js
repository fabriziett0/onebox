document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('aziendaForm');
    const inputs = form.querySelectorAll('input, select, textarea');

    form.addEventListener('keydown', (e) => {
        let idx = Array.prototype.indexOf.call(inputs, e.target);
        const moveFocus = (step) => {
            e.preventDefault();
            idx = (idx + step + inputs.length) % inputs.length;
            inputs[idx].focus();
        };

        switch (e.key) {
            case 'ArrowDown':
            case 'ArrowRight':
                moveFocus(1);
                break;
            case 'ArrowUp':
            case 'ArrowLeft':
                moveFocus(-1);
                break;
            case 'Enter':
                if (!e.ctrlKey) {
                    moveFocus(1);
                }
                break;
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            form.submit();
        }
    });
});