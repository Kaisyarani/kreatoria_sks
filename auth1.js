document.addEventListener('DOMContentLoaded', () => {

    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    // =================================================================
    // LOGIKA UNTUK HALAMAN PENDAFTARAN (signup.html)
    // =================================================================
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const users = JSON.parse(localStorage.getItem('kreatoria_users')) || [];
            
            const accountType = document.querySelector('input[name="accountType"]:checked').value;
            const name = (accountType === 'user') ? document.getElementById('username').value : document.getElementById('companyName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Cek jika email sudah terdaftar
            if (users.some(user => user.email === email)) {
                alert('Email ini sudah terdaftar. Silakan gunakan email lain.');
                return;
            }

            // Buat objek user baru dengan menyertakan tipe akun
            const newUser = {
                name: name,
                email: email,
                password: password, // Di aplikasi nyata, password harus di-hash!
                accountType: accountType // 'user' atau 'company'
            };

            users.push(newUser);
            localStorage.setItem('kreatoria_users', JSON.stringify(users));

            alert('Pendaftaran berhasil! Anda akan diarahkan ke halaman login.');
            window.location.href = 'login.html'; // Arahkan ke halaman login setelah daftar
        });
    }

    // =================================================================
    // LOGIKA UNTUK HALAMAN LOGIN (login.html)
    // =================================================================
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const users = JSON.parse(localStorage.getItem('kreatoria_users')) || [];
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Cari user berdasarkan email dan password
            const foundUser = users.find(user => user.email === email && user.password === password);

            if (foundUser) {
                // Jika user ditemukan, simpan status login dan informasi user
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('current_user_name', foundUser.name);
                localStorage.setItem('current_user_email', foundUser.email);
                
                // === INI BAGIAN PENTING UNTUK REDIRECT ===
                // Cek tipe akun dan arahkan ke halaman yang sesuai
                if (foundUser.accountType === 'user') {
                    alert('Login sebagai Kreator berhasil!');
                    window.location.href = 'index1.html'; // Ganti dengan halaman untuk KREATOR
                } else if (foundUser.accountType === 'company') {
                    alert('Login sebagai Perusahaan berhasil!');
                    window.location.href = 'index2.html'; // Ganti dengan halaman untuk PERUSAHAAN
                } else {
                    // Fallback jika tipe akun tidak ada (seharusnya tidak terjadi)
                    window.location.href = 'index1.html';
                }

            } else {
                alert('Email atau password salah. Silakan coba lagi.');
            }
        });
    }
});