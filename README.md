# APIDEGAMES
Esta API é utilizado para criação, atualização, consulta, deleção, de informações sobre games
## Endpoints
### GET /games
Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados.
#### Parametros
Nenhum
#### Respostas
##### OK! 200
Caso essa resposta aconteça você vai recebar a listagem de todos os games.

Exemplo de resposta:
```

      {
            id: 23,
            title: "Call of Duty",
            year: 2010,
            price: 50
        },
        {
            id: 17,
            title: "GTA V",
            year: 2013,
            price: 200
        },
        {
            id: 5,
            title: "GOD OF WAR",
            year: 2004,
            price: 10
        }
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado.

Exemplo de resposta:
```
{
    "err": "Token inválido!"
}
```

### POST /auth
Esse endpoint é responsável por retornar fazer o processo de login.
#### Parametros
email: E-mail do usuário cadastrado no sistema.

password: Senha do usuário cadastrado no sistema, com aquele determinado e-mail.

Exemplo:
```
{
	"email": "paulo@teste.com",
	"password": "123456"
}
```
#### Respostas
##### OK! 200
Caso essa resposta aconteça você vai receber o token JWT para conseguir acessar endpoints protegidos na API.

Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ2aWN0b3JkZXZ0YkBndWlhZG9wcm9ncmFtYWRvci5jb20iLCJpYXQiOjE1OTE3ODI0NzUsImV4cCI6MTU5MTk1NTI3NX0.y8kp3BxKgC86KFiq6-tAABukR6vi1guTPeRQhO8IdwU"
}
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Senha ou e-mail incorretos.

Exemplo de resposta:
```
{err: "Senha inválida"}
```
