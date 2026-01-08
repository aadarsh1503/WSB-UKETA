import cloudinary from '../config/cloudinary.js';
import sendEmail from '../utils/sendEmail.js';
import multer from 'multer';

const storage = multer.memoryStorage();
export const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } 
}).any();

const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: `uk_eta/${folder}` },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export const submitApplication = async (req, res) => {
  try {
    const data = req.body;
    const files = req.files || [];
    const count = parseInt(data.applicantCount);
    const applicantData = [];

    // Capture user email for the confirmation message
    const primaryUserEmail = data[`app_0_email`];

    for (let i = 0; i < count; i++) {
        const photoFile = files.find(f => f.fieldname === `photo_${i}`);
        const passportFile = files.find(f => f.fieldname === `passport_${i}`);

        let photoUrl = '#';
        let passportUrl = '#';

        if (photoFile) photoUrl = await uploadToCloudinary(photoFile.buffer, 'photos');
        if (passportFile) passportUrl = await uploadToCloudinary(passportFile.buffer, 'passports');

        const risks = [];
        if (data[`app_${i}_warCrimes`] === 'true') risks.push('War Crimes');
        if (data[`app_${i}_terrorism`] === 'true') risks.push('Terrorism');
        if (data[`app_${i}_extremism`] === 'true') risks.push('Extremism');

        let extraNats = "None";
        try {
            const parsedNats = JSON.parse(data[`app_${i}_extraNationalities`] || "[]");
            const filtered = parsedNats.filter(n => n && n.trim() !== "");
            if (filtered.length > 0) extraNats = filtered.join(", ");
        } catch (e) { extraNats = "None"; }

        let criminalSummary = "No Convictions";
        let hasCriminalRisk = false;

        if (data[`app_${i}_hasCriminalConviction`] === 'yes') {
            hasCriminalRisk = true;
            let summaryParts = [];
            if (data[`app_${i}_convictedLast12Months`] === 'yes') {
                summaryParts.push(`<strong>⚠️ Conviction (Last 12 Months):</strong> ${data[`app_${i}_crimeDescription`]} (${data[`app_${i}_convictionCountry`]})`);
            }
            if (data[`app_${i}_sentencedOver12Months`] === 'yes') {
                summaryParts.push(`<strong>⛓️ Prison Sentence (>12 Months):</strong> ${data[`app_${i}_prisonSentenceDetails`]} (${data[`app_${i}_prisonConvictionCountry`]})`);
            }
            criminalSummary = summaryParts.length > 0 ? summaryParts.join("<br/>") : "Conviction reported but no details.";
        }

        applicantData.push({
            fullName: data[`app_${i}_fullName`],
            nationality: data[`app_${i}_nationality`],
            extraNationalities: extraNats,
            arrivalDate: data[`app_${i}_arrivalDate`],
            contact: `${data[`app_${i}_email`]} / ${data[`app_${i}_phone`]}`,
            address: `${data[`app_${i}_building`]}, ${data[`app_${i}_street`]}, ${data[`app_${i}_town`]}, ${data[`app_${i}_postal`]}`,
            job: data[`app_${i}_hasJob`] === 'yes' ? data[`app_${i}_jobDetails`] : 'Unemployed/No Job',
            criminal: criminalSummary,
            hasCriminalRisk,
            security: data[`app_${i}_securityRisk`] === 'yes' ? risks.join(', ') : 'Clean Record',
            hasSecurityRisk: data[`app_${i}_securityRisk`] === 'yes',
            photoUrl,
            passportUrl
        });
    }

    // --- FULLY COMPATIBLE HTML TEMPLATE (ADMIN SIDE - UNCHANGED) ---
    let html = `
    <!DOCTYPE html>
    <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f3f6ff;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#f3f6ff">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <!-- Main Table (Outlook fixed width) -->
            <table border="0" cellpadding="0" cellspacing="0" width="600" style="width: 600px; background-color: #ffffff; border-collapse: collapse;">
              
              <!-- Header Gradient Area -->
              <tr>
                <td align="center" bgcolor="#002d85" style="padding: 0;">
                  <!--[if gte mso 9]>
                  <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:160px;">
                    <v:fill type="gradient" color="#002d85" color2="#001a4f" angle="135" />
                    <v:textbox inset="0,0,0,0">
                  <![endif]-->
                  <div style="padding: 40px 0;">
                    <img src="https://res.cloudinary.com/ds1dt3qub/image/upload/v1767782485/LOGO1_1_hxc7s1.png" alt="Logo" width="140" style="display: block; border:0; margin: 0 auto; filter: brightness(0) invert(1);" />
                    <h1 style="color: #ffffff; font-family: Arial, sans-serif; font-size: 22px; margin-top: 15px; margin-bottom: 0;">NEW EETA SUBMISSION</h1>
                  </div>
                  <!--[if gte mso 9]>
                    </v:textbox>
                  </v:rect>
                  <![endif]-->
                </td>
              </tr>

              <!-- Payment Summary -->
              <tr>
                <td style="padding: 30px 40px; border-bottom: 1px solid #edf2f7;">
                   <table width="100%" border="0" cellpadding="0" cellspacing="0">
                     <tr>
                       <td align="left" style="font-family: Arial, sans-serif;">
                         <div style="font-size: 11px; color: #a0aec0; font-weight: bold; text-transform: uppercase;">Transaction ID</div>
                         <div style="font-size: 20px; color: #002d85; font-weight: bold;">${data.paymentId}</div>
                       </td>
                       <td align="right" style="font-family: Arial, sans-serif;">
                         <div style="background-color: #eef2ff; color: #002d85; padding: 10px 15px; font-weight: bold; font-size: 22px;">
                           $${data.totalPaid}
                         </div>
                       </td>
                     </tr>
                   </table>
                </td>
              </tr>

              <!-- Content Area -->
              <tr>
                <td style="padding: 30px 40px;">
                  <p style="font-family: Arial, sans-serif; font-size: 16px; color: #4a5568; line-height: 24px; margin: 0 0 30px 0;">
                    A new application group has been submitted with <strong>${count} applicant(s)</strong>.
                  </p>
    `;

    applicantData.forEach((app, idx) => {
        html += `
          <!-- Applicant Header Bar -->
          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 0;">
            <tr>
              <td bgcolor="#002d85" style="padding: 12px 20px; font-family: Arial, sans-serif; color: #ffffff; font-weight: bold; font-size: 14px;">
                APPLICANT #${idx + 1}: ${app.fullName.toUpperCase()}
              </td>
            </tr>
          </table>

          <!-- Applicant Body -->
          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border: 1px solid #e2e8f0; border-top: none; margin-bottom: 30px;">
            <tr>
              <td style="padding: 20px; font-family: Arial, sans-serif; font-size: 14px; color: #2d3748;">
                
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="120" style="color: #718096; padding-bottom: 8px;">Nationality:</td>
                    <td style="font-weight: bold; padding-bottom: 8px;">${app.nationality}</td>
                  </tr>
                  <tr>
                    <td style="color: #718096; padding-bottom: 8px;">Extra Nats:</td>
                    <td style="padding-bottom: 8px;">${app.extraNationalities}</td>
                  </tr>
                  <tr>
                    <td style="color: #718096; padding-bottom: 8px;">Arrival Date:</td>
                    <td style="color: #002d85; font-weight: bold; padding-bottom: 8px;">${app.arrivalDate}</td>
                  </tr>
                  <tr>
                    <td style="color: #718096; padding-bottom: 8px;">Contact Info:</td>
                    <td style="padding-bottom: 8px;">${app.contact}</td>
                  </tr>
                  <tr>
                    <td style="color: #718096; padding-bottom: 8px;">Employment:</td>
                    <td style="padding-bottom: 8px;">${app.job}</td>
                  </tr>

                  <!-- Status Flags -->
                  <tr>
                    <td style="padding-top: 10px; color: #718096;">Criminality:</td>
                    <td style="padding-top: 10px;">
                      <!--[if mso]>
                      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" stroke="f" fillcolor="${app.hasCriminalRisk ? '#c53030' : '#2f855a'}" style="width:80px;height:24px;">
                        <center style="color:#ffffff;font-family:Arial;font-size:10px;font-weight:bold;">${app.hasCriminalRisk ? 'HIGH RISK' : 'CLEAN'}</center>
                      </v:roundrect>
                      <![endif]-->
                      <![if !mso]>
                      <span style="background-color: ${app.hasCriminalRisk ? '#c53030' : '#2f855a'}; color: #ffffff; padding: 3px 10px; font-size: 10px; font-weight: bold; border-radius: 3px;">
                        ${app.hasCriminalRisk ? 'HIGH RISK' : 'CLEAN'}
                      </span>
                      <![endif]>
                    </td>
                  </tr>
                  ${app.hasCriminalRisk ? `
                  <tr>
                    <td colspan="2" style="padding-top: 10px;">
                      <table width="100%" border="0" cellpadding="10" cellspacing="0" bgcolor="#fff5f5" style="border-left: 4px solid #c53030;">
                        <tr><td style="font-size: 13px; color: #c53030; font-family: Arial;">${app.criminal}</td></tr>
                      </table>
                    </td>
                  </tr>` : ''}

                  <tr>
                    <td style="padding-top: 10px; color: #718096;">Security:</td>
                    <td style="padding-top: 10px;">
                       <!--[if mso]>
                      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" stroke="f" fillcolor="${app.hasSecurityRisk ? '#c53030' : '#2f855a'}" style="width:80px;height:24px;">
                        <center style="color:#ffffff;font-family:Arial;font-size:10px;font-weight:bold;">${app.hasSecurityRisk ? 'FLAGGED' : 'CLEAN'}</center>
                      </v:roundrect>
                      <![endif]-->
                      <![if !mso]>
                      <span style="background-color: ${app.hasSecurityRisk ? '#c53030' : '#2f855a'}; color: #ffffff; padding: 3px 10px; font-size: 10px; font-weight: bold; border-radius: 3px;">
                        ${app.hasSecurityRisk ? 'FLAGGED' : 'CLEAN'}
                      </span>
                      <![endif]>
                    </td>
                  </tr>
                </table>

                <!-- Bulletproof Buttons -->
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #edf2f7;">
                  <tr>
                    <td align="center">
                      <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" width="180" bgcolor="#002d85" style="border-radius: 5px;">
                            <!--[if mso]>
                            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${app.passportUrl}" style="height:40px;v-text-anchor:middle;width:180px;" arcsize="10%" stroke="f" fillcolor="#002d85">
                              <w:anchorlock/>
                              <center style="color:#ffffff;font-family:Arial;font-size:13px;font-weight:bold;">View Passport</center>
                            </v:roundrect>
                            <![endif]-->
                            <a href="${app.passportUrl}" style="padding: 10px 0; display: inline-block; width: 180px; font-family: Arial, sans-serif; font-size: 13px; color: #ffffff; font-weight: bold; text-decoration: none; border-radius: 5px;">View Passport</a>
                          </td>
                          <td width="20"></td>
                          <td align="center" width="180" bgcolor="#f3f6ff" style="border-radius: 5px; border: 1px solid #d1d5db;">
                            <!--[if mso]>
                            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${app.photoUrl}" style="height:40px;v-text-anchor:middle;width:180px;" arcsize="10%" stroke="f" fillcolor="#f3f6ff">
                              <w:anchorlock/>
                              <center style="color:#002d85;font-family:Arial;font-size:13px;font-weight:bold;">View Photo</center>
                            </v:roundrect>
                            <![endif]-->
                            <a href="${app.photoUrl}" style="padding: 10px 0; display: inline-block; width: 180px; font-family: Arial, sans-serif; font-size: 13px; color: #002d85; font-weight: bold; text-decoration: none;">View Photo</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>
          </table>
        `;
    });

    html += `
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td align="center" bgcolor="#f7fafc" style="padding: 30px; border-top: 1px solid #edf2f7;">
                  <p style="margin: 0; font-family: Arial, sans-serif; font-size: 12px; color: #718096;">
                    &copy; 2025 UK EETA Online Services. Automated Portal Notification.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

    // --- USER SIDE EMAIL TEMPLATE (NEW) ---
    let userHtml = `
    <!DOCTYPE html>
    <html>
    <body style="margin: 0; padding: 0; background-color: #f3f6ff; font-family: Arial, sans-serif;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#f3f6ff">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
              <tr>
                <td align="center" bgcolor="#002d85" style="padding: 40px 0;">
                  <img src="https://res.cloudinary.com/ds1dt3qub/image/upload/v1767782485/LOGO1_1_hxc7s1.png" alt="Logo" width="120" style="filter: brightness(0) invert(1);" />
                  <h2 style="color: #ffffff; margin-top: 20px;">Application Received Successfully</h2>
                </td>
              </tr>
              <tr>
                <td style="padding: 40px; color: #4a5568; line-height: 1.6;">
                  <p>Dear Applicant,</p>
                  <p>Thank you for choosing <strong>UK EETA Online Services</strong>. We have received your application group and our processing team is now working on it.</p>
                  
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; margin: 25px 0; border-radius: 5px;">
                    <p style="margin: 0; font-size: 14px;"><strong>Transaction ID:</strong> ${data.paymentId}</p>
                    <p style="margin: 5px 0 0 0; font-size: 14px;"><strong>Applicants:</strong> ${count}</p>
                  </div>

                  <p><strong>What is next?</strong></p>
                  <p>We are currently verifying your documentation and submitting your details for official authorization. You will receive your UK ETA via this email address as soon as it is issued.</p>
                  
                  <p>Typical processing time is <strong>24 to 72 hours</strong>. We will contact you if any additional information or clearer document copies are required.</p>

                  <p style="margin-top: 40px; font-size: 12px; color: #a0aec0; border-top: 1px solid #edf2f7; padding-top: 20px;">
                    &copy; 2025 UK EETA Online Services. This is an automated confirmation of your submission.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

    // 1. Send to ADMIN (Using your original 'html' variable)
    await sendEmail({
      email: process.env.EMAIL_TO,
      subject: `🚨 NEW GROUP ORDER: ${count} Applicant(s) - ${data.paymentId}`,
      message: html,
    });

    // 2. Send to USER (Using the new 'userHtml' variable)
    if (primaryUserEmail) {
        await sendEmail({
          email: primaryUserEmail,
          subject: `Thank You: Your UK ETA Application is being processed (${data.paymentId})`,
          message: userHtml,
        });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};