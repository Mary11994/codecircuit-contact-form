// src/components/ContactForm.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import * as yup from 'yup';
import '../styles/ContactForm.css';

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Valid email required').required(),
    phone: yup
      .string()
      .matches(/^\+?\d{7,15}$/, 'Phone must be 7–15 digits')
      .nullable(),
    message: yup.string().min(10, 'At least 10 characters').required(),
  })
  .required();

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    watch,
     reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [previewData, setPreviewData] = useState(null);
  const messageValue = watch('message', '');

  // When form is valid and submitted, pop up the preview
  const onSubmit = (data) => {
    setPreviewData(data);
  };

  // When user confirms in the modal
  const confirmSubmit = () => {
    setPreviewData(null);
    alert('🎉 Message sent!');
  };

  // When user clicks Reset
  const handleReset = () => {
    setPreviewData(null);
    reset({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Full Name */}
        <motion.div
          className="form-group"
          whileHover={{ rotateX: 3, rotateY: 3, scale: 1.01 }}
          whileTap={{ scale: 0.99, rotateX: 0, rotateY: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        >
          <label>Full Name*</label>
          <input {...register('name')} />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </motion.div>

        {/* Email Address */}
        <motion.div
          className="form-group"
          whileHover={{ rotateX: 3, rotateY: 3, scale: 1.01 }}
          whileTap={{ scale: 0.99, rotateX: 0, rotateY: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        >
          <label>Email Address*</label>
          <input type="email" {...register('email')} />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </motion.div>

        {/* Phone Number */}
        <motion.div
          className="form-group"
          whileHover={{ rotateX: 3, rotateY: 3, scale: 1.01 }}
          whileTap={{ scale: 0.99, rotateX: 0, rotateY: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        >
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="+1234567890"
            {...register('phone')}
            pattern="\+?\d{7,15}"
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </motion.div>

        {/* Message */}
        <motion.div
          className="form-group"
          whileHover={{ rotateX: 3, rotateY: 3, scale: 1.01 }}
          whileTap={{ scale: 0.99, rotateX: 0, rotateY: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        >
          <label>Message*</label>
          <textarea rows={5} {...register('message')} />
          <div className="char-counter">{messageValue.length}/500</div>
          {errors.message && <p className="error">{errors.message.message}</p>}
        </motion.div>

        {/* Action Buttons */}
        <div className="button-row">
          <button type="submit" disabled={!isValid}>
            Preview Message
          </button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {/* Preview Modal */}
      {previewData && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Confirm Your Message</h2>
            <p>
              <strong>Name:</strong> {previewData.name}
            </p>
            <p>
              <strong>Email:</strong> {previewData.email}
            </p>
            {previewData.phone && (
              <p>
                <strong>Phone:</strong> {previewData.phone}
              </p>
            )}
            <p>
              <strong>Message:</strong> {previewData.message}
            </p>
            <div className="button-row">
              <button onClick={confirmSubmit}>Send</button>
              <button onClick={() => setPreviewData(null)}>Edit</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}



    