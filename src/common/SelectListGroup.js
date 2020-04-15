import React from 'react'
import {PropTypes} from 'prop-types'
import classnames from 'classnames'

const SelectLishGroup = ({
                             name,
                             value,
                             error,
                             info,
                             onChange,
                             options
                         }) => {
    const selectOptions = options.map(option=>{
        return (
                <option key={option.label} value={option.value}>{option.value}</option>
            )
    })
    return (

        <div className="form-group">
            <select
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                name={name}
                value={value}
                onChange={onChange}
            >{selectOptions}</select>
            {info && <small className="form-text text-muted">{info}</small>}
            {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    );
}

SelectLishGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    option: PropTypes.array.isRequired
}

export default SelectLishGroup