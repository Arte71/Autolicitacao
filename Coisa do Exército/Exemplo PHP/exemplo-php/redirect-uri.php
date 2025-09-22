<?php
    session_start();

    if (isset($_SESSION['code_verifier'])) {
        $codeVerifier = $_SESSION['code_verifier'];
        // Use o $codeVerifier na requisição para o endpoint /token
    } else {
        echo "<p>Erro: Code Verifier não encontrado na sessão.</p>";
    }
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
    <h1>Página de retorno  em PHP</h1>
    <button 
        onclick="window.location.href='https://sso.staging.acesso.gov.br/logout?post_logout_redirect_uri=http://localhost:8080/logout.php'"
    >
        Sair (Logout)
    </button>
<?php
    if (isset($_GET['code'])) {
        $code = $_GET['code'];
        // URL do endpoint de token
        $tokenUrl = "https://sso.staging.acesso.gov.br/token";

        // Dados para o POST
        $postData = [
            'grant_type' => 'authorization_code',
            'code' => $code,
            'redirect_uri' => 'http://localhost:8080/redirect-uri.php',
            'client_id' => 'aplicacao-exemplo-php',
            'code_verifier' => $codeVerifier,
            'client_secret' => 'SECRET_RECEBIDO_POR_EMAIL',
        ];

        // Inicializa o cURL
        $ch = curl_init();

        // Configurações do cURL
        curl_setopt($ch, CURLOPT_URL, $tokenUrl);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Executa a requisição
        $response = curl_exec($ch);

        // Verifica erros
        if (curl_errno($ch)) {
            echo "<p>Erro na requisição: " . curl_error($ch) . "</p>";
        } else {
            // Decodifica a resposta JSON
            $responseData = json_decode($response, true);
            echo "<p>Resposta do servidor:</p>";
            echo "<pre>" . htmlspecialchars(print_r($responseData, true)) . "</pre>";
            

            // Verifica se o access_token foi recebido
            if (isset($responseData['id_token'])) {
                $idToken = $responseData['id_token'];
                $idTokenParts = explode('.', $idToken);
                if (count($idTokenParts) === 3) {
                    $payload = base64_decode($idTokenParts[1]);
                    $payloadData = json_decode($payload, true);

                    if (isset($payloadData['picture'])) {
                        $pictureUrl = $payloadData['picture'];
                        $accessToken = $responseData['access_token'];
                        $ch = curl_init();
                        curl_setopt($ch, CURLOPT_URL, $pictureUrl);
                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                        curl_setopt($ch, CURLOPT_HTTPHEADER, [
                            "Authorization: Bearer $accessToken"
                        ]);
                    
                        $pictureResponse = curl_exec($ch);
                    
                        if (curl_errno($ch)) {
                            echo "<p>Erro ao obter a foto: " . curl_error($ch) . "</p>";
                        } else {
                            // Exibe a foto
                            $base64Image = base64_encode($pictureResponse);
                            echo "<p>Foto:</p>";
                            echo "<img style='height: 60px;' src='data:image/jpeg;base64,$base64Image' alt='Foto do usuário' />";
                        }
                    
                        curl_close($ch);
                    }
                    // Acessa atributos específicos
                    if (isset($payloadData['name'])) {
                        echo "<p>Dados da pessoa logada vindos do ID Token: </p>";
                        echo "<p>CPF: " . htmlspecialchars($payloadData['sub']) . "</p>";
                        echo "<p>Nome: " . htmlspecialchars($payloadData['name']) . "</p>";
                        echo "<p>E-Mail: " . htmlspecialchars($payloadData['email']) . "</p>";
                    }
                }
            }

            // Verifica se o access_token foi recebido
            if (isset($responseData['access_token'])) {
                $accessToken = $responseData['access_token'];
                $tokenParts = explode('.', $accessToken);
                if (count($tokenParts) === 3) {
                    $payload = base64_decode($tokenParts[1]);
                    $payloadData = json_decode($payload, true);
            
                    // Acessa atributos específicos
                    if (isset($payloadData['sub'])) {

                        $apiUrl = "https://api.staging.acesso.gov.br/confiabilidades/v3/contas/" . $payloadData['sub'] . "/niveis?response-type=ids" ;
                        $ch = curl_init();
                        curl_setopt($ch, CURLOPT_URL, $apiUrl);
                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                        curl_setopt($ch, CURLOPT_HTTPHEADER, [
                            "Authorization: Bearer $accessToken"
                        ]);
        
                        // Executa a requisição GET
                        $apiResponse = curl_exec($ch);
        
                        if (curl_errno($ch)) {
                            echo "<p>Erro na requisição à API: " . curl_error($ch) . "</p>";
                        } else {
                            $apiData = json_decode($apiResponse, true);
                            echo "<p>Níveis de confiabilidade: (3 - ouro, 2 - prata, 1 - bronze):</p>";
                            echo "<pre>" . htmlspecialchars(print_r($apiData, true)) . "</pre>";
                        }
        
                        // Fecha o cURL
                        curl_close($ch);


                    }
                    
                } else {
                    echo "<p>O Access Token não é um JWT válido.</p>";
                }
            } else {
                echo "<p>Access Token não foi recebido.</p>";
            }
        }

        // Fecha o cURL
        curl_close($ch);
    } else {
        echo "<p>Nenhum código foi recebido.</p>";
    }
?>
</body>


