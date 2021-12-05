import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.css'

const Button = ({ type, title, label, onClick }) => {
  return (
    <React.Fragment>
      <button
        className={styles.button}
        type={type}
        label={label}
        onClick={onClick}
      >
        {title}
      </button>
    </React.Fragment>
  )
}

export default Button

Button.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

Button.defaultProps = {
  type: 'button',
  onClick: () => null,
  title: 'teste defaultProp'
}
