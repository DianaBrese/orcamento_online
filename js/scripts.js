// Objeto para pegar os preços e as fotos das camisetas

var camisetas = {
  branca: {
    gola_v: {
      sem_estampa: {
        preco_unit: 5.12,
        foto: 'v-white.jpg'
      },
      com_estampa: {
        preco_unit: 8.95,
        foto: 'v-white-personalized.jpg'
      }
    },

    gola_normal: {
      sem_estampa: {
        preco_unit: 4.99,
        foto: 'normal-white.jpg'
      },
      com_estampa: {
        preco_unit: 8.77,
        foto: 'normal-white-personalized.jpg'
      }
    }
  },

  colorida: {
    gola_v: {
      sem_estampa: {
        preco_unit: 6.04,
        foto: 'v-color.jpg'
      },
      com_estampa: {
        preco_unit: 9.47,
        foto: 'v-color-personalized.png'
      }
    },

    gola_normal: {
      sem_estampa: {
        preco_unit: 5.35,
        foto: 'normal-color.jpg'
      },
      com_estampa: {
        preco_unit: 9.28,
        foto: 'normal-color-personalized.jpg'
      }
    }
  }
}



//Armazenando informações no localStorage
if ( localStorage.getItem('parametrosPesquisa')) {

  parametros_pesquisa = JSON.parse(localStorage.getItem('parametrosPesquisa'))

} else {

    var parametros_pesquisa = {
        quantidade: 10,
        cor: 'colorida',
        gola: 'gola_v',
        qualidade: 'q150',
        estampa: 'com_estampa',
        embalagem: 'bulk'
      }
}


$("#quantidade").val(parametros_pesquisa.quantidade);

if (parametros_pesquisa.cor == "branca") {
    $("#branca").addClass("selected")
} else {
    $("#colorida").addClass("selected")
}

if (parametros_pesquisa.gola == "gola_v") {
    $("#gola_v").addClass("selected")
} else {
    $("#gola_normal").addClass("selected")
}

if (parametros_pesquisa.qualidade == "q150") {
    $("#q150").addClass("selected")
} else {
    $("#q190").addClass("selected")
}

if (parametros_pesquisa.estampa == "com_estampa") {
    $("#estampa").val(parametros_pesquisa.estampa)
} else {
    $("#estampa").val(parametros_pesquisa.estampa)
}

if (parametros_pesquisa.embalagem == "bulk") {
    $("#embalagem").val(parametros_pesquisa.embalagem)
} else {
    $("#embalagem").val(parametros_pesquisa.embalagem)

}


//Formatar detalhes do pedido 
var formatarDetalhesPedido = {
  gola_v: 'Gola V',
  gola_normal: 'Gola Normal',
  sem_estampa: 'Sem Estampa',
  com_estampa: 'Com Estampa',
  q150: 'Normal (150g/m2)',
  q190: 'Alta (190g/m2)',
  branca: 'Branca',
  colorida: 'Cor',
  bulk: 'Bulk - Sem Plástico',
  unitaria: 'Unitária - Plástico'
}

// para acessar os valores do objeto temos duas formas
//1. primeiro podemos acessar diretamento pelo nome da chave
// Exemplo formatarDetalhesPedido.gola_v
//          nomedoobjeto.nomedachave
// 2. acessando atraves de colchetes[]
// exemplo

// Regras adicionais para o orçamento:

// 1. Verificar se há em localStorage os parâmetros do último orçamento e se houver, carregar a página com eles.

// 2. A camisa de qualidade alta (190g/m2) deve acrescer o preço unitário em 12%.

// 3. A embalagem unitária tem um custo de 0.15 por unidade

// 4. Após cálculo do preço, há que se aplicar um desconto por quantidade, sendo:
// faixa 1: acima de 1.000 - Desconto de 15%
// faixa 2: acima de 500 - Desconto de 10%
// faixa 3: acima de 100 - Desconto de 5%

// Resolução do desafio:

