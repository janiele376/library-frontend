export default {
  auth: {
    accessibility: {
      showPassword: 'Show password',
      hidePassword: 'Hide password',
    },

    phrase: {
      welcome: 'Welcome',
      line2: 'Reading Opens',
      line3: 'New Worlds',
      line4: 'Log in to access your experience',
    },

    login: {
      title: 'Log In',
      email: 'Email:',
      emailPlaceholder: "email{'@'}gmail.com",
      password: 'Password:',
      passwordPlaceholder: 'Password',
      forgotPassword: 'Forgot password?',
      confirmButton: 'Log In',
      registerButton: 'Sign Up',

      messages: {
        requiredFields: 'Please enter your email and password.',
        tokenNotReceived: 'Token not received from the server.',
        success: 'Logged in successfully!',
        invalidCredentials: 'Invalid email or password.',
        connectionError: 'Unable to connect to the server.',
        loginError: 'Unable to log in.',
        unexpectedError: 'An unexpected error occurred.',
      },

      validation: {
        emailRequired: 'Email is required.',
        invalidEmail: 'Enter a valid email address.',
        passwordRequired: 'Password is required.',
      },
    },

    register: {
      title: 'Sign Up',
      name: 'Name:',
      namePlaceholder: 'Full name',
      dateBirth: 'Date of Birth:',
      dateBirthPlaceholder: 'MM/DD/YYYY',
      email: 'Email:',
      emailPlaceholder: "email{'@'}gmail.com",
      cpf: 'CPF:',
      cpfPlaceholder: '000.000.000-00',
      phone: 'Phone Number:',
      phonePlaceholder: '(85) 99999-9999',
      address: 'Address:',
      addressPlaceholder: 'Street, number, neighborhood...',
      password: 'Password:',
      passwordPlaceholder: 'Password',
      confirmPassword: 'Confirm Password:',
      confirmPasswordPlaceholder: 'Confirm password',
      confirmButton: 'Create Account',
      cancelButton: 'Cancel',

      messages: {
        requiredFields: 'Please fill in all fields.',
        invalidEmail: 'Please enter a valid email address.',
        passwordMismatch: 'Passwords do not match.',
        invalidCpf: 'CPF must contain 11 digits.',
        invalidPhone: 'Please enter a valid phone number. Example: (85) 91234-5678',
        invalidBirthDate: 'Please enter a valid date of birth.',
        success: 'Account created successfully!',
        registrationError: 'Unable to create your account.',
        userAlreadyExists: 'This user is already registered.',
        invalidData: 'Please check the information provided.',
        connectionError: 'Unable to connect to the server.',
        unexpectedError: 'An unexpected error occurred.',
      },

      validation: {
        nameRequired: 'Full name is required.',
        invalidName: 'Enter a valid first and last name.',
        birthDateRequired: 'Date of birth is required.',
        emailRequired: 'Email is required.',
        cpfRequired: 'CPF is required.',
        phoneRequired: 'Phone number is required.',
        addressRequired: 'Address is required.',
        passwordRequired: 'Password is required.',
        confirmPasswordRequired: 'Please confirm your password.',
      },
    },

    forgotPassword: {
      title: 'Forgot Password',
      email: 'Email:',
      emailPlaceholder: "email{'@'}gmail.com",
      cpf: 'CPF:',
      cpfPlaceholder: '000.000.000-00',
      password: 'New Password:',
      passwordPlaceholder: 'New password',
      confirmPassword: 'Confirm New Password:',
      confirmPasswordPlaceholder: 'Confirm new password',
      confirmButton: 'Submit',
      cancelButton: 'Cancel',

      messages: {
        requiredFields: 'Please fill in all fields.',
        invalidEmail: 'Please enter a valid email address.',
        invalidCpf: 'CPF must contain 11 digits.',
        passwordMismatch: 'Passwords do not match.',
        success: 'Password changed successfully!',
        resetError: 'Unable to change your password.',
        invalidData: 'Please check the information provided.',
        validationError: 'Unable to validate the information provided.',
        notFound: 'Unable to find the provided information.',
        connectionError: 'Unable to connect to the server.',
        unexpectedError: 'An unexpected error occurred.',
      },

      validation: {
        emailRequired: 'Email is required.',
        cpfRequired: 'CPF is required.',
        passwordRequired: 'New password is required.',
        confirmPasswordRequired: 'Please confirm your new password.',
      },
    },
  },

  footer: {
    about: {
      title: 'About Us',
      firstLine: 'Creating value and inspiration since 2023.',
      secondLine: 'Our mission is to provide practical information about our products.',
    },

    contact: {
      title: 'Contact Us',
    },

    locations: {
      title: 'Our Locations',
    },
  },

  users: {
    messages: {
      loadError: 'Unable to load users.',
      deleteSuccess: 'User deleted successfully!',
      deleteError: 'Unable to delete the user.',
      deleteForbidden: 'You do not have permission to delete this user.',
      notFound: 'User not found.',
      deleteConflict: 'Unable to delete the user because related records exist.',
    },
    deleteDialog: {
      title: 'Delete user',
      message: 'Are you sure you want to delete {name}? This action cannot be undone.',
      cancel: 'Cancel',
      confirm: 'Delete',
    },

    searchPlaceholder: 'Search users...',

    table: {
      name: 'User Name',
      cpf: 'CPF',
      birthDate: 'Date of Birth',
      address: 'Address',
      actions: 'Actions',
    },

    edit: {
      validation: {
        userNotIdentified: 'Unable to identify the user.',
        invalidName: 'Enter a valid first and last name.',
        invalidEmail: 'Enter a valid email address.',
        invalidPhone: 'Enter a phone number in the format (85) 99999-9999.',
        invalidCpf: 'Enter a valid CPF.',
        invalidBirthDate: 'Enter a valid date of birth.',
        futureBirthDate: 'The date of birth must be earlier than today.',
        addressRequired: 'Address is required.',
      },
      messages: {
        unexpectedError: 'An unexpected error occurred.',
        connectionError: 'Unable to connect to the server.',
        invalidData: 'Please check the information provided.',
        forbidden: 'You do not have permission to edit this user.',
        notFound: 'User not found.',
        duplicate: 'The email address or CPF is already in use.',
        updateError: 'An error occurred while updating the user.',
        cannotStartUpdate: 'Unable to start the update.',
      },
    },

    editModal: {
      title: 'Edit User',
      back: 'Back',
      name: 'Full Name:',
      namePlaceholder: 'Enter full name',
      email: 'Email:',
      emailPlaceholder: 'Enter email address',
      phone: 'Phone Number:',
      phonePlaceholder: 'Enter phone number',
      cpf: 'CPF:',
      cpfPlaceholder: 'Enter CPF',
      birthDate: 'Date of Birth:',
      birthDatePlaceholder: 'MM/DD/YYYY',
      address: 'Address:',
      addressPlaceholder: 'Enter address',
      cancelButton: 'Cancel',
      saveButton: 'Save Changes',
      retry: 'Try again',
      loadError: 'Unable to load the user.',
      noChanges: 'No changes were made.',
      updateSuccess: 'User updated successfully!',
    },

    row: {
      editButton: 'Edit',
      deleteButton: 'Delete',
    },

    list: {
      searchPlaceholder: 'Search users...',
      id: 'ID',
      name: 'User Name',
      cpf: 'CPF',
      birthDate: 'Date of Birth',
      address: 'Address',
      actions: 'Actions',
      empty: 'No users found.',
    },
  },

  books: {
    messages: {
      loadError: 'Unable to load books.',
      invalidData: 'Check the provided information, including the quantity.',
      saveForbidden: 'You do not have permission to perform this operation.',
      bookOrPublisherNotFound: 'Book or publisher not found.',
      saveConflict: 'The operation could not be completed due to a data conflict.',
      saveError: 'An error occurred while saving the book.',
      createSuccess: 'Book created successfully!',
      updateSuccess: 'Book updated successfully!',
      deleteSuccess: 'Book deleted successfully!',
      deleteError: 'Unable to delete the book.',
      deleteForbidden: 'You do not have permission to delete this book.',
      notFound: 'Book not found.',
      deleteConflict: 'Cannot delete a book with existing rental records.',
    },
    deleteDialog: {
      title: 'Delete book',
      message: 'Are you sure you want to delete "{title}"? This action cannot be undone.',
      cancel: 'Cancel',
      confirm: 'Delete',
    },
    formExtra: {
      availableQuantity: 'Available quantity',
      genre: 'Genre',
    },

    title: 'Create Book',
    newBook: '+ New Book',

    table: {
      code: 'Code',
      name: 'Book Title',
      publisher: 'Publisher',
      releaseDate: 'Publication Date',
      quantity: 'Qty.',
      actions: 'Actions',
    },

    form: {
      createTitle: 'Create Book',
      editTitle: 'Edit Book',
      back: 'Back',
      name: 'Book Title:',
      code: 'Book Code:',
      publisher: 'Publisher:',
      selectPublisher: 'Select a publisher',
      releaseDate: 'Publication Date:',
      quantity: 'Number of Books:',
      confirmButton: 'CONFIRM',
      cancelButton: 'CANCEL',

      genre: 'Genre:',
      isbn: 'ISBN:',
      requiredField: 'This field is required.',
      publisherRequired: 'Please select a publisher.',
      quantityInvalid: 'Enter a valid quantity between 0 and 2147483647.',
    },

    page: {
      title: 'Create Book',
      newBook: '+ New Book',
      id: 'ID',
      code: 'Code',
      bookName: 'Book Title',
      publisher: 'Publisher',
      releaseDate: 'Release Date',
      quantity: 'Qty.',
      actions: 'Actions',
      loading: 'Loading books...',
      empty: 'No books found.',
      loadPublishersError: 'Unable to load publishers.',
    },

    row: {
      editButton: 'Edit',
      deleteButton: 'Delete',
    },
  },

  header: {
    title: 'Library Dashboard',
    user: 'User',
    settings: 'Settings',
    logout: 'Log Out',

    accessibility: {
      logo: 'Logo',
      userImage: 'User',
      settingsButton: 'Open settings',
      logoutButton: 'Log out of your account',
    },
  },

  components: {
    mainInput: {
      calendar: {
        cancelButton: 'Cancel',
        confirmButton: 'Confirm',
      },

      password: {
        show: 'Show password',
        hide: 'Hide password',
      },
    },

    searchInput: {
      placeholder: 'Search...',
    },

    btnDivider: {
      or: 'or',
    },

    pagination: {
      previousPage: 'Previous page',
      nextPage: 'Next page',
      pageIndicator: '{current} of {total}',
    },
  },

  settings: {
    editMessages: {
      retry: 'Try again',
      loadError: 'Unable to load profile information.',
      passwordMinLength: 'Your current password must contain at least 8 characters.',
      invalidName: 'Enter a valid first and last name.',
      invalidEmail: 'Enter a valid email address.',
      invalidPhone: 'The phone number must follow the format (85) 99999-9999.',
      updateSuccess: 'Information updated successfully!',
      invalidCurrentPassword: 'Incorrect current password or invalid information.',
    },

    headerTitle: 'Library Settings',
    title: 'Settings',
    back: 'Back',
    profile: 'Profile',
    accessibility: 'Accessibility',
    email: 'Email',
    phone: 'Phone',
    birthDate: 'Date of Birth',
    cpf: 'CPF',
    address: 'Address',
    editInformation: 'Edit Information',
    systemTheme: 'System Theme',
    light: 'Light',
    dark: 'Dark',
    systemLanguage: 'System Language',

    edit: {
      changePhoto: 'Click to change photo',
      profilePhoto: 'Profile photo',
      emailPlaceholder: "email{'@'}gmail.com",
      phonePlaceholder: '(00) 90000-0000',
      addressPlaceholder: 'Street, No. - Neighborhood',
      contactSupport: 'To change this information, contact support.',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
      currentPasswordPlaceholder: 'Enter your current password',
      newPasswordPlaceholder: 'Enter your new password',
      confirmPasswordPlaceholder: 'Confirm your new password',
      needHelp: 'Need help?',
      confirm: 'Confirm',
      cancel: 'Cancel',
      or: '----or----',
      supportTitle: 'User Support',
      supportDescription: 'Enter your email and describe your request.',
      supportEmail: 'Your Email',
      supportEmailPlaceholder: "email{'@'}example.com",
      supportMessage: 'Issue / Question',
      supportMessagePlaceholder: 'Describe your request...',
      send: 'Send',
      close: 'Close',
      required: 'Required field',
      invalidEmail: 'Enter a valid email address',
      invalidImage: 'Select a valid image',
      currentPasswordRequired: 'Enter your current password to change it',
      passwordMismatch: 'Passwords do not match',
      previewOnly: 'Form preview: changes are not saved yet.',
      supportPreviewOnly: 'Support preview: the message is not sent yet.',
    },
  },

  publishers: {
    loading: 'Loading publishers...',
    empty: 'No publishers found.',

    messages: {
      loadError: 'Unable to load publishers.',
      deleteSuccess: 'Publisher deleted successfully!',
      deleteConflict: 'Cannot delete this publisher because books are linked to it.',
      deleteError: 'Unable to delete the publisher.',
      updateSuccess: 'Publisher updated successfully!',
      createSuccess: 'Publisher created successfully!',
      saveError: 'Unable to save the publisher.',
      duplicate: 'CNPJ or email already registered.',
      invalidData: 'Invalid data. Please check the information.',
      notFound: 'Publisher not found.',
    },

    validation: {
      nameRequired: 'Enter the publisher name.',
      nameMinLength: 'The name must contain at least 2 characters.',
      cnpjRequired: 'Enter the CNPJ.',
      cnpjInvalid: 'CNPJ must follow the format 00.000.000/0000-00.',
      emailRequired: 'Enter the email address.',
      emailInvalid: 'Enter a valid email address.',
      phoneRequired: 'Enter the phone number.',
      phoneInvalid: 'Enter a valid mobile phone number.',
      addressRequired: 'Enter the address.',
      addressMinLength: 'The address must contain at least 5 characters.',
    },

    deleteDialog: {
      title: 'Delete publisher',
      message: 'Are you sure you want to delete the publisher "{name}"?',
      cancel: 'Cancel',
      confirm: 'Delete',
    },

    title: 'Create Publisher',
    newPublisher: '+ New Publisher',
    searchPlaceholder: 'Search publishers...',

    table: {
      id: 'ID',
      name: 'Name',
      contact: 'Email/Phone',
      address: 'Address',
      actions: 'Actions',
    },

    form: {
      createTitle: 'Create Publisher',
      editTitle: 'Edit Publisher',
      back: 'Back',
      name: 'Publisher Name:',
      cnpj: 'Publisher CNPJ:',
      email: 'Email:',
      phone: 'Phone:',
      address: 'Address:',
      confirmButton: 'CONFIRM',
      cancelButton: 'CANCEL',
    },

    row: {
      editButton: 'Edit',
      deleteButton: 'Delete',
    },
  },

  rentals: {
    messages: {
      loadError: 'Unable to load rentals.',
      referencesLoadError: 'Unable to load users and books.',
      invalidIds: 'Enter valid user and book IDs.',
      invalidRentalId: 'Invalid rental ID.',
      operationSuccess: 'Operation completed successfully!',
      operationError: 'Unable to complete the operation. Please check the information.',
      loadOptionsError: 'Unable to load users and books.',
    },
    formExtra: {
      userId: 'User ID',
      bookId: 'Book ID',
    },

    title: 'Create Rental',
    newRental: '+ New Rental',
    searchPlaceholder: 'Search...',

    table: {
      userName: 'User Name',
      book: 'Book',
      startDate: 'Start Date',
      endDate: 'End Date',
      status: 'Status',
      actions: 'Actions',
    },

    status: {
      active: 'Active',
      returned: 'Returned',
      overdue: 'Overdue',
    },

    row: {
      renewButton: 'Renew',
      returnButton: 'Return',
    },

    form: {
      createTitle: 'Create Rental',
      back: 'Back',
      userName: 'User Name:',
      cpf: 'User CPF:',
      bookName: 'Book Title:',
      bookCode: 'Book Code:',
      userSummary: 'User:',
      bookSummary: 'Book:',
      confirmButton: 'CONFIRM',
      cancelButton: 'CANCEL',
    },

    renew: {
      title: 'Renew Rental',
      message: 'Would you like to extend the loan period for this book?',
      date: 'New Return Date:',
    },

    return: {
      title: 'Confirm Return',
      message: 'Would you like to confirm the return of this book?',
      date: 'Return Date:',
    },
  },

  dashboard: {
    loading: 'Loading dashboard data...',
    loadError: 'Unable to load dashboard data.',
    retry: 'Try again',

    status: {
      onTime: 'Number of On-Time Rentals:',
      nearDue: 'Number of Rentals Near Due Date:',
      overdue: 'Number of Overdue Rentals:',
      rentalCount: 'No Rentals | {count} Rental | {count} Rentals',
    },

    lastRentals: {
      title: 'Recently Rented Books',
      empty: 'No rentals recorded',
    },

    globalStats: {
      title: 'Overall Statistics',
      rentals: 'Completed Rentals',
      books: 'Registered Books',
      publishers: 'Registered Publishers',
    },

    rentalQuantities: {
      title: 'Number of Rented Books',
      quantity: 'qty.',
      empty: 'No rentals recorded',
      bookFallback: 'Book #{id}',
      previousPage: 'Previous page',
      nextPage: 'Next page',
      goToPage: 'Go to page {page}',
    },

    mostRentedBook: {
      title: 'Most Rented Book',
      bookTitle: 'Book Title:',
      publisher: 'Publisher:',
      releaseDate: 'Release Date:',
      totalRentals: 'Total Rentals:',
      coverAlt: 'Book cover',
    },

    availableBooks: {
      title: 'Available Books',
      quantity: 'Available Quantity:',
      empty: 'No books available',
    },

    pagination: {
      previous: 'Previous page',
      next: 'Next page',
      pageIndicator: '{current} of {total}',
    },

    tenant: {
      rentalStatus: {
        title: 'Rental Status',
        onTime: 'On time',
        nearDue: 'Approaching due date',
        overdue: 'Overdue',
      },

      availableBooks: {
        title: 'Number of Available Books',
        empty: 'No books available',
        pageIndicator: 'Page {current} of {total}',
        loadError: 'Unable to load available books.',
      },
    },

    sidebar: {
      dashboard: 'Dashboard',
      users: 'Users',
      rentals: 'Rentals',
      books: 'Books',
      publishers: 'Publishers',
    },
  },
  errorPage: {
    goHome: 'Go home',
  },
};
