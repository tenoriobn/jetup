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
    const formData = getFormData();
    sendToActiveCampaign(formData);
  }
});

// Função para capturar os valores do formulário
function getFormData() {
  const name = document.querySelector('input[type="text"]').value.trim();
  const email = document.querySelector('input[type="email"]').value.trim();
  const phone = document.querySelector('input[type="tel"]').value.trim();

  return { name, email, phone };
}

// Função para enviar os dados para o Active Campaign
function sendToActiveCampaign(data) {
  console.log('sendToActiveCampaign data:', data)
  console.log('sendToActiveCampaign infos:', data.name, data.email, data.phone)
  transitionContainers();

  // fetch('https://jetup86367.api-us1.com/api/3/contacts', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Api-Token': 'd7bc737431c35801b87fc382d513d4945a1a6927a80b13ba4a3a67c4feffa66aaf7a9bbb'
  //   },
  //   body: JSON.stringify({
  //     contact: {
  //       firstName: data.name,
  //       email: data.email,
  //       phone: data.phone
  //     }
  //   })
  // })
  // .then(response => {
  //   if (!response.ok) {
  //     throw new Error('Erro na resposta do servidor');
  //   }
  //   return response.json();
  // })
  // .then(data => {
  //   console.log('Success:', data);
  //   transitionContainers();
  // })
  // .catch(error => {
  //   console.error('Error:', error);
  // });
}

// Função para realizar a transição os containers
function transitionContainers() {
  const registrationContainer = document.querySelector('.registration-container');
  const successContainer = document.querySelector('.success-container');

  registrationContainer.style.transition = 'opacity .3s ease-in-out';
  successContainer.style.transition = 'opacity .3s ease-in-out';

  registrationContainer.style.opacity = '0';

  setTimeout(() => {
    registrationContainer.style.display = 'none';
    successContainer.style.display = 'flex';
    successContainer.style.opacity = '0';

    setTimeout(() => {
      successContainer.style.transition = 'opacity .4s ease-in-out';
      successContainer.style.opacity = '1';
    }, 50);
  }, 300);
}
