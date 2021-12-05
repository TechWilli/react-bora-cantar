import React from 'react'
import PropTypes from 'prop-types'
import styles from './InputText.module.css'

const InputText = ({ placeholder, onChange, value, ...rest }) => {
  return (
    <React.Fragment>
        <input
        className={styles.inputText}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        spellCheck={false}
        {...rest}
        />  
    </React.Fragment>
  )
}

export default InputText

InputText.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}

InputText.defaultProps = {
  onChange: () => null
}
