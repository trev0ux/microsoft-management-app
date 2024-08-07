## Estudo de testes com o Jest construindo uma aplicação semelhante ao Microsoft Management App.

Apliquei uma série de padrões e metodologias na arquitetura do projeto para garantir um produto escalável e de fácil manutenibilidade focado na experiência dos usuários e também dos desenvolvedores.


### Tecnologias e metodologias utilizadas:

#### Linguagens e estilização
 - HTML
 - SCSS
 - Bootstrap 5
 - Metodologia BEM

#### Desenvolvimento e frameworks
 - JavaScript
 - Vue3
 - Vue CLI
   
#### Arquitetura de componentes
 - Atomic Design

#### Testes e gerenciamento de estado
 - Jest
 - Vuex

### Arquitetura do projeto

#### Prévia da estrutura de diretórios

```
project   
│
└───assets
│   │   globals.scss
│   │
│   └───base
│       │   _typography.scss
│       │   _variables.scss
│   
└───src
│   │
│   └───components
│   │
│   └───molecules
│       │
│       └───project-item
│       │   project-item.vue
│       │   project-item.scss
│   │
│   └───organisms
└───store
│   │   index.js
│   └───modules
│       │   task-module.js
└───tests
│   │   
│   └───unit
│       │   TaskBoard.spec.js
└───pages
│   │   
│   └───products-view
│       │   products-view.vue
│       │   products-view.scss
```
    
# Como rodar o projeto?

## Instalar dependências do projeto
```
npm install
```

### Compilar para desenvolvimento
```
npm run serve
```

### Compilar e minificar para produção
```
npm run build
```

### Rodar o eslint
```
npm run lint
```

## Executar os testes unitários
```
 npm run test:unit
```

# Diagrama de Classes

Foi extremamente útil para que eu possa entender as hierarquias e dependência de cada classe em relação a outra, já que cada uma era aninhada a outra.

[Draw.io](https://drive.google.com/file/d/1p5FEGdQH1GqopFI_0uygvq2Ir5dNJsZ4/view?usp=sharing)

![Diagrama de Classes](https://github.com/trev0ux/microsoft-management-app/assets/47607723/f4c18100-5af9-4490-b0e4-5ca1f358b5ef)

## Protótipo

Para ter uma visão mais aprofundada precisei construir um protótipo no Figma, o que me ajudou a deixar a tela mais estruturada
[Figma](https://www.figma.com/design/B41Wmh46yNWjIjKySM0iKF/CP-Group?node-id=0-1&t=3ymG8A9U8pMYxkb9-1)

![image](https://github.com/trev0ux/microsoft-management-app/assets/47607723/ba351290-c4d2-465f-aff5-d88b23abc1fe)

## Requisitos funcionais

### Clientes

1. Tela de consulta de clientes

![image](https://github.com/trev0ux/microsoft-management-app/assets/47607723/72fa1cef-5e2c-4553-aff8-69d50642d0d6)

3. Modal para adicionar cliente

![image](https://github.com/trev0ux/microsoft-management-app/assets/47607723/f5cf8e8a-5a3f-4978-b8e7-50808e1ea865)

### Projetos

1. Tela para consulta de projetos

1.1 O Status do projeto será alterado com base no andamento das tarefas, se todas as tarefas forem concluídas o projeto será concluído, se houver uma em andamento, estará em andamento e caso esteja para fazer o status refletirá como para fazer.
   
![image](https://github.com/trev0ux/microsoft-management-app/assets/47607723/036aa82d-05fe-4df0-b114-c8664084f92b)

2. Modal para adicionar projeto e relacionar a cliente
   
![image](https://github.com/trev0ux/microsoft-management-app/assets/47607723/5cf20c00-5327-49f5-ba4f-0b9a6cc39377)

### Atividades

1. Tela para o board de atividades

1.1 Você poderá movimentar as atividades quando alterar o status de cada uma delas
   
![image](https://github.com/trev0ux/microsoft-management-app/assets/47607723/a94a7a98-c86c-42f8-8d42-5e570205370c)

2. Modal para adicionar tarefas
   
![image](https://github.com/trev0ux/microsoft-management-app/assets/47607723/11b3bf76-4cd1-4447-b416-20ca9c2d7e58)


## Resultado dos testes unitários

![image](https://github.com/trev0ux/microsoft-management-app/assets/47607723/85d6d150-5024-46b8-a123-be3c778cc830)

## Estrutura dos dados em data.json

![ray-so-export (3)](https://github.com/trev0ux/microsoft-management-app/assets/47607723/07a4e222-c98d-40a9-bfd9-e8b459efaa81)

## Pontos de melhorias
- Ajustar selects quando não houver valores selecionados
- Inserir datas nas atividades
- Melhorar arquitetura de diretórios com o atomic design para tornar a estrutura ainda mais escalável

## Tomadas de decisão
- Optei por usar um service para o modal com foco em facilitar a atualização e consulta de informações quando precisar passar algum dado pré-definido
- Garanti que o código todo fosse em inglês para facilitar e garantir a internacionalização, já que é para a Microsoft
- Busquei adaptar da forma mais eficiente o atomic design devido que é um projeto facilmente escalável
