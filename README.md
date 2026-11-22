# Grimório da Tormenta

App de celular para jogadores de **Tormenta20** (edição Jogo do Ano). Funciona offline e pode ser instalado na tela inicial.

## O que tem
- **Ficha**: atributos, PV/PM máximos calculados pela classe e nível, Defesa, CD de magias, 29 perícias com treino automático, poderes, mochila e tibares. Vários personagens.
- **Barra de PV/PM** sempre visível, com dano, cura, gasto e PV temporários.
- **Grimório**: cadastre suas magias com círculo, escola, execução, alcance, duração, resistência e aprimoramentos.
- **Calculadora de PM**: custo do círculo (1/3/6/10/15) + aprimoramentos, aviso de limite de PM por magia (= nível) e botão para gastar.
- **Itens**: melhorias de item superior (até 4, +T$ 300 / 3.000 / 9.000 / 18.000), pré-requisitos (Pungente → Certeira, Atroz → Cruel), materiais especiais, encantos e valor total. Itens equipados entram na Defesa e nos ataques da ficha.
- **Anotações** com etiquetas e busca.
- **Dados**: d4 a d100, expressões como `2d8+3`, e rolagem com um toque nas perícias e ataques.
- **Backup**: exportar/importar JSON.

Os efeitos das melhorias são resumos editáveis; confira sempre no livro. Nenhum texto de magia do livro vem incluído: o grimório é preenchido por você.

## Como usar no celular
1. Ative o GitHub Pages do repositório: *Settings → Pages → Branch* e escolha a pasta `/docs`.
2. Abra o endereço no celular.
3. Android (Chrome): menu ⋮ → **Instalar app**. iPhone (Safari): Compartilhar → **Adicionar à Tela de Início**.

Os dados ficam salvos no próprio aparelho. Use **Exportar backup** de vez em quando.

## Desenvolvimento
O código-fonte é `app/tormenta.html` (HTML, CSS e JS puros, sem dependências). Para gerar a versão publicável em `docs/`:

```
node app/build.js
```
