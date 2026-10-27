# Detecção de Bad Smells e Refatoração Segura

Trabalho de Teste de Software baseado em [bad-smells-js-refactoring](https://github.com/CleitonSilvaT/bad-smells-js-refactoring), commit `39d39f9`.

## Arquivos

- `src/ReportGenerator.js`: código original, com apenas a correção mínima de `<tr >` para `<tr>` necessária para passar no teste HTML já existente.
- `src/ReportGenerator.refactored.js`: versão refatorada, com regras de visibilidade, prioridade e formatação separadas.
- `tests/ReportGenerator.test.js`: suíte original, sem alterações.
- `__tests__/ReportGenerator.refactored.test.js`: cópia da suíte original; somente o import aponta para a versão refatorada.
- `output/pdf/Relatorio_Bad_Smells.pdf`: relatório final do trabalho.

## Como validar

```sh
npm install
npm test -- --runInBand
npx eslint src/ReportGenerator.refactored.js
```

O `npm test` usa a opção `--experimental-vm-modules` no script para que o Jest execute os arquivos ES Modules do projeto. O arquivo original mantém os smells intencionais: `npx eslint src/ReportGenerator.js` ainda aponta complexidade cognitiva alta e um `if` que pode ser unido ao seguinte. A versão refatorada passa sem erros no ESLint.
