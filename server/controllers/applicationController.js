import cloudinary from '../config/cloudinary.js';
import sendEmail from '../utils/sendEmail.js';
import multer from 'multer';

// Multer setup
const storage = multer.memoryStorage();
export const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
}).any();

// Helper to upload buffer to Cloudinary
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
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    // Use nationality keys to determine count
    const applicantCount = Object.keys(data).filter(k => k.endsWith('_nationality')).length;
    const applicantData = [];

    console.log(`Processing ${applicantCount} applicants...`);

    for (let i = 0; i < applicantCount; i++) {
      const photoFile = files.find(f => f.fieldname === `photo_${i}`);
      const passportFile = files.find(f => f.fieldname === `passport_${i}`);

      // Upload to Cloudinary (Wrapped in try-catch to catch specific upload errors)
      let photoUrl = 'No photo';
      let passportUrl = 'No passport';

      try {
        if (photoFile) photoUrl = await uploadToCloudinary(photoFile.buffer, 'photos');
        if (passportFile) passportUrl = await uploadToCloudinary(passportFile.buffer, 'passports');
      } catch (uploadErr) {
        console.error("Cloudinary Upload Error:", uploadErr);
        throw new Error("Failed to upload images to cloud storage.");
      }

      applicantData.push({
        nationality: data[`applicant_${i}_nationality`],
        other: data[`applicant_${i}_other`], // Now matches the key from frontend
        second: data[`applicant_${i}_second`] || 'N/A',
        photoUrl,
        passportUrl
      });
    }

    // Build Email HTML
    let tableRows = '';
    applicantData.forEach((app, idx) => {
      tableRows += `
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 12px;"><b>Applicant ${idx + 1}</b></td>
          <td style="padding: 12px;">${app.nationality}</td>
          <td style="padding: 12px;">${app.other === 'yes' ? app.second : 'None'}</td>
          <td style="padding: 12px;">
            <a href="${app.photoUrl}">View Photo</a> | 
            <a href="${app.passportUrl}">View Passport</a>
          </td>
        </tr>`;
    });

    const emailHtml = `
      <div style="font-family: sans-serif;">
        <h2>New UK ETA Group Application</h2>
        <p><b>Payment ID:</b> ${data.paymentId}</p>
        <p><b>Total Paid:</b> $${data.totalPaid}</p>
        <table border="1" style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr style="background: #f4f4f4;">
              <th>Applicant</th><th>Nationality</th><th>Second Nat.</th><th>Files</th>
            </tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
      </div>`;

    // Send Email
    await sendEmail({
      email: process.env.EMAIL_TO,
      subject: `New ETA Order: ${data.paymentId}`,
      message: emailHtml,
    });

    res.status(200).json({ success: true, message: "Application processed" });

  } catch (error) {
    console.error("Full Controller Error:", error);
    res.status(500).json({ 
        success: false, 
        message: error.message || "Internal Server Error" 
    });
  }
};