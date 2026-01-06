## Instalação e Configuração

Siga os passos abaixo para preparar o ambiente:

1.  **Instale as dependências:**
    ```bash
    npm install
    ```

2.  **Crie o banco de dados (SQLite) e as tabelas:**
    ```bash
    npm run prisma:migrate
    ```

3.  **Popule o banco com dados de teste (Livro Físico e E-book):**
    ```bash
    npm run prisma:seed
    ```

## Execução

Para rodar a API em modo de desenvolvimento (reinicia ao salvar arquivos):

```bash
npm run dev
```

O servidor iniciará em `http://localhost:3000`.
*Nota: A primeira execução pode demorar alguns segundos para gerar as credenciais de teste do Ethereal Mail.*

## Como Testar

Utilize o **cURL** (terminal) ou ferramentas como **Postman/Insomnia** para enviar requisições POST.

### Compra de Livro Físico (Com Frete)
O sistema deve calcular R$ 10,00 de frete.

```bash
curl -X POST http://localhost:3000/orders \
-H "Content-Type: application/json" \
-d '{
  "customer": "abacaxi123@ethereal.email",
  "items": [{ "productId": 1, "quantity": 1 }],
  "paymentMethod": "credit_card",
  "paymentDetails": { "cardNumber": "1234567812345678", "cvv": "123" }
}'
```

---

### Discentes
PEDRO BONIFÁCIO BARBOSA
Matrícula: 202426610040

WALLISON VINICIUS SILVA DE OLANDA
Matrícula: 202226400001




