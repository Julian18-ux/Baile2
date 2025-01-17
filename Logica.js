// Tu configuración de Firebase sigue igual
const firebaseConfig = {
    apiKey: "AIzaSyAVBpWzSFS6eWFOnWcJmv1wg_QsZau09hw",
    authDomain: "registro-d8148.firebaseapp.com",
    databaseURL: "https://registro-d8148-default-rtdb.firebaseio.com",
    projectId: "registro-d8148",
    storageBucket: "registro-d8148.firebasestorage.app",
    messagingSenderId: "492882689895",
    appId: "1:492882689895:web:5cb7c39a499abd03e679c2",
    measurementId: "G-76R468FKCJ"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Función para registrar en la base de datos
const registerUser = (username, email, gender, age, experience) => {
  // Validación
  if (!username || !email || !age) {
    alert("Por favor completa todos los campos obligatorios.");
    return;
  }

  // Validar correo electrónico
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    alert("Por favor ingresa un correo electrónico válido.");
    return;
  }

  // Validar edad (debe ser un número mayor que 0)
  if (age <= 0 || isNaN(age)) {
    alert("Por favor ingresa una edad válida.");
    return;
  }

  const userRef = firebase.database().ref('usuarios').push(); // Usa 'push' para un ID único.
  userRef.set({
    username: username,
    email: email,
    gender: gender,
    age: age,
    experience: experience || "Ninguna"
  })
  .then(() => {
    alert('¡Registro exitoso!');
    document.getElementById("registerForm").reset();
    hideForm();
    loadUsers();
  })
  .catch((error) => {
    console.error("Error al registrar usuario: ", error);
  });
};



// Mostrar la lista de usuarios al hacer clic en el botón "Ver Registrados"
document.getElementById('showUsersBtn').addEventListener('click', () => {
    loadUsers();
    document.getElementById('showUsersBtn2')
    .style.display='block';
    
    
      document.getElementById('showUsersBtn')
    .style.display='none';
    
    document.getElementById('registerForm').style.display = 'none'; // Ocultar formulario
    document.getElementById('usersList').style.display = 'block';  // Mostrar lista
});

/*cerrar lista*/



document.getElementById('showUsersBtn2').addEventListener('click', () => {
    loadUsers();
    
    
    document.getElementById('showUsersBtn2')
    .style.display='none';
    
    document.getElementById('showUsersBtn')
    .style.display='block';
    
    
    
    document.getElementById('registerForm').style.display = 'block'; 
    document.getElementById('usersList').style.display = 'none';  // Mostrar lista
});








// Función para mostrar y ocultar el formulario
const hideForm = () => {
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('usersList').style.display = 'block';
};

// Función para cargar usuarios registrados
const loadUsers = () => {
  const usersList = document.getElementById('usersList');
  usersList.innerHTML = ''; // Limpiar la lista antes de cargar los nuevos datos

  firebase.database().ref('usuarios').once('value').then(snapshot => {
    snapshot.forEach(childSnapshot => {
      const user = childSnapshot.val();
      const userItem = document.createElement('div');
      userItem.innerHTML = ` <div class="foro"
        <strong>${user.username}</strong><br>
        <span>Email: ${user.email}</span><br>
        <span>Género de Baile: ${user.gender}</span><br>
        <span>Edad: ${user.age}</span><br>
        <span>Experiencia: ${user.experience}</span></div><br><br>
      `;
      usersList.appendChild(userItem);
    });
  });
};

// Función al enviar el formulario
document.getElementById('registerForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const gender = document.getElementById('gender').value;
  const age = document.getElementById('age').value;
  const experience = document.getElementById('experience').value;

  // Llamar a la función de registro
  registerUser(username, email, gender, age, experience);
});

// Cargar los usuarios al inicio
window.onload = function() {
  loadUsers();
}
