<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Sobre o Projeto</h1>
    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Descrição do Projeto</h2>
      <p>- Desenvolver interface para CRUD de usuários.</p>
      <p>- O cadastro/edição do usuário deve ser feito por um modal aberto pela listagem.</p>
      <ul class="list-disc list-inside ml-4">
        <li>
          Deve conter campos de nome, email, telefone, CPF/CNPJ, ganho mensal aproximado, status
          (ativo/inativo) e dados de endereço.
        </li>
        <li>
          Não precisa ter conexão com backend, mas os dados cadastrados devem ser salvos em uma
          <strong>store</strong> (ex: Pinia) para serem exibidos na listagem e deve ser possível a
          edição dos mesmos.
        </li>
        <li>
          Ao cadastrar/editar o usuário simular tempo de loading e fazer tratativa de mensagens em
          sucesso/exceção.
        </li>
      </ul>
      <p>
        - A interface deve conter uma listagem com filtros personalizados e ordenação por coluna.
      </p>
      <p>- A exibição de colunas e layout da interface fica a critério do desenvolvedor.</p>
    </section>
    <section>
      <h2 class="text-xl font-semibold mb-2">Opcionais Desejáveis</h2>
      <ul class="list-disc list-inside ml-4">
        <li>Conter um menu lateral colapsável.</li>
        <li>Adicionar opções de navegação para outras telas, como configurações, home, etc.</li>
        <li>
          As opções adicionais do menu não precisam ter interface, podem ser somente uma tela em
          branco.
        </li>
        <li>Conter uma toolbar com avatar e nome do usuário logado.</li>
        <li>
          Integração com o viacep para pegar dados de endereço a partir do CEP:
          <a href="https://viacep.com.br/" class="text-blue-500 hover:underline"
            >https://viacep.com.br/</a
          >
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
/* Adicione estilos personalizados aqui, se necessário */
</style>
