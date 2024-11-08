# Lottie File Downloader and Extractor

Este é um script em Node.js que acessa uma página do LottieFiles, encontra o primeiro elemento `<dotlottie-player>`, extrai o link do arquivo `.lottie` e pergunta se o usuário deseja fazer o download. Caso confirmado, o script baixa o arquivo `.lottie`, o trata como um arquivo ZIP, extrai o arquivo JSON contido na pasta `animations` e o salva no diretório atual.

## Funcionalidades
- Acessa uma página do LottieFiles e encontra o link do arquivo `.lottie`.
- Solicita confirmação do usuário para prosseguir com o download.
- Baixa o arquivo `.lottie` e o salva no diretório atual.
- Converte o arquivo `.lottie` para ZIP e extrai o arquivo JSON contido na pasta `animations`.
- Salva o arquivo JSON extraído no diretório atual.

## Pré-requisitos
- Node.js
- NPM (Node Package Manager)

## Instalação
1. Clone este repositório ou faça o download do código.
2. Navegue até o diretório do projeto.
3. Instale as dependências necessárias executando:

```bash
npm install puppeteer axios adm-zip
```

## Como usar
No terminal, execute o script passando a URL da página do LottieFiles como argumento:

```bash
node baixarEExtrairLottie.js <URL-da-página-do-LottieFiles>
```

### Exemplo:

```bash
node baixarEExtrairLottie.js https://lottiefiles.com/free-animation/sad-face-with-sweat-DtCktQoLl3
```

O script carregará a página, encontrará o primeiro `<dotlottie-player>`, e exibirá o link do arquivo `.lottie` encontrado.

O script perguntará se deseja prosseguir com o download. Digite `s` para confirmar ou `n` para cancelar.

Se confirmado, o arquivo `.lottie` será baixado e salvo no diretório atual.

O script converterá o arquivo `.lottie` para ZIP, extrairá o arquivo JSON da pasta `animations`, e salvará o JSON no diretório atual.

## Exemplo de Saída
```bash
URL do arquivo .lottie encontrado: https://assets-v2.lottiefiles.com/a/c2f170fe-1167-11ee-bf00-db71d87424a8/QNyTekY2aV.lottie
Deseja prosseguir com o download? (s/n): s
Arquivo 'QNyTekY2aV.lottie' salvo com sucesso.
Arquivo JSON 'animation.json' extraído e salvo com sucesso.
```

## Dependências
- **Puppeteer**: Para carregar a página com JavaScript.
- **Axios**: Para baixar o arquivo `.lottie`.
- **Adm-Zip**: Para manipular e extrair arquivos ZIP.

## Observações
- Certifique-se de ter permissão para baixar e usar as animações, respeitando os termos de uso e licenciamento do LottieFiles.
- O script foi testado com páginas do LottieFiles que contêm o elemento `<dotlottie-player>`.
