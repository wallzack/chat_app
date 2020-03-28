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

  function addMessage(author, content) {
    const message = document.createElement('li');

    const heading = document.createElement('h3');
    heading.classList.add('message__author');
    if (author === userName) {
      heading.innerHTML = 'You'
    } else {
      heading.innerHTML = author;
    }

    const div = document.createElement('div');
    div.classList.add('message__content');
    div.innerHTML = content;

    message.classList.add('message', 'message--received');
    if (author === userName) {
      message.classList.add('message--self');
    }

    message.appendChild(heading);
    message.appendChild(div);

    messagesList.appendChild(message);

  }

  function sendMessage(e) {
    e.preventDefault();

    if (!messageContentInput.value) {
      alert('You can\'t send empty message');
      return;
    } else {
      addMessage(userName, messageContentInput.value);
      messageContentInput.value = '';
    }
  }

  loginForm.addEventListener('submit', e => {
    login(e);
  });

  addMessageForm.addEventListener('submit', e => {
    sendMessage(e);
  })

}