// Função para adicionar um novo usuário
function addUser(name, email) {
    const user = { id: Date.now(), name, email };
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    updateList();
}

// Função para obter a lista de usuários do armazenamento local
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Função para atualizar a lista de usuários na interface
function updateList() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    const users = getUsers();
    users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${user.name}</strong> (${user.email})
                        <button onclick="editUser(${user.id})">Editar</button>
                        <button onclick="deleteUser(${user.id})">Excluir</button>`;
        userList.appendChild(li);
    });
}

// Função para editar um usuário
function editUser(userId) {
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
        const name = prompt('Novo nome:', user.name);
        const email = prompt('Novo email:', user.email);
        user.name = name;
        user.email = email;
        localStorage.setItem('users', JSON.stringify(users));
        updateList();
    }
}

// Função para excluir um usuário
function deleteUser(userId) {
    const users = getUsers().filter(user => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(users));
    updateList();
}

// Evento de envio do formulário
const userForm = document.getElementById('userForm');
userForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    addUser(name, email);
    userForm.reset();
});

// Inicializar a lista de usuários na carga da página
updateList();