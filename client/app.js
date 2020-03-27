'use strict';
{
  const opts = {
    loginForm: '#welcome-form',
    messagesSection: '#messages-section',
    messagesList: '#messages-list',
    addMessageForm: '#add-messages-form',
    userNameInput: '#username',
    messageContentInput: '#message-content',
  };

  const loginForm = document.querySelector(opts.loginForm);
  const messagesSection = document.querySelector(opts.messagesSection);
  const messagesList = document.querySelector(opts.messagesList);
  const addMessageForm = document.querySelector(opts.addMessageForm);
  const userNameInput = document.querySelector(opts.userNameInput);
  const messageContentInput = document.querySelector(opts.messageContentInput);
  
  let userName = '';

  function login(e) {
    e.preventDefault();

    if (!userNameInput.value) {
      alert('Field cannot be empty');
      return;
    } else {
      userName = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
  }

  loginForm.addEventListener('submit', e => {
    login(e);
  });

}