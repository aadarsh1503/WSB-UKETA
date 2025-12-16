import Joi from 'joi';
import sendEmail from '../utils/sendEmail.js';

// Validation Schema
const validateApplication = (data) => {
  const schema = Joi.object({
    nationality: Joi.string().required().label('Current Nationality'),
    passportNumber: Joi.string().required().label('Passport Number'),
    otherNationalities: Joi.string().valid('yes', 'no').required(),
    secondNationality: Joi.string().when('otherNationalities', {
      is: 'yes',
      then: Joi.required().label('Second Nationality'),
      otherwise: Joi.allow(null, '').optional()
    })
  });

  return schema.validate(data);
};

// @desc    Process Application and Send Email
// @route   POST /api/applications
export const submitApplication = async (req, res) => {
  try {
    // 1. Validate Input
    const { error } = validateApplication(req.body);
    if (error) {
      return res.status(400).json({ 
        success: false, 
        message: error.details[0].message 
      });
    }

    const { nationality, passportNumber, otherNationalities, secondNationality } = req.body;
    
    // Generate a temporary Reference ID (since no DB ID exists)
    const referenceId = `ETA-${Date.now()}`;

    // 2. Prepare Email Content
    const emailMessage = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #e0e0e0;">
        <h2 style="color: #106cb6; margin-bottom: 20px;">New UK ETA Application</h2>
        <p>A new application form has been submitted via the website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold; width: 40%;">Reference ID:</td>
            <td style="padding: 12px; border: 1px solid #dee2e6;">${referenceId}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Nationality:</td>
            <td style="padding: 12px; border: 1px solid #dee2e6;">${nationality}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Passport Number:</td>
            <td style="padding: 12px; border: 1px solid #dee2e6;">${passportNumber}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Other Nationalities:</td>
            <td style="padding: 12px; border: 1px solid #dee2e6; text-transform: uppercase;">${otherNationalities}</td>
          </tr>
          ${otherNationalities === 'yes' ? `
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Second Nationality:</td>
            <td style="padding: 12px; border: 1px solid #dee2e6;">${secondNationality}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Received At:</td>
            <td style="padding: 12px; border: 1px solid #dee2e6;">${new Date().toLocaleString()}</td>
          </tr>
        </table>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #888; text-align: center;">
          Sent securely from Khaleeji App Server
        </div>
      </div>
    `;

    // 3. Send Email
    await sendEmail({
      email: process.env.EMAIL_TO, // aadarshchauhan35@gmail.com
      subject: `ETA Application: ${passportNumber} - ${nationality}`,
      message: emailMessage
    });

    // 4. Response
    return res.status(200).json({
      success: true,
      message: 'Application received and email sent successfully.',
    });

  } catch (error) {
    console.error('Email Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send application email.'
    });
  }
};