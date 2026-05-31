# Versoes do Gerador de Senha

Este repositorio mantem **duas versoes** do mesmo projeto para comparar evolucao (util para portfolio, LinkedIn e demos).

## Links rapidos

| Versao | Periodo | Onde abrir |
| --- | --- | --- |
| **Atual (v2)** | 2025+ | [Raiz do repo](../index.html) · [Netlify](https://password-generator-rafael.netlify.app/) |
| **Legada (v1)** | ~2022 | [legacy/v1/index.html](./v1/index.html) · Netlify: `/legacy/v1/` apos deploy |

### GitHub (navegador)

- **Atual:** `https://github.com/RafaelHDSV/Password-Generator`
- **Legada:** `https://github.com/RafaelHDSV/Password-Generator/tree/main/legacy/v1`

### Tag Git (snapshot da v1)

```bash
git checkout v1-legacy-2022
```

A tag aponta para o commit em que a pasta `legacy/v1` foi adicionada. O desenvolvimento continua em `main`.

## O que mudou (resumo para post)

**v1 (2022)**

- Logo grande no topo
- Toggles desligados por padrao (maiusculas, simbolos, numeros)
- Texto predefinido na senha
- Copia ao clicar na senha
- `Math.random()` para aleatoriedade
- Slider 5–25 caracteres

**v2 (atual)**

- UI compacta, sem scroll, atalhos Enter / Ctrl+C
- Preferencias salvas no navegador
- `crypto.getRandomValues`
- Slider 8–64, padroes alinhados ao uso real
- Documentacao e templates GitHub

## Capturas (antes / depois)

As imagens em [`images/desktop.png`](../images/desktop.png) e [`images/mobile.png`](../images/mobile.png) referem-se a **v1**. Atualize-as apos deploy da v2 se quiser comparativo visual no README.

## Post no LinkedIn (sugestao de links no post)

1. Demo atual: `https://password-generator-rafael.netlify.app/`
2. Versao antiga: `https://password-generator-rafael.netlify.app/legacy/v1/` (apos publicar este commit)
3. Repositorio: `https://github.com/RafaelHDSV/Password-Generator`

## Por que pasta `legacy/` e nao so branch?

- **Uma URL estavel** em `main` (`/legacy/v1/`) sem trocar branch no Netlify
- **README e issues** continuam descrevendo o produto atual
- **Tag Git** ainda marca o marco no historico para quem clona o repo

Branch `legacy/v1` e opcional se preferir deploy separado; a pasta no `main` e o caminho mais simples para projeto estatico.
