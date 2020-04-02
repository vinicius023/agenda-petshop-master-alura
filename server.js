const { GraphQLServer } = require('graphql-yoga')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')

const resolvers = {
  Mutation: {
    adicionarCliente: (root, params) => ({
      id: 1,
      nome: params.nome,
      cpf: params.cpf
    })
  },
  Query: {
    status: () => "Servidor rodando!"
  }
}
const servidor = new GraphQLServer(
  {
    resolvers,
    typeDefs: './schema.graphql'
  }
)

servidor.start(() => { console.log('servidor ouvindo') })

conexao.connect(erro => {
  if (erro) {
    console.log(erro)
  }

  console.log('conectou no banco')

  Tabelas.init(conexao)
})
