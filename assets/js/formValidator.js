// Função de validação para cada input
function validateInput(inputElement, validationRule) {
  const isValid = validationRule.check(inputElement.value.trim());
  const errorMessageElement = inputElement.nextElementSibling;

  inputElement.classList.toggle('error-border', !isValid);
  errorMessageElement.textContent = isValid ? '' : validationRule.message;
  errorMessageElement.style.display = isValid ? 'none' : 'block';

  return isValid;
}

// Regras de validação específicas para cada tipo de input com mensagens de erro
const inputValidationRules = {
  text: {
    check: value => value.length >= 5,
    message: 'O nome deve ter pelo menos 5 caracteres.'
  },
  email: {
    check: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Por favor, insira um email válido.'
  },
  tel: {
    check: value => /^\(\d{2}\) \d{4,5}-\d{4}$/.test(value),
    message: 'Por favor, insira um telefone válido.'
  }
};

// Aplicar validação ao desfocar de um input
document.querySelectorAll('.input-field').forEach(inputElement => {
  inputElement.addEventListener('blur', () => 
    validateInput(inputElement, inputValidationRules[inputElement.type])
  );
});

// Validação ao enviar o formulário
document.querySelector('.registration-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const isFormValid = Array.from(document.querySelectorAll('.input-field')).every(inputElement => 
    validateInput(inputElement, inputValidationRules[inputElement.type])
  );

  if (isFormValid) {
    transitionContainers();
  }
});



// Função para realizar a transição entre dois containers
function transitionContainers() {
  const registrationContainer = document.querySelector('.registration-container');
  const successContainer = document.querySelector('.success-container');

  // Definir o estilo inicial dos containers
  registrationContainer.style.transition = 'opacity .3s ease-in-out';
  successContainer.style.transition = 'opacity .3s ease-in-out';

  // Iniciar a transição para tornar o container de registro invisível
  registrationContainer.style.opacity = '0';

  // Usar setTimeout para aguardar a transição e alterar o display
  setTimeout(() => {
    registrationContainer.style.display = 'none';
    successContainer.style.display = 'flex';
    successContainer.style.opacity = '0'; // Inicialmente invisível

    // Iniciar a transição para tornar o container de sucesso visível
    setTimeout(() => {
      successContainer.style.transition = 'opacity .4s ease-in-out';
      successContainer.style.opacity = '1';
    }, 50); // Pequeno atraso para garantir que o display seja aplicado antes da transição de opacidade
  }, 300); // Tempo de transição do container de registro
}
