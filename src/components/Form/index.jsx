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
  formGrid: PropTypes.number,
};

export default function Form({
  defaultValues = {},
  fieldName,
  onSubmit,
  disabled,
  className,
  submitButtonText = 'Submit',
  formGrid = 3,
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
          <form onSubmit={handleSubmit} className={className}>
            <div className={`grid grid-cols-${formGrid} gap-24`}>
              <div className={`col-span-${formGrid - 1}`}>
                <InputField
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
