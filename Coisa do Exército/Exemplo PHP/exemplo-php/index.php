<?php
    session_start();

    // Função para gerar o Code Verifier
    function generateCodeVerifier($length = 128) {
        $randomBytes = random_bytes($length);
        return rtrim(strtr(base64_encode($randomBytes), '+/', '-_'), '=');
    }

    // Função para gerar o Code Challenge
    function generateCodeChallenge($codeVerifier) {
        return rtrim(strtr(base64_encode(hash('sha256', $codeVerifier, true)), '+/', '-_'), '=');
    }

    // Gerar o Code Verifier e armazenar na sessão
    $codeVerifier = generateCodeVerifier();
    $_SESSION['code_verifier'] = $codeVerifier;

    // Gerar o Code Challenge
    $codeChallenge = generateCodeChallenge($codeVerifier);
?>
<html>
<head>
    <title>Exemplo de Integração com gov.br em PHP</title>
    <style>
        button {
            background-color: blue;
            color: white;
            border: none;
            border-radius: 25px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
        }

        button:hover {
            background-color: darkblue;
        }
    </style>
</head>
<body>
    <h1>Exemplo de Integração com gov.br em PHP</h1>
    <p>Clique abaixo para entrar com sua conta do gov.br</p>
    <button 
        onclick="window.location.href='https://sso.staging.acesso.gov.br/authorize?response_type=code&client_id=aplicacao-exemplo-php&scope=openid%20profile%20email%20phone%20govbr_confiabilidades&redirect_uri=http://localhost:8080/redirect-uri.php&state=ABCDEF&nonce=123456&code_challenge=<?php echo $codeChallenge; ?>&code_challenge_method=S256'"
    >
        Entrar com gov.br
    </button>
</body>