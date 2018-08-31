# bate-papo-firebase

Bate papo construído no minicurso de Angular 6 usando Firebase Firestore.

Projeto desenvolvido durante a semana acadêmica de Engenharia de Software da UTFPF Dois Vizinhos.


# Instalação
Crie um projeto no Firebase, e inicialize o Database Firestore em firebase.google.com
Copie as credenciais de acesso fornecidas em environmnets/environment.ts, da seguinte forma:

```
export const environment = {
  production: false,
  firebase: {
    apiKey: "<api_key>",
    authDomain: "<auth_domain>",
    databaseURL: "<database_url>",
    projectId: "<project_id>",
    storageBucket: "<storage_bucket>",
    messagingSenderId: "<messaging_sender_id>"
  }
};
```

Após configurado o Firebase, rode os seguintes comandos para instalar as dependências e executar o projeto localmente:

```
npm install
ng serve
```
