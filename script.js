const livros = [
  { id: 1, titulo: "A Hipótese do Amor", autor: "Ali Hazelwood", categoria: "contemporaneo", nomeCategoria: "Contemporâneo", preco: 39.90, cor: "linear-gradient(145deg,#527b70,#294d48)", capa: "A hipótese<br>do amor" },
  { id: 2, titulo: "Orgulho e Preconceito", autor: "Jane Austen", categoria: "classico", nomeCategoria: "Clássico", preco: 34.90, cor: "linear-gradient(145deg,#bd8e83,#824e59)", capa: "Orgulho e<br>Preconceito" },
  { id: 3, titulo: "Amor & Gelato", autor: "Jenna Evans Welch", categoria: "contemporaneo", nomeCategoria: "Contemporâneo", preco: 32.90, cor: "linear-gradient(145deg,#e8a76e,#b65d52)", capa: "Amor<br>& Gelato" },
  { id: 4, titulo: "Corte de Espinhos e Rosas", autor: "Sarah J. Maas", categoria: "fantasia", nomeCategoria: "Romance fantástico", preco: 49.90, cor: "linear-gradient(145deg,#686b82,#34334c)", capa: "Corte de<br>Espinhos<br>e Rosas" },
  { id: 5, titulo: "Como Eu Era Antes de Você", autor: "Jojo Moyes", categoria: "contemporaneo", nomeCategoria: "Contemporâneo", preco: 37.90, cor: "linear-gradient(145deg,#d58e83,#9e5965)", capa: "Como Eu Era<br>Antes de Você" },
  { id: 6, titulo: "Romeu e Julieta", autor: "William Shakespeare", categoria: "classico", nomeCategoria: "Clássico", preco: 29.90, cor: "linear-gradient(145deg,#a84e5a,#632e42)", capa: "Romeu<br>e Julieta" },
  { id: 7, titulo: "A Seleção", autor: "Kiera Cass", categoria: "fantasia", nomeCategoria: "Romance fantástico", preco: 35.90, cor: "linear-gradient(145deg,#78a8a0,#3f7774)", capa: "A Seleção" },
  { id: 8, titulo: "Teto Para Dois", autor: "Beth O’Leary", categoria: "contemporaneo", nomeCategoria: "Contemporâneo", preco: 36.90, cor: "linear-gradient(145deg,#d3a8ad,#a76d83)", capa: "Teto<br>Para Dois" }
];

let categoriaAtual = "todos";
let sacola = [];
const grade = document.getElementById("gradeLivros");
const pesquisa = document.getElementById("pesquisa");
const aviso = document.getElementById("aviso");

function moeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function renderizarLivros() {
  const termo = pesquisa.value.trim().toLocaleLowerCase("pt-BR");
  const filtrados = livros.filter(livro => {
    const combinaCategoria = categoriaAtual === "todos" || livro.categoria === categoriaAtual;
    const combinaBusca = `${livro.titulo} ${livro.autor} ${livro.nomeCategoria}`.toLocaleLowerCase("pt-BR").includes(termo);
    return combinaCategoria && combinaBusca;
  });

  grade.innerHTML = filtrados.map(livro => `
    <article class="card-livro">
      <div class="capa" style="background:${livro.cor}">
        <div class="capa-titulo">${livro.capa}<small>Entre Páginas</small></div>
      </div>
      <div class="card-conteudo">
        <span class="categoria">${livro.nomeCategoria}</span>
        <h3>${livro.titulo}</h3>
        <p class="autor">por ${livro.autor}</p>
        <div class="preco-linha">
          <span class="preco">${moeda(livro.preco)}</span>
          <button class="adicionar" data-id="${livro.id}" aria-label="Adicionar ${livro.titulo} à sacola" title="Adicionar à sacola">+</button>
        </div>
      </div>
    </article>
  `).join("");

  document.getElementById("semResultados").hidden = filtrados.length > 0;
  grade.querySelectorAll(".adicionar").forEach(botao => {
    botao.addEventListener("click", () => adicionar(Number(botao.dataset.id)));
  });
}

function mostrarAviso(mensagem) {
  aviso.textContent = mensagem;
  aviso.classList.add("mostrar");
  window.clearTimeout(mostrarAviso.timer);
  mostrarAviso.timer = window.setTimeout(() => aviso.classList.remove("mostrar"), 2400);
}

function adicionar(id) {
  const livro = livros.find(item => item.id === id);
  sacola.push(livro);
  document.getElementById("contador").textContent = sacola.length;
  mostrarAviso(`“${livro.titulo}” foi adicionado à sua sacola!`);
}

document.querySelectorAll(".filtro").forEach(botao => {
  botao.addEventListener("click", () => {
    document.querySelector(".filtro.ativo").classList.remove("ativo");
    botao.classList.add("ativo");
    categoriaAtual = botao.dataset.categoria;
    renderizarLivros();
  });
});

pesquisa.addEventListener("input", renderizarLivros);
document.getElementById("verCarrinho").addEventListener("click", () => {
  if (!sacola.length) {
    mostrarAviso("Sua sacola ainda está vazia. Escolha um romance!");
    return;
  }
  const total = sacola.reduce((soma, livro) => soma + livro.preco, 0);
  const titulos = [...new Set(sacola.map(livro => livro.titulo))].join(", ");
  mostrarAviso(`${sacola.length} livro(s) • Total: ${moeda(total)}`);
  alert(`Sua sacola:\n${titulos}\n\nTotal: ${moeda(total)}\n\nEsta é uma demonstração; nenhuma compra será realizada.`);
});

document.getElementById("ano").textContent = new Date().getFullYear();
renderizarLivros();
