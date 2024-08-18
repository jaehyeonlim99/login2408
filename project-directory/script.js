document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // 폼 제출 방지

    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('로그인 성공! 환영합니다.');
            window.location.href = 'dashboard.html';  // 로그인 성공 후 대시보드로 리다이렉션
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                document.getElementById('errorMessage').textContent = '비밀번호가 잘못되었습니다.';
            } else if (errorCode === 'auth/user-not-found') {
                document.getElementById('errorMessage').textContent = '해당 이메일을 가진 사용자가 없습니다.';
            } else {
                document.getElementById('errorMessage').textContent = `로그인 실패: ${errorMessage}`;
            }
            document.getElementById('errorMessage').style.display = 'block';
        });
});
