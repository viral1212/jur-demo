import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputField from '../InputField';
import Button from '../Button';

InputField.propTypes = {
  className: PropTypes.string,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func,
  submitButtonText: PropTypes.string,
};

export default function Form({
  defaultValues = {},
  fieldName,
  onSubmit,
  disabled,
  className,
  submitButtonText = 'Submit',
}) {
  const textFieldName = fieldName || 'content';
  return (
    <Formik
      initialValues={defaultValues}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          onSubmit(values);
          actions.setSubmitting(false);
        }, 500);
      }}
      validationSchema={Yup.object().shape({
        [textFieldName]: Yup.string().required(`${textFieldName} is required`),
      })}
      className={className}
    >
      {(props) => {
        const {
          values,
          errors,
          isSubmitting,
          dirty,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-32 items-start">
              <div>
                <InputField
                  className="col-span-2"
                  name={textFieldName}
                  type="text"
                  disabled={disabled}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values[textFieldName]}
                  showCloseIcon
                  isIconDisabled={!dirty || isSubmitting}
                  onIconClick={handleReset}
                />
                {errors[textFieldName] && (
                  <div className="capitalize text-red-500">
                    {errors[textFieldName]}
                  </div>
                )}
              </div>
              <div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="md:p-5"
                  shouldShowBorder
                  shouldShowShadow
                >
                  {submitButtonText}
                </Button>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}
