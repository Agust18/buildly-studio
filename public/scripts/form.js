const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita que la página se recargue

  const button = form.querySelector('.btn-submit');
  const formData = new FormData(form);
  
  // Cambiamos el estado del botón para feedback visual
  button.disabled = true;
  button.innerText = 'Enviando...';

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // Éxito con SweetAlert2
      Swal.fire({
        title: '¡Mensaje enviado!',
        text: 'Gracias por contactar a Buildly.Studio. Te responderé a la brevedad.',
        icon: 'success',
        confirmButtonColor: '#00d1b2', // Usá el color de tu marca
      });
      form.reset(); // Limpia el formulario
    } else {
      throw new Error();
    }
  } catch (error) {
    // Error
    Swal.fire({
      title: 'Ups...',
      text: 'Hubo un problema al enviar tu mensaje. Por favor, intentá de nuevo.',
      icon: 'error'
    });
  } finally {
    // Restauramos el botón
    button.disabled = false;
    button.innerText = 'Solicitar presupuesto →';
  }
});