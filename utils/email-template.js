export const CREATE_PASSWORD = ({ USER_NAME, EMAIL, PASSWORD, COMPANY_NAME, DOMAIN}) => {
      return `
<table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial, sans-serif; background-color:#ffffff; padding:30px;">
<tr>
<td>
<p>Dear ${USER_NAME},</p>
<p>We’re happy to let you know that your account has been successfully approved. You can now access our system using the credentials below:</p>
 
      <table cellpadding="10" cellspacing="0" width="100%" style="margin-top:20px; border:1px solid #ddd;">
<tr>
<td width="30%" style="background-color:#f9f9f9;"><strong>Username</strong></td>
<td>${EMAIL}</td>
</tr>
<tr>
<td style="background-color:#f9f9f9;"><strong>Temporary Password</strong></td>
<td>${PASSWORD}</td>
</tr>
<tr>
<td style="background-color:#f9f9f9;"><strong>Login URL</strong></td>
<td><a href="${process.env.AUTH}${DOMAIN}.${process.env.DOMAIN}/login" style="color:#007bff;">click here</a></td>
</tr>
</table>
 
      <p style="margin-top:20px;">Please log in and change your password immediately for security reasons.</p>
<p>If you need any help, feel free to reach out to our support team.</p>
<p>Warm regards,<br>${COMPANY_NAME} Team</p>
</td>
</tr>
</table>
`
}