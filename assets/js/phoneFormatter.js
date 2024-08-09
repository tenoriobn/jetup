// Função para formatar o telefone
function formatPhoneNumber(inputElement) {
  let value = inputElement.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

  inputElement.value = value
    .replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')  // Formato: (11) 98765-4321
    .replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')   // Formato: (11) 9876-5432
    .replace(/^(\d{2})(\d{2,5})(\d{0,4})$/, '($1) $2-$3'); // Formato: (11) 98-7654
}

// Adiciona o formatador de telefone ao input
document.addEventListener('DOMContentLoaded', () => {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  phoneInputs.forEach(input => {
    input.addEventListener('input', () => formatPhoneNumber(input));
  });
});
