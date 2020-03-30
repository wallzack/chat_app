'use strict';
{
  const socket = io();
  socket.on('message', ({ author, content }) => addMessage(author, content));
  socket.on('newUser', (user) => addMessage('Chat Bot', user + ' has joined the conversation!'));
  socket.on('removeUser', (user) => addMessage('Chat bot', user + ' has left the conversation... :('));


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
      socket.emit('join', userName);
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
  
    let messageContent = messageContentInput.value;
  
    if(!messageContent.length) {
      alert('You have to type something!');
    }
    else {
      addMessage(userName, messageContent);
      socket.emit('message', { author: userName, content: messageContent })
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