
export const validate_registerForm = values => {

  const errors = {}

  const requiredFields = [
    'fName',
    'lName',
    'email',
    'username',
    'password',
    'confirmPassword'
  ]

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }

  if (
    values.password &&
    values.password < 8
  ) {
    errors.password = 'Min 8 Characters and should include at least 1 special character.'
  }


  if (
    values.confirmPassword && values.confirmPassword != values.password
  ) {
    errors.confirmPassword = 'Password did not match'
  }

  return errors;

}


export const validate_logInForm = values => {

  const errors = {}

  const requiredFields = [
    'email',
    'password'
  ]

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }

  if (
    values.password &&
    values.password < 8
  ) {
    errors.password = 'Min 8 Characters and should include at least 1 special character.'
  }

  return errors;

}


export const validate_reset = values => {

  const errors = {}

  const requiredFields = [
    'email'
  ]

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }

  return errors;

}


export const validate_changeEmail = values => {

  const errors = {}

  const requiredFields = [
    'email'
  ]

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }

  return errors;

}

export const validate_changePassword = values => {

  const errors = {}

  const requiredFields = [
    'password',
    'confirmPassword'
  ]

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  if (
    values.password &&
    values.password < 8
  ) {
    errors.password = 'Min 8 Characters and should include at least 1 special character.'
  }


  if (
    values.confirmPassword && values.confirmPassword != values.password
  ) {
    errors.confirmPassword = 'Password did not match'
  }

  return errors;

}