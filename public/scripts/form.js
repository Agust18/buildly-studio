document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    // Verificamos que el formulario exista en la página actual para no tirar error
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Verificación de seguridad: si por algún motivo la librería no cargó
        if (typeof Swal === 'undefined') {
            console.error("SweetAlert2 no está cargado.");
            alert("Error al cargar las alertas. Por favor, recargá la página.");
            return;
        }

        const button = form.querySelector('.btn-submit');
        const formData = new FormData(form);

        // --- VALIDACIONES MANUALES ---
        // Usamos ?. para evitar errores si el campo no existe
        const nombre = formData.get('nombre')?.trim() || "";
        const email = formData.get('email')?.trim() || "";
        const servicio = formData.get('servicio');
        const mensaje = formData.get('message')?.trim() || "";

        // 1. Validar campos vacíos
        if (!nombre || !email || !mensaje) {
            Swal.fire({
                title: 'Campos incompletos',
                text: 'Por favor, completá todos los campos obligatorios.',
                icon: 'warning',
                confirmButtonColor: '#00d1b2'
            });
            return;
        }

        // 2. Validar servicio
        if (!servicio) {
            Swal.fire({
                title: 'Falta el servicio',
                text: 'Por favor, seleccioná un servicio de interés para poder asesorarte.',
                icon: 'warning',
                confirmButtonColor: '#00d1b2'
            });
            return;
        }

        // 3. Validar formato de Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                title: 'Email inválido',
                text: 'Por favor, ingresá un correo electrónico verídico.',
                icon: 'error',
                confirmButtonColor: '#00d1b2'
            });
            return;
        }

        // 4. Validar longitud mínima
        if (mensaje.length < 10) {
            Swal.fire({
                title: 'Mensaje muy corto',
                text: 'Contame un poquito más sobre tu proyecto para darte una mejor propuesta.',
                icon: 'info',
                confirmButtonColor: '#00d1b2'
            });
            return;
        }

        // --- ENVÍO ---
        button.disabled = true;
        button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                Swal.fire({
                    title: '¡Mensaje enviado!',
                    text: 'Gracias por contactar a Buildly.Studio. Te responderé a la brevedad.',
                    icon: 'success',
                    confirmButtonColor: '#00d1b2',
                });
                form.reset();
            } else {
                throw new Error();
            }
        } catch (error) {
            Swal.fire({
                title: 'Ups...',
                text: 'Hubo un problema. Intentá de nuevo o contactame por WhatsApp.',
                icon: 'error'
            });
        } finally {
            button.disabled = false;
            button.innerText = 'Solicitar presupuesto →';
        }
    });
});