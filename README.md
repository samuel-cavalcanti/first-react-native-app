# first-react-native-app
Meu primeiro React native App, Utilizei react-native-paper pra deixar menos feio :)

Um bom jeito de dar uma olhada é usando o Expo Snack apesar de meio bugado quebra o galho:  
https://snack.expo.io/@samuel-cavalcanti/github.com-samuel-cavalcanti-first-react-native-app

## diferenças do que foi ensinado:

- foi adicionado o
[react native paper](https://github.com/callstack/react-native-paper)
o seu guia inicial pode ser encontrado aqui:
[get started](https://callstack.github.io/react-native-paper/getting-started.html).
Como mencionado em uma das aulas, seria legal adicionar um pouco de material design
para o projeto. O que basicamente é o react native paper, ao invés de o usar um componente direto do React native, utilizei um dos componentes do paper.
Adiciona-lo no projeto é simples, é apenas um comando:

```bash
yarn add react-native-paper
``` 

- Foi alterado A API [shows-api](https://github.com/brigolini/shows-api) para o do [episodate/api](https://www.episodate.com/api), por motivos de imagens melhores e ao adicionar uma nova série, ele procura no __episodate__ (também visto no módulo 1) e adicona na lista de séries.

- Código foi fatorado a medida que foi sentida a necessidade, não é um código limpo muito menos com arquivos de teste.

## Detalhes

Apesar de poder ver o código e mexer nele online pelo
[expo snack](https://snack.expo.io/@samuel-cavalcanti/github.com-samuel-cavalcanti-first-react-native-app), seria legal também baixar o código
e ver localmente, um vez que o Expo Web buga o ícones do bottomBar e na versão Android do expo as imagens não ficam dimensionada corretamente devido um bugo do
react-native-paper, a qual você pode consertar fazendo uma gabiarra:
[issue](https://github.com/callstack/react-native-paper/issues/1272)
