const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const AdmZip = require('adm-zip');
const readline = require('readline');

// Função para solicitar confirmação do usuário
function perguntar(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(question, answer => {
            rl.close();
            resolve(answer.toLowerCase() === 's');
        });
    });
}

// Função principal para carregar a página com puppeteer e extrair o link do arquivo .lottie
async function baixarEExtrairLottie(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Extrair o link do primeiro <dotlottie-player>
        const lottieUrl = await page.evaluate(() => {
            const player = document.querySelector('dotlottie-player');
            return player ? player.getAttribute('src') : null;
        });

        if (!lottieUrl) {
            console.log("Elemento <dotlottie-player> ou atributo 'src' não encontrado.");
            await browser.close();
            return;
        }

        console.log(`URL do arquivo .lottie encontrado: ${lottieUrl}`);

        // Perguntar ao usuário se deseja prosseguir com o download
        const confirmar = await perguntar('Deseja prosseguir com o download? (s/n): ');

        if (!confirmar) {
            console.log('Download cancelado pelo usuário.');
            await browser.close();
            return;
        }

        // Baixar o arquivo .lottie
        const lottieResposta = await axios.get(lottieUrl, { responseType: 'arraybuffer' });
        const nomeArquivoLottie = path.basename(lottieUrl);
        const caminhoArquivoLottie = path.join(__dirname, nomeArquivoLottie);

        // Salvar o arquivo .lottie no diretório atual
        fs.writeFileSync(caminhoArquivoLottie, lottieResposta.data);
        console.log(`Arquivo '${nomeArquivoLottie}' salvo com sucesso.`);

        // Abrir o arquivo .lottie como um ZIP
        const zip = new AdmZip(caminhoArquivoLottie);
        const entradas = zip.getEntries();

        // Procurar pelo arquivo JSON dentro da pasta 'animations'
        const entradaJson = entradas.find(entry => entry.entryName.startsWith('animations/') && entry.entryName.endsWith('.json'));

        if (!entradaJson) {
            console.log("Arquivo JSON não encontrado dentro da pasta 'animations'.");
            await browser.close();
            return;
        }

        // Extrair o conteúdo do arquivo JSON
        const conteudoJson = entradaJson.getData().toString('utf8');
        const nomeArquivoJson = path.basename(entradaJson.entryName);
        const caminhoArquivoJson = path.join(__dirname, nomeArquivoJson);

        // Salvar o arquivo JSON no diretório atual
        fs.writeFileSync(caminhoArquivoJson, conteudoJson);
        console.log(`Arquivo JSON '${nomeArquivoJson}' extraído e salvo com sucesso.`);
    } catch (erro) {
        console.error(`Erro: ${erro.message}`);
    } finally {
        await browser.close();
    }
}

// Verificar se a URL foi fornecida como argumento de linha de comando
const args = process.argv.slice(2);
if (args.length === 0) {
    console.log('Por favor, forneça a URL da página do LottieFiles como argumento.');
} else {
    const urlLottie = args[0];
    baixarEExtrairLottie(urlLottie);
}