$(function () {
  //Calcular preço das camisetas
  function calcularPreco(caracteristicasCamisa) {

    window.localStorage.setItem("parametrosPesquisa", JSON.stringify(parametros_pesquisa))

    var qnt = caracteristicasCamisa.quantidade
    var cor = caracteristicasCamisa.cor
    var gola = caracteristicasCamisa.gola
    var qualidade = caracteristicasCamisa.qualidade
    var estampa = caracteristicasCamisa.estampa
    var embalagem = caracteristicasCamisa.embalagem

    var valorCamisa = camisetas[cor][gola][estampa]['preco_unit']

    var preco = valorCamisa * qnt
    if (qualidade == 'q190') {
      preco = preco + (12 * preco) / 100
    }

    if (embalagem == 'unitaria') {
      preco = preco + 0.15
    }

    if (preco > 1000) {
      preco = preco - (15 * preco) / 100
    } else if (preco > 500) {
      preco = preco - (10 * preco) / 100
    } else if (preco > 100) {
      preco = preco - (5 * preco) / 100
    }

    $('#result_gola').text(formatarDetalhesPedido[gola])
    $('#result_estampa').text(formatarDetalhesPedido[qualidade])
    $('#result_qualidade').text(formatarDetalhesPedido[estampa])
    $('#result_cor').text(formatarDetalhesPedido[cor])
    $('#result_embalagem').text(formatarDetalhesPedido[embalagem])
    $('#result_quantidade').text(qnt)
    $('#valor-total').text(preco.toFixed(2))

    if (cor == 'branca' && gola == 'gola_v' && estampa == 'com_estampa') {
      $('#foto-produto').attr('src', 'img/v-white-personalized.jpg')
    } else if (cor == 'branca' && gola == 'gola_normal' && estampa == 'sem_estampa') {
      $('#foto-produto').attr('src', 'img/normal-white.jpg')
    } else if (cor == 'branca' && gola == 'gola_v' && estampa == "sem_estampa") {
        $('#foto-produto').attr('src', 'img/v-white.jpg')
    } else if (cor == "branca" && gola == "gola_normal" && estampa == "com_estampa") {
        $('#foto-produto').attr('src', 'img/normal-white-personalized.jpg')
    }

    if (cor == 'colorida' && gola == 'gola_v' && estampa == 'com_estampa') {
        $('#foto-produto').attr('src', 'img/v-color-personalized.png')
      } else if (cor == 'colorida' && gola == 'gola_normal' && estampa == 'sem_estampa') {
        $('#foto-produto').attr('src', 'img/normal-color.jpg')
      } else if (cor == 'colorida' && gola == 'gola_v' && estampa == "sem_estampa") {
          $('#foto-produto').attr('src', 'img/v-color.jpg')
      } else if (cor == "colorida" && gola == "gola_normal" && estampa == "com_estampa") {
          $('#foto-produto').attr('src', 'img/normal-color-personalized.jpg')
      }

  
  }

  calcularPreco(parametros_pesquisa)

  //Selecionar cor da camiseta
  $('#cor').click(function () {
    if ($('#branca').hasClass('selected') == false) {
      $('#branca').addClass('selected')
      $('#colorida').removeClass('selected')
    } else {
      $('#branca').removeClass('selected')
      $('#colorida').addClass('selected')
    }

    if ($('#branca').hasClass('selected')) {
      var corSelecionada = $('#branca').get(0).id
    } else {
      var corSelecionada = $('#colorida').get(0).id
    }

    parametros_pesquisa.cor = corSelecionada
    calcularPreco(parametros_pesquisa)

  })

  //Selecionar gola da camiseta
  $('#gola').click(function () {
    if ($('#gola_v').hasClass('selected') == false) {
      $('#gola_v').addClass('selected')
      $('#gola_normal').removeClass('selected')
    } else {
      $('#gola_v').removeClass('selected')
      $('#gola_normal').addClass('selected')
    }

    if ($('#gola_v').hasClass('selected')) {
      var golaSelecionada = $('#gola_v').get(0).id
    } else {
      var golaSelecionada = $('#gola_normal').get(0).id
    }

    parametros_pesquisa.gola = golaSelecionada
    calcularPreco(parametros_pesquisa)
  })

  //Selecionar qualidade do tecido
  $('#qualidade').click(function () {
    if ($('#q150').hasClass('selected') == false) {
      $('#q150').addClass('selected')
      $('#q190').removeClass('selected')
    } else {
      $('#q150').removeClass('selected')
      $('#q190').addClass('selected')
    }

    if ($('#q150').hasClass('selected')) {
      var qualidadeSelecionada = $('#q150').get(0).id
    } else {
      var qualidadeSelecionada = $('#q190').get(0).id
    }

    parametros_pesquisa.qualidade = qualidadeSelecionada

    calcularPreco(parametros_pesquisa)
  })

  //Selecionar quantidade de camisetas
  $('#quantidade').change(function () {
    var quantidade = $('#quantidade').val()
    parametros_pesquisa.quantidade = quantidade
    calcularPreco(parametros_pesquisa)
  })

  //Selecionar estampa

  $('#estampa').change(function () {
    var tipoEstampa = $('#estampa').val()
    parametros_pesquisa.estampa = tipoEstampa
    calcularPreco(parametros_pesquisa)
  })

  //Selecionar embalagem
  $('#embalagem').change(function () {
    var tipoEmbalagem = $('#embalagem').val()
    parametros_pesquisa.embalagem = tipoEmbalagem
    calcularPreco(parametros_pesquisa)
  })
})


// var parametros_pesquisa = {
//     quantidade: 10,
//     cor: 'colorida',
//     gola: 'gola_v',
//     qualidade: 'q150',
//     estampa: 'com_estampa',
//     embalagem: 'bulk'
//   }



// Sugestão de etapas da resolução

// 1. Crie uma função para calcular o preço baseado nos parâmetros da variável "parametros_pesquisa" e solte o
// valor no console para testar se está certo.

// 2. Faça os eventos click e change para os filtros.

// a. Faça o evento click para os filtros do tipo botão (.option-filter). Sempre que houver um click,
// remova a classe "selected" dos botões do grupo e depois aplique-a apenas ao que foi clicado para
// que ele fique azul.

// b. Faça o evento change para os filtros do tipo <select> e para o <input> de quantidade.

// c. Sempre que um dos eventos acima ocorrer, atualize a variável "parametros_pesquisa" e rode a função para
// calcular o preço

// 3. Altere a função do cálculo do preço. Em vez de soltar os valores no console, atualize as informações
// nos elementos "result_", atualize o preço no elemento "valor-total" e mude o atributo "src" do elemento
// "foto-produto" para alterar a imagem mostrada (todas as imagens estão na pasta img).

// 4. Adicione a funcionalidade de hide e show do spinner (elemento "refresh-loader") à função de cálculo de preço.
// Como não estamos consultando dados externos, o cálculo acaba sendo rápido demais, portanto use um setTimeout
// para deixar ele aparecer por pelo menos 2 segundos.

// 5. Crie a funcionalidade do localStorage e ao carregar a página, consulte o localStorage,
// atualize a variável "parametros_pesquisa" e rode a função de cálculo de preço
