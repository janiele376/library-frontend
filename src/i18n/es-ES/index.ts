export default {
  auth: {
    accessibility: {
      showPassword: 'Mostrar contraseña',
      hidePassword: 'Ocultar contraseña',
    },

    phrase: {
      welcome: 'Bienvenido(a)',
      line2: 'La Lectura Abre',
      line3: 'Nuevos Mundos',
      line4: 'Inicia sesión para acceder a tu experiencia',
    },

    login: {
      title: 'Iniciar sesión',
      email: 'Correo electrónico:',
      emailPlaceholder: "email{'@'}gmail.com",
      password: 'Contraseña:',
      passwordPlaceholder: 'Contraseña',
      forgotPassword: '¿Has olvidado tu contraseña?',
      confirmButton: 'Iniciar sesión',
      registerButton: 'Registrarse',

      messages: {
        requiredFields: 'Introduce tu correo electrónico y contraseña.',
        tokenNotReceived: 'No se ha recibido el token del servidor.',
        success: '¡Has iniciado sesión correctamente!',
        invalidCredentials: 'Correo electrónico o contraseña incorrectos.',
        connectionError: 'No se ha podido conectar con el servidor.',
        loginError: 'No se ha podido iniciar sesión.',
        unexpectedError: 'Se ha producido un error inesperado.',
      },

      validation: {
        emailRequired: 'El correo electrónico es obligatorio.',
        invalidEmail: 'Introduce un correo electrónico válido.',
        passwordRequired: 'La contraseña es obligatoria.',
      },
    },

    register: {
      title: 'Registro',
      name: 'Nombre:',
      namePlaceholder: 'Nombre completo',
      dateBirth: 'Fecha de nacimiento:',
      dateBirthPlaceholder: 'DD/MM/AAAA',
      email: 'Correo electrónico:',
      emailPlaceholder: "email{'@'}gmail.com",
      cpf: 'CPF:',
      cpfPlaceholder: '000.000.000-00',
      phone: 'Teléfono:',
      phonePlaceholder: '(85) 99999-9999',
      address: 'Dirección:',
      addressPlaceholder: 'Calle, número, barrio...',
      password: 'Contraseña:',
      passwordPlaceholder: 'Contraseña',
      confirmPassword: 'Confirmar contraseña:',
      confirmPasswordPlaceholder: 'Confirmar contraseña',
      confirmButton: 'Crear cuenta',
      cancelButton: 'Cancelar',

      messages: {
        requiredFields: 'Completa todos los campos.',
        invalidEmail: 'Introduce una dirección de correo válida.',
        passwordMismatch: 'Las contraseñas no coinciden.',
        invalidCpf: 'El CPF debe contener 11 dígitos.',
        invalidPhone: 'Introduce un número de teléfono válido. Ej.: (85) 91234-5678',
        invalidBirthDate: 'Introduce una fecha de nacimiento válida.',
        success: '¡Cuenta creada correctamente!',
        registrationError: 'No se ha podido crear la cuenta.',
        userAlreadyExists: 'Este usuario ya está registrado.',
        invalidData: 'Comprueba los datos introducidos.',
        connectionError: 'No se ha podido conectar con el servidor.',
        unexpectedError: 'Se ha producido un error inesperado.',
      },

      validation: {
        nameRequired: 'El nombre completo es obligatorio.',
        invalidName: 'Introduce un nombre y apellido válidos.',
        birthDateRequired: 'La fecha de nacimiento es obligatoria.',
        emailRequired: 'El correo electrónico es obligatorio.',
        cpfRequired: 'El CPF es obligatorio.',
        phoneRequired: 'El teléfono es obligatorio.',
        addressRequired: 'La dirección es obligatoria.',
        passwordRequired: 'La contraseña es obligatoria.',
        confirmPasswordRequired: 'Confirma tu contraseña.',
      },
    },

    forgotPassword: {
      title: 'He olvidado mi contraseña',
      email: 'Correo electrónico:',
      emailPlaceholder: "email{'@'}gmail.com",
      cpf: 'CPF:',
      cpfPlaceholder: '000.000.000-00',
      password: 'Nueva contraseña:',
      passwordPlaceholder: 'Nueva contraseña',
      confirmPassword: 'Confirmar nueva contraseña:',
      confirmPasswordPlaceholder: 'Confirmar nueva contraseña',
      confirmButton: 'Enviar',
      cancelButton: 'Cancelar',

      messages: {
        requiredFields: 'Completa todos los campos.',
        invalidEmail: 'Introduce una dirección de correo válida.',
        invalidCpf: 'El CPF debe contener 11 dígitos.',
        passwordMismatch: 'Las contraseñas no coinciden.',
        success: '¡Contraseña cambiada correctamente!',
        resetError: 'No se ha podido cambiar la contraseña.',
        invalidData: 'Comprueba los datos introducidos.',
        validationError: 'No se han podido validar los datos introducidos.',
        notFound: 'No se han encontrado los datos proporcionados.',
        connectionError: 'No se ha podido conectar con el servidor.',
        unexpectedError: 'Se ha producido un error inesperado.',
      },

      validation: {
        emailRequired: 'El correo electrónico es obligatorio.',
        cpfRequired: 'El CPF es obligatorio.',
        passwordRequired: 'La nueva contraseña es obligatoria.',
        confirmPasswordRequired: 'Confirma la nueva contraseña.',
      },
    },
  },

  footer: {
    about: {
      title: 'Sobre Nosotros',
      firstLine: 'Creando valor e inspiración desde 2023.',
      secondLine: 'Nuestra misión es informarte sobre nuestros productos de manera práctica.',
    },

    contact: {
      title: 'Contáctanos',
    },

    locations: {
      title: 'Nuestras Ubicaciones',
    },
  },

  users: {
    messages: {
      loadError: 'No se pudieron cargar los usuarios.',
      deleteSuccess: '¡Usuario eliminado correctamente!',
      deleteError: 'No se pudo eliminar el usuario.',
      deleteForbidden: 'No tienes permiso para eliminar este usuario.',
      notFound: 'Usuario no encontrado.',
      deleteConflict: 'No se pudo eliminar el usuario debido a registros relacionados.',
    },
    deleteDialog: {
      title: 'Eliminar usuario',
      message: '¿Seguro que deseas eliminar a {name}? Esta acción no se puede deshacer.',
      cancel: 'Cancelar',
      confirm: 'Eliminar',
    },

    searchPlaceholder: 'Buscar usuarios...',

    table: {
      name: 'Nombre del usuario',
      cpf: 'CPF',
      birthDate: 'Fecha de nacimiento',
      address: 'Dirección',
      actions: 'Acciones',
    },

    edit: {
      validation: {
        userNotIdentified: 'No se pudo identificar al usuario.',
        invalidName: 'Introduce un nombre y apellido válidos.',
        invalidEmail: 'Introduce un correo electrónico válido.',
        invalidPhone: 'Introduce un teléfono con el formato (85) 99999-9999.',
        invalidCpf: 'Introduce un CPF válido.',
        invalidBirthDate: 'Introduce una fecha de nacimiento válida.',
        futureBirthDate: 'La fecha de nacimiento debe ser anterior a hoy.',
        addressRequired: 'La dirección es obligatoria.',
      },
      messages: {
        unexpectedError: 'Se produjo un error inesperado.',
        connectionError: 'No se pudo conectar con el servidor.',
        invalidData: 'Comprueba los datos introducidos.',
        forbidden: 'No tienes permiso para editar este usuario.',
        notFound: 'Usuario no encontrado.',
        duplicate: 'El correo electrónico o CPF ya está en uso.',
        updateError: 'Se produjo un error al actualizar el usuario.',
        cannotStartUpdate: 'No se pudo iniciar la actualización.',
      },
    },

    editModal: {
      title: 'Editar usuario',
      back: 'Volver',
      name: 'Nombre completo:',
      namePlaceholder: 'Introduce el nombre completo',
      email: 'Correo electrónico:',
      emailPlaceholder: 'Introduce el correo electrónico',
      phone: 'Teléfono:',
      phonePlaceholder: 'Introduce el número de teléfono',
      cpf: 'CPF:',
      cpfPlaceholder: 'Introduce el CPF',
      birthDate: 'Fecha de nacimiento:',
      birthDatePlaceholder: 'DD/MM/AAAA',
      address: 'Dirección:',
      addressPlaceholder: 'Introduce la dirección',
      cancelButton: 'Cancelar',
      saveButton: 'Guardar cambios',
      retry: 'Intentar de nuevo',
      loadError: 'No se pudo cargar el usuario.',
      noChanges: 'No se realizaron cambios.',
      updateSuccess: '¡Usuario actualizado correctamente!',
    },

    row: {
      editButton: 'Editar',
      deleteButton: 'Eliminar',
    },

    list: {
      searchPlaceholder: 'Buscar usuarios...',
      id: 'ID',
      name: 'Nombre del usuario',
      cpf: 'CPF',
      birthDate: 'Fecha de nacimiento',
      address: 'Dirección',
      actions: 'Acciones',
      empty: 'No se encontraron usuarios.',
    },
  },

  books: {
    messages: {
      loadError: 'No se pudieron cargar los libros.',
      invalidData: 'Comprueba los datos introducidos, incluida la cantidad.',
      saveForbidden: 'No tienes permiso para realizar esta operación.',
      bookOrPublisherNotFound: 'No se encontró el libro o la editorial.',
      saveConflict: 'No se pudo completar la operación debido a un conflicto de datos.',
      saveError: 'Se produjo un error al guardar el libro.',
      createSuccess: '¡Libro registrado correctamente!',
      updateSuccess: '¡Libro actualizado correctamente!',
      deleteSuccess: '¡Libro eliminado correctamente!',
      deleteError: 'No se pudo eliminar el libro.',
      deleteForbidden: 'No tienes permiso para eliminar este libro.',
      notFound: 'Libro no encontrado.',
      deleteConflict: 'No se puede eliminar un libro con préstamos registrados.',
    },
    deleteDialog: {
      title: 'Eliminar libro',
      message: '¿Seguro que deseas eliminar "{title}"? Esta acción no se puede deshacer.',
      cancel: 'Cancelar',
      confirm: 'Eliminar',
    },
    formExtra: {
      availableQuantity: 'Cantidad disponible',
      genre: 'Género',
    },

    title: 'Crear libro',
    newBook: '+ Nuevo libro',

    table: {
      code: 'Cód.',
      name: 'Título del libro',
      publisher: 'Editorial',
      releaseDate: 'Fecha de publicación',
      quantity: 'Cant.',
      actions: 'Acciones',
    },

    form: {
      createTitle: 'Crear libro',
      editTitle: 'Editar libro',
      back: 'Volver',
      name: 'Título del libro:',
      code: 'Código del libro:',
      publisher: 'Editorial:',
      selectPublisher: 'Selecciona una editorial',
      releaseDate: 'Fecha de publicación:',
      quantity: 'Cantidad de libros:',
      confirmButton: 'CONFIRMAR',
      cancelButton: 'CANCELAR',

      genre: 'Género:',
      isbn: 'ISBN:',
      requiredField: 'Este campo es obligatorio.',
      publisherRequired: 'Selecciona una editorial.',
      quantityInvalid: 'Introduce una cantidad válida entre 0 y 2147483647.',
    },

    page: {
      title: 'Crear libro',
      newBook: '+ Nuevo libro',
      id: 'ID',
      code: 'Cód.',
      bookName: 'Nombre del libro',
      publisher: 'Editorial',
      releaseDate: 'Fecha de publicación',
      quantity: 'Cant.',
      actions: 'Acciones',
      loading: 'Cargando libros...',
      empty: 'No se encontraron libros.',
      loadPublishersError: 'No se pudieron cargar las editoriales.',
    },

    row: {
      editButton: 'Editar',
      deleteButton: 'Eliminar',
    },
  },

  header: {
    title: 'Panel de biblioteca',
    user: 'Usuario',
    settings: 'Ajustes',
    logout: 'Cerrar sesión',

    accessibility: {
      logo: 'Logotipo',
      userImage: 'Usuario',
      settingsButton: 'Abrir ajustes',
      logoutButton: 'Cerrar sesión de la cuenta',
    },
  },

  components: {
    mainInput: {
      calendar: {
        cancelButton: 'Cancelar',
        confirmButton: 'Confirmar',
      },

      password: {
        show: 'Mostrar contraseña',
        hide: 'Ocultar contraseña',
      },
    },

    searchInput: {
      placeholder: 'Buscar...',
    },

    btnDivider: {
      or: 'o',
    },

    pagination: {
      previousPage: 'Página anterior',
      nextPage: 'Página siguiente',
      pageIndicator: '{current} de {total}',
    },
  },

  settings: {
    editMessages: {
      retry: 'Intentar de nuevo',
      loadError: 'No se pudo cargar la información del perfil.',
      currentPasswordMinLength: 'La contraseña actual debe tener al menos 8 caracteres.',
      invalidFullName: 'Introduce un nombre y apellido válidos.',
      invalidEmail: 'Introduce un correo electrónico válido.',
      invalidPhone: 'El teléfono debe seguir el formato (85) 99999-9999.',
      invalidAddress: 'Introduce una dirección válida.',
      updateSuccess: '¡Información actualizada correctamente!',
      invalidCurrentPassword: 'Contraseña actual incorrecta o datos no válidos.',
      emailAlreadyInUse: 'Este correo electrónico ya está siendo utilizado por otro usuario.',
      permissionDenied: 'No tienes permiso para modificar esta información.',
    },

    headerTitle: 'Configuración de la Biblioteca',
    title: 'Configuración',
    back: 'Volver',
    profile: 'Perfil',
    accessibility: 'Accesibilidad',
    email: 'Correo electrónico',
    phone: 'Teléfono',
    birthDate: 'Fecha de Nacimiento',
    cpf: 'CPF',
    address: 'Dirección',
    editInformation: 'Editar Información',
    systemTheme: 'Tema del Sistema',
    light: 'Claro',
    dark: 'Oscuro',
    systemLanguage: 'Idioma del Sistema',

    edit: {
      changePhoto: 'Haz clic para cambiar la foto',
      profilePhoto: 'Foto de perfil',
      emailPlaceholder: "email{'@'}gmail.com",
      phonePlaceholder: '(00) 90000-0000',
      addressPlaceholder: 'Calle, Nº - Barrio',
      contactSupport: 'Para cambiar esta información, contacta con soporte.',
      currentPassword: 'Contraseña Actual',
      newPassword: 'Nueva Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      currentPasswordPlaceholder: 'Introduce tu contraseña actual',
      newPasswordPlaceholder: 'Introduce la nueva contraseña',
      confirmPasswordPlaceholder: 'Confirma la nueva contraseña',
      needHelp: '¿Necesitas ayuda?',
      confirm: 'Confirmar',
      cancel: 'Cancelar',
      or: '----o----',
      supportTitle: 'Soporte al Usuario',
      supportDescription:
        'Introduce tu correo y describe el motivo del contacto para que nuestro equipo pueda ayudarte.',
      supportEmail: 'Tu Correo',
      supportEmailPlaceholder: "email{'@'}ejemplo.com",
      supportMessage: 'Situación / Duda',
      supportMessagePlaceholder: 'Describe tu solicitud...',
      send: 'Enviar',
      close: 'Cerrar',
      required: 'Campo obligatorio',
      invalidEmail: 'Introduce un correo válido',
      invalidImage: 'Selecciona una imagen válida',
      newPasswordMinLength: 'La nueva contraseña debe tener al menos 8 caracteres.',
      currentPasswordRequired: 'Introduce tu contraseña actual para cambiarla',
      passwordMismatch: 'Las contraseñas no coinciden',
      previewOnly: 'Vista previa: los cambios todavía no se guardan.',
      supportPreviewOnly: 'Vista previa de soporte: el mensaje todavía no se envía.',
    },
  },

  publishers: {
    loading: 'Cargando editoriales...',
    empty: 'No se encontraron editoriales.',

    messages: {
      loadError: 'No se pudieron cargar las editoriales.',
      deleteSuccess: '¡Editorial eliminada correctamente!',
      deleteConflict: 'No se puede eliminar esta editorial porque tiene libros asociados.',
      deleteError: 'No se pudo eliminar la editorial.',
      updateSuccess: '¡Editorial actualizada correctamente!',
      createSuccess: '¡Editorial registrada correctamente!',
      saveError: 'No se pudo guardar la editorial.',
      duplicate: 'El CNPJ o el correo electrónico ya están registrados.',
      invalidData: 'Datos inválidos. Comprueba la información.',
      notFound: 'Editorial no encontrada.',
    },

    validation: {
      nameRequired: 'Introduce el nombre de la editorial.',
      nameMinLength: 'El nombre debe tener al menos 2 caracteres.',
      cnpjRequired: 'Introduce el CNPJ.',
      cnpjInvalid: 'El CNPJ debe seguir el formato 00.000.000/0000-00.',
      emailRequired: 'Introduce el correo electrónico.',
      emailInvalid: 'Introduce un correo electrónico válido.',
      phoneRequired: 'Introduce el número de teléfono.',
      phoneInvalid: 'Introduce un número de móvil válido.',
      addressRequired: 'Introduce la dirección.',
      addressMinLength: 'La dirección debe tener al menos 5 caracteres.',
    },

    deleteDialog: {
      title: 'Eliminar editorial',
      message: '¿Realmente deseas eliminar la editorial "{name}"?',
      cancel: 'Cancelar',
      confirm: 'Eliminar',
    },

    title: 'Crear Editorial',
    newPublisher: '+ Nueva Editorial',
    searchPlaceholder: 'Buscar editorial...',

    table: {
      id: 'ID',
      name: 'Nombre',
      contact: 'Correo/Teléfono',
      address: 'Dirección',
      actions: 'Acciones',
    },

    form: {
      createTitle: 'Crear Editorial',
      editTitle: 'Editar Editorial',
      back: 'Volver',
      name: 'Nombre de la Editorial:',
      cnpj: 'CNPJ de la Editorial:',
      email: 'Correo electrónico:',
      phone: 'Teléfono:',
      address: 'Dirección:',
      confirmButton: 'CONFIRMAR',
      cancelButton: 'CANCELAR',
    },

    row: {
      editButton: 'Editar',
      deleteButton: 'Eliminar',
    },
  },

  rentals: {
    messages: {
      loadError: 'No se pudieron cargar los préstamos.',
      referencesLoadError: 'No se pudieron cargar los usuarios y los libros.',
      invalidIds: 'Introduce identificadores válidos de usuario y libro.',
      invalidRentalId: 'Identificador de préstamo no válido.',
      operationSuccess: '¡Operación realizada correctamente!',
      operationError: 'No se pudo completar la operación. Revisa los datos.',
      loadOptionsError: 'No se pudieron cargar los usuarios y libros.',
    },
    formExtra: {
      userId: 'ID del usuario',
      bookId: 'ID del libro',
    },

    title: 'Crear Alquiler',
    newRental: '+ Nuevo Alquiler',
    searchPlaceholder: 'Buscar alquileres...',

    table: {
      userName: 'Nombre del Usuario',
      book: 'Libro',
      startDate: 'Fecha de Inicio',
      endDate: 'Fecha de Fin',
      status: 'Estado',
      actions: 'Acciones',
    },

    status: {
      active: 'Activo',
      returned: 'Devuelto',
      overdue: 'Atrasado',
    },

    row: {
      renewButton: 'Renovar',
      returnButton: 'Devolver',
    },

    form: {
      createTitle: 'Crear Alquiler',
      back: 'Volver',
      userName: 'Nombre del Usuario:',
      cpf: 'CPF del Usuario:',
      bookName: 'Nombre del Libro:',
      bookCode: 'Código del Libro:',
      userSummary: 'Usuario:',
      bookSummary: 'Libro:',
      confirmButton: 'CONFIRMAR',
      cancelButton: 'CANCELAR',
    },

    renew: {
      title: 'Renovar Alquiler',
      message: '¿Deseas ampliar el plazo de préstamo de este libro?',
      date: 'Nueva Fecha de Devolución:',
    },

    return: {
      title: 'Confirmar Devolución',
      message: '¿Deseas confirmar la devolución de este libro?',
      date: 'Fecha de Devolución:',
    },
  },

  dashboard: {
    loading: 'Cargando datos del panel de control...',
    loadError: 'No se pudieron cargar los datos del panel de control.',
    retry: 'Intentar de nuevo',

    status: {
      onTime: 'Cantidad de Préstamos al Día:',
      nearDue: 'Cantidad de Préstamos Próximos a Vencer:',
      overdue: 'Cantidad de Préstamos Vencidos:',
      rentalCount: 'Ningún Préstamo | {count} Préstamo | {count} Préstamos',
    },

    lastRentals: {
      title: 'Últimos Libros Prestados',
      empty: 'No hay préstamos registrados',
    },

    globalStats: {
      title: 'Estadísticas Generales',
      rentals: 'Préstamos Realizados',
      books: 'Libros Registrados',
      publishers: 'Editoriales Registradas',
    },

    rentalQuantities: {
      title: 'Cantidad de Libros Prestados',
      quantity: 'cant.',
      empty: 'No hay préstamos contabilizados',
      bookFallback: 'Libro #{id}',
      previousPage: 'Página anterior',
      nextPage: 'Página siguiente',
      goToPage: 'Ir a la página {page}',
    },

    mostRentedBook: {
      title: 'Libro Más Prestado',
      bookTitle: 'Título del Libro:',
      publisher: 'Editorial:',
      releaseDate: 'Fecha de Publicación:',
      totalRentals: 'Total de Préstamos:',
      coverAlt: 'Portada del libro',
    },

    availableBooks: {
      title: 'Libros Disponibles',
      quantity: 'Cantidad Disponible:',
      empty: 'No hay libros disponibles',
    },

    pagination: {
      previous: 'Página anterior',
      next: 'Página siguiente',
      pageIndicator: '{current} de {total}',
    },

    tenant: {
      rentalStatus: {
        title: 'Estado de los Préstamos',
        onTime: 'Al día',
        nearDue: 'Próximos a vencer',
        overdue: 'Vencidos',
      },

      availableBooks: {
        title: 'Cantidad de Libros Disponibles',
        empty: 'No hay libros disponibles',
        pageIndicator: 'Página {current} de {total}',
        loadError: 'No se pudieron cargar los libros disponibles.',
      },
    },

    sidebar: {
      dashboard: 'Panel de control',
      users: 'Usuarios',
      rentals: 'Préstamos',
      books: 'Libros',
      publishers: 'Editoriales',
    },
  },
  errorPage: {
    goHome: 'Volver al inicio',
  },
};
