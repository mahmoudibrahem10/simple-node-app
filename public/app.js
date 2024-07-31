fetch('/time')
  .then(response => response.json())
  .then(data => {
    document.getElementById('current-time').innerText = new Date(data.currentTime).toLocaleString();
  });

fetch('/users')
  .then(response => response.json())
  .then(users => {
    const userList = document.getElementById('user-list');
    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${user.id}</td><td>${user.name}</td><td>${user.email}</td>`;
      userList.appendChild(row);
    });
  });
