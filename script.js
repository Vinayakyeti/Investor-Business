import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { collection, addDoc, doc, setDoc, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

let currentUser = null;
let currentUserType = 'investor';
let isLoginMode = false;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        const userDoc = await getDocs(query(collection(db, 'users')));
        userDoc.forEach((doc) => {
            if (doc.id === user.uid) {
                const userData = doc.data();
                currentUserType = userData.userType;
                updateUIForLoggedInUser({ name: userData.name, email: user.email, userType: userData.userType });
            }
        });
    } else {
        currentUser = null;
        updateUIForLoggedOutUser();
    }
});

function showHome() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('homePage').classList.add('active');
}

function showAuth(type = 'investor') {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('authPage').classList.add('active');
    setUserType(type);
}

function showDashboard() {
    if (!currentUser) {
        alert('Please login first');
        showAuth();
        return;
    }
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('dashboardPage').classList.add('active');
    loadPosts();
}

function setUserType(type) {
    currentUserType = type;
    document.getElementById('investorBtn').classList.toggle('active', type === 'investor');
    document.getElementById('businessBtn').classList.toggle('active', type === 'business');
}

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    const nameInput = document.getElementById('name');
    const submitBtn = document.querySelector('#authForm button');
    const toggleText = document.querySelector('.toggle-text');
    
    if (isLoginMode) {
        nameInput.style.display = 'none';
        nameInput.required = false;
        submitBtn.textContent = 'Login';
        toggleText.innerHTML = "Don't have an account? <span onclick='toggleAuthMode()'>Register here</span>";
    } else {
        nameInput.style.display = 'block';
        nameInput.required = true;
        submitBtn.textContent = 'Create Account';
        toggleText.innerHTML = "Already have an account? <span onclick='toggleAuthMode()'>Login here</span>";
    }
}

document.getElementById('authForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value.trim();

    if (!email || !password) {
        alert('Please fill all required fields');
        return;
    }

    try {
        if (isLoginMode) {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in successfully');
            showDashboard();
        } else {
            if (!name) {
                alert('Please enter your name');
                return;
            }
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                name: name,
                email: email,
                userType: currentUserType,
                createdAt: Date.now()
            });
            console.log('User registered successfully');
            showDashboard();
        }
        document.getElementById('authForm').reset();
    } catch (error) {
        console.error('Auth error:', error);
        alert(error.message);
    }
});

document.getElementById('createPostForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
        alert('Please login first');
        return;
    }

    const title = document.getElementById('postTitle').value.trim();
    const description = document.getElementById('postDescription').value.trim();
    const budget = document.getElementById('postBudget').value.trim();
    const contact = document.getElementById('postContact').value.trim();

    if (!title || !description || !budget || !contact) {
        alert('Please fill all fields');
        return;
    }

    try {
        const userDoc = await getDocs(query(collection(db, 'users')));
        let userName = currentUser.email;
        userDoc.forEach((doc) => {
            if (doc.id === currentUser.uid) {
                userName = doc.data().name;
            }
        });

        await addDoc(collection(db, 'posts'), {
            title: title,
            description: description,
            budget: budget,
            contact: contact,
            authorId: currentUser.uid,
            authorName: userName,
            userType: currentUserType,
            createdAt: Date.now()
        });

        console.log('Post created successfully');
        document.getElementById('createPostForm').reset();
        loadPosts();
    } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to create post');
    }
});

async function loadPosts() {
    try {
        const postsContainer = document.getElementById('postsContainer');
        postsContainer.innerHTML = '<p style="text-align:center;color:#7f8c8d;">Loading posts...</p>';

        const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(postsQuery);
        
        postsContainer.innerHTML = '';

        if (querySnapshot.empty) {
            postsContainer.innerHTML = '<p style="text-align:center;color:#7f8c8d;">No posts yet. Be the first to post!</p>';
            return;
        }

        querySnapshot.forEach((doc) => {
            const post = doc.data();
            const postCard = document.createElement('div');
            postCard.className = 'post-card';
            postCard.innerHTML = `
                <span class="post-type type-${post.userType}">${post.userType === 'investor' ? 'Investor' : 'Business'}</span>
                <h4>${post.title}</h4>
                <p>${post.description}</p>
                <p><strong>Budget/Investment:</strong> ${post.budget}</p>
                <p><strong>Contact:</strong> ${post.contact}</p>
                <div class="post-meta">
                    Posted by ${post.authorName} on ${new Date(post.createdAt).toLocaleDateString()}
                </div>
            `;
            postsContainer.appendChild(postCard);
        });
    } catch (error) {
        console.error('Error loading posts:', error);
        document.getElementById('postsContainer').innerHTML = 
            '<p style="text-align:center;color:#e74c3c;">Failed to load posts. Please check your Firebase configuration.</p>';
    }
}

function updateUIForLoggedInUser(userData) {
    document.getElementById('authLink').style.display = 'none';
    document.getElementById('dashLink').style.display = 'inline';
    document.getElementById('logoutLink').style.display = 'inline';

    const userInfo = document.getElementById('userInfo');
    userInfo.innerHTML = `
        <h3>Welcome, ${userData.name}!</h3>
        <p>Account Type: <strong>${userData.userType === 'investor' ? 'Investor' : 'Business Person'}</strong></p>
        <p>Email: ${userData.email}</p>
    `;

    const formTitle = document.getElementById('formTitle');
    const postsTitle = document.getElementById('postsTitle');
    
    if (userData.userType === 'investor') {
        formTitle.textContent = 'Post Investment Opportunity';
        postsTitle.textContent = 'Business Proposals';
    } else {
        formTitle.textContent = 'Post Business Idea';
        postsTitle.textContent = 'Investment Opportunities & Business Ideas';
    }
}

function updateUIForLoggedOutUser() {
    document.getElementById('authLink').style.display = 'inline';
    document.getElementById('dashLink').style.display = 'none';
    document.getElementById('logoutLink').style.display = 'none';
    showHome();
}

function logout() {
    signOut(auth).then(() => {
        console.log('User logged out');
        currentUser = null;
        showHome();
    }).catch((error) => {
        console.error('Logout error:', error);
    });
}

window.showHome = showHome;
window.showAuth = showAuth;
window.showDashboard = showDashboard;
window.setUserType = setUserType;
window.toggleAuthMode = toggleAuthMode;
window.logout = logout;

console.log('App initialized');
