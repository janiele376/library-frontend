export default {
  auth: {
    accessibility: {
      showPassword: 'Mostrar senha',
      hidePassword: 'Ocultar senha',
    },

    phrase: {
      welcome: 'Bem Vindo(a)',
      line2: 'A Leitura Abre',
      line3: 'Novos Mundos',
      line4: 'Acesse sua conta e assista a sua experiência',
    },

    login: {
      title: 'Entrar',
      email: 'Email:',
      emailPlaceholder: "email{'@'}gmail.com",
      password: 'Senha:',
      passwordPlaceholder: 'Senha',
      forgotPassword: 'Esqueci a senha',
      confirmButton: 'Entrar',
      registerButton: 'Cadastre-se',

      messages: {
        requiredFields: 'Preencha o e-mail e a senha.',
        tokenNotReceived: 'Token não recebido do servidor.',
        success: 'Login realizado com sucesso!',
        invalidCredentials: 'E-mail ou senha inválidos.',
        connectionError: 'Não foi possível conectar ao servidor.',
        loginError: 'Não foi possível realizar o login.',
        unexpectedError: 'Ocorreu um erro inesperado.',
      },

      validation: {
        emailRequired: 'O e-mail é obrigatório.',
        invalidEmail: 'Informe um e-mail válido.',
        passwordRequired: 'A senha é obrigatória.',
      },
    },

    register: {
      title: 'Cadastro',
      name: 'Nome:',
      namePlaceholder: 'Nome completo',
      dateBirth: 'Data de nascimento:',
      dateBirthPlaceholder: 'DD/MM/AAAA',
      email: 'Email:',
      emailPlaceholder: "email{'@'}gmail.com",
      cpf: 'CPF:',
      cpfPlaceholder: '000.000.000-00',
      phone: 'Telefone:',
      phonePlaceholder: '(85) 99999-9999',
      address: 'Localização:',
      addressPlaceholder: 'Rua, número, bairro...',
      password: 'Senha:',
      passwordPlaceholder: 'Senha',
      confirmPassword: 'Confirmar Senha:',
      confirmPasswordPlaceholder: 'Confirmar senha',
      confirmButton: 'Criar Conta',
      cancelButton: 'Cancelar',

      messages: {
        requiredFields: 'Preencha todos os campos.',
        invalidEmail: 'Informe um e-mail válido.',
        passwordMismatch: 'As senhas não coincidem.',
        invalidCpf: 'O CPF deve conter 11 dígitos.',
        invalidPhone: 'Informe um celular válido. Ex: (85) 91234-5678',
        invalidBirthDate: 'Informe uma data de nascimento válida.',
        success: 'Cadastro realizado com sucesso!',
        registrationError: 'Não foi possível realizar o cadastro.',
        userAlreadyExists: 'Este usuário já está cadastrado.',
        invalidData: 'Verifique os dados informados.',
        connectionError: 'Não foi possível conectar ao servidor.',
        unexpectedError: 'Ocorreu um erro inesperado.',
      },

      validation: {
        nameRequired: 'O nome completo é obrigatório.',
        invalidName: 'Informe nome e sobrenome válidos.',
        birthDateRequired: 'A data de nascimento é obrigatória.',
        emailRequired: 'O e-mail é obrigatório.',
        cpfRequired: 'O CPF é obrigatório.',
        phoneRequired: 'O telefone é obrigatório.',
        addressRequired: 'O endereço é obrigatório.',
        passwordRequired: 'A senha é obrigatória.',
        confirmPasswordRequired: 'Confirme sua senha.',
      },
    },

    forgotPassword: {
      title: 'Esqueci Senha',
      email: 'Email:',
      emailPlaceholder: "email{'@'}gmail.com",
      cpf: 'CPF:',
      cpfPlaceholder: '000.000.000-00',
      password: 'Nova Senha:',
      passwordPlaceholder: 'Nova Senha',
      confirmPassword: 'Confirmar Nova Senha:',
      confirmPasswordPlaceholder: 'Confirmar Nova Senha',
      confirmButton: 'Enviar',
      cancelButton: 'Cancelar',

      messages: {
        requiredFields: 'Preencha todos os campos.',
        invalidEmail: 'Informe um e-mail válido.',
        invalidCpf: 'O CPF deve conter 11 dígitos.',
        passwordMismatch: 'As senhas não coincidem.',
        success: 'Senha alterada com sucesso!',
        resetError: 'Não foi possível alterar a senha.',
        invalidData: 'Verifique os dados informados.',
        validationError: 'Não foi possível validar os dados informados.',
        notFound: 'Não foi possível localizar os dados informados.',
        connectionError: 'Não foi possível conectar ao servidor.',
        unexpectedError: 'Ocorreu um erro inesperado.',
      },
    },
  },

  footer: {
    about: {
      title: 'Sobre Nós',
      firstLine: 'Criando valor e inspiração desde 2023.',
      secondLine: 'Nossa missão é informar você sobre nossos produtos com praticidade.',
    },

    contact: {
      title: 'Contate-Nos',
    },

    locations: {
      title: 'Nossos Locais',
    },
  },

  users: {
    messages: {
      loadError: 'Não foi possível carregar os usuários.',
      deleteSuccess: 'Usuário excluído com sucesso!',
      deleteError: 'Não foi possível excluir o usuário.',
      deleteForbidden: 'Você não tem permissão para excluir este usuário.',
      notFound: 'Usuário não encontrado.',
      deleteConflict: 'Não foi possível excluir o usuário devido a registros vinculados.',
    },
    deleteDialog: {
      title: 'Excluir usuário',
      message: 'Tem certeza que deseja excluir {name}? Esta ação não poderá ser desfeita.',
      cancel: 'Cancelar',
      confirm: 'Excluir',
    },

    searchPlaceholder: 'Pesquisar usuários...',

    table: {
      name: 'Nome do Usuário',
      cpf: 'CPF',
      birthDate: 'Data de Nasc.',
      address: 'Endereço',
      actions: 'Ações',
    },

    editModal: {
      title: 'Editar Usuário',
      back: 'Voltar',
      name: 'Nome Completo:',
      namePlaceholder: 'Digite o nome completo',
      email: 'E-mail:',
      emailPlaceholder: 'Digite o e-mail',
      phone: 'Telefone:',
      phonePlaceholder: 'Digite o telefone',
      cpf: 'CPF:',
      cpfPlaceholder: 'Digite o CPF',
      birthDate: 'Data de Nascimento:',
      birthDatePlaceholder: 'DD/MM/AAAA',
      address: 'Endereço:',
      addressPlaceholder: 'Digite o endereço',
      cancelButton: 'Cancelar',
      saveButton: 'Salvar Alterações',
      retry: 'Tentar novamente',
      loadError: 'Não foi possível carregar o usuário.',
      noChanges: 'Nenhuma alteração foi realizada.',
      updateSuccess: 'Usuário atualizado com sucesso!',
    },

    row: {
      editButton: 'Editar',
      deleteButton: 'Excluir',
    },

    list: {
      searchPlaceholder: 'Pesquisar usuários...',
      id: 'ID',
      name: 'Nome do Usuário',
      cpf: 'CPF',
      birthDate: 'Data de Nasc.',
      address: 'Endereço',
      actions: 'Ações',
      empty: 'Nenhum usuário encontrado.',
    },
  },

  books: {
    messages: {
      loadError: 'Não foi possível carregar os livros.',
      invalidData: 'Confira os dados informados, incluindo a quantidade.',
      saveForbidden: 'Você não tem permissão para realizar esta operação.',
      bookOrPublisherNotFound: 'Livro ou editora não encontrado.',
      saveConflict: 'Não foi possível concluir a operação devido a um conflito nos dados.',
      saveError: 'Ocorreu um erro ao salvar o livro.',
      createSuccess: 'Livro cadastrado com sucesso!',
      updateSuccess: 'Livro atualizado com sucesso!',
      deleteSuccess: 'Livro excluído com sucesso!',
      deleteError: 'Não foi possível excluir o livro.',
      deleteForbidden: 'Você não tem permissão para excluir este livro.',
      notFound: 'Livro não encontrado.',
      deleteConflict: 'Não é possível excluir um livro com empréstimos registrados.',
    },
    deleteDialog: {
      title: 'Excluir livro',
      message: 'Tem certeza que deseja excluir "{title}"? Esta ação não poderá ser desfeita.',
      cancel: 'Cancelar',
      confirm: 'Excluir',
    },
    formExtra: {
      availableQuantity: 'Quantidade disponível',
      genre: 'Gênero',
    },

    title: 'Criar Livro',
    newBook: '+ Novo Livro',

    table: {
      code: 'Cód.',
      name: 'Nome do Livro',
      publisher: 'Editora',
      releaseDate: 'Data de Lançamento',
      quantity: 'Qtd.',
      actions: 'Ações',
    },

    form: {
      createTitle: 'Criar Livro',
      editTitle: 'Editar Livro',
      back: 'Voltar',
      name: 'Nome do Livro:',
      code: 'Código do Livro:',
      publisher: 'Editora:',
      selectPublisher: 'Selecione uma editora',
      releaseDate: 'Data de Lançamento',
      quantity: 'Quantidade de Livros:',
      confirmButton: 'CONFIRMAR',
      cancelButton: 'CANCELAR',

      genre: 'Gênero:',
      isbn: 'ISBN:',
      requiredField: 'Este campo é obrigatório.',
      publisherRequired: 'Selecione uma editora.',
      quantityInvalid: 'Informe uma quantidade válida entre 0 e 2147483647.',
    },

    page: {
      title: 'Criar Livro',
      newBook: '+ Novo Livro',
      id: 'ID',
      code: 'Cód.',
      bookName: 'Nome do Livro',
      publisher: 'Editora',
      releaseDate: 'Data de Lançamento',
      quantity: 'Qtd.',
      actions: 'Ações',
      loading: 'Carregando livros...',
      empty: 'Nenhum livro encontrado.',
      loadPublishersError: 'Não foi possível carregar as editoras.',
    },

    row: {
      editButton: 'Editar',
      deleteButton: 'Excluir',
    },
  },

  header: {
    title: 'Biblioteca Dashboard',
    user: 'Usuário',
    settings: 'Ajustes',
    logout: 'Sair',

    accessibility: {
      logo: 'Logo',
      userImage: 'Usuário',
      settingsButton: 'Abrir ajustes',
      logoutButton: 'Sair da conta',
    },
  },

  components: {
    mainInput: {
      calendar: {
        cancelButton: 'Cancelar',
        confirmButton: 'Confirmar',
      },

      password: {
        show: 'Mostrar senha',
        hide: 'Ocultar senha',
      },
    },

    searchInput: {
      placeholder: 'Pesquisar...',
    },

    btnDivider: {
      or: 'ou',
    },

    pagination: {
      previousPage: 'Página anterior',
      nextPage: 'Próxima página',
      pageIndicator: '{current} de {total}',
    },
  },

  settings: {
    editMessages: {
      retry: 'Tentar novamente',
      loadError: 'Não foi possível carregar as informações do perfil.',
      currentPasswordMinLength: 'A senha atual deve ter pelo menos 8 caracteres.',
      invalidFullName: 'Informe nome e sobrenome válidos.',
      invalidEmail: 'Informe um e-mail válido.',
      invalidPhone: 'O telefone deve seguir o formato (85) 99999-9999.',
      invalidAddress: 'Informe um endereço válido.',
      updateSuccess: 'Informações atualizadas com sucesso!',
      invalidCurrentPassword: 'Senha atual inválida ou dados incorretos.',
      emailAlreadyInUse: 'Este e-mail já está sendo utilizado por outro usuário.',
      permissionDenied: 'Você não tem permissão para alterar estas informações.',
    },

    headerTitle: 'Biblioteca Configurações',
    title: 'Configurações',
    back: 'Voltar',
    profile: 'Perfil',
    accessibility: 'Acessibilidade',
    email: 'E-mail',
    phone: 'Telefone',
    birthDate: 'Data de Nascimento',
    cpf: 'CPF',
    address: 'Endereço',
    editInformation: 'Editar Informações',
    systemTheme: 'Cor do Sistema',
    light: 'Claro',
    dark: 'Escuro',
    systemLanguage: 'Idioma do Sistema',

    edit: {
      changePhoto: 'Clique para alterar a foto',
      profilePhoto: 'Foto de perfil',
      emailPlaceholder: "email{'@'}gmail.com",
      phonePlaceholder: '(00) 90000-0000',
      addressPlaceholder: 'Logradouro, Nº - Bairro',
      contactSupport: 'Para alterar esta informação, contate o suporte.',
      currentPassword: 'Senha Antiga',
      newPassword: 'Nova Senha',
      confirmPassword: 'Confirmar Senha',
      currentPasswordPlaceholder: 'Digite sua senha atual',
      newPasswordPlaceholder: 'Digite a nova senha',
      confirmPasswordPlaceholder: 'Confirme a nova senha',
      needHelp: 'Quer ajuda?',
      confirm: 'Confirmar',
      cancel: 'Cancelar',
      or: '----ou----',
      supportTitle: 'Suporte ao Usuário',
      supportDescription: 'Informe seu e-mail e descreva sua solicitação.',
      supportEmail: 'Seu E-mail',
      supportEmailPlaceholder: "email{'@'}exemplo.com",
      supportMessage: 'Situação / Dúvida',
      supportMessagePlaceholder: 'Descreva sua solicitação...',
      send: 'Enviar',
      close: 'Fechar',
      required: 'Campo obrigatório',
      invalidEmail: 'Informe um e-mail válido',
      invalidImage: 'Selecione uma imagem válida',
      newPasswordMinLength: 'A nova senha deve ter pelo menos 8 caracteres.',
      currentPasswordRequired: 'Informe sua senha atual para alterar a senha',
      passwordMismatch: 'As senhas não coincidem',
      previewOnly: 'Prévia do formulário: alterações ainda não são salvas.',
      supportPreviewOnly: 'Prévia do suporte: mensagem ainda não é enviada.',
    },
  },

  publishers: {
    loading: 'Carregando editoras...',
    empty: 'Nenhuma editora encontrada.',
    messages: {
      loadError: 'Não foi possível carregar as editoras.',
      deleteSuccess: 'Editora excluída com sucesso!',
      deleteConflict: 'Não é possível excluir esta editora porque existem livros vinculados a ela.',
      deleteError: 'Não foi possível excluir a editora.',
      updateSuccess: 'Editora atualizada com sucesso!',
      createSuccess: 'Editora cadastrada com sucesso!',
      saveError: 'Não foi possível salvar a editora.',
      duplicate: 'CNPJ ou e-mail já cadastrado.',
      invalidData: 'Dados inválidos. Confira as informações.',
      notFound: 'Editora não encontrada.',
    },
    deleteDialog: {
      title: 'Excluir editora',
      message: 'Deseja realmente excluir a editora "{name}"?',
      cancel: 'Cancelar',
      confirm: 'Excluir',
    },
    validation: {
      nameRequired: 'Informe o nome da editora.',
      nameMinLength: 'O nome deve ter pelo menos 2 caracteres.',
      cnpjRequired: 'Informe o CNPJ.',
      cnpjInvalid: 'CNPJ deve seguir o formato 00.000.000/0000-00.',
      emailRequired: 'Informe o e-mail.',
      emailInvalid: 'Informe um e-mail válido.',
      phoneRequired: 'Informe o telefone.',
      phoneInvalid: 'Informe um celular válido.',
      addressRequired: 'Informe o endereço.',
      addressMinLength: 'O endereço deve ter pelo menos 5 caracteres.',
    },

    title: 'Criar Editora',
    newPublisher: '+ Nova Editora',
    searchPlaceholder: 'Pesquisar editora...',

    table: {
      id: 'ID',
      name: 'Nome',
      contact: 'E-mail/Telefone',
      address: 'Endereço',
      actions: 'Ações',
    },

    form: {
      createTitle: 'Criar Editora',
      editTitle: 'Editar Editora',
      back: 'Voltar',
      name: 'Nome da Editora:',
      cnpj: 'CNPJ da Editora:',
      email: 'E-mail:',
      phone: 'Telefone:',
      address: 'Endereço:',
      confirmButton: 'CONFIRMAR',
      cancelButton: 'CANCELAR',
    },

    row: {
      editButton: 'Editar',
      deleteButton: 'Excluir',
    },
  },

  rentals: {
    messages: {
      loadError: 'Não foi possível carregar os empréstimos.',
      referencesLoadError: 'Não foi possível carregar usuários e livros.',
      invalidIds: 'Informe IDs válidos para o usuário e o livro.',
      invalidRentalId: 'ID do empréstimo inválido.',
      operationSuccess: 'Operação realizada com sucesso!',
      operationError: 'Não foi possível concluir a operação. Confira os dados.',
      loadOptionsError: 'Não foi possível carregar usuários e livros.',
    },
    formExtra: {
      userId: 'ID do usuário',
      bookId: 'ID do livro',
    },

    title: 'Criar Aluguel',
    newRental: '+ Novo Aluguel',
    searchPlaceholder: 'Pesquisar aluguel...',

    table: {
      userName: 'Nome do Usuário',
      book: 'Livro',
      startDate: 'Data Início',
      endDate: 'Data Fim',
      status: 'Status',
      actions: 'Ações',
    },

    status: {
      active: 'Ativo',
      returned: 'Devolvido',
      overdue: 'Atrasado',
    },

    row: {
      renewButton: 'Renovar',
      returnButton: 'Devolver',
    },

    form: {
      createTitle: 'Criar Aluguel',
      back: 'Voltar',
      userName: 'Nome do Usuário:',
      cpf: 'CPF do Usuário:',
      bookName: 'Nome do Livro:',
      bookCode: 'Código do Livro:',
      userSummary: 'Usuário:',
      bookSummary: 'Livro:',
      confirmButton: 'CONFIRMAR',
      cancelButton: 'CANCELAR',
    },

    renew: {
      title: 'Renovar Aluguel',
      message: 'Deseja estender o prazo de empréstimo deste livro?',
      date: 'Nova Data de Devolução:',
    },

    return: {
      title: 'Confirmar Devolução',
      message: 'Deseja confirmar a devolução deste livro?',
      date: 'Data de Devolução:',
    },
  },

  dashboard: {
    loading: 'Carregando dados da Dashboard...',
    loadError: 'Não foi possível carregar os dados da Dashboard.',
    retry: 'Tentar novamente',

    status: {
      onTime: 'Quantidade de Aluguéis em Dia:',
      nearDue: 'Quantidade de Aluguéis Perto de Vencer:',
      overdue: 'Quantidade de Aluguéis em Atraso:',
      rentalCount: 'Nenhum Aluguel | {count} Aluguel | {count} Aluguéis',
    },

    lastRentals: {
      title: 'Últimos Livros Alugados',
      empty: 'Nenhum aluguel registrado',
    },

    globalStats: {
      title: 'Quantitativos Globais',
      rentals: 'Aluguéis Realizados',
      books: 'Livros Cadastrados',
      publishers: 'Editoras Cadastradas',
    },

    rentalQuantities: {
      title: 'Quantidade de Livros Alugados',
      quantity: 'qtd.',
      empty: 'Nenhum aluguel computado',
      bookFallback: 'Livro #{id}',
      previousPage: 'Página anterior',
      nextPage: 'Próxima página',
      goToPage: 'Ir para página {page}',
    },

    mostRentedBook: {
      title: 'Livro Mais Alugado',
      bookTitle: 'Título do Livro:',
      publisher: 'Editora:',
      releaseDate: 'Data de Lançamento:',
      totalRentals: 'Total de Aluguéis:',
      coverAlt: 'Capa do livro',
    },

    availableBooks: {
      title: 'Livros Disponíveis',
      quantity: 'Quantidade Disponível:',
      empty: 'Nenhum livro disponível',
    },

    pagination: {
      previous: 'Página anterior',
      next: 'Próxima página',
      pageIndicator: '{current} de {total}',
    },

    tenant: {
      rentalStatus: {
        title: 'Situação dos Aluguéis',
        onTime: 'Em dia',
        nearDue: 'Próximos do vencimento',
        overdue: 'Atrasados',
      },

      availableBooks: {
        title: 'Quantidade de Livros Disponíveis',
        empty: 'Nenhum livro disponível',
        pageIndicator: 'Página {current} de {total}',
        loadError: 'Não foi possível carregar os livros disponíveis.',
      },
    },

    sidebar: {
      dashboard: 'Dashboard',
      users: 'Usuários',
      rentals: 'Aluguéis',
      books: 'Livros',
      publishers: 'Editoras',
    },
  },
  errorPage: {
    goHome: 'Voltar ao início',
  },
};
